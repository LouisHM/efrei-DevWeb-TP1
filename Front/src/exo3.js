

export function map(array, fn){
    const result = [];
    for(let i = 0; i < array.length; i++){
            let value = fn(array[i]);
            result.push(value);
        }
        return result;
}
