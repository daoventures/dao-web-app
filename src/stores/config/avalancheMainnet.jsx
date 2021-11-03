import config from "../../config";
import { ADVANCE } from "../../constants/constants";
import { INFO_LINK } from "../../constants/page-constant";

const avalancheMainnet = [
    // {
    //     id: "daoAXA",
    //     name: "USDT/USDC/DAI",
    //     symbol: "USDT",
    //     symbols: ["USDT", "USDC", "DAI"],
    //     description: "Stablecoins",
    //     vaultSymbol: "daoAXA",
    //     erc20addresses: [
    //         "0xE01A4D7de190f60F86b683661F67f79F134E0582", // Update here
    //         "0xA6cFCa9EB181728082D35419B58Ba7eE4c9c8d38",
    //         "0x3bc22AA42FF61fC2D01E87c2Fa4268D0334b1a4c",
    //     ],
    //     erc20address: "0xE01A4D7de190f60F86b683661F67f79F134E0582",  // Update here
    //     vaultContractAddress: "0x0b0e5b52e14152308f9f952ff19c67ebeb7560bb",   // Update here
    //     vaultContractABI: config.avaxVaultContractABI,
    //     balance: 0, // Stores balance of selectedERC20Address
    //     balances: [0, 0, 0],
    //     vaultBalance: 0,
    //     decimals: 18,
    //     feeDecimals: 18,
    //     deposit: true,
    //     depositAll: true,
    //     withdraw: true,
    //     withdrawAll: true, 
    //     lastMeasurement: 2074684, // Updarte here
    //     measurement: 1e18,
    //     price_id: ["tether", "usd-coin", "dai"],
    //     priceInUSD: [0, 0, 0],
    //     strategyName: "DAO AVAX DEX indexfarm: USDT USDC DAI",
    //     strategy: "DAO AVAX DEX indexfarm",
    //     strategyAddress: "", 
    //     strategyContractABI: [],
    //     strategyInfo: "Yield farm with top Avalanche decentralised exchange tokens.",
    //     strategyDescription: "Invest in the top three Avalanche DEXs (Trader Joe, Pangolin Exchange and Lydia Finance) which will be paired with AVAX for additional yield farming.",
    //     historicalPriceId: "daoAXA_price",
    //     logoFormat: "svg",
    //     risk: ADVANCE,
    //     strategyType: "daoAXA",
    //     cTokenAddress: "",
    //     cAbi: "",
    //     group: ADVANCE,
    //     tvlKey: "daoAXA_tvl",
    //     infoLink: INFO_LINK.DAODEGEN,
    //     isPopularItem: false,
    //     // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
    // },
    // {
    //     id: "daoAXS",
    //     name: "USDT/USDC/DAI",
    //     symbol: "USDT",
    //     symbols: ["USDT", "USDC", "DAI"],
    //     description: "Stablecoins",
    //     vaultSymbol: "daoAXS",
    //     erc20addresses: [
    //         "0xE01A4D7de190f60F86b683661F67f79F134E0582",  // Update here
    //         "0xA6cFCa9EB181728082D35419B58Ba7eE4c9c8d38",
    //         "0x3bc22AA42FF61fC2D01E87c2Fa4268D0334b1a4c",
    //     ],
    //     erc20address: "0xE01A4D7de190f60F86b683661F67f79F134E0582", 
    //     vaultContractAddress: "0xdf9fc6774937bf42602be1f80ab3da8a0b2a8594",  // Update here
    //     vaultContractABI: config.avaxStableVaultContractABI,
    //     balance: 0, // Stores balance of selectedERC20Address
    //     balances: [0, 0, 0],
    //     vaultBalance: 0,
    //     decimals: 18,
    //     feeDecimals: 18,
    //     deposit: true,
    //     depositAll: true,
    //     withdraw: true,
    //     withdrawAll: true, 
    //     lastMeasurement: 2074783, // Update here
    //     measurement: 1e18,
    //     price_id: ["tether", "usd-coin", "dai"],
    //     priceInUSD: [0, 0, 0],
    //     strategyName: "DAO AVAX DEX-Stablecoin indexfarm: USDT USDC DAI",
    //     strategy: "DAO AVAX DEX-Stablecoin indexfarm",
    //     strategyAddress: "", 
    //     strategyContractABI: [],
    //     strategyInfo: "Pairing top Avalanche decentralised exchange tokens with stablecoin for reduced volatility.",
    //     strategyDescription: "Pairing stablecoins with Avalanche DEX tokens (Trader Joe, Pangolin Exchange and Lydia Finance) to reduce volatility while still enjoying incentivised yield farming rewards.",
    //     historicalPriceId: "daoAXS_price",
    //     logoFormat: "svg",
    //     risk: ADVANCE,
    //     strategyType: "daoAXS",
    //     cTokenAddress: "",
    //     cAbi: "",
    //     group: ADVANCE,
    //     tvlKey: "daoAXS_tvl",
    //     infoLink: INFO_LINK.DAODEGEN,
    //     isPopularItem: false,
    //     // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
    // },
    // {
    //     id: "daoASA",
    //     name: "USDT/USDC/DAI",
    //     symbol: "USDT",
    //     symbols: ["USDT", "USDC", "DAI"],
    //     description: "Stablecoins",
    //     vaultSymbol: "daoASA",
    //     erc20addresses: [
    //         "0xE01A4D7de190f60F86b683661F67f79F134E0582",  // Update here
    //         "0xA6cFCa9EB181728082D35419B58Ba7eE4c9c8d38",
    //         "0x3bc22AA42FF61fC2D01E87c2Fa4268D0334b1a4c",
    //     ],
    //     erc20address: "0xE01A4D7de190f60F86b683661F67f79F134E0582", // Update here
    //     vaultContractAddress: "0x0d79f121fd1eb213e5dbde11edbe7744ecb51352", // Update here
    //     vaultContractABI: config.avaxStableVaultContractABI,
    //     balance: 0, // Stores balance of selectedERC20Address
    //     balances: [0, 0, 0],
    //     vaultBalance: 0,
    //     decimals: 18,
    //     feeDecimals: 18,
    //     deposit: true,
    //     depositAll: true,
    //     withdraw: true,
    //     withdrawAll: true,  
    //     lastMeasurement: 2074872,  // Update here
    //     measurement: 1e18,
    //     price_id: ["tether", "usd-coin", "dai"],
    //     priceInUSD: [0, 0, 0],
    //     strategyName: "DAO AVAX farm: USDT USDC DAI",
    //     strategy: "DAO AVAX farm",
    //     strategyAddress: "", 
    //     strategyContractABI: [],
    //     strategyInfo: "Invest in the Avalanche chain with lowered volatility and additional yield farming.",
    //     strategyDescription: "Pure AVAX-stablecoin yield farming on DEXs to ride the growth of the Avalanche ecosystem.",
    //     historicalPriceId: "daoASA_price",
    //     logoFormat: "svg",
    //     risk: ADVANCE,
    //     strategyType: "daoASA",
    //     cTokenAddress: "",
    //     cAbi: "",
    //     group: ADVANCE,
    //     tvlKey: "daoASA_tvl",
    //     infoLink: INFO_LINK.DAODEGEN,
    //     isPopularItem: false,
    //     // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
    // },
    // {
    //     id: "daoA2S",
    //     name: "USDT/USDC/DAI",
    //     symbol: "USDT",
    //     symbols: ["USDT", "USDC", "DAI"],
    //     description: "Stablecoins",
    //     vaultSymbol: "daoA2S",
    //     erc20addresses: [
    //         "0xE01A4D7de190f60F86b683661F67f79F134E0582",  // Update here
    //         "0xA6cFCa9EB181728082D35419B58Ba7eE4c9c8d38",
    //         "0x3bc22AA42FF61fC2D01E87c2Fa4268D0334b1a4c",
    //     ],
    //     erc20address: "0xE01A4D7de190f60F86b683661F67f79F134E0582", 
    //     vaultContractAddress: "0x89d6fd8ba3eaf76687cf7b3d10f914cc445eaec1",  // Update here
    //     vaultContractABI: config.avaxStableVaultContractABI,
    //     balance: 0, // Stores balance of selectedERC20Address
    //     balances: [0, 0, 0],
    //     vaultBalance: 0,
    //     decimals: 18,
    //     feeDecimals: 18,
    //     deposit: true,
    //     depositAll: true,
    //     withdraw: true,
    //     withdrawAll: true, 
    //     lastMeasurement: 2074921,  // Update here
    //     measurement: 1e18,
    //     price_id: ["tether", "usd-coin", "dai"],
    //     priceInUSD: [0, 0, 0],
    //     strategyName: "DAO AVAX Stablecoin Farm: USDT USDC DAI",
    //     strategy: "DAO AVAX Stablecoin Farm",
    //     strategyAddress: "", 
    //     strategyContractABI: [],
    //     strategyInfo: "Minimise risks by farming pure stablecoin pairs on Avalanche.",
    //     strategyDescription: "Leverages many of the yield farming incentives provided on the Avalanche ecosystem while minimising the volatility risks with pure stablecoin-stablecoin pairs.",
    //     historicalPriceId: "daoA2S_price",
    //     logoFormat: "svg",
    //     risk: ADVANCE,
    //     strategyType: "daoA2S",
    //     cTokenAddress: "",
    //     cAbi: "",
    //     group: ADVANCE,
    //     tvlKey: "daoA2S_tvl",
    //     infoLink: INFO_LINK.DAODEGEN,
    //     isPopularItem: false,
    //     // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
    // },
];

export default avalancheMainnet;