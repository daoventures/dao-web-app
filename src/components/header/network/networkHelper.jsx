import { NETWORK } from "../../../constants/constants";
import ETHEREUM from '../../../assets/img_new/network/ethereum.svg';
import ARBITRUM from '../../../assets/img_new/network/arbitrum.png';
import AVALANCHE from '../../../assets/img_new/network/avalanche.png';
import BSC from '../../../assets/img_new/network/bsc.png';
import FANTOM from '../../../assets/img_new/network/fantom.png';
import POLYGON from '../../../assets/img_new/network/polygon.png';

export const supportedNetworks = {
    [NETWORK.ETHEREUM]: {
        chainId: '0x1',
        chainName: 'Ethereum',
        nativeCurrency: {
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: ['https://mainnet.infura.io/v3'],
        blockExplorerUrls: ['https://etherscan.com'] 
    },
    [NETWORK.MATIC]: {
        chainId: '0x89',
        chainName: 'Matic',
        nativeCurrency: {
          name: 'Matic',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://rpc-mainnet.maticvigil.com'], // ['https://matic-mainnet.chainstacklabs.com/'],
        blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com'],
    },
    [NETWORK.AVALANCHEMAIN]: {
        chainId: '0xA86A',
        chainName: 'Avalanche',
        nativeCurrency: {
        name: 'Avalanche Token',
        symbol: 'AVAX',
        decimals: 18,
        },
        rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
        blockExplorerUrls: ['https://cchain.explorer.avax.network'],
    },
    // [NETWORK.ARBITRUMMAIN]: {
    //     chainId: '0xA4B1',
    //     chainName: 'Arbitrum',
    //     nativeCurrency: {
    //       name: 'Ethereum',
    //       symbol: 'ETH',
    //       decimals: 18,
    //     },
    //     rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    //     blockExplorerUrls: ['https://mainnet-arb-explorer.netlify.app'],
    // },
    [NETWORK.BSCMAINNET]: {
        chainId: '0x38',
        chainName: 'Binance Smart Chain',
        nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed.binance.org'],
        blockExplorerUrls: ['https://bscscan.com'],
    },
    // [NETWORK.FANTOMMAINNET] : {
    //     chainId: '0xfa',
    //     chainName: 'Fantom',
    //     nativeCurrency: {
    //     name: 'Fantom',
    //     symbol: 'FTM',
    //     decimals: 18,
    //     },
    //     rpcUrls: ['https://rpcapi.fantom.network'],
    //     blockExplorerUrls: ['https://ftmscan.com'],
    // }
}

export const getNetworkIcon = (network) => {
    network = parseFloat(network);
    switch(network) {
        case NETWORK.ETHEREUM:
        case NETWORK.KOVAN: 
            return ETHEREUM;
        case NETWORK.MATIC:
        case NETWORK.MUMBAI: 
            return POLYGON;
        case NETWORK.BSCMAINNET:
        case NETWORK.BSCTEST:
            return BSC;
        case NETWORK.FANTOMMAINNET:
        case NETWORK.FANTOMTEST: 
            return FANTOM;
        case NETWORK.AVALANCHEMAIN:
        case NETWORK.AVALANCHETEST:
            return AVALANCHE;
        case NETWORK.ARBITRUMMAIN:
        case NETWORK.ARBITRUMTEST:
            return ARBITRUM;
        default:
            break;
    }
} 

export const switchNetwork = async (network) => {
    const selectedNetwork = supportedNetworks[network];
    const chainId = selectedNetwork.chainId;

    const ethereum = window.ethereum;

    try {
        const result = await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainId }],
        });
        console.log(`Result for switching network`, result);
    } catch (swithError) {
        // This error code indicates that the chain has not been added to Metamask
        if(swithError.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [selectedNetwork],
                });
            } catch (addError) {
                console.error(addError);
            }
        }
    }

}