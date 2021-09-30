import config from "../../config/config";
const rp = require("request-promise");

const callURL = async(url) => {
    let responseString;
    try {
        const response = await rp(url);
        responseString = JSON.parse(response);
    } catch(err) {
        console.error(`Error in callURL(): `, err);
    } finally {
        return responseString;
    }
}

class ApiHelper { 
    static getAirDropInfo = async(address, airdropAddress) => {
        let result;
        try {
            const url = `${config.statsProvider}user/airdrop/${airdropAddress}/${address}`;
            const response = await callURL(url);
            result =  { success: true, result: response.body}
        } catch (err) {
            console.error(`Error in getAirDropInfo(): `, err);
        } finally {
            return result;
        }
    }
}

export default ApiHelper;