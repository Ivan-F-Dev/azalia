export default function (num1:number,num2:number) {
    //num1 = Math.abs(num1)
    //num2 = Math.abs(num2)
    let average = (num1+num2)/2
    if (Number.isInteger(average)) {
        return average
    }
    return average.toFixed(2)
}