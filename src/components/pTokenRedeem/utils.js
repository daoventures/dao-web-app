export const formattingNumber = (number, decimal = 4) => {
    const power = 10 ** decimal;
    return  (Math.floor(number * power) / power);
}