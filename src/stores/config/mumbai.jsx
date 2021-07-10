import config from "../../config";
import { ADVANCE } from "../../constants/constants";

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
        vaultContractAddress: "0xdc2f0e17702f9083adc057893b2b1e273c11e09a",
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
        strategyAddress: "0x9fbbfc353772672b58a9ee1ad55265a5a09640a1",
        strategyContractABI: config.vaultDAOMPTStrategyABI,
        historicalPriceId: "daoMPT_price",
        logoFormat: "svg",
        risk: ADVANCE,
        strategyType: "moneyPrinter",
        cTokenAddress: "",
        cAbi: "",
        group: ADVANCE,
        tvlKey: "daoMPT_tvl",
        infoLink:
          "https://www.google.com",
        isPopularItem: false,
        // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
      },
];

export default mumbai;