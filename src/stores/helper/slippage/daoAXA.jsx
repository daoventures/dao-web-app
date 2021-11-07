import BigNumber from "bignumber.js";
import ContractHelper from "../contractHelper";
import config from "../../../config/config";

const USDTAddr = "0xc7198437980c041c805A1EDcbA50c1Ce5db95118"
const USDCAddr = "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664"
const DAIAddr = "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70"
const WAVAXAddr = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"

const joeRouterAddr = "0x60aE616a2155Ee3d9A68541Ba4544862310933d4"
const pngRouterAddr = "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106"
const lydRouterAddr = "0xA52aBE4676dbfd04Df42eF7755F01A3c41f28D27"

const JOEAddr = "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd"
const PNGAddr = "0x60781C2586D68229fde47564546784ab3fACA982"
const LYDAddr = "0x4C9B4E1AC6F24CdE3660D5E4Ef1eBF77C710C084"

const JOEAVAXAddr = "0x454E67025631C065d3cFAD6d71E6892f74487a15"
const PNGAVAXAddr = "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367"
const LYDAVAXAddr = "0xFba4EdaAd3248B03f1a3261ad06Ad846A8e50765"

const JOEAVAXVaultAddr = "0xFe67a4BAe72963BE1181B211180d8e617B5a8dee"
const PNGAVAXVaultAddr = "0x7eEcFB07b7677aa0e1798a4426b338dA23f9De34"
const LYDAVAXVaultAddr = "0xffEaB42879038920A31911f3E93295bF703082ed"

const deXAvaxStrategyAddr = "0xDE5d4923e7Db1242a26693aA04Fa0C0FCf7D11f4"

