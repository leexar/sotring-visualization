type RerenderFunction = (container: HTMLElement, currentElmIndex?: any[]) => void;
type RerenderObj = { rerenderFnc: RerenderFunction, container: HTMLElement, timeout: number };

import Timeout from "../ts/utils"

export default async function bubbleSort(array: number[], rerender?: RerenderObj) : Promise<void>
{
    for(let i = 0; i < array.length; i++)
    {
        for(let j = 0; j < array.length - i - 1; j++)
        {
            if(array[j] > array[j + 1])
            {
                [ array[j + 1], array[j] ] = [ array[j], array[j + 1] ];
            }

            rerender.rerenderFnc(rerender.container, [j + 1]);
            await Timeout(rerender.timeout);
        }
    }
}