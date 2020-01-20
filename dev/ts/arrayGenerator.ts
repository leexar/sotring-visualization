let array : number[] = null;

function generateArray(size : number) : void
{
    array = [];

    for(let i = 0; i < size; i++)
    {
        array.push(Math.floor(Math.random() * 200) + 1);
    }
}

export { generateArray, array };