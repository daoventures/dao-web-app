import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { withNamespaces } from "react-i18next";
import Store from "../../stores";
import {
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import {
  CONNECTION_CONNECTED,
  FIND_DAOMINE_POOL,
  DAOMINE_POOL_RETURNED,
  APPROVE_TRANSACTING,
  DEPOSIT_DAOMINE_RETURNED,
  DEPOSIT_DAOMINE_RETURNED_COMPLETED,
  WITHDRAW_DAOMINE_RETURNED,
  WITHDRAW_DAOMINE_RETURNED_COMPLETED,
  EMERGENCY_WITHDRAW_DAOMINE_RETURNED,
  EMERGENCY_WITHDRAW_DAOMINE_RETURNED_COMPLETED,
  ERROR,
  ALL
} from "../../constants/constants";

import RiskLevelTab from "../common/riskLevelTab/riskLevelTab";
import RiskLevelLabel from "../common/riskLevelLabel/riskLevelLabel";
import ConnectWallet from "../common/connectWallet/connectWallet";
import Snackbar from "../snackbar/snackbar";
import StakeDeposit from "./component/stakeDeposit/stakeDeposit";
import StakeWithdrawal from "./component/stakeWithdraw/stakeWithdraw";
import Loader from "../loader/loader";

const store = Store.store;
const emitter = Store.emitter;
const dispatcher = Store.dispatcher;

const styles = (theme) => ({
  root: {
    flex: 1,
    width: "100%",
    paddingLeft: "320px",
    paddingRight: "80px",
    paddingTop: "30px",
    paddingBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "10px",
      paddingRight: "10px",
    },
    "& p": {
      padding: "0px",
      margin: "0px",
    },
  },
  banner: {
    width: "100%",
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "0px 50px",
    background:
      "linear-gradient(128deg, #401FC2 0%, #4C83FA 55%, #401FC2 100%)",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      padding: "32px 10px",
      position: "relative",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      background: "linear-gradient(123deg, #401FC2 0%, #3B6AF8 100%)",
    },
  },
  bannerImg: {
    width: "120px",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      right: "18px",
      bottom: "10px",
      zIndex: "0",
    },
  },
  bannerTit: {
    fontSize: "18px",
    color: "#ffffff",
    position: "relative",
    zIndex: "1",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  bannerCon: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.6)",
    paddingTop: "10px",
    position: "relative",
    zIndex: "1",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  addLiquidity: {
    display: "block",
    width: "214px",
    height: "46px",
    lineHeight: "46px",
    textAlign: "center",
    border: "1px solid #FFFFFF",
    color: "#ffffff",
    cursor: "pointer",
    position: "relative",
    zIndex: "1",
    [theme.breakpoints.down("sm")]: {
      height: "40px",
      lineHeight: "40px",
      marginTop: "22px",
      width: "160px",
    },
  },
  // Content Container
  contentContainer: {
    minWidth: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // [theme.breakpoints.up('md')]: {
    //   minWidth: 'calc(100% - '+ drawerWidth + 'px)',
    // }
  },
  investedContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minWidth: "100%",
    marginTop: "20px",
    marginBottom: "40px",
    [theme.breakpoints.up("md")]: {
      width: "100%",
      minWidth: "900px",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "90%",
      margin: "auto",
      marginTop: "40px",
    },
  },
  poolContainer: {
    width: "100%",
    position: "relative",
    borderColor: theme.themeColors.blockBorder,
    borderWidth: "1px",
    borderStyle: "solid",
    boxShadow: "-2px 2px 40px 0px rgba(0, 0, 0, 0.05)",
    // borderRadius: '10px',
    // padding: '1rem',
    marginBottom: "20px",
    background: theme.themeColors.itemBack,
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      margin: "auto",
      marginBottom: "20px",
    },
  },
  itemTop: {
    height: "25px",
  },
  itemTitle: {
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
    color: theme.themeColors.textT,
    padding: "0px 24px",
    [theme.breakpoints.down("md")]: {
      padding: "0px 10px",
    },
  },
  itemTitleText: {
    fontSize: "18px",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  },
  expansionPanel: {
    maxWidth: "calc(100vw - 24px)",
    width: "100%",
    border: "none",
    // background: theme.themeColors.modelBack,
    background: theme.themeColors.itemBack,
    borderRadius: "0px",
  },
  dropDownIcon: {
    width: "30px",
    height: "30px",
    fill: theme.themeColors.textP,
  },
  accordionsummary: {
    height: "100px",
    padding: "0px 24px",
  },
  assetSummary: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    flexWrap: "wrap",
    [theme.breakpoints.up("sm")]: {
      flexWrap: "nowrap",
    },
  },
  gridItemColumn: {
    // display: 'flex',
    alignItems: "center",
    paddingLeft: "2px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "5px",
      alignItems: "stretch",
    },
  },
  assetIcon: {
    display: "flex",
    alignItems: "center",
    verticalAlign: "middle",
    borderRadius: "20px",
    height: "50px",
    width: "50px",
    textAlign: "center",
    cursor: "pointer",
    marginRight: "20px",
    [theme.breakpoints.up("sm")]: {
      height: "32px",
      width: "32px",
      marginRight: "12px",
    },
  },
  assetIconImg: {
    height: "50px",
    [theme.breakpoints.down("md")]: {
      height: "30px",
    },
  },
  assetLabel1: {
    display: "block",
    fontSize: "18px",
    color: theme.themeColors.textT,
  },
  assetLabel2: {
    display: "block",
    fontSize: "14px",
    color: theme.themeColors.textP,
  },
  removePadding: {
    padding: "0px",
    width: "100%",
    borderTop: "1px solid " + theme.themeColors.textP,
    // maxWidth: '900px'
  },
  yearnEarnAndVaultBlock: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  yearnEarnAndVaultItem: {
    flex: 1,
    marginLeft: "20px",
    marginRight: "20px",
    "&:first-child": {
      marginLeft: "0px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  divider: {
    // flexGrow : "1",
    borderColor: theme.themeColors.textP,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
});

