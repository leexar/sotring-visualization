const styles = require("./scss/styles.scss");

type RerenderFunction = (container: HTMLElement, currentElmIndex?: any[]) => void;
type TimeoutObject = { defaultTimeout: number, timeoutRate: number }
type RerenderProps = { rerenderFnc: RerenderFunction, container: HTMLElement, timeout: TimeoutObject, prevent: boolean };

import { generateArray, array } from "./ts/arrayGenerator";
import { render, rerender } from "./ts/arrayRender";
import * as algorithms from "./algorithms/main";

let container = (<HTMLElement>document.querySelector("div.container"));
let generateBtn = (<HTMLInputElement>document.querySelector("#btn-generate"));
let startBtn = (<HTMLInputElement>document.querySelector("#btn-start"));
let stopBtn = (<HTMLInputElement>document.querySelector("#btn-stop"));
let sizeInpt = (<HTMLInputElement>document.querySelector("#input-size"));
let algsBtns = document.querySelectorAll("a");
let speedRange = (<HTMLInputElement>document.querySelector("#range-speed"));

let timeoutObj: TimeoutObject = { defaultTimeout: 400, timeoutRate: parseInt(speedRange.value)};
let rerenderObj: RerenderProps = { rerenderFnc: rerender, container: container, timeout: timeoutObj, prevent: false };

algsBtns.forEach(el => {
    el.addEventListener("click", () => {
        if(!el.hasAttribute("active"))
        {
            document.querySelector("a[active]").removeAttribute("active");
            el.setAttribute('active', '');
        }
    });
});

if(array == null)
{
    generateArray(25);
    render(container);
}  

speedRange.addEventListener("change", (e) => {
    timeoutObj.timeoutRate = parseInt((<HTMLInputElement>e.currentTarget).value);
});

stopBtn.addEventListener("click", () => {
    rerenderObj.prevent = true;
});

generateBtn.addEventListener("click", () => {
    let size: number = parseInt(sizeInpt.value);
    size = size ? size > 800 ? 800 : size : 25;

    sizeInpt.value = size.toString();

    container.removeAttribute('large');
    container.removeAttribute('medium');
    container.removeAttribute('small');
    container.removeAttribute('exsmall');

    if(size <= 30)
    {
        container.setAttribute('large', '');
    }
    else
    {
        if(size > 30 && size <= 100)
        {
            container.setAttribute('medium', '');
        }
        else
        {
            if (size > 100 && size <= 250)
            {
                container.setAttribute('small', '');
            }
            else
            {
                container.setAttribute('exsmall', '');
            }
        }
    }

    generateArray(size);
    rerender(container);
    if (container.hasAttribute('done')) {
        container.removeAttribute('done');
    }
});

startBtn.addEventListener("click", async () => {
    startBtn.disabled = true;
    generateBtn.disabled = true;
    stopBtn.disabled = false;
    if(container.hasAttribute('done'))
    {
        container.removeAttribute('done');
    }
    rerenderObj.prevent = false;

    let choosedAlgBtn = document.querySelector("a[active]");
    let alg = choosedAlgBtn.getAttribute("data-alg");

    switch(alg)
    {
        case "bubble":
            await algorithms.bubble(array, rerenderObj);
            break;
        case "quick":
            await algorithms.quick(array, 0, array.length, rerenderObj);
            break;
        case "selection":
            await algorithms.selection(array, rerenderObj);
            break;
        case "insertion":
            await algorithms.insertion(array, rerenderObj);
            break;
        case "heap":
            await algorithms.heap(array, rerenderObj);
            break;
    }

    rerender(container);
    if (!rerenderObj.prevent)
    {
        container.setAttribute('done', '');
    }
    startBtn.disabled = false;
    generateBtn.disabled = false;
    stopBtn.disabled = true;
});