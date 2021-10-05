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
        vaultContractAddress: "0x81390703430015a751f967694d5ccb8745fda254", // Update this
        vaultContractABI: config.vaultDAODegenContractABI,
        balance: 0, // Stores balance of selectedERC20Address
        balances: [0, 0, 0],
        vaultBalance: 0,
        decimals: 18,
        deposit: true,
        depositAll: true,
        withdraw: true,
        withdrawAll: true, 
        lastMeasurement: 12751827, // Update this
        measurement: 1e18,
        price_id: ["tether", "usd-coin", "dai"],
        priceInUSD: [0, 0, 0],
        strategyName: "DAO Degen: USDT USDC DAI",
        strategy: "DAO Degen",
        strategyAddress: "0x7436297148face594f1b2f04a2901c3bb65eb771", // Update this
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

export default bscMainnet;