
export function sumV1(... values){

    if(values.length  === 0){
        throw Error(`At least one number is expected`);
    }
    let sum = 0;
    for (let i = 0; i < values.length; i++){
        sum += values[i];
    }
    return sum;
}