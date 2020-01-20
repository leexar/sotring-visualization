type RerenderFunction = (container: HTMLElement, currentElmIndex?: any[]) => void;
type TimeoutObject = { defaultTimeout: number, timeoutRate: number }
type RerenderProps = { rerenderFnc: RerenderFunction, container: HTMLElement, timeout: TimeoutObject, prevent: boolean };

import Timeout from "../ts/utils"

export default async function selectionSort(array: number[], rerender?: RerenderProps): Promise<void>{
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
                if (rerender.prevent) {
                    return;
                }
                await Timeout(rerender.timeout.defaultTimeout / rerender.timeout.timeoutRate);
            }
        }
        [array[i], array[minIndx]] = [array[minIndx], array[i]];
        rerender.rerenderFnc(rerender.container, [i]);
    }
}

