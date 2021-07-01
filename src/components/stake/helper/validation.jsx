export const validateDigit = (amount) => {
    const digitRegex = /^[0-9]\d*(\.\d+)?$/;
    return digitRegex.test(amount);
}

export const validateInputMoreThanBalance = (amount, balance) => {
    return parseFloat(amount) > parseFloat(balance);
}

export const validateAmountNotExist = (amount) => {
    return !amount || isNaN(amount) || parseFloat(amount) <= 0;
}

