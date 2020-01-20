import { array } from "./arrayGenerator"

function render(container: HTMLElement, currentElmIndex? : any[] ) : void
{
    for(let i = 0; i < array.length; i++)
    {
        let el = document.createElement("div");
        el.style.height = `${array[i] * 2.5}px`;
        if (currentElmIndex && i == currentElmIndex[0])
        {
            let lastCurrent = document.querySelector(".container > div[current]");
            if(lastCurrent)
            {
                lastCurrent.removeAttribute("current");
            }
            el.setAttribute('current', '');
        }
        container.appendChild(el);
    }
}

function rerender(container: HTMLElement, currentElmIndex? : any[]) : void
{
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    render(container, currentElmIndex);
}

export { render, rerender };