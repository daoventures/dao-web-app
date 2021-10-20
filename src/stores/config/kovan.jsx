import { ADVANCE, BASIC, DEGEN, EXPERT } from "../../constants/constants";

import config from "../../config";
import { INFO_LINK } from "../../constants/page-constant";

const kovan = [
  {
    id: "daoCDV",
    name: "USDT/USDC/DAI",
    symbol: "USDT",
    symbols: ["USDT", "USDC", "DAI"],
    description: "Stablecoins",
    vaultSymbol: "daoCDV",
    erc20addresses: [
      "0x07de306ff27a2b630b1141956844eb1552b956b5",
      "0xb7a4f3e9097c08da09517b5ab877f7a917224ede",
      "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    ],
    erc20address: "0x07de306ff27a2b630b1141956844eb1552b956b5",
    vaultContractAddress: "0x626C25cA5b86277f395c0E40DBdF51f2a302aB43",
    vaultContractABI: config.vaultDAOCDVContractABI,
    balance: 0, // Stores balance of selectedERC20Address
    balances: [0, 0, 0],
    vaultBalance: 0,
    decimals: 18,
    feeDecimals: 18,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: 25336169,
    measurement: 1e18,
    price_id: ["tether", "usd-coin", "dai"],
    priceInUSD: [0, 0, 0],
    strategyName: "DAO Citadel: USDT USDC DAI",
    strategy: "DAO Citadel",
    strategyAddress: "0xc9939B0b2af53E8BeCBA22ab153795e168140237",
    strategyContractABI: config.strategyDAOCDVContractABI,
    strategyInfo: "A balanced crypto portfolio enhanced with yield farming rewards.",
    strategyDescription: "A market weight strategy that gives an investor a balanced exposure to crypto. Portfolio components are paired up to earn yield farming rewards to boost returns. ",
    historicalPriceId: "daoCDV_price",
    logoFormat: "png",
    risk: EXPERT,
    strategyType: "citadel",
    cTokenAddress: "",
    cAbi: "",
    group: EXPERT,
    tvlKey: "daoCDV_tvl",
    infoLink: INFO_LINK.CITADEL,
    isPopularItem: true,
    happyHourEnabled: true,
    performanceId: "daoCDV",
  },
  {
    id: "daoCDV2",
    name: "USDT/USDC/DAI",
    symbol: "USDT",
    symbols: ["USDT", "USDC", "DAI"],
    description: "Stablecoins",
    vaultSymbol: "daoCDV2",
    erc20addresses: [
      "0x07de306ff27a2b630b1141956844eb1552b956b5",
      "0xb7a4f3e9097c08da09517b5ab877f7a917224ede",
      "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    ],
    erc20address: "0x07de306ff27a2b630b1141956844eb1552b956b5",
    vaultContractAddress: "0xc5719B5E85c30eB6a49d3C1b8058ae2435146C88",
    vaultContractABI: config.vaultDAOCDV2ContractABI,
    balance: 0, // Stores balance of selectedERC20Address
    balances: [0, 0, 0],
    vaultBalance: 0,
    decimals: 18,
    feeDecimals: 18,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: 27165510,
    measurement: 1e18,
    price_id: ["tether", "usd-coin", "dai"],
    priceInUSD: [0, 0, 0],
    strategyName: "DAO Citadel V2: USDT USDC DAI",
    strategy: "DAO Citadel V2",
    strategyAddress: "0xa2b42a59ee0312a5f9d56dfad90ee6fa4a1be184",
    strategyContractABI: config.vaultDAOCDV2StrategyABI,
    strategyInfo: "Invest in balanced blue chip cryptos with added yield.",
    strategyDescription: "The same beloved DAO Citadel with BTC/ETH/DPI but built on a new improved auto-compounder that maximises yield through reduced platform fees.",
    historicalPriceId: "daoCDV2_price",
    logoFormat: "png",
    risk: EXPERT,
    strategyType: "citadelv2",
    cTokenAddress: "",
    cAbi: "",
    group: EXPERT,
    tvlKey: "daoCDV2_tvl",
    infoLink: INFO_LINK.CITADELV2,
    isPopularItem: true,
    happyHourEnabled: true,
    performanceId: "daoCDV2",
  },
  {
    id: "daoTAS",
    name: "USDT/USDC/DAI",
    symbol: "USDT",
    symbols: ["USDT", "USDC", "DAI"],
    description: "Stablecoins",
    vaultSymbol: "daoTAS",
    erc20addresses: [
      "0x07de306ff27a2b630b1141956844eb1552b956b5",
      "0xb7a4f3e9097c08da09517b5ab877f7a917224ede",
      "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    ],
    erc20address: "0x07de306ff27a2b630b1141956844eb1552b956b5",
    vaultContractAddress: "0xb72b89fa6d222973379cbd9c5c88768e3a050aed",
    vaultContractABI: config.vaultDAOTASContractABI,
    balance: 0, // Stores balance of selectedERC20Address
    balances: [0, 0, 0],
    vaultBalance: 0,
    decimals: 18,
    feeDecimals: 18,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: 27400992,
    measurement: 1e18,
    price_id: ["tether", "usd-coin", "dai"],
    priceInUSD: [0, 0, 0],
    strategyName: "DAO Tech Anlys: USDT USDC DAI",
    strategy: "DAO Tech Anlys",
    strategyAddress: "0xfd2f8db43bcd7817bc6cd83a3bbf18dbe8227e55",
    strategyContractABI: config.vaultDAOTASStrategyABI,
    strategyInfo: "Technical analysis meets yield farming.",
    strategyDescription: "This strategy switches between 2 modes depending on moving average technical indicators, to capture major market trends.",
    historicalPriceId: "daoTAS_price",
    logoFormat: "png",
    risk: EXPERT,
    strategyType: "daoTA",
    cTokenAddress: "",
    cAbi: "",
    group: EXPERT,
    tvlKey: "daoTAS_tvl",
    infoLink: INFO_LINK.TA,
    isPopularItem: true,
    happyHourEnabled: true,
    performanceId: "daoTAS",

  },
  {
    id: "daoMVF",
    name: "USDT/USDC/DAI",
    symbol: "USDT",
    symbols: ["USDT", "USDC", "DAI"],
    description: "Stablecoins",
    vaultSymbol: "daoMVF",
    erc20addresses: [
      "0x07de306ff27a2b630b1141956844eb1552b956b5",
      "0xb7a4f3e9097c08da09517b5ab877f7a917224ede",
      "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    ],
    erc20address: "0x07de306ff27a2b630b1141956844eb1552b956b5",
    vaultContractAddress: "0xcBb69E3621ce4EB0d99B60f0E0430dCD5f52fC95",
    vaultContractABI: config.vaultDAOMVFContractABI,
    balance: 0, // Stores balance of selectedERC20Address
    balances: [0, 0, 0],
    vaultBalance: 0,
    decimals: 18,
    feeDecimals: 18,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: 27185171,
    measurement: 1e18,
    price_id: ["tether", "usd-coin", "dai"],
    priceInUSD: [0, 0, 0],
    strategyName: "DAO Metaverse: USDT USDC DAI",
    strategy: "DAO Metaverse",
    strategyAddress: "0xf4655e971cc76b6daa78b4615dc2be4446e67e53",
    strategyContractABI: config.vaultDAOMVFStrategyABI,
    strategyInfo: "Ride the growth of NFT and gamefi ecosystems.",
    strategyDescription: " Investors can gain exposure to the booming NFT and gaming sector with this product that invests in the most successful metaverse tokens.",
    historicalPriceId: "daoMVF_price",
    logoFormat: "png",
    risk: EXPERT,
    strategyType: "metaverse",
    cTokenAddress: "",
    cAbi: "",
    group: EXPERT,
    tvlKey: "daoMVF_tvl",
    infoLink: INFO_LINK.METAVERSE,
    isPopularItem: true,
    happyHourEnabled: true,
    performanceId: "daoMVF",
  },
  {
    id: "daoSTO",
    name: "USDT/USDC/DAI",
    symbol: "USDT",
    symbols: ["USDT", "USDC", "DAI"],
    description: "Stablecoins",
    vaultSymbol: "daoSTO",
    erc20addresses: [
      "0x07de306ff27a2b630b1141956844eb1552b956b5",
      "0xb7a4f3e9097c08da09517b5ab877f7a917224ede",
      "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    ],
    erc20address: "0x07de306ff27a2b630b1141956844eb1552b956b5",
    vaultContractAddress: "0xd6af81e5288be43137debf969d7f2c03482c8cc1",
    vaultContractABI: config.vaultDAOSTOContractABI,
    balance: 0,
    balances: [0, 0, 0],
    vaultBalance: 0,
    decimals: 18,
    feeDecimals: 18,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: "25867823",
    measurement: 1e18,
    price_id: ["tether", "usd-coin", "dai"],
    priceInUSD: [0, 0, 0],
    strategyName: "DAO FAANG Stonk: USDT USDC DAI",
    strategy: "DAO FAANG Stonks",
    strategyAddress: "0xc0f43b6db13e5988c92aa8c7c286a51f493620d4",
    strategyContractABI: config.strategyDAOSTOContractABI,
    strategyInfo: "Popular US tech stocks with yield farming rewards and reduced volatility.",
    strategyDescription: "US tech stock names packaged into a bundle for one-click investment, with only half the volatility of the stock market. High chance of beating Wall Street with yield farming.",
    historicalPriceId: "daoSTO_price",
    logoFormat: "png",
    risk: ADVANCE,
    strategyType: "daoFaang",
    cTokenAddress: "",
    cAbi: "",
    group: ADVANCE,
    tvlKey: "daoSTO_tvl",
    infoLink: INFO_LINK.FAANG,
    isPopularItem: true, // use to render popular item icon
    happyHourEnabled: true,
    performanceId: "daoSTO",
  },
  {
    id: "daoSTO2",
    name: "USDT/USDC/DAI",
    symbol: "USDT",
    symbols: ["USDT", "USDC", "DAI"],
    description: "Stablecoins",
    vaultSymbol: "daoSTO2",
    erc20addresses: [
      "0x07de306ff27a2b630b1141956844eb1552b956b5",
      "0xb7a4f3e9097c08da09517b5ab877f7a917224ede",
      "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    ],
    erc20address: "0x07de306ff27a2b630b1141956844eb1552b956b5",
    vaultContractAddress: "0xb8e43526D2FEE347F88E690ee86d047895472D04",
    vaultContractABI: config.vaultDAOSTO2ContractABI,
    balance: 0,
    balances: [0, 0, 0],
    vaultBalance: 0,
    decimals: 18,
    feeDecimals: 18,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: "27263090",
    measurement: 1e18,
    price_id: ["tether", "usd-coin", "dai"],
    priceInUSD: [0, 0, 0],
    strategyName: "DAO Tech Stonks: USDT USDC DAI",
    strategy: "DAO Tech Stonks",
    strategyAddress: "0xa8a3b0412a25c1183dfcfed6dc7b6acd584a6383",
    strategyContractABI: config.vaultDAOSTO2StrategyABI,
    strategyInfo: "Diversified basket of US tech stocks with yield incentives.",
    strategyDescription: "A basket of diversified popular US tech stocks that leverages on yield farming incentives to provide superior returns.",
    historicalPriceId: "daoSTO2_price",
    logoFormat: "png",
    risk: ADVANCE,
    strategyType: "daoStonks",
    cTokenAddress: "",
    cAbi: "",
    group: ADVANCE,
    tvlKey: "daoSTO2_tvl",
    infoLink: INFO_LINK.FAANG,
    isPopularItem: true, // use to render popular item icon
    happyHourEnabled: true,
    performanceId: "daoSTO2",
  },
  {
    id: "daoELO",
    name: "USDT/USDC/DAI",
    symbol: "USDT",
    symbols: ["USDT", "USDC", "DAI"],
    description: "Stablecoins",
    vaultSymbol: "daoELO",
    erc20addresses: [
      "0x07de306ff27a2b630b1141956844eb1552b956b5",
      "0xb7a4f3e9097c08da09517b5ab877f7a917224ede",
      "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    ],
    erc20address: "0x07de306ff27a2b630b1141956844eb1552b956b5",
    vaultContractAddress: "0xf03fa8553379d872b4e2Bafbc679409Fb82604c2",
    vaultContractABI: config.vaultDAOELOContractABI,
    balance: 0, // Stores balance of selectedERC20Address
    balances: [0, 0, 0],
    vaultBalance: 0,
    decimals: 18,
    feeDecimals: 6,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: 25413059,
    measurement: 1e18,
    price_id: ["tether", "usd-coin", "dai"],
    priceInUSD: [0, 0, 0],
    strategyName: "Elon's Ape: USDT USDC DAI",
    strategy: "DAO Elon",
    strategyAddress: "0xa4F71f88bd522b33af3ae515Caafa956BD1bbFa1",
    strategyContractABI: config.strategyDAOELOContractABI,
    strategyInfo: "A basket of 3 assets associated with Elon Musk: Bitcoin, Dogecoin, and Tesla",
    strategyDescription: "Invest in a basket of ERC-20 tokens representing the 3 names most commonly associated with Elon Musk: Bitcoin, Dogecoin, and Tesla.",
    historicalPriceId: "daoELO_price",
    logoFormat: "png",
    risk: DEGEN,
    strategyType: "elon",
    cTokenAddress: "",
    cAbi: "",
    group: DEGEN,
    tvlKey: "daoELO_tvl",
    infoLink: INFO_LINK.ELON,
    isPopularItem: false,
    happyHourEnabled: false,
  },
  {
    id: "daoCUB",
    name: "USDT/USDC/DAI",
    symbol: "USDT",
    symbols: ["USDT", "USDC", "DAI"],
    description: "Stablecoins",
    vaultSymbol: "daoCUB",
    erc20addresses: [
      "0x07de306ff27a2b630b1141956844eb1552b956b5",
      "0xb7a4f3e9097c08da09517b5ab877f7a917224ede",
      "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    ],
    erc20address: "0x07de306ff27a2b630b1141956844eb1552b956b5",
    vaultContractAddress: "0x5c304a6cb105e1bff9805ca5cf072f1d2c3beac5",
    vaultContractABI: config.vaultDAOELOContractABI,
    balance: 0, // Stores balance of selectedERC20Address
    balances: [0, 0, 0],
    vaultBalance: 0,
    decimals: 18,
    feeDecimals: 6,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: 25536976,
    measurement: 1e18,
    price_id: ["tether", "usd-coin", "dai"],
    priceInUSD: [0, 0, 0],
    strategyName: "Cuban's Ape: USDT USDC DAI",
    strategy: "DAO Cuban",
    strategyAddress: "0x998372c8dc70833a7dc687020257302582fa5838",
    strategyContractABI: config.strategyDAOCUBContractABI,
    strategyInfo: "A basket featuring DeFi and NFT names Mark Cuban has invested in.",
    strategyDescription: "A basket of 7 DeFi and NFT names that billionaire Mark Cuban has publicly been known to invest in.",
    historicalPriceId: "daoCUB_price",
    logoFormat: "png",
    risk: DEGEN,
    strategyType: "cuban",
    cTokenAddress: "",
    cAbi: "",
    group: DEGEN,
    tvlKey: "daoCUB_tvl",
    infoLink: INFO_LINK.CUBAN,
    isPopularItem: false,
    happyHourEnabled: false,
  },
 /* {
    id: "USDT",
    name: "USDT",
    symbol: "USDT",
    description: "Tether USD",
    vaultSymbol: "dvmUSDT",
    vaultAddress: "0xa5c53c76729e92630a2a3c549215110a330c902d",
    erc20address: "0x07de306ff27a2b630b1141956844eb1552b956b5",
    vaultContractAddress: "0x6B150E9BD70E216775c8b73270E64e870a3110c1",
    vaultContractABI: config.vaultUSDTContractABI,
    balance: 0,
    vaultBalance: 0,
    decimals: 6,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: 10651402,
    measurement: 1e18,
    price_id: "tether",
    strategyName: "Yearn-Fighter: USDT",
    strategy: "Yearn Vault",
    strategyContractABI: config.strategyUSDTContractABI,
    vaultABI: config.vaultContractV3ABI,
    historicalPriceId: "yUSDT_price",
    logoFormat: "png",
    risk: ADVANCE,
    strategyType: "yearn",
    group: ADVANCE,
    tvlKey: "yUSDT_tvl",
    infoLink: INFO_LINK.YEARN,
    isPopularItem: false,
  },
  {
    id: "DAI",
    name: "DAI",
    symbol: "DAI",
    description: "DAI Stablecoin",
    vaultSymbol: "dvmDAI",
    vaultAddress: "0x5c2eea0a960cc1f604bf3c35a52ca2273f12e67e",
    erc20address: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    vaultContractAddress: "0x2428bFD238a3632552B343297c504F60283009eD",
    vaultContractABI: config.vaultDAIContractABI,
    balance: 0,
    vaultBalance: 0,
    decimals: 18,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: 10650116,
    measurement: 1e18,
    price_id: "dai",
    // yVaultCheckAddress: '0x1bbe0f9af0cf852f9ff14637da2f0bc477a6d1ad',
    strategyName: "Yearn-Fighter: DAI",
    strategy: "Yearn Vault",
    strategyContractABI: config.strategyDAIContractABI,
    vaultABI: config.vaultContractV3ABI,
    historicalPriceId: "yDAI_price",
    logoFormat: "png",
    risk: ADVANCE,
    strategyType: "yearn",
    group: ADVANCE,
    tvlKey: "yDAI_tvl",
    infoLink: INFO_LINK.YEARN,
    isPopularItem: false,
  },
  {
    id: "USDC",
    name: "USDC",
    symbol: "USDC",
    description: "USDC Coin",
    vaultSymbol: "dvmUSDC",
    vaultAddress: "0xabdb489ded91b6646fadc8eeb0ca82ea1d526182",
    erc20address: "0xb7a4f3e9097c08da09517b5ab877f7a917224ede",
    vaultContractAddress: "0x6E15e283dc430eca010Ade8b11b5B377902d6e56",
    vaultContractABI: config.vaultUSDCContractABI,
    balance: 0,
    vaultBalance: 0,
    decimals: 6,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: 10532708,
    measurement: 1e18,
    price_id: "usd-coin",
    strategyName: "Yearn-Fighter: USDC",
    strategy: "Yearn Vault",
    strategyContractABI: config.strategyUSDCContractABI,
    vaultABI: config.vaultContractABI,
    historicalPriceId: "yUSDC_price",
    logoFormat: "png",
    risk: ADVANCE,
    strategyType: "yearn",
    group: ADVANCE,
    tvlKey: "cUSDC_tvl",
    infoLink: INFO_LINK.YEARN,
    isPopularItem: false,
  },
  {
    id: "TUSD",
    name: "TUSD",
    symbol: "TUSD",
    description: "TrueUSD",
    vaultSymbol: "dvmTUSD",
    vaultAddress: "0xa8564f8d255c33175d4882e55f1a6d19e7a7d351",
    erc20address: "0xf0a112a9da3cae4668270729c3d5917b6cb79564",
    vaultContractAddress: "0xEcCb98c36bfc8c49c6065d1cD90bcf1c6F02D4AD",
    vaultContractABI: config.vaultTUSDContractABI,
    balance: 0,
    vaultBalance: 0,
    decimals: 18,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: 10603368,
    measurement: 1e18,
    price_id: "true-usd",
    strategyName: "Yearn-Fighter: TUSD",
    strategy: "Yearn Vault",
    strategyContractABI: config.strategyTUSDContractABI,
    vaultABI: config.vaultContractV3ABI,
    historicalPriceId: "yTUSD_price",
    logoFormat: "png",
    risk: ADVANCE,
    strategyType: "yearn",
    group: ADVANCE,
    tvlKey: "yTUSD_tvl",
    infoLink: INFO_LINK.YEARN,
    isPopularItem: false,
  },
  {
    id: "cUSDT",
    name: "USDT",
    symbol: "USDT",
    description: "Compound USDT",
    vaultSymbol: "dvlUSDT",
    erc20address: "0x07de306ff27a2b630b1141956844eb1552b956b5",
    vaultContractAddress: "0x5d102E0Bdf2037899E1FF2E8cc50987108533c52",
    vaultContractABI: config.compoundVaultContractABI,
    balance: 0,
    vaultBalance: 0,
    decimals: 6,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: 10651402,
    measurement: 1e18,
    price_id: "compound-usdt",
    strategyName: "Compound-Fighter: Compound USDT",
    strategy: "Compound USDT",
    strategyContractABI: config.compundStrategyCompundABI,
    historicalPriceId: "cUSDT_price",
    logoFormat: "png",
    risk: BASIC,
    strategyType: "compound",
    cTokenAddress: "0x3f0A0EA2f86baE6362CF9799B523BA06647Da018",
    cAbi: config.cUSDTContract,
    group: BASIC,
    tvlKey: "cUSDT_tvl",
    infoLink: INFO_LINK.COMPOUND,
    isPopularItem: false,
  },
  {
    id: "cDAI",
    name: "DAI",
    symbol: "DAI",
    description: "Compound DAI",
    vaultSymbol: "dvlDAI",
    erc20address: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    vaultContractAddress: "0x47E565B1e23cdA3D6bB69e7ae398b884f5ADdc7D",
    vaultContractABI: config.compoundVaultContractABI,
    balance: 0,
    vaultBalance: 0,
    decimals: 18,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: 10650116,
    measurement: 1e18,
    price_id: "cdai",
    strategyName: "Compound-Fighter: Compound DAI",
    strategy: "Compound DAI",
    strategyContractABI: config.compundStrategyCompundABI,
    historicalPriceId: "cDAI_price",
    logoFormat: "png",
    risk: BASIC,
    strategyType: "compound",
    cTokenAddress: "0xf0d0eb522cfa50b716b3b1604c4f0fa6f04376ad",
    cAbi: config.cDAIContract,
    group: BASIC,
    tvlKey: "cDAI_tvl",
    infoLink: INFO_LINK.COMPOUND,
    isPopularItem: false,
  },
  {
    id: "cUSDC",
    name: "USDC",
    symbol: "USDC",
    description: "Compound USDC",
    vaultSymbol: "dvlUSDC",
    erc20address: "0xb7a4f3e9097c08da09517b5ab877f7a917224ede",
    vaultContractAddress: "0x05AB7659e6Ef9Ba1a5F790b402fD1688F01b003E",
    vaultContractABI: config.compoundVaultContractABI,
    balance: 0,
    vaultBalance: 0,
    decimals: 6,
    deposit: true,
    depositAll: true,
    withdraw: true,
    withdrawAll: true,
    lastMeasurement: 10532708,
    measurement: 1e18,
    price_id: "compound-usd-coin",
    strategyName: "Compound-Fighter: Compound USDC",
    strategy: "Compound USDC",
    strategyContractABI: config.compundStrategyCompundABI,
    historicalPriceId: "cUSDC_price",
    logoFormat: "png",
    risk: BASIC,
    strategyType: "compound",
    cTokenAddress: "0x4a92e71227d294f041bd82dd8f78591b75140d63",
    cAbi: config.cUSDCContract,
    group: BASIC,
    tvlKey: "cUSDT_tvl",
    infoLink: INFO_LINK.COMPOUND,
    isPopularItem: false,
  },*/
];

export default kovan;