class Stake extends Component {
  constructor(props) {
    super();

    const account = store.getStore("account");

    this.state = {
      account: account,
      address: account.address
        ? account.address.substring(0, 6) +
          "..." +
          account.address.substring(
            account.address.length - 4,
            account.address.length
          )
        : null,
      pools: store.getStore("stakePools"),
      currentTab: ALL,
      expanded: "",
      loading: false,
    };

    if (account && account.address) {
      dispatcher.dispatch({
        type: FIND_DAOMINE_POOL,
      });
    }
  }

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    // emitter.on(CHANGE_NETWORK, this.networkChanged);
    emitter.on(DAOMINE_POOL_RETURNED, this.onDAOminePoolReturned);
    emitter.on(APPROVE_TRANSACTING, this.showHashApproval);
    emitter.on(ERROR, this.errorReturned);
    emitter.on(DEPOSIT_DAOMINE_RETURNED, this.showHash);
    emitter.on(
      DEPOSIT_DAOMINE_RETURNED_COMPLETED,
      this.onDepositWithdrawalCompleted
    );
    emitter.on(WITHDRAW_DAOMINE_RETURNED, this.showHash);
    emitter.on(
      WITHDRAW_DAOMINE_RETURNED_COMPLETED,
      this.onDepositWithdrawalCompleted
    );
    emitter.on(EMERGENCY_WITHDRAW_DAOMINE_RETURNED, this.showHash);
    emitter.on(
      EMERGENCY_WITHDRAW_DAOMINE_RETURNED_COMPLETED,
      this.onDepositWithdrawalCompleted
    );
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    // emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
    emitter.removeListener(DAOMINE_POOL_RETURNED, this.onDAOminePoolReturned);
    emitter.removeListener(ERROR, this.errorReturned);
  }

  /** Handler function when wallet successfully connected */
  connectionConnected = () => {
    const { t } = this.props;
    const account = store.getStore("account");

    this.setState({
      loading: true,
      account: account,
      address: account.address
        ? account.address.substring(0, 6) +
          "..." +
          account.address.substring(
            account.address.length - 4,
            account.address.length
          )
        : null,
    });

    if (account && account.address) {
      dispatcher.dispatch({
        type: FIND_DAOMINE_POOL,
      });
    }

    const that = this;
    setTimeout(() => {
      const snackbarObj = {
        snackbarMessage: t("Unlock.WalletConnected"),
        snackbarType: "Info",
      };
      that.setState(snackbarObj);
    });
  };

  /** Handler function when wallet disconnected */
  connectionDisconnected = () => {
    this.setState({
      account: null,
      address: null,
    });
  };

  // networkChanged = (obj) => {
  //   const account = store.getStore("account");
  //   const basedOn = localStorage.getItem("yearn.finance-dashboard-basedon");

  //   const networkId = obj.network;

  //   this.setState({
  //     networkId: networkId,
  //   });
  // };

  startLoading = () => {
    this.setState({ loading: true });
  };

  onDAOminePoolReturned = (pools) => {
    this.setState({ pools });
  };

  // Handler once deposit or withdrawal completed
  onDepositWithdrawalCompleted = (txHash) => {
    dispatcher.dispatch({
      type: FIND_DAOMINE_POOL,
    });

    const snackbarObj = { snackbarMessage: null, snackbarType: null };
    this.setState(snackbarObj);
    this.setState({ loading: false });
    const that = this;
    setTimeout(() => {
      const snackbarObj = {
        snackbarMessage: txHash,
        snackbarType: "Transaction Success",
      };
      that.setState(snackbarObj);
    });
  };

  // Show error message
  errorReturned = (error) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null };
    this.setState(snackbarObj);
    this.setState({ loading: false });
    const that = this;
    setTimeout(() => {
      const snackbarObj = {
        snackbarMessage: error.toString(),
        snackbarType: "Error",
      };
      that.setState(snackbarObj);
    });
  };

  // Show Hash
  showHash = (txHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null };
    this.setState(snackbarObj);
    this.setState({ loading: false });
    const that = this;
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txHash, snackbarType: "Hash" };
      that.setState(snackbarObj);
    });
  };

  // Show Wallet Approval Hash
  showHashApproval = (txHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null };
    this.setState(snackbarObj);
    this.setState({ loading: false });
    const that = this;
    setTimeout(() => {
      const snackbarObj = {
        snackbarMessage: "Approving...",
        snackbarType: "Hash",
      };
      that.setState(snackbarObj);
    });
  };

  renderSnackbar = () => {
    var { snackbarType, snackbarMessage, networkId } = this.state;
    return (
      <Snackbar
        type={snackbarType}
        message={snackbarMessage}
        networkId={networkId}
        open={true}
      />
    );
  };

  renderRiskTypeTab = () => {
    return (
      <RiskLevelTab
        selectedRiskCallback={this.handleSelectedRisk}
      ></RiskLevelTab>
    );
  };

  handleSelectedRisk = (risk) => {
    this.setState({ currentTab: risk });
  };

  render() {
    const { classes } = this.props;
    const { account, loading } = this.state;

    if (!account || !account.address) {
      return <ConnectWallet></ConnectWallet>;
    }

    return (
      <div className={classes.root}>
        {/** Banner */}
        <div className={classes.banner}>
          <div>
            <Typography variant={"h3"} className={classes.bannerTit}>
              Create DVG-ETH UNI-V2 LP tokens
            </Typography>
            <p className={classes.bannerCon}>
              Provide liquidity in Uniswap to get LP tokens.
            </p>
          </div>
          <div>
            <img
              alt="banner"
              className={classes.bannerImg}
              src={require("../../assets/img_new/active_banner@2x.png")}
            />
          </div>
          <div>
            <a
              href="https://info.uniswap.org/#/pools/0xa58262270521d7732fccbbdcdf9fcd1fc70d47e5"
              target="_blank"
              className={classes.addLiquidity}
            >
              Add Liquidity
            </a>
          </div>
        </div>

        {/** Content */}
        <div className={classes.contentContainer}>
          <div className={classes.investedContainer}>
            {/** Risk Type Tabs */}
            {this.renderRiskTypeTab()}

            {/** Display Pool List */}
            {this.renderPools()}
          </div>
        </div>

        {/** Loading */}
        {loading && <Loader />}

        {/** Snackbar */}
        {this.state.snackbarMessage && this.renderSnackbar()}
      </div>
    );
  }

  handleChange = (name) => {
    this.setState({ expanded: this.state.expanded === name ? null : name });
  };

  renderPools = () => {
    const { pools, currentTab, expanded } = this.state;
    const { classes } = this.props;
    const width = window.innerWidth;

    return pools && pools.length > 0
      ? pools
          .filter((pool) => {
            return (currentTab === ALL || pool.category === currentTab) && pool.status === "A"
              ? true
              : false;
          })
          .map((pool, index) => {
            return (
              <div key={index} className={classes.poolContainer}>
                <Grid container className={classes.itemTop}>
                  <RiskLevelLabel risk={pool.category}></RiskLevelLabel>
                </Grid>

                <Accordion
                  className={classes.expansionPanel}
                  square
                  key={pool.name + "_expand"}
                  expanded={expanded === pool.name}
                  onChange={() => {
                    this.handleChange(pool.name);
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <svg aria-hidden="true" className={classes.dropDownIcon}>
                        <use xlinkHref="#iconicon_list_dropDown"></use>
                      </svg>
                    }
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.accordionsummary}
                  >
                    <div className={classes.assetSummary}>
                      <Grid container>
                        <Grid
                          item
                          sm={1}
                          xs={2}
                          className={classes.gridItemColumn}
                        >
                          {/** Pool Icon */}
                          <div className={classes.assetIcon}>
                            {this.renderLogo(pool)}
                          </div>
                        </Grid>

                        {/** Pool Title */}
                        <Grid
                          item
                          sm={3}
                          xs={4}
                          className={classes.gridItemColumn}
                        >
                          <Typography
                            variant={"h5"}
                            style={{
                              wordWrap: "break-word",
                            }}
                            className={classes.assetLabel1}
                          >
                            {pool.label}
                          </Typography>
                          {/* <Typography
                                variant={"body1"}
                                className={classes.assetLabel2}>
                                {asset.description}
                              </Typography> */}
                        </Grid>

                        {/** Pending DVG */}
                        <Grid
                          item
                          sm={2}
                          xs={6}
                          className={classes.gridItemColumn}
                        >
                          <Typography
                            variant={"h5"}
                            style={{
                              wordWrap: "break-word",
                            }}
                            className={classes.assetLabel1}
                          >
                            {pool.userInfo.pendingDVG
                              ? (Number(pool.userInfo.pendingDVG) / 10 ** 18)
                                  .toFixed(2)
                                  .toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
                              : "0.00"}
                            {" DVG"}
                          </Typography>
                          <Typography
                            variant={"body1"}
                            className={classes.assetLabel2}
                          >
                            Pending
                          </Typography>
                        </Grid>

                        {/** Staked */}
                        <Grid
                          item
                          sm={2}
                          xs={6}
                          className={classes.gridItemColumn}
                        >
                          <Typography
                            variant={"h5"}
                            style={{
                              wordWrap: "break-word",
                            }}
                            className={classes.assetLabel1}
                          >
                            { pool.userInfo.depositedLPAmount 
                              ? (
                                  Number(pool.userInfo.depositedLPAmount) /
                                  10 ** pool.decimal
                                ).toFixed(2)
                              : "0.00"}
                          </Typography>
                          <Typography
                            variant={"body1"}
                            className={classes.assetLabel2}
                          >
                            Staked
                          </Typography>
                        </Grid>

                        {/** APR */}
                        <Grid
                          item
                          sm={2}
                          xs={6}
                          className={classes.gridItemColumn}
                        >
                          <Typography
                            variant={"h5"}
                            style={{
                              wordWrap: "break-word",
                            }}
                            className={classes.assetLabel1}
                          >
                            {pool.apr ? Number(pool.apr).toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "0.00"}
                            {" %"}
                          </Typography>
                          <Typography
                            variant={"body1"}
                            className={classes.assetLabel2}
                          >
                            APR
                          </Typography>
                        </Grid>

                        {/** Multiplier */}
                        <Grid
                          item
                          sm={2}
                          xs={6}
                          className={classes.gridItemColumn}
                        >
                          <Typography
                            variant={"h5"}
                            style={{
                              wordWrap: "break-word",
                            }}
                            className={classes.assetLabel1}
                          >
                            {this.renderMultiplier(pool.category)}
                          </Typography>
                          <Typography
                            variant={"body1"}
                            className={classes.assetLabel2}
                          >
                            Multiplier
                          </Typography>
                        </Grid>

                        {/** TVL */}
                        {/* <Grid
                          item
                          sm={2}
                          xs={6}
                          className={classes.gridItemColumn}
                        >
                          <Typography
                            variant={"h5"}
                            style={{
                              wordWrap: "break-word",
                            }}
                            className={classes.assetLabel1}
                          >
                            {"$ "}
                            {pool.tvl ? Number(pool.tvl).toFixed(2) : "0.00"}
                          </Typography>
                          <Typography
                            variant={"body1"}
                            className={classes.assetLabel2}
                          >
                            Liquidity
                          </Typography>
                        </Grid> */}
                      </Grid>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className={classes.removePadding}>
                    <div className={classes.yearnEarnAndVaultBlock}>
                      <div className={classes.yearnEarnAndVaultItem}>
                        <StakeDeposit
                          pool={pool}
                          startLoading={this.startLoading}
                        ></StakeDeposit>
                      </div>
                      <hr className={classes.divider}></hr>
                      <div className={classes.yearnEarnAndVaultItem}>
                        <StakeWithdrawal
                          pool={pool}
                          startLoading={this.startLoading}
                        ></StakeWithdrawal>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })
      : null;
  };

  renderLogo = (pool) => {
    const { classes } = this.props;

    const images = {
      dvmUSDT: { filename: "USDT", format: "png" },
      dvmUSDC: { filename: "USDC", format: "png" },
      dvmDAI: { filename: "DAI", format: "png" },
      dvmTUSD: { filename: "TUSD", format: "png" },
      dvlUSDT: { filename: "USDT", format: "png" },
      dvlUSDC: { filename: "USDC", format: "png" },
      dvlDAI: { filename: "DAI", format: "png" },
      vipDVG: { filename: "vipDVG", format: "png" },
      "ETH<->DVG": { filename: "ethDvg", format: "png" },
      daoCDV: { filename: "citadel", format: "svg" },
      daoELO: { filename: "citadel", format: "svg" },
      daoCUB: { filename: "citadel", format: "svg" },
      daoSTO: { filename: "citadel", format: "svg" },
      hfUSDT: { filename: "USDT", format: "png" },
      hfUSDC: { filename: "USDC", format: "png" },
      hfDAI: { filename: "DAI", format: "png" },
    };

    const poolImage = images[pool.name];

    if(pool.name === "ETH<->DVG") {
      return (
        <img
          alt="pool"
          src={require("../../assets/img_new/" +
            poolImage.filename +
            "-logo." +
            poolImage.format)}
          // height={ '50px' }
          className={classes.assetIconImg}
          style={{height: "100%"}}
        />
      );
    }

    return poolImage ? (
      <img
        alt="pool"
        src={require("../../assets/img_new/" +
          poolImage.filename +
          "-logo." +
          poolImage.format)}
        // height={ '50px' }
        className={classes.assetIconImg}
      />
    ) : null;
  };

  renderMultiplier = (category) => {
    const multiplier = {
      Basic : "1x",
      Advance: "2x",
      Expert: "3x",
      Degen: "4x"
    };
    return category ? multiplier[category] : null;
  }

  showHashApproval = (txHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null };
    this.setState(snackbarObj);
    this.setState({ loading: false });
    const that = this;
    setTimeout(() => {
      const snackbarObj = {
        snackbarMessage: "Approving...",
        snackbarType: "Hash",
      };
      that.setState(snackbarObj);
    });
  };
}

export default withNamespaces()(withRouter(withStyles(styles)(Stake)));
