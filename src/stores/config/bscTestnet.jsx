import config from "../../config";
import { ADVANCE, DEGEN } from "../../constants/constants";
import { INFO_LINK } from "../../constants/page-constant";

const bscTestnet = [
    {
        id: "daoDEGEN",
        name: "USDT/USDC/DAI",
        symbol: "USDT",
        symbols: [
            "USDT", 
            "USDC", 
            "DAI"
        ],
        description: "Stablecoins",
        vaultSymbol: "daoDEGEN",
        erc20addresses: [
            "0x337610d27c682e347c9cd60bd4b3b107c9d34ddd",
            "0x64544969ed7ebf5f083679233325356ebe738930",
            "0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867",
        ],
        erc20address: "0x337610d27c682e347c9cd60bd4b3b107c9d34ddd",
        vaultContractAddress: "0x56f2005c3fec21dd3c21899fbceb1aae5b4bc5da",
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
        lastMeasurement: 12757720,
        measurement: 1e18,
        price_id: ["tether", "usd-coin", "dai"],
        priceInUSD: [0, 0, 0],
        strategyName: "DAO BSC Spaceship: USDT USDC DAI",
        strategy: "DAO BSC Spaceship",
        strategyAddress: "0xd1fc92873fcc59708cf26e2b8302188735caf526",
        strategyContractABI: config.vaultDAODegenStrategyContractABI,
        strategyInfo: "High risk BSC defi tokens with potential rocketship-like returns.",
        strategyDescription: "A range of high ROI potential but risky defi tokens that are native on the Binance Smart Chain (BSC) with added yield farming APRs.",
        historicalPriceId: "daoDEGEN_price",
        logoFormat: "png",
        risk: DEGEN,
        strategyType: "daoDegen",
        cTokenAddress: "",
        cAbi: "",
        group: DEGEN,
        tvlKey: "daoDEGEN_tvl",
        infoLink: INFO_LINK.DAODEGEN,
        isPopularItem: false,
        // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
    },
    {
        id: "daoSAFU",
        name: "USDT/USDC/DAI",
        symbol: "USDT",
        symbols: [
            "USDT", 
            "USDC", 
            //"DAI"
        ],
        description: "Stablecoins",
        vaultSymbol: "daoSAFU",
        erc20addresses: [
            "0x337610d27c682e347c9cd60bd4b3b107c9d34ddd",
            "0x64544969ed7ebf5f083679233325356ebe738930",
            "0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867",
        ],
        erc20address: "0x337610d27c682e347c9cd60bd4b3b107c9d34ddd",
        vaultContractAddress: "0x81390703430015a751f967694d5ccb8745fda254",
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
        lastMeasurement: 12751827,
        measurement: 1e18,
        price_id: ["tether", "usd-coin", "dai"],
        priceInUSD: [0, 0, 0],
        strategyName: "DAO BSC Citadel: USDT USDC DAI",
        strategy: "DAO BSC Citadel",
        strategyAddress: "0x7436297148face594f1b2f04a2901c3bb65eb771",
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

export default bscTestnet;