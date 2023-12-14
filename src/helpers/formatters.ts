export const format_currency = (amount: number, currencyCode: string) => {
    const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
    });

    return formatter.format(amount);
}

const unitList = ["","K","M","G"];
export function format_number(number: number){
    const sign = Math.sign(number);
    let unit = 0;

    while(Math.abs(number) >= 1000)
    {
        unit = unit + 1;
        number = Math.floor(Math.abs(number) / 100)/10;
    }
    return sign*Math.abs(number) + unitList[unit];
}