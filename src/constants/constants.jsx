export const ERROR = "ERROR";
export const RESET_PROFILE = "RESET_PROFILE";

// #Accounts
export const CONNECTION_CONNECTED = "CONNECTION_CONNECTED";
export const CONNECTION_DISCONNECTED = "CONNECTION_DISCONNECTED";

export const GET_BALANCES = "GET_BALANCES";
export const BALANCES_RETURNED = "BALANCES_RETURNED";

export const GET_BALANCES_LIGHT = "GET_BALANCES_LIGHT";
export const BALANCES_LIGHT_RETURNED = "BALANCES_LIGHT_RETURNED";

export const GET_VAULT_BALANCES = "GET_VAULT_BALANCES";
export const VAULT_BALANCES_RETURNED = "VAULT_BALANCES_RETURNED";

export const ENS_ADDRESS_RESOLVED = "ENS_ADDRESS_RESOLVED";

// #Dashboard
export const GET_DASHBOARD_SNAPSHOT = "GET_DASHBOARD_SNAPSHOT";
export const DASHBOARD_SNAPSHOT_RETURNED = "DASHBOARD_SNAPSHOT_RETURNED";

export const GET_USD_PRICE = "GET_USD_PRICE";
export const USD_PRICE_RETURNED = "USD_PRICE_RETURNED";

// #Earn
export const INVEST = "INVEST";
export const INVEST_RETURNED = "INVEST_RETURNED";

export const INVEST_ALL = "INVEST_ALL";
export const INVEST_ALL_RETURNED = "INVEST_ALL_RETURNED";

export const REDEEM = "REDEEM";
export const REDEEM_RETURNED = "REDEEM_RETURNED";

// #Vaults
export const APPROVE_DEPOSIT_CONTRACT = "APPROVE_DEPOSIT_CONTRACT";
export const APPROVE_DEPOSIT_SUCCESS = "APPROVE_DEPOSIT_SUCCESS";
export const APPROVE_DEPOSIT_FAILURE = "APPROVE_DEPOSIT_FAILURE";
export const CONFIRM_DEPOSIT_CONTRACT = "CONFIRM_DEPOSIT_CONTRACT";
export const DEPOSIT_CONTRACT = "DEPOSIT_CONTRACT";
export const DEPOSIT_CONTRACT_RETURNED = "DEPOSIT_CONTRACT_RETURNED";
export const DEPOSIT_CONTRACT_RETURNED_COMPLETED =
  "DEPOSIT_CONTRACT_RETURNED_COMPLETED";
export const ERROR_WALLET_APPROVAL = "ERROR_WALLET_APPROVAL";
export const ERROR_DEPOSIT_WALLET = "ERROR_DEPOSIT_WALLET";

export const DEPOSIT_ALL_CONTRACT = "DEPOSIT_ALL_CONTRACT";
export const DEPOSIT_ALL_CONTRACT_RETURNED = "DEPOSIT_ALL_CONTRACT_RETURNED";
export const DEPOSIT_ALL_CONTRACT_RETURNED_COMPLETED =
  "DEPOSIT_ALL_CONTRACT_RETURNED_COMPLETED";

export const WITHDRAW_VAULT = "WITHDRAW_VAULT";
export const WITHDRAW_VAULT_RETURNED = "WITHDRAW_VAULT_RETURNED";
export const WITHDRAW_VAULT_RETURNED_COMPLETED =
  "WITHDRAW_VAULT_RETURNED_COMPLETED";

export const WITHDRAW_BOTH = "WITHDRAW_BOTH";

export const WITHDRAW_BOTH_VAULT = "WITHDRAW_BOTH_VAULT";
export const WITHDRAW_BOTH_VAULT_RETURNED = "WITHDRAW_BOTH_VAULT_RETURNED";
export const WITHDRAW_BOTH_VAULT_RETURNED_COMPLETED =
  "WITHDRAW_BOTH_VAULT_RETURNED_COMPLETED";
