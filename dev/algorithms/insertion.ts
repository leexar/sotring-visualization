type RerenderFunction = (container: HTMLElement, currentElmIndex?: any[]) => void;
type TimeoutObject = { defaultTimeout: number, timeoutRate: number }
type RerenderProps = { rerenderFnc: RerenderFunction, container: HTMLElement, timeout: TimeoutObject, prevent: boolean };

import Timeout from "../ts/utils"

export default async function insertionSort(array: number[], rerender?: RerenderProps): Promise<void>{
    for(let i = 1; i < array.length; i++)
    {
        let num = array[i];
        let j = i - 1;

        while(array[j] > num && j >= 0)
        {
            array[j + 1] = array[j];
            j--;

            rerender.rerenderFnc(rerender.container, [j + 1]);
            if (rerender.prevent) {
                return;
            }
            await Timeout(rerender.timeout.defaultTimeout / rerender.timeout.timeoutRate);
        }

        array[j + 1] = num;
        rerender.rerenderFnc(rerender.container, [j + 1]);
    }
}