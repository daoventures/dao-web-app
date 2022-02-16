export const formattingNumber = (number, decimal = 4) => {
    const power = 10 ** decimal;
    return  (Math.floor(number * power) / power);
}

export const addToMetamask = async(token) => {
    const ethereum = window.ethereum;

    const {
        address, 
        symbol, 
        decimals, 
    } = token
 
    await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address, // The address that the token is at.
            symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals, // The number of decimals in the token
            //image, // A string url of the token logo
          },
        },
    });
}