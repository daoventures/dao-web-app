import Onboard from 'bnc-onboard'

const FORTMATIC_KEY = "Your Fortmatic key here"
const PORTIS_KEY = "Your Portis key here"
const INFURA_KEY = "Your Infura key here"
const APP_URL = "Your app url here"
const CONTACT_EMAIL = "Your contact email here"
const RPC_URL = "https://<network>.infura.io/v3/<INFURA_KEY>"
const APP_NAME = "Your app name here"

const wallets = [
  { walletName: "coinbase", preferred: true },
  { walletName: "trust", preferred: true, rpcUrl: RPC_URL },
  { walletName: "metamask", preferred: true },
  { walletName: "authereum" },
  {
    walletName: 'trezor',
    appUrl: APP_URL,
    email: CONTACT_EMAIL,
    rpcUrl: RPC_URL
  },
  {
    walletName: 'ledger',
    rpcUrl: RPC_URL
  },
  {
    walletName: 'lattice',
    rpcUrl: RPC_URL,
    appName: APP_NAME
  },
  { 
    walletName: 'cobovault',
    rpcUrl: RPC_URL,
    appName: APP_NAME,
  },
  {
    walletName: "fortmatic",
    apiKey: FORTMATIC_KEY,
    preferred: true
  },
  {
    walletName: "portis",
    apiKey: PORTIS_KEY,
    preferred: true,
    label: 'Login with Email'
  },
  {
    walletName: "walletConnect",
    infuraKey: INFURA_KEY
  },
  { walletName: "opera" },
  { walletName: "operaTouch" },
  { walletName: "torus" },
  { walletName: "status" },
  { walletName: "walletLink", rpcUrl: RPC_URL, appName: APP_NAME },
  { walletName: "imToken", rpcUrl: RPC_URL },
  { walletName: "meetone" },
  { walletName: "mykey", rpcUrl: RPC_URL },
  { walletName: "huobiwallet", rpcUrl: RPC_URL },
  { walletName: "hyperpay" },
  { walletName: "wallet.io", rpcUrl: RPC_URL },
  { walletName: "atoken" },
  { walletName: "frame" },
  { walletName: "ownbit" },
  { walletName: "alphawallet" }
]

export const onboard = Onboard({
  //... other options
  dappId: '12153f55-f29e-4f11-aa07-90f10da5d778',
  networkId: 1,
  walletSelect: {
    wallets: wallets,
  },
});

export function initOnboard(subscriptions) {
  return Onboard({
    dappId: '12153f55-f29e-4f11-aa07-90f10da5d778',
    networkId: 1,
    subscriptions,
    walletSelect: {
      wallets: wallets,
    },
    walletCheck: [
      {checkName: 'derivationPath'},
      {checkName: 'connect'},
      {checkName: 'accounts'},
      {checkName: 'network'},
      {checkName: 'balance', minimumBalance: '100000'},
    ],
  });
}