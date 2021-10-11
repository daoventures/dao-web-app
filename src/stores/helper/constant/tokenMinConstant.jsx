import config from "../../../config/config";

// Addresses in mainnet
// CitadelV2
const WETHAddr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const WBTCAddr = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
const DPIAddr = "0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b";
const DAIAddr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; 

// DAO Stonks
const USTAddr = "0xa47c8bf37f92abed4a126bda807a7b7498661acd";
const mMSFTAddr = "0x41BbEDd7286dAab5910a1f15d12CBda839852BD7";
const mTWTRAddr = "0xEdb0414627E6f1e3F082DE65cD4F9C693D78CCA9";
const  mTSLAAddr = "0x21cA39943E91d704678F5D00b6616650F066fD63";
const  mGOOGLAddr = "0x59A921Db27Dd6d4d974745B7FfC5c33932653442";
const  mAMZNAddr = "0x0cae9e4d663793c2a2A0b211c1Cf4bBca2B9cAa7";
const  mAAPLAddr = "0xd36932143F6eBDEDD872D5Fb0651f4B72Fd15a84";
const  mNFLXAddr = "0xC8d674114bac90148d11D3C1d33C61835a0F9DCD";

// DAO Safu
const wBNBBscAddr = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
const btcbBscAddress = "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
const wethBscAddress = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
const bUSDBscAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
const cakeBscAddress = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"

const tokensMinInfo = {
    citadelv2: {
        routerAddress: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
        abi: config.uniswapV2RouterABI,
        tokens: [
            { amount: 1, decimal: 18, pairs:[WETHAddr]}, // ETH <-> Stablecoins for withdraw
            { amount: 1, decimal: 8, pairs:[WBTCAddr, WETHAddr]},
            { amount: 1, decimal: 18, pairs:[DPIAddr, WETHAddr]},
            { amount: 1, decimal: 18, pairs:[DAIAddr, WETHAddr]},
        ]
    },
    daoStonks: {
        routerAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        abi: config.uniswapV2RouterABI,
        tokens: [
            { amount: 1, decimal: 18, pairs:[mMSFTAddr, USTAddr]},
            { amount: 1, decimal: 18, pairs:[mTWTRAddr, USTAddr]},
            { amount: 1, decimal: 18, pairs:[mTSLAAddr, USTAddr]},
            { amount: 1, decimal: 18, pairs:[mGOOGLAddr, USTAddr]},
            { amount: 1, decimal: 18, pairs:[mAMZNAddr, USTAddr]},
            { amount: 1, decimal: 18, pairs:[mAAPLAddr, USTAddr]},
            { amount: 1, decimal: 18, pairs:[mNFLXAddr, USTAddr]},
        ]
    },
    daoSafu : {
        routerAddress: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
        abi: config.uniswapV2RouterABI,
        tokens: [
            { amount: 1, decimal: 18, pairs:[wBNBBscAddr]},
            { amount: 1, decimal: 18, pairs:[btcbBscAddress, wBNBBscAddr]},
            { amount: 1, decimal: 18, pairs:[wethBscAddress, wBNBBscAddr]},
            { amount: 1, decimal: 18, pairs:[bUSDBscAddress, wBNBBscAddr]},
            { amount: 1, decimal: 18, pairs:[cakeBscAddress, wBNBBscAddr]},
        ]
    }
};

export default tokensMinInfo;