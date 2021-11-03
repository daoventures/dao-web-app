import BigNumber from "bignumber.js";
import ContractHelper from "../contractHelper";
import config from "../../../config/config";

const USDTAddr = "0xc7198437980c041c805A1EDcbA50c1Ce5db95118"
const USDCAddr = "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664"
const DAIAddr = "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70"

const joeRouterAddr = "0x60aE616a2155Ee3d9A68541Ba4544862310933d4"
const pngRouterAddr = "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106"
const lydRouterAddr = "0xA52aBE4676dbfd04Df42eF7755F01A3c41f28D27"

const JOEAddr = "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd"
const PNGAddr = "0x60781C2586D68229fde47564546784ab3fACA982"
const LYDAddr = "0x4C9B4E1AC6F24CdE3660D5E4Ef1eBF77C710C084"


const JOEUSDCAddr = "0x67926d973cD8eE876aD210fAaf7DFfA99E414aCf"
const PNGUSDTAddr = "0x1fFB6ffC629f5D820DCf578409c2d26A2998a140"
const LYDDAIAddr = "0x4EE072c5946B4cdc00CBdeB4A4E54A03CF6d08d3"

const JOEUSDCVaultAddr = "0xC4029ad66AAe4DCF3F8A8C67F4000EAFE49E6d10"
const PNGUSDTVaultAddr = "0x3d78fDb997995f0bF7C5d881a758C45F1B706b80"
const LYDDAIVaultAddr = "0x469b5620675a9988c24cDd57B1E7136E162D6a53"


