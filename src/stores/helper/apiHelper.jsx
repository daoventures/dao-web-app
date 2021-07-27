import config from "../../config/config";
import { UNIVERSAL_GAS_PRICE } from "../../constants/constants";
const rp = require("request-promise");

var getRequestOptions = (info) => {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
    };
};

class ApiHelper {
    static getTVL = async (tvlId) => {
        try {
            const url = `${config.statsProvider}vaults/tvl/${tvlId}`;
            const resultString = await rp(url);
            const result = JSON.parse(resultString);
    
            return result.body;
        } catch (err) {
            console.error("Error in getTVL()", err);
        }
    }

    static getTotalTVL = async () => {
        try {
            const url = `${config.statsProvider}vaults/tvl/total`;
            const responseString = await rp(url);
            const result = JSON.parse(responseString);
            return result.body;
        } catch (err) {
            console.error("Error in getTotalTVL()", err);
        }
    }

    static eventVerify = async () => {
        try {
            const url = `${config.statsProvider}event/verify/`;
            const responseString = await rp(url);
            const result = JSON.parse(responseString);
            return result.body;
        } catch (err) {
            console.error("Error in eventVerify()", err);
        }
    }

    static eventVerifyAmount = async(amount) => {
        try {
            const url = `${config.statsProvider}event/verify/${amount}`;
            const resultString = await rp(url);
            const result = JSON.parse(resultString);
            return result.body
        } catch (err) {
            console.error("Error in eventVerifyAmount()", err);
        } 
    } 

    static findDAOminePool = async () => {
        try {
            const url =  `${config.statsProvider}staking/get-pools`;
            const responseString = await rp(url);
            const result = JSON.parse(responseString);
            return result.body; 
        } catch (err) {
            console.error("Error in findDAOminePool()", err);
        }
    }

    static getVipTokenInfo = async(type) => {
        try {
            const url = `${config.statsProvider}staking/get-${type}-stake`;
            const responseString = await rp(url);
            const result = JSON.parse(responseString);
            return result.body;
        } catch (err) {
            console.error("Error in getVipTokenInfo()", err);
        }
    }

    static getUserVaultStatistics = async(userAddress) => {
        try {
            const url = `${config.statsProvider}user/${userAddress}/vaults/statistics`;
            const responseString = await rp(url);
            const result = JSON.parse(responseString);
            return result.body;
        } catch (err) {
            console.error("Error in getUserVaultStatistics()",err);
        }
    }

    static getUserTransactions = async (userAddress) => {
        try {
            const url = `${config.statsProvider}user/${userAddress}/vaults/transactions`;
            const responseString = await rp(url);
            const result = JSON.parse(responseString);
            return result.body;
        } catch (err) {
            console.error("Error in getUserTransactions()",err);
        }
    } 

    static getReimbursementAddress = async (userAddress) => {
        try {
            const url = `${config.statsProvider}user/reimburse-address/${userAddress}`;
            const responseString = await rp(url);
            const result = JSON.parse(responseString);
            return result.body;
        } catch (err) {
            console.error("Error in getReimbursementAddress()",err);
        }
    }

    static updateReimburseInfo = async (info) => {
        try {
            const url = `${config.statsProvider}user/reimburse-address/update`;
            const requestOptions = getRequestOptions();
            const responseString = await fetch(url, requestOptions);
            const result = await responseString.json();
            return result.body;
        } catch (err) {
            console.error("Error in updateReimburseInfo()",err);
        }
    }

    static findVaultsAPY = async () => {
        try {
            const url = `${config.statsProvider}vaults/apy`;
            const responseString = await rp(url);
            const result = JSON.parse(responseString);
            return result.body;
          } catch (err) {
            console.error("Error in getVaultsAPY()",err);
          }
    }

    static getVaultHistoricalPrice = async(priceId, interval) => {
        try {
            const url = `${config.statsProvider}vaults/price/${priceId}/${interval}`;
            const resultString = await rp(url);
            const result = JSON.parse(resultString);
            return result.body;

        } catch (err) {
            console.error("Error in getVaultHistoricalPrice()", err);
        }
    }

    static findTokenUSDPrices = async() => {
        try {
            const tokens = [
                "usd-coin",
                "dai",
                "true-usd",
                "tether",
                "compound-usdt",
                "compound-usd-coin",
                "cdai",
                "ethereum",
            ];
            const tokensString = tokens.join();
            const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokensString}&vs_currencies=usd,eth`;
            const priceString = await rp(url);
            const priceJSON = JSON.parse(priceString);
            return priceJSON;
        } catch (err) {
            console.error("Error in findTokenUSDPrices()", err);
        }
    }

    static getGasPrice = async() => {
        try {
            const url = "https://gasprice.poa.network/";
            const priceString = await rp(url);
            const priceJSON = JSON.parse(priceString);

            return (priceJSON) ? priceJSON.fast.toFixed(0) : UNIVERSAL_GAS_PRICE;
        } catch (err) {
            console.err("Error in getGasPrice(): ", err);
            return UNIVERSAL_GAS_PRICE;
        }
    }

   
}

export default ApiHelper; 

