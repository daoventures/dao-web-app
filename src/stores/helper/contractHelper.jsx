import { NETWORK } from '../../constants/constants';
import config from "../../config/config";
// import Store from "../../stores";

// const store = Store.store;
class ContractHelper {

  static getERC20AbiByNetwork = (network) => {
    if(network === NETWORK.ETHEREUM || network === NETWORK.KOVAN) {
      return config.erc20ABI;
    } else if (network === NETWORK.MATIC || network === NETWORK.MUMBAI) {
      return config.polygonERC20Abi;
    }
  }
}

export default ContractHelper;