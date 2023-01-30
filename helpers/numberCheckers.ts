export const fractionalCheck = (num:string,fractional:boolean) => {
    let value:number|string = Number(num)
    if (fractional) {
        value = value.toFixed(1)
    } else {
        value = value.toFixed()
    }
    return value
}
export const signCheck = (num:string,negative:boolean) => {
    let value = Math.abs(Number(num))
    value = negative? -value : value
    return value.toString()
}