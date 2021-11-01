import { NETWORK } from "../../constants/constants";
import TokenMinsInfo from "./constant/tokenMinConstant";
import AvalancheMainnet from "../config/avalancheMainnet";
import AvalancheTestnet from "../config/avalancheTestnet";
import ContractHelper from "../helper/contractHelper";

const minPercentage = 95;

const getAmountsOut = async(contract, amount, pairs) => {
    let result = [];
    try {
        result = await contract.methods.getAmountsOut(amount, pairs).call();
    } catch (err) {
        console.error(`Error in getAmountsOut(): `, err);
    } finally {
        return result;
    }
} 

const getPricePerFullShare = async(contract)=> {
    let pricePerFullShare = 0;
    try { 
        pricePerFullShare = await contract.getPricePerFullShare().call();
        pricePerFullShare = pricePerFullShare / 10 ** 18;
    } catch (err) {
        console.error(`Error in getPricePerFullShare of tokenPriceMinHelper`, err);
    } finally {
        return pricePerFullShare;
    }
}


const getAmountsOutMinDexStable = async(web3, network, shareToWithdraw, stableCoinToWithdraw, contractType) => {
    const strategies = network === NETWORK.AVALANCHEMAIN ? AvalancheMainnet : AvalancheTestnet;
    const strategy = strategies.find(s => s.vaultSymbol === contractType);

    const vaultContract = new web3.eth.Contract(
        strategy.vaultContractABI,
        strategy.vaultContractAddress
    );

    const strategyContract = new web3.eth.Contract(
        strategy.strategyAddress,
        strategy.strategyContractABI
    );

    // Get total ERC20 amount in vault
    const erc20Contracts = [];
    const fees = await vaultContract.fees();
    const erc20ABI = ContractHelper.getERC20AbiByNetwork(network);
    let totalERC20AmountInVault = 0;
    for(let i = 0; i < strategy.erc20addresses; i++) {
        const erc20Contract = new web3.eth.Contract(
            erc20ABI,
            strategy.erc20addresses[i]
        );
        const currencyType = strategy.symbols[i];

        let balanceInVault = erc20Contract.balanceOf(strategy.vaultContractAddress);
        if(["usdt", "usdc"].includes(currencyType.toLowerCase())) {
            balanceInVault = balanceInVault * 10 ** 12;
        }

        totalERC20AmountInVault = totalERC20AmountInVault + balanceInVault;
        
        const result = {
            currencyType,
            erc20Contract, 
            balanceInVault,
            address: strategy.erc20addresses[i]
        };

        erc20Contracts.push(result);
    }
    totalERC20AmountInVault = totalERC20AmountInVault - fees;

    // Get amount withdraw in USD
    const pricePerFullShare = await getPricePerFullShare();
    const totalAmountWithdrawInUSD = pricePerFullShare * shareToWithdraw;

    // Do nothing when total amount to withdraw in USD is less than total stablecoin balance in vault.
    if(totalAmountWithdrawInUSD <= totalERC20AmountInVault) {
        return [0];
    }

    // set stablecoin amount in vault
    const erc20BalanceInVault = erc20Contracts.find(e => e.erc20Contract === stableCoinToWithdraw);
    const amountToWithdrawFromStrategy = totalAmountWithdrawInUSD - erc20BalanceInVault;
    const strategyAllPoolInUSD = await strategyContract.getAllPoolInUSD();
    const sharePerc = (amountToWithdrawFromStrategy * 10 ** 18).div(strategyAllPoolInUSD);

    // Check strategy's WAVAX balance before withdraw
    const tokensInfo = TokenMinsInfo[contractType];
    const WAVAXAddress = tokensInfo.WAXAXAddress;
    const WAVAXContract = new web3.eth.Contact(erc20ABI, WAVAXAddress);
    const WAVAXAmountBefore = await WAVAXContract.balanceOf(strategy.strategyAddress);
    let totalWithdrawAVAX = WAVAXAmountBefore;

    for(let i = 0 ; i < tokensInfo.length; i++) {
        const tokenInfo = tokensInfo[i];
    
        const pairVaultContract = new web3.eth(tokenInfo.vaultAddress, )
    }



}

class TokenPriceMinHelper {
    static getTokenPriceMin = async(web3, network, contractType, erc20Address) => {
        let tokenPriceMin = [];
        try {
            const supportedNetwork = [
                NETWORK.ETHEREUM,
                NETWORK.BSCMAINNET,
                NETWORK.AVALANCHEMAIN
            ]
            if(!supportedNetwork.includes(network)) {
                throw new Error(`Not in mainnet network`);
            }
            if(!web3 || web3 === undefined) {
                throw new Error(`Missing web3`);
            }
            if(!contractType || contractType === undefined || contractType === "") {
                throw new Error(`Missing contract type`);
            }

            const tokensInfo = TokenMinsInfo[contractType];
            if(!tokensInfo || tokensInfo === undefined) {
                throw new Error(`Tokens Info undefined`);
            }

            const routerContracts = [];
            const routerAddresses = tokensInfo.routerAddresses;

            for(let i = 0; i < routerAddresses.length; i++) {
                const routerContract = new web3.eth.Contract(
                    tokensInfo.abi,
                    routerAddresses[i]
                );
                routerContracts.push(routerContract);
            }
      
            const tokensPairs = tokensInfo.tokens;

            const contractTypes = [
                "citadelv2",
                "daoSafu",
                "daoDegen",
                "daoTA",
                "daoAXA",
            ];

            for(let i = 0; i < tokensPairs.length; i ++) {
                const tokenPair = tokensPairs[i];
                let { amount, decimal, pairs, routerIndex } = tokenPair;
                
                if(i === 0 && contractTypes.includes(contractType)) {
                    pairs.push(erc20Address);
                }

                const magnifiedAmount =  web3.utils.toBN(amount * 10 ** decimal);
                const price = await getAmountsOut(
                    routerContracts[routerIndex],
                    magnifiedAmount,
                    pairs
                );
                // console.log(`${magnifiedAmount}, price ${price[1]}, pairs`, pairs);
               
                let priceMin = web3.utils.toBN(price[1]).muln(minPercentage).divn(100); 
                if(priceMin === undefined) {
                    console.error(`Price Min is undefined for`, tokenPair.pairs);
                    priceMin = 0;
                }
               
                tokenPriceMin.push(priceMin.toString());
            }
        
          } catch (err) {
            console.error(`Error in getTokenPriceMin(), `, err);
          } finally{
            if(tokenPriceMin.length <= 0) {
                tokenPriceMin = [0];
            }
            return tokenPriceMin;
          }
    }
}

export default TokenPriceMinHelper;