import { NETWORK } from '../../constants/constants';
import config from "../../config/config";

export const getERC20AbiByNetwork = (network) => {
    if(network === NETWORK.ETHEREUM || network === NETWORK.KOVAN) {
      return config.erc20ABI;
    } else if (network === NETWORK.MATIC || network === NETWORK.MUMBAI) {
      return config.polygonERC20Abi;
    }
}