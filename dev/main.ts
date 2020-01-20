const styles = require("./scss/styles.scss");

import { generateArray, array } from "./ts/arrayGenerator";
import { render, rerender } from "./ts/arrayRender";
import * as algorithms from "./algorithms/main";

let container = (<HTMLElement>document.querySelector("div.container"));
let generateBtn = (<HTMLInputElement>document.querySelector("#btn-generate"));
let startBtn = (<HTMLInputElement>document.querySelector("#btn-start"));
let sizeInpt = (<HTMLInputElement>document.querySelector("#input-size"));
let algsBtns = document.querySelectorAll("a");

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
    generateArray(25);
render(container);

generateBtn.addEventListener("click", () => {
    let size: number = parseInt(sizeInpt.value);
    generateArray(size ? size > 100 ? 100 : size : 25);
    rerender(container);
    if (container.hasAttribute('done')) {
        container.removeAttribute('done');
    }
});

startBtn.addEventListener("click", async () => {
    startBtn.disabled = true;
    generateBtn.disabled = true;
    if(container.hasAttribute('done'))
    {
        container.removeAttribute('done');
    }
    
    let choosedAlgBtn = document.querySelector("a[active]");
    let alg = choosedAlgBtn.getAttribute("data-alg");
    
    let defaultTimeout : number = 400;
    let speedUp = parseInt((<HTMLInputElement>document.querySelector("#range-speed")).value);

    let timeout = defaultTimeout / speedUp;

    switch(alg)
    {
        case "bubble":
            await algorithms.bubble(array, { rerenderFnc: rerender, container: container, timeout: timeout });
            break;
        case "quick":
            await algorithms.quick(array, 0, array.length, { rerenderFnc: rerender, container: container, timeout: timeout });
            break;
        case "selection":
            await algorithms.selection(array, { rerenderFnc: rerender, container: container, timeout: timeout });
            break;
        case "insertion":
            await algorithms.insertion(array, { rerenderFnc: rerender, container: container, timeout: timeout });
            break;
        case "heap":
            await algorithms.heap(array, { rerenderFnc: rerender, container: container, timeout: timeout });
            break;
    }

    rerender(container);
    container.setAttribute('done', '');
    startBtn.disabled = false;
    generateBtn.disabled = false;
});