import config from "../../config";
import { ADVANCE } from "../../constants/constants";
import { INFO_LINK } from "../../constants/page-constant";

const bscTestnet = [
    {
        id: "daoDEGEN",
        name: "USDT/USDC/DAI",
        symbol: "USDT",
        symbols: ["USDT", "USDC", "DAI"],
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
        deposit: true,
        depositAll: true,
        withdraw: true,
        withdrawAll: true,
        lastMeasurement: 12757720,
        measurement: 1e18,
        price_id: ["tether", "usd-coin", "dai"],
        priceInUSD: [0, 0, 0],
        strategyName: "DAO Degen: USDT USDC DAI",
        strategy: "DAO Degen",
        strategyAddress: "0xd1fc92873fcc59708cf26e2b8302188735caf526",
        strategyContractABI: config.vaultDAODegenStrategyContractABI,
        strategyInfo: "A stablecoin farming strategy to compound more stablecoins.",
        strategyDescription: "A strategy to compound dollars, to ensure minimal portfolio volatility but a decent yield for uncertain times.",
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
];

export default bscTestnet;