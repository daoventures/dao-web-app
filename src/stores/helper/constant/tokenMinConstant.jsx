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

// Metaverse
const AXSAddr = "0xBB0E17EF65F82Ab018d8EDd776e8DD940327B28b";
const SLPAddr = "0xCC8Fa225D80b9c7D42F96e9570156c65D6cAAa25";
const ILVAddr = "0x767FE9EDC9E0dF98E07454847909b5E959D7ca0E";
const GHSTAddr = "0x3F382DbD960E3a9bbCeaE22651E88158d2791550";
const REVVAddr = "0x557B933a7C2c45672B610F8954A3deB39a51A8Ca";
const MVIAddr = "0x72e364F2ABdC788b7E918bc238B21f109Cd634D7";

const tokensMinInfo = {
    metaverse: {
        routerAddress: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
        abi: config.uniswapV2RouterABI,
        tokens: [
            { amount: 1, decimal: 18, pairs:[WETHAddr]}, // ETH <-> Stablecoins for withdraw
            { amount: 1, decimal: 18, pairs:[AXSAddr, WETHAddr]},
            { amount: 1, decimal: 0, pairs:[SLPAddr, WETHAddr]},
            { amount: 1, decimal: 18, pairs:[ILVAddr, WETHAddr]},
            { amount: 1, decimal: 18, pairs:[GHSTAddr, WETHAddr]},
            { amount: 1, decimal: 18, pairs:[REVVAddr, WETHAddr]},
            { amount: 1, decimal: 18, pairs:[MVIAddr, WETHAddr]},
        ]
    },
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
    }
};

export default tokensMinInfo;