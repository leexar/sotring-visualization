type RerenderFunction = (container: HTMLElement) => void;
type RerenderObj = { rerenderFnc: RerenderFunction, container: HTMLElement, timeout: number };

import Timeout from "../ts/utils"

export default async function quickSort(array: number[], from: number, to: number, rerender?: RerenderObj): Promise<void>
{
    if (from < to) { 
        let t = partition(array, from, to);

        rerender.rerenderFnc(rerender.container);
        await Timeout(rerender.timeout);

        await quickSort(array, from, t - 1, rerender);
        await quickSort(array, t + 1, to, rerender);
    }
}

function partition(array : number[], from : number, to : number) : number
{
    let i : number = from - 1, 
        testNumber: number = array[to];

        for(let j = from; j < to; j++)
        {
            if(array[j] < testNumber)
            {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

    [array[i + 1], array[to]] = [array[to], array[i + 1]];
    
    return (i + 1);
}