import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { withNamespaces } from "react-i18next";
import Store from "../../stores";
import { Typography, Grid } from "@material-ui/core";
import {
  CONNECTION_CONNECTED,
  FIND_DAOMINE_POOL,
  DAOMINE_POOL_RETURNED
} from "../../constants/constants";

import RiskLevelTab from "../common/riskLevelTab/riskLevelTab";
import ConnectWallet from "../common/connectWallet/connectWallet";
import Snackbar from "../snackbar/snackbar";
import StakeDeposit from "./component/stakeDeposit/stakeDeposit";
import StakeWithdrawal from "./component/stakeWithdraw/stakeWithdraw";

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
    height: "48px",
    background: theme.themeColors.menuSel,
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
    // borderColor: "green"
  }
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
      currentTab: "All",
    };

    dispatcher.dispatch({
      type: FIND_DAOMINE_POOL
    });
  }

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    // emitter.on(CHANGE_NETWORK, this.networkChanged);
    emitter.on(DAOMINE_POOL_RETURNED, this.onDAOminePoolReturned)
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    // emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
    emitter.removeListener(DAOMINE_POOL_RETURNED, this.onDAOminePoolReturned);
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

  onDAOminePoolReturned = (pools) => {
    this.setState({ pools: pools.pools });
  }

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
    const { account } = this.state;

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
            <a href="http://www.google.com" className={classes.addLiquidity}>
              Add Liquidity
            </a>
          </div>
        </div>

        {/** Content */}
        <div className={classes.contentContainer}>
          <div className={classes.investedContainer}>
            {/** Risk Type Tabs */}
            {this.renderRiskTypeTab()}

            {this.renderPools()}

            {/* <hr className={classes.divider}></hr> */}

            {/* <div className={classes.yearnEarnAndVaultBlock}>
                <div className={classes.yearnEarnAndVaultItem}>
                    <StakeDeposit></StakeDeposit>
                </div>
               
                <div className={classes.yearnEarnAndVaultItem}>
                    <StakeWithdrawal></StakeWithdrawal>
                </div>
            </div> */}


          </div>
        </div>

        {/** Snackbar */}
        {this.state.snackbarMessage && this.renderSnackbar()}
      </div>
    );
  }

  renderPools = () => {
    const { pools, currentTab } = this.state;
    const { classes } = this.props;
    const width = window.innerWidth;

    console.log('Pools in renderPools()', pools);

    return (pools && pools.length > 0) ?
      (pools.filter((pool) => {
        return currentTab === "All" || pool.category === currentTab ? true : false;
      })
        .map((pool, index) => {
          return (
            <div key={index}
              className={classes.poolContainer}>
              <Grid container className={classes.itemTop}>
                <Grid item sm={12} xs={8} className={classes.itemTitle}>
                  <Typography className={classes.itemTitleText} variant="h4">
                    {pool.name}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          )
        })) : null;
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(Stake)));
