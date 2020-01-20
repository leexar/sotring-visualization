type RerenderFunction = (container: HTMLElement, currentElmIndex?: any[]) => void;
type RerenderObj = { rerenderFnc: RerenderFunction, container: HTMLElement, timeout: number };

import Timeout from "../ts/utils"

export default async function selectionSort(array: number[], rerender?: RerenderObj): Promise<void>{
    for(let i = 0; i < array.length; i++)
    {
        let min = array[i];
        let minIndx = i;
        for(let j = i; j < array.length; j++)
        {
            if(array[j] < min)
            {
                min = array[j];
                minIndx = j;

                rerender.rerenderFnc(rerender.container, [j]);
                await Timeout(rerender.timeout);
            }
        }
        [array[i], array[minIndx]] = [array[minIndx], array[i]];
        rerender.rerenderFnc(rerender.container, [i]);
    }
}

