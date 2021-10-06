import {
  LATEST_POOLS, 
  NETWORK 
} from '../../constants/constants';
import config from "../../config/config";
// import Store from "../../stores";

// const store = Store.store;
class ContractHelper {

  static getERC20AbiByNetwork = (network) => {
    if(network === NETWORK.ETHEREUM || network === NETWORK.KOVAN) {
      return config.erc20ABI;
    } else if (network === NETWORK.MATIC || network === NETWORK.MUMBAI) {
      return config.polygonERC20Abi;
    } else if (network === NETWORK.BSCTEST || network === NETWORK.BSCMAINNET) {
      return config.bscERC20Abi;
    }
  }

  static getContract = (web3, abi, address) => {
    return new web3.eth.Contract(abi, address);
  }

  // DAOmine
  static getDAOmineAddress = (network, daomineType) => {
    if(network === NETWORK.KOVAN) {
      return (daomineType === LATEST_POOLS) ? config.daomineTestContract : config.daoStakeTestContract;
    } else if (daomineType === NETWORK.ETHEREUM) {
      return (daomineType === LATEST_POOLS) ? config.daomineMainnetContract : config.daoStakeMainnetContract;
    }
  }

  static getDAOmineABI = (daomineType) => {
    return (daomineType === LATEST_POOLS) ? config.daomineContractABI : config.daoStakeContractABI;
  }

  static getDAOmineContract = async (web3, network, daomineType) =>  {
    const address = this.getDAOmineAddress(network, daomineType);
    const abi = this.getDAOmineABI(daomineType);
    return this.getContract(web3, abi, address);
  }
}

export default ContractHelper;