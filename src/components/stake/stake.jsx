import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { withNamespaces } from "react-i18next";
import Store from "../../stores";
import { Typography } from "@material-ui/core";
import {
  CONNECTION_CONNECTED,
  CHANGE_NETWORK,
} from "../../constants/constants";

import RiskLevelTab from "../common/riskLevelTab/riskLevelTab";
import ConnectWallet from "../common/connectWallet/connectWallet";
import Snackbar from "../snackbar/snackbar";

const store = Store.store;
const emitter = Store.emitter;
// const dispatcher = Store.dispatcher;

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
  infoBlock: {
    display: "flex",
    alignItems: "center",
    marginTop: "32px",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      marginTop: "12px",
    },
  },
  infoItem: {
    flex: 1,
    height: "90px",
    marginLeft: "26px",
    padding: "0px 12px",
    display: "flex",
    alignItems: "center",
    marginTop: "14px",
    // minWidth: '230px',
    "&:first-child": {
      marginLeft: "0px",
    },
    "& img": {
      width: "40px",
      height: "40px",
      marginRight: "12px",
    },
    [theme.breakpoints.down("sm")]: {
      // minWidth: 'auto',
      height: "70px",
      marginTop: "20px",
      "&:nth-of-type(2n-1)": {
        marginLeft: "0px",
      },
      "& img": {
        width: "28px",
        height: "28px",
        marginRight: "6px",
      },
    },
  },
  infoTit: {
    // fontSize: '16px',
    fontSize: "12px",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  infoCon: {
    // fontSize: '20px',
    fontSize: "18px",
    color: "#ffffff",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  poolAndEarnBox: {
    marginTop: "32px",
    width: "100%",
  },
  poolBox: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.themeColors.lineT,
    height: "318px",
    background: theme.themeColors.modelBack,
    // padding: '10px 0px',
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      paddingBottom: "40px",
    },
  },
  poolAndEarnTop: {
    height: "48px",
    lineHeight: "48px",
    padding: "0px 24px",
    fontSize: "18px",
    color: theme.themeColors.textT,
    background: theme.themeColors.menuSel,
  },
  poolLeft: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: "30px",
    "& .coinIcon": {
      width: "90px",
    },
    borderRightStyle: "solid",
    borderRightWidth: "1px",
    borderRightColor: theme.themeColors.lineT,
    [theme.breakpoints.down("sm")]: {
      borderRightWidth: "0px",
    },
  },
  locked: {
    fontSize: "14px",
    // color: theme.themeColors.textP,
    color: theme.themeColors.textT,
    // '& span': {
    //     color: theme.themeColors.textT
    // }
  },
  available: {
    fontSize: "14px",
    // color: theme.themeColors.textP,
    color: theme.themeColors.textT,
    // '& span': {
    //     color: theme.themeColors.textT
    // }
  },
  approveBtn: {
    width: "177px",
    height: "44px",
    lineHeight: "44px",
    textAlign: "center",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.themeColors.border,
    cursor: "pointer",
    marginTop: "20px",
    color: theme.themeColors.textT,
    "&:hover": {
      background: theme.themeColors.btnBack,
    },
    "&.Mui-disabled": {
      borderColor: theme.themeColors.btnDisabled,
      cursor: "not-allowed",
      color: theme.themeColors.textD,
    },
  },
  poolRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0px 45px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 30px",
      marginTop: "50px",
    },
  },
  balance: {
    width: "100%",
    fontSize: "14px",
    color: theme.themeColors.textT,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputBox: {
    marginTop: "10px",
    position: "relative",
    width: "100%",
    "& input": {
      width: "100%",
      height: "56px",
      background: theme.themeColors.inputBack,
      color: theme.themeColors.textT,
      border: "none",
      padding: "0px 20px",
    },
    "& a": {
      position: "absolute",
      right: "20px",
      top: "18px",
      fontSize: "14px",
      color: theme.themeColors.textT,
    },
  },
  stakeBtnBox: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
    "& button": {
      flex: "1",
      height: "44px",
      lineHeight: "44px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: theme.themeColors.border,
      fontSize: "14px",
      color: theme.themeColors.textT,
      marginLeft: "16px",
      textAlign: "center",
      cursor: "pointer",
      background: "none",
      "&:first-child": {
        marginLeft: "0px",
      },
      "&:hover": {
        background: theme.themeColors.btnBack,
      },
      "&:disabled": {
        borderColor: theme.themeColors.btnDisabled,
        cursor: "not-allowed",
        color: theme.themeColors.textD,
      },
    },
  },
  earnBox: {
    width: "100%",
    // marginLeft: '20px',
    paddingLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px",
      marginTop: "20px",
    },
  },
  earnConBox: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.themeColors.lineT,
    background: theme.themeColors.modelBack,
    width: "100%",
    height: "318px",
  },
  earnBody: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingTop: "30px",
    "& img": {
      width: "90px",
    },
  },
  earnNum: {
    marginTop: "10px",
    fontSize: "14px",
    color: theme.themeColors.textT,
    // '& span': {
    //     color: theme.themeColors.textP
    // }
  },
  claimBtn: {
    width: "177px",
    height: "44px",
    lineHeight: "44px",
    borderWidth: "1px",
    borderStyle: "solid",
    textAlign: "center",
    borderColor: theme.themeColors.border,
    marginTop: "40px",
    color: theme.themeColors.textT,
    cursor: "pointer",
    "&:hover": {
      background: theme.themeColors.btnBack,
    },
    "&.Mui-disabled": {
      borderColor: theme.themeColors.btnDisabled,
      cursor: "not-allowed",
      color: theme.themeColors.textD,
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
    };
  }

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CHANGE_NETWORK, this.networkChanged);
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
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

  networkChanged = (obj) => {
    const account = store.getStore("account");
    const basedOn = localStorage.getItem("yearn.finance-dashboard-basedon");

    const networkId = obj.network;

    this.setState({
      networkId: networkId,
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

  handleSelectedRisk = (event) => {};


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
          </div>
        </div>

        {/* <div className={classes.infoBlock}>
                <div className={classes.infoItem} style={{background: 'linear-gradient(180deg, #0EA571 0%, #0B4F38 100%)'}}>
                    <img src={ require("../../assets/img_new/stake/lock-icon@2x.png") }/>
                    <div>
                        <p className={classes.infoTit}>Total Value Locked</p>
                        <Typography variant={'h3'} className={classes.infoCon}>1,0002.00 LP</Typography>
                    </div>
                </div>
                <div className={classes.infoItem} style={{background: 'linear-gradient(180deg, #6E16C6 0%, #3B0995 100%)'}}>
                    <img src={ require("../../assets/img_new/stake/apy-icon@2x.png") }/>
                    <div>
                        <p className={classes.infoTit}>APY</p>
                        <Typography variant={'h3'} className={classes.infoCon}>12.09%</Typography>
                    </div>
                </div>
                <div className={classes.infoItem} style={{background: 'linear-gradient(180deg, #D3A416 0%, #83650A 100%)'}}>
                    <img src={ require("../../assets/img_new/stake/liquidity-icon@2x.png") }/>
                    <div>
                        <p className={classes.infoTit}>Total Liquidity</p>
                        <Typography variant={'h3'} className={classes.infoCon}>$ 100008.66</Typography>
                    </div>
                </div>
                <div className={classes.infoItem} style={{background: 'linear-gradient(180deg, #0D49C8 0%, #093083 100%)'}}>
                    <img src={ require("../../assets/img_new/stake/dvg-icon@2x.png") }/>
                    <div>
                        <p className={classes.infoTit}>DVG price</p>
                        <Typography variant={'h3'} className={classes.infoCon}>$ 0.23</Typography>
                    </div>
                </div>
            </div>
            
            <Grid container className={classes.poolAndEarnBox}>
                <Grid item sm={8} xs={12}  className={classes.poolBox}>
                    <div className={classes.poolAndEarnTop}>Stake Pool</div>
                    <Grid container>
                        <Grid item sm={5} xs={12} className={classes.poolLeft}>
                            <div>
                                <img className="coinIcon" src={require("../../assets/img_new/stake/uni@2x.png")}/>
                            </div>
                            <p className={classes.locked}>DVG-ETH UNI-V2 Locked <span>0</span></p>
                            <p className={classes.available}>Available: <span>0 LP</span></p>
                            <a className={classes.approveBtn}>Approve</a>
                        </Grid>
                        <Grid item sm={7} xs={12} className={classes.poolRight}>
                            <div className={classes.balance}>
                                <p>Available: </p>
                                <p>0.112100 LP</p>
                            </div>
                            <div className={classes.inputBox}>
                                <input />
                                <a>Max</a>
                            </div>
                            <div className={classes.stakeBtnBox}>
                                <button>Stake</button>
                                <button>Unstake</button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={12}  className={classes.earnBox}>
                    <div className={classes.earnConBox}>
                        <div className={classes.poolAndEarnTop}>DVG Earnings</div>
                        <div className={classes.earnBody}>
                            <div>
                                <img src={require("../../assets/img_new/stake/dvg_token_icon@2x.png")}/>
                            </div>
                            <p className={classes.earnNum}>0.0012 <span>DVG Earned</span></p>
                            <a className={classes.claimBtn}>Claim Rewards</a>
                        </div>
                    </div>
                    
                </Grid>
            </Grid> */}
        {this.state.snackbarMessage && this.renderSnackbar()}
      </div>
    );
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(Stake)));
