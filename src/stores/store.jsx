import {
  ADVANCE,
  BALANCES_LIGHT_RETURNED,
  BALANCES_RETURNED,
  BASIC,
  BICONOMY_CONNECTED,
  CURRENT_THEME_RETURNED,
  DAOMINE_POOL_RETURNED,
  DEGEN,
  DEPOSIT_ALL_CONTRACT,
  DEPOSIT_ALL_CONTRACT_RETURNED,
  DEPOSIT_ALL_CONTRACT_RETURNED_COMPLETED,
  DEPOSIT_CONTRACT,
  DEPOSIT_CONTRACT_HAPPY_HOUR_RETURNED_COMPLETED,
  DEPOSIT_CONTRACT_RETURNED,
  DEPOSIT_CONTRACT_RETURNED_COMPLETED,
  DEPOSIT_DAOMINE,
  DEPOSIT_DAOMINE_RETURNED,
  DEPOSIT_DAOMINE_RETURNED_COMPLETED,
  DEPOSIT_DVG_RETURNED,
  DEPOSIT_XDVG,
  DONATE,
  DONATE_RETURNED,
  ERROR,
  EXPERT,
  FIND_DAOMINE_POOL,
  GET_AGGREGATED_YIELD,
  GET_AGGREGATED_YIELD_RETURNED,
  GET_BALANCES,
  GET_BALANCES_LIGHT,
  GET_BEST_PRICE,
  GET_BEST_PRICE_RETURNED,
  GET_CONTRACT_EVENTS,
  GET_CONTRACT_EVENTS_RETURNED,
  GET_CURV_BALANCE,
  GET_CURV_BALANCE_RETURNED,
  GET_DVG_APR,
  GET_DVG_BALANCE_SUCCESS,
  GET_DVG_INFO,
  GET_HAPPY_HOUR_STATUS,
  GET_VAULT_BALANCES,
  GET_VAULT_BALANCES_FULL,
  GET_VAULT_INFO,
  GET_XDVG_APR_SUCCESS,
  GET_XDVG_BALANCE,
  GET_XDVG_BALANCE_SUCCESS,
  HAPPY_HOUR_RETURN,
  HAPPY_HOUR_VERIFY,
  IDAI,
  IDAI_RETURNED,
  INVEST,
  INVEST_RETURNED,
  REBALANCE,
  REBALANCE_RETURNED,
  REDEEM,
  REDEEM_RETURNED,
  SWAP,
  SWAP_RETURNED,
  TRADE,
  TRADE_RETURNED,
  VAULT_BALANCES_FULL_RETURNED,
  VAULT_BALANCES_RETURNED,
  WIDTHDRAW_XDVG,
  WITHDRAW_BOTH_VAULT,
  WITHDRAW_BOTH_VAULT_FAIL_RETURNED,
  WITHDRAW_BOTH_VAULT_RETURNED,
  WITHDRAW_BOTH_VAULT_RETURNED_COMPLETED,
  APPROVE_TRANSACTING,
  APPROVE_COMPLETED,
  GET_DASHBOARD_SNAPSHOT,
  DASHBOARD_SNAPSHOT_RETURNED,
  USD_PRICE_RETURNED,
  GET_STATISTICS,
  STATISTICS_RETURNED,
  TOGGLE_DRAWER,
  DRAWER_RETURNED,
  WITHDRAW_BOTH,
  GET_STRATEGY_BALANCES_FULL,
  STRATEGY_BALANCES_FULL_RETURNED,
  TOGGLE_THEME, // 切换主题
  ZAP,
  WITHDRAW_VAULT,
  ZAP_RETURNED,
  WITHDRAW_VAULT_RETURNED,
  WITHDRAW_DVG_RETURNED,
  WITHDRAW_VAULT_RETURNED_COMPLETED,
  WITHDRAW_DAOMINE,
  WITHDRAW_DAOMINE_RETURNED,
  WITHDRAW_DAOMINE_RETURNED_COMPLETED,
  EMERGENCY_WITHDRAW_DAOMINE,
  EMERGENCY_WITHDRAW_DAOMINE_RETURNED,
  EMERGENCY_WITHDRAW_DAOMINE_RETURNED_COMPLETED,
} from "../constants";
import {
  Biconomy,
  HTTP_CODES,
  PermitClient,
  RESPONSE_CODES,
} from "@biconomy/mexa";

import BigNumber from "bignumber.js";
import FAANGKovanABI from "./citadelABI.json";
import Web3 from "web3";
import async from "async";
import citadelABI from "./citadelABI.json";
import config from "../config";
import { injected } from "./connectors";
import fromExponential from 'from-exponential';

const rp = require("request-promise");
const ethers = require("ethers");

const Dispatcher = require("flux").Dispatcher;
const Emitter = require("events").EventEmitter;

const dispatcher = new Dispatcher();
const emitter = new Emitter();

class Store {
  constructor() {
    this.store = {
      onboard: {},
      currentTheme: "dark",
      statistics: [],
      universalGasPrice: "70",
      ethPrice: 0,
      dashboard: this._getDefaultValues().dashboard,
      aprs: this._getDefaultValues().aprs,
      assets: this._getDefaultValues().assets,
      vaultAssets: this._getDefaultValues().vaultAssets,
      dvg: this._getDefaultValues().dvg,
      vaultApiInfo: {},
      totalValue: "",
      usdPrices: null,
      account: {},
      network: 0,
      web3: null,
      pricePerFullShare: 0,
      yields: [],
      aggregatedYields: [],
      aggregatedHeaders: [],
      uniswapYields: [],
      uniswapLiquidity: [],
      events: [],
      connectorsByName: {
        MetaMask: injected,
      },
      builtWith: [
        {
          website: "https://DeFiZap.com",
          logo: "defizap.png",
          name: "DeFi Zap",
        },
        {
          website: "https://1inch.exchange",
          logo: "oneinch.svg",
          name: "1inch",
        },
        {
          website: "https://www.defisnap.io",
          logo: "defisnap.svg",
          name: "DefiSnap",
        },
        {
          website: "https://www.defipulse.com",
          logo: "defipulse.png",
          name: "DeFi Pulse",
        },
        {
          website: "https://www.curve.fi",
          logo: "curvefi.jpg",
          name: "Curve",
        },
        {
          website: "https://bzx.network",
          logo: "bzx.png",
          name: "bZx",
        },
        {
          website: "http://aave.com",
          logo: "aave.png",
          name: "Aave",
        },
        {
          website: "https://compound.finance",
          logo: "compound.png",
          name: "Compound",
        },
        {
          website: "http://dydx.exchange",
          logo: "dydx.jpg",
          name: "dYdX",
        },
        {
          website: "https://ddex.io",
          logo: "ddex.jpg",
          name: "HydroProtocol",
        },
        {
          website: "https://lendf.me",
          logo: "lendf.png",
          name: "LendfMe",
        },
        {
          website: "https://uniswap.io",
          logo: "uniswap.png",
          name: "Uniswap",
        },
        {
          website: "http://kyber.network",
          logo: "kybernetwork.png",
          name: "KyberNetwork",
        },
        {
          website: "https://synthetix.io",
          logo: "synthetix.png",
          name: "Synthetix",
        },
        {
          website: "https://www.ethereum.org",
          logo: "ethereum.png",
          name: "ethereum",
        },
        {
          website: "https://trufflesuite.com",
          logo: "truffle.png",
          name: "Truffle Suite",
        },
        {
          website: "https://etherscan.io",
          logo: "etherscan.png",
          name: "Etherscan",
        },
        {
          website: "https://alchemyapi.io/",
          logo: "alchemy.png",
          name: "Alchemy",
        },
      ],
      web3context: null,
      languages: [
        {
          language: "English",
          code: "en",
        },
        {
          language: "Japanese",
          code: "ja",
        },
        {
          language: "Chinese",
          code: "zh",
        },
        {
          languages: "European Portuguese",
          code: "pt",
        },
      ],
      curvBalance: 0,
      curveContracts: [
        {
          id: "crvV1",
          symbol: "compound.curve.fi",
          version: 1,
          erc20address: "0x3740fb63ab7a09891d7c0d4299442a551d06f5fd",
          decimals: 18,
          balance: 0,
        },
        {
          id: "crvV2",
          symbol: "usdt.curve.fi",
          version: 2,
          erc20address: "0x9fc689ccada600b6df723d9e47d84d76664a1f23",
          decimals: 18,
          balance: 0,
        },
        {
          id: "crvV3",
          symbol: "y.curve.fi",
          version: 3,
          erc20address: "0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8",
          decimals: 18,
          balance: 0,
        },
        {
          id: "crvV4",
          symbol: "busd.curve.fi",
          version: 4,
          erc20address: "0x3B3Ac5386837Dc563660FB6a0937DFAa5924333B",
          decimals: 18,
          balance: 0,
        },
      ],
      insuranceAssets: [
        {
          id: "oCurve.fi",
          symbol: "$Curve.fi",
          insuredSymbol: "oCRV",
          name: "oCurve.fi",
          description: "yDAI/yUSDC/yUSDT/yTUSD",
          erc20address: "0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8",
          insuranceAddress: "0x4BA8C6Ce0e855C051e65DfC37883360efAf7c82B",
          insuranceABI: config.insuranceABI,
          uniswapInsuranceAddress: "0x21f5e9d4ec20571402a5396084b1634314a68c97",
          uniswapInsuranceABI: config.uniswapInsuranceABI,
          decimals: 18,
          insuredDecimals: 15,
          balance: 0,
          insuredBalance: 0,
          apr: 0,
          insuredApr: 0,
          pricePerInsurance: 0,
          tokenPrice: 0,
        },
      ],
      ethBalance: 0,
      sCrvBalance: 0,
      openDrawer: false,
      stakePools: [],
      dvgApr: "",
    };

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case GET_BALANCES_LIGHT:
            this.getBalancesLight(payload);
            break;
          case GET_BALANCES:
            this.getBalances(payload);
            break;
          case INVEST:
            this.invest(payload);
            break;
          case REDEEM:
            this.redeem(payload);
            break;
          case REBALANCE:
            this.rebalance(payload);
            break;
          case DONATE:
            this.donate(payload);
            break;
          case GET_AGGREGATED_YIELD:
            this.getAPR(payload);
            break;
          case GET_CONTRACT_EVENTS:
            this.getContractEvents(payload);
            break;
          case ZAP:
            this.zap(payload);
            break;
          case IDAI:
            this.idai(payload);
            break;
          case SWAP:
            this.swap(payload);
            break;
          case TRADE:
            this.trade(payload);
            break;
          case GET_CURV_BALANCE:
            this.getCurveBalances(payload);
            break;
          case GET_BEST_PRICE:
            this.getBestPrice(payload);
            break;
          case GET_VAULT_BALANCES:
            this.getVaultBalances(payload);
            break;
          case GET_VAULT_BALANCES_FULL:
            this.getVaultBalancesFull(payload);
            break;
          case DEPOSIT_CONTRACT:
            this.depositContract(payload);
            break;
          case DEPOSIT_ALL_CONTRACT:
            this.depositAllContract(payload);
            break;
          case WITHDRAW_VAULT:
            this.withdrawVault(payload);
            break;
          case WITHDRAW_BOTH_VAULT:
            this.withdrawBothAll(payload);
            break;
          case GET_DASHBOARD_SNAPSHOT:
            this.getDashboardSnapshot(payload);
            break;
          case GET_STATISTICS:
            this.getStatistics(payload);
            break;
          case TOGGLE_DRAWER:
            this.toggleDrawer(payload);
            break;
          case WITHDRAW_BOTH:
            this.withdrawBoth(payload);
            break;
          case GET_STRATEGY_BALANCES_FULL:
            this.getStrategyBalancesFull(payload);
            break;
          // eslint-disable-next-line no-fallthrough
          case TOGGLE_THEME:
            this.toggleTheme(payload);
            break;
          case GET_VAULT_INFO:
            this.getVaultInfo(payload);
            break;
          case FIND_DAOMINE_POOL:
            this.findDAOminePool(payload);
            break;
          case DEPOSIT_DAOMINE:
            this.depositDAOmine(payload);
            break;
          case WITHDRAW_DAOMINE:
            this.withdrawDAOmine(payload);
          case EMERGENCY_WITHDRAW_DAOMINE:
            this.emergencyWithdrawDAOmine(payload);
          case GET_DVG_INFO:
            this.getDvgbalance(payload);
            break;
          case DEPOSIT_XDVG:
            this.depositXdvg(payload);
            break;
          case WIDTHDRAW_XDVG:
            this.withdrawXdvg(payload);
            break;
          case GET_DVG_APR:
            this.getDvgApr(payload);
            break;
          case BICONOMY_CONNECTED:
            this.saveBiconomyProvider(payload);
            break;
          case GET_HAPPY_HOUR_STATUS:
            this.eventVerify(payload);
            break;
          default: {
          }
        }
      }.bind(this)
    );
  }

  getStore(index) {
    return this.store[index];
  }

  setStore(obj) {
    this.store = { ...this.store, ...obj };
    return emitter.emit("StoreUpdated");
  }

  // 切换主题
  toggleTheme(obj) {
    const currentTheme = obj.content.currentTheme;
    store.setStore({ currentTheme: currentTheme });
    emitter.emit(CURRENT_THEME_RETURNED, currentTheme);
  }

  resetProfile = () => {
    const defaultvalues = this._getDefaultValues();

    store.setStore({
      aprs: defaultvalues.aprs,
      assets: defaultvalues.assets,
      vaultAssets: defaultvalues.vaultAssets,
    });
  };

  _getDefaultValues = (network) => {
    const vaultAssetsObj = {
      1: [
        {
          id: "daoCDV",
          name: "USDT/USDC/DAI",
          symbol: "USDT",
          symbols: ["USDT", "USDC", "DAI"],
          description: "Stablecoins",
          vaultSymbol: "daoCDV",
          erc20addresses: [
            "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "0x6b175474e89094c44da98b954eedeac495271d0f",
          ],
          erc20address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          vaultContractAddress: "0x8fe826cc1225b03aa06477ad5af745aed5fe7066",
          vaultContractABI: config.vaultDAOCDVContractABI,
          balance: 0,
          balances: [0, 0, 0],
          vaultBalance: 0,
          decimals: 18,
          deposit: true,
          depositAll: true,
          withdraw: true,
          withdrawAll: true,
          lastMeasurement: 12586420,
          measurement: 1e18,
          price_id: ["tether", "usd-coin", "dai"],
          priceInUSD: [0, 0, 0],
          strategyName: "DAO Citadel: USDT USDC DAI",
          strategy: "DAO Citadel",
          strategyAddress: "0x8a00046ab28051a952e64a886cd8961ca90a59bd",
          strategyContractABI: config.strategyDAOCDVContractABI,
          historicalPriceId: "daoCDV_price",
          logoFormat: "svg",
          risk: EXPERT,
          strategyType: "citadel",
          cTokenAddress: "",
          cAbi: "",
          group: EXPERT,
          tvlKey: "daoCDV_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#the-dao-citadel-vault",
          isPopularItem: true, // use to render popular item icon
          happyHourEnabled: true,
          // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
        },
        {
          id: "daoSTO",
          name: "USDT/USDC/DAI",
          symbol: "USDT",
          symbols: ["USDT", "USDC", "DAI"],
          description: "Stablecoins",
          vaultSymbol: "daoSTO",
          erc20addresses: [
            "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "0x6b175474e89094c44da98b954eedeac495271d0f",
          ],
          erc20address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          vaultContractAddress: "0x742a85daf742ca0213b06fdae449434e0448691e",
          vaultContractABI: config.vaultDAOSTOContractABI,
          balance: 0,
          balances: [0, 0, 0],
          vaultBalance: 0,
          decimals: 18,
          deposit: true,
          depositAll: true,
          withdraw: true,
          withdrawAll: true,
          lastMeasurement: 12766399,
          measurement: 1e18,
          price_id: ["tether", "usd-coin", "dai"],
          priceInUSD: [0, 0, 0],
          strategyName: "DAO FAANG Stonk: USDT USDC DAI",
          strategy: "DAO FAANG Stonk",
          strategyAddress: "0x7f1cffb0e0a7351a72ef53cb51796221e2bac3a5",
          strategyContractABI: config.strategyDAOSTOContractABI,
          historicalPriceId: "daoSTO_price",
          logoFormat: "svg",
          risk: ADVANCE,
          strategyType: "daoFaang",
          cTokenAddress: "",
          cAbi: "",
          group: ADVANCE,
          tvlKey: "daoSTO_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#bf64", // TODO: Update
          isPopularItem: true, // use to render popular item icon
          happyHourEnabled: true,
        },
        {
          id: "daoELO",
          name: "USDT/USDC/DAI",
          symbol: "USDT",
          symbols: ["USDT", "USDC", "DAI"],
          description: "Stablecoins",
          vaultSymbol: "daoELO",
          erc20addresses: [
            "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "0x6b175474e89094c44da98b954eedeac495271d0f",
          ],
          erc20address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          vaultContractAddress: "0x2d9a136cf87d599628bcbdfb6c4fe75acd2a0aa8",
          vaultContractABI: config.vaultDAOELOContractABI,
          balance: 0,
          balances: [0, 0, 0],
          vaultBalance: 0,
          decimals: 18,
          deposit: true,
          depositAll: true,
          withdraw: true,
          withdrawAll: true,
          lastMeasurement: 12722655,
          measurement: 1e18,
          price_id: ["tether", "usd-coin", "dai"],
          priceInUSD: [0, 0, 0],
          strategyName: "Elon's Ape: USDT USDC DAI",
          strategy: "DAO Elon",
          strategyAddress: "0x24d281dcc7d435500669459eaa393dc5200595b1",
          strategyContractABI: config.strategyDAOELOContractABI,
          historicalPriceId: "daoELO_price",
          logoFormat: "svg",
          risk: DEGEN,
          strategyType: "elon",
          cTokenAddress: "",
          cAbi: "",
          group: DEGEN,
          tvlKey: "daoELO_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#the-dao-elon-vault",
          isPopularItem: false,
          // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
        },
        {
          id: "daoCUB",
          name: "USDT/USDC/DAI",
          symbol: "USDT",
          symbols: ["USDT", "USDC", "DAI"],
          description: "Stablecoins",
          vaultSymbol: "daoCUB",
          erc20addresses: [
            "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "0x6b175474e89094c44da98b954eedeac495271d0f",
          ],
          erc20address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          vaultContractAddress: "", // TODO: Update to the mainnet address
          vaultContractABI: config.vaultDAOCUBContractABI,
          balance: 0,
          balances: [0, 0, 0],
          vaultBalance: 0,
          decimals: 18,
          deposit: true,
          depositAll: true,
          withdraw: true,
          withdrawAll: true,
          lastMeasurement: 12722655, // TODO: Update to the mainnet block number
          measurement: 1e18,
          price_id: ["tether", "usd-coin", "dai"],
          priceInUSD: [0, 0, 0],
          strategyName: "Cuban's Ape: USDT USDC DAI",
          strategy: "DAO Cuban",
          strategyAddress: "", // TODO: Update to the mainnet address
          strategyContractABI: config.strategyDAOCUBContractABI,
          historicalPriceId: "daoCUB_price",
          logoFormat: "svg",
          risk: DEGEN,
          strategyType: "cuban",
          cTokenAddress: "",
          cAbi: "",
          group: DEGEN,
          tvlKey: "daoCUB_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#the-dao-cuban-vault",
          isPopularItem: false,
          // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
        },
        {
          id: "USDT",
          name: "USDT",
          symbol: "USDT",
          description: "Tether USD",
          vaultSymbol: "dvmUSDT",
          vaultAddress: "0x2f08119c6f07c006695e079aafc638b8789faf18",
          erc20address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          vaultContractAddress: "0x4F0C1c9bA6B9CCd0BEd6166e86b672ac8EE621F7",
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
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#yearn-fighter",
          isPopularItem: false,
        },
        {
          id: "DAI",
          name: "DAI",
          symbol: "DAI",
          description: "DAI Stablecoin",
          vaultSymbol: "dvmDAI",
          vaultAddress: "0xacd43e627e64355f1861cec6d3a6688b31a6f952",
          erc20address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          vaultContractAddress: "0x2bFc2Da293C911e5FfeC4D2A2946A599Bc4Ae770",
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
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#yearn-fighter",
          isPopularItem: false,
        },
        {
          id: "USDC",
          name: "USDC",
          symbol: "USDC",
          description: "USDC Coin",
          vaultSymbol: "dvmUSDC",
          vaultAddress: "0x597ad1e0c13bfe8025993d9e79c69e1c0233522e",
          erc20address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          vaultContractAddress: "0x9f0230FbDC0379E5FefAcca89bE03A42Fec5fb6E",
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
          tvlKey: "yUSDC_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#yearn-fighter",
          isPopularItem: false,
        },
        {
          id: "TUSD",
          name: "TUSD",
          symbol: "TUSD",
          description: "TrueUSD",
          vaultSymbol: "dvmTUSD",
          vaultAddress: "0x37d19d1c4e1fa9dc47bd1ea12f742a0887eda74a",
          erc20address: "0x0000000000085d4780b73119b644ae5ecd22b376",
          vaultContractAddress: "0x2C8de02aD4312069355B94Fb936EFE6CFE0C8FF6",
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
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#yearn-fighter",
          isPopularItem: false,
        },
        {
          id: "cUSDT",
          name: "USDT",
          symbol: "USDT",
          description: "compound USDT",
          vaultSymbol: "dvlUSDT",
          erc20address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          vaultContractAddress: "0xEeCe6AD323a93d4B021BDAaC587DCC04b5cf0a78",
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
          strategy: "Compount USDT",
          strategyContractABI: config.compundStrategyCompundABI,
          historicalPriceId: "cUSDT_price",
          logoFormat: "png",
          risk: BASIC,
          strategyType: "compound",
          cTokenAddress: "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9",
          cAbi: config.cUSDTContract,
          group: BASIC,
          tvlKey: "cUSDT_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#compound-fighter",
          isPopularItem: false,
        },
        {
          id: "cDAI",
          name: "DAI",
          symbol: "DAI",
          description: "Compound DAI",
          vaultSymbol: "dvlDAI",
          erc20address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          vaultContractAddress: "0x43C20638C3914Eca3c96e9cAc8ebE7d652Be45c6",
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
          cTokenAddress: "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
          cAbi: config.cDAIContract,
          group: BASIC,
          tvlKey: "cDAI_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#compound-fighter",
          isPopularItem: false,
        },
        {
          id: "cUSDC",
          name: "USDC",
          symbol: "USDC",
          description: "Compound USDC",
          vaultSymbol: "dvlUSDC",
          erc20address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          vaultContractAddress: "0xd1D7f950899C0269a7F2aad5E854cdc3a1350ba9",
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
          cTokenAddress: "0x39aa39c021dfbae8fac545936693ac917d5e7563",
          cAbi: config.cUSDCContract,
          group: BASIC,
          tvlKey: "cUSDT_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#compound-fighter",
          isPopularItem: false,
        },
        {
          id: "hfUSDT",
          name: "USDT",
          symbol: "USDT",
          description: "Harvest USDT",
          vaultSymbol: "hfUSDT",
          erc20address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          vaultContractAddress: "0x2Cc1507E6E3C844EEb77Db90d193489f1Ddfb299",
          vaultContractABI: config.vaultHarvestContractABI,
          balance: 0,
          vaultBalance: 0,
          decimals: 6,
          deposit: true,
          depositAll: true,
          withdraw: true,
          withdrawAll: true,
          lastMeasurement: "", // TBC
          measurement: 1e18,
          price_id: "harvest-finance",
          strategyName: "Harvest-Fighter: Harvest USDT",
          strategy: "Harvest USDT",
          strategyAddress: "0x89541E3b8e8B73c108744909eA11D506B4a8E6c7",
          strategyContractABI: config.strategyHarvestContractABI,
          historicalPriceId: "hfUSDT_price",
          logoFormat: "png",
          risk: ADVANCE,
          strategyType: "harvest",
          cTokenAddress: "",
          cAbi: "",
          group: ADVANCE,
          tvlKey: "hfUSDT_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#harvest-fighter",
          isPopularItem: false,
        },
        {
          id: "hfUSDC",
          name: "USDC",
          symbol: "USDC",
          description: "Harvest USDC",
          vaultSymbol: "hfUSDC",
          erc20address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          vaultContractAddress: "0xd0f0858578C7780f2D65f6d81BC7DdBe166367cC",
          vaultContractABI: config.vaultHarvestContractABI,
          balance: 0,
          vaultBalance: 0,
          decimals: 6,
          deposit: true,
          depositAll: true,
          withdraw: true,
          withdrawAll: true,
          lastMeasurement: "", // TBC
          measurement: 1e18,
          price_id: "harvest-finance",
          strategyName: "Harvest-Fighter: Harvest USDC",
          strategy: "Harvest USDC",
          strategyAddress: "0x0AF9547974E056fca221F679DbBb7F8651407D7F",
          strategyContractABI: config.strategyHarvestContractABI,
          historicalPriceId: "hfUSDC_price",
          logoFormat: "png",
          risk: ADVANCE,
          strategyType: "harvest",
          cTokenAddress: "",
          cAbi: "",
          group: ADVANCE,
          tvlKey: "hfUSDT_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#harvest-fighter",
          isPopularItem: false,
        },
        {
          id: "hfDAI",
          name: "DAI",
          symbol: "DAI",
          description: "Harvest DAI",
          vaultSymbol: "hfDAI",
          erc20address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          vaultContractAddress: "0xE4E6Ce7c1D9Ff44Db27f622aCcbB0753C2f48955",
          vaultContractABI: config.vaultHarvestContractABI,
          balance: 0,
          vaultBalance: 0,
          decimals: 18,
          deposit: true,
          depositAll: true,
          withdraw: true,
          withdrawAll: true,
          lastMeasurement: "", // TBC
          measurement: 1e18,
          price_id: "harvest-finance",
          strategyName: "Harvest-Fighter: Harvest DAI",
          strategy: "Harvest DAI",
          strategyAddress: "0xEf9A15025C2ED048a67c5C8019A1101172EEB51c",
          strategyContractABI: config.strategyHarvestContractABI,
          historicalPriceId: "hfDAI_price",
          logoFormat: "png",
          risk: ADVANCE,
          strategyType: "harvest",
          cTokenAddress: "",
          cAbi: "",
          group: ADVANCE,
          tvlKey: "hfDAI_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#harvest-fighter",
          isPopularItem: false,
        },
      ],
      42: [
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
          historicalPriceId: "daoCDV_price",
          logoFormat: "svg",
          risk: EXPERT,
          strategyType: "citadel",
          cTokenAddress: "",
          cAbi: "",
          group: EXPERT,
          tvlKey: "daoCDV_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#the-dao-citadel-vault",
          isPopularItem: true,
          happyHourEnabled: true,
          // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
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
          deposit: true,
          depositAll: true,
          withdraw: true,
          withdrawAll: true,
          lastMeasurement: "25867823",
          measurement: 1e18,
          price_id: ["tether", "usd-coin", "dai"],
          priceInUSD: [0, 0, 0],
          strategyName: "DAO FAANG Stonk: USDT USDC DAI",
          strategy: "DAO FAANG Stonk",
          strategyAddress: "0xc0f43b6db13e5988c92aa8c7c286a51f493620d4",
          strategyContractABI: config.strategyDAOSTOContractABI,
          historicalPriceId: "daoSTO_price",
          logoFormat: "svg",
          risk: ADVANCE,
          strategyType: "daoFaang",
          cTokenAddress: "",
          cAbi: "",
          group: ADVANCE,
          tvlKey: "daoSTO_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#bf64",
          isPopularItem: true, // use to render popular item icon
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
          historicalPriceId: "daoELO_price",
          logoFormat: "svg",
          risk: DEGEN,
          strategyType: "elon",
          cTokenAddress: "",
          cAbi: "",
          group: DEGEN,
          tvlKey: "daoELO_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#the-dao-elon-vault",
          isPopularItem: false,
          // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
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
          vaultContractAddress: "0x5c304A6cB105E1BFf9805cA5CF072F1d2C3bEAC5",
          vaultContractABI: config.vaultDAOELOContractABI,
          balance: 0, // Stores balance of selectedERC20Address
          balances: [0, 0, 0],
          vaultBalance: 0,
          decimals: 18,
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
          strategyAddress: "0x998372C8dC70833A7dC687020257302582FA5838",
          strategyContractABI: config.strategyDAOCUBContractABI,
          historicalPriceId: "daoCUB_price",
          logoFormat: "svg",
          risk: DEGEN,
          strategyType: "cuban",
          cTokenAddress: "",
          cAbi: "",
          group: DEGEN,
          tvlKey: "daoCUB_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#the-dao-cuban-vault",
          isPopularItem: false,
          // isHappyHour: true, // use to render happy hour icon, note current logic uses a blanket HappyHour
        },
        {
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
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#yearn-fighter",
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
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#yearn-fighter",
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
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#yearn-fighter",
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
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#yearn-fighter",
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
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#compound-fighter",
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
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#compound-fighter",
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
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#compound-fighter",
          isPopularItem: false,
        },
        {
          id: "hfUSDT",
          name: "USDT",
          symbol: "USDT",
          description: "Harvest USDT",
          vaultSymbol: "hfUSDT",
          erc20address: "0x07de306ff27a2b630b1141956844eb1552b956b5",
          vaultContractAddress: "0x35880615bb18da592ff0feb0940ade2c02249715",
          vaultContractABI: config.vaultHarvestContractABI,
          balance: 0,
          vaultBalance: 0,
          decimals: 6,
          deposit: true,
          depositAll: true,
          withdraw: true,
          withdrawAll: true,
          lastMeasurement: "", // TBC
          measurement: 1e18,
          price_id: "harvest-finance",
          strategyName: "Harvest-Fighter: Harvest USDT",
          strategy: "Harvest USDT",
          strategyAddress: "0xac783dc15d2cf08d1e1c34e18e531a9b182277b0",
          strategyContractABI: config.strategyHarvestContractABI,
          historicalPriceId: "hfUSDT_price",
          logoFormat: "png",
          risk: ADVANCE,
          strategyType: "harvest",
          cTokenAddress: "",
          cAbi: "",
          group: ADVANCE,
          tvlKey: "hfUSDT_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#harvest-fighter",
          isPopularItem: false,
        },
        {
          id: "hfUSDC",
          name: "USDC",
          symbol: "USDC",
          description: "Harvest USDC",
          vaultSymbol: "hfUSDC",
          erc20address: "0xb7a4f3e9097c08da09517b5ab877f7a917224ede",
          vaultContractAddress: "0x68b1c860300c4f7d577f08d8b3c3aee23887b280",
          vaultContractABI: config.vaultHarvestContractABI,
          balance: 0,
          vaultBalance: 0,
          decimals: 6,
          deposit: true,
          depositAll: true,
          withdraw: true,
          withdrawAll: true,
          lastMeasurement: "", // TBC
          measurement: 1e18,
          price_id: "harvest-finance",
          strategyName: "Harvest-Fighter: Harvest USDC",
          strategy: "Harvest USDC",
          strategyAddress: "0x7da9e06545c4fe6556fc0990f5afd4955379e1d2",
          strategyContractABI: config.strategyHarvestContractABI,
          historicalPriceId: "hfUSDC_price",
          logoFormat: "png",
          risk: ADVANCE,
          strategyType: "harvest",
          cTokenAddress: "",
          cAbi: "",
          group: ADVANCE,
          tvlKey: "hfUSDC_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#harvest-fighter",
          isPopularItem: false,
        },
        {
          id: "hfDAI",
          name: "DAI",
          symbol: "DAI",
          description: "Harvest DAI",
          vaultSymbol: "hfDAI", // need to update logo/image?
          erc20address: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
          vaultContractAddress: "0x6d7e8fa90c1ffdc019d691bafc18d6362fdeecd7",
          vaultContractABI: config.vaultHarvestContractABI,
          balance: 0,
          vaultBalance: 0,
          decimals: 18,
          deposit: true,
          depositAll: true,
          withdraw: true,
          withdrawAll: true,
          lastMeasurement: "", // TBC
          measurement: 1e18,
          price_id: "dai",
          strategyName: "Harvest-Fighter: Harvest DAI",
          strategy: "Harvest DAI",
          strategyAddress: "0xdfeb689aea68f221eaafeeeb91767003265968d6",
          strategyContractABI: config.strategyHarvestContractABI,
          historicalPriceId: "hfDAI_price",
          logoFormat: "png",
          risk: ADVANCE,
          strategyType: "harvest",
          cTokenAddress: "",
          cAbi: "",
          group: ADVANCE,
          tvlKey: "hfDAI_tvl",
          infoLink:
            "https://daoventures.gitbook.io/daoventures/products/strategies#harvest-fighter",
          isPopularItem: false,
        },
      ],
    };

    const vaultAssets = network ? vaultAssetsObj[network] : vaultAssetsObj[1];

    return {
      assets: [
        {
          id: "DAIv3",
          name: "DAI",
          symbol: "DAI",
          description: "DAI Stablecoin",
          investSymbol: "yDAI",
          erc20address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          iEarnContract: "0xC2cB1040220768554cf699b0d863A3cd4324ce32",
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          decimals: 18,
          price: 0,
          poolValue: 0,
          abi: config.IEarnErc20ABIv2,
          version: 3,
          disabled: false,
          invest: "deposit",
          redeem: "withdraw",
          curve: false,
          price_id: "dai",
        },
        {
          id: "USDCv3",
          name: "USD Coin",
          symbol: "USDC",
          description: "USD//C",
          investSymbol: "yUSDC",
          erc20address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          iEarnContract: "0x26EA744E5B887E5205727f55dFBE8685e3b21951",
          apr: 0,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 6,
          poolValue: 0,
          abi: config.IEarnErc20ABIv2,
          version: 3,
          disabled: false,
          invest: "deposit",
          redeem: "withdraw",
          curve: false,
          price_id: "usd-coin",
        },
        {
          id: "USDTv3",
          name: "USDT",
          symbol: "USDT",
          description: "Tether USD",
          investSymbol: "yUSDT",
          erc20address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          iEarnContract: "0xE6354ed5bC4b393a5Aad09f21c46E101e692d447",
          apr: 0,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 6,
          poolValue: 0,
          abi: config.IEarnErc20ABIv2,
          version: 3,
          disabled: false,
          invest: "deposit",
          redeem: "withdraw",
          curve: false,
          price_id: "tether",
        },
        {
          id: "BUSDv3",
          name: "BUSD",
          symbol: "BUSD",
          description: "Binance USD",
          investSymbol: "yBUSD",
          erc20address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
          iEarnContract: "0x04bC0Ab673d88aE9dbC9DA2380cB6B79C4BCa9aE",
          apr: 0,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 18,
          poolValue: 0,
          abi: config.IEarnErc20ABIv2,
          version: 3,
          disabled: false,
          invest: "deposit",
          redeem: "withdraw",
          curve: true,
          price_id: "binance-usd",
        },
        {
          id: "DAIv2",
          name: "DAI",
          symbol: "DAI",
          description: "DAI Stablecoin",
          investSymbol: "yDAI",
          erc20address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          iEarnContract: "0x16de59092dAE5CcF4A1E6439D611fd0653f0Bd01",
          lastMeasurement: 9465912,
          measurement: 1000037230456849197,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          decimals: 18,
          price: 0,
          poolValue: 0,
          abi: config.IEarnErc20ABIv2,
          version: 2,
          disabled: false,
          invest: "deposit",
          redeem: "withdraw",
          curve: true,
          price_id: "dai",
        },
        {
          id: "USDCv2",
          name: "USD Coin",
          symbol: "USDC",
          description: "USD//C",
          investSymbol: "yUSDC",
          erc20address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          iEarnContract: "0xd6aD7a6750A7593E092a9B218d66C0A814a3436e",
          lastMeasurement: 9465880,
          measurement: 1139534904703193728,
          apr: 0,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 6,
          poolValue: 0,
          abi: config.IEarnErc20ABIv2,
          version: 2,
          disabled: false,
          invest: "deposit",
          redeem: "withdraw",
          curve: true,
          price_id: "usd-coin",
        },
        {
          id: "USDTv2",
          name: "USDT",
          symbol: "USDT",
          description: "Tether USD",
          investSymbol: "yUSDT",
          erc20address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          iEarnContract: "0x83f798e925BcD4017Eb265844FDDAbb448f1707D",
          lastMeasurement: 9465880,
          measurement: 1000030025124779312,
          apr: 0,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 6,
          poolValue: 0,
          abi: config.IEarnErc20ABIv2,
          version: 2,
          disabled: false,
          invest: "deposit",
          redeem: "withdraw",
          curve: true,
          price_id: "tether",
        },
        {
          id: "TUSDv2",
          name: "TUSD",
          symbol: "TUSD",
          description: "TrueUSD",
          investSymbol: "yTUSD",
          erc20address: "0x0000000000085d4780B73119b644AE5ecd22b376",
          iEarnContract: "0x73a052500105205d34Daf004eAb301916DA8190f",
          lastMeasurement: 9479531,
          measurement: 1000197346651007837,
          apr: 0,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 18,
          poolValue: 0,
          abi: config.IEarnErc20ABIv2,
          version: 2,
          disabled: false,
          invest: "deposit",
          redeem: "withdraw",
          curve: true,
          price_id: "true-usd",
        },
        {
          id: "SUSDv2",
          name: "SUSD",
          symbol: "SUSD",
          description: "Synth sUSD",
          investSymbol: "ySUSD",
          erc20address: "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51",
          iEarnContract: "0xF61718057901F84C4eEC4339EF8f0D86D2B45600",
          lastMeasurement: 9465880,
          measurement: 1000021451644065970,
          apr: 0,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 18,
          poolValue: 0,
          abi: config.IEarnErc20ABIv2,
          version: 2,
          disabled: false,
          invest: "deposit",
          redeem: "withdraw",
          curve: false,
          price_id: "nusd",
        },
        {
          id: "wBTCv2",
          name: "wBTC",
          symbol: "wBTC",
          description: "Wrapped BTC",
          investSymbol: "yWBTC",
          erc20address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
          iEarnContract: "0x04Aa51bbcB46541455cCF1B8bef2ebc5d3787EC9",
          lastMeasurement: 9465880,
          measurement: 999998358212140782,
          apr: 0,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 8,
          poolValue: 0,
          abi: config.IEarnErc20ABIv2,
          version: 2,
          disabled: false,
          invest: "deposit",
          redeem: "withdraw",
          curve: false,
          price_id: "wrapped-bitcoin",
        },
        {
          id: "DAIv1",
          name: "DAI",
          symbol: "DAI",
          description: "DAI Stablecoin",
          investSymbol: "yDAI",
          erc20address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          iEarnContract: "0x9D25057e62939D3408406975aD75Ffe834DA4cDd",
          lastMeasurement: 9400732,
          measurement: 1000848185112260412,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          decimals: 18,
          price: 0,
          poolValue: 0,
          abi: config.IEarnERC20ABI,
          version: 1,
          disabled: true,
          invest: "invest",
          redeem: "redeem",
          curve: false,
          price_id: "dai",
        },
        {
          id: "USDCv1",
          name: "USD Coin",
          symbol: "USDC",
          description: "USD//C",
          investSymbol: "yUSDC",
          erc20address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          iEarnContract: "0xa2609B2b43AC0F5EbE27deB944d2a399C201E3dA",
          lastMeasurement: 9400732,
          measurement: 1001761741440856097,
          apr: 0,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 6,
          poolValue: 0,
          abi: config.IEarnERC20ABI,
          version: 1,
          disabled: true,
          invest: "invest",
          redeem: "redeem",
          curve: false,
          price_id: "usd-coin",
        },
        {
          id: "USDTv1",
          name: "USDT",
          symbol: "USDT",
          description: "Tether USD",
          investSymbol: "yUSDT",
          erc20address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          iEarnContract: "0xa1787206d5b1bE0f432C4c4f96Dc4D1257A1Dd14",
          lastMeasurement: 9400732,
          measurement: 1085531657202472310,
          apr: 0,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 6,
          poolValue: 0,
          abi: config.IEarnERC20ABI,
          version: 1,
          disabled: true,
          invest: "invest",
          redeem: "redeem",
          curve: false,
          price_id: "tether",
        },
        {
          id: "SUSDv1",
          name: "SUSD",
          symbol: "SUSD",
          description: "Synth sUSD",
          investSymbol: "ySUSD",
          erc20address: "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51",
          iEarnContract: "0x36324b8168f960A12a8fD01406C9C78143d41380",
          lastMeasurement: 9400732,
          measurement: 1029186724259834543,
          apr: 0,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 18,
          poolValue: 0,
          abi: config.IEarnERC20ABI,
          version: 1,
          disabled: true,
          invest: "invest",
          redeem: "redeem",
          curve: false,
          price_id: "nusd",
        },
        {
          id: "wBTCv1",
          name: "wBTC",
          symbol: "wBTC",
          tokenSymbol: "wBTC",
          description: "Wrapped BTC",
          investSymbol: "yBTC",
          erc20address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
          iEarnContract: "0x04EF8121aD039ff41d10029c91EA1694432514e9",
          lastMeasurement: 9427488,
          measurement: 2000175540087812685,
          apr: 0,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 8,
          poolValue: 0,
          abi: config.IEarnERC20ABI,
          version: 1,
          disabled: true,
          invest: "invest",
          redeem: "redeem",
          curve: false,
          price_id: "wrapped-bitcoin",
        },
        {
          id: "CRVv1",
          name: "cDAI/cUSDC",
          symbol: "CRV",
          tokenSymbol: "DAI",
          description: "Curve.fi cDAI/cUSDC",
          investSymbol: "yCRV",
          erc20address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          iEarnContract: "0x9Ce551A9D2B1A4Ec0cc6eB0E0CC12977F6ED306C",
          lastMeasurement: 9414437,
          measurement: 1008192205495361668,
          apr: 0,
          maxApr: 0,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 18,
          poolValue: 0,
          abi: config.IEarnERC20ABI,
          version: 1,
          disabled: true,
          invest: "invest",
          redeem: "redeem",
          curve: false,
          price_id: "dai",
        },
        {
          id: "ETHv1",
          name: "ETH",
          symbol: "ETH",
          description: "Ethereum",
          investSymbol: "iETH",
          erc20address: "Ethereum",
          iEarnContract: "0x9Dde7cdd09dbed542fC422d18d89A589fA9fD4C0",
          apr: 0,
          maxApr: 0,
          balance: 0,
          decimals: 18,
          investedBalance: 0,
          price: 0,
          poolValue: 0,
          abi: config.IEarnABI,
          version: 1,
          disabled: true,
          invest: "invest",
          redeem: "redeem",
          price_id: "ethereum",
        },
        {
          id: "iDAIv1",
          name: "Fulcrum DAI iToken",
          symbol: "iDAI",
          description: "Fulcrum DAI iToken",
          erc20address: "0x493c57c4763932315a328269e1adad09653b9081",
          iEarnContract: null,
          balance: 0,
          investedBalance: 0,
          price: 0,
          decimals: 18,
          poolValue: 0,
          version: 2,
          disabled: true,
          idai: true,
          price_id: "dai",
        },
      ],
      vaultAssets,
      aprs: [
        {
          token: "DAI",
          address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          earnAddress: "0x16de59092dAE5CcF4A1E6439D611fd0653f0Bd01",
          lastMeasurement: 9465912,
          measurement: 1000037230456849197,
          mod: 1,
          decimals: 18,
        },
        {
          token: "TUSD",
          address: "0x0000000000085d4780B73119b644AE5ecd22b376",
          earnAddress: "0x73a052500105205d34daf004eab301916da8190f",
          lastMeasurement: 9479531,
          measurement: 1000197346651007837,
          created: 0,
          mod: 1,
          decimals: 18,
        },
        {
          token: "USDC",
          address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          earnAddress: "0xa2609B2b43AC0F5EbE27deB944d2a399C201E3dA",
          lastMeasurement: 9400732,
          measurement: 1001761741440856097,
          mod: 1,
          decimals: 6,
        },
        {
          token: "USDT",
          address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          earnAddress: "0x83f798e925BcD4017Eb265844FDDAbb448f1707D",
          lastMeasurement: 9465880,
          measurement: 1000030025124779312,
          mod: 1,
          decimals: 6,
        },
        {
          token: "SUSD",
          address: "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51",
          earnAddress: "0x36324b8168f960A12a8fD01406C9C78143d41380",
          lastMeasurement: 9400732,
          measurement: 1029186724259834543,
          mod: 1,
          decimals: 18,
        },
        {
          token: "BAT",
          address: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
          created: 0,
          mod: 1,
          earnAddress: "",
          decimals: 18,
        },
        {
          token: "ETH",
          address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          created: 0,
          mod: 1,
          earnAddress: "",
          decimals: 18,
        },
        {
          token: "LINK",
          address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
          created: 0,
          mod: 1,
          earnAddress: "",
          decimals: 18,
        },
        {
          token: "KNC",
          address: "0xdd974D5C2e2928deA5F71b9825b8b646686BD200",
          created: 0,
          mod: 1,
          earnAddress: "",
          decimals: 18,
        },
        {
          token: "REP",
          address: "0x1985365e9f78359a9B6AD760e32412f4a445E862",
          created: 0,
          mod: 1,
          earnAddress: "",
          decimals: 18,
        },
        {
          token: "MKR",
          address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
          created: 0,
          mod: 1,
          earnAddress: "",
          decimals: 18,
        },
        {
          token: "ZRX",
          address: "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
          created: 0,
          mod: 1,
          earnAddress: "",
          decimals: 18,
        },
        {
          token: "SNX",
          address: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
          created: 0,
          mod: 1,
          earnAddress: "",
          decimals: 18,
        },
        {
          token: "wBTC",
          address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
          earnAddress: "0x04EF8121aD039ff41d10029c91EA1694432514e9",
          lastMeasurement: 9427488,
          measurement: 2000175540087812685,
          mod: 1,
          decimals: 18,
        },
      ],
      dashboard: {
        vault_balance_usd: 0,
        vault_growth_usd_daily: 0,
        vault_growth_usd_weekly: 0,
        vault_growth_usd_yearly: 0,
        vault_growth_usd_daily_perc: 0,
        vault_growth_usd_weekly_perc: 0,
        vault_growth_usd_yearly_perc: 0,

        vault_balance_eth: 0,
        vault_growth_eth_daily: 0,
        vault_growth_eth_weekly: 0,
        vault_growth_eth_yearly: 0,
        vault_growth_eth_daily_perc: 0,
        vault_growth_eth_weekly_perc: 0,
        vault_growth_eth_yearly_perc: 0,

        earn_balance_usd: 0,
        earn_growth_usd_daily: 0,
        earn_growth_usd_weekly: 0,
        earn_growth_usd_yearly: 0,
        earn_growth_usd_daily_perc: 0,
        earn_growth_usd_weekly_perc: 0,
        earn_growth_usd_yearly_perc: 0,

        earn_balance_eth: 0,
        earn_growth_eth_daily: 0,
        earn_growth_eth_weekly: 0,
        earn_growth_eth_yearly: 0,
        earn_growth_eth_daily_perc: 0,
        earn_growth_eth_weekly_perc: 0,
        earn_growth_eth_yearly_perc: 0,

        portfolio_balance_usd: 0,
        portfolio_growth_usd_daily: 0,
        portfolio_growth_usd_weekly: 0,
        portfolio_growth_usd_yearly: 0,
        portfolio_growth_usd_daily_perc: 0,
        portfolio_growth_usd_weekly_perc: 0,
        portfolio_growth_usd_yearly_perc: 0,

        portfolio_balance_eth: 0,
        portfolio_growth_eth_daily: 0,
        portfolio_growth_eth_weekly: 0,
        portfolio_growth_eth_yearly: 0,
        portfolio_growth_eth_daily_perc: 0,
        portfolio_growth_eth_weekly_perc: 0,
        portfolio_growth_eth_yearly_perc: 0,
      },
      dvg: [
        {
          id: "xDVG",
          name: "VIPDVG",
          symbol: "xDVG",
          decimals: 18,
          erc20address: '0xD6Ce913C3e81b5e67a6b94d705d9E7cDdf073A7e',
          abi: config.xDvgAbi,
          balance: 1,
        },
        {
          id: "DVG",
          name: "DVGToken",
          symbol: "DVG",
          decimals: 18,
          erc20address: '0x51e00a95748DBd2a3F47bC5c3b3E7B3F0fea666c',
          abi: config.DvgAbi,
          balance: 0,
        },
      ],
    };
  };

  invest = (payload) => {
    const account = store.getStore("account");
    const { asset, amount } = payload.content;

    if (asset.erc20address !== "Ethereum") {
      this._checkApproval(
        asset,
        account,
        amount,
        asset.iEarnContract,
        (err) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }

          this._callInvest(asset, account, amount, (err, investResult) => {
            if (err) {
              return emitter.emit(ERROR, err);
            }

            return emitter.emit(INVEST_RETURNED, investResult);
          });
        }
      );
    } else {
      this._callInvest(asset, account, amount, (err, investResult) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(INVEST_RETURNED, investResult);
      });
    }
  };

  _checkApprovalForProxy = async (
    asset,
    account,
    amount,
    contract,
    callback
  ) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    const vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );
    try {
      const allowance = await vaultContract.methods
        .allowance(account.address, contract)
        .call({ from: account.address });

      const ethAllowance = web3.utils.fromWei(allowance, "ether");

      if (parseFloat(ethAllowance) < parseFloat(amount)) {
        await vaultContract.methods
          .approve(contract, web3.utils.toWei("999999999999", "ether"))
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
          });

        callback();
      } else {
        callback();
      }
    } catch (error) {
      if (error.message) {
        return callback(error.message);
      }
      callback(error);
    }
  };

  _checkApproval = async (asset, account, amount, contract, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    if (asset.erc20address === "Ethereum") {
      callback();
    }

    let erc20Contract = new web3.eth.Contract(
      config.erc20ABI,
      asset.erc20address
    );

    try {
      const allowance = await erc20Contract.methods
        .allowance(account.address, contract)
        .call({ from: account.address });

      const ethAllowance = web3.utils.fromWei(allowance, "ether");
      if (parseFloat(ethAllowance) < parseFloat(amount)) {
        /*
          code to accomodate for "assert _value == 0 or self.allowances[msg.sender][_spender] == 0" in contract
          We check to see if the allowance is > 0. If > 0 set to 0 before we set it to the correct amount.
        */
        if (
          [
            "crvV1",
            "crvV2",
            "crvV3",
            "crvV4",
            "USDTv1",
            "USDTv2",
            "USDTv3",
            "USDT",
            "sCRV",
          ].includes(asset.id) &&
          ethAllowance > 0
        ) {
          await erc20Contract.methods
            .approve(contract, web3.utils.toWei("0", "ether"))
            .send({
              from: account.address,
              gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
            });
        }

        await erc20Contract.methods
          .approve(contract, web3.utils.toWei("999999999999", "ether"))
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
          })
          .on("transactionHash", function (txnHash) {
            console.log(txnHash);
            callback(null, txnHash, null);
          })
          .on("receipt", function (receipt) {
            console.log(receipt);
            callback(null, null, receipt);
          })
          .on("error", function (error) {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return callback(error.message);
              }
              callback(error);
            }
          })
          .catch((error) => {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return callback(error.message);
              }
              callback(error);
            }
          });

        callback();
      } else {
        callback();
      }
    } catch (error) {
      if (error.message) {
        console.log(error.message);
      }
      // return callback(error);
    }
  };

  _checkApprovalCitadel = async (
    asset,
    account,
    amount,
    contract,
    tokenIndex = null,
    callback
  ) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    if (asset.erc20address === "Ethereum") {
      callback();
    }

    // Handle vaults with multi tokens
    try {
      if (
        tokenIndex !== null &&
        tokenIndex > 0 &&
        tokenIndex < asset.erc20addresses.length
      ) {
        asset.erc20address = asset.erc20addresses[tokenIndex];
      } else {
      }
    } catch (error) {
      if (error.message) {
        callback(error.message);
      }
    }

    let erc20Contract = new web3.eth.Contract(
      config.erc20ABI,
      asset.erc20address
    );

    try {
      const allowance = await erc20Contract.methods
        .allowance(account.address, contract)
        .call({ from: account.address });

      const ethAllowance = web3.utils.fromWei(allowance, "ether");

      if (parseFloat(ethAllowance) < parseFloat(amount)) {
        /*
          code to accomodate for "assert _value == 0 or self.allowances[msg.sender][_spender] == 0" in contract
          We check to see if the allowance is > 0. If > 0 set to 0 before we set it to the correct amount.
        */
        if (
          [
            "crvV1",
            "crvV2",
            "crvV3",
            "crvV4",
            "USDTv1",
            "USDTv2",
            "USDTv3",
            "USDT",
            "sCRV",
          ].includes(asset.id) &&
          ethAllowance > 0
        ) {
          await erc20Contract.methods
            .approve(contract, web3.utils.toWei("0", "ether"))
            .send({
              from: account.address,
              gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
            });
        }

        await erc20Contract.methods
          .approve(contract, web3.utils.toWei("999999999999", "ether"))
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
          })
          .on("transactionHash", function (txnHash) {
            console.log(txnHash);
            callback(null, txnHash, null);
          })
          .on("receipt", function (receipt) {
            console.log(receipt);
            callback(null, null, receipt);
          })
          .on("error", function (error) {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return callback(error.message);
              }
              callback(error);
            }
          })
          .catch((error) => {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return callback(error.message);
              }
              callback(error);
            }
          });

        callback();
      } else {
        callback();
      }
    } catch (error) {
      if (error.message) {
        console.log(error.message);
      }
      callback(error);
    }
  };

  _checkApprovalWaitForConfirmation = async (
    asset,
    account,
    amount,
    contract,
    callback
  ) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    let erc20Contract = new web3.eth.Contract(
      config.erc20ABI,
      asset.erc20address
    );
    const allowance = await erc20Contract.methods
      .allowance(account.address, contract)
      .call({ from: account.address });

    const ethAllowance = web3.utils.fromWei(allowance, "ether");

    if (parseFloat(ethAllowance) < parseFloat(amount)) {
      if (
        [
          "crvV1",
          "crvV2",
          "crvV3",
          "crvV4",
          "USDTv1",
          "USDTv2",
          "USDTv3",
          "sCRV",
        ].includes(asset.id) &&
        ethAllowance > 0
      ) {
        erc20Contract.methods
          .approve(contract, web3.utils.toWei("0", "ether"))
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
          })
          .on("transactionHash", async function (hash) {
            erc20Contract.methods
              .approve(contract, web3.utils.toWei(amount, "ether"))
              .send({
                from: account.address,
                gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
              })
              .on("transactionHash", function (hash) {
                callback();
              })
              .on("error", function (error) {
                if (!error.toString().includes("-32601")) {
                  if (error.message) {
                    return callback(error.message);
                  }
                  callback(error);
                }
              });
          })
          .on("error", function (error) {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return callback(error.message);
              }
              callback(error);
            }
          });
      } else {
        erc20Contract.methods
          .approve(contract, web3.utils.toWei(amount, "ether"))
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
          })
          .on("transactionHash", function (hash) {
            callback();
          })
          .on("error", function (error) {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return callback(error.message);
              }
              callback(error);
            }
          });
      }
    } else {
      callback();
    }
  };

  _callInvest = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let iEarnContract = new web3.eth.Contract(asset.abi, asset.iEarnContract);
    if (asset.erc20address === "Ethereum") {
      iEarnContract.methods[asset.invest]()
        .send({
          from: account.address,
          value: web3.utils.toWei(amount, "ether"),
          gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
        })
        .on("transactionHash", function (hash) {
          console.log(hash);
          callback(null, hash);
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          console.log(confirmationNumber, receipt);
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
        })
        .on("error", function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message);
            }
            callback(error);
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message);
            }
            callback(error);
          }
        });
    } else {
      var amountToSend = web3.utils.toWei(amount, "ether");
      if (asset.decimals !== 18) {
        amountToSend = amount * 10 ** asset.decimals;
      }
      iEarnContract.methods[asset.invest](amountToSend)
        .send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
        })
        .on("transactionHash", function (hash) {
          console.log(hash);
          callback(null, hash);
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          console.log(confirmationNumber, receipt);
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
        })
        .on("error", function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message);
            }
            callback(error);
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message);
            }
            callback(error);
          }
        });
    }
  };

  rebalance = (payload) => {
    const account = store.getStore("account");
    const { asset } = payload.content;

    this._callRebalance(asset, account, (err, result) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(REBALANCE_RETURNED, result);
    });
  };

  _callRebalance = async (asset, account, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let iEarnContract = new web3.eth.Contract(
      config.IEarnERC20ABI,
      asset.iEarnContract
    );

    iEarnContract.methods
      .rebalance()
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        console.log(error);
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  donate = (payload) => {
    const account = store.getStore("account");
    const { asset, amount } = payload.content;

    this._callDonate(asset, account, amount, (err, result) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(DONATE_RETURNED, result);
    });
  };

  _callDonate = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let iEarnContract = new web3.eth.Contract(
      config.IEarnERC20ABI,
      asset.erc20address
    );

    var amountSend = web3.utils.toWei(amount, "ether");
    if (asset.decimals !== 18) {
      amountSend = Math.round(amount * 10 ** asset.decimals);
    }

    iEarnContract.methods
      .transfer(asset.iEarnContract, amountSend)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        console.log(error);
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  redeem = (payload) => {
    const account = store.getStore("account");
    const { asset, amount } = payload.content;

    this._callRedeem(asset, account, amount, (err, redeemResult) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      return emitter.emit(REDEEM_RETURNED, redeemResult);
    });
  };

  _callRedeem = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let iEarnContract = new web3.eth.Contract(asset.abi, asset.iEarnContract);

    var amountSend = web3.utils.toWei(amount, "ether");
    if (asset.decimals !== 18) {
      amountSend = Math.round(amount * 10 ** asset.decimals);
    }

    iEarnContract.methods[asset.redeem](amountSend)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        console.log(error);
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  getBalancesLight = async () => {
    const account = store.getStore("account");

    const assets = store.getStore("assets");

    if (!account || !account.address) {
      return false;
    }

    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }

    async.map(
      assets,
      (asset, callback) => {
        async.parallel(
          [
            (callbackInner) => {
              this._getERC20Balance(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              this._getInvestedBalance(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              this._getPoolPrice(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              this._getMaxAPR(web3, asset, account, callbackInner);
            },
          ],
          (err, data) => {
            asset.balance = data[0];
            asset.investedBalance = data[1];
            asset.price = data[2];
            asset.maxApr = data[3];
            callback(null, asset);
          }
        );
      },
      (err, assets) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        store.setStore({ assets: assets });
        return emitter.emit(BALANCES_LIGHT_RETURNED, assets);
      }
    );
  };

  getBalances = async () => {
    const account = store.getStore("account");

    const assets = store.getStore("assets");
    if (!account || !account.address) {
      return false;
    }
    const web3 = new Web3(store.getStore("web3context").library.provider);

    async.map(
      assets,
      (asset, callback) => {
        if (this.isUsdVault(asset)) {
          async.parallel(
            [
              (callbackInner) => {
                this._getERC20Balances(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getInvestedBalance(web3, asset, account, callbackInner);
              },
            ],
            (err, data) => {
              asset.balances = data[0].balances;
              asset.sumBalances = data[0].sumBalances;
              asset.investedBalance = data[1];

              callback(null, asset);
            }
          );
          async.parallel(
            [
              (callbackInner) => {
                this._getPoolPrice(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getMaxAPR(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getPoolValue(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getAPY(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getCurrentLender(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getRecommendedLender(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getBalance(web3, asset, account, callbackInner);
              },
            ],
            (err, data) => {
              asset.price = data[2];
              asset.maxApr = data[3];
              asset.poolValue = data[4];
              asset.apy = data[5];
              asset.current = data[6];
              asset.recommended = data[7];
              asset.tokenBalance = data[8];

              callback(null, asset);
            }
          );
        } else {
          async.parallel(
            [
              (callbackInner) => {
                this._getERC20Balance(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getInvestedBalance(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getPoolPrice(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getMaxAPR(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getPoolValue(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getAPY(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getCurrentLender(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getRecommendedLender(web3, asset, account, callbackInner);
              },
              (callbackInner) => {
                this._getBalance(web3, asset, account, callbackInner);
              },
            ],
            (err, data) => {
              asset.balance = data[0];
              asset.investedBalance = data[1];
              asset.price = data[2];
              asset.maxApr = data[3];
              asset.poolValue = data[4];
              asset.apy = data[5];
              asset.current = data[6];
              asset.recommended = data[7];
              asset.tokenBalance = data[8];

              callback(null, asset);
            }
          );
        }
      },
      (err, assets) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }
        store.setStore({ assets: assets });
        return emitter.emit(BALANCES_RETURNED, assets);
      }
    );
  };

  _getERC20Balance = async (web3, asset, account, callback) => {
    if (asset.erc20address === "Ethereum") {
      try {
        const eth_balance = web3.utils.fromWei(
          await web3.eth.getBalance(account.address),
          "ether"
        );
        callback(null, parseFloat(eth_balance));
      } catch (ex) {
        console.log(ex);
        return callback(ex);
      }
    } else {
      let erc20Contract = new web3.eth.Contract(
        config.erc20ABI,
        asset.erc20address
      );

      try {
        var balance = await erc20Contract.methods
          .balanceOf(account.address)
          .call({ from: account.address });
        balance = parseFloat(balance) / 10 ** asset.decimals;
        callback(null, parseFloat(balance));
      } catch (ex) {
        console.log(ex);
        // return callback(ex);
      }
    }
  };

  _getERC20Balances = async (web3, asset, account, callback) => {
    // Strategy which required to get balances for multiple token
    const strategyTypes = ["citadel", "daoFaang", "elon", "cuban"];
    if (!strategyTypes.includes(asset.strategyType)) {
      return callback(null, {
        balances: [0, 0, 0],
        sumBalances: 0,
      });
    }

    const coinsInUSDPrice = await this._getUSDPrices();
    let priceInUSD = [];
    for (let i = 0; i < asset.price_id.length; i++) {
      const coinPrice = coinsInUSDPrice[asset.price_id[i]].usd;
      priceInUSD.push(coinPrice);
    }

    let balances = [];

    for (let i = 0; i < asset.erc20addresses.length; i++) {
      let erc20Contract = new web3.eth.Contract(
        config.erc20ABI,
        asset.erc20addresses[i]
      );

      try {
        var balance = await erc20Contract.methods
          .balanceOf(account.address)
          .call({ from: account.address });
        var decimals = await erc20Contract.methods
          .decimals()
          .call({ from: account.address });
        balance = parseFloat(balance) / 10 ** decimals;

        balances.push(parseFloat(balance));
      } catch (ex) {
        console.log(ex);
        return callback(ex);
      }
    }

    const returnObj = {
      balances,
      priceInUSD,
      sumBalances: balances.reduce((a, b) => a + b, 0),
    };
    callback(null, returnObj);
  };

  _getBalance = async (web3, asset, account, callback) => {
    if (asset.iEarnContract === null) {
      return callback(null, 0);
    }

    if (asset.erc20address === "Ethereum") {
      try {
        const eth_balance = web3.utils.fromWei(
          await web3.eth.getBalance(asset.iEarnContract),
          "ether"
        );
        callback(null, parseFloat(eth_balance));
      } catch (ex) {
        console.log(ex);
        return callback(ex);
      }
    } else {
      let erc20Contract = new web3.eth.Contract(
        config.erc20ABI,
        asset.erc20address
      );

      try {
        var balance = await erc20Contract.methods
          .balanceOf(asset.iEarnContract)
          .call({ from: account.address });
        balance = parseFloat(balance) / 10 ** asset.decimals;
        callback(null, parseFloat(balance));
      } catch (ex) {
        console.log(ex);
        return callback(ex);
      }
    }
  };

  _getAPY = async (web3, asset, account, callback) => {
    if (asset.iEarnContract === null) {
      return callback(null, 0);
    }
    if (asset.measurement == null) {
      return callback(null, 0);
    }
    try {
      let block = await web3.eth.getBlockNumber();
      let earn = new web3.eth.Contract(config.IEarnABI, asset.iEarnContract);
      let balance = await earn.methods.getPricePerFullShare().call();

      balance = balance - asset.measurement;
      balance = balance / 1e18;
      let diff = block - asset.lastMeasurement;

      balance = balance / diff;
      balance = balance * 2425846;

      callback(null, parseFloat(balance));
    } catch (e) {
      console.log(e);
      callback(null, 0);
    }
  };

  _getCurrentLender = async (web3, asset, account, callback) => {
    if (asset.iEarnContract === null) {
      return callback(null, 0);
    }

    try {
      let iEarnContract = new web3.eth.Contract(asset.abi, asset.iEarnContract);
      let value = 0;

      if (asset.erc20address === "Ethereum" || asset.id === "CRVv1") {
        value = 0;
      } else {
        value = await iEarnContract.methods
          .provider()
          .call({ from: account.address });
      }
      callback(null, parseFloat(value));
    } catch (e) {
      console.log(e);
      callback(null, 0);
    }
  };

  _getRecommendedLender = async (web3, asset, account, callback) => {
    if (asset.iEarnContract === null) {
      return callback(null, 0);
    }

    try {
      let iEarnContract = new web3.eth.Contract(asset.abi, asset.iEarnContract);
      let value = 0;

      if (asset.erc20address === "Ethereum" || asset.id === "CRVv1") {
        value = 0;
      } else {
        value = await iEarnContract.methods
          .recommend()
          .call({ from: account.address });
      }
      callback(null, parseFloat(value));
    } catch (e) {
      console.log(e);
      callback(null, 0);
    }
  };

  _getPoolValue = async (web3, asset, account, callback) => {
    if (asset.iEarnContract === null) {
      return callback(null, 0);
    }

    try {
      let iEarnContract = new web3.eth.Contract(asset.abi, asset.iEarnContract);
      let value = 0;

      if (asset.erc20address === "Ethereum") {
        value = web3.utils.fromWei(
          await iEarnContract.methods
            .calcPoolValueInETH()
            .call({ from: account.address }),
          "ether"
        );
      } else {
        value = await iEarnContract.methods
          .calcPoolValueInToken()
          .call({ from: account.address });
        if (asset.decimals === 18) {
          value = web3.utils.fromWei(value, "ether");
        } else {
          value = value / 10 ** asset.decimals;
        }
      }
      callback(null, parseFloat(value));
    } catch (e) {
      console.log(e);
      callback(null, 0);
    }
  };

  _getPoolPrice = async (web3, asset, account, callback) => {
    if (asset.iEarnContract === null) {
      return callback(null, 0);
    }

    let iEarnContract = new web3.eth.Contract(
      config.IEarnABI,
      asset.iEarnContract
    );
    const balance = web3.utils.fromWei(
      await iEarnContract.methods
        .getPricePerFullShare()
        .call({ from: account.address }),
      "ether"
    );
    callback(null, parseFloat(balance));
  };

  _getInvestedBalance = async (web3, asset, account, callback) => {
    if (asset.iEarnContract === null) {
      return callback(null, 0);
    }

    let iEarnContract = new web3.eth.Contract(
      config.IEarnABI,
      asset.iEarnContract
    );
    var balance = await iEarnContract.methods
      .balanceOf(account.address)
      .call({ from: account.address });
    balance = parseFloat(balance) / 10 ** asset.decimals;
    callback(null, parseFloat(balance));
  };

  _getMaxAPR = async (web3, asset, account, callback) => {
    if (asset.iEarnContract === null) {
      return callback(null, 0);
    }

    try {
      if (asset.symbol === "CRV") {
        let aprContract = new web3.eth.Contract(
          config.crvContractABI,
          config.crvAddress
        );
        const call = "crvapr";
        const aprs = await aprContract.methods[call]().call();
        return callback(
          null,
          web3.utils.fromWei(parseFloat(aprs).toFixed(0), "ether")
        );
      }

      if (asset.strategyType === "yearn") {
        let aprContract = new web3.eth.Contract(
          config.aggregatedContractABI,
          config.aggregatedContractAddress
        );

        var call = "getAPROptions"; //+asset.symbol
        var address = asset.erc20address;
        var aprs = 0;
        if (asset.erc20address === "Ethereum") {
          call = "getETH";
          aprs = await aprContract.methods[call]().call();
        } else {
          aprs = await aprContract.methods[call](address).call();
        }

        const keys = Object.keys(aprs);
        const workKeys = keys.filter((key) => {
          return isNaN(key);
        });
        const maxApr = Math.max.apply(
          Math,
          workKeys.map(function (o) {
            if (o === "uniapr" || o === "unicapr" || o === "iapr") {
              return aprs[o] - 100000000000000000000;
            }
            return aprs[o];
          })
        );

        callback(null, web3.utils.fromWei(maxApr.toFixed(0), "ether"));
      } else {
        return callback(null, 0);
      }
    } catch (ex) {
      return callback(null, 0);
    }
  };

  getAPR = (payload) => {
    var value = 0;
    if (payload.content && payload.content.amount) {
      value = payload.content.amount;
    }
    const web3 = new Web3(
      new Web3.providers.HttpProvider(config.infuraProvider)
    );

    async.map(
      store.getStore("aprs"),
      (apr, callback) => {
        apr.value = value.toString();
        this._getAPR(web3, apr, callback);
      },
      (err, yields) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }
        //get all headers
        if (yields && yields.length > 0 && yields[0].apr) {
          const headers = Object.keys(yields[0].apr);
          store.setStore({
            aggregatedYields: yields,
            aggregatedHeaders: headers,
          });
        }
        return emitter.emit(GET_AGGREGATED_YIELD_RETURNED, yields);
      }
    );
  };

  _getAPR = async (web3, apr, callback) => {
    let contract = new web3.eth.Contract(
      config.aprContractABI,
      config.aprContractAddress
    );
    var value = apr.value;
    if (apr.decimals === 6) {
      value = web3.utils.toWei(apr.value, "picoether");
    } else {
      value = web3.utils.toWei(apr.value, "ether");
    }
    try {
      const val = await contract.methods["getAPROptionsAdjusted"](
        apr.address,
        value
      ).call();
      const keys = Object.keys(val);

      const vals = keys
        .filter((key) => {
          return isNaN(key);
        })
        .map((key) => {
          const obj = {};
          obj[key] = web3.utils.fromWei(val[key].toString(), "ether");
          return obj;
        });

      let output = {};

      for (let i = 0; i < vals.length; i++) {
        const keys = Object.keys(vals[i]);
        if (
          keys[0] === "_unifulcrum" ||
          keys[0] === "_uniaave" ||
          keys[0] === "_unicompound" ||
          keys[0] === "_uniswap"
        ) {
          // skip
        } else {
          output[keys[0]] = vals[i][keys[0]];
        }
      }

      let iearn = 0;
      if (apr.earnAddress !== "") {
        let block = await web3.eth.getBlockNumber();
        let earn = new web3.eth.Contract(config.IEarnABI, apr.earnAddress);
        let balance = await earn.methods.getPricePerFullShare().call();

        balance = balance - apr.measurement;
        balance = balance / 1e18;
        let diff = block - apr.lastMeasurement;

        balance = balance / diff;
        balance = balance * 2425846;
        iearn = balance;
      }
      output["iearn.finance \n(APY)"] = iearn;
      apr.apr = output;

      callback(null, apr);
    } catch (ex) {
      console.log(ex);
      // return callback(ex)
      callback(null, false);
    }
  };

  _getAggregatedYield = async (web3, call, callback) => {
    let uniswapContract = new web3.eth.Contract(
      config.aggregatedContractABI,
      config.aggregatedContractAddress
    );

    try {
      const val = await uniswapContract.methods[call.name]().call();

      const keys = Object.keys(val);

      const vals = keys
        .filter((key) => {
          return isNaN(key);
        })
        .map((key) => {
          const obj = {};
          obj[key] = web3.utils.fromWei(val[key].toString(), "ether");
          return obj;
        });

      let output = {};

      for (let i = 0; i < vals.length; i++) {
        const keys = Object.keys(vals[i]);
        output[keys[0]] = vals[i][keys[0]];
      }

      call.token = call.name.replace("get", "");
      call.apr = output;

      callback(null, call);
    } catch (ex) {
      // console.log(ex)
      // return callback(ex)
      callback(null, false);
    }
  };

  getContractEvents = (payload) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    let iEarnContract = new web3.eth.Contract(
      config.IEarnABI,
      config.iEarnContract
    );

    iEarnContract
      .getPastEvents("allEvents", { fromBlock: 1, toBlock: "latest" })
      .then((res) => {
        const sorted = res
          .sort((a, b) => {
            return parseFloat(a.blockNumber) - parseFloat(b.blockNumber);
          })
          .filter((tx) => {
            if (tx.event !== "Transfer") {
              return false;
            }

            if (!tx.returnValues.value || tx.returnValues.value === 0) {
              return false;
            }

            if (
              tx.returnValues.from !==
              "0x0000000000000000000000000000000000000000"
            ) {
              return false;
            }

            return true;
          })
          .map(async (tx) => {
            const rawTx = await this._getTransaction(web3, tx.transactionHash);

            return {
              blockNumber: tx.blockNumber,
              transactionHash: tx.transactionHash,
              eth: web3.utils.fromWei(rawTx.value, "ether"),
              iEth: web3.utils.fromWei(tx.returnValues.value, "ether"),
              ethRatio: (tx.returnValues.value * 100) / rawTx.value,
              address: rawTx.from,
            };
          });

        Promise.all(sorted).then(async (transactions) => {
          const pricePerFullShare = await this._getPricePerFullShare(
            web3,
            iEarnContract
          );

          const trxs = transactions.map(async (tx) => {
            //console.log(tx.address)
            const balance = await this._getIEthBalance(
              web3,
              iEarnContract,
              tx.address
            );

            tx.ethRedeem = parseFloat(pricePerFullShare) * parseFloat(balance);
            tx.growth = (parseFloat(tx.ethRedeem) * 100) / parseFloat(tx.eth);
            return tx;
          });

          Promise.all(trxs).then(async (txs) => {
            store.setStore({ events: txs });
            return emitter.emit(GET_CONTRACT_EVENTS_RETURNED, txs);
          });
        });
      });
  };

  _getTransaction = async (web3, hash) => {
    const rawTx = await web3.eth.getTransaction(hash);
    return rawTx;
  };

  _getPricePerFullShare = async (web3, iEarnContract) => {
    const balance = web3.utils.fromWei(
      await iEarnContract.methods.getPricePerFullShare().call({}),
      "ether"
    );
    return balance;
  };

  _getIEthBalance = async (web3, iEarnContract, address) => {
    const balance = web3.utils.fromWei(
      await iEarnContract.methods.balanceOf(address).call({}),
      "ether"
    );
    return balance;
  };

  swap = (payload) => {
    const account = store.getStore("account");
    const { sendAsset, amount } = payload.content;

    let yCurveZapSwapContract = config.yCurveZapSwapAddress;
    if (sendAsset.id === "crvV3") {
      yCurveZapSwapContract = config.yCurveZapSwapV4Address;
    }

    this._checkApproval(
      sendAsset,
      account,
      amount,
      yCurveZapSwapContract,
      (err) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        this._callSwap(sendAsset, account, amount, (err, swapResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }

          return emitter.emit(SWAP_RETURNED, swapResult);
        });
      }
    );
  };

  _callSwap = async (sendAsset, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    var amountToSend = web3.utils.toWei(amount, "ether");
    if (sendAsset.decimals !== 18) {
      amountToSend = amount * 10 ** sendAsset.decimals;
    }

    let call = "";

    switch (sendAsset.id) {
      case "crvV1":
        call = "swapv1tov3";
        break;
      case "crvV2":
        call = "swapv2tov3";
        break;
      case "crvV3":
        call = "swapv3tov4";
        break;
      default:
    }

    let yCurveZapSwapContract = new web3.eth.Contract(
      config.yCurveZapSwapABI,
      config.yCurveZapSwapAddress
    );
    if (sendAsset.id === "crvV3") {
      yCurveZapSwapContract = new web3.eth.Contract(
        config.yCurveZapSwapV4ABI,
        config.yCurveZapSwapV4Address
      );
    }
    yCurveZapSwapContract.methods[call](amountToSend)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  getBestPrice = (payload) => {
    const account = store.getStore("account");
    const { sendAsset, receiveAsset, amount } = payload.content;

    this._getBestPrice(
      sendAsset,
      receiveAsset,
      account,
      amount,
      (err, price) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(GET_BEST_PRICE_RETURNED, price);
      }
    );
  };

  _getBestPrice = async (
    sendAsset,
    receiveAsset,
    account,
    amount,
    callback
  ) => {
    try {
      const url =
        "https://api-v2.dex.ag/price?from=" +
        sendAsset.symbol.toLowerCase() +
        "&to=" +
        receiveAsset.symbol.toLowerCase() +
        "&fromAmount=" +
        amount +
        "&dex=ag&tradable=true";
      let price = await rp(url);
      callback(null, JSON.parse(price));
    } catch (e) {
      callback(null, {});
    }
  };

  trade = (payload) => {
    const account = store.getStore("account");
    const { sendAsset, receiveAsset, amount } = payload.content;

    this._callTrade(
      sendAsset,
      receiveAsset,
      account,
      amount,
      (err, tradeResult) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(TRADE_RETURNED, tradeResult);
      }
    );
  };

  _callTrade = async (sendAsset, receiveAsset, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let trade = await this._getDexAgTrade(
      sendAsset,
      receiveAsset,
      account,
      amount
    );
    // await this._approveToken(trade.metadata.input.address, trade.metadata.input.spender, trade.metadata.input.amount, account, web3);

    try {
      const tx = await this._sendTrade(trade, account, web3);
      return callback(null, tx.transactionHash);
    } catch (ex) {
      return callback(ex.message);
    }
  };

  _getDexAgTrade = async (sendAsset, receiveAsset, account, amount) => {
    const url =
      "https://api-v2.dex.ag/trade?from=" +
      sendAsset.symbol.toLowerCase() +
      "&to=" +
      receiveAsset.symbol.toLowerCase() +
      "&fromAmount=" +
      amount +
      "&dex=ag";
    let trade = await rp(url);
    return JSON.parse(trade);
  };

  _approveToken = async (token, spender, amount, account, web3) => {
    // First 4 bytes of the hash of "fee()" for the sighash selector
    let funcHash = ethers.utils.hexDataSlice(
      ethers.utils.id("approve(address,uint256)"),
      0,
      4
    );

    let abi = new ethers.utils.AbiCoder();
    let inputs = [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ];

    let params = [spender, amount];
    let bytes = abi.encode(inputs, params).substr(2);

    // construct approval data from function hash and parameters
    let inputData = `${funcHash}${bytes}`;

    // let nonce = await infuraProvider.getTransactionCount(ethersWallet.address);
    let nonce = await web3.eth.getTransactionCount(account.address);

    // You will want to get the real gas price from https://ethgasstation.info/json/ethgasAPI.json
    let gasPrice = web3.utils.toWei(await this._getGasPrice(), "gwei");

    let transaction = {
      to: token,
      nonce: nonce,
      gasLimit: 500000, // You will want to use estimateGas instead for real apps
      gasPrice: gasPrice,
      data: inputData,
      from: account.address,
    };

    // let tx = await ethersWallet.sendTransaction(transaction);
    let tx = await web3.eth.sendTransaction(transaction);
    console.log(tx);
  };

  _sendTrade = async (trade, account, web3) => {
    // let nonce = await infuraProvider.getTransactionCount(ethersWallet.address);
    let nonce = await web3.eth.getTransactionCount(account.address);

    // You will want to get the real gas price from https://ethgasstation.info/json/ethgasAPI.json
    let gasPrice = web3.utils.toWei(await this._getGasPrice(), "gwei");

    let transaction = trade.trade;
    transaction.nonce = nonce;
    transaction.gasPrice = Number(gasPrice);
    transaction.gasLimit = 500000; // You will want to use estimateGas instead for real apps
    transaction.value = Number(transaction.value);
    transaction.from = account.address;
    // let tx = await ethersWallet.sendTransaction(transaction);
    let tx = await web3.eth.sendTransaction(transaction);
    return tx;
  };

  zap = (payload) => {
    const account = store.getStore("account");
    const { sendAsset, receiveAsset, amount } = payload.content;

    let contractAddress = "";

    if (receiveAsset.id === "crvV3") {
      contractAddress = config.yCurveZapAddress;
    }
    if (receiveAsset.id === "crvV4") {
      contractAddress = config.yCurveZapV4Address;
    }
    if (sendAsset.id === "crvV3") {
      contractAddress = config.yCurveZapOutAddress;
    }
    if (sendAsset.id === "crvV4") {
      contractAddress = config.yCurveZapOutV4Address;
    }

    this._checkApproval(sendAsset, account, amount, contractAddress, (err) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      this._callZap(
        sendAsset,
        receiveAsset,
        account,
        amount,
        (err, zapResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }

          return emitter.emit(ZAP_RETURNED, zapResult);
        }
      );
    });
  };

  _callZap = async (sendAsset, receiveAsset, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    var amountToSend = web3.utils.toWei(amount, "ether");
    if (sendAsset.decimals !== 18) {
      amountToSend = amount * 10 ** sendAsset.decimals;
    }

    let yCurveZapContract = null;
    if (receiveAsset.id === "crvV3") {
      yCurveZapContract = new web3.eth.Contract(
        config.yCurveZapABI,
        config.yCurveZapAddress
      );
    } else if (receiveAsset.id === "crvV4") {
      yCurveZapContract = new web3.eth.Contract(
        config.yCurveZapV4ABI,
        config.yCurveZapV4Address
      );
    } else if (sendAsset.id === "crvV3") {
      yCurveZapContract = new web3.eth.Contract(
        config.yCurveZapOutABI,
        config.yCurveZapOutAddress
      );
    } else if (sendAsset.id === "crvV4") {
      yCurveZapContract = new web3.eth.Contract(
        config.yCurveZapOutV4ABI,
        config.yCurveZapOutV4Address
      );
    }
    let call = "";

    switch (sendAsset.id) {
      case "DAIv2":
      case "DAIv3":
        call = "depositDAI";
        break;
      case "USDCv2":
      case "USDCv3":
        call = "depositUSDC";
        break;
      case "USDTv2":
      case "USDTv3":
        call = "depositUSDT";
        break;
      case "TUSDv2":
        call = "depositTUSD";
        break;
      case "BUSDv3":
        call = "depositBUSD";
        break;
      case "crvV3":
      case "crvV4":
        switch (receiveAsset.id) {
          case "DAIv2":
          case "DAIv3":
            call = "withdrawDAI";
            break;
          case "USDCv2":
          case "USDCv3":
            call = "withdrawUSDC";
            break;
          case "USDTv2":
          case "USDTv3":
            call = "withdrawUSDT";
            break;
          case "TUSDv2":
            call = "withdrawTUSD";
            break;
          case "BUSDv3":
            call = "withdrawBUSD";
            break;
          default:
        }
        break;
      default:
    }

    yCurveZapContract.methods[call](amountToSend)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  idai = (payload) => {
    const account = store.getStore("account");
    const { sendAsset, receiveAsset, amount } = payload.content;

    this._checkApproval(
      sendAsset,
      account,
      amount,
      config.iDAIZapSwapAddress,
      (err) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        this._callIDAI(
          sendAsset,
          receiveAsset,
          account,
          amount,
          (err, zapResult) => {
            if (err) {
              return emitter.emit(ERROR, err);
            }

            return emitter.emit(IDAI_RETURNED, zapResult);
          }
        );
      }
    );
  };

  _callIDAI = async (sendAsset, receiveAsset, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    var amountToSend = web3.utils.toWei(amount, "ether");
    if (sendAsset.decimals !== 18) {
      amountToSend = amount * 10 ** sendAsset.decimals;
    }

    let call = "swapiDAItoyDAI";

    let iDAIZapSwapContract = new web3.eth.Contract(
      config.iDAIZapSwapABI,
      config.iDAIZapSwapAddress
    );
    iDAIZapSwapContract.methods[call](amountToSend)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  getCurveBalances = (payload) => {
    const account = store.getStore("account");

    const web3 = new Web3(store.getStore("web3context").library.provider);
    const curveContracts = store.getStore("curveContracts");

    async.map(
      curveContracts,
      (curv, callback) => {
        this._getERC20Balance(web3, curv, account, (err, balance) => {
          if (err) {
            return callback(err);
          }
          curv.balance = balance;

          callback(null, curv);
        });
      },
      (err, result) => {
        store.setStore({ curveContracts: result });

        return emitter.emit(GET_CURV_BALANCE_RETURNED, result);
      }
    );
  };

  getVaultBalancesFull = async (interval) => {
    const network = store.getStore("network");
    const account = store.getStore("account");
    // const assets = store.getStore('vaultAssets')
    const assets = this._getDefaultValues(network).vaultAssets;
    if (!account || !account.address) {
      return false;
    }
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }
    const vaultStatistics = await this._getStatistics();
    const addressStatistics = await this._getAddressStatistics(account.address);
    const addressTXHitory = await this._getAddressTxHistory(account.address);
    const usdPrices = await this._getUSDPrices();

    async.map(
      assets,
      (asset, callback) => {
        async.parallel(
          [
            (callbackInner) => {
              this._getERC20Balance(web3, asset, account, callbackInner);
            },
            // (callbackInner) => { this._getVaultBalance(web3, asset, account, callbackInner) },
            (callbackInner) => {
              this._getBalances(web3, asset, account, callbackInner);
            },
            // (callbackInner) => { this._getStrategy(web3, asset, account, callbackInner) },
            (callbackInner) => {
              this._getStatsAPY(vaultStatistics, asset, callbackInner);
            },
            (callbackInner) => {
              this._getVaultHoldings(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              this._getAssetUSDPrices(
                web3,
                asset,
                account,
                usdPrices,
                callbackInner
              );
            },
            (callbackInner) => {
              this._getVaultAPY(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              this._getAddressStats(addressStatistics, asset, callbackInner);
            },
            (callbackInner) => {
              this._getAddressTransactions(
                addressTXHitory,
                asset,
                callbackInner
              );
            },
            (callbackInner) => {
              this._getMaxAPR(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              this._getHistoricalPrice(
                asset.historicalPriceId,
                interval,
                callbackInner
              );
            },
            //
          ],
          (err, data) => {
            if (err) {
              return callback(err);
            }
            asset.balance = data[0];
            asset.vaultBalance = data[1].vaultBalance;
            asset.earnBalance = data[1].earnBalance;
            asset.strategyBalance = data[1].strategyBalance;
            asset.depositedSharesInUSD = data[1].depositedSharesInUSD
              ? data[1].depositedSharesInUSD
              : null;
            asset.stats = data[2];
            asset.vaultHoldings = data[3];
            asset.usdPrice = data[4].usdPrice;
            asset.earnPricePerFullShare = data[5].earnPricePerFullShare;
            asset.vaultPricePerFullShare = data[5].vaultPricePerFullShare;
            asset.compoundExchangeRate = data[5].compoundExchangeRate;
            asset.apy = data[5].apy;
            asset.addressStatistics = data[6];
            asset.addressTransactions = data[7];
            asset.earnApr = data[8];
            asset.historicalPrice = data[9];
            callback(null, asset);
          }
        );
      },
      (err, assets) => {
        if (err) {
          console.log(err);
          return emitter.emit(ERROR, err);
        }
        store.setStore({ vaultAssets: assets });
        return emitter.emit(VAULT_BALANCES_FULL_RETURNED, assets);
      }
    );
  };

  _getAssetUSDPrices = async (web3, asset, account, usdPrices, callback) => {
    try {
      const usdPrice = usdPrices[asset.price_id];

      const returnObj = {
        usdPrice: usdPrice.usd,
      };

      callback(null, returnObj);
    } catch (ex) {
      callback(null, {});
    }
  };

  _getStrategy = async (web3, asset, account, callback) => {
    if (["LINK"].includes(asset.id)) {
      return callback(null, {
        strategy: "",
        name: "",
        holdings: 0,
      });
    }

    try {
      const vaultContract = new web3.eth.Contract(
        asset.vaultContractABI,
        asset.vaultContractAddress
      );
      const controllerAddress = await vaultContract.methods
        .controller()
        .call({ from: account.address });
      const controllerContract = new web3.eth.Contract(
        config.vaultControllerABI,
        controllerAddress
      );

      let strategyAddress = "";
      if (["LINK", "aLINK"].includes(asset.id)) {
        strategyAddress = await controllerContract.methods
          .strategies(asset.vaultContractAddress)
          .call({ from: account.address });
      } else {
        if (asset.erc20address === "Ethereum") {
          asset.erc20address = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
        }
        strategyAddress = await controllerContract.methods
          .strategies(asset.erc20address)
          .call({ from: account.address });
      }

      const strategyContract = new web3.eth.Contract(
        config.vaultStrategyABI,
        strategyAddress
      );
      const holdings = await strategyContract.methods
        .balanceOf()
        .call({ from: account.address });
      let strategyName = "DForceUSDC";

      if (!["USDC"].includes(asset.id)) {
        strategyName = await strategyContract.methods
          .getName()
          .call({ from: account.address });
        strategyName = strategyName.replace(/^Strategy/, "");
      }

      callback(null, {
        strategy: strategyAddress,
        name: strategyName,
        holdings: holdings / 10 ** (asset.id === "aLINK" ? 6 : asset.decimals),
      });
    } catch (ex) {
      console.log(ex);
      callback(null, {
        strategy: "",
        name: "",
        holdings: 0,
      });
    }
  };

  _getStatsAPY = (vaultStatistics, asset, callback) => {
    try {
      if (asset.erc20address === "Ethereum") {
        asset.erc20address = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
      }

      let vault = [];

      if (asset.strategyType === "compound") {
        vault = vaultStatistics.filter((stats) => {
          return (
            stats.address.toLowerCase() ===
            asset.vaultContractAddress.toLowerCase()
          );
        });
      } else if (asset.strategyType === "yearn") {
        vault = vaultStatistics.filter((stats) => {
          if (typeof stats.tokenAddress == "string") {
            return (
              stats.tokenAddress.toLowerCase() ===
                asset.erc20address.toLowerCase() &&
              stats.address.toLowerCase() === asset.vaultAddress.toLowerCase()
            );
          } else if (Array.isArray(stats.tokenAddress)) {
            return stats.tokenAddress.find(
              (t) =>
                t.toLowerCase() === asset.erc20address.toLowerCase() &&
                stats.address.toLowerCase() === asset.vaultAddress.toLowerCase()
            );
          }
        });
      } else if (this.isUsdVault(asset)) {
        vault = vaultStatistics.filter((stats) => {
          return (
            stats.address.toLowerCase() ===
            asset.vaultContractAddress.toLowerCase()
          );
        });
      }

      if (vault.length === 0) {
        return callback(null, {});
      }

      callback(null, vault[0]);
    } catch (ex) {
      callback(null, {});
    }
  };

  _getAddressStats = (addressStatistics, asset, callback) => {
    try {
      if (asset.erc20address === "Ethereum") {
        asset.erc20address = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
      }

      const vault = addressStatistics.filter((stats) => {
        return (
          stats.contractAddress.toLowerCase() ===
          asset.vaultContractAddress.toLowerCase()
        );
      });

      if (vault.length === 0) {
        return callback(null, null);
      }
      callback(null, vault[0]);
    } catch (ex) {
      callback(null, {});
    }
  };

  _getAddressTransactions = (addressTXHitory, asset, callback) => {
    try {
      if (asset.erc20address === "Ethereum") {
        asset.erc20address = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
      }

      const vault = addressTXHitory.filter((stats) => {
        return (
          stats.contractAddress.toLowerCase() ===
          asset.vaultContractAddress.toLowerCase()
        );
      });

      if (vault.length === 0) {
        return callback(null, {});
      }

      callback(null, vault[0]);
    } catch (ex) {
      callback(null, {});
    }
  };

  _getVaultHoldings = async (web3, asset, account, callback) => {
    // let vaultContract = new web3.eth.Contract(asset.vaultContractABI, asset.vaultContractAddress)
    // var balance = await vaultContract.methods.balance().call({ from: account.address });
    // balance = parseFloat(balance)/10**asset.decimals
    // callback(null, parseFloat(balance))
    let vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );
    let strategyAddress = await vaultContract.methods
      .strategy()
      .call({ from: account.address });
    let strategyContract = new web3.eth.Contract(
      asset.strategyContractABI,
      strategyAddress
    );
    let balance = "";

    let pool = await strategyContract.methods
      .pool()
      .call({ from: account.address });
    let decimals = await strategyContract.methods
      .decimals()
      .call({ from: account.address });
    balance = parseFloat(pool) / 10 ** parseInt(decimals);
    // }
    callback(null, parseFloat(balance));
  };

  _getStrategyHoldings = async (web3, asset, account, callback) => {
    try {
      let vaultContract = new web3.eth.Contract(
        asset.vaultContractABI,
        asset.vaultContractAddress
      );
      let balance = await vaultContract.methods
        .balance()
        .call({ from: account.address });

      let available = 0;
      if (asset.id === "aLINK") {
        available = await vaultContract.methods
          .credit()
          .call({ from: account.address });
      } else {
        available = await vaultContract.methods
          .available()
          .call({ from: account.address });
      }
      balance = parseFloat(balance - available) / 10 ** asset.decimals;
      callback(null, parseFloat(balance));
    } catch (ex) {
      console.log(ex);
    }
  };

  getVaultBalances = async () => {
    const account = store.getStore("account");

    const assets = store.getStore("vaultAssets");

    if (!account || !account.address) {
      return false;
    }

    const web3 = new Web3(store.getStore("web3context").library.provider);

    async.map(
      assets,
      (asset, callback) => {
        async.parallel(
          [
            (callbackInner) => {
              this._getERC20Balance(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              this._getVaultBalance(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              this._getVaultAPY(web3, asset, account, callbackInner);
            },
          ],
          (err, data) => {
            if (err) {
              return callback(err);
            }

            asset.balance = data[0];
            asset.vaultBalance = data[1];
            asset.pricePerFullShare = data[2].pricePerFullShare;
            asset.apy = data[2].apy;

            callback(null, asset);
          }
        );
      },
      (err, assets) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }
        store.setStore({ vaultAssets: assets });
        return emitter.emit(VAULT_BALANCES_RETURNED, assets);
      }
    );
  };

  _getVaultBalance = async (web3, asset, account, callback) => {
    if (asset.vaultContractAddress === null) {
      return callback(null, 0);
    }

    let vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );
    var balance = await vaultContract.methods
      .balanceOf(account.address)
      .call({ from: account.address });
    balance = parseFloat(balance) / 10 ** asset.decimals;
    callback(null, parseFloat(balance));
  };

  _getBalances = async (web3, asset, account, callback) => {
    if (asset.vaultContractAddress === null) {
      return callback(null, 0);
    }
    if (asset.strategyType === "yearn") {
      let vaultContract = new web3.eth.Contract(
        asset.vaultContractABI,
        asset.vaultContractAddress
      );
      let sharesBalance = await vaultContract.methods
        .balanceOf(account.address)
        .call({ from: account.address });
      sharesBalance = parseFloat(sharesBalance);

      let strategyAddress = await vaultContract.methods
        .strategy()
        .call({ from: account.address });
      let strategyContract = new web3.eth.Contract(
        asset.strategyContractABI,
        strategyAddress
      );

      let earnBalance = await strategyContract.methods
        .getEarnDepositBalance(account.address)
        .call({ from: account.address });
      earnBalance = parseFloat(earnBalance);

      let vaultBalance = await strategyContract.methods
        .getVaultDepositBalance(account.address)
        .call({ from: account.address });
      vaultBalance = parseFloat(vaultBalance);

      const sharePerDepositAmt = sharesBalance / (earnBalance + vaultBalance);
      earnBalance = (sharePerDepositAmt * earnBalance) / 10 ** asset.decimals;
      vaultBalance = (sharePerDepositAmt * vaultBalance) / 10 ** asset.decimals;

      callback(null, {
        earnBalance: isNaN(parseFloat(earnBalance))
          ? 0
          : parseFloat(earnBalance),
        vaultBalance: isNaN(parseFloat(vaultBalance))
          ? 0
          : parseFloat(vaultBalance),
        strategyBalance: 0,
      });
    } else if (asset.strategyType === "compound") {
      let compoundContract = new web3.eth.Contract(
        asset.vaultContractABI,
        asset.vaultContractAddress
      );
      let strategyAddress = await compoundContract.methods
        .strategy()
        .call({ from: account.address });
      let strategyContract = new web3.eth.Contract(
        asset.strategyContractABI,
        strategyAddress
      );

      let balance = await strategyContract.methods
        .getCurrentBalance(account.address)
        .call({ from: account.address });
      balance = parseFloat(balance) / 10 ** asset.decimals;

      callback(null, {
        earnBalance: 0,
        vaultBalance: 0,
        strategyBalance: balance,
      });
    } else if (
      asset.strategyType === "citadel" ||
      asset.strategyType === "elon" ||
      asset.strategyType === "cuban"
    ) {
      const vaultContract = new web3.eth.Contract(
        asset.vaultContractABI,
        asset.vaultContractAddress
      );

      const pool = await vaultContract.methods.getAllPoolInUSD().call();
      const totalSupply = await vaultContract.methods.totalSupply().call();
      const depositedShares = await vaultContract.methods
        .balanceOf(account.address)
        .call({ from: account.address });

      const depositedSharesInUSD =
        (depositedShares * pool) / totalSupply / 10 ** 6;

      callback(null, {
        earnBalance: 0,
        vaultBalance: 0,
        strategyBalance: depositedShares,
        depositedSharesInUSD: depositedSharesInUSD,
      });
    } else if (asset.strategyType === "daoFaang") {
      const network = store.getStore("network");
      const vaultContract = new web3.eth.Contract(
        asset.vaultContractABI,
        asset.vaultContractAddress
      );
      // USDT to USD price feed contract
      const usdtUsdPriceFeedContract = new web3.eth.Contract(
        config.eacAggregatoorProxyContract,
        network === 1
          ? config.USDTUSDPriceFeedMainnetContract
          : config.USDTUSDPriceFeedKovanContract
      );

      // USDT / USD conversion result
      const usdtToUsdPrice = await usdtUsdPriceFeedContract.methods
        .latestAnswer()
        .call();

      const pool = await vaultContract.methods.getTotalValueInPool().call();
      const totalSupply = await vaultContract.methods.totalSupply().call();
      const depositedShares = await vaultContract.methods
        .balanceOf(account.address)
        .call({ from: account.address });

      const poolInUSD = (pool * usdtToUsdPrice) / 10 ** 20;
      const depositedSharesInUSD =
        (depositedShares * poolInUSD) / totalSupply / 10 ** 6;

      callback(null, {
        earnBalance: 0,
        vaultBalance: 0,
        strategyBalance: depositedShares,
        depositedSharesInUSD: depositedSharesInUSD,
      });
    } else if (asset.strategyType === "harvest") {
      let harvestContract = new web3.eth.Contract(
        asset.vaultContractABI,
        asset.vaultContractAddress
      );
      let strategyAddress = await harvestContract.methods
        .strategy()
        .call({ from: account.address });
      let strategyContract = new web3.eth.Contract(
        asset.strategyContractABI,
        strategyAddress
      );

      let balance = await strategyContract.methods
        .getCurrentBalance(account.address)
        .call({ from: account.address });
      balance = parseFloat(balance) / 10 ** asset.decimals;

      callback(null, {
        earnBalance: 0,
        vaultBalance: 0,
        strategyBalance: balance,
      });
    }
  };

  _getVaultPricePerShare = async (web3, asset, account, callback) => {
    if (asset.vaultContractAddress === null) {
      return callback(null, 0);
    }

    try {
      let vaultContract = new web3.eth.Contract(
        asset.vaultContractABI,
        asset.vaultContractAddress
      );
      var price = await vaultContract.methods
        .getPricePerFullShare()
        .call({ from: account.address });
      price = parseFloat(price) / 10 ** 18;
      callback(null, parseFloat(price));
    } catch (ex) {
      console.log(ex);
      callback(null, 0);
    }
  };

  depositContract = async (payload) => {
    const account = store.getStore("account");

    //  Token Index USDT = 0, USDC = 1, DAI = 2
    const { asset, earnAmount, vaultAmount, amount, tokenIndex } =
      payload.content;

    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }

    const vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );

    const strategyAddress = await vaultContract.methods
      .strategy()
      .call({ from: account.address });

    if (asset.strategyType === "yearn") {
      await this._checkApproval(
        asset,
        account,
        earnAmount + vaultAmount,
        strategyAddress,
        (err, txnHash, approvalResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );
      await this._callDepositContract(
        asset,
        account,
        earnAmount,
        vaultAmount,
        (err, txnHash, depositResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
          }
          if (depositResult) {
            return emitter.emit(
              DEPOSIT_CONTRACT_RETURNED_COMPLETED,
              depositResult.transactionHash
            );
          }
        }
      );
    } else if (asset.strategyType === "compound") {
      await this._checkApproval(
        asset,
        account,
        amount,
        strategyAddress,
        (err, txnHash, approvalResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );
      await this._callDepositAmountContract(
        asset,
        account,
        amount,
        (err, txnHash, depositResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
          }
          if (depositResult) {
            return emitter.emit(
              DEPOSIT_CONTRACT_RETURNED_COMPLETED,
              depositResult.transactionHash
            );
          }
        }
      );
    } else if (asset.strategyType === "citadel") {
      await this._checkApprovalCitadel(
        asset,
        account,
        amount,
        asset.vaultContractAddress,
        tokenIndex,
        (err, txnHash, approvalResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );

      const happyHour = await this._eventVerifyAmount(amount);
      // const happyHour = true;

      if (happyHour === true) {
        await this._callDepositAmountContractCitadelHappyHour(
          asset,
          account,
          amount,
          tokenIndex,
          (err, txnHash, depositResult) => {
            if (err) {
              return emitter.emit(ERROR, err);
            }
            if (txnHash) {
              return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
            }
            if (depositResult) {
              return emitter.emit(
                DEPOSIT_CONTRACT_HAPPY_HOUR_RETURNED_COMPLETED,
                depositResult.transactionHash
              );
            }
          }
        );
      } else {
        await this._callDepositAmountContractCitadel(
          asset,
          account,
          amount,
          tokenIndex,
          (err, txnHash, depositResult) => {
            if (err) {
              return emitter.emit(ERROR, err);
            }
            if (txnHash) {
              return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
            }
            if (depositResult) {
              return emitter.emit(
                DEPOSIT_CONTRACT_RETURNED_COMPLETED,
                depositResult.transactionHash
              );
            }
          }
        );
      }
    } else if (asset.strategyType === "elon") {
      await this._checkApprovalCitadel(
        asset,
        account,
        amount,
        asset.vaultContractAddress,
        tokenIndex,
        (err, txnHash, approvalResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );

      await this._callDepositAmountContractCitadel(
        asset,
        account,
        amount,
        tokenIndex,
        (err, txnHash, depositResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
          }
          if (depositResult) {
            return emitter.emit(
              DEPOSIT_CONTRACT_RETURNED_COMPLETED,
              depositResult.transactionHash
            );
          }
        }
      );

    } else if (asset.strategyType === "harvest") {

      await this._checkApproval(
        asset,
        account,
        amount,
        strategyAddress,

        (err, txnHash, approvalResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );


      await this._callDepositAmountContract(
        asset,
        account,
        amount,

        (err, txnHash, depositResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
          }
          if (depositResult) {
            return emitter.emit(
              DEPOSIT_CONTRACT_RETURNED_COMPLETED,
              depositResult.transactionHash
            );
          }
        }
      );
    } else if (asset.strategyType === "cuban") {

      await this._checkApprovalCitadel(
        asset,
        account,
        amount,
        asset.vaultContractAddress,
        tokenIndex,
        (err, txnHash, approvalResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );

      await this._callDepositAmountContractCitadel(
        asset,
        account,
        amount,
        tokenIndex,
        (err, txnHash, depositResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
          }
          if (depositResult) {
            return emitter.emit(
              DEPOSIT_CONTRACT_RETURNED_COMPLETED,
              depositResult.transactionHash
            );
          }
        }
      );
    } else if (asset.strategyType === "daoFaang") {
      let approvalErr; // To prevent execution on deposit contract, after user denied for _checkApprovalCitadel()
      await this._checkApprovalCitadel(
        asset,
        account,
        amount,
        asset.vaultContractAddress,
        tokenIndex,
        (err, txnHash, approvalResult) => {
          if (err) {
            approvalErr = err;
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );

      if (!approvalErr) {
        const happyHour = await this._eventVerifyAmount(amount);
        // const happyHour = true;

        if (happyHour === true) {
          await this._callDepositAmountContractCitadelHappyHour(
            asset,
            account,
            amount,
            tokenIndex,
            (err, txnHash, depositResult) => {
              if (err) {
                return emitter.emit(ERROR, err);
              }
              if (txnHash) {
                return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
              }
              if (depositResult) {
                return emitter.emit(
                  DEPOSIT_CONTRACT_HAPPY_HOUR_RETURNED_COMPLETED,
                  depositResult.transactionHash
                );
              }
            }
          );
        } else {
          await this._callDepositAmountContractCitadel(
            asset,
            account,
            amount,
            tokenIndex,
            (err, txnHash, depositResult) => {
              if (err) {
                return emitter.emit(ERROR, err);
              }
              if (txnHash) {
                return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
              }
              if (depositResult) {
                return emitter.emit(
                  DEPOSIT_CONTRACT_RETURNED_COMPLETED,
                  depositResult.transactionHash
                );
              }
            }
          );
        }
      }
    }
  };

  _checkIfApprovalIsNeeded = async (
    asset,
    account,
    amount,
    contract,
    callback
  ) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    let erc20Contract = new web3.eth.Contract(
      config.erc20ABI,
      asset.erc20address
    );
    const allowance = await erc20Contract.methods
      .allowance(account.address, contract)
      .call({ from: account.address });

    const ethAllowance = web3.utils.fromWei(allowance, "ether");
    if (parseFloat(ethAllowance) < parseFloat(amount)) {
      asset.amount = amount;
      callback(null, asset);
    } else {
      callback(null, false);
    }
  };

  _callApproval = async (asset, account, amount, contract, last, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    let erc20Contract = new web3.eth.Contract(
      config.erc20ABI,
      asset.erc20address
    );
    try {
      if (
        [
          "crvV1",
          "crvV2",
          "crvV3",
          "crvV4",
          "USDTv1",
          "USDTv2",
          "USDTv3",
          "USDT",
        ].includes(asset.id)
      ) {
        const allowance = await erc20Contract.methods
          .allowance(account.address, contract)
          .call({ from: account.address });
        const ethAllowance = web3.utils.fromWei(allowance, "ether");
        if (ethAllowance > 0) {
          erc20Contract.methods
            .approve(contract, web3.utils.toWei("0", "ether"))
            .send({
              from: account.address,
              gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
            })
            .on("transactionHash", function (hash) {
              //success...
            })
            .on("error", function (error) {
              if (!error.toString().includes("-32601")) {
                if (error.message) {
                  return callback(error.message);
                }
                callback(error);
              }
            });
        }
      }

      if (last) {
        await erc20Contract.methods
          .approve(contract, web3.utils.toWei(amount, "ether"))
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
          });
        callback();
      } else {
        erc20Contract.methods
          .approve(contract, web3.utils.toWei(amount, "ether"))
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
          })
          .on("transactionHash", function (hash) {
            callback();
          })
          .on("error", function (error) {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return callback(error.message);
              }
              callback(error);
            }
          });
      }
    } catch (error) {
      if (error.message) {
        return callback(error.message);
      }
      callback(error);
    }
  };

  // For Citadel
  _callDepositAmountContractCitadel = async (
    asset,
    account,
    amount,
    tokenIndex = null,
    callback
  ) => {
    // Handle vaults with multi tokens
    try {
      if (
        tokenIndex !== null &&
        tokenIndex > 0 &&
        tokenIndex < asset.erc20addresses.length
      ) {
        asset.erc20address = asset.erc20addresses[tokenIndex];
      }
    } catch (error) {
      if (error.message) {
        return callback(error.message);
      }
      callback(error);
    }

    const web3 = new Web3(store.getStore("web3context").library.provider);

    let vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );

    let erc20Contract = new web3.eth.Contract(
      config.erc20ABI,
      asset.erc20addresses[tokenIndex]
    );

    let decimals = await erc20Contract.methods.decimals().call();

    var amountToSend =
      decimals !== "18"
        ? web3.utils.toBN(Math.floor(amount * 10 ** decimals)).toString()
        : web3.utils.toWei(amount, "ether");

    // Citadel, Elon, and Cuban pass token's index for deposit, while FAANG pass token address
    const tokenToSent =
      asset.strategyType === "daoFaang"
        ? asset.erc20addresses[tokenIndex]
        : tokenIndex;

    vaultContract.methods
      .deposit(amountToSend, tokenToSent)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (txnHash) {
        console.log(txnHash);
        callback(null, txnHash, null);
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
        callback(null, null, receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  _callDepositAmountContractCitadelHappyHour = async (
    asset,
    account,
    amount,
    tokenIndex = null,
    callback
  ) => {
    // Handle vaults with multi tokens
    try {
      if (
        tokenIndex !== null &&
        tokenIndex > 0 &&
        tokenIndex < asset.erc20addresses.length
      ) {
        asset.erc20address = asset.erc20addresses[tokenIndex];
      }
    } catch (error) {
      if (error.message) {
        return callback(error.message);
      }
      callback(error);
    }
    let vaultContract;
    if (asset.strategyType === "citadel") {
      vaultContract = store.getStore("happyHourContract");
    } else if (asset.strategyType === "daoFaang") {
      vaultContract = store.getStore("happyHourContractFAANG");
    }

    const web3 = new Web3(store.getStore("web3context").library.provider);

    let erc20Contract = new web3.eth.Contract(
      config.erc20ABI,
      asset.erc20addresses[tokenIndex]
    );

    let decimals = await erc20Contract.methods.decimals().call();

    var amountToSend =
      decimals !== "18"
        ? web3.utils.toBN(amount * 10 ** decimals).toString()
        : web3.utils.toWei(amount, "ether");

    console.log("🚀 | tx | account.address", account.address);

    // Citadel, Elon, and Cuban pass token's index for deposit, while FAANG pass token address
    const tokenToSent =
      asset.strategyType === "daoFaang"
        ? asset.erc20addresses[tokenIndex]
        : tokenIndex;

    let tx = vaultContract.methods.deposit(amountToSend, tokenToSent).send({
      from: account.address,
      signatureType: "EIP712_SIGN",
      //optionally you can add other options like gasLimit
    });

    tx.on("transactionHash", function (txnHash) {
      console.log(txnHash);
      callback(null, txnHash, null);
    })
      .on("receipt", function (receipt) {
        console.log(receipt);
        callback(null, null, receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("4001")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("4001")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  _callDepositAmountContract = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );

    var amountToSend = web3.utils.toWei(amount, "ether");
    if (parseInt(asset.decimals) !== 18) {
      amountToSend = web3.utils
        .toBN(Math.floor(amount * 10 ** asset.decimals))
        .toString();
    }

    vaultContract.methods
      .deposit(amountToSend)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (txnHash) {
        console.log(txnHash);
        callback(null, txnHash, null);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log("Confirmation", confirmationNumber, receipt);
        // callback(null, null, receipt);
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
        callback(null, null, receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  // For Yearn
  _callDepositContract = async (
    asset,
    account,
    earnAmount,
    vaultAmount,
    callback
  ) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );

    var earnAmountToSend = web3.utils.toWei(earnAmount, "ether");
    if (parseInt(asset.decimals) !== 18) {
      earnAmountToSend = web3.utils
        .toBN(Math.floor(earnAmount * 10 ** asset.decimals))
        .toString();
    }

    var vaultAmountToSend = web3.utils.toWei(vaultAmount, "ether");
    if (parseInt(asset.decimals) !== 18) {
      vaultAmountToSend = web3.utils
        .toBN(Math.floor(vaultAmount * 10 ** asset.decimals))
        .toString();
    }

    console.log([earnAmountToSend, vaultAmountToSend]);
    vaultContract.methods
      .deposit([earnAmountToSend, vaultAmountToSend])
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (txnHash) {
        console.log(txnHash);
        callback(null, txnHash, null);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log("Confirmation", confirmationNumber, receipt);
        // callback(null, null, receipt);
      })
      .on("receipt", function (receipt) {
        console.log("Reciept", receipt);
        callback(null, null, receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error, null, null);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error, null, null);
        }
      });
  };

  depositAllContract = async (payload) => {
    const account = store.getStore("account");
    const { asset, earnAmount, vaultAmount, amount, tokenIndex } =
      payload.content;

    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }

    const vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );

    if (asset.strategyType === "yearn") {
      await this._checkApproval(
        asset,
        account,
        amount,
        asset.vaultContractAddress,
        (err, txnHash, approvalResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );

      await this._callDepositContract(
        asset,
        account,
        earnAmount,
        vaultAmount,
        (err, txnHash, depositResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
          }
          if (depositResult) {
            return emitter.emit(
              DEPOSIT_CONTRACT_RETURNED_COMPLETED,
              depositResult.transactionHash
            );
          }
        }
      );
    } else if (asset.strategyType === "compound") {
      await this._checkApproval(
        asset,
        account,
        amount,
        asset.vaultContractAddress,
        (err, txnHash, approvalResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );

      await this._callDepositAmountContract(
        asset,
        account,
        amount,
        (err, txnHash, depositResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
          }
          if (depositResult) {
            return emitter.emit(
              DEPOSIT_CONTRACT_RETURNED_COMPLETED,
              depositResult.transactionHash
            );
          }
        }
      );
    } else if (asset.strategyType === "citadel") {
      await this._checkApprovalCitadel(
        asset,
        account,
        amount,
        asset.vaultContractAddress,
        tokenIndex,
        (err, txnHash, approvalResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );
      const happyHour = await this._eventVerifyAmount(amount);

      // TODO: Call backend api for happy hour condition
      if (happyHour === true) {
        console.log("HappyHour");
        await this._callDepositAmountContractCitadelHappyHour(
          asset,
          account,
          amount,
          tokenIndex,
          (err, txnHash, depositResult) => {
            if (err) {
              return emitter.emit(ERROR, err);
            }
            if (txnHash) {
              return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
            }
            if (depositResult) {
              return emitter.emit(
                DEPOSIT_CONTRACT_RETURNED_COMPLETED,
                depositResult.transactionHash
              );
            }
          }
        );
      } else {
        await this._callDepositAmountContractCitadel(
          asset,
          account,
          amount,
          tokenIndex,
          (err, txnHash, depositResult) => {
            if (err) {
              return emitter.emit(ERROR, err);
            }
            if (txnHash) {
              return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
            }
            if (depositResult) {
              return emitter.emit(
                DEPOSIT_CONTRACT_RETURNED_COMPLETED,
                depositResult.transactionHash
              );
            }
          }
        );
      }
    } else if (asset.strategyType === "elon") {
      await this._checkApprovalCitadel(
        asset,
        account,
        amount,
        asset.vaultContractAddress,
        tokenIndex,
        (err, txnHash, approvalResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );

      await this._callDepositAmountContractCitadel(
        asset,
        account,
        amount,
        tokenIndex,
        (err, txnHash, depositResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
          }
          if (depositResult) {
            return emitter.emit(
              DEPOSIT_CONTRACT_RETURNED_COMPLETED,
              depositResult.transactionHash
            );
          }
        }
      );
    } else if (asset.strategyType === "cuban") {
      await this._checkApprovalCitadel(
        asset,
        account,
        amount,
        asset.vaultContractAddress,
        tokenIndex,
        (err, txnHash, approvalResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );

      await this._callDepositAmountContractCitadel(
        asset,
        account,
        amount,
        tokenIndex,
        (err, txnHash, depositResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
          }
          if (depositResult) {
            return emitter.emit(
              DEPOSIT_CONTRACT_RETURNED_COMPLETED,
              depositResult.transactionHash
            );
          }
        }
      );
    } else if (asset.strategyType === "daoFaang") {
      let approvalErr;
      await this._checkApprovalCitadel(
        asset,
        account,
        amount,
        asset.vaultContractAddress,
        tokenIndex,
        (err, txnHash, approvalResult) => {
          if (err) {
            approvalErr = err;
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );

      if (!approvalErr) {
        await this._callDepositAmountContractCitadel(
          asset,
          account,
          amount,
          tokenIndex,
          (err, txnHash, depositResult) => {
            if (err) {
              return emitter.emit(ERROR, err);
            }
            if (txnHash) {
              return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
            }
            if (depositResult) {
              return emitter.emit(
                DEPOSIT_CONTRACT_RETURNED_COMPLETED,
                depositResult.transactionHash
              );
            }
          }
        );
      }
    }
  };

  withdrawVault = (payload) => {
    const account = store.getStore("account");
    const { asset, amount, tokenIndex } = payload.content;

    if (asset.yVaultCheckAddress) {
      this._checkApprovalForProxy(
        asset,
        account,
        amount,
        asset.yVaultCheckAddress,
        (err) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }

          this._callWithdrawVaultProxy(
            asset,
            account,
            amount,
            (err, txnHash, withdrawalResult) => {
              if (err) {
                return emitter.emit(ERROR, err);
              }
              if (txnHash) {
                return emitter.emit(WITHDRAW_VAULT_RETURNED, txnHash);
              }
              if (withdrawalResult) {
                return emitter.emit(
                  WITHDRAW_VAULT_RETURNED_COMPLETED,
                  withdrawalResult.transactionHash
                );
              }
            }
          );
        }
      );
    } else {
      this._callWithdrawVault(
        asset,
        account,
        amount,
        tokenIndex,
        (err, txnHash, withdrawalResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(WITHDRAW_VAULT_RETURNED, txnHash);
          }
          if (withdrawalResult) {
            return emitter.emit(
              WITHDRAW_VAULT_RETURNED_COMPLETED,
              withdrawalResult.transactionHash
            );
          }
        }
      );
    }
  };

  _callWithdrawVaultProxy = async (
    asset,
    account,
    amount,
    tokenIndex = null,
    callback
  ) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let yVaultCheckContract = new web3.eth.Contract(
      config.yVaultCheckABI,
      asset.yVaultCheckAddress
    );

    var amountSend = web3.utils.toWei(amount, "ether");
    if (asset.decimals !== 18) {
      amountSend = Math.round(amount * 10 ** asset.decimals);
    }

    yVaultCheckContract.methods
      .withdraw(amountSend)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (txnHash) {
        console.log(txnHash);
        callback(null, txnHash, null);
      })
      .on("receipt", function (receipt) {
        console.log("Reciept", receipt);
        callback(null, null, receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error, null, null);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error, null, null);
        }
      });
  };

  _callWithdrawVault = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );

    var amountSend = web3.utils.toWei(amount, "ether");
    if (asset.decimals !== 18) {
      amountSend = Math.round(amount * 10 ** asset.decimals);
    }

    let functionCall = vaultContract.methods.withdrawVault(amountSend);
    if (asset.erc20address === "Ethereum") {
      functionCall = vaultContract.methods.withdrawETH(amountSend);
    }

    functionCall
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (txnHash) {
        console.log(txnHash);
        callback(null, txnHash, null);
      })
      .on("receipt", function (receipt) {
        console.log("Reciept", receipt);
        callback(null, null, receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error, null, null);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error, null, null);
        }
      });
  };

  withdrawAllVault = (payload) => {
    const account = store.getStore("account");
    const { asset, tokenIndex } = payload.content;

    if (asset.yVaultCheckAddress) {
      this._checkApprovalForProxy(
        asset,
        account,
        asset.vaultBalance,
        asset.yVaultCheckAddress,
        (err) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }

          this._callWithdrawAllVaultProxy(
            asset,
            account,
            (err, txnHash, withdrawalResult) => {
              if (err) {
                return emitter.emit(ERROR, err);
              }
              if (txnHash) {
                return emitter.emit(WITHDRAW_VAULT_RETURNED, txnHash);
              }
              if (withdrawalResult) {
                return emitter.emit(
                  WITHDRAW_VAULT_RETURNED_COMPLETED,
                  withdrawalResult.transactionHash
                );
              }
            }
          );
        }
      );
    } else {
      if (this.isUsdVault(asset)) {
        this._callWithdrawAllVaultCitadel(
          asset,
          account,
          tokenIndex,
          (err, withdrawResult) => {
            if (err) {
              return emitter.emit(ERROR, err);
            }
            return emitter.emit(WITHDRAW_BOTH_VAULT_RETURNED, withdrawResult);
          }
        );
      } else {
        this._callWithdrawAllVault(asset, account, (err, withdrawResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          return emitter.emit(WITHDRAW_BOTH_VAULT_RETURNED, withdrawResult);
        });
      }
    }
  };

  _callWithdrawAllVaultProxy = async (asset, account, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let vaultContract = new web3.eth.Contract(
      config.yVaultCheckABI,
      asset.yVaultCheckAddress
    );

    vaultContract.methods
      .withdrawAll()
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (txnHash) {
        console.log(txnHash);
        callback(null, txnHash, null);
      })
      .on("receipt", function (receipt) {
        console.log("Reciept", receipt);
        callback(null, null, receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error, null, null);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error, null, null);
        }
      });
  };

  _callWithdrawAllVault = async (asset, account, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );

    let functionCall = vaultContract.methods.withdrawAll();
    if (asset.erc20address === "Ethereum") {
      functionCall = vaultContract.methods.withdrawAllETH();
    }

    functionCall
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (txnHash) {
        console.log(txnHash);
        callback(null, txnHash, null);
      })
      .on("receipt", function (receipt) {
        console.log("Reciept", receipt);
        callback(null, null, receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error, null, null);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error, null, null);
        }
      });
  };

  _callWithdrawAllVaultCitadel = async (
    asset,
    account,
    tokenIndex,
    callback
  ) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );

    let maxBalance = await vaultContract.balanceOf(account.address);

    let functionCall = vaultContract.methods
      .withdraw(maxBalance, tokenIndex)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (txnHash) {
        console.log(txnHash);
        callback(null, txnHash, null);
      })
      .on("receipt", function (receipt) {
        console.log("Reciept", receipt);
        callback(null, null, receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error, null, null);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error, null, null);
        }
      });
  };

  _getVaultAPY = async (web3, asset, account, callback) => {
    try {
      if (asset.vaultContractAddress === null) {
        return callback(null, {
          earnPricePerFullShare: 0,
          vaultPricePerFullShare: 0,
          compoundExchangeRate: 0,
          apy: 0,
        });
      }

      if (asset.strategyType === "yearn") {
        const block = await web3.eth.getBlockNumber();
        const contract = new web3.eth.Contract(
          asset.vaultContractABI,
          asset.vaultContractAddress
        );
        const strategyAddress = await contract.methods
          .strategy()
          .call({ from: account.address });
        const strategyContract = new web3.eth.Contract(
          asset.strategyContractABI,
          strategyAddress
        );
        const earnAddress = await strategyContract.methods
          .earn()
          .call({ from: account.address });
        const vaultAddress = await strategyContract.methods
          .vault()
          .call({ from: account.address });
        const earnContract = new web3.eth.Contract(
          config.IEarnErc20ABIv2,
          earnAddress
        );
        const vaultContract = new web3.eth.Contract(
          asset.vaultABI,
          vaultAddress
        );

        // Calculate price per full share
        const earnPricePerFullShare = await earnContract.methods
          .getPricePerFullShare()
          .call({ from: account.address });
        const vaultPricePerFullShare = await vaultContract.methods
          .getPricePerFullShare()
          .call({ from: account.address });
        let balance = vaultPricePerFullShare - asset.measurement;
        balance = balance / 1e18;
        let diff = block - asset.lastMeasurement;

        balance = balance / diff;
        balance = balance * 242584600;

        const returnObj = {
          earnPricePerFullShare: parseFloat(earnPricePerFullShare) / 10 ** 18,
          vaultPricePerFullShare: parseFloat(vaultPricePerFullShare) / 10 ** 18,
          compoundExchangeRate: 0,
          apy: parseFloat(balance),
        };

        return callback(null, returnObj);
      } else if (asset.strategyType === "compound") {
        const cTokenDecimals = 8; // all cTokens have 8 decimal places
        const compoundContract = new web3.eth.Contract(
          asset.cAbi,
          asset.cTokenAddress
        );

        // Exchange Rate
        const exchangeRateCurrent = await compoundContract.methods
          .exchangeRateCurrent()
          .call();
        const mantissa = 18 + asset.decimals - cTokenDecimals;

        // APY Calculation
        const ethMantissa = 1e18;
        const blocksPerDay = 6570; // 13.15 seconds per block
        const daysPerYear = 365;
        const supplyRatePerBlock = parseFloat(
          await compoundContract.methods.supplyRatePerBlock().call()
        );
        const supplyApy =
          (Math.pow(
            (supplyRatePerBlock / ethMantissa) * blocksPerDay + 1,
            daysPerYear
          ) -
            1) *
          100;

        const returnObj = {
          earnPricePerFullShare: 0,
          vaultPricePerFullShare: 0,
          compoundExchangeRate:
            parseFloat(exchangeRateCurrent) / Math.pow(10, mantissa),
          apy: parseFloat(supplyApy),
        };
        return callback(null, returnObj);
      } else if (asset.strategyType === "citadel") {
        const citadelContract = new web3.eth.Contract(
          asset.vaultContractABI,
          asset.vaultContractAddress
        );

        // USDT to ETH price feed contract
        const usdtEthPriceFeedContract = new web3.eth.Contract(
          config.eacAggregatoorProxyContract,
          config.USDTETHPriceFeedContract
        );
        // USDT / ETH conversion result
        const ethPrice = await usdtEthPriceFeedContract.methods
          .latestAnswer()
          .call();
        const pool = await citadelContract.methods
          .getAllPoolInETH(ethPrice)
          .call();

        const totalSupply = await citadelContract.methods.totalSupply().call();

        const pricePerFullShare = pool / totalSupply;

        const returnObj = {
          earnPricePerFullShare: 0,
          vaultPricePerFullShare: 0,
          compoundExchangeRate: 0,
          citadelPricePerFullShare: pricePerFullShare,
          elonPricePerFullShare: 0,
          cubanPricePerFullShare: 0,
        };
        return callback(null, returnObj);
      } else if (asset.strategyType === "elon") {
        const elonContract = new web3.eth.Contract(
          asset.vaultContractABI,
          asset.vaultContractAddress
        );

        const pool = await elonContract.methods.getAllPoolInUSD().call(); // All pool in USD (6 decimals)
        const totalSupply = await elonContract.methods.totalSupply().call();
        const pricePerFullShare = totalSupply
          ? new BigNumber(pool).shiftedBy(12).dividedBy(totalSupply).toNumber()
          : 0;

        const returnObj = {
          earnPricePerFullShare: 0,
          vaultPricePerFullShare: 0,
          compoundExchangeRate: 0,
          citadelPricePerFullShare: 0,
          elonPricePerFullShare: pricePerFullShare,
          cubanPricePerFullShare: 0,
        };
        return callback(null, returnObj);
      } else if (asset.strategyType === "cuban") {
        const cubanContract = new web3.eth.Contract(
          asset.vaultContractABI,
          asset.vaultContractAddress
        );

        const pool = await cubanContract.methods.getAllPoolInUSD().call(); // All pool in USD (6 decimals)
        const totalSupply = await cubanContract.methods.totalSupply().call();
        const pricePerFullShare = totalSupply
          ? new BigNumber(pool).shiftedBy(12).dividedBy(totalSupply).toNumber()
          : 0;

        const returnObj = {
          earnPricePerFullShare: 0,
          vaultPricePerFullShare: 0,
          compoundExchangeRate: 0,
          citadelPricePerFullShare: 0,
          elonPricePerFullShare: 0,
          cubanPricePerFullShare: pricePerFullShare,
        };
        return callback(null, returnObj);
      } else if (asset.strategyType === "daoFaang") {
        const daoFaangContract = new web3.eth.Contract(
          asset.vaultContractABI,
          asset.vaultContractAddress
        );

        const pool = await daoFaangContract.methods
          .getTotalValueInPool()
          .call();

        const totalSupply = await daoFaangContract.methods.totalSupply().call();

        const pricePerFullShare = pool / totalSupply;

        const returnObj = {
          earnPricePerFullShare: 0,
          vaultPricePerFullShare: 0,
          compoundExchangeRate: 0,
          faangPricePerFullShare: pricePerFullShare,
        };
        return callback(null, returnObj);
      } else if (asset.strategyType === "harvest") {
        const harvestContract = new web3.eth.Contract(
          asset.vaultContractABI,
          asset.vaultContractAddress
        );

        const pool = await harvestContract.methods
          .getTotalValueInPool()
          .call();

        const totalSupply = await harvestContract.methods.totalSupply().call();

        const pricePerFullShare = pool / totalSupply;

        const returnObj = {
          earnPricePerFullShare: 0,
          vaultPricePerFullShare: 0,
          compoundExchangeRate: 0,
          harvestPricePerFullShare: pricePerFullShare,
        };
        return callback(null, returnObj);
      }
    } catch (e) {
      console.log(e);
      callback(null, {
        earnPricePerFullShare: 0,
        vaultPricePerFullShare: 0,
        compoundExchangeRate: 0,
        apy: 0,
      });
    } 
  };

  getUSDPrices = async () => {
    try {
      const priceJSON = await this._getUSDPrices();
      store.setStore({ usdPrices: priceJSON });
      return emitter.emit(USD_PRICE_RETURNED, priceJSON);
    } catch (e) {
      console.log(e);
    }
  };

  _getUSDPrices = async () => {
    try {
      const url =
        "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin,dai,true-usd,tether,compound-usdt,compound-usd-coin,cdai,ethereum,harvest-finance&vs_currencies=usd,eth";
      const priceString = await rp(url);
      const priceJSON = JSON.parse(priceString);

      return priceJSON;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  getDashboardSnapshot = async (payload) => {
    const { interval } = payload.content;
    emitter.on(VAULT_BALANCES_FULL_RETURNED, this._calculateDashboard);
    // emitter.on(BALANCES_LIGHT_RETURNED, this._calculateDashboard)
    emitter.on(USD_PRICE_RETURNED, this._calculateDashboard);
    emitter.on(STATISTICS_RETURNED, this._calculateDashboard);

    await this.getVaultBalancesFull(interval);
    // this.getBalancesLight()
    await this.getUSDPrices();
    await this.getStatistics();
    return emitter.emit(GET_DASHBOARD_SNAPSHOT);
  };

  _calculateDashboard = () => {
    const vaults = store.getStore("vaultAssets");
    const prices = store.getStore("usdPrices");
    const statistics = store.getStore("statistics");

    if (
      vaults &&
      vaults.length > 0 &&
      prices !== null &&
      statistics &&
      statistics.length > 0
    ) {
      let basedOn = localStorage.getItem("yearn.finance-dashboard-basedon");

      if (!basedOn) {
        basedOn = "3";
      }
      // FILTER USED VAULTS AND CALCULATE VAULT ASSET BALANCES
      const farmersInUse = vaults
        .filter((farmer) => {
          if (farmer.id === "ETH") {
            return false;
          } else if (farmer.strategyType === "compound") {
            return farmer.strategyBalance > 0.0001;
          }
          return farmer.earnBalance + farmer.vaultBalance > 0.0001;
        })
        .map((farmer) => {
          let apy = 0;

          const vaultStats = statistics.filter((stats) => {
            if (farmer.strategyType === "yearn") {
              return (
                stats.tokenAddress.toLowerCase() ===
                farmer.erc20address.toLowerCase()
              );
            } else if (farmer.strategyType === "compound") {
              return (
                stats.address.toLowerCase() ===
                farmer.vaultContractAddress.toLowerCase()
              );
            }
            return false;
          });

          if (vaultStats.length === 0) {
            apy = farmer.apy;
          } else {
            if (farmer.strategyType === "yearn") {
              switch (basedOn) {
                case "1":
                  apy = (vaultStats[0].apyOneWeekSample + farmer.earnApr) / 2;
                  break;
                case "2":
                  apy = (vaultStats[0].apyOneMonthSample + farmer.earnApr) / 2;
                  break;
                case "3":
                  apy = (vaultStats[0].apyInceptionSample + farmer.earnApr) / 2;
                  break;
                default:
                  apy = farmer.apy;
              }
            } else if (farmer.strategyType === "compound") {
              apy = vaultStats[0].compoundApy;
            }
          }

          const price = prices[farmer.price_id];
          farmer.prices = price;
          if (farmer.strategyType === "yearn") {
            farmer.tokenBalance =
              farmer.vaultBalance * farmer.vaultPricePerFullShare +
              farmer.earnBalance * farmer.earnPricePerFullShare;
          } else if (farmer.strategyType === "compound") {
            farmer.tokenBalance =
              farmer.strategyBalance * farmer.compoundExchangeRate;
          }

          farmer.usdBalance = farmer.tokenBalance * farmer.prices.usd;
          farmer.vaultGrowth_daily_usd =
            farmer.tokenBalance * (apy / 36500) * farmer.prices.usd;
          farmer.vaultGrowth_weekly_usd =
            farmer.tokenBalance * (apy / 5200) * farmer.prices.usd;
          farmer.vaultGrowth_yearly_usd =
            ((farmer.tokenBalance * apy) / 100) * farmer.prices.usd;

          farmer.ethBalance = farmer.tokenBalance * farmer.prices.eth;
          farmer.vaultGrowth_daily_eth =
            farmer.tokenBalance * (apy / 36500) * farmer.prices.eth;
          farmer.vaultGrowth_weekly_eth =
            farmer.tokenBalance * (apy / 5200) * farmer.prices.eth;
          farmer.vaultGrowth_yearly_eth =
            ((farmer.tokenBalance * apy) / 100) * farmer.prices.eth;

          if (farmer.historicalPrice) {
            farmer.portfolioBalance = [];
            const sortByTimestamp = (a, b) => {
              if (a.timestamp > b.timestamp) return 1;
              if (a.timestamp < b.timestamp) return -1;
              return 0;
            };

            if (farmer.strategyType === "yearn") {
              farmer.historicalPrice.sort(sortByTimestamp).forEach((price) => {
                farmer.portfolioBalance.push([
                  price.timestamp,
                  (parseFloat(price.earnPrice) / 10 ** 18) *
                    farmer.earnBalance +
                    (parseFloat(price.vaultPrice) / 10 ** 18) *
                      farmer.vaultBalance,
                ]);
              });
            } else if (farmer.strategyType === "compound") {
              farmer.historicalPrice.sort(sortByTimestamp).forEach((price) => {
                farmer.portfolioBalance.push([
                  price.timestamp,
                  (parseFloat(price.compoundExchangeRate) / 10 ** 18) *
                    farmer.strategyBalance,
                ]);
              });
            }
          }

          return farmer;
        });

      // CALCULATE VAULT BALANCES AND DAILY GROWTH
      const vaultBalances = farmersInUse.reduce(
        (accumulator, vault) => {
          accumulator.vaultBalance_usd =
            accumulator.vaultBalance_usd + vault.usdBalance;
          accumulator.vaultGrowth_daily_usd =
            accumulator.vaultGrowth_daily_usd + vault.vaultGrowth_daily_usd;
          accumulator.vaultGrowth_weekly_usd =
            accumulator.vaultGrowth_weekly_usd + vault.vaultGrowth_weekly_usd;
          accumulator.vaultGrowth_yearly_usd =
            accumulator.vaultGrowth_yearly_usd + vault.vaultGrowth_yearly_usd;

          accumulator.vaultBalance_eth =
            accumulator.vaultBalance_eth + vault.ethBalance;
          accumulator.vaultGrowth_daily_eth =
            accumulator.vaultGrowth_daily_eth + vault.vaultGrowth_daily_eth;
          accumulator.vaultGrowth_weekly_eth =
            accumulator.vaultGrowth_weekly_eth + vault.vaultGrowth_weekly_eth;
          accumulator.vaultGrowth_yearly_eth =
            accumulator.vaultGrowth_yearly_eth + vault.vaultGrowth_yearly_eth;
          if (
            !accumulator.totalPortfolioBalance ||
            accumulator.totalPortfolioBalance.length === 0
          ) {
            accumulator.totalPortfolioBalance = vault.portfolioBalance;
          } else {
            vault.portfolioBalance.forEach((balance) => {
              accumulator.totalPortfolioBalance.forEach((totalBalance) => {
                if (balance[0] === totalBalance[0]) {
                  totalBalance[1] += balance[1];
                }
              });
            });
          }
          return accumulator;
        },
        {
          vaultBalance_usd: 0,
          vaultGrowth_daily_usd: 0,
          vaultGrowth_weekly_usd: 0,
          vaultGrowth_yearly_usd: 0,
          vaultBalance_eth: 0,
          vaultGrowth_daily_eth: 0,
          vaultGrowth_weekly_eth: 0,
          vaultGrowth_yearly_eth: 0,
        }
      );

      // CALCULATE VAULT GROWth PERCENTAGES
      const vaultGrowthDailyPerc_usd =
        (vaultBalances.vaultGrowth_daily_usd * 100) /
        vaultBalances.vaultBalance_usd;
      const vaultGrowthWeeklyPerc_usd =
        (vaultBalances.vaultGrowth_weekly_usd * 100) /
        vaultBalances.vaultBalance_usd;
      const vaultGrowthYearlyPerc_usd =
        (vaultBalances.vaultGrowth_yearly_usd * 100) /
        vaultBalances.vaultBalance_usd;

      const vaultGrowthDailyPerc_eth =
        (vaultBalances.vaultGrowth_daily_eth * 100) /
        vaultBalances.vaultBalance_eth;
      const vaultGrowthWeeklyPerc_eth =
        (vaultBalances.vaultGrowth_weekly_eth * 100) /
        vaultBalances.vaultBalance_eth;
      const vaultGrowthYearlyPerc_eth =
        (vaultBalances.vaultGrowth_yearly_eth * 100) /
        vaultBalances.vaultBalance_eth;

      // CALCULATE PORTFOLIO (earn + vault) BALANCES
      const portfolioBalance_usd = vaultBalances.vaultBalance_usd;
      const portfolioGrowthDaily_usd = vaultBalances.vaultGrowth_daily_usd;
      const portfolioGrowthWeekly_usd = vaultBalances.vaultGrowth_weekly_usd;
      const portfolioGrowthYearly_usd = vaultBalances.vaultGrowth_yearly_usd;
      const portfolioGrowthDailyPerc_usd =
        (vaultBalances.vaultGrowth_daily_usd * 100) /
        vaultBalances.vaultBalance_usd;
      const portfolioGrowthWeeklyPerc_usd =
        (vaultBalances.vaultGrowth_weekly_usd * 100) /
        vaultBalances.vaultBalance_usd;
      const portfolioGrowthYearlyPerc_usd =
        (vaultBalances.vaultGrowth_yearly_usd * 100) /
        vaultBalances.vaultBalance_usd;

      const portfolioBalance_eth = vaultBalances.vaultBalance_eth;
      const portfolioGrowthDaily_eth = vaultBalances.vaultGrowth_daily_eth;
      const portfolioGrowthWeekly_eth = vaultBalances.vaultGrowth_weekly_eth;
      const portfolioGrowthYearly_eth = vaultBalances.vaultGrowth_yearly_eth;
      const portfolioGrowthDailyPerc_eth =
        (vaultBalances.vaultGrowth_daily_eth * 100) /
        vaultBalances.vaultBalance_eth;
      const portfolioGrowthWeeklyPerc_eth =
        (vaultBalances.vaultGrowth_weekly_eth * 100) /
        vaultBalances.vaultBalance_eth;
      const portfolioGrowthYearlyPerc_eth =
        (vaultBalances.vaultGrowth_yearly_eth * 100) /
        vaultBalances.vaultBalance_eth;

      let dashboard = {
        vault_balance_usd: vaultBalances.vaultBalance_usd,
        vault_growth_usd_daily: vaultBalances.vaultGrowth_daily_usd,
        vault_growth_usd_weekly: vaultBalances.vaultGrowth_weekly_usd,
        vault_growth_usd_yearly: vaultBalances.vaultGrowth_yearly_usd,
        vault_growth_usd_daily_perc: vaultGrowthDailyPerc_usd,
        vault_growth_usd_weekly_perc: vaultGrowthWeeklyPerc_usd,
        vault_growth_usd_yearly_perc: vaultGrowthYearlyPerc_usd,

        vault_balance_eth: vaultBalances.vaultBalance_eth,
        vault_growth_eth_daily: vaultBalances.vaultGrowth_daily_eth,
        vault_growth_eth_weekly: vaultBalances.vaultGrowth_weekly_eth,
        vault_growth_eth_yearly: vaultBalances.vaultGrowth_yearly_eth,
        vault_growth_eth_daily_perc: vaultGrowthDailyPerc_eth,
        vault_growth_eth_weekly_perc: vaultGrowthWeeklyPerc_eth,
        vault_growth_eth_yearly_perc: vaultGrowthYearlyPerc_eth,

        portfolio_balance_usd: portfolioBalance_usd,
        portfolio_growth_usd_daily: portfolioGrowthDaily_usd,
        portfolio_growth_usd_weekly: portfolioGrowthWeekly_usd,
        portfolio_growth_usd_yearly: portfolioGrowthYearly_usd,
        portfolio_growth_usd_daily_perc: portfolioGrowthDailyPerc_usd,
        portfolio_growth_usd_weekly_perc: portfolioGrowthWeeklyPerc_usd,
        portfolio_growth_usd_yearly_perc: portfolioGrowthYearlyPerc_usd,

        portfolio_balance_eth: portfolioBalance_eth,
        portfolio_growth_eth_daily: portfolioGrowthDaily_eth,
        portfolio_growth_eth_weekly: portfolioGrowthWeekly_eth,
        portfolio_growth_eth_yearly: portfolioGrowthYearly_eth,
        portfolio_growth_eth_daily_perc: portfolioGrowthDailyPerc_eth,
        portfolio_growth_eth_weekly_perc: portfolioGrowthWeeklyPerc_eth,
        portfolio_growth_eth_yearly_perc: portfolioGrowthYearlyPerc_eth,

        vaults: farmersInUse,
        statistics: statistics,
        totalPerformance: vaultBalances.totalPortfolioBalance,
      };

      store.setStore({ dashboard: dashboard });
      emitter.emit(DASHBOARD_SNAPSHOT_RETURNED, dashboard);
    }
  };

  getStatistics = async () => {
    try {
      const statistics = await this._getStatistics();

      store.setStore({ statistics: statistics });
      emitter.emit(STATISTICS_RETURNED, statistics);
    } catch (e) {
      console.log(e);
      return store.getStore("universalGasPrice");
    }
  };

  _getStatistics = async () => {
    try {
      const url = config.statsProvider + "vaults/apy";
      const statisticsString = await rp(url);
      const statistics = JSON.parse(statisticsString);
      return statistics.body;
    } catch (e) {
      console.log(e);
      return store.getStore("universalGasPrice");
    }
  };

  _getHistoricalPrice = async (price_id, interval, callback) => {
    try {
      const url = `${config.statsProvider}vaults/price/${price_id}/${interval}`;
      const resultString = await rp(url);
      const result = JSON.parse(resultString);
      callback(null, result.body);
    } catch (e) {
      console.log(e);
      callback(null, []);
    }
  };

  _getTvl = async (tvl_id, callback) => {
    try {
      const url = `${config.statsProvider}vaults/tvl/${tvl_id}`;
      const resultString = await rp(url);
      const result = JSON.parse(resultString);

      callback(null, result.body);
    } catch (e) {
      console.log(e);
      callback(null, []);
    }
  };

  _getHistoricalAPY = async (web3, asset, account, interval, callback) => {
    try {
      let vaultAddress = "";
      if (asset.strategyType === "yearn") {
        let vaultContract = new web3.eth.Contract(
          asset.vaultContractABI,
          asset.vaultContractAddress
        );
        let strategyAddress = await vaultContract.methods
          .strategy()
          .call({ from: account.address });
        let strategyContract = new web3.eth.Contract(
          asset.strategyContractABI,
          strategyAddress
        );
        vaultAddress = await strategyContract.methods
          .vault()
          .call({ from: account.address });
      } else if (asset.strategyType === "compound") {
        vaultAddress = asset.vaultContractAddress;
      } else if (asset.strategyType === "citadel") {
        vaultAddress = asset.vaultContractAddress;
      } else if (asset.strategyType === "elon") {
        vaultAddress = asset.vaultContractAddress;
      } else if (asset.strategyType === "cuban") {
        vaultAddress = asset.vaultContractAddress;
      } else if (asset.strategyType === "daoFaang") {
        vaultAddress = asset.vaultContractAddress;

      } else if (asset.strategyType === "harvest") {
        vaultAddress = asset.vaultContractAddress;

      }  


      const url = `${config.statsProvider}vaults/historical-apy/${vaultAddress}/${interval}`;
      const resultString = await rp(url);
      const result = JSON.parse(resultString);
      callback(null, result.body);
    } catch (e) {
      console.log(e);
      callback(null, []);
    }
  };

  _eventVerifyAmount = async (amount) => {
    const url = `${config.statsProvider}event/verify/${amount}`;
    const resultString = await rp(url);
    const result = JSON.parse(resultString);
    if (result.body.happyHour === true) {
      if (result.body.amountAboveThreshold === true) {
        store.setStore({ happyHour: true }); // Might be redundant
        emitter.emit(HAPPY_HOUR_VERIFY, result);
        return true;
      } else {
        emitter.emit(HAPPY_HOUR_VERIFY, result);
        return false;
      }
    } else {
      emitter.emit(HAPPY_HOUR_VERIFY, result);
      return false;
    }
  };

  eventVerify = async (payload) => {
    const url = `${config.statsProvider}event/verify/`;
    const resultString = await rp(url);
    const result = JSON.parse(resultString);
    console.log("🚀 | eventVerify= | result", result);
    let _result = {};
    if (result.body.happyHour === true) {
      _result = {
        happyHour: result.body.happyHour,
        happyHourStartTime: result.body.startTime,
        happyHourEndTime: result.body.endTime,
        happyHourThreshold: result.body.threshold,
      };
    } else {
      _result = { happyHour: result.body.happyHour };
    }
    // For testing
    // _result = {
    //   happyHour: true,
    //   happyHourStartTime: Date.now(),
    //   happyHourEndTime: Date.now() + 6000000,
    //   happyHourThreshold: 5,
    // };
    store.setStore(_result);
    emitter.emit(HAPPY_HOUR_RETURN, _result);
  };

  _getAddressStatistics = async (address) => {
    try {
      const url =
        config.statsProvider + "user/" + address + "/vaults/statistics";
      const statisticsString = await rp(url);
      const statistics = JSON.parse(statisticsString);

      return statistics.body;
    } catch (e) {
      console.log(e);
      return store.getStore("universalGasPrice");
    }
  };

  _getAddressTxHistory = async (address) => {
    try {
      const url =
        config.statsProvider + "user/" + address + "/vaults/transactions";
      const statisticsString = await rp(url);
      const statistics = JSON.parse(statisticsString);

      return statistics.body;
    } catch (e) {
      console.log(e);
      return store.getStore("universalGasPrice");
    }
  };
  //获取策略总额
  _getTotalValue(totalValue, vaultApiInfo, callback) {
    // callback();
  }

  _getTotalValueStatistic = async () => {
    try {
      const url = config.statsProvider + "vaults/tvl/total";
      const statisticsString = await rp(url);
      const statistics = JSON.parse(statisticsString);
      return statistics.body;
    } catch (e) {
      console.log(e);
      // return store.getStore('universalGasPrice')
    }
  };

  getVaultInfo = async () => {
    const vaultApiInfo = store.getStore("vaultApiInfo");
    // const web3 = await this._getWeb3Provider()
    // if(!web3) {
    //   console.log('我在这跳出了2')
    //   return null
    // }
    const totalValue = await this._getTotalValueStatistic();
    // async.map(vaultApiInfo, (vaultApiInfo, callback) => {
    //   async.parallel([
    //     (callbackInner) => { this._getTotalValue(totalValue, vaultApiInfo, callbackInner) },
    //   ], (err, data) => {
    //     if(err) {
    //       return callback(err)
    //     }
    //     vaultApiInfo.totalValue = '11'
    //     callback(null, vaultApiInfo)
    //   })
    // }, (err, vaultApiInfo) => {
    //   if(err) {
    //     console.log(err)
    //     return emitter.emit(ERROR, err)
    //   }
    const val = totalValue[0].tvl;
    store.setStore({ totalValue: val });
    return emitter.emit(GET_VAULT_INFO, val);
    // })
  };

  saveBiconomyProvider = async (payload) => {
    const { happyHourWeb3, erc20PaymentWeb3 } = payload.content;
    const network = store.getStore("network");
    const assets = this._getDefaultValues(network).vaultAssets;

    const citadelAsset = assets.filter((el) => el.id === "daoCDV");
    const FAANGAsset = assets.filter((el) => el.id === "daoSTO");

    if (happyHourWeb3) {
      // Initialize Contract
      const happyHourContract = new happyHourWeb3.eth.Contract(
        citadelAsset[0].vaultContractABI,
        citadelAsset[0].vaultContractAddress
      );
      console.log(
        "🚀 | saveBiconomyProvider= | happyHourContract",
        happyHourContract
      );

      const happyHourContractFAANG = new happyHourWeb3.eth.Contract(
        FAANGAsset[0].vaultContractABI,
        FAANGAsset[0].vaultContractAddress
      );
      console.log(
        "🚀 | saveBiconomyProvider= | happyHourContractFAANG",
        happyHourContractFAANG
      );

      store.setStore({
        happyHourContract: happyHourContract,
        happyHourContractFAANG: happyHourContractFAANG,
      });
    }

    if (erc20PaymentWeb3) {
      const erc20PaymentsContract = new erc20PaymentWeb3.eth.Contract(
        citadelABI,
        citadelAsset[0].vaultContractAddress
      );
      store.setStore({ erc20PaymentsContract: erc20PaymentsContract });
    }
  };

  _getGasPrice = async () => {
    try {
      const url = "https://gasprice.poa.network/";
      const priceString = await rp(url);
      const priceJSON = JSON.parse(priceString);
      if (priceJSON) {
        return priceJSON.fast.toFixed(0);
      }
      return store.getStore("universalGasPrice");
    } catch (e) {
      console.log(e);
      return store.getStore("universalGasPrice");
    }
  };

  _getWeb3Provider = async () => {
    const web3context = store.getStore("web3context");

    if (!web3context) {
      return null;
    }
    const provider = web3context.library.provider;
    if (!provider) {
      return null;
    }

    const web3 = new Web3(provider);

    // const web3 = createAlchemyWeb3(config.infuraProvider, { writeProvider: provider });

    return web3;
  };

  toggleDrawer = (payload) => {
    const { open } = payload.content;
    this.setStore({ openDrawer: open });
    return emitter.emit(DRAWER_RETURNED);
  };

  withdrawBothAll = (payload) => {
    let { asset, tokenIndex } = payload.content;
    this.withdrawBoth({
      content: {
        earnAmount: asset.earnBalance.toString(),
        vaultAmount: asset.vaultBalance.toString(),
        amount: asset.strategyBalance.toString(),
        tokenIndex: tokenIndex,
        asset,
      },
    });
  };

  _isSufficientLiquidityCitadel = async (
    asset,
    citadelContract,
    withdrawAmount,
    tokenIndex
  ) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let erc20Contract = new web3.eth.Contract(
      config.erc20ABI,
      asset.erc20addresses[tokenIndex]
    );

    let balance = parseFloat(
      await erc20Contract.methods.balanceOf(asset.vaultContractAddress).call()
    );

    const decimals = parseInt(await erc20Contract.methods.decimals().call());
    const pool = await citadelContract.methods.getAllPoolInUSD().call();
    const totalSupply = await citadelContract.methods.totalSupply().call();

    const withdrawAmountUSD =
      ((withdrawAmount * pool) / totalSupply) * 10 ** (decimals - 6);
    const withdawAmountInToken =
      withdrawAmountUSD / asset.priceInUSD[tokenIndex];

    if (withdawAmountInToken > balance) {
      alert(
        "Due to insufficient liquidity of the selected token in the Vault for withdrawal, gas fees may be very high. To reduce gas fee, please select a different currency or try a smaller amount. \n\n Are you sure you wish to proceed with the withdrawal using the selected currency?"
      );
    }
  };

  _isSufficientLiquidityUsd = async (
    asset,
    vaultContract,
    withdrawAmount,
    tokenIndex
  ) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let erc20Contract = new web3.eth.Contract(
      config.erc20ABI,
      asset.erc20addresses[tokenIndex]
    );

    let balance = parseFloat(
      await erc20Contract.methods.balanceOf(asset.vaultContractAddress).call()
    );

    let pool = 0;
    if (asset.strategyType === "daoFaang") {
      const network = store.getStore("network");
      const usdtUsdPriceFeedContract = new web3.eth.Contract(
        config.eacAggregatoorProxyContract,
        network === 1
          ? config.USDTUSDPriceFeedMainnetContract
          : config.USDTUSDPriceFeedKovanContract
      );

      // USDT / USD conversion result
      const usdtToUsdPrice = await usdtUsdPriceFeedContract.methods
        .latestAnswer()
        .call();

      const totalValueInPool = await vaultContract.methods
        .getTotalValueInPool()
        .call();
      pool = (totalValueInPool * usdtToUsdPrice) / 10 ** 20;
    } else {
      pool = await vaultContract.methods.getAllPoolInUSD().call();
    }

    const decimals = parseInt(await erc20Contract.methods.decimals().call());
    const totalSupply = await vaultContract.methods.totalSupply().call();

    const withdrawAmountUSD =
      ((withdrawAmount * pool) / totalSupply) * 10 ** (decimals - 6);
    const withdawAmountInToken =
      withdrawAmountUSD / asset.priceInUSD[tokenIndex];

    if (withdawAmountInToken > balance) {
      alert(
        "Due to insufficient liquidity of the desired token in vault for withdrawal, gas fees may be very high. Are you sure to proceed?"
      );
    }
  };

  // TODO: REFACTOR: Currently all 3 types of vaults use this
  withdrawBoth = async (payload) => {
    const { earnAmount, vaultAmount, asset, amount, tokenIndex } =
      payload.content;
    const account = store.getStore("account");
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );

    if (asset.strategyType === "yearn") {
      let earnAmountSend,  vaultAmountSend;

      if (asset.decimals !== 18) {
        earnAmountSend = web3.utils
          .toBN(Math.floor(earnAmount * 10 ** asset.decimals))
          .toString();
        vaultAmountSend = web3.utils
          .toBN(Math.floor(vaultAmount * 10 ** asset.decimals))
          .toString();
      } else {
        const earnAmt = fromExponential(parseFloat(earnAmount));
        const vaultAmt = fromExponential(parseFloat(vaultAmount));

        earnAmountSend = web3.utils.toWei(earnAmt, "ether");
        vaultAmountSend = web3.utils.toWei(vaultAmt, "ether");
      }

      const functionCall = vaultContract.methods.withdraw([
        earnAmountSend,
        vaultAmountSend,
      ]);

      functionCall
        .send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
        })
        .on("transactionHash", function (txnHash) {
          console.log(txnHash);
          return emitter.emit(WITHDRAW_VAULT_RETURNED, txnHash);
          // callback(null, txnHash, null);
        })
        .on("receipt", function (receipt) {
          console.log("Reciept", receipt);
          emitter.emit(
            WITHDRAW_VAULT_RETURNED_COMPLETED,
            receipt.transactionHash
          );
          // callback(null, null, receipt);
        })
        .on("error", function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              emitter.emit(ERROR, error);
              // return callback(error.message);
            }
            // callback(error, null, null);
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              // return callback(error.message);
              emitter.emit(ERROR, error);
            }
            // callback(error, null, null);
          }
        });
    } else if (asset.strategyType === "compound") {
      let amountSend;
      if (asset.decimals !== 18) {
        amountSend = web3.utils
          .toBN(Math.floor(amount * 10 ** asset.decimals))
          .toString();
      } else {
        const amt = fromExponential(parseFloat(amount));
        amountSend = web3.utils.toWei(amt, "ether");
      }

      const functionCall = vaultContract.methods.withdraw(amountSend);
      functionCall
        .send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
        })
        .on("transactionHash", function (txnHash) {
          console.log(txnHash);
          return emitter.emit(WITHDRAW_VAULT_RETURNED, txnHash);
          // callback(null, txnHash, null);
        })
        .on("receipt", function (receipt) {
          console.log("Reciept", receipt);
          emitter.emit(
            WITHDRAW_VAULT_RETURNED_COMPLETED,
            receipt.transactionHash
          );
          // callback(null, null, receipt);
        })
        .on("error", function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              emitter.emit(ERROR, error);
              // return callback(error.message);
            }
            // callback(error, null, null);
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              // return callback(error.message);
              emitter.emit(ERROR, error);
            }
            // callback(error, null, null);
          }
        });
    } else if (asset.strategyType === "citadel") {
      // We are withdrawing daoCDV and exchanging for Stablecoin
      let erc20Contract = new web3.eth.Contract(
        config.erc20ABI,
        asset.vaultContractAddress
      );

      const citadelContract = new web3.eth.Contract(
        asset.vaultContractABI,
        asset.vaultContractAddress
      );

      // Soft Check for sufficient liquidity
      // if (
      await this._isSufficientLiquidityCitadel(
        asset,
        citadelContract,
        amount,
        tokenIndex
      );
      // ) {
      await vaultContract.methods
        .withdraw(amount, tokenIndex)
        .send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
        })
        .on("transactionHash", function (txnHash) {
          console.log(txnHash);
          return emitter.emit(WITHDRAW_VAULT_RETURNED, txnHash);
          // callback(null, txnHash, null);
        })
        .on("receipt", function (receipt) {
          console.log("Reciept", receipt);
          emitter.emit(
            WITHDRAW_VAULT_RETURNED_COMPLETED,
            receipt.transactionHash
          );
          // callback(null, null, receipt);
        })
        .on("error", function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              emitter.emit(ERROR, error);
              // return callback(error.message);
            }
            // callback(error, null, null);
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              // return callback(error.message);
              emitter.emit(ERROR, error);
            }
            // callback(error, null, null);
          }
        });
      // } else {
      //   return emitter.emit(WITHDRAW_BOTH_VAULT_FAIL_RETURNED);
      // }
    } else if (this.isUsdVault(asset)) {
      const vaultContract = new web3.eth.Contract(
        asset.vaultContractABI,
        asset.vaultContractAddress
      );

      // Soft Check for sufficient liquidity
      // if (
      await this._isSufficientLiquidityUsd(
        asset,
        vaultContract,
        amount,
        tokenIndex
      );

      const token = (asset.strategyType === "daoFaang") ? asset.erc20addresses[tokenIndex] : tokenIndex;
      const amountToSend = fromExponential(parseFloat(amount));
      
      await vaultContract.methods
        .withdraw(amountToSend, token)
        .send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
        })
        .on("transactionHash", function (txnHash) {
          console.log(txnHash);
          return emitter.emit(WITHDRAW_VAULT_RETURNED, txnHash);
          // callback(null, txnHash, null);
        })
        .on("receipt", function (receipt) {
          console.log("Reciept", receipt);
          emitter.emit(
            WITHDRAW_VAULT_RETURNED_COMPLETED,
            receipt.transactionHash
          );
          // callback(null, null, receipt);
        })
        .on("error", function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              console.log("Error in withdrawBoth", error);
              emitter.emit(ERROR, error.message);
              // return callback(error.message);
            }
            // callback(error, null, null);
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              // return callback(error.message);
              console.log("Error in withdrawBoth", error);
              emitter.emit(ERROR, error.message);
            }
            // callback(error, null, null);
          }
        });
      // } else {
      //   return emitter.emit(WITHDRAW_BOTH_VAULT_FAIL_RETURNED);
      // }
    }
  };

  _getVaultDAOmineAPY = (asset, pools, callback) => {
    if (pools.length <= 0) {
      return callback(null, null);
    }
    const pool = pools.find(
      (pool) =>
        pool.contract_address.toLowerCase() ===
        asset.vaultContractAddress.toLowerCase()
    );
    if (pool === undefined) {
      return callback(null, null);
    } else {
      return callback(null, { daomineApy: pool.apr });
    }
  };

  getStrategyBalancesFull = async (payload) => {
    const network = store.getStore("network");
    const account = store.getStore("account");
    // const assets = store.getStore('vaultAssets')
    const assets = this._getDefaultValues(network).vaultAssets;

    const { interval } = payload.content;
    if (!account || !account.address) {
      return false;
    }
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }
    const vaultStatistics = await this._getStatistics();
    const addressStatistics = await this._getAddressStatistics(account.address);
    const daoMinePools = await this._findDAOminePool();
    const pools = daoMinePools.pools;

    const usdPrices = await this._getUSDPrices();
    await this.getUSDPrices();

    async.map(
      assets,
      (asset, callback) => {
        async.parallel(
          [
            (callbackInner) => {
              // 0
              this._getERC20Balance(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              // 1
              this._getBalances(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              // 2
              this._getStatsAPY(vaultStatistics, asset, callbackInner);
            },
            (callbackInner) => {
              // 3
              this._getAssetUSDPrices(
                web3,
                asset,
                account,
                usdPrices,
                callbackInner
              );
            },
            (callbackInner) => {
              // 4
              this._getVaultAPY(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              // 5
              this._getAddressStats(addressStatistics, asset, callbackInner);
            },
            (callbackInner) => {
              // 6
              this._getMaxAPR(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              // 7
              this._getHistoricalAPY(
                web3,
                asset,
                account,
                interval,
                callbackInner
              );
            },
            (callbackInner) => {
              // 8
              this._getTvl(asset.tvlKey, callbackInner);
            },
            (callbackInner) => {
              // 9
              this._getERC20Balances(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              // 10
              this._getVaultDAOmineAPY(asset, pools, callbackInner);
            },

            // (callbackInner) => { this._getVaultHoldings(web3, asset, account, callbackInner) },
            // (callbackInner) => { this._getAddressTransactions(addressTXHitory, asset, callbackInner) },
          ],
          (err, data) => {
            if (err) {
              return callback(err);
            }
            asset.balance = data[0];
            asset.strategyBalance = data[1].strategyBalance;
            asset.vaultBalance = data[1].vaultBalance;
            asset.earnBalance = data[1].earnBalance;
            asset.depositedSharesInUSD = data[1].depositedSharesInUSD
              ? data[1].depositedSharesInUSD
              : null;
            asset.stats = data[2];
            asset.usdPrice = data[3].usdPrice;

            // Price per full share
            asset.earnPricePerFullShare = data[4].earnPricePerFullShare;
            asset.vaultPricePerFullShare = data[4].vaultPricePerFullShare;
            asset.compoundExchangeRate = data[4].compoundExchangeRate;
            asset.citadelPricePerFullShare = data[4].citadelPricePerFullShare
              ? data[4].citadelPricePerFullShare
              : null;
            asset.faangPricePerFullShare = data[4].faangPricePerFullShare
              ? data[4].faangPricePerFullShare
              : null;
            asset.elonPricePerFullShare = data[4].elonPricePerFullShare
              ? data[4].elonPricePerFullShare
              : null;


            asset.harvestPricePerFullShare = data[4].harvestPricePerFullShare
              ? data[4].harvestPricePerFullShare: null;


            asset.harvestPricePerFullShare = data[4].harvestPricePerFullShare
              ? data[4].harvestPricePerFullShare: null;

            asset.cubanPricePerFullShare = data[4].cubanPricePerFullShare
              ? data[4].cubanPricePerFullShare

              : null;
            asset.apy = data[4].apy; // Vault APY
            asset.addressStatistics = data[5];
            asset.earnApr = data[6];
            asset.historicalAPY = data[7];
            asset.tvl = data[8][0].tvl;
            asset.balances =
              data[9] && data[9].balances ? data[9].balances : null;
            asset.priceInUSD =
              data[9] && data[9].priceInUSD ? data[9].priceInUSD : null;
            asset.sumBalances = data[9].sumBalances;
            asset.daomineApy = data[10] ? data[10].daomineApy : 0;
            // asset.addressTransactions = data[7]
            // asset.vaultHoldings = data[3]

            callback(null, asset);
          }
        );
      },
      (err, assets) => {
        if (err) {
          console.log(err);
          return emitter.emit(ERROR, err);
        }

        store.setStore({ vaultAssets: assets });
        return emitter.emit(STRATEGY_BALANCES_FULL_RETURNED, assets);
      }
    );
  };

  _getUserDepositForDAOmine = async (
    daoMineContract,
    dvgDecimal,
    account,
    poolIndex,
    callback
  ) => {
    try {
      let userDepositInfo = await daoMineContract.methods
        .user(poolIndex, account.address)
        .call({ from: account.address });

      let pool = await daoMineContract.methods
        .pool(poolIndex)
        .call({ from: account.address });

    //  let userPendingDVG = await daoMineContract.methods
    //     .pendingDVG(poolIndex, account.address)
    //     .call({ from: account.address });
        
      let userPendingDVG = 0;
      if (pool != null) {
        userPendingDVG = (Number(userDepositInfo.lpAmount) * Number(pool.accDVGPerLP) / 10 ** 18) - Number(userDepositInfo.finishedDVG);
      }

      const result = { userDepositInfo, userPendingDVG };
      callback(null, result);
    } catch (err) {
      console.log("Error _getUserDepositForDAOmine", err);
      callback(null, null);
    }
  };

  _getUserBalanceForLpToken = async (poolContract, account, callback) => {
    try {
      var balance = await poolContract.methods
        .balanceOf(account.address)
        .call({ from: account.address });

      callback(null, parseFloat(balance));
    } catch (err) {
      console.log("Error in _getUserBalanceForLpToken(), ", err);
      callback(null, null);
    }
  };

  _getContractDecimal = async (contract, callback) => {
    try {
      const decimals = await contract.methods.decimals().call();
      callback(null, parseInt(decimals));
    } catch (err) {
      console.log("Error in _getContractDecimal()", err);
      callback(null, null);
    }
  };

  findDAOminePool = async (payload) => {
    const account = store.getStore("account");

    try {
      const network = store.getStore("network");

      const web3 = await this._getWeb3Provider();

      if (!web3) {
        return null;
      }

      const poolsResponse = await this._findDAOminePool();
      const pools = poolsResponse.pools;

      let daoMineContract;
      let dvgContract;
      let dvgDecimal = 0;

      if (network === 42) {
        daoMineContract = new web3.eth.Contract(
          config.daoStakeContractABI,
          config.daoStakeTestContract
        );

        dvgContract = new web3.eth.Contract(
          config.dvgTokenContractABI,
          config.dvgTokenTestContract
        );

        dvgDecimal = await dvgContract.methods.decimals().call();
      } else if (network === 1) {
        daoMineContract = new web3.eth.Contract(
          config.daoStakeContractABI,
          config.daoStakeMainnetContract
        );

        dvgContract = new web3.eth.Contract(
          config.dvgTokenContractABI,
          config.dvgTokenMainnetContract
        );

        dvgDecimal = await dvgContract.methods.decimals().call();
      }

      async.map(
        pools,
        (pool, callback) => {
          const poolContract = new web3.eth.Contract(
            JSON.parse(pool.abi),
            pool.contract_address
          );

          async.parallel(
            [
              (callbackInner) => {
                this._getUserBalanceForLpToken(poolContract, account, callbackInner);
              },
              (callbackInner) => {
                this._getUserDepositForDAOmine(daoMineContract, dvgDecimal, account, pool.pid, callbackInner);
              }
            ],
            (err, data) => {
              if (err) {
                return callback(err);
              }

              const userInfo = {};

              userInfo.tokenBalance = data[0];
              userInfo.finishedDVG = data[1] ? data[1].userDepositInfo.finishedDVG : null;
              userInfo.depositedLPAmount = data[1] ? parseInt(data[1].userDepositInfo.lpAmount) : null;
              userInfo.pendingDVG = data[1] ? data[1].userPendingDVG : null;

              pool.userInfo = userInfo;

              callback(null, pool);
            }
          );
        },
        (err, pools) => {
          if (err) {
            console.log(err);
            return emitter.emit(ERROR, err);
          }
          store.setStore({ stakePools: pools });
          return emitter.emit(DAOMINE_POOL_RETURNED, pools);
        }
      )
    } catch (err) {
      console.log(err);
    }
  }

  _findDAOminePool = async () => {
    try {
      const url = config.statsProvider + "staking/get-pools";
      const poolsString = await rp(url);
      const pools = JSON.parse(poolsString);
      return pools.body;
    } catch (e) {
      console.log(e);
      return store.getStore("universalGasPrice");
    }
  }

  depositDAOmine = async (payload) => {
    const account = store.getStore("account");

    const { pool, amount } = payload.content;

    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }

    const lpTokenContract = new web3.eth.Contract(
      JSON.parse(pool.abi),
      pool.contract_address
    );

    const network = store.getStore("network");

    let daoMineContractAddress = "";
    if (network === 42) {
      daoMineContractAddress = config.daoStakeTestContract;
    } else if (network === 1) {
      daoMineContractAddress = config.daoStakeMainnetContract;
    }

    const daoMineContract = new web3.eth.Contract(
      config.daoStakeContractABI,
      daoMineContractAddress
    );

    const allowance = await lpTokenContract.methods
      .allowance(account.address, daoMineContractAddress)
      .call({ from: account.address });
    const actualAllowance = allowance / 10 ** pool.decimal;

    let approvalError;
    if (parseFloat(amount) > parseFloat(actualAllowance)) {
      await this._checkLpTokenContractApproval(
        account,
        lpTokenContract,
        daoMineContractAddress,
        amount,
        (err, txnHash, approvalResult) => {
          if (err) {
            console.log(err);
            approvalError = err;
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(APPROVE_TRANSACTING, txnHash);
          }
          if (approvalResult) {
            emitter.emit(APPROVE_COMPLETED, approvalResult.transactionHash);
          }
        }
      );
    }
    if (!approvalError) {
      await this._callDepositAmountDAOmineContract(
        account,
        pool,
        daoMineContract,
        amount,
        (err, txnHash, depositResult) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(DEPOSIT_DAOMINE_RETURNED, txnHash);
          }
          if (depositResult) {
            return emitter.emit(
              DEPOSIT_DAOMINE_RETURNED_COMPLETED,
              depositResult.transactionHash
            );
          }
        }
      );
    }
  };

  _checkLpTokenContractApproval = async (
    account,
    lpTokenContract,
    daoMineContractAddress,
    amount,
    callback
  ) => {
    const web3 = await this._getWeb3Provider();
    try {
      await lpTokenContract.methods
        .approve(
          daoMineContractAddress,
          web3.utils.toWei("999999999999", "ether")
        )
        .send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
        })
        .on("transactionHash", function (txnHash) {
          callback(null, txnHash, null);
        })
        .on("receipt", function (receipt) {
          callback(null, null, receipt);
        })
        .on("error", function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message);
            }
            callback(error);
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message);
            }
            callback(error);
          }
        });
    } catch (err) {
      if (err.message) {
        console.log("Err in _checkLpTokenContractApproval()", err.message);
      }
      callback(err);
    }
  };

  _callDepositAmountDAOmineContract = async (
    account,
    pool,
    daoStakeContract,
    amount,
    callback
  ) => {
    const web3 = await this._getWeb3Provider();

    const poolDecimal = pool.decimal;
    const poolIndex = pool.pid;

    const amountToSend =
      poolDecimal !== "18"
        ? web3.utils.toBN(Math.floor(amount * 10 ** poolDecimal)).toString()
        : web3.utils.toWei(amount, "ether");

    daoStakeContract.methods
      .deposit(poolIndex, amountToSend)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (txnHash) {
        callback(null, txnHash, null);
      })
      .on("receipt", function (receipt) {
        callback(null, null, receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }

          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  }

  _emergencyWithdrawSnapShot = async (userPoolInfo) => {
    try {
      const url = config.statsProvider + "staking/emergency-withdraw-snapshot";
      const poolsString = await rp({
        uri: url,
        method: 'POST',
        body: {
          pid: userPoolInfo.pid,
          userAddress: userPoolInfo.userAddress,
          pendingDVG: userPoolInfo.pendingDVG,
        },
        json: true,
      });
      const pools = JSON.parse(poolsString);
      return pools.body;
    } catch (e) {
      console.log(e);
      return store.getStore("universalGasPrice");
    }
  }

  emergencyWithdrawDAOmine = async (payload) => {
    const account = store.getStore("account");
    const network = store.getStore("network");
   
    const { pool } = payload.content;
    const poolIndex = pool.pid;

    // Get web3
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }

    // DAOMmine contract address by network
    let daoMineContractAddress = "";
    if (network === 42) {
      daoMineContractAddress = config.daoStakeTestContract;
    } else if (network === 1) {
      daoMineContractAddress = config.daoStakeMainnetContract; 
    }

    try {
      const daoMineContract = new web3.eth.Contract(
        config.daoStakeContractABI,
        daoMineContractAddress
      );

      const snapshot = async (_, result) => {
        await this._emergencyWithdrawSnapShot({
          pid: poolIndex,
          userAddress: account.address.toLowerCase(),
          pendingDVG: result.userPendingDVG,
        })
      }

      await this._getUserDepositForDAOmine(daoMineContract, null, account, poolIndex, snapshot);      

      await daoMineContract.methods
        .emergencyWithdraw(poolIndex)
        .send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
        })
        .on("transactionHash", function (txnHash) {
          return emitter.emit(EMERGENCY_WITHDRAW_DAOMINE_RETURNED, txnHash);
        })
        .on("receipt", function (receipt) {
          emitter.emit(
            EMERGENCY_WITHDRAW_DAOMINE_RETURNED_COMPLETED,
            receipt.transactionHash
          );
        })
        .on("error", function (error) {
          console.log("emergencyWithdrawDAOmine() Error: ", error);
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              emitter.emit(ERROR, error.message);
            }
          }
        })
        .catch((error) => {
          console.log("emergencyWithdrawDAOmine() Error: ", error);
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              emitter.emit(ERROR, error.message);
            }
          }
        });
    } catch (err) {
      console.log("emergencyWithdrawDAOmine() Error: ", err);
    }  
  }

  withdrawDAOmine = async (payload) => {
    const account = store.getStore("account");
    const network = store.getStore("network");
   
    const { pool, amount } = payload.content;
    const poolDecimal = pool.decimal;
    const poolIndex = pool.pid;

    // Get web3
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }

    // DAOMmine contract address by network
    let daoMineContractAddress = "";
    if (network === 42) {
      daoMineContractAddress = config.daoStakeTestContract;
    } else if (network === 1) {
      daoMineContractAddress = config.daoStakeMainnetContract;
    }

    try {
      const daoMineContract = new web3.eth.Contract(
        config.daoStakeContractABI,
        daoMineContractAddress
      );

      var amountToWithdraw =
        poolDecimal !== "18"
          ? web3.utils.toBN(amount * 10 ** poolDecimal).toString()
          : web3.utils.toWei(amount, "ether");

      await daoMineContract.methods
        .withdraw(poolIndex, amountToWithdraw)
        .send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
        })
        .on("transactionHash", function (txnHash) {
          return emitter.emit(WITHDRAW_DAOMINE_RETURNED, txnHash);
        })
        .on("receipt", function (receipt) {
          emitter.emit(
            WITHDRAW_DAOMINE_RETURNED_COMPLETED,
            receipt.transactionHash
          );
        })
        .on("error", function (error) {
          console.log("withdrawDAOmine() Error: ", error);
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              emitter.emit(ERROR, error.message);
            }
          }
        })
        .catch((error) => {
          console.log("withdrawDAOmine() Error: ", error);
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              emitter.emit(ERROR, error.message);
            }
          }
        });
    } catch (err) {
      console.log("withdrawDAOmine() Error: ", err);
    }  
  }

  //stake开始
  //获取vipdvg
  getDvgbalance = async () => {
    const network = store.getStore("network");
    const account = store.getStore("account");
    const assets = this._getDefaultValues(network).dvg;
    if (!account || !account.address) {
      return false;
    }
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }
    async.map(
      assets,
      (asset, callback) => {
        async.parallel(
          [
            (callbackInner) => {
              this._getERC20Balance(web3, asset, account, callbackInner);
            },
          ],
          (err, data) => {
            if (err) {
              return callback(err);
            }
            asset.balance = data[0];
            callback(null, asset);
          }
        );
      },
      (err, assets) => {
        if (err) {
          console.log(err);
          return emitter.emit(ERROR, err);
        }
        store.setStore({ dvg: assets });
        return emitter.emit(GET_DVG_BALANCE_SUCCESS, assets);
      }
    );
  };
  //stake 充值dvg
  depositXdvg = async (payload) => {
    const account = store.getStore("account");

    const { asset, amount, max } = payload.content;
    //asset 是dvg
    this._callDepositDvg(asset, amount, max, (err, withdrawResult) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      return emitter.emit(DEPOSIT_DVG_RETURNED, withdrawResult);
      // dispatcher.dispatch({ type: GET_DVG_INFO })
      // return emitter.emit(WITHDRAW_VAULT_RETURNED, withdrawResult);
    });
  };
  _callDepositDvg = async (asset, amount, max, callback) => {
    const account = this.getStore("account");
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }
    //创建dvg合约对象
    const dvgContract = new web3.eth.Contract(asset.abi, asset.erc20address);
    //判断dvg质押金额是否大于dvg授权数量
    let xdvg = this.getStore("dvg")[0];
    //创建xdvg合约对象
    const xDVGCOntract = new web3.eth.Contract(xdvg.abi, xdvg.erc20address);
    //查询xdvg授权数量
    const allowance = await dvgContract.methods
      .allowance(account.address, xdvg.erc20address)
      .call({ from: account.address });
    console.log(allowance, "allowance###5552");
    let _amount = "";
    if (max) {
      //查询dvg可用
      _amount = await dvgContract.methods
        .balanceOf(account.address)
        .call({ from: account.address });
    } else {
      _amount = web3.utils.toWei(amount, "ether");
    }

    //xdvg授权数量小于金额的话 需要重新授权
    if (parseFloat(_amount) > parseFloat(allowance)) {
      this._callDvgApproval(account, amount, (err) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }
        xDVGCOntract.methods
          .deposit(_amount)
          .send({
            from: account.address,
          })
          .on("transactionHash", function (hash) {
            console.log(hash, "hash###");
            callback(null, hash);
          })
          .on("confirmation", function (confirmationNumber, receipt) {
            console.log(confirmationNumber, receipt);
          })
          .on("receipt", function (receipt) {
            dispatcher.dispatch({ type: GET_DVG_INFO });
            console.log(receipt);
          })
          .on("error", function (error) {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return callback(error.message);
              }
              callback(error);
            }
          })
          .catch((error) => {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return callback(error.message);
              }
              callback(error);
            }
          });
      });
    } else {
      console.log(_amount, "_amount5612");
      xDVGCOntract.methods
        .deposit(_amount)
        .send({
          from: account.address,
        })
        .on("transactionHash", function (hash) {
          console.log(hash, "hash###");
          callback(null, hash);
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          console.log(confirmationNumber, receipt);
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
          dispatcher.dispatch({ type: GET_DVG_INFO });
        })
        .on("error", function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message);
            }
            callback(error);
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message);
            }
            callback(error);
          }
        });
    }
  };

  _callDvgApproval = async (account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    let asset = store.getStore("dvg")[1]; //dvg
    let xdvg = store.getStore("dvg")[0]; //xdvg
    let dvgContract = new web3.eth.Contract(asset.abi, asset.erc20address);
    dvgContract.methods
      .approve(xdvg.erc20address, web3.utils.toWei("999999999999", "ether"))
      .send({
        from: account.address,
      })
      .on("transactionHash", function (hash) {
        //success...
        callback();
      })
      .on("error", function (error) {
        console.log("5682");
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  //unstake 提现dvg
  withdrawXdvg = async (payload) => {
    const account = store.getStore("account");
    const { asset, amount, max } = payload.content;
    //asset 是dvg
    this._callWithdrawXdvg(asset, amount, max, (err, withdrawResult) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      // dispatcher.dispatch({ type: GET_DVG_INFO })
      return emitter.emit(WITHDRAW_DVG_RETURNED, withdrawResult);
    });
  };

  _callWithdrawXdvg = async (asset, amount, max, callback) => {
    const account = this.getStore("account");
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }
    let xdvg = this.getStore("dvg")[0];
    //创建xdvg合约对象
    const xDVGCOntract = new web3.eth.Contract(xdvg.abi, xdvg.erc20address);
    let _amount = "";
    if (max) {
      _amount = await xDVGCOntract.methods
        .balanceOf(account.address)
        .call({ from: account.address });
    } else {
      _amount = web3.utils.toWei(amount, "ether");
    }
    console.log(_amount, "_amount5702");
    xDVGCOntract.methods
      .withdraw(_amount)
      .send({
        from: account.address,
      })
      .on("transactionHash", function (hash) {
        console.log(hash, "hash###");
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
        dispatcher.dispatch({ type: GET_DVG_INFO });
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };
  getDvgApr = async () => {
    const apr = await this._getDvgApr();
    const aprInfo = apr.xdvg;
    store.setStore({
      dvgApr: apr.xdvg,
    });
    return emitter.emit(GET_XDVG_APR_SUCCESS, aprInfo);
  };
  _getDvgApr = async () => {
    try {
      const url = config.statsProvider + "staking/get-xdvg-stake";
      const statisticsString = await rp(url);
      const statistics = JSON.parse(statisticsString);
      return statistics.body;
    } catch (e) {
      console.log(e);
      // return store.getStore('universalGasPrice')
    }
  };

  isUsdVault = (asset) => {
    return asset.strategyType === "citadel" ||
      asset.strategyType === "elon" ||
      asset.strategyType === "cuban" ||
      asset.strategyType === "daoFaang"
      ? true
      : false;
  };
}

var store = new Store();

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter,
};