class DAOAXATokenMinPrice {    
    static getAmountsOut = async(object) => {
        let { 
            web3, 
            asset,  
            shareToWithdraw, 
            withdrawERC20Address,
            network
        } = object;

        shareToWithdraw = new BigNumber(shareToWithdraw);
        const dexAvaxVault = new web3.eth.Contract(asset.vaultContractAddress, asset.vaultContractABI);
        const dexAvaxStrategy = new web3.eth.Contract(asset.strategyAddress, asset.strategyContractABI);

        let dexAvaxPool = await dexAvaxVault.methods.getAllPoolInUSD().call();
        let dexAvaxPendingDeposit = await dexAvaxVault.methods.totalPendingDepositAmt().call();
        let dexAvaxTotalSupply = await dexAvaxVault.methods.totalSupply().call();

        const amtWithdrawInUSD = new BigNumber(dexAvaxPool).minus(dexAvaxPendingDeposit).multipliedBy(shareToWithdraw).dividedBy(dexAvaxTotalSupply);
        
        const erc20ABI = ContractHelper.getERC20AbiByNetwork(network);
        const fees = await dexAvaxVault.methods.fees().call();
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
            const strategyAllPoolInUSD = await dexAvaxStrategy.methods.getAllPoolInUSD().call();
            const sharePerc = amtToWithdrawFromStrategy.multipliedBy(oneEther).dividedBy(strategyAllPoolInUSD);

            const WAVAXContract = new web3.eth.Contract(WAVAXAddr, erc20ABI);
            const WAVAXAmtBefore = await WAVAXContract.methods.balanceOf(deXAvaxStrategyAddr).call();
            let totalWithdrawWAVAX = WAVAXAmtBefore;
            let WAVAXAmt, _WAVAXAmt;

            // JOE <-> AVAX
            const JOEAVAXVault = new web3.eth.Contract(JOEAVAXVaultAddr, config.avaxVaultL1ABI);
            let JOEAVAXBalance = await JOEAVAXVault.methods.balanceOf(deXAvaxStrategyAddr).call();
            JOEAVAXBalance = new BigNumber(JOEAVAXBalance);
            const JOEAVAXVaultAmt = JOEAVAXBalance.multipliedBy(sharePerc).dividedBy(oneEther);

            let JOEAVAXVaultPool = await JOEAVAXVault.methods.getAllPool().call();
            JOEAVAXVaultPool = new BigNumber(JOEAVAXVaultPool);
            let JOEAVAXVaultTotalSupply = await JOEAVAXVault.methods.totalSupply().call();
            JOEAVAXVaultTotalSupply = new BigNumber(JOEAVAXVaultTotalSupply);
            const JOEAVAXAmt = JOEAVAXVaultPool.multipliedBy(JOEAVAXVaultAmt).dividedBy(JOEAVAXVaultTotalSupply);

            const JOEAVAX = new web3.eth.Contract(JOEAVAXAddr, config.pairABI);
            let JOEAVAXTotalSupply = await JOEAVAX.methods.totalSupply().call();
            JOEAVAXTotalSupply = new BigNumber(JOEAVAXTotalSupply);
            let [JOEReserve, WAVAXReserveJOE] = await JOEAVAX.methods.getReserves().call();
            JOEReserve = new BigNumber(JOEReserve);
            WAVAXReserveJOE = new BigNumber(WAVAXReserveJOE);
            const JOEAmt = JOEReserve.multipliedBy(JOEAVAXAmt).dividedBy(JOEAVAXTotalSupply);
            WAVAXAmt = WAVAXReserveJOE.multipliedBy(JOEAVAXAmt).dividedBy(JOEAVAXTotalSupply);
            totalWithdrawWAVAX = totalWithdrawWAVAX.add(WAVAXAmt);
            const joeRouter = new web3.eth.Contract(joeRouterAddr, config.uniswapV2RouterABI);
            _WAVAXAmt = (await joeRouter.methods.getAmountsOut(JOEAmt.toString(), [JOEAddr, WAVAXAddr]).call())[1]
            const _WAVAXAmtMinJoe = _WAVAXAmt.mul(995).div(1000);
            totalWithdrawWAVAX = totalWithdrawWAVAX.add(_WAVAXAmt);


            // PNG <-> AVAX
            const PNGAVAXVault = new web3.eth.Contract(PNGAVAXVaultAddr, config.avaxVaultL1ABI);
            let PNGAVAXBalance = await PNGAVAXVault.methods.balanceOf(deXAvaxStrategyAddr).call();
            PNGAVAXBalance = new BigNumber(PNGAVAXBalance);
            const PNGAVAXVaultAmt = PNGAVAXBalance.multipliedBy(sharePerc).dividedBy(oneEther);

            
            let PNGAVAXVaultPool = await PNGAVAXVault.methods.getAllPool().call();
            PNGAVAXVaultPool = new BigNumber(PNGAVAXVaultPool);
            let PNGAVAXVaultTotalSupply = await PNGAVAXVault.methods.totalSupply().call();
            PNGAVAXVaultTotalSupply = new BigNumber(PNGAVAXVaultTotalSupply);
            const PNGAVAXAmt = PNGAVAXVaultPool.multipliedBy(PNGAVAXVaultAmt).dividedBy(PNGAVAXVaultTotalSupply);

            const PNGAVAX = new web3.eth.Contract(PNGAVAXAddr, config.pairABI);
            let PNGAVAXTotalSupply = await PNGAVAX.methods.totalSupply().call();
            PNGAVAXTotalSupply = new BigNumber(PNGAVAXTotalSupply);
            let [PNGReserve, WAVAXReservePNG] = await PNGAVAX.methods.getReserves().call();
            PNGReserve = new BigNumber(PNGReserve);
            WAVAXReservePNG = new BigNumber(WAVAXReservePNG);
            const PNGAmt = PNGReserve.multipliedBy(PNGAVAXAmt).dividedBy(PNGAVAXTotalSupply);
            WAVAXAmt = WAVAXReservePNG.multipliedBy(PNGAVAXAmt).dividedBy(PNGAVAXTotalSupply);
            totalWithdrawWAVAX = totalWithdrawWAVAX.add(WAVAXAmt);
            const pngRouter = new web3.eth.Contract(pngRouterAddr, config.uniswapV2RouterABI);
            _WAVAXAmt = (await pngRouter.methods.getAmountsOut(PNGAmt.toString(), [PNGAddr, WAVAXAddr]).call())[1]
            const _WAVAXAmtMinPng = _WAVAXAmt.mul(995).div(1000);
            totalWithdrawWAVAX = totalWithdrawWAVAX.add(_WAVAXAmt);


            // LYD <-> AVAX
            const LYDAVAXVault = new web3.eth.Contract(LYDAVAXVaultAddr, config.avaxVaultL1ABI);
            let LYDAVAXBalance = await LYDAVAXVault.methods.balanceOf(deXAvaxStrategyAddr).call();
            LYDAVAXBalance = new BigNumber(LYDAVAXBalance);
            const LYDAVAXVaultAmt = LYDAVAXBalance.multipliedBy(sharePerc).dividedBy(oneEther);

            let LYDAVAXVaultPool = await LYDAVAXVault.methods.getAllPool().call();
            LYDAVAXVaultPool = new BigNumber(LYDAVAXVaultPool);
            let LYDAVAXVaultTotalSupply = await LYDAVAXVault.methods.totalSupply().call();
            LYDAVAXVaultTotalSupply = new BigNumber(LYDAVAXVaultTotalSupply);
            const LYDAVAXAmt = LYDAVAXVaultPool.multipliedBy(LYDAVAXVaultAmt).dividedBy(LYDAVAXVaultTotalSupply);

            const LYDAVAX = new web3.eth.Contract(LYDAVAXAddr, config.pairABI);
            let LYDAVAXTotalSupply = await LYDAVAX.methods.totalSupply().call();
            LYDAVAXTotalSupply = new BigNumber(LYDAVAXTotalSupply);
            let [LYDReserve, WAVAXReserveLYD] = await LYDAVAX.methods.getReserves().call();
            LYDReserve = new BigNumber(LYDReserve);
            WAVAXReserveLYD = new BigNumber(WAVAXReserveLYD);
            const LYDAmt = LYDReserve.multipliedBy(LYDAVAXAmt).dividedBy(LYDAVAXTotalSupply);
            WAVAXAmt = WAVAXReserveLYD.multipliedBy(LYDAVAXAmt).dividedBy(LYDAVAXTotalSupply);
            totalWithdrawWAVAX = totalWithdrawWAVAX.add(WAVAXAmt);
            const lydRouter = new web3.eth.Contract(lydRouterAddr, config.uniswapV2RouterABI);
            _WAVAXAmt = (await lydRouter.methods.getAmountsOut(LYDAmt.toString(), [LYDAddr, WAVAXAddr]).call())[1]
            const _WAVAXAmtMinLyd = _WAVAXAmt.mul(995).div(1000);
            totalWithdrawWAVAX = totalWithdrawWAVAX.add(_WAVAXAmt);

            totalWithdrawWAVAX = totalWithdrawWAVAX.sub(WAVAXAmtBefore)

            const withdrawAmtInStablecoin = (await joeRouter.getAmountsOut(totalWithdrawWAVAX, [WAVAXAddr, withdrawERC20Address]).call())[1]
            const withdrawAmtInStablecoinMin = withdrawAmtInStablecoin.mul(995).div(1000)
            
            amountsOutMin = [
                withdrawAmtInStablecoinMin,
                _WAVAXAmtMinJoe,
                _WAVAXAmtMinPng,
                _WAVAXAmtMinLyd
            ];
        } else {
            amountsOutMin = [0];
        }

        return amountsOutMin;
    }
}

export default DAOAXATokenMinPrice; 