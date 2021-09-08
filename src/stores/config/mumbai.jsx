import config from "../../config";
import { ADVANCE } from "../../constants/constants";
import { INFO_LINK } from "../../constants/page-constant";

const mumbai = [
    {
        id: "daoMPT",
        name: "USDT/USDC/DAI",
        symbol: "USDT",
        symbols: ["USDT", "USDC", "DAI"],
        description: "Stablecoins",
        vaultSymbol: "daoMPT",
        erc20addresses: [
            "0xbd21a10f619be90d6066c941b04e340841f1f989",
            "0x2058a9d7613eee744279e3856ef0eada5fcbaa7e",
            "0x001b3b4d0f3714ca98ba10f6042daebf0b1b7b6f",
        ],
        erc20address: "0xbd21a10f619be90d6066c941b04e340841f1f989",
        vaultContractAddress: "0x4f0bc6bd6beb231087781336bacd5613527ac63c",
        vaultContractABI: config.vaultDAOMPTContractABI,
        balance: 0, // Stores balance of selectedERC20Address
        balances: [0, 0, 0],
        vaultBalance: 0,
        decimals: 18,
        deposit: true,
        depositAll: true,
        withdraw: true,
        withdrawAll: true,
        lastMeasurement: 16133926,
        measurement: 1e18,
        price_id: ["tether", "usd-coin", "dai"],
        priceInUSD: [0, 0, 0],
        strategyName: "DAO Money Printer: USDT USDC DAI",
        strategy: "DAO Money Printer",
        strategyAddress: "0x8894da48bb8b7f7751ac4e2c37ed31b68d0c587f",
        strategyContractABI: config.vaultDAOMPTStrategyABI,
        strategyInfo: "A stablecoin farming strategy to compound more stablecoins.",
        strategyDescription: "A strategy to compound dollars, to ensure minimal portfolio volatility but a decent yield for uncertain times.",
        historicalPriceId: "daoMPT_price",
        logoFormat: "svg",
        risk: ADVANCE,
        strategyType: "moneyPrinter",
        cTokenAddress: "",
        cAbi: "",
        group: ADVANCE,
        tvlKey: "daoMPT_tvl",
        infoLink: INFO_LINK.MONEY_PRINTER,
        isPopularItem: false,
        // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
      },
];

export default mumbai;