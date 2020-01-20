type RerenderFunction = (container: HTMLElement, currentElmIndex?: any[]) => void;
type TimeoutObject = { defaultTimeout: number, timeoutRate: number }
type RerenderProps = { rerenderFnc: RerenderFunction, container: HTMLElement, timeout: TimeoutObject, prevent: boolean };

import Timeout from "../ts/utils"

export default async function heapSort(array: number[], rerender?: RerenderProps) : Promise<void>
{
    var i = Math.floor((array.length / 2) - 1);
    while (i >= 0) {
        heapify(array, array.length, i);
        i--;
        rerender.rerenderFnc(rerender.container);
        if (rerender.prevent) {
            return;
        }
        await Timeout(rerender.timeout.defaultTimeout / rerender.timeout.timeoutRate);
    }

    for(let i = array.length - 1; i >= 0; i--)
    {
        [array[0], array[i]] = [array[i], array[0]];

        heapify(array, i, 0);
        rerender.rerenderFnc(rerender.container);
        if (rerender.prevent) {
            return;
        }
        await Timeout(rerender.timeout.defaultTimeout / rerender.timeout.timeoutRate);
    }
}

async function heapify(array: number[], n : number, index: number): Promise<void>
{
    let largest = index,
        left = 2 * index + 1,
        right = 2 * index + 2;

    if (left < n && array[left] > array[largest])
    {
        largest = left;
    }

    if (right < n && array[right] > array[largest])
    {
        largest = right;
    }

    if(largest != index)
    {
        [array[index], array[largest]] = [array[largest], array[index]];

        heapify(array, n, largest);
    }
}