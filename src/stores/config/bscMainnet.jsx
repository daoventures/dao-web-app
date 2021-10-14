import config from "../../config";
import { ADVANCE } from "../../constants/constants";
import { INFO_LINK } from "../../constants/page-constant";

const bscMainnet = [
    {
        id: "daoDEGEN",
        name: "USDT/USDC/DAI",
        symbol: "USDT",
        symbols: ["USDT", "USDC", "DAI"],
        description: "Stablecoins",
        vaultSymbol: "daoDEGEN",
        erc20addresses: [
            "0x55d398326f99059fF775485246999027B3197955", 
            "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
            "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
        ],
        erc20address: "0x55d398326f99059fF775485246999027B3197955", 
        vaultContractAddress: "0x56f2005c3fec21dd3c21899fbceb1aae5b4bc5da", // Update this
        vaultContractABI: config.vaultDAODegenContractABI,
        balance: 0, // Stores balance of selectedERC20Address
        balances: [0, 0, 0],
        vaultBalance: 0,
        decimals: 18,
        feeDecimals: 18,
        deposit: true,
        depositAll: true,
        withdraw: true,
        withdrawAll: true, 
        lastMeasurement: 12751827, // Update this
        measurement: 1e18,
        price_id: ["tether", "usd-coin", "dai"],
        priceInUSD: [0, 0, 0],
        strategyName: "DAO BSC Spaceship: USDT USDC DAI",
        strategy: "DAO BSC Spaceship",
        strategyAddress: "0x7436297148face594f1b2f04a2901c3bb65eb771", // Update this
        strategyContractABI: config.vaultDAODegenStrategyContractABI,
        strategyInfo: "High risk BSC defi tokens with potential rocketship-like returns.",
        strategyDescription: "A range of high ROI potential but risky defi tokens that are native on the Binance Smart Chain (BSC) with added yield farming APRs.",
        historicalPriceId: "daoDEGEN_price",
        logoFormat: "png",
        risk: ADVANCE,
        strategyType: "daoDegen",
        cTokenAddress: "",
        cAbi: "",
        group: ADVANCE,
        tvlKey: "daoDEGEN_tvl",
        infoLink: INFO_LINK.DAODEGEN,
        isPopularItem: false,
        // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
    },
    {
        id: "daoSAFU",
        name: "USDT/USDC/DAI",
        symbol: "USDT",
        symbols: ["USDT", "USDC", "DAI"],
        description: "Stablecoins", 
        vaultSymbol: "daoSAFU",
        erc20addresses: [
            "0x55d398326f99059fF775485246999027B3197955", 
            "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
            "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
        ],
        erc20address: "0x55d398326f99059fF775485246999027B3197955", 
        vaultContractAddress: "0x81390703430015a751f967694d5ccb8745fda254", // Update this
        vaultContractABI: config.vaultDAOSAFUContractABI,
        balance: 0, // Stores balance of selectedERC20Address
        balances: [0, 0, 0],
        vaultBalance: 0,
        decimals: 18,
        feeDecimals: 18,
        deposit: true,
        depositAll: true,
        withdraw: true,
        withdrawAll: true, 
        lastMeasurement: 12751827, // Update this
        measurement: 1e18,
        price_id: ["tether", "usd-coin", "dai"],
        priceInUSD: [0, 0, 0],
        strategyName: "DAO BSC Citadel: USDT USDC DAI",
        strategy: "DAO BSC Citadel",
        strategyAddress: "0x7436297148face594f1b2f04a2901c3bb65eb771", // Update this
        strategyContractABI: config.vaultDAOSAFUStrategyABI,
        strategyInfo: "Top BSC ecosystem defi tokens.",
        strategyDescription: "The same beloved DAO Citadel but built on BSC with additional exposure to BNB with new improved auto-compounder that maximises yield farming.",
        historicalPriceId: "daoSAFU_price",
        logoFormat: "png",
        risk: ADVANCE,
        strategyType: "daoSafu",
        cTokenAddress: "",
        cAbi: "",
        group: ADVANCE,
        tvlKey: "daoSAFU_tvl",
        infoLink: INFO_LINK.DAOSAFU,
        isPopularItem: false,
        // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
      },
];

export default bscMainnet;