export const WITHDRAW_BOTH_VAULT_FAIL_RETURNED =
  "WITHDRAW_BOTH_VAULT_FAIL_RETURNED";

export const APPROVE_TRANSACTING = "APPROVE_TRANSACTING";
export const APPROVE_COMPLETED = "APPROVE_COMPLETED";

// #Zap
export const ZAP = "ZAP";
export const ZAP_RETURNED = "ZAP_RETURNED";

export const SWAP = "SWAP";
export const SWAP_RETURNED = "SWAP_RETURNED";

export const TRADE = "TRADE";
export const TRADE_RETURNED = "TRADE_RETURNED";

export const GET_CURV_BALANCE = "GET_CURV_BALANCE";
export const GET_CURV_BALANCE_RETURNED = "GET_CURV_BALANCE_RETURNED";

export const GET_BEST_PRICE = "GET_BEST_PRICE";
export const GET_BEST_PRICE_RETURNED = "GET_BEST_PRICE_RETURNED";

// #APR
export const GET_AGGREGATED_YIELD = "GET_AGGREGATED_YIELD";
export const GET_AGGREGATED_YIELD_RETURNED = "GET_AGGREGATED_YIELD_RETURNED";

// #Manage
export const DONATE = "DONATE";
export const DONATE_RETURNED = "DONATE_RETURNED";

export const REBALANCE = "REBALANCE";
export const REBALANCE_RETURNED = "REBALANCE_RETURNED";

export const GET_CONTRACT_EVENTS = "GET_CONTRACT_EVENTS";
export const GET_CONTRACT_EVENTS_RETURNED = "GET_CONTRACT_EVENTS_RETURNED";

export const IDAI = "IDAI";
export const IDAI_RETURNED = "IDAI_RETURNED";

export const GET_STATISTICS = "GET_STATISTICS";
export const STATISTICS_RETURNED = "STATISTICS_RETURNED";

export const GET_VAULT_BALANCES_FULL = "GET_VAULT_BALANCES_FULL";
export const VAULT_BALANCES_FULL_RETURNED = "VAULT_BALANCES_FULL_RETURNED";

export const TOGGLE_DRAWER = "TOGGLE_DRAWER";
export const DRAWER_RETURNED = "DRAWER_RETURNED";

export const GET_STRATEGY_BALANCES_FULL = "GET_STRATEGY_BALANCES_FULL";
export const STRATEGY_BALANCES_FULL_RETURNED =
  "STRATEGY_BALANCES_FULL_RETURNED";

// #global (新增)
export const TOGGLE_THEME = "TOGGLE_THEME"; // 切换主题
export const CURRENT_THEME_RETURNED = "CURRENT_THEME_RETURNED"; // 返回当前主题
export const CHANGE_NETWORK = "CHANGE_NETWORK"; // 设置当前网络

// 获取接口信息
export const GET_VAULT_INFO = "GET_VAULT_INFO";

// Strategy Risk Level
export const BASIC = "Basic";
export const ADVANCE = "Advance";
export const EXPERT = "Expert";
export const DEGEN = "Degen";
export const ALL = "All";

// Biconomy
export const BICONOMY_CONNECTED = "BICONOMY_CONNECTED";

export const GET_HAPPY_HOUR_STATUS = "GET_HAPPY_HOUR_STATUS";
export const HAPPY_HOUR_VERIFY = "HAPPY_HOUR_VERIFY";
export const HAPPY_HOUR_RETURN = "HAPPY_HOUR_RETURN";
export const DEPOSIT_CONTRACT_HAPPY_HOUR_RETURNED_COMPLETED =
  "DEPOSIT_CONTRACT_HAPPY_HOUR_RETURNED_COMPLETED";

