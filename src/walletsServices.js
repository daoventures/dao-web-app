import Onboard from 'bnc-onboard'

const FORTMATIC_KEY = "pk_live_667D401F33A1C2AE"
const PORTIS_KEY = "38343b3e-dc6a-45c2-b525-8a32f6101c72"
const INFURA_KEY = "83833d00ec5c4c6a858c199e83a5b411"
const APP_URL = "https://app.daoventures.co"
const CONTACT_EMAIL = "support@daoventures.co"
const RPC_URL = "https://main.infura.io/v3/83833d00ec5c4c6a858c199e83a5b411"
const APP_NAME = "DAOVentures"

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
  dappId: 'cfc3e1e8-75ab-498e-9869-c4a3a68917ef',
  networkId: 1,
  walletSelect: {
    wallets: wallets,
  },
});

export function initOnboard(subscriptions) {
  return Onboard({
    dappId: 'cfc3e1e8-75ab-498e-9869-c4a3a68917ef',
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