class DAOAXSTokenMinPrice {    
    static getAmountsOut = async(object) => {
        let { 
            web3, 
            asset,  
            shareToWithdraw, 
            withdrawERC20Address,
            network
        } = object;

        shareToWithdraw = new BigNumber(shareToWithdraw);
        const deXStableVault = new web3.eth.Contract(asset.vaultContractAddress, asset.vaultContractABI);
        const dexStableStrategy = new web3.eth.Contract(asset.strategyAddress, asset.strategyContractABI);

        let deXStablePool = await deXStableVault.methods.getAllPoolInUSD().call();
        let deXStablePendingDeposit = await deXStableVault.methods.totalPendingDepositAmt().call();
        let deXStableTotalSupply = await deXStableVault.methods.totalSupply().call();

        const amtWithdrawInUSD = new BigNumber(deXStablePool).minus(deXStablePendingDeposit).multipliedBy(shareToWithdraw).dividedBy(deXStableTotalSupply);
        
        const erc20ABI = ContractHelper.getERC20AbiByNetwork(network);
        const fees = await deXStableVault.methods.fees().call();
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
            const strategyAllPoolInUSD = await dexStableStrategy.methods.getAllPoolInUSD().call();
            const sharePerc = amtToWithdrawFromStrategy.multipliedBy(oneEther).dividedBy(strategyAllPoolInUSD);

            // JOE <-> USDC
            const JOEUSDCVault = new web3.eth.Contract(JOEUSDCVaultAddr, config.avaxVaultL1ABI);
            let JOEUSDCBalance = await JOEUSDCVault.methods.balanceOf(asset.strategyAddress).call();
            JOEUSDCBalance = new BigNumber(JOEUSDCBalance);
            const JOEUSDCVaultAmt = JOEUSDCBalance.multipliedBy(sharePerc).dividedBy(oneEther);

            let JOEUSDCVaultPool = await JOEUSDCVault.methods.getAllPool().call();
            JOEUSDCVaultPool = new BigNumber(JOEUSDCVaultPool);
            let JOEUSDCVaultTotalSupply = await JOEUSDCVault.methods.totalSupply().call();
            JOEUSDCVaultTotalSupply = new BigNumber(JOEUSDCVaultTotalSupply);
            const JOEUSDCAmt = JOEUSDCVaultPool.multipliedBy(JOEUSDCVaultAmt).dividedBy(JOEUSDCVaultTotalSupply);

            const JOEUSDC = new web3.eth.Contract(JOEUSDCAddr, config.pairABI);
            let JOEUSDCTotalSupply = await JOEUSDC.methods.totalSupply().call();
            JOEUSDCTotalSupply = new BigNumber(JOEUSDCTotalSupply);
            let [JOEReserve, USDCReserve] = await JOEUSDC.methods.getReserves().call();
            JOEReserve = new BigNumber(JOEReserve);
            USDCReserve = new BigNumber(USDCReserve);
            const JOEAmt = JOEReserve.multipliedBy(JOEUSDCAmt).dividedBy(JOEUSDCTotalSupply);
            const USDCAmt = USDCReserve.multipliedBy(JOEUSDCAmt).dividedBy(JOEUSDCTotalSupply);
           
            const joeRouter = new web3.eth.Contract(joeRouterAddr, config.uniswapV2RouterABI);
            const _USDCAmt = (await joeRouter.methods.methods.getAmountsOut(JOEAmt, [JOEAddr, USDCAddr]).call())[1]
            const _USDCAmtMin = _USDCAmt.mul(995).div(1000);


            // PNG <-> USDT
            const PNGUSDTVault = new web3.eth.Contract(PNGUSDTVaultAddr, config.avaxVaultL1ABI);
            let PNGUSDTBalance = await PNGUSDTVault.methods.balanceOf(asset.strategyAddress).call();
            PNGUSDTBalance = new BigNumber(PNGUSDTBalance);
            const PNGUSDTVaultAmt = PNGUSDTBalance.multipliedBy(sharePerc).dividedBy(oneEther);

            let PNGUSDTVaultPool = await PNGUSDTVault.methods.getAllPool().call();
            PNGUSDTVaultPool = new BigNumber(PNGUSDTVaultPool);
            let PNGUSDTVaultTotalSupply = await PNGUSDTVault.methods.totalSupply().call();
            PNGUSDTVaultTotalSupply = new BigNumber(PNGUSDTVaultTotalSupply);
            const PNGUSDTAmt = PNGUSDTVaultPool.multipliedBy(PNGUSDTVaultAmt).dividedBy(PNGUSDTVaultTotalSupply);

            const PNGUSDT = new web3.eth.Contract(PNGUSDTAddr, config.pairABI);
            let PNGUSDTTotalSupply = await PNGUSDT.methods.totalSupply().call();
            PNGUSDTTotalSupply = new BigNumber(PNGUSDTTotalSupply);
            let [PNGReserve, USDTReserve] = await PNGUSDT.methods.getReserves().call();
            PNGReserve = new BigNumber(PNGReserve);
            USDTReserve = new BigNumber(USDTReserve);
            const PNGAmt = PNGReserve.multipliedBy(PNGUSDTAmt).dividedBy(PNGUSDTTotalSupply);
            const USDTAmt = USDTReserve.multipliedBy(PNGUSDTAmt).dividedBy(PNGUSDTTotalSupply);
            const pngRouter = new web3.eth.Contract(pngRouterAddr, config.uniswapV2RouterABI);
            const _USDTAmt = (await pngRouter.methods.getAmountsOut(PNGAmt.toString(), [PNGAddr, USDTAddr]).call())[1]
            const  _USDTAmtMin = _USDTAmt.mul(995).div(1000);
          
            // LYD <-> DAI
            const LYDDAIVault = new web3.eth.Contract(LYDDAIVaultAddr, config.avaxVaultL1ABI);
            let LYDDAIBalance = await LYDDAIVault.methods.balanceOf(asset.strategyAddress).call();
            LYDDAIBalance = new BigNumber(LYDDAIBalance);
            const LYDDAIVaultAmt = LYDDAIBalance.multipliedBy(sharePerc).dividedBy(oneEther);

            let LYDDAIVaultPool = await LYDDAIVault.methods.getAllPool().call();
            LYDDAIVaultPool = new BigNumber(LYDDAIVaultPool);
            let LYDDAIVaultTotalSupply = await LYDDAIVault.methods.totalSupply().call();
            LYDDAIVaultTotalSupply = new BigNumber(LYDDAIVaultTotalSupply);
            const LYDDAIAmt = LYDDAIVaultPool.multipliedBy(LYDDAIVaultAmt).dividedBy(LYDDAIVaultTotalSupply);

            const LYDDAI = new web3.eth.Contract(LYDDAIAddr, config.pairABI);
            let LYDDAITotalSupply = await LYDDAI.methods.totalSupply().call();
            LYDDAITotalSupply = new BigNumber(LYDDAITotalSupply);
            let [LYDReserve, DAIReserve] = await LYDDAI.methods.getReserves().call();
            LYDReserve = new BigNumber(LYDReserve);
            DAIReserve = new BigNumber(DAIReserve);
            const LYDAmt = LYDReserve.multipliedBy(LYDDAIAmt).dividedBy(LYDDAITotalSupply);
            const DAIAmt = DAIReserve.multipliedBy(LYDDAIAmt).dividedBy(LYDDAITotalSupply);
            const lydRouter = new web3.eth.Contract(lydRouterAddr, config.uniswapV2RouterABI);
            const _DAIAmt = (await lydRouter.methods.getAmountsOut(LYDAmt.toString(), [LYDAddr, DAIAddr]).call())[1]
            const _DAIAmtMin = _DAIAmt.mul(995).div(1000);
    
            
            amountsOutMin = [
                0,
                _USDCAmtMin,
                _USDTAmtMin,
                _DAIAmtMin
            ];
        } else {
            amountsOutMin = [0];
        }

        return amountsOutMin;
    }
}

export default DAOAXSTokenMinPrice;