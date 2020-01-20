export default async function mergeSort(array: number[]): Promise<void> {
    if(array.length > 1)
    {
        let middle = array.length / 2;
        let left : number[] = [], right : number[] = [];
        
        left = array.slice(0, middle);
        right = array.slice(middle, array.length);

        mergeSort(left);
        mergeSort(right);

        await merge(array, left, right);
    }
}

async function merge(array: number[], left: number[], right: number[]): Promise<void>
{
    let i, j, k;
    i = j = k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        }
        else {
            array[k] = right[j];
            j++;
        }
        k++;
    }

    while (i < left.length) {
        array[k] = left[i];
        i++; k++;
    }

    while (j < right.length) {
        array[k] = right[j];
        j++; k++;
    }
}