// Block Explorers
export const BLOCK_EXPLORERS = {
  1: "https://etherscan.io/tx/",
  42: "https://kovan.etherscan.io/tx/",
  56: "https://bscscan.com/tx/",
  97: "https://testnet.bscscan.com/tx/",
  80001: "https://mumbai.polygonscan.com/tx/",
  137: "https://polygonscan.com/tx/",
  43114: "https://snowtrace.io/tx/",
  43113: "https://testnet.snowtrace.io/tx/"
};

// Pools
export const FIND_DAOMINE_POOL = "FIND_DAOMINE_POOL";
export const DAOMINE_POOL_RETURNED = "DAOMINE_POOL_RETURNED";
export const DAOMINE_POOL_RETURNED_COMPLETED = "DAOMINE_POOL_RETURNED_COMPLETED";
export const DEPOSIT_DAOMINE = "DEPOSIT_DAOMINE";
export const DEPOSIT_DAOMINE_RETURNED = "DEPOSIT_DAOMINE_RETURNED";
export const DEPOSIT_DAOMINE_RETURNED_COMPLETED = "DEPOSIT_DAOMINE_RETURNED_COMPLETED";
export const WITHDRAW_DAOMINE = "WITHDRAW_DAOMINE";
export const WITHDRAW_DAOMINE_RETURNED = "WITHDRAW_DAOMINE_RETURNED";
export const WITHDRAW_DAOMINE_RETURNED_COMPLETED = "WITHDRAW_DAOMINE_RETURNED_COMPLETED";
export const EMERGENCY_WITHDRAW_DAOMINE = "EMERGENCY_WITHDRAW_DAOMINE";
export const EMERGENCY_WITHDRAW_DAOMINE_RETURNED = "EMERGENCY_WITHDRAW_DAOMINE_RETURNED";
export const EMERGENCY_WITHDRAW_DAOMINE_RETURNED_COMPLETED = "EMERGENCY_WITHDRAW_DAOMINE_RETURNED_COMPLETED";
export const YIELD_DAOMINE = "YIELD_DAOMINE";
export const YIELD_DAOMINE_RETURNED = "YIELD_DAOMINE_RETURNED";
export const YIELD_DAOMINE_RETURNED_COMPLETED = "YIELD_DAOMINE_RETURNED_COMPLETED";

// 获取DVG信息
export const GET_DVG_INFO = "GET_DVG_INFO";
// 获取DVG成功
export const GET_DVG_BALANCE_SUCCESS = "GET_DVG_BALANCE_SUCCESS";
// 充值XDVG
export const DEPOSIT_XDVG = "DEPOSIT_XDVG";
//获取xdvg
export const GET_XDVG_BALANCE = "GET_XDVG_BALANCE";
//获取xdvg可用成功
export const GET_XDVG_BALANCE_SUCCESS = "GET_XDVG_BALANCE_SUCCESS";
//取消质押中的DVG
export const WIDTHDRAW_XDVG = "WIDTHDRAW_XDVG";
//获取DVG APR
export const GET_DVG_APR = "GET_DVG_APR";
//获取DVG APR 成功
export const GET_XDVG_APR_SUCCESS = "GET_XDVG_APR_SUCCESS";
//充值DVG成功
export const DEPOSIT_DVG_RETURNED = "DEPOSIT_DVG_RETURNED";
export const DEPOSIT_DVG_RETURNED_COMPLETED = "DEPOSIT_DVG_RETURNED_COMPLETED";
//提现DVG成功
export const WITHDRAW_DVG_RETURNED = "WITHDRAW_DVG_RETURNED";
export const WITHDRAW_DVG_RETURNED_COMPLETED = "WITHDRAW_DVG_RETURNED_COMPLETED";
export const APPROVAL_DVG_RETURNED = "APPROVAL_DVG_RETURNED";
export const APPROVAL_DVG_RETURNED_COMPLETED = "APPROVAL_DVG_RETURNED_COMPLETED";

export const GET_UPGRADE_TOKEN = 'GET_UPGRADE_TOKEN';
export const GET_UPGRADE_TOKEN_RETURN = 'GET_UPGRADE_TOKEN_RETURN';
export const UPGRADE_TOKEN = 'UPGRADE_TOKEN';
export const UPGRADE_STAKE_TOKEN = 'UPGRADE_STAKE_TOKEN';
export const UPGRADE_TOKEN_SUCCESS = 'UPGRADE_TOKEN_SUCCESS';
export const UPGRADE_TOKEN_RETURN = 'UPGRADE_TOKEN_RETURN';

// For pools in DAOmine
export const LATEST_POOLS = 'ACTIVE';
export const LEGACY_POOLS = 'LEGACY';
export const UPDATE_SELECTED_POOL_TYPE = "UPDATE_SELECTED_POOL_TYPE";
// Stake Actions Button
export const ACTION_COMPOUND = "Compound Reward";
export const ACTION_HARVEST = "Harvest Reward";
export const ACTION_EMERGENCY = "Emergency Withdraw";
export const ACTION_WITHDRAW = "Withdraw";
export const MODAL_TITLE_WITHDRAW = "Unstake";
export const DISABLE_ACTION_BUTTONS_RETURNED = "DISABLE_ACTION_BUTTONS_RETURNED";
// Pending Rewards section
export const EARLY_HARVEST_PENALTY = "50";

export const DVD_AIRDROP = "DVD_AIRDROP";

export const NETWORK = {
  ETHEREUM: 1,
  KOVAN: 42,
  MATIC: 137,
  MUMBAI: 80001,
  BSCTEST: 97,
  BSCMAINNET: 56,
  FANTOMMAINNET: 250,
  FANTOMTEST: 4002,
  AVALANCHEMAIN: 43114,
  AVALANCHETEST: 43113,
  ARBITRUMMAIN: 42161,
  ARBITRUMTEST: 421611
};

export const NETWORK_LABEL = {
  1: "Ethereum",
  42: "Kovan",
  137: "Polygon(Matic)",
  80001: "Polygon(Mumbai)",
  97: "BSC(Testnet)",
  56: "BSC(Mainnet)",
  250: "Fantom Opera",
  4002: "Fantom Testnet",
  43114: "Avalanche Mainnet",
  43113: "Avalanche Fuji Testnet",
  42161: "Arbitrum Mainnet",
  421611: "Arbitrum Testnet"
};

export const MAINNET_NETWORKS = [
  { chainId: NETWORK.ETHEREUM, label: NETWORK_LABEL[1], networkId: "ethereum" },
  { chainId: NETWORK.MATIC, label: NETWORK_LABEL[137] }, 
  { chainId: NETWORK.BSCMAINNET, label: NETWORK_LABEL[56]},
  { chainId: NETWORK.FANTOMMAINNET, label: NETWORK_LABEL[250]},
  { chainId: NETWORK.AVALANCHEMAIN, label: NETWORK_LABEL[43114]},
  { chainId: NETWORK.ARBITRUMMAIN, label: NETWORK_LABEL[42161]}
];

export const STRATEGIES_USE_TOKEN_INDEX = [
  "citadel",
  "elon",
  "cuban"
];

// Airdrop
export const CONFIRM_CLAIM_DVD = "Confirm Claim DVD";
export const CLAIM_DVD_HASH = "Claim DVD Success";
export const CLAIM_DVD_SUCCESS = "Claim DVD Success Returned";
export const CLAIM_DVD_ERROR = "Claim DVD Error";

// Redeem PD33D 
export const GET_REDEEM_INFO = "Get Redeem Info";
export const REDEEM_PTOKEN_HASH = "Redeem pToken Success";
export const REDEEM_PTOKEN_SUCCESS = "Redeem pToken Success Returned";
export const REDEEM_PTOKEN_ERROR = "Redeem pToken Error";