type RerenderFunction = (container: HTMLElement, currentElmIndex?: any[]) => void;
type TimeoutObject = { defaultTimeout: number, timeoutRate: number }
type RerenderProps = { rerenderFnc: RerenderFunction, container: HTMLElement, timeout : TimeoutObject, prevent: boolean };

import Timeout from "../ts/utils"

export default async function bubbleSort(array: number[], rerender?: RerenderProps) : Promise<void>
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
            if (rerender.prevent)
            {
                return;
            }
            await Timeout(rerender.timeout.defaultTimeout / rerender.timeout.timeoutRate);
        }
    }
}