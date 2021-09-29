import fromExponential from "from-exponential";

class InputValidation {
    static validateDigit = (amount) => {
        let finalAmount = fromExponential(amount);
        const digitRegex = /^[0-9]\d*(\.\d+)?$/;
        return digitRegex.test(finalAmount);
    }

    static validateInputMoreThanBalance = (amount, balance) => {
        return parseFloat(amount) > parseFloat(balance);
    }

    static validateAmountNotExist = (amount) => {
        return !amount || isNaN(amount) || parseFloat(amount) <= 0;
    }
}

export default InputValidation