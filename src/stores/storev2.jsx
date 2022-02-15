import {
  APPROVE_COMPLETED,
  APPROVE_TRANSACTING,
  APPROVAL_DVG_RETURNED,
  APPROVAL_DVG_RETURNED_COMPLETED,
  BICONOMY_CONNECTED,
  CURRENT_THEME_RETURNED,
  DAOMINE_POOL_RETURNED,
  DAOMINE_POOL_RETURNED_COMPLETED,
  APPROVE_DEPOSIT_CONTRACT,
  CONFIRM_DEPOSIT_CONTRACT,
  CONFIRM_CLAIM_DVD,
  CLAIM_DVD_HASH,
  CLAIM_DVD_SUCCESS,
  DEPOSIT_CONTRACT_HAPPY_HOUR_RETURNED_COMPLETED,
  DEPOSIT_CONTRACT_RETURNED,
  DEPOSIT_CONTRACT_RETURNED_COMPLETED,
  DEPOSIT_DAOMINE,
  DEPOSIT_DAOMINE_RETURNED,
  DEPOSIT_DAOMINE_RETURNED_COMPLETED,
  DEPOSIT_DVG_RETURNED,
  DEPOSIT_DVG_RETURNED_COMPLETED,
  DEPOSIT_XDVG,
  DISABLE_ACTION_BUTTONS_RETURNED,
  DRAWER_RETURNED,
  EMERGENCY_WITHDRAW_DAOMINE,
  EMERGENCY_WITHDRAW_DAOMINE_RETURNED,
  EMERGENCY_WITHDRAW_DAOMINE_RETURNED_COMPLETED,
  ERROR,
  FIND_DAOMINE_POOL,
  GET_DVG_APR,
  GET_DVG_BALANCE_SUCCESS,
  GET_DVG_INFO,
  GET_HAPPY_HOUR_STATUS,
  GET_STRATEGY_BALANCES_FULL,
  GET_UPGRADE_TOKEN,
  GET_UPGRADE_TOKEN_RETURN,
  GET_XDVG_APR_SUCCESS,
  HAPPY_HOUR_RETURN,
  HAPPY_HOUR_VERIFY,
  LATEST_POOLS,
  LEGACY_POOLS,
  UPDATE_SELECTED_POOL_TYPE,
  NETWORK,
  STRATEGY_BALANCES_FULL_RETURNED,
  STRATEGIES_USE_TOKEN_INDEX,
  TOGGLE_DRAWER,
  TOGGLE_THEME,
  UPGRADE_STAKE_TOKEN,
  UPGRADE_TOKEN,
  UPGRADE_TOKEN_RETURN,
  UPGRADE_TOKEN_SUCCESS,
  USD_PRICE_RETURNED,
  WIDTHDRAW_XDVG,
  WITHDRAW_BOTH,
  WITHDRAW_BOTH_VAULT_FAIL_RETURNED,
  WITHDRAW_DAOMINE,
  WITHDRAW_DAOMINE_RETURNED,
  WITHDRAW_DAOMINE_RETURNED_COMPLETED,
  WITHDRAW_DVG_RETURNED,
  WITHDRAW_VAULT_RETURNED,
  WITHDRAW_DVG_RETURNED_COMPLETED,
  WITHDRAW_VAULT_RETURNED_COMPLETED,
  YIELD_DAOMINE,
  YIELD_DAOMINE_RETURNED,
  YIELD_DAOMINE_RETURNED_COMPLETED,
  APPROVE_DEPOSIT_SUCCESS,
  ERROR_WALLET_APPROVAL,
  ERROR_DEPOSIT_WALLET,
  CLAIM_DVD_ERROR,
  GET_REDEEM_INFO,
  PARSE_UNITS,
  REDEEM_PTOKEN_HASH,
  REDEEM_PTOKEN_SUCCESS,
  REDEEM_PTOKEN_ERROR,
  APPROVE_PTOKEN_HASH,
  APPROVE_PTOKEN_SUCCESS,
  APPROVE_PTOKEN_ERROR,
  REDEEM_SUPPORTED_NETWORK
} from "../constants/constants";

import Ethereum from "./config/ethereum";
import Kovan from "./config/kovan";
import Matic from "./config/matic";
import Mumbai from "./config/mumbai";
import BscTestnet from "./config/bscTestnet";
import BscMainnet from  "./config/bscMainnet";

import Web3 from "web3";
import async from "async";
import citadelABI from "./citadelABI.json";
import config from "../config/config";
import fromExponential from "from-exponential";
import { injected } from "./connectors";

import contractHelper from './helper/contractHelper';
import tokenPriceMinHelper from './helper/tokenPriceMinHelper';
import apiHelper from "./helper/apiHelper";
import avalancheTesnet from "./config/avalancheTestnet";
import avalancheMainnet from "./config/avalancheMainnet";

const rp = require("request-promise");

const Dispatcher = require("flux").Dispatcher;
const Emitter = require("events").EventEmitter;

const dispatcher = new Dispatcher();
const emitter = new Emitter();

const networkObj = {
  1: "ethereum",
  4: "ethereum",
  56: "bsc",
  97: "bsc",
  42: "ethereum",
  80001: "polygon",
  137: "polygon",
  43113: "avalanche",
  43114: "avalanche"
}

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
      stakePools: [], // for legacy
      daominePools: [], // for latest
      daomineType: LATEST_POOLS, 
      dvgApr: {},
      performanceIds: ["daoCDV", "daoSTO"],
      executeStrategyBalanceFunction: false,
    };

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case APPROVE_DEPOSIT_CONTRACT:
            this.approveDepositContract(payload);
            break;
          case CONFIRM_DEPOSIT_CONTRACT:
            this.depositAmountContract(payload);
            break;
          case TOGGLE_DRAWER:
            this.toggleDrawer(payload);
            break;
          case WITHDRAW_BOTH:
            this.withdrawBoth(payload);
            break;
          case GET_STRATEGY_BALANCES_FULL:
            this.getStrategyBalancesFullV2(payload);
            break;
          // eslint-disable-next-line no-fallthrough
          case TOGGLE_THEME:
            this.toggleTheme(payload);
            break;
          case FIND_DAOMINE_POOL:
            this.findDAOminePool(payload);
            break;
          case DEPOSIT_DAOMINE:
            this.depositDAOmine(payload);
            break;
          case WITHDRAW_DAOMINE:
            this.withdrawDAOmine(payload);
            break;
          case EMERGENCY_WITHDRAW_DAOMINE:
            this.emergencyWithdrawDAOmine(payload);
            break;
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
          case GET_UPGRADE_TOKEN:
            this.getUpgradeToken();
            break;
          case UPGRADE_TOKEN:
            this.upgradeToken();
            break;
          case UPGRADE_STAKE_TOKEN:
            this.upgradeAndStakeToken();
            break;
          case UPDATE_SELECTED_POOL_TYPE: 
            this.updateSelectedPoolType(payload);
            break;  
          case YIELD_DAOMINE:
            this.yieldDAOmine(payload);
            break;
          case CONFIRM_CLAIM_DVD:
            this.claimTokens();
            break;
          case GET_REDEEM_INFO: 
            this.getUserPD33DInfo();
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

  _getDefaultValues = (network) => {
    const vaultAssetsObj = {
      1: Ethereum,
      42: Kovan,
      80001: Mumbai,
      137: Matic,
      56: BscMainnet,
      97: BscTestnet,
      43113: avalancheTesnet,
      43114: avalancheMainnet
    };

    const upgradeTokenObj = {
      1: {
        dvg: {
          erc20address: "0x51e00a95748DBd2a3F47bC5c3b3E7B3F0fea666c",
          erc20ABI: config.DvgAbi,
          decimals: 18,
        },
        dvd: {
          erc20address: "0x77dcE26c03a9B833fc2D7C31C22Da4f42e9d9582",
          erc20ABI: config.dvdContractAbi,
          decimals: 18,
        },
        swapAddress: "0x61FfA596ABBbA47fE6014bDa91F894B2Dae6dE05",
        swapContractAbi: config.upgradeContractAbi,
        airdropAddress: "",
        airdropABI: config.airdropABI
      },
      42: {
        dvg: {
          erc20address: "0xea9726eFc9831EF0499fD4Db4Ab143F15a797673",
          erc20ABI: config.DvgAbi,
          decimals: 18,
        },
        dvd: {
          erc20address: "0x6639c554A299D58284e36663f609a7d94526fEC0",
          erc20ABI: config.dvdContractAbi,
          decimals: 18,
        },
        swapAddress: "0xC314f6527DAC85AcdfE222Cb410133aB6fc09009",
        swapContractAbi: config.upgradeContractAbi,
        airdropAddress: "0xBcf5ceF54bCa1b0591eE487bac567E7182bf8c7d",
        airdropABI: config.airdropABI
      },
    };

    const vaultAssets = network ? (vaultAssetsObj[network]? vaultAssetsObj[network] :[]): vaultAssetsObj[1];

    if(!vaultAssetsObj[network]) {
      // alert('Please switch your wallet Network to Ethereum or Polygon');
    }

    const upgradeToken = network
      ? upgradeTokenObj[network]
      : upgradeTokenObj[1];

    let airdrop = null;
    const supportedNetwork = [NETWORK.ETHEREUM, NETWORK.KOVAN];
    if(supportedNetwork.includes(network)) {
      airdrop = {
        address: upgradeToken.airdropAddress,
        abi: upgradeToken.airdropABI
      };
    }
   

    let dvgObj = { xDVG: "", xDVD: "", dvg: "", dvd: "" };
    if (network === 1) {
      dvgObj.xDVD = config.xdvdMainnetContract;
      dvgObj.xDVG = config.xdvgMainnetContract;
      dvgObj.dvg = config.dvgTokenMainnetContract;
      dvgObj.dvd = config.dvdTokenMainnetContract;
    } else if (network === 42) {
      dvgObj.xDVD = config.xdvdTestContract;
      dvgObj.xDVG = config.xdvgTestContract;
      dvgObj.dvg = config.dvgTokenTestContract;
      dvgObj.dvd = config.dvdTokenTestContract;
    } 

    // Redeem PD33D Token 
    let redeemPD33D = { xDvd: "", dvd: "", pD33dRedeemer: ""};
    if(network === 1) {
      redeemPD33D = {
        xDvd: config.xdvdMainnetContract,
        dvd: config.dvdTokenMainnetContract,
        pD33dRedeemer: config.pD33dRedeemerMainnetContract,
        pD33dRedeemerAbi: config.pD33dRedeemerAbi
      }
    } else if (network === 4) {
      redeemPD33D = {
        xDvd: config.xdvdRinkedbyContract,
        dvd: config.dvdRinkedbyContract,
        pD33dRedeemer: config.pD33dRedeemerTestContract,
        pD33dRedeemerAbi: config.pD33dRedeemerAbi
      }
    }

    return {
      vaultAssets,
      dvg: [
        {
          id: "xDVD",
          name: "VIPDVD",
          symbol: "XDVD",
          decimals: 18,
          erc20address: dvgObj.xDVD,
          abi: config.xDvdAbi,
          balance: 1,
        },
        {
          id: "DVD",
          name: "DVDToken",
          symbol: "DVD",
          decimals: 18,
          erc20address: dvgObj.dvd,
          abi: config.dvdTokenContractABI,
          balance: 0,
        },
        {
          id: "xDVG",
          name: "VIPDVG",
          symbol: "XDVG",
          decimals: 18,
          erc20address: dvgObj.xDVG,
          abi: config.xdvgAbi,
          balance: 1,
        },
        {
          id: "DVG",
          name: "DVGToken",
          symbol: "DVG",
          decimals: 18,
          erc20address: dvgObj.dvg,
          abi: config.dvgTokenContractABI,
          balance: 0,
        },
      ],
      upgradeToken,
      airdrop,
      redeemPD33D
    };
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

    const network = store.getStore("network");
    const erc20ABI = contractHelper.getERC20AbiByNetwork(network);

    let erc20Contract = new web3.eth.Contract(erc20ABI, asset.erc20address);

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

        // Happy Hour Test
        const isHappyHourStrategy = asset.happyHourEnabled;
        let happyHour = false;

        if(isHappyHourStrategy) {
          happyHour = await this._eventVerifyAmount(amount); 
        }

        if(happyHour) {
          const key = `${asset.symbols[tokenIndex]}HHContract`;
          erc20Contract = store.getStore(key);
        }
        // END OF Happy Hour Test

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

        // callback();
      } else {
        callback(null, null, true);
      }
    } catch (error) {
      if (error.message) {
        console.log(error.message);
      }
      callback(error);
    }
  };

  _getERC20Balances = async (web3, asset, account, callback, coinsInUSDPrice) => {
    if(!coinsInUSDPrice) {
      coinsInUSDPrice = await this._getUSDPrices();
    }
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
        let balance = await erc20Contract.methods
          .balanceOf(account.address)
          .call({ from: account.address });
        let decimals = await erc20Contract.methods
          .decimals()
          .call({ from: account.address });
        balance = parseFloat(balance) / 10 ** decimals;

        balances.push(parseFloat(balance));
      } catch (ex) {
        console.log("Asset: " + asset.id, ex);
        callback(ex);
        return {
          success: false,
          data: ex
        }
      }
    }

    const returnObj = {
      balances,
      priceInUSD,
      sumBalances: balances.reduce((a, b) => a + b, 0),
    };
    callback(null, returnObj);

    return {
      success: true,
      data: returnObj
    }
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
      return;
    } else {
      const network = store.getStore("network");
      const erc20Abi = contractHelper.getERC20AbiByNetwork(network);
      let erc20Contract = new web3.eth.Contract(
        erc20Abi,
        asset.erc20address
      );
      console.log(`Getting ERC 20 Balance for asset:  ${asset.erc20address}`);

      try {
        var balance = await erc20Contract.methods
          .balanceOf(account.address)
          .call({ from: account.address });
        balance = parseFloat(balance) / 10 ** asset.decimals;
        callback(null, parseFloat(balance));
        return parseFloat(balance);
      } catch (ex) {
        console.error("Error in getting ERC 20 Balance for asset: ", ex);
        // return callback(ex);
      }
    }
  };
  
  _getPricePerFullShare = async(asset, vaultContract) => {
    let pricePerFullShareInUSD = 0;
    try {
      // Strategies with pool in 6 decimals
      const strategies = [
        "citadel",
        "elon",
        "cuban"
      ];
      const tempStrategies = [
        "citadelv2",
        "daoStonks"
      ];
      const includeInStrategies = strategies.includes(asset.strategyType);
      const includeTempStrategies = tempStrategies.includes(asset.strategyType);

      if(includeInStrategies || includeTempStrategies) {
        let pool = await vaultContract.methods.getAllPoolInUSD().call();
        pool = (includeTempStrategies) ? (pool - (asset.totalDepositedAmount * 10 ** 18)) : pool * 10 ** 12;
        const totalSupply = await vaultContract.methods.totalSupply().call();
        pricePerFullShareInUSD = (parseFloat(pool) === 0 || parseFloat(totalSupply) === 0) 
          ? 0
          : pool / totalSupply;
      } else {
        pricePerFullShareInUSD = await vaultContract.methods.getPricePerFullShare().call();
        pricePerFullShareInUSD = pricePerFullShareInUSD / 10 ** 18;
      }
    } catch(err) {
      console.error(`Error in getting price per full share`, err);
    } finally {
      return pricePerFullShareInUSD;
    }
   
  }

  _getBalances = async (web3, asset, account, callback) => {
    if (asset.vaultContractAddress === null) {
       callback(null, 0);
      return {
        success: true,
        data: 0
      }
    }
   
    if (asset.strategyType === "daoFaang") {
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

      return {
        success: true,
        data: {
          earnBalance: 0,
          vaultBalance: 0,
          strategyBalance: depositedShares,
          depositedSharesInUSD: depositedSharesInUSD,
        }
      }
    } else if (asset.strategyType === "moneyPrinter") {
      const network = store.getStore("network");
      const vaultContract = new web3.eth.Contract(
        asset.vaultContractABI,
        asset.vaultContractAddress
      );
      // USDT to USD price feed contract
      const usdtUsdPriceFeedContract = new web3.eth.Contract(
        config.polygonEacAggregatoorProxyContract,
        network === NETWORK.MATIC
          ? config.USDTUSDPriceFeedMaticContract
          : config.USDTUSDPriceFeedMumbaiContract
      );

      // USDT / USD conversion result
      const usdtToUsdPrice = await usdtUsdPriceFeedContract.methods
        .latestAnswer()
        .call();

      const pool = await vaultContract.methods.getValueInPool().call();
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

      return {
        success: true,
        data: {
          earnBalance: 0,
          vaultBalance: 0,
          strategyBalance: depositedShares,
          depositedSharesInUSD: depositedSharesInUSD,
        }
      }

    } else {
      const vaultContract = new web3.eth.Contract(
        asset.vaultContractABI,
        asset.vaultContractAddress
      );
      
      // Strategies with pool in 6 decimals
      const strategies = [
        "citadel",
        "elon",
        "cuban"
      ];
      const tempStrategies = [
        "citadelv2",
        "daoStonks"
      ];
      const includeInStrategies = strategies.includes(asset.strategyType);
      let pricePerFullShareInUSD = await this._getPricePerFullShare(asset, vaultContract);
     
      const depositedShares = await vaultContract.methods
        .balanceOf(account.address)
        .call();

      const depositedSharesInUSD = (depositedShares / 10 ** asset.decimals) * pricePerFullShareInUSD;
     
      let pendingBalance = 0;
      if(!includeInStrategies) {
        pendingBalance = await vaultContract.methods.depositAmt(account.address).call({from: account.address});
        pendingBalance = pendingBalance / 10 ** 18;
      }
     
      callback(null, {
        earnBalance: 0,
        vaultBalance: 0,
        strategyBalance: depositedShares,
        depositedSharesInUSD: depositedSharesInUSD,
      });
      return {
        success: true,
        data: {
          earnBalance: 0,
          vaultBalance: 0,
          strategyBalance: depositedShares,
          depositedSharesInUSD: depositedSharesInUSD,
          pendingBalance: pendingBalance
        }
      }
    }
  };

  /******** DEPOSIT APPROVAL START ********************/

  // Check allowance
  getWalletApprovedStatus = async (payload) => {
    const account = store.getStore("account");

    const {asset, amount, tokenIndex} = payload;

    const web3 = await this._getWeb3Provider();
    if (!web3) {
      console.error(`Missing web3 in getWalletApprovedStatus()`);
      return null;
    }

    return this.checkIsCitadelApproved(
          asset,
          account,
          amount,
          asset.vaultContractAddress,
          tokenIndex
    );
  }

  checkIsCitadelApproved = async (asset,
    account,
    amount,
    contract,
    tokenIndex = null) => {

    const web3 = new Web3(store.getStore("web3context").library.provider);

    if (asset.erc20address === "Ethereum") {
      return {
        success: false,
        message: "erc20address not ethereum"
      }
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
        return {
          success: false,
          message: error.message
        }
      }
    }

    const network = store.getStore("network");
    const erc20ABI = contractHelper.getERC20AbiByNetwork(network);

    let erc20Contract = new web3.eth.Contract(erc20ABI, asset.erc20address);

    try {
      const allowance = await erc20Contract.methods
        .allowance(account.address, contract)
        .call({ from: account.address });

      const ethAllowance = web3.utils.fromWei(allowance, "ether");

      return {
        success: true,
        needApproval: parseFloat(ethAllowance) < parseFloat(amount)
      }
    } catch (error) {
      if (error.message) {
        console.log(error.message);
      }
      return {
        success: false,
        message: error
      }
    }

  }

  // Getting approval from ERC20 to spend on strategy
  approveDepositContract = async (payload) => {
    const account = store.getStore("account");

    const {asset, amount, tokenIndex} = payload.content;

    const web3 = await this._getWeb3Provider();
    if (!web3) {
      console.error(`Web 3 is undefined at approveDepositContract()`);
      return null;
    }

    let approvalErr;
    await this._checkApprovalCitadel(
      asset,
      account,
      amount,
      asset.vaultContractAddress,
      tokenIndex,
      (err, txnHash, approvalResult) => {
        if (err) {
          emitter.emit(ERROR_WALLET_APPROVAL, err);
          return emitter.emit(ERROR, err);
        }
        if (txnHash) {
          return emitter.emit(APPROVE_TRANSACTING, txnHash);
        }
        if (approvalResult) {
          emitter.emit(APPROVE_DEPOSIT_SUCCESS, approvalResult && approvalResult.transactionHash ? approvalResult.transactionHash : {
            success: true
          });
        }
      }
    );

    if (!approvalErr) {
      return {
        success: true,
      }
    }
    return {
      success: false,
      error: approvalErr
    }
  }

  // Deposit into Strategy
  depositAmountContract = async (payload) => {
      const account = store.getStore("account");

      //  Token Index USDT = 0, USDC = 1, DAI = 2
      const { asset, amount, tokenIndex } =
          payload.content;

      const web3 = await this._getWeb3Provider();
      if (!web3) {
        return null;
      }

      const vaultContract = new web3.eth.Contract(
          asset.vaultContractABI,
          asset.vaultContractAddress
      );

      // Happy Hour Test
      const isHappyHourStrategy = asset.happyHourEnabled;
      let happyHour = false;

      if(isHappyHourStrategy) {
        happyHour = await this._eventVerifyAmount(amount); 
      }

      if(happyHour) {
        await this._callDepositAmountContractHappyHour(
          asset,
          account,
          amount,
          tokenIndex,
          (err, txnHash, depositResult) => {
            if (err) {
              emitter.emit(ERROR_DEPOSIT_WALLET, err);
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
        await this._callDepositAmountContract(
          asset,
          account,
          amount,
          tokenIndex,
          (err, txnHash, depositResult) => {
            if (err) {
              emitter.emit(ERROR_DEPOSIT_WALLET, err);
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
      // END of happy hour test


      // if(happyHourStrategy.includes(asset.strategyType)) {
      //   const happyHour = await this._eventVerifyAmount(amount); 

      //   if (happyHour === true) {
      //     await this._callDepositAmountContractHappyHour(
      //         asset,
      //         account,
      //         amount,
      //         tokenIndex,
      //         (err, txnHash, depositResult) => {
      //           if (err) {
      //             emitter.emit(ERROR_DEPOSIT_WALLET, err);
      //             return emitter.emit(ERROR, err);
      //           }
      //           if (txnHash) {
      //             return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
      //           }
      //           if (depositResult) {
      //             return emitter.emit(
      //                 DEPOSIT_CONTRACT_HAPPY_HOUR_RETURNED_COMPLETED,
      //                 depositResult.transactionHash
      //             );
      //           }
      //         }
      //     );
      //     return;
      //   }
      // }

      // await this._callDepositAmountContract(
      //   asset,
      //   account,
      //   amount,
      //   tokenIndex,
      //   (err, txnHash, depositResult) => {
      //     if (err) {
      //       emitter.emit(ERROR_DEPOSIT_WALLET, err);
      //       return emitter.emit(ERROR, err);
      //     }
      //     if (txnHash) {
      //       return emitter.emit(DEPOSIT_CONTRACT_RETURNED, txnHash);
      //     }
      //     if (depositResult) {
      //       return emitter.emit(
      //           DEPOSIT_CONTRACT_RETURNED_COMPLETED,
      //           depositResult.transactionHash
      //       );
      //     }
      //   }
      // );
  }

  _callDepositAmountContract = async (
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

    const network = store.getStore("network");
    const erc20ABI = contractHelper.getERC20AbiByNetwork(network);

    let erc20Contract = new web3.eth.Contract(
      erc20ABI,
      asset.erc20addresses[tokenIndex]
    );

    let decimals = await erc20Contract.methods.decimals().call();

    var amountToSend = decimals !== "18"
        ? web3.utils.toBN(Math.floor(amount * 10 ** decimals)).toString()
        : web3.utils.toWei(amount, "ether");

    const strategyWhichUseTokenIndex = [
      "citadel",
      "elon",
      "cuban"
    ];
    const tokenToSent = strategyWhichUseTokenIndex.includes(asset.strategyType)
      ? tokenIndex
      : asset.erc20addresses[tokenIndex];

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

  _callDepositAmountContractHappyHour = async (
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
    // if (asset.strategyType === "citadel") {
    //   vaultContract = store.getStore("happyHourContract");
    // } else if (asset.strategyType === "daoFaang") {
    //   vaultContract = store.getStore("happyHourContractFAANG");
    // } else if (asset.strategyType === "metaverse") {
    //   vaultContract = store.getStore("happyHourContractMetaverse");
    // } else if (asset.strategyType === "citadelv2") {
    //   vaultContract = store.getStore(" happyHourContractCitadelv2");
    // } else if (asset.strategyType === "daoStonks") {
    //   vaultContract = store.getStore("happyHourContractDAOStonks");
    // } else if (asset.strategyType === "daoTA") {
    //   vaultContract = store.getStore("happyHourContractDAOTA");
    // }
  
    // Happy Hour Test
    const happyHourContractKey = `${asset.vaultSymbol}HHContract`;
    vaultContract = store.getStore(happyHourContractKey);
    // END of Happy Hour Test
    
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

    const strategyWhichUseTokenIndex = [
      "citadel",
      "elon",
      "cuban"
    ];

    const tokenToSent = strategyWhichUseTokenIndex.includes(asset.strategyType) 
      ? tokenIndex
      : asset.erc20addresses[tokenIndex];

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

  /******** DEPOSIT APPROVAL END ********************/

  getUSDPrices = async () => {
    try {
      const priceJSON = await this._getUSDPrices();
      store.setStore({ usdPrices: priceJSON });
      emitter.emit(USD_PRICE_RETURNED, priceJSON);
      return priceJSON
    } catch (e) {
      console.log(e);
    }
  };

  _getUSDPrices = async () => {
    try {
      const url =
        "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin,dai,true-usd,tether,compound-usdt,compound-usd-coin,cdai,ethereum&vs_currencies=usd,eth";
      const priceString = await rp(url);
      const priceJSON = JSON.parse(priceString);

      return priceJSON;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  getHistoricDataOfVault = async (strategy, interval) => {
    try {
      const url = `${config.statsProvider}vaults/performance-apy/${strategy}/${interval}`;
      const resultString = await rp(url);
      const result = JSON.parse(resultString);
      return {
        success: true,
        data: result.body
      };
    } catch (Err) {
      console.log(Err);
      return {
        success: false,
      };
    }
  }

  getAllAssetInformation = async (network) => {
    try {
      const url = `${config.statsProvider}vaults/${network}/all`;
      const resultString = await rp(url);
      const result = JSON.parse(resultString);
      return {
        success: true,
        data: result.body
      };
    } catch (Err) {
      console.log(Err);
      return {
        success: false,
      };
    }
  }

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
    store.setStore(_result);
    emitter.emit(HAPPY_HOUR_RETURN, _result);
  };

  // Total TVL
  _getTotalTVL = async () => {
    try {
      const url = config.statsProvider + "vaults/tvl/total";
      const statisticsString = await rp(url);
      const statistics = JSON.parse(statisticsString);
      return {success: true, tvl: statistics.body[0].tvl};
    } catch (e) {
      console.error(`Error in _getTotalTVL(): `, e);
      return {success: false, tvl: 0};
    }
  };

  saveBiconomyProvider = async (payload) => {
    const { happyHourWeb3 } = payload.content;
    store.setStore({happyHourWeb3});

    const network = store.getStore("network");
    let assets = this._getDefaultValues(network).vaultAssets;
    assets = assets.filter(a => a.happyHourEnabled); // Find all happy hour contract

    let contracts = {};

    const erc20Addresses = assets[0].erc20addresses;
    const erc20Symbols = assets[0].symbols;
    erc20Addresses.forEach((e, index) => {
      const key = `${erc20Symbols[index]}HHContract`;
      const happyHourContract = new happyHourWeb3.eth.Contract(
        config.erc20ABI,
        e
      );
      contracts[key] = happyHourContract;
    });

    assets.forEach(a => {
      const key = `${a.vaultSymbol}HHContract`;
      const happyHourContract = new happyHourWeb3.eth.Contract(
        a.vaultContractABI,
        a.vaultContractAddress
      );
      contracts[key] = happyHourContract;
    });

    store.setStore(contracts);
  

    // const citadelAsset = assets.filter((el) => el.id === "daoCDV");
    // const citadelv2Asset = assets.filter((el) => el.id === "daoCDV2");
    // const FAANGAsset = assets.filter((el) => el.id === "daoSTO");
    // const metaverseAsset = assets.filter((el) => el.id === "daoMVF");
    // const daoStonksAsset = assets.filter((el) => el.id === "daoSTO2");
    // const daoTAAsset = assets.filter((el) => el.id === "daoTAS");
    
    // if (happyHourWeb3) {
    //   // Initialize Contract
    //   const happyHourContract = new happyHourWeb3.eth.Contract(
    //     citadelAsset[0].vaultContractABI,
    //     citadelAsset[0].vaultContractAddress
    //   );

    //   const happyHourContractFAANG = new happyHourWeb3.eth.Contract(
    //     FAANGAsset[0].vaultContractABI,
    //     FAANGAsset[0].vaultContractAddress
    //   );

    //   const happyHourContractMetaverse = new happyHourWeb3.eth.Contract(
    //     metaverseAsset[0].vaultContractABI,
    //     metaverseAsset[0].vaultContractAddress
    //   );

    //   const happyHourContractCitadelv2 = new happyHourWeb3.eth.Contract(
    //     citadelv2Asset[0].vaultContractABI,
    //     citadelv2Asset[0].vaultContractAddress
    //   );

    //   const happyHourContractDAOStonks = new happyHourWeb3.eth.Contract(
    //     daoStonksAsset[0].vaultContractABI,
    //     daoStonksAsset[0].vaultContractAddress
    //   );

    //   const happyHourContractDAOTA = new happyHourWeb3.eth.Contract(
    //     daoTAAsset[0].vaultContractABI,
    //     daoTAAsset[0].vaultContractAddress
    //   );

    //   store.setStore({
    //     happyHourContract: happyHourContract,
    //     happyHourContractFAANG: happyHourContractFAANG,
    //     happyHourContractMetaverse: happyHourContractMetaverse,
    //     happyHourContractCitadelv2: happyHourContractCitadelv2,
    //     happyHourContractDAOStonks: happyHourContractDAOStonks,
    //     happyHourContractDAOTA: happyHourContractDAOTA
    //   });
    // }

    // if (erc20PaymentWeb3) {
    //   const erc20PaymentsContract = new erc20PaymentWeb3.eth.Contract(
    //     citadelABI,
    //     citadelAsset[0].vaultContractAddress
    //   );
    //   store.setStore({ erc20PaymentsContract: erc20PaymentsContract });
    // }
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

  /***************** WITHDRAWAL START *****************/
  // TODO: REFACTOR: Currently all 3 types of vaults use this
  withdrawBoth = async (payload) => {
    const { asset, amount, tokenIndex } =
      payload.content;
    const account = store.getStore("account");
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );

    // Soft Check for sufficient liquidity
    if(asset.strategyType !== "moneyPrinter") {
      await this._isSufficientLiquidityUsd(
        asset,
        vaultContract,
        amount,
        tokenIndex
      );
    }

    // strategies which using token index
    const strategiesWhichUseTokenIndex = STRATEGIES_USE_TOKEN_INDEX;
    const token = strategiesWhichUseTokenIndex.includes(asset.strategyType)
      ? tokenIndex
      : asset.erc20addresses[tokenIndex];
  
    const amountToSend = fromExponential(parseFloat(amount));

    let functionCall;
    const strategiesWithoutMinPriceParam = ["daoCDV", "daoSTO", "daoCUB", "daoELO", "daoMPT"];
    if(strategiesWithoutMinPriceParam.includes(asset.vaultSymbol)) {
      functionCall = vaultContract.methods
      .withdraw(amountToSend, token);
    } else {
      const tokenMinPrice = await this.getTokenPriceMin(token, asset.strategyType, amountToSend);
      functionCall = vaultContract.methods
        .withdraw(amountToSend, token, tokenMinPrice);
    }

    await functionCall
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (txnHash) {
        console.log(txnHash);
        return emitter.emit(WITHDRAW_VAULT_RETURNED, txnHash);
      })
      .on("receipt", function (receipt) {
        console.log("Reciept", receipt);
        emitter.emit(
          WITHDRAW_VAULT_RETURNED_COMPLETED,
          receipt.transactionHash
        );
      })
      .on("error", function (error) {
        emitter.emit(WITHDRAW_BOTH_VAULT_FAIL_RETURNED);
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            emitter.emit(ERROR, error.message);
          }
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            console.error("Error in withdrawBoth", error);
            emitter.emit(ERROR, error.message);
          }
        }
        emitter.emit(WITHDRAW_BOTH_VAULT_FAIL_RETURNED);
      });
  };

  // For Citadel V2, DAO Stonks, DAO Safu
  getTokenPriceMin = async(erc20Address, contractType, shareToWithdraw) => {
    try {
      let tokenPriceMin = [0];

      const network = store.getStore("network");
      const supportedNetwork = [
        NETWORK.BSCMAINNET,
        NETWORK.AVALANCHEMAIN,
        NETWORK.ETHEREUM
      ];
      if(!supportedNetwork.includes(network)) {
        return tokenPriceMin;
      }
      const web3 = new Web3(store.getStore("web3context").library.provider);
      if(!web3 || web3 === undefined) {
        throw new Error(`Missing web3`);
      }

      return await tokenPriceMinHelper.getTokenPriceMin(web3, network, contractType, erc20Address, shareToWithdraw);
    } catch (err) {
      console.error(`Error in getTokenPriceMin(), `, err);
    }
  }

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

    // Strategy where total pool in USD is in 6 decimals
    const strategy = [
      "cuban",
      "elon",
      "citadel"
    ];

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
    } else if (strategy.includes(asset.strategyType)) {
      pool = await vaultContract.methods.getAllPoolInUSD().call();
    } else {
      pool = await vaultContract.methods.getAllPoolInUSD().call() / 10 ** 12; //default in 18 decimals, make it as 6 decimals
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

  invest = async(asset) => {
    const account = store.getStore("account");
    const web3 = new Web3(store.getStore("web3context").library.provider);

    let vaultContract = new web3.eth.Contract(
      asset.vaultContractABI,
      asset.vaultContractAddress
    );

    await vaultContract.methods.invest([]).send({
      from: account.address,
      gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
    }).on("transactionHash", function (txnHash) {
      console.log(`invest  ${asset.vaultSymbol}  transaction hash`, txnHash);
    })
    .on("receipt", function (receipt) {
      alert("Successfully invest");
      console.log(`Successfully invest`);
    })
    .on("error", function (error) {
      console.error(`Something wrong when calling invest`)
    })
  }

  /***************** WITHDRAWAL END *****************/

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

  getFeeInfo = async (asset, amount) => {
    try {
      const web3 = await this._getWeb3Provider();
      if (!web3) {
        return null;
      }
      let vaultContract = new web3.eth.Contract(
          asset.vaultContractABI,
          asset.vaultContractAddress
      );

      let percentageRange1 = await vaultContract.methods.networkFeePerc(0).call();
      let percentageRange2 = await vaultContract.methods.networkFeePerc(1).call();
      let percentageRange3 = await vaultContract.methods.networkFeePerc(2).call();

      let amountRange1, amountRange2 = 0;
      if(["daoAXA", "daoAXS", "daoA2S", "daoASA"].includes(asset.strategyType)) {
        amountRange1 = await vaultContract.methods.networkFeeTier(0).call();
        amountRange2 = await vaultContract.methods.networkFeeTier(1).call();
      } else {
        amountRange1 = await vaultContract.methods.networkFeeTier2(0).call();
        amountRange2 = await vaultContract.methods.networkFeeTier2(1).call();
      }

      const strategies = [
        "metaverse",
        "citadelv2",
        "daoStonks",
        "daoSafu",
        "daoTA",
        "daoDegen",
      ];

      if(strategies.includes(asset.strategyType)) {
        let amountRange3 = await vaultContract.methods.customNetworkFeeTier().call();
        let percentageRange4 = await vaultContract.methods.customNetworkFeePerc().call();
      
        if(amount < amountRange1) {
          return {
            feePercent: percentageRange1/100
          }
        } else if (amount <= amountRange2) {
          return {
            feePercent: percentageRange2/100
          }
        } else if (amount < amountRange3) {
          return {
            feePercent: percentageRange3/100
          }
        } else {
          return {
            feePercent: percentageRange4/100
          }
        }

      } else {
        if(amount < amountRange1) {
          return {
            feePercent: percentageRange1/100
          }
        } else if(amount>=amountRange1 &&  amount <= amountRange2) {
          return {
            feePercent: percentageRange2/100
          }
        } else {
          return {
            feePercent: percentageRange3/100
          }
        }
      }
    } catch (Err) {
      console.log(`get fee info`, Err);
    }
  }

  getStrategyBalancesFullV2 = async () => {
    const network = store.getStore("network");
    const account = store.getStore("account");
    let assets = this._getDefaultValues(network).vaultAssets;
    store.setStore({ vaultAssets: assets });
    console.log('start time', new Date());
    emitter.emit(STRATEGY_BALANCES_FULL_RETURNED, assets);

    if (!account || !account.address) {
      return false;
    }
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }
    let coinsInUSDPrice = await this.getUSDPrices();
    let assetApiInfo = await this.getAllAssetInformation(networkObj[network]);

    assets.forEach(async (asset, i) => {
      let assetApiData = assetApiInfo.data[asset.id] ? assetApiInfo.data[asset.id]: {};
      // Temp solution
      asset = { ...asset , ...{ totalDepositedAmount: assetApiData.totalDepositedAmount ? assetApiData.totalDepositedAmount : 0 }}
     
      let _promises = [];
      _promises.push(this._getERC20Balances(web3, asset, account, () => {}, coinsInUSDPrice));
      _promises.push(this._getBalances(web3, asset, account, () => {}));
    
      let data = await Promise.all(_promises);

      let newAssetKeys = {
        balance: data[0].data.sumBalances,
        strategyBalance: data[1].data.strategyBalance,
        vaultBalance: data[1].data.vaultBalance,
        earnBalance: data[1].data.earnBalance,
        depositedSharesInUSD: data[1].data.depositedSharesInUSD !== undefined ? data[1].data.depositedSharesInUSD : 0,
        pendingBalance: data[1].data.pendingBalance !== undefined ? data[1].data.pendingBalance : 0,
        stats: {},
        earnApr: 0,
        historicalAPY: [],
        tvl: assetApiData.tvl,
        balances: data[0].data.balances,
        priceInUSD: data[0].data.priceInUSD,
        sumBalances: data[0].data.sumBalances,
        daomineApy: assetApiData.daomineApy,
        pnlTextColor: assetApiData.pnl <0 ? 'red': '#15C73E',
        pnl: assetApiData.pnl || 0,
        asset_distribution: assetApiData.asset_distribution ? assetApiData.asset_distribution : [],
        isDepositEnabled: assetApiData.deposit,
        isWithdrawEnabled: assetApiData.withdraw,
        depositCurrencies: assetApiData.currencies ? assetApiData.currencies.filter(c => c.enabledDeposit === true) : [],
        withdrawCurrencies: assetApiData.currencies? assetApiData.currencies.filter(c => c.enabledWithdraw === true) : []
      }
      asset = {
        ...asset,
        ...newAssetKeys
      }
      assets[i] = asset;
      store.setStore({ vaultAssets: assets });
   
      emitter.emit(STRATEGY_BALANCES_FULL_RETURNED, assets);
      return asset;
    })

  }

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

      const daomineType = store.getStore("daomineType");

      let userPendingDVG = 0;
      if(daomineType === LATEST_POOLS) {
        userPendingDVG = await daoMineContract.methods
          .pendingDVD(poolIndex, account.address)
          .call({from : account.address});
        
      } else if (daomineType === LEGACY_POOLS) {
        const pool = await daoMineContract.methods
          .pool(poolIndex)
          .call({ from: account.address });

        if (pool != null) {
          userPendingDVG = (Number(userDepositInfo.lpAmount) * Number(pool.accDVGPerLP) / 10 ** 18) - Number(userDepositInfo.finishedDVG);
        }
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

  // Important, to indicate which DAOmine used for withdrawal
  updateSelectedPoolType = (payload) => {
    const type = payload.content.type;
    store.setStore({ daomineType: type });
  }

  findDAOminePool = async (payload) => {
    const isNewDAOmine = (payload && payload.content) ? payload.content.isNewVersion : false;

    try {
      const network = store.getStore("network");
      if(!network) {
        console.error(`findDAOminePool() is missing network.`);
        return null;
      }

      const account = store.getStore("account");
      if(!account || !account.address) {
        console.error(`findDAOminePool() is missing account.`);
        return null;
      }

      const web3 = await this._getWeb3Provider();
      if (!web3) {
        console.error(`findDAOminePool() is missing web3.`);
        return null;
      }

      let tokenDecimal = 18;

      console.log(`DAOmine type ${store.getStore("daomineType")}`);
      const daomineType = store.getStore("daomineType");

      const poolResponse = (daomineType === LATEST_POOLS) 
        ? await this._findNewDAOminePool()
        : await this._findDAOminePool();
      const pools = poolResponse.pools;
      emitter.emit(DAOMINE_POOL_RETURNED, pools);
      
      const daoMineContract = await contractHelper.getDAOmineContract(web3, network, daomineType);
  
      async.map(
        pools,
        (pool, callback) => {
          const poolContract = new web3.eth.Contract(
            JSON.parse(pool.abi),
            pool.contract_address
          );

          const obj = {
            poolContract,
            account, 
            daoMineContract, 
            tokenDecimal,
            pool
          };


          this.getDAOmineUserInfo(obj, (err, data) => {
            if(err) {
              callback(err, null);
            }
            if(data) {
              const userInfo = {};

              userInfo.tokenBalance = data[0];
              userInfo.finishedDVG = data[1]
                ? data[1].userDepositInfo.finishedDVG
                : null;
              userInfo.depositedLPAmount = data[1]
                ? parseInt(data[1].userDepositInfo.lpAmount)
                : null;
              userInfo.pendingDVG = data[1] ? data[1].userPendingDVG : null;

              pool.userInfo = userInfo;
              callback(null, pool);
            }
          });
        },
        (err, pools) => {
          emitter.emit(DAOMINE_POOL_RETURNED_COMPLETED);

          if (err) {
            console.log(err);
            return emitter.emit(ERROR, err);
          }
          
          (isNewDAOmine) ? store.setStore({ daominePools: pools }) : store.setStore({ stakePools: pools });
          return emitter.emit(DAOMINE_POOL_RETURNED, pools);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  getDAOmineUserInfo = (obj, callback) => {
    const {
      poolContract,
      account, 
      daoMineContract, 
      tokenDecimal,
      pool, 
    } = obj;

    async.parallel(
      [
        (callbackInner) => {
          this._getUserBalanceForLpToken(poolContract, account, callbackInner);
        },
        (callbackInner) => {
          this._getUserDepositForDAOmine(daoMineContract, tokenDecimal, account, pool.pid, callbackInner);
        }
      ], callback);
  }

  _findDAOminePool = async () => {
    try {
      const url = config.statsProvider + "staking/get-pools";
      const poolsString = await rp(url);
      const pools = JSON.parse(poolsString);
      return pools.body;
    } catch (e) {
      console.err("Error in _findDAOminePool(): ",e);
    }
  };

  _findNewDAOminePool = async() => {
    try {
      const url = config.statsProvider + "staking/get-daomine-pools";
      const poolsString = await rp(url);
      const pools = JSON.parse(poolsString);
      return pools.body;
    } catch (e) {
      console.err("Error in _findNewDAOminePool(): ",e);
    }
  }

  depositDAOmine = async (payload) => {
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      console.error(`Missing Web3 in depositDAOmine()`);
      return null;
    }

    const account = store.getStore("account");
    if(!account || !account.address) {
      console.error(`Missing account in depositDAOmine()`);
      return null;
    }

    const network = store.getStore("network");
    if(!network) {
      console.error(`Missing network in depositDAOmine()`);
      return null;
    }

    emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, true);

    const { pool, amount } = payload.content;
    const daomineType = store.getStore("daomineType");

    const lpTokenContract = new web3.eth.Contract(
      JSON.parse(pool.abi),
      pool.contract_address
    );

    const daoMineContractAddress = contractHelper.getDAOmineAddress(network, daomineType);
    const daoMineContract = await contractHelper.getDAOmineContract(web3, network, daomineType);

    const allowance = await lpTokenContract.methods
      .allowance(account.address, daoMineContractAddress)
      .call({ from: account.address });
    const actualAllowance = allowance / 10 ** pool.decimal;
    console.log(`Checking allowance for ${daoMineContractAddress} in lp token contract ${pool.contract_address}, Actual allowance:  ${actualAllowance}`);

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
            emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, false);
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
      console.log(`Deposit to DAOmine: ${daoMineContractAddress}, amount: ${amount}`);
      await this._callDepositAmountDAOmineContract(
        account,
        pool,
        daoMineContract,
        amount,
        (err, txnHash, depositResult) => {
          if (err) {
            emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, false);
            return emitter.emit(ERROR, err);
          }
          if (txnHash) {
            return emitter.emit(DEPOSIT_DAOMINE_RETURNED, txnHash);
          }
          if (depositResult) {
            emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, false);
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
  };

  _emergencyWithdrawSnapShot = async (userPoolInfo) => {
    try {
      const url = config.statsProvider + "staking/emergency-withdraw-snapshot";
      const poolsString = await rp({
        uri: url,
        method: "POST",
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
  };

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

    emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, true);

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
        });
      };

      await this._getUserDepositForDAOmine(
        daoMineContract,
        null,
        account,
        poolIndex,
        snapshot
      );

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
          emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, false);
          emitter.emit(
            EMERGENCY_WITHDRAW_DAOMINE_RETURNED_COMPLETED,
            receipt.transactionHash
          );
        })
        .on("error", function (error) {
          console.log("emergencyWithdrawDAOmine() Error: ", error);
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, false);
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
  };

  withdrawDAOmine = async (payload) => {
    // Get web3
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      console.error(`Missing web3 in withdrawDAOmine()`);
      return null;
    }

    // Network
    const network = store.getStore("network");
    if(!network) {
      console.error(`Missing network in withdrawDAOmine()`);
      return null;
    }

    // Account
    const account = store.getStore("account");
    if(!account) {
      console.error(`Missing account in withdrawDAOmine()`);
      return null;
    }

    emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, true);

    const { pool, amount } = payload.content;
    const poolDecimal = pool.decimal;
    const poolIndex = pool.pid;

    const daomineType = store.getStore("daomineType");

    try {
      const daoMineContract = await contractHelper.getDAOmineContract(web3, network, daomineType);

      var amountToWithdraw = poolDecimal !== "18"
          ? web3.utils.toBN(amount * 10 ** poolDecimal).toString()
          : web3.utils.toWei(amount, "ether");
      console.log(`Withdraw from : ${daomineType}, Amount: ${amountToWithdraw}, Pool Index: ${poolIndex}`);

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
          emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, false);
          emitter.emit(
            WITHDRAW_DAOMINE_RETURNED_COMPLETED,
            receipt.transactionHash
          );
        })
        .on("error", function (error) {
          console.log("withdrawDAOmine() Error: ", error);
          emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, false);
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
      emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, false);
      console.log("withdrawDAOmine() Error: ", err);
    }
  };

  yieldDAOmine = async (payload) => {
    // Get web3
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      console.error(`Missing web3 in yieldDAOmine()`);
      return null;
    }

    // Network
    const network = store.getStore("network");
    if (!network) {
      console.error(`Missing network in yieldDAOmine()`);
      return null;
    }

    // Account
    const account = store.getStore("account");
    if (!account) {
      console.error(`Missing account in yieldDAOmine()`);
      return null;
    }

    if (!payload || !payload.content || payload.content.pid === undefined) {
      emitter.emit(ERROR, "Missing PID for yieldDAOmine()");
    }

    emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, true);

    const pid = payload.content.pid;
    const daomineType = store.getStore("daomineType");
    const daomineContract = await contractHelper.getDAOmineContract(web3, network, daomineType);

    await daomineContract.methods
      .yield(pid)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (txnHash) {
        return emitter.emit(YIELD_DAOMINE_RETURNED, txnHash);
      })
      .on("receipt", function (receipt) {
        emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, false);
        emitter.emit(
          YIELD_DAOMINE_RETURNED_COMPLETED,
          receipt.transactionHash
        );
      })
      .on("error", function (error) {
        console.log("yieldDAOmine() Error: ", error);
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            emitter.emit(DISABLE_ACTION_BUTTONS_RETURNED, false);
            emitter.emit(ERROR, error.message);
          }
        }
      })
  }

  //stake开始
  //获取vipdvg
  getDvgbalance = async () => {
    const network = store.getStore("network");
    if (!network) {
      console.error(`No network found in getDvgBalance()`);
      return null;
    }
    const account = store.getStore("account");
    if (!account || !account.address) {
      console.error(`No account in getDvgBalance()`);
      return false;
    }
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      console.error(`No web3 in getDvgBalance()`);
      return null;
    }

    const assets = this._getDefaultValues(network).dvg;
    console.log("DVG Assets", assets);

    async.map(
      assets,
      (asset, callback) => {
        async.parallel(
          [
            (callbackInner) => {
              this._getERC20Balance(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              this._getXDvgTier(web3, asset, account, callbackInner);
            },
            (callbackInner) => {
              this._getXDVDApr(web3, asset, assets[1], callbackInner);
            },
          ],
          (err, data) => {
            if (err) {
              return callback(err);
            }
            asset.balance = data[0];
            if (data[1]) {
              asset.tier = data[1]._tier;
              asset.depositedAmount = data[1]._depositedAmount;
            }
            
            asset.apr = data[2];
            callback(null, asset);
          }
        );
      },
      (err, assets) => {
        if (err) {
          console.log(err);
          return emitter.emit(ERROR, err);
        }

        console.log("Final Assets in getDvgbalance()", assets);
        store.setStore({ dvg: assets });
        return emitter.emit(GET_DVG_BALANCE_SUCCESS, assets);
      }
    );
  };

  _getXDvgTier = async (web3, asset, account, callback) => {
    if (asset.id !== "xDVD") {
      return callback(null, null);
    }
    const xDVDContract = new web3.eth.Contract(asset.abi, asset.erc20address);
    const tier = await xDVDContract.methods.getTier(account.address).call();
    return callback(null, tier);
  };

  _getXDVDApr = async (web3, asset, dvd, callback) => {
    if (asset.id !== "xDVD") {
      return callback(null, null);
    }

    const dvdContract = new web3.eth.Contract(dvd.abi, dvd.erc20address);
    const xDVGBalance = await dvdContract.methods.balanceOf(asset.erc20address).call();
    const balance = parseFloat(xDVGBalance) / 10 ** asset.decimals;
    return callback(null, (5500000 * 33.33 / 100 * 12) / (24 * balance) * 100);
  }

  //stake 充值dvg
  depositXdvg = async (payload) => {
    const account = store.getStore("account");

    const { asset, amount, max, withoutConvert } = payload.content;
    
    let autoCompound = payload.content.autoCompound !== undefined 
      ? payload.content.autoCompound
      : false;
   
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }

    //创建dvg合约对象
    const tokenContract = new web3.eth.Contract(asset.abi, asset.erc20address);

    //判断dvg质押金额是否大于dvg授权数量
    const index = asset.id === "DVD" ? 0 : 2;
    const vipTokenInfo = this.getStore("dvg")[index];

    //创建xdvg合约对象
    const vipTokenContract = new web3.eth.Contract(
      vipTokenInfo.abi,
      vipTokenInfo.erc20address
    );
    const allowance = await tokenContract.methods
      .allowance(account.address, vipTokenInfo.erc20address)
      .call({ from: account.address });
    console.log(`Allowance of token to vipToken ${allowance}`);

    let _amount = "";
    if (max) {
      //查询dvg可用
      _amount = await tokenContract.methods
        .balanceOf(account.address)
        .call({ from: account.address });
    } else {
      if (withoutConvert) {
        _amount = amount;
      } else {
        _amount = web3.utils.toWei(amount, "ether");
      }
    }
    console.log(`Amount to deposit into vipToken ${_amount}`);

    let approvalErr = false;
    if (parseFloat(_amount) > parseFloat(allowance)) {
      console.log(`Calling Approval DVG`);
      await this._callDvgApproval(account, amount, (err, txHash, receipt) => {
        if (err) {
          approvalErr = true;
          return emitter.emit(ERROR, err);
        }
        if (txHash) {
          console.log(`Approval Transaction Hash`, txHash);
          return emitter.emit(APPROVAL_DVG_RETURNED, txHash);
        }
        if (receipt) {
          console.log("Approval Receipt", receipt);
          return emitter.emit(
            APPROVAL_DVG_RETURNED_COMPLETED,
            receipt.transactionHash
          );
        }
      });
    }

    if (!approvalErr) {
      console.log(`Calling Deposit DVG`);
      await this._callDepositDvg(vipTokenContract, _amount, autoCompound, (err, txnHash, receipt) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }
        if (txnHash) {
          return emitter.emit(DEPOSIT_DVG_RETURNED, txnHash);
        }
        if (receipt) {
          return emitter.emit(DEPOSIT_DVG_RETURNED_COMPLETED, receipt.transactionHash);
        }
      });
    }
  };

  _callDepositDvg = async (vipTokenContract, amount, autoCompound, callback) => {
    const account = this.getStore("account");
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }

    await vipTokenContract.methods
      .deposit(amount)
      .send({
        from: account.address,
      })
      .on("transactionHash", function (hash) {
        console.log("Deposit vipToken Transaction Hash: ", hash);
        callback(null, hash, null);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
      })
      .on("receipt", function (receipt) {
        console.log("Deposit vipToken receipt: ", receipt);
        callback(null, null, receipt);
      })
      .on("error", function (error) {
        console.error("Error in Deposit vipToken: ", error);
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message, null, null);
          }
          callback(error, null, null);
        }
      })
      .catch((error) => {
        console.error("Error in Deposit vipToken: ", error);
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message, null, null);
          }
          callback(error, null, null);
        }
      });
  };

  _callDvgApproval = async (account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    let asset = store.getStore("dvg")[1]; //dvd
    let xdvg = store.getStore("dvg")[0]; //xdvg
    let dvgContract = new web3.eth.Contract(asset.abi, asset.erc20address);
    await dvgContract.methods
      .approve(xdvg.erc20address, web3.utils.toWei("999999999999", "ether"))
      .send({
        from: account.address,
      })
      .on("transactionHash", function (hash) {
        console.log("Transaction hash for dvd approval: ", hash);
        callback(null, hash, null);
      })
      .on("receipt", function (receipt) {
        console.log("Receipt for dvd approval: ", receipt);
        callback(null, null, receipt);
      })
      .on("error", function (error) {
        console.error("Error in getting dvd contract approval: ", error);
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

    this._callWithdrawXdvg(
      asset,
      amount,
      max,
      (err, txnHash, withdrawResult) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }
        if (txnHash) {
          return emitter.emit(WITHDRAW_DVG_RETURNED, txnHash);
        }
        if (withdrawResult) {
          return emitter.emit(
            WITHDRAW_DVG_RETURNED_COMPLETED,
            withdrawResult.transactionHash
          );
        }
        // dispatcher.dispatch({ type: GET_DVG_INFO })
        // return emitter.emit(WITHDRAW_DVG_RETURNED, withdrawResult);
      }
    );
  };

  _callWithdrawXdvg = async (asset, amount, max, callback) => {
    const account = this.getStore("account");
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }

    //创建xdvg合约对象
    const xDVGCOntract = new web3.eth.Contract(asset.abi, asset.erc20address);
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
        callback(null, hash, null);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
        callback(null, null, receipt);
        // dispatcher.dispatch({ type: GET_DVG_INFO });
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

  getDvgApr = async (payload) => {
    const { type } = payload.content;

    if (type === "") {
      console.err("type is missing in payload content of getDvgApr()");
      return;
    }
    const apr = await this._getDvgApr(type);

    let dvgApr = store.getStore("dvgApr");
    dvgApr[type] = apr;
    store.setStore({ dvgApr });

    return emitter.emit(GET_XDVG_APR_SUCCESS);
  };

  _getDvgApr = async (type) => {
    try {
      const url = config.statsProvider + `staking/get-${type}-stake`;
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
      asset.strategyType === "daoFaang" ||
      asset.strategyType === "moneyPrinter" ||
      asset.strategyType === "metaverse" || 
      asset.strategyType === "citadelv2" ||
      asset.strategyType === "daoStonks"
      ? true
      : false;
  };

  getUpgradeToken = async () => {
    const network = store.getStore("network");
    const account = store.getStore("account");
    const asset = this._getDefaultValues(network).upgradeToken;
    if (!account || !account.address) {
      return false;
    }
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }
    async.parallel(
      [
        (callbackInner) => {
          this._getERC20Balance(web3, asset.dvg, account, callbackInner);
        },
        (callbackInner) => {
          this._getERC20Balance(web3, asset.dvd, account, callbackInner);
        },
        (callbackInner) => {
          this._getReimburseInfo(account.address.toLowerCase(), callbackInner);
        },
      ],
      (err, data) => {
        if (err) {
          console.log(err);
          return emitter.emit(ERROR, err);
        }
        asset.balance = data[0];
        asset.upgradeBalance = data[1];
        asset.claimAmountRaw =
          data[2] != null && data[2].claimAmount ? data[2].claimAmount : "0.00";
        asset.claimAmount =
          data[2] != null && data[2].claimAmount
            ? data[2].claimAmount / 10 ** asset.dvg.decimals
            : "0.00";
        asset.eligibleAmountRaw =
          data[2] != null && data[2].amount ? data[2].amount : "0.00";
        asset.eligibleAmount =
          data[2] != null ? data[2].amount / 10 ** asset.dvg.decimals : 0;
        // asset.disableUpgrade = false;

        // if (asset.claimAmount !== "0.00") {
        //   if (asset.claimAmount < asset.eligibleAmount) {
        //     asset.eligibleAmount  = asset.eligibleAmount - asset.claimAmount;
        //     asset.eligibleAmountRaw = new BigNumber(asset.eligibleAmountRaw).minus(asset.claimAmountRaw).toFixed();
        //     asset.disableUpgrade = false;
        //   }

        //   if (asset.claimAmount >= asset.eligibleAmount) {
        //     asset.eligibleAmount = 0;
        //     asset.eligibleAmountRaw = "0.00";
        //     asset.disableUpgrade = true;
        //   }
        // } else {
        //   if (asset.eligibleAmount === 0) {
        //     asset.disableUpgrade = true;
        //   } else {
        //     asset.disableUpgrade = false;
        //   }
        // }

        // If DVG Balance is zero, disable button
        // asset.disableUpgrade = (!asset.disableUpgrade && asset.balance <= 0) ? true : asset.disableUpgrade;
        asset.disableUpgrade = asset.balance <= 0;

        store.setStore({
          upgradeInfo: asset,
        });
        return emitter.emit(GET_UPGRADE_TOKEN_RETURN, asset);
      }
    );
  };

  _getReimburseInfo = async (address, callback) => {
    try {
      const url = config.statsProvider + "user/reimburse-address/" + address;
      const reimburseInfo = await rp(url);
      if (callback) {
        return callback(null, JSON.parse(reimburseInfo).body);
      } else {
        return JSON.parse(reimburseInfo).body;
      }
    } catch (e) {
      console.log(e);
      return store.getStore("universalGasPrice");
    }
  };

  _updateReimburseInfo = async (info) => {
    try {
      const url = config.statsProvider + "user/reimburse-address/update";
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      };
      const response = await fetch(url, requestOptions);
      const result = await response.json();
    } catch (e) {
      console.log("Error in _updateReimburseInfo", e);
    }
  };

  upgradeToken = async (isStake) => {
    const network = store.getStore("network");
    const account = store.getStore("account");
    const upgradeInfo = store.getStore("upgradeInfo");
    const asset = this._getDefaultValues(network).upgradeToken;
    if (!account || !account.address) {
      return false;
    }
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }

    const reimburse = await this._getReimburseInfo(
      account.address.toLowerCase()
    );
    if (reimburse == null) {
      return emitter.emit(
        ERROR,
        "Your DVG are not eligible for upgrade. Please contact us via Telegram/Discord."
      );
    } else {
      const dvgContract = new web3.eth.Contract(
        asset.dvg.erc20ABI,
        asset.dvg.erc20address
      );

      const dvdContract = new web3.eth.Contract(
        asset.dvd.erc20ABI,
        asset.dvd.erc20address
      );

      const dvgAllowance = await dvgContract.methods
        .allowance(account.address, asset.swapAddress)
        .call({ from: account.address });
      const dvgActualAllowance = dvgAllowance;

      const dvdAllowance = await dvdContract.methods
        .allowance(account.address, asset.swapAddress)
        .call({ from: account.address });
      const dvdActualAllowance = dvdAllowance;

      const balance = await dvgContract.methods
        .balanceOf(account.address)
        .call({ from: account.address });

      // Approval
      let dvgApprovalError;
      let dvdApprovalError;

      // DAO -228 Allow User to swap all DVG to DVD at 1.1 ratio
      // const realBalance = new BigNumber(balance).isGreaterThan(upgradeInfo.eligibleAmountRaw) ? upgradeInfo.eligibleAmountRaw : balance;
      const realBalance = balance;

      if (parseFloat(realBalance) > parseFloat(dvgActualAllowance)) {
        await this._checkLpTokenContractApproval(
          account,
          dvgContract,
          asset.swapAddress,
          0,
          (err, txnHash, approvalResult) => {
            if (err) {
              console.log(err);
              dvgApprovalError = err;
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

      if (parseFloat(realBalance) > parseFloat(dvdActualAllowance)) {
        await this._checkLpTokenContractApproval(
          account,
          dvdContract,
          asset.swapAddress,
          0,
          (err, txnHash, approvalResult) => {
            if (err) {
              console.log(err);
              dvdApprovalError = err;
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

      if (!dvgApprovalError && !dvdApprovalError) {
        const swapContract = new web3.eth.Contract(
          asset.swapContractAbi,
          asset.swapAddress
        );

        let swapErr = false;

        await swapContract.methods
          .upgradeDVG(realBalance, reimburse.amount, reimburse.signatureMessage)
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
          })
          .on("transactionHash", function (txnHash) {
            return emitter.emit(UPGRADE_TOKEN_RETURN, txnHash);
          })
          .on("receipt", function (receipt) {
            return emitter.emit(UPGRADE_TOKEN_SUCCESS, receipt.transactionHash);
          })
          .on("error", function (error) {
            if (!error.toString().includes("-32601")) {
              swapErr = true;
              if (error.message) {
                return emitter.emit(ERROR, error.message);
              }
              return emitter.emit(ERROR, error);
            }
          })
          .then(async () => {
            if (!swapErr) {
              await this._updateReimburseInfo({
                address: account.address,
                amount: realBalance,
              });
              store.setStore({
                realBalance,
              });
            }
          })
          .catch((error) => {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return emitter.emit(ERROR, error.message);
              }
              return emitter.emit(ERROR, error);
            }
          });
      }
    }
  };

  upgradeAndStakeToken = async (payload) => {
    const network = store.getStore("network");
    const account = store.getStore("account");

    const asset = this._getDefaultValues(network).upgradeToken;
    if (!account || !account.address) {
      return false;
    }
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }

    store.setStore({ dvg: this._getDefaultValues(network).dvg });

    await this.upgradeToken(true);

    const realBalance = store.getStore("realBalance");
    if (!isNaN(realBalance)) {
      await this.depositXdvg({
        content: {
          asset: {
            id: "DVD",
            abi: asset.dvd.erc20ABI,
            ...asset.dvd,
          },
          amount: realBalance,
          max: false,
          withoutConvert: true,
          autoCompound: false
        }
      });
    } else {
      return emitter.emit(
        ERROR,
        "Failed to upgrade to DVD token to stake into DAOvip (DVD)."
      );
    }
  };

  _getAirdropInfo = async(address) => {
    try {
      const network = store.getStore("network");
      const airdropContractInfo = this._getDefaultValues(network).airdrop;
      const airdropAddress = airdropContractInfo.address;
   
      const result = await apiHelper.getAirDropInfo(address, airdropAddress);
      this.setStore({ airdropInfo: result.result.info });
      console.log(`get airdrop info: `, this.getStore("airdropInfo"));
      return result;
    } catch(err) {
      console.error(`Error in _getAirdropInfo(): `, err);
    }
  } 

  checkIsAllDVDBeingClaimed = async() => {
    let isAllDVDBeingClaimed = true;

    try {
      const network = store.getStore("network");
      if(!network || network === undefined) {
        throw new Error(`Missing network`);
      }

      const web3 = await this._getWeb3Provider();
      if(!web3 || web3 === undefined) {
        throw new Error(`Missing web 3`);
      } 
     
      const dvdContractInfo = this._getDefaultValues(network).dvg[1];
      const airdropContractInfo = this._getDefaultValues(network).airdrop;

      const dvdContract = contractHelper.getContract(web3, dvdContractInfo.abi, dvdContractInfo.erc20address);
      
      const dvdBalanceOfAirdropContract = await dvdContract.methods.balanceOf(airdropContractInfo.address).call();
     
      // If there's remaining amount of DVD
      if(parseFloat(dvdBalanceOfAirdropContract) > 0) {
        isAllDVDBeingClaimed = false;
      }
    } catch (err) {
      console.error(`Error in checkIsAllDVDBeingClaimed(): `, err);
    } finally {
      return isAllDVDBeingClaimed;
    }
  }

  processedAirdrops = async() => {
    let isClaimed = false;

    try {
      const web3 = await this._getWeb3Provider();
      if(!web3 || web3 === undefined) {
        throw new Error(`Missing web 3`);
      }
  
      const account = store.getStore("account");
      if(!account || account === undefined) {
        throw new Error(`Missing account`);
      }

      const network = store.getStore("network");
      const supportedNetwork = [ NETWORK.ETHEREUM, NETWORK.KOVAN ];

      if(!network || network === undefined) {
        throw new Error(`Missing network`);
      }
      if(!supportedNetwork.includes(network)) {
        throw new Error(`Network not supported`);
      }

      const { address , abi } = this._getDefaultValues(network).airdrop;
      const contract = await contractHelper.getContract(web3, abi, address);

      isClaimed = await contract.methods.processedAirdrops(account.address).call();
    } catch (err) {
      console.error(`Error in processedAirdrops(): `, err);
    } finally {
      return isClaimed;
    }
  }

  claimTokens = async() => {
    const network = store.getStore("network");
    const account = store.getStore("account");

    const airdropContractInfo = this._getDefaultValues(network).airdrop;

    if(!account || !account.address) {
      return false;
    }
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      return null;
    }

    const contract = new web3.eth.Contract(
      airdropContractInfo.abi,
      airdropContractInfo.address
    );
    
    const airdropInfo = store.getStore("airdropInfo");
    const { amount, signature, address } = airdropInfo;

    await contract.methods.claimTokens(address, amount, signature)
    .send({
      from: account.address,
      gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei")
    })
    .on("transactionHash", function(transactionHash) {
      console.log(`Transaction hash produced`);
      return emitter.emit(CLAIM_DVD_HASH, transactionHash);
    })
    .on("receipt", function(receipt) {
      console.log(`Receipt for claim DVD Token`, receipt);
      return emitter.emit(CLAIM_DVD_SUCCESS, receipt.transactionHash);
    })
    .on("error", function(error) {
      return emitter.emit(CLAIM_DVD_ERROR, error.message);
    })
  }

  /** PD33D Redeemer */

  getBalance = async(tokenAddress, account) => {
    const web3 = await this._getWeb3Provider();
    if(!web3) {
      console.error(`No web3 in getDvgBalance()`);
      return null;
    }
   
    try {
      const network = store.getStore("network");
      const abi = contractHelper.getERC20AbiByNetwork(network);

      const contract = new web3.eth.Contract(
        abi,
        tokenAddress
      );

      const balanceRaw = await contract.methods.balanceOf(account.address).call();

      const decimals = await contract.methods.decimals().call();

      const balance = web3.utils.fromWei(balanceRaw, PARSE_UNITS[decimals]);

      return { balanceRaw, decimals, balance, tokenAddress };

    } catch (err) {
      console.error(`Error in getBalance() : `, err);
    }
  }

  getAllowance = async(tokenAddress) => {
    const web3 = await this._getWeb3Provider();
    if(!web3) {
      console.error(`No web3 in getDvgBalance()`);
      return null;
    }
   
    try {
      const network = store.getStore("network");

      const abi = contractHelper.getERC20AbiByNetwork(network);

      const contract = new web3.eth.Contract(
        abi,
        tokenAddress
      );

      const asset = this._getDefaultValues(network).redeemPD33D;
      const redeemer = asset.pD33dRedeemer;

      const allowanceRaw = await contract.methods.allowance(redeemer).call();

      const decimals = await contract.methods.decimals().call();

      const allowance = web3.utils.fromWei(allowanceRaw, PARSE_UNITS[decimals]);

      return { allowanceRaw, allowance };

    } catch (err) {
      console.error(`Error in getAllowance() : `, err);
    }
  }
  
  getUserPD33DInfo = async() => {
    const network = store.getStore("network");
    const account = store.getStore("account");
    if(!account || account === undefined) {
      return false;
    }

    // Returned 0 for wrong network
    const supportedNetwork = REDEEM_SUPPORTED_NETWORK;
    if(!supportedNetwork.includes(network)) {
      const balance = {balanceRaw : 0, decimals: 0, balance: 0, tokenAddress: "" };

      return {
        token: balance,
        vipToken: balance,
      }
    }

    let assets = this._getDefaultValues(network).redeemPD33D;
  
    let _promises = [];
    _promises.push(this.getBalance(assets.dvd, account));
    _promises.push(this.getBalance(assets.xDvd, account));

    let [ dvdBalance, xDvdBalance ] = await Promise.all(_promises);
    
    return {
      token: dvdBalance, 
      vipToken: xDvdBalance,
    }
  }

  getRedeemerContract = async () => {
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      console.error(`No web3 found`);
      return;
    }

    const network = store.getStore("network");

    // Create Redeemer contract
    let assets = this._getDefaultValues(network).redeemPD33D;
    const { pD33dRedeemerAbi: abi, pD33dRedeemer: address } = assets;

    const redeemerContract = new web3.eth.Contract(
      abi,
      address
    );

    return redeemerContract;
  }

  calculateForPD33D = async(payload) => {
    let { amount, isVipToken } = payload;
   
    const web3 = await this._getWeb3Provider();
    if (!web3) {
      console.error(`No web3 found`);
      return;
    }

    if(!amount || amount === undefined) {
      console.error(`Amount is missing for calculate PD33D.`);
      return ;
    }

    // Create redeemer contract
    const redeemerContract = await this.getRedeemerContract();

    const methodName = isVipToken
      ? "calcForVipDVD"
      : "calcpD33d";

    amount = fromExponential(amount);

    try {
      const expectedPTokenAmountRaw = await redeemerContract.methods[methodName](amount).call();
      
      const expectedPTokenAmount = web3.utils.fromWei(expectedPTokenAmountRaw, PARSE_UNITS[18]);

      return { pTokenAmountRaw: expectedPTokenAmountRaw, pTokenAmount: expectedPTokenAmount };
  
    } catch(err) {
      console.error(err);
    }
  }

  redeemPToken = async(payload) => {
    const { amount, isVipToken } = payload;

    if(!amount || amount === undefined) {
      console.error(`Amount is missing for redeem PD33D.`);
      return ;
    }

    const web3 = await this._getWeb3Provider();
    if (!web3) {
      console.error(`No web3 found`);
      return;
    }

    const account = store.getStore("account");
    if (!account) {
      console.error(`No account found`);
      return;
    }

    const finalAmount = web3.utils.toWei(web3.utils.toBN(amount), PARSE_UNITS(18));

    // Create redeemer contract
    const redeemerContract = await this.getRedeemerContract();

    const methodName = isVipToken
      ? "redeemVipDVD"
      : "redeemDVD";

    try {
        await redeemerContract.methods[methodName](finalAmount)
          .send({
            from: account.address
          })
          .on("transactionHash", function (txnHash) {
            console.log(`Transaction hash generated `, txnHash);
            return emitter.emit(REDEEM_PTOKEN_HASH, txnHash);
          })
          .on("receipt", function (receipt) {
            console.log(receipt);
            return emitter.emit(REDEEM_PTOKEN_SUCCESS, receipt);
          })
          .on("error", function (error) {
            console.error(error);
            return emitter.emit(REDEEM_PTOKEN_ERROR, error);
          });
    } catch(err) {
        console.error(err);
    }
  }


  getApproval = async(tokenAddress) => {
    const web3 = await this._getWeb3Provider();
    if(!web3) {
      console.error(`No web3 in getApproval()`);
      return null;
    }

    const account = await store.getStore("account");
    if(!account) {
      console.error(`No web3 in getApproval()`);
      return null;
    }
   
    try {
      const network = store.getStore("network");

      const abi = contractHelper.getERC20AbiByNetwork(network);

      const tokenContract = new web3.eth.Contract(
        abi,
        tokenAddress
      );

      const approveAmount = web3.utils.toWei("999999999999", PARSE_UNITS[18]);

      await tokenContract.methods.approve(approveAmount)
        .send({
          from: account.address
        })
        .on("transactionHash", function (txnHash) {
          console.log(`Transaction hash generated `, txnHash);
          return emitter.emit(APPROVE_PTOKEN_HASH, txnHash);
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
          return emitter.emit(APPROVE_PTOKEN_SUCCESS, receipt);
        })
        .on("error", function (error) {
          console.error(error);
          return emitter.emit(APPROVE_PTOKEN_ERROR, error);
        });

    } catch (err) {
      console.error(`Error in getApproval() : `, err);
    }
  }


}

var store = new Store();

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter,
};
