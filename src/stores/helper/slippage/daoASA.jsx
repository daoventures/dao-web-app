import BigNumber from "bignumber.js";
import ContractHelper from "../contractHelper";
import config from "../../../config/config";

const USDTAddr = "0xc7198437980c041c805A1EDcbA50c1Ce5db95118"
const USDCAddr = "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664"
const DAIAddr = "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70"
const WAVAXAddr = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"

const joeRouterAddr = "0x60aE616a2155Ee3d9A68541Ba4544862310933d4"
const pngRouterAddr = "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106"

const USDTAVAXAddr = "0x67926d973cD8eE876aD210fAaf7DFfA99E414aCf"
const USDCAVAXAddr = "0x1fFB6ffC629f5D820DCf578409c2d26A2998a140"
const DAIAVAXAddr = "0x4EE072c5946B4cdc00CBdeB4A4E54A03CF6d08d3"

const USDTAVAXVaultAddr = "0xC4029ad66AAe4DCF3F8A8C67F4000EAFE49E6d10"
const USDCAVAXVaultAddr = "0x3d78fDb997995f0bF7C5d881a758C45F1B706b80"
const DAIAVAXVaultAddr = "0x469b5620675a9988c24cDd57B1E7136E162D6a53"

class DAOASATokenMinPrice {    
    static getAmountsOut = async(object) => {
        let { 
            web3, 
            asset,  
            shareToWithdraw, 
            withdrawERC20Address,
            network
        } = object;

        shareToWithdraw = new BigNumber(shareToWithdraw);
        const stableAvaxVault = new web3.eth.Contract(asset.vaultContractAddress, asset.vaultContractABI);
        const stableAvaxStrategy = new web3.eth.Contract(asset.strategyAddress, asset.strategyContractABI);

        let stableAvaxPool = await stableAvaxVault.methods.getAllPoolInUSD().call();
        let stableAvaxPendingDeposit = await stableAvaxVault.methods.totalPendingDepositAmt().call();
        let stableAvaxTotalSupply = await stableAvaxVault.methods.totalSupply().call();

        const amtWithdrawInUSD = new BigNumber(stableAvaxPool).minus(stableAvaxPendingDeposit).multipliedBy(shareToWithdraw).dividedBy(stableAvaxTotalSupply);
        
        const erc20ABI = ContractHelper.getERC20AbiByNetwork(network);
        const fees = await stableAvaxVault.methods.fees().call();
        const USDTContract = new web3.eth.Contract(USDTAddr, erc20ABI);
        const USDCContract = new web3.eth.Contract(USDCAddr, erc20ABI);
        const DAIContract = new web3.eth.Contract(DAIAddr, erc20ABI);
        let USDTAmtInVault = await USDTContract.methods.balanceOf(asset.vaultContractAddress).call();
        USDTAmtInVault = new BigNumber(USDTAmtInVault).shiftedBy(12);
        let USDCAmtInVault = await USDCContract.balanceOf(asset.vaultContractAddress).call();
        USDCAmtInVault = new BigNumber(USDCAmtInVault).shiftedBy(12);
        let DAIAmtInVault = await DAIContract.balanceOf(asset.vaultContractAddress).call();
        const totalAmtInVault = USDTAmtInVault.plus(USDCAmtInVault).plus(DAIAmtInVault).minus(new BigNumber(fees));

        let amountsOutMin;
        if(amtWithdrawInUSD.gt(totalAmtInVault)) {
            const oneEther = new BigNumber(1).shiftedBy(18);

            let stablecoinAmtInVault;
            if (withdrawERC20Address.toLowerCase() === USDTAddr.toLowerCase()) {
                stablecoinAmtInVault = USDTAmtInVault
            } else if (withdrawERC20Address.toLowerCase() === USDCAddr.toLowerCase()) {
                stablecoinAmtInVault = USDCAmtInVault
            } else {
                stablecoinAmtInVault = DAIAmtInVault
            }   
          
            const amtToWithdrawFromStrategy = amtWithdrawInUSD.minus(stablecoinAmtInVault);
            const strategyAllPoolInUSD = await stableAvaxStrategy.methods.getAllPoolInUSD().call();
            const sharePerc = amtToWithdrawFromStrategy.multipliedBy(oneEther).dividedBy(strategyAllPoolInUSD);

            // USDT <-> AVAX
            const USDTAVAXVault = new web3.eth.Contract(USDTAVAXVaultAddr, config.avaxVaultL1ABI);
            let USDTAVAXBalance = await USDTAVAXVault.methods.balanceOf(asset.strategyAddress).call();
            USDTAVAXBalance = new BigNumber(USDTAVAXBalance);
            const USDTAVAXVaultAmt = USDTAVAXBalance.multipliedBy(sharePerc).dividedBy(oneEther);

            let USDTAVAXVaultPool = await USDTAVAXVault.methods.getAllPool().call();
            USDTAVAXVaultPool = new BigNumber(USDTAVAXVaultPool);
            let USDTAVAXVaultTotalSupply = await USDTAVAXVault.methods.totalSupply().call();
            USDTAVAXVaultTotalSupply = new BigNumber(USDTAVAXVaultTotalSupply);
            const USDTAVAXAmt = USDTAVAXVaultPool.multipliedBy(USDTAVAXVaultAmt).dividedBy(USDTAVAXVaultTotalSupply);

            const USDTAVAX = new web3.eth.Contract(USDTAVAXAddr, config.pairABI);
            let USDTAVAXTotalSupply = await USDTAVAX.methods.totalSupply().call();
            USDTAVAXTotalSupply = new BigNumber(USDTAVAXTotalSupply);
            let [WAVAXReserveLyd, USDTReserve] = await USDTAVAX.methods.getReserves().call();
            WAVAXReserveLyd = new BigNumber(WAVAXReserveLyd);
            USDTReserve = new BigNumber(USDTReserve);
            const WAVAXAmtLyd = WAVAXReserveLyd.multipliedBy(USDTAVAXAmt).dividedBy(USDTAVAXTotalSupply);
            const USDTAmt = USDTReserve.multipliedBy(USDTAVAXAmt).dividedBy(USDTAVAXTotalSupply);
           
            const lydRouter = new web3.eth.Contract(joeRouterAddr, config.uniswapV2RouterABI);
            const _USDTAmt = (await lydRouter.methods.getAmountsOut(WAVAXAmtLyd, [WAVAXAddr, USDTAddr]).call())[1]
            const _USDTAmtMin = _USDTAmt.mul(995).div(1000);


            // USDC <-> AVAX
            const USDCAVAXVault = new web3.eth.Contract(USDCAVAXVaultAddr, config.avaxVaultL1ABI);
            let USDCAVAXBalance = await USDCAVAXVault.methods.balanceOf(asset.strategyAddress).call();
            USDCAVAXBalance = new BigNumber(USDCAVAXBalance);
            const USDCAVAXVaultAmt = USDCAVAXBalance.multipliedBy(sharePerc).dividedBy(oneEther);

            let USDCAVAXVaultPool = await USDCAVAXVault.methods.getAllPool().call();
            USDCAVAXVaultPool = new BigNumber(USDCAVAXVaultPool);
            let USDCAVAXVaultTotalSupply = await USDCAVAXVault.methods.totalSupply().call();
            USDCAVAXVaultTotalSupply = new BigNumber(USDCAVAXVaultTotalSupply);
            const USDCAVAXAmt = USDCAVAXVaultPool.multipliedBy(USDCAVAXVaultAmt).dividedBy(USDCAVAXVaultTotalSupply);

            const USDCAVAX = new web3.eth.Contract(USDCAVAXAddr, config.pairABI);
            let USDCAVAXTotalSupply = await USDCAVAX.methods.totalSupply().call();
            USDCAVAXTotalSupply = new BigNumber(USDCAVAXTotalSupply);
            let [USDCReserve, WAVAXReservePng] = await USDCAVAX.methods.getReserves().call();
            USDCReserve = new BigNumber(USDCReserve);
            WAVAXReservePng = new BigNumber(WAVAXReservePng);
            const USDCAmt = USDCReserve.multipliedBy(USDCAVAXAmt).dividedBy(USDCAVAXTotalSupply);
            const WAVAXAmtPng = WAVAXReservePng.multipliedBy(USDCAVAXAmt).dividedBy(USDCAVAXTotalSupply);
            const pngRouter = new web3.eth.Contract(pngRouterAddr, config.uniswapV2RouterABI);
            const _USDCAmt = (await pngRouter.methods.getAmountsOut(WAVAXAmtPng.toString(), [WAVAXAddr, USDCAddr]).call())[1]
            const  _USDCAmtMin = _USDCAmt.mul(995).div(1000);
          
            // DAI <-> AVAX
            const DAIAVAXVault = new web3.eth.Contract(DAIAVAXVaultAddr, config.avaxVaultL1ABI);
            let DAIAVAXBalance = await DAIAVAXVault.methods.balanceOf(asset.strategyAddress).call();
            DAIAVAXBalance = new BigNumber(DAIAVAXBalance);
            const DAIAVAXVaultAmt = DAIAVAXBalance.multipliedBy(sharePerc).dividedBy(oneEther);

            let DAIAVAXVaultPool = await DAIAVAXVault.methods.getAllPool().call();
            DAIAVAXVaultPool = new BigNumber(DAIAVAXVaultPool);
            let DAIAVAXVaultTotalSupply = await DAIAVAXVault.methods.totalSupply().call();
            DAIAVAXVaultTotalSupply = new BigNumber(DAIAVAXVaultTotalSupply);
            const DAIAVAXAmt = DAIAVAXVaultPool.multipliedBy(DAIAVAXVaultAmt).dividedBy(DAIAVAXVaultTotalSupply);

            const DAIAVAX = new web3.eth.Contract(DAIAVAXAddr, config.pairABI);
            let DAIAVAXTotalSupply = await DAIAVAX.methods.totalSupply().call();
            DAIAVAXTotalSupply = new BigNumber(DAIAVAXTotalSupply);
            let [WAVAXReserveJoe, DAIReserve] = await DAIAVAX.methods.getReserves().call();
            WAVAXReserveJoe = new BigNumber(WAVAXReserveJoe);
            DAIReserve = new BigNumber(DAIReserve);
            const WAVAXAmtJoe = WAVAXReserveJoe.multipliedBy(DAIAVAXAmt).dividedBy(DAIAVAXTotalSupply);
            const DAIAmt = DAIReserve.multipliedBy(DAIAVAXAmt).dividedBy(DAIAVAXTotalSupply);
            const joeRouter = new web3.eth.Contract(joeRouterAddr, config.uniswapV2RouterABI);
            const _DAIAmt = (await joeRouter.methods.getAmountsOut(WAVAXAmtJoe.toString(), [WAVAXAddr, DAIAddr]).call())[1]
            const _DAIAmtMin = _DAIAmt.mul(995).div(1000);
    
            amountsOutMin = [
                0,
                _USDTAmtMin,
                _USDCAmtMin,
                _DAIAmtMin
            ];
        } else {
            amountsOutMin = [0];
        }

        return amountsOutMin;
    }
}

export default DAOASATokenMinPrice;