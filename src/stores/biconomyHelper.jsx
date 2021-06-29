import {
  Biconomy,
  HTTP_CODES,
  PermitClient,
  RESPONSE_CODES,
} from "@biconomy/mexa";

import Web3 from "web3";
import config from "../config";

// Return Happy Hour API Key based on network
const getBiconomyHappyHourAPIKey = (networkId) => {
  const apiKeys = {
    1: process.env.REACT_APP_BICONOMY_HAPPY_HOUR_MAINNET_API_KEY,
    42: process.env.REACT_APP_BICONOMY_HAPPY_HOUR_KOVAN_API_KEY,
  };
  return apiKeys[networkId];
};

// Return ERC20Payment API Key based on network
const getBiconomyERC20PaymentAPIKey = (networkId) => {
  const apiKeys = {
    1: process.env.REACT_APP_BICONOMY_ERC20_MAINNET_API_KEY,
    42: process.env.REACT_APP_BICONOMY_ERC20_KOVAN_API_KEY,
  };
  return apiKeys[networkId];
};

// ===== Biconomy Providers =====

// Returns Biconomy Happy Hour Provider
const getBiconomyHappyHourProvider = async (web3Provider) => {
  const networkId = await web3Provider.eth.net.getId();
  const apiKey = await getBiconomyHappyHourAPIKey(networkId);
  const biconomy = new Biconomy(web3Provider.eth.currentProvider, {
    apiKey: apiKey,
    debug: true,
  });

  return biconomy;
};

// Returns Biconomy ERC20Payment Provider
const getBiconomyERC20PaymentProvider = async (web3Provider) => {
  const networkId = await web3Provider.eth.net.getId();
  const apiKey = getBiconomyERC20PaymentAPIKey(networkId);
  const biconomyHappyHourProvider = new Biconomy(web3Provider, {
    apiKey: apiKey,
    debug: true,
  });
  return biconomyHappyHourProvider;
};

// ===== Biconomy WEB3 Instances =====

const getBiconomyHappyHourWeb3Instance = async (biconomyProvider) => {
  const biconomyWeb3 = new Web3(biconomyProvider);
  return biconomyWeb3;
};

const getBiconomyERC20PaymentWeb3Instance = async (biconomyProvider) => {
  const biconomyWeb3 = new Web3(biconomyProvider);
  return biconomyWeb3;
};

// ===== Contracts =====

// Returns Citadel Happy Hour Contract
const getCitadelHappyHourContract = async (
  biconomyWeb3,
  citadelABI,
  citadelAddress
) => {
  const biconomyContract = new biconomyWeb3.eth.Contract(
    citadelABI,
    citadelAddress
  );

  return biconomyContract;
};

// Returns Citadel ERC20Payment Contract
const getCitadelERC20PaymentContract = async (
  biconomyWeb3,
  citadelABI,
  citadelAddress
) => {
  const biconomyContract = new biconomyWeb3.eth.Contract(
    citadelABI,
    citadelAddress
  );

  return biconomyContract;
};

// ===== Contract Calls =====

export const callCitadelHappyHourDeposit = async (
  web3Provider,
  asset,
  account,
  amount,
  tokenIndex = null,
  callback
) => {
  const biconomy = await getBiconomyHappyHourProvider(web3Provider);
  const biconomyWeb3 = await getBiconomyHappyHourWeb3Instance(web3Provider);

  biconomy
    .onEvent(biconomy.READY, async () => {
      console.log("HAPPYHOUR is Ready");
      const contract = await getCitadelHappyHourContract(
        biconomyWeb3,
        asset.vaultContractABI,
        asset.vaultContractAddress
      );

      let erc20Contract = new biconomyWeb3.eth.Contract(
        config.erc20ABI,
        asset.erc20addresses[tokenIndex]
      );

      let decimals = await erc20Contract.methods.decimals().call();

      var amountToSend = biconomyWeb3.utils
        .toBN(amount * 10 ** decimals)
        .toString();

      let tx = await contract.methods
        .deposit(amountToSend, tokenIndex)
        .send({
          from: account.address,
          signatureType: "EIP712_SIGN",
          //optionally you can add other options like gasLimit
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
    })
    .onEvent(biconomy.ERROR, (error, message) => {
      console.error(error);
    });
};

// ===== Utility =====

const executeMetaTransaction = async (
  web3Provider,
  contract,
  functionSignature,
  callback
) => {
  const accounts = await web3Provider.eth.getAccounts();

  // Initialize constants
  const domainType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "verifyingContract", type: "address" },
    { name: "salt", type: "bytes32" },
  ];
  const metaTransactionType = [
    { name: "nonce", type: "uint256" },
    { name: "from", type: "address" },
    { name: "functionSignature", type: "bytes" },
  ];
  // replace the chainId 42 if network is not kovan
  let domainData = {
    name: "TestContract",
    version: "1",
    verifyingContract: contract.address,
    // converts Number to bytes32. pass your chainId instead of 42 if network is not Kovan
    salt: "0x" + (42).toString(16).padStart(64, "0"),
  };

  let userAddress = accounts[0];

  let nonce = await contract.methods.getNonce(userAddress).call();
  let message = {};
  message.nonce = parseInt(nonce);
  message.from = userAddress;
  message.functionSignature = functionSignature;
  const dataToSign = JSON.stringify({
    types: {
      EIP712Domain: domainType,
      MetaTransaction: metaTransactionType,
    },
    domain: domainData,
    primaryType: "MetaTransaction",
    message: message,
  });
  web3Provider.eth.currentProvider.send(
    {
      jsonrpc: "2.0",
      id: 999999999999,
      method: "eth_signTypedData_v4",
      params: [userAddress, dataToSign],
    },
    function (error, response) {
      // Check github repository for getSignatureParameters helper method
      let { r, s, v } = getSignatureParameters(response.result);
      let tx = contract.methods
        .executeMetaTransaction(userAddress, functionSignature, r, s, v)
        .send({ from: userAddress });

      tx.on("transactionHash", function (txnHash) {
        console.log(txnHash);
        callback(null, txnHash, null);
      })
        .once("confirmation", function (receipt) {
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
    }
  );
};

const getSignatureParameters = (signature) => {
  if (!Web3.utils.isHexStrict(signature)) {
    throw new Error("Given value", signature, " is not a valid hexstring.");
  }
  var r = signature.slice(0, 66);
  var s = "0x".concat(signature.slice(66, 130));
  var v = "0x".concat(signature.slice(130, 132));
  v = Web3.utils.hexToNumber(v);
  if (![27, 28].includes(v)) v += 27;
  return {
    r: r,
    s: s,
    v: v,
  };
};

const callCitadelERC20PaymentDeposit = async (
  web3Provider,
  citadelABI,
  citadelAddress,
  amount,
  tokenIndex = null,
  callback
) => {
  const contract = await getCitadelERC20PaymentContract();
};
