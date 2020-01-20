type RerenderFunction = (container: HTMLElement, currentElmIndex?: any[]) => void;
type RerenderObj = { rerenderFnc: RerenderFunction, container: HTMLElement, timeout: number };

import Timeout from "../ts/utils"

export default async function insertionSort(array: number[], rerender?: RerenderObj): Promise<void>{
    for(let i = 1; i < array.length; i++)
    {
        let num = array[i];
        let j = i - 1;

        while(array[j] > num && j >= 0)
        {
            array[j + 1] = array[j];
            j--;

            rerender.rerenderFnc(rerender.container, [j + 1]);
            await Timeout(rerender.timeout);
        }

        array[j + 1] = num;
        rerender.rerenderFnc(rerender.container, [j + 1]);
    }
}