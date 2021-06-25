import * as moment from "moment";

import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  DEPOSIT_ALL_CONTRACT,
  DEPOSIT_ALL_CONTRACT_RETURNED,
  DEPOSIT_ALL_CONTRACT_RETURNED_COMPLETED,
  DEPOSIT_CONTRACT,
  DEPOSIT_CONTRACT_RETURNED,
  DEPOSIT_CONTRACT_RETURNED_COMPLETED,
  ERROR,
  GET_STRATEGY_BALANCES_FULL,
  USD_PRICE_RETURNED,
  WITHDRAW_BOTH,
  WITHDRAW_BOTH_VAULT,
  WITHDRAW_BOTH_VAULT_FAIL_RETURNED,
  WITHDRAW_BOTH_VAULT_RETURNED,
  WITHDRAW_BOTH_VAULT_RETURNED_COMPLETED,
  WITHDRAW_VAULT_RETURNED,
  WITHDRAW_VAULT_RETURNED_COMPLETED,
} from "../../constants";
import React, { Component } from "react";

import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import CloseIcon from "@material-ui/icons/Close";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import InfoIcon from "@material-ui/icons/Info";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Store from "../../stores";
import { colors } from "../../theme";
import { getTheme } from "../../theme";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

const styles = (theme) => ({
  value: {
    cursor: "pointer",
  },
  actionInput: {
    // padding: '0px 0px 12px 0px',
    "fontSize": "0.5rem",
    "marginTop": "1rem",
    "height": "42px",
    "background": theme.themeColors.inputBack,
    "& input": {
      color: theme.themeColors.textT,
    },
    "& .MuiInputBase-root": {
      borderRadius: "0px",
      height: "42px",
    },
    "& input::placeholder": {
      color: theme.themeColors.textP,
    },
    // '& input:valid + fieldset': {
    //   borderColor: 'green',
    //   borderWidth: 2,
    // },
  },

  vaultContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  actionsContainer: {
    paddingBottom: "12px",
    display: "flex",
    flex: "1",
    // padding: '24px',
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      // padding: '20px 0px',
    },
  },
  ratioContainer: {
    paddingBottom: "12px",
    display: "flex",
    flex: "1",
    padding: "24px 0",
  },
  withdrawContainer: {
    paddingBottom: "12px",
    display: "flex",
    flex: "1",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  title: {
    paddingRight: "24px",
  },
  actionButton: {
    "height": "47px",
    "margin": "auto",
    "borderRadius": "5px",
    "background": "#18a0fb",
    "color": "#ffffff",
    "width": "49%",
    "&:hover": {
      background: "#00c2ff",
    },
  },
  withdrawButtonBox: {
    display: "flex",
    width: "100%",
    marginTop: "10px",
  },
  withdrawButton: {
    "height": "42px",
    "margin": "auto",
    "borderRadius": "0px",
    "background": "none",
    "borderColor": theme.themeColors.border,
    "borderStyle": "solid",
    "borderWidth": "1px",
    "color": theme.themeColors.textT,
    "flex": 1,
    "marginLeft": "20px",
    "&:hover": {
      background: theme.themeColors.btnBack,
    },
    "&.Mui-disabled": {
      borderColor: theme.themeColors.btnDisabled,
      cursor: "not-allowed",
      color: theme.themeColors.textD,
    },
    "&:first-child": {
      marginLeft: "0px",
    },
  },
  withdrawButtonText: {
    color: theme.themeColors.textS,
    fontWeight: "700",
  },
  leftLabelContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  rightLabelContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  tradeContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    margin: "auto",
    marginBottom: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  sepperator: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.themeColors.lineT,
    margin: "24px -24px",
    // [theme.breakpoints.up('sm')]: {
    //   width: '40px',
    //   borderBottom: 'none',
    //   margin: '0px'
    // }
  },
  scaleContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "12px 0px 12px 0px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  scale: {
    // width: '24%',
    "minWidth": "auto",
    "width": "auto",
    "padding": "0px",
    "color": theme.themeColors.textP,
    "marginLeft": "12px",
    "&:first-child": {
      marginLeft: "0px",
    },
  },
  scaleActive: {
    minWidth: "25%",
    color: "#222222",
    background: "rgba(24, 160, 251, 0.2)",
    borderRadius: "5px",
  },
  buttonText: {
    fontWeight: "700",
    color: "#ffffff",
  },
  headingContainer: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  heading: {
    paddingBottom: "12px",
    flex: 1,
    flexShrink: 0,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  right: {
    textAlign: "right",
  },
  disabledContainer: {
    width: "100%",
    paddingTop: "12px",
    textAlign: "center",
  },
  assetSummary: {
    display: "flex",
    alignItems: "stretch",
    flex: 1,
    width: "100%",
    marginBottom: "24px",
    flexWrap: "wrap",
    borderTop: "1px solid #d9d9d9",
    borderTopColor: theme.themeColors.lineO,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    // borderBottom: '1px solid #d9d9d9'
  },
  headingEarning: {
    flex: 1,
    padding: "12px",
  },
  headingStrategy: {
    padding: "12px",
    width: "256px",
  },
  grey: {
    color: theme.themeColors.textP,
    fontSize: "12px",
  },
  flexy: {
    fontSize: "14px",
    color: theme.themeColors.textT,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "0.5rem",
    marginBottom: "1rem",
  },
  fullWidth: {
    minWidth: "100%",
    margin: "18px 0px",
  },
  rail: {
    height: 8,
  },
  track: {
    height: 8,
  },
  thumb: {
    width: 18,
    height: 18,
  },
  slider: {
    // width: '80%',
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    marginBottom: 16,
    [theme.breakpoints.down("sm")]: {
      // width: '90%'
    },
  },
  projected: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  withdrawalText: {
    marginTop: 20,
    marginBottom: 10,
  },
  assetDetails: {
    padding: "20px",
  },
  subtitle: {
    fontSize: "14px",
    color: theme.themeColors.textT,
  },

  // 调整样式新增
  apyText: {
    color: theme.themeColors.textT,
  },
  inputStyle: {
    borderRadius: "0px",
  },
  depositInputBox: {
    width: "100%",
    position: "relative",
  },
  depositScaleContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 0px 12px 0px",
    alignItems: "center",
    flexWrap: "wrap",
    position: "absolute",
    right: "10px",
    top: "31px",
  },
  depositScale: {
    color: theme.themeColors.textP,
    minWidth: "30px",
    padding: "0px 6px",
  },
  depositScaleActive: {
    minWidth: "30px",
    padding: "0px 6px",
    color: theme.themeColors.textT,
    // background: 'rgba(24, 160, 251, 0.2)',
    // borderRadius: '5px'
  },
  depositButtonBox: {
    width: "100%",
    display: "flex",
    marginTop: "20px",
    justifyContent: "space-between",
  },
  depositActionButton: {
    "height": "42px",
    "margin": "auto",
    "background": "none",
    "borderColor": theme.themeColors.border,
    "color": theme.themeColors.textT,
    "borderWidth": "1px",
    "borderStyle": "solid",
    "marginLeft": "20px",
    // width: '49%',
    "borderRadius": "0px",
    "cursor": "pointer",
    "flex": "1",
    "&:hover": {
      background: theme.themeColors.btnBack,
    },
    "&.Mui-disabled": {
      borderColor: theme.themeColors.btnDisabled,
      cursor: "not-allowed",
      color: theme.themeColors.textD,
    },
    "&:first-child": {
      marginLeft: "0px",
    },
  },
  depositButtonText: {
    fontWeight: "700",
    color: theme.themeColors.textT,
    fontSize: "14px",
  },
  tradeBox: {
    marginTop: "20px",
    background: theme.themeColors.tradeBack,
    padding: "20px",
  },
  earnAndVaultValue: {
    fontSize: "12px",
    color: theme.themeColors.textT,
    width: "100%",
    textAlign: "left",
  },
  earnAndVaultInput: {
    // flex: 1,
    width: "100%",
  },
  yearnEarnAndVaultBlock: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  yearnEarnAndVaultItem: {
    "flex": 1,
    "marginLeft": "20px",
    "&:first-child": {
      marginLeft: "0px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  balances: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.themeColors.textT,
  },
  changeCurrencyContainer: {
    padding: "10px 20px 20px 20px",
    position: "relative",
  },
  accountInfoBlock: {
    position: "relative",
  },
  accountInfo: {
    marginTop: "10px",
    width: "100%",
    height: "30px",
    color: theme.themeColors.textT,
    background: theme.themeColors.blockBack,
    borderColor: theme.themeColors.blockBorder,
    borderWidth: "1px",
    borderStyle: "solid",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    padding: "0px 10px",
    cursor: "pointer",
  },
  disableAccountInfoBlock: {
    pointerEvents: "none",
    opacity: 0.7,
  },
  enableAccountInfoBlock: {
    pointerEvents: "auto",
    opacity: 1.0,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.themeColors.menuSelText,
  },
  modalListItem: {
    border: "1px solid " + theme.themeColors.border,
    marginTop: "10px",
    color: theme.themeColors.textT,
    '&:active':{
        background:theme.themeColors.buttonActive
    }
  },
  assetIconImg: {
    width:'20px',
    height: "20px",
    marginRight:'5px',
  },
  dialogRoot: {
    border: "1px solid " + theme.themeColors.border,
    background: theme.themeColors.itemBack,
  },
  dialogTitle: {
    background: theme.themeColors.menuSel,
    borderColor: theme.themeColors.blockBorder,
    color: theme.themeColors.menuSelText,
  },
  dialogContent: {
    background: theme.themeColors.itemBack,
  },
  arrowDropdownIcon: {
    height: "15px",
    fill: theme.themeColors.textP,
  },
});

const marks = [
  {
    value: 0,
    label: "100",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 100,
    label: "100",
  },
];

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Asset extends Component {
  constructor() {
    super();

    this.state = {
      amount: "",
      amountError: false,
      redeemEarnAmount: "",
      redeemVaultAmount: "",
      redeemAmount: "",
      redeemAmountError: false,
      account: store.getStore("account"),
      usdPrices: store.getStore("usdPrices"),
      ratio: 50,
      earnRatio: 50,
      vaultRatio: 50,
      percent: 0,
      earnPercent: 0,
      vaultPercent: 0,
      amountPercent: 0,
      redeemAmountPercent: 0,
      hideNav: false,
      openEarnInfo: false,
      openVaultInfo: false,
      interestTheme: {}, // 当前主题数据,
      selectedCurrency: "USDT",
      tokenIndex: 0,
    };
  }

  componentWillMount() {
    emitter.on(DEPOSIT_CONTRACT_RETURNED, this.depositReturned);
    emitter.on(WITHDRAW_VAULT_RETURNED, this.withdrawReturned);
    emitter.on(DEPOSIT_ALL_CONTRACT_RETURNED, this.depositReturned);
    emitter.on(WITHDRAW_BOTH_VAULT_RETURNED, this.withdrawReturned);
    emitter.on(WITHDRAW_BOTH_VAULT_FAIL_RETURNED, this.errorReturned);
    emitter.on(ERROR, this.errorReturned);
    emitter.on("CURRENT_THEME_RETURNED", this.currentThemeChanged);
    emitter.on(USD_PRICE_RETURNED, this.handleUSDPricesReturned);
    const localTheme = localStorage.getItem("daobenturesTheme");
    this.currentThemeChanged(localTheme);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  componentWillUnmount() {
    emitter.removeListener(DEPOSIT_CONTRACT_RETURNED, this.depositReturned);
    emitter.removeListener(WITHDRAW_VAULT_RETURNED, this.withdrawReturned);
    emitter.removeListener(DEPOSIT_ALL_CONTRACT_RETURNED, this.depositReturned);
    emitter.removeListener(WITHDRAW_BOTH_VAULT_RETURNED, this.withdrawReturned);
    emitter.removeListener(
      WITHDRAW_BOTH_VAULT_FAIL_RETURNED,
      this.errorReturned
    );
    emitter.removeListener(ERROR, this.errorReturned);
    window.removeEventListener("resize", this.resize.bind(this));
    emitter.removeListener("CURRENT_THEME_RETURNED", this.currentThemeChanged);
    emitter.removeListener(USD_PRICE_RETURNED, this.handleUSDPricesReturned);
  }

  resize() {
    let currentHideNav = window.innerWidth <= 760;
    if (currentHideNav !== this.state.hideNav) {
      this.setState({ hideNav: currentHideNav });
    }
  }

  currentThemeChanged = (theme) => {
    const currentTheme = theme || store.getStore("currentTheme");
    this.setState({
      interestTheme: getTheme(currentTheme),
    });
  };

  handleModalDisplay = (open) => {
    this.setState({ displayCurrencyModal: open });
  };

  handleSelectedCurrency = (currencyType) => {
    if (this.state.loading) {
      return;
    }

    const { asset } = this.props;

    const tokenMap = { USDT: "0", USDC: "1", DAI: "2" };
    const tokenIndex = tokenMap[currencyType];

    asset.symbol = asset.symbols[tokenIndex];
    asset.balance = asset.balances[tokenIndex];
    asset.erc20address = asset.erc20addresses[tokenIndex];

    this.setState({
      selectedCurrency: currencyType,
      tokenIndex: tokenIndex,
      amount: "",
      percent: 0,
    });

    this.handleModalDisplay(false);
  };

  depositReturned = () => {
    this.setState({ loading: false, amount: "" });
  };

  withdrawReturned = (txHash) => {
    this.setState({ loading: false, redeemAmount: "" });
  };

  errorReturned = (error) => {
    this.setState({ loading: false });
  };

  handleUSDPricesReturned = () => {
    this.setState({ usdPrices: store.getStore("usdPrices") });
  };

  render() {
    const { classes, asset } = this.props;
    const {
      amount,
      amountError,
      redeemEarnAmount,
      redeemAmount,
      redeemVaultAmount,
      redeemAmountError,
      loading,
      ratio,
      earnRatio,
      vaultRatio,
      percent,
      earnPercent,
      vaultPercent,
      redeemAmountPercent,
      openEarnInfo,
      openVaultInfo,
      displayCurrencyModal,
    } = this.state;

    return (
      <div className={classes.vaultContainer}>
        <Grid container className={classes.assetSummary}>
          <Grid item sm={6} xs={12}>
            {this.renderChart(asset)}
            {/* STRATEGY 和 STATISTICS */}
            <Grid item sm={12} xs={12} className={classes.assetDetails}>
              <Typography variant={"h4"} className={classes.subtitle} noWrap>
                STRATEGY
              </Typography>

              <Grid container style={{ marginTop: "1rem" }}>
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Currently Active:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {asset.strategy}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Yearly Growth:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {(this._getAPY(asset) / 1).toFixed(2)}%{" "}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Monthly Growth:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {(this._getAPY(asset) / 12).toFixed(2)}%{" "}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Weekly Growth:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {(this._getAPY(asset) / 52).toFixed(2)}%{" "}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              <div className={classes.fullWidth}></div>
              <Typography variant={"h4"} className={classes.subtitle} noWrap>
                STATISTICS
              </Typography>

              <Grid container style={{ marginTop: "1rem" }}>
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Total Earnings:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {/**Total Earnings */}
                      {asset.strategyType === "citadel" &&
                        (asset.addressStatistics
                          ? Number(asset.addressStatistics.earnings).toFixed(2)
                          : "0.00")}
                      {asset.strategyType !== "citadel" &&
                        (asset.addressStatistics
                          ? (
                              asset.addressStatistics.earnings / asset.decimals
                            ).toFixed(2)
                          : "0.00")}
                      {asset.strategyType === "citadel" ? "USD" : asset.symbol}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Deposits:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {/** Total Deposits */}
                      {asset.strategyType === "citadel" &&
                        this.state.usdPrices &&
                        (asset.addressStatistics
                          ? Number(
                              asset.addressStatistics.totalDepositsInUSD
                            ).toFixed(2)
                          : "0.00")}
                      {asset.strategyType !== "citadel" &&
                        (asset.addressStatistics
                          ? (
                              asset.addressStatistics.totalDeposits /
                              10 ** asset.decimals
                            ).toFixed(2)
                          : "0.00")}
                      {asset.strategyType === "citadel" ? "USD" : asset.symbol}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Withdrawals:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {/** Total Withdrawals */}
                      {asset.strategyType === "citadel" &&
                        this.state.usdPrices &&
                        (asset.addressStatistics
                          ? Number(
                              asset.addressStatistics.totalWithdrawalsInUSD
                            ).toFixed(2)
                          : "0.00")}
                      {asset.strategyType !== "citadel" &&
                        (asset.addressStatistics
                          ? (
                              asset.addressStatistics.totalWithdrawals /
                              10 ** asset.decimals
                            ).toFixed(2)
                          : "0.00")}
                      {asset.strategyType === "citadel" ? "USD" : asset.symbol}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Transferred In:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {/** Total Transferred In */}
                      {asset.strategyType === "citadel" &&
                        this.state.usdPrices &&
                        (asset.addressStatistics
                          ? (
                              (asset.addressStatistics.totalTransferredIn /
                                10 ** asset.decimals) *
                              this.state.usdPrices["ethereum"].usd
                            ).toFixed(2)
                          : "0.00")}
                      {asset.strategyType !== "citadel" &&
                        (asset.addressStatistics
                          ? (
                              asset.addressStatistics.totalTransferredIn /
                              10 ** asset.decimals
                            ).toFixed(2)
                          : "0.00")}
                      {asset.strategyType === "citadel" ? "USD" : asset.symbol}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Transferred Out:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {/**Total Transferred Out */}
                      {asset.strategyType === "citadel" &&
                        this.state.usdPrices &&
                        (asset.addressStatistics
                          ? (
                              (asset.addressStatistics.totalTransferredOut /
                                10 ** asset.decimals) *
                              this.state.usdPrices["ethereum"].usd
                            ).toFixed(2)
                          : "0.00")}
                      {asset.strategyType !== "citadel" &&
                        (asset.addressStatistics
                          ? (
                              asset.addressStatistics.totalTransferredOut /
                              10 ** asset.decimals
                            ).toFixed(2)
                          : "0.00")}
                      {asset.strategyType === "citadel" ? "USD" : asset.symbol}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={6} xs={12} className={classes.tradeBox}>
            {/* 滑动条部分  */}
            {asset.strategyType === "yearn" && (
              <Grid container className={classes.slider}>
                <Grid item xs={12}>
                  <div className={classes.ratioContainer}>
                    <div className={classes.leftLabelContainer}>
                      <Typography
                        variant="h4"
                        style={{
                          color: "#7B25D2",
                          display: "flex",
                          alignItems: "center",
                        }}>
                        <HtmlTooltip
                          placement={"top"}
                          title={
                            <React.Fragment>
                              <Typography>
                                See{" "}
                                <a
                                  href="https://daoventures.gitbook.io/daoventures/"
                                  target="_blank">
                                  FAQ: Product
                                </a>{" "}
                                for more information
                              </Typography>
                            </React.Fragment>
                          }
                          open={openEarnInfo}
                          onClose={this.handleTooltipEarnClose}
                          PopperProps={{
                            disablePortal: true,
                            style: {
                              pointerEvents: "auto",
                            },
                          }}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener>
                          <InfoIcon
                            style={{
                              verticalAlign: "text-top",
                              cursor: "pointer",
                              width: "16px",
                              height: "16px",
                            }}
                            onClick={() => this.handleTooltipEarnClose()}
                          />
                        </HtmlTooltip>
                        &nbsp;
                        {"yEarn: " + earnRatio + "%"}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        className={classes.apyText}
                        variant="h4"
                        noWrap>
                        {"APY " + this._getEstimatedAPY(asset) + "%"}
                      </Typography>
                    </div>
                    <div className={classes.rightLabelContainer}>
                      <Typography
                        variant="h4"
                        style={{
                          color: "#027AFF",
                          display: "flex",
                          alignItems: "center",
                        }}>
                        {"yVault: " + vaultRatio + "%"}
                        &nbsp;
                        <HtmlTooltip
                          placement={"top"}
                          title={
                            <React.Fragment>
                              <Typography>
                                See{" "}
                                <a
                                  href="https://daoventures.gitbook.io/daoventures/"
                                  target="_blank">
                                  FAQ: Product
                                </a>{" "}
                                for more information
                              </Typography>
                            </React.Fragment>
                          }
                          open={openVaultInfo}
                          onClose={this.handleTooltipVaultClose}
                          PopperProps={{
                            disablePortal: true,
                            style: {
                              pointerEvents: "auto",
                            },
                          }}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener>
                          <InfoIcon
                            style={{
                              verticalAlign: "text-top",
                              cursor: "pointer",
                              width: "16px",
                              height: "16px",
                            }}
                            onClick={() => this.handleTooltipVaultClose()}
                          />
                        </HtmlTooltip>
                      </Typography>
                    </div>
                  </div>
                  <Slider
                    value={ratio}
                    step={10}
                    classes={{
                      rail: classes.rail,
                      track: classes.track,
                      thumb: classes.thumb,
                    }}
                    onChange={this.handleSliderChange}
                    getAriaValueText={this.sliderValueText}
                    // marks={marks}
                    aria-labelledby="continuous-slider"
                  />
                </Grid>
              </Grid>
            )}

            <div className={classes.actionsContainer}>
              {/* 充值部分 */}
              <div className={classes.tradeContainer}>
                <div className={classes.balances}>
                  {/* <Typography variant='h4' onClick={ () => { this.setAmount(100) } } className={ classes.value } noWrap>{ 'Your wallet: '+ (asset.balance ? (Math.floor(asset.balance*10000)/10000).toFixed(4) : '0.0000') } { asset.tokenSymbol ? asset.tokenSymbol : asset.symbol }</Typography> */}
                  <Typography
                    variant="body1"
                    className={classes.value}
                    noWrap
                    onClick={() => {
                      this.setAmount(100);
                    }}>
                    Your wallet
                  </Typography>

                  <Typography
                    variant="body2"
                    onClick={() => {
                      this.setAmount(100);
                    }}
                    className={classes.value}
                    noWrap>
                    {/** Wallet Balance */}
                    {asset.strategyType === "citadel" && (
                      <div>
                        {asset.balances
                          ? asset.balances[this.state.tokenIndex].toFixed(4)
                          : "0.0000"}{" "}
                        {asset.symbols
                          ? asset.symbols[this.state.tokenIndex]
                          : ""}
                      </div>
                    )}
                    {asset.strategyType !== "citadel" && (
                      <span>
                        {asset.balance
                          ? (Math.floor(asset.balance * 10000) / 10000).toFixed(
                              4
                            )
                          : "0.0000"}{" "}
                        {asset.tokenSymbol ? asset.tokenSymbol : asset.symbol}
                      </span>
                    )}
                  </Typography>
                  {/* <Typography variant='body2'  className={ classes.value } noWrap>
                     
                    </Typography> */}

                  {/** Change Currency  */}
                  {asset.strategyType === "citadel" && (
                    <div className={classes.accountInfoBlock}>
                      <div
                        className={classes.accountInfo}
                        onClick={() => {
                          this.handleModalDisplay(true);
                        }}>
                        <img
                          alt=""
                          src={require("../../assets/" +
                            this.state.selectedCurrency +
                            "-logo.png")}
                          className={classes.assetIconImg}
                          style={
                            asset.disabled ? { filter: "grayscale(100%)" } : {}
                          }
                        />
                        <span className={classes.addressSpan}>
                          {this.state.selectedCurrency}
                        </span>
                        <ArrowDropDownCircleIcon
                          className={classes.arrowDropdownIcon}
                        />
                      </div>
                    </div>
                  )}

                  <Dialog
                    onClose={() => this.handleModalDisplay(false)}
                    fullWidth={true}
                    maxWidth={"sm"}
                    classes={{ paper: classes.dialogRoot }}
                    aria-labelledby="customized-dialog-title"
                    open={displayCurrencyModal}>
                    <MuiDialogTitle
                      disableTypography
                      className={classes.dialogTitle}>
                      <Typography variant="h6">Select a Currency</Typography>
                      <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={() => this.handleModalDisplay(false)}>
                        <CloseIcon />
                      </IconButton>
                    </MuiDialogTitle>
                    <DialogContent dividers className={classes.dialogContent}>
                      <List component="nav" aria-label="main mailbox folders">
                        <ListItem
                          button
                          onClick={() => this.handleSelectedCurrency("USDT")}
                          className={classes.modalListItem}>
                          <ListItemAvatar>
                            <Avatar
                              alt=""
                              src={require("../../assets/USDT-logo.png")}
                            />
                          </ListItemAvatar>
                          <ListItemText primary="USDT" />
                        </ListItem>
                        <ListItem
                          button
                          onClick={() => this.handleSelectedCurrency("USDC")}
                          className={classes.modalListItem}>
                          <ListItemAvatar>
                            <Avatar
                              alt=""
                              src={require("../../assets/USDC-logo.png")}
                            />
                          </ListItemAvatar>
                          <ListItemText primary="USDC" />
                        </ListItem>
                        <ListItem
                          button
                          onClick={() => this.handleSelectedCurrency("DAI")}
                          className={classes.modalListItem}>
                          <ListItemAvatar>
                            <Avatar
                              alt=""
                              src={require("../../assets/DAI-logo.png")}
                            />
                          </ListItemAvatar>
                          <ListItemText primary="DAI" />
                        </ListItem>
                      </List>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className={classes.depositInputBox}>
                  <TextField
                    style={{width: "100%"}}
                    className={classes.actionInput}
                    id="amount"
                    value={amount}
                    error={amountError}
                    onChange={this.onChange}
                    disabled={loading}
                    placeholder="0.00"
                    variant="outlined"
                    onKeyDown={this.inputKeyDown}
                  />
                  <div className={classes.depositScaleContainer}>
                    <Button
                      className={
                        percent === 25
                          ? classes.depositScaleActive
                          : classes.depositScale
                      }
                      variant="text"
                      disabled={loading}
                      onClick={() => {
                        this.setAmount(25);
                      }}>
                      <Typography variant={"h5"}>25%</Typography>
                    </Button>
                    <Button
                      className={
                        percent === 50
                          ? classes.depositScaleActive
                          : classes.depositScale
                      }
                      variant="text"
                      disabled={loading}
                      onClick={() => {
                        this.setAmount(50);
                      }}>
                      <Typography variant={"h5"}>50%</Typography>
                    </Button>
                    <Button
                      className={
                        percent === 75
                          ? classes.depositScaleActive
                          : classes.depositScale
                      }
                      variant="text"
                      disabled={loading}
                      onClick={() => {
                        this.setAmount(75);
                      }}>
                      <Typography variant={"h5"}>75%</Typography>
                    </Button>
                    <Button
                      className={
                        percent === 100
                          ? classes.depositScaleActive
                          : classes.depositScale
                      }
                      variant="text"
                      disabled={loading}
                      onClick={() => {
                        this.setAmount(100);
                      }}>
                      {/* <Typography variant={'h5'}>100%</Typography> */}
                      <Typography variant={"h5"}>Max</Typography>
                    </Button>
                  </div>
                </div>
                <div className={classes.depositButtonBox}>
                  {asset.deposit === true && (
                    <Button
                      className={classes.depositActionButton}
                      disabled={
                        loading ||
                        asset.balance <= 0 ||
                        asset.depositDisabled === true
                      }
                      onClick={this.onDeposit}>
                      {/* <Typography className={ classes.depositButtonText } variant={ 'h5'} color={asset.disabled?'':'secondary'}>Deposit</Typography> */}
                      <span>Deposit</span>
                    </Button>
                  )}
                  {asset.depositAll === true && (
                    <Button
                      className={classes.depositActionButton}
                      disabled={
                        loading ||
                        asset.balance <= 0 ||
                        asset.depositDisabled === true
                      }
                      onClick={this.onDepositAll}>
                      {/* <Typography className={ classes.depositButtonText } variant={ 'h5'} color={asset.disabled?'':'secondary'}>Deposit All</Typography> */}
                      <span>Deposit All</span>
                    </Button>
                  )}
                </div>
                {asset.depositDisabled === true && (
                  <div className={classes.disabledContainer}>
                    <Typography variant="h4">
                      Deposits are currently disabled for this vault
                    </Typography>
                  </div>
                )}
              </div>

              <div className={classes.sepperator}></div>

              {/* 提现部分 Withdrawer */}
              <div className={classes.tradeContainer}>
                {asset.strategyType === "yearn" && (
                  <div className={classes.yearnEarnAndVaultBlock}>
                    <div className={classes.yearnEarnAndVaultItem}>
                      <Typography
                        variant="h5"
                        style={{ color: "#7B25D2" }}
                        className={classes.withdrawalText}>
                        Earn
                      </Typography>
                      <Typography
                        variant="h4"
                        onClick={() => {
                          this.setRedeemEarnAmount(100);
                        }}
                        className={classes.earnAndVaultValue}
                        noWrap>
                        {asset.earnBalance
                          ? (
                              Math.floor(
                                asset.earnBalance *
                                  asset.earnPricePerFullShare *
                                  10000
                              ) / 10000
                            ).toFixed(4)
                          : "0.0000"}{" "}
                        {asset.symbol} (
                        {asset.earnBalance
                          ? (
                              Math.floor(asset.earnBalance * 10000) / 10000
                            ).toFixed(4)
                          : "0.0000"}{" "}
                        {asset.vaultSymbol}){" "}
                      </Typography>
                      <TextField
                        className={`${classes.actionInput} ${classes.earnAndVaultInput}`}
                        id="redeemEarnAmount"
                        value={redeemEarnAmount}
                        error={redeemAmountError}
                        onChange={this.onChange}
                        disabled={loading}
                        placeholder="0.00"
                        variant="outlined"
                        onKeyDown={this.inputRedeemKeyDown}
                      />
                      <div className={classes.scaleContainer}>
                        <Button
                          className={
                            earnPercent === 25
                              ? classes.depositScaleActive
                              : classes.depositScale
                          }
                          variant="text"
                          disabled={loading}
                          color="primary"
                          onClick={() => {
                            this.setRedeemEarnAmount(25);
                          }}>
                          <Typography variant={"h5"}>25%</Typography>
                        </Button>
                        <Button
                          className={
                            earnPercent === 50
                              ? classes.depositScaleActive
                              : classes.depositScale
                          }
                          variant="text"
                          disabled={loading}
                          color="primary"
                          onClick={() => {
                            this.setRedeemEarnAmount(50);
                          }}>
                          <Typography variant={"h5"}>50%</Typography>
                        </Button>
                        <Button
                          className={
                            earnPercent === 75
                              ? classes.depositScaleActive
                              : classes.depositScale
                          }
                          variant="text"
                          disabled={loading}
                          color="primary"
                          onClick={() => {
                            this.setRedeemEarnAmount(75);
                          }}>
                          <Typography variant={"h5"}>75%</Typography>
                        </Button>
                        <Button
                          className={
                            earnPercent === 100
                              ? classes.depositScaleActive
                              : classes.depositScale
                          }
                          variant="text"
                          disabled={loading}
                          color="primary"
                          onClick={() => {
                            this.setRedeemEarnAmount(100);
                          }}>
                          <Typography variant={"h5"}>Max</Typography>
                        </Button>
                      </div>
                    </div>
                    <div className={classes.yearnEarnAndVaultItem}>
                      <Typography
                        variant="h5"
                        style={{ color: "#027AFF" }}
                        className={classes.withdrawalText}>
                        Vault
                      </Typography>
                      <Typography
                        variant="h4"
                        onClick={() => {
                          this.setRedeemVaultAmount(100);
                        }}
                        className={classes.earnAndVaultValue}
                        noWrap>
                        {asset.vaultBalance
                          ? (
                              Math.floor(
                                asset.vaultBalance *
                                  asset.vaultPricePerFullShare *
                                  10000
                              ) / 10000
                            ).toFixed(4)
                          : "0.0000"}{" "}
                        {asset.symbol} (
                        {asset.vaultBalance
                          ? (
                              Math.floor(asset.vaultBalance * 10000) / 10000
                            ).toFixed(4)
                          : "0.0000"}{" "}
                        {asset.vaultSymbol}){" "}
                      </Typography>
                      <TextField
                        fullWidth
                        className={`${classes.actionInput} ${classes.earnAndVaultInput}`}
                        id="redeemVaultAmount"
                        value={redeemVaultAmount}
                        error={redeemAmountError}
                        onChange={this.onChange}
                        disabled={loading}
                        placeholder="0.00"
                        variant="outlined"
                        onKeyDown={this.inputRedeemKeyDown}
                      />
                      <div className={classes.scaleContainer}>
                        <Button
                          className={
                            vaultPercent === 25
                              ? classes.depositScaleActive
                              : classes.depositScale
                          }
                          variant="text"
                          disabled={loading}
                          color="primary"
                          onClick={() => {
                            this.setRedeemVaultAmount(25);
                          }}>
                          <Typography variant={"h5"}>25%</Typography>
                        </Button>
                        <Button
                          className={
                            vaultPercent === 50
                              ? classes.depositScaleActive
                              : classes.depositScale
                          }
                          variant="text"
                          disabled={loading}
                          color="primary"
                          onClick={() => {
                            this.setRedeemVaultAmount(50);
                          }}>
                          <Typography variant={"h5"}>50%</Typography>
                        </Button>
                        <Button
                          className={
                            vaultPercent === 75
                              ? classes.depositScaleActive
                              : classes.depositScale
                          }
                          variant="text"
                          disabled={loading}
                          color="primary"
                          onClick={() => {
                            this.setRedeemVaultAmount(75);
                          }}>
                          <Typography variant={"h5"}>75%</Typography>
                        </Button>
                        <Button
                          className={
                            vaultPercent === 100
                              ? classes.depositScaleActive
                              : classes.depositScale
                          }
                          variant="text"
                          disabled={loading}
                          color="primary"
                          onClick={() => {
                            this.setRedeemVaultAmount(100);
                          }}>
                          <Typography variant={"h5"}>Max</Typography>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                {asset.strategyType === "compound" && (
                  <div className={classes.withdrawContainer}>
                    <div className={classes.tradeContainer}>
                      <div className={classes.balances}>
                        <Typography
                          variant="body1"
                          onClick={() => {
                            this.setRedeemAmount(100);
                          }}
                          className={classes.value}
                          noWrap>
                          {asset.strategyBalance
                            ? (
                                Math.floor(
                                  asset.strategyBalance *
                                    asset.compoundExchangeRate *
                                    10000
                                ) / 10000
                              ).toFixed(4)
                            : "0.0000"}{" "}
                          {asset.symbol} (
                          {asset.strategyBalance
                            ? (
                                Math.floor(asset.strategyBalance * 10000) /
                                10000
                              ).toFixed(4)
                            : "0.0000"}{" "}
                          {asset.vaultSymbol}){" "}
                        </Typography>
                      </div>
                      <div className={classes.depositInputBox}>
                        <TextField
                          style={{ width: "100%" }}
                          className={classes.actionInput}
                          id="redeemAmount"
                          value={redeemAmount}
                          error={redeemAmountError}
                          onChange={this.onChange}
                          disabled={loading}
                          placeholder="0.00"
                          variant="outlined"
                          onKeyDown={this.inputRedeemKeyDown}
                        />
                        <div className={classes.depositScaleContainer}>
                          <Button
                            className={
                              redeemAmountPercent === 25
                                ? classes.depositScaleActive
                                : classes.depositScale
                            }
                            variant="text"
                            disabled={loading}
                            color="primary"
                            onClick={() => {
                              this.setRedeemAmount(25);
                            }}>
                            <Typography variant={"h5"}>25%</Typography>
                          </Button>

                          <Button
                            className={
                              redeemAmountPercent === 50
                                ? classes.depositScaleActive
                                : classes.depositScale
                            }
                            variant="text"
                            disabled={loading}
                            color="primary"
                            onClick={() => {
                              this.setRedeemAmount(50);
                            }}>
                            <Typography variant={"h5"}>50%</Typography>
                          </Button>

                          <Button
                            className={
                              redeemAmountPercent === 75
                                ? classes.depositScaleActive
                                : classes.depositScale
                            }
                            variant="text"
                            disabled={loading}
                            color="primary"
                            onClick={() => {
                              this.setRedeemAmount(75);
                            }}>
                            <Typography variant={"h5"}>75%</Typography>
                          </Button>

                          <Button
                            className={
                              redeemAmountPercent === 100
                                ? classes.depositScaleActive
                                : classes.depositScale
                            }
                            variant="text"
                            disabled={loading}
                            color="primary"
                            onClick={() => {
                              this.setRedeemAmount(100);
                            }}>
                            <Typography variant={"h5"}>Max</Typography>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {asset.strategyType === "citadel" && (
                  <div className={classes.withdrawContainer}>
                    <div className={classes.tradeContainer}>
                      <div className={classes.balances}>
                        <Typography
                          variant="body1"
                          onClick={() => {
                            this.setRedeemAmount(100);
                          }}
                          className={classes.value}
                          noWrap>
                          {(asset.strategyBalance
                            ? (
                                Math.floor(
                                  (asset.strategyBalance /
                                    10 ** asset.decimals) *
                                    10000
                                ) / 10000
                              ).toFixed(4)
                            : "0.0000") + " daoCDV"}{" "}
                          {asset.strategyBalance > 0 && (
                            <span>
                              (
                              {asset.depositedSharesInUSD
                                ? (
                                    asset.depositedSharesInUSD /
                                    asset.priceInUSD[this.state.tokenIndex]
                                  ).toFixed(4)
                                : "0.0000"}{" "}
                              {asset.symbols[this.state.tokenIndex]})
                            </span>
                          )}
                        </Typography>
                      </div>

                      <div className={classes.depositInputBox}>
                        <TextField
                          style={{ width: "100%" }}
                          className={classes.actionInput}
                          id="redeemAmount"
                          value={redeemAmount}
                          error={redeemAmountError}
                          onChange={this.onChange}
                          disabled={loading}
                          placeholder="0.00"
                          variant="outlined"
                          onKeyDown={this.inputRedeemKeyDown}
                        />
                        <div className={classes.depositScaleContainer}>
                          <Button
                            className={
                              redeemAmountPercent === 25
                                ? classes.depositScaleActive
                                : classes.depositScale
                            }
                            variant="text"
                            disabled={loading}
                            color="primary"
                            onClick={() => {
                              this.setRedeemAmount(25);
                            }}>
                            <Typography variant={"h5"}>25%</Typography>
                          </Button>

                          <Button
                            className={
                              redeemAmountPercent === 50
                                ? classes.depositScaleActive
                                : classes.depositScale
                            }
                            variant="text"
                            disabled={loading}
                            color="primary"
                            onClick={() => {
                              this.setRedeemAmount(50);
                            }}>
                            <Typography variant={"h5"}>50%</Typography>
                          </Button>

                          <Button
                            className={
                              redeemAmountPercent === 75
                                ? classes.depositScaleActive
                                : classes.depositScale
                            }
                            variant="text"
                            disabled={loading}
                            color="primary"
                            onClick={() => {
                              this.setRedeemAmount(75);
                            }}>
                            <Typography variant={"h5"}>75%</Typography>
                          </Button>

                          <Button
                            className={
                              redeemAmountPercent === 100
                                ? classes.depositScaleActive
                                : classes.depositScale
                            }
                            variant="text"
                            disabled={loading}
                            color="primary"
                            onClick={() => {
                              this.setRedeemAmount(100);
                            }}>
                            <Typography variant={"h5"}>Max</Typography>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className={classes.withdrawButtonBox}>
                  {asset.withdraw === true && (
                    <Button
                      className={classes.withdrawButton}
                      disabled={
                        loading ||
                        (asset.vaultBalance <= 0 &&
                          asset.earnBalance <= 0 ** asset.strategyBalance <= 0)
                      }
                      onClick={this.onWithdraw}
                      fullWidth>
                      {/* <Typography className={ classes.withdrawButtonText } variant={ 'h5'}>Withdraw</Typography> */}
                      <span>Withdraw</span>
                    </Button>
                  )}
                  {asset.withdrawAll === true && (
                    <Button
                      className={classes.withdrawButton}
                      disabled={
                        loading ||
                        (asset.vaultBalance <= 0 &&
                          asset.earnBalance <= 0 ** asset.strategyBalance <= 0)
                      }
                      onClick={this.onWithdrawAll}
                      fullWidth>
                      {/* <Typography className={ classes.withdrawButtonText } variant={ 'h5'}>Withdraw All</Typography> */}
                      <span>Withdraw All</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  renderChart = (asset) => {
    var earnAPY = [];
    var vaultAPY = [];
    var compoundAPY = [];
    var citadelAPY = [];
    var labels = [];

    const { hideNav } = this.state;

    const sortByTimestamp = (a, b) => {
      if (a.timestamp > b.timestamp) return 1;
      if (a.timestamp < b.timestamp) return -1;
      return 0;
    };

    if (asset.historicalAPY) {
      // this gives an object with dates as keys
      const groups = asset.historicalAPY
        .sort(sortByTimestamp)
        .reduce((groups, apy) => {
          const date = moment.unix(apy.timestamp / 1000).format("DD-MM-YYYY");
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(apy);
          return groups;
        }, {});

      try {
        Object.keys(groups).forEach((date) => {
          // first attempt
          labels.push(date);

          if (asset.strategyType === "yearn") {
            earnAPY.push([
              date,
              parseFloat((parseFloat(groups[date][0].aprs) * 100).toFixed(4)),
            ]);
            vaultAPY.push([
              date,
              parseFloat(groups[date][0].apyInceptionSample.toFixed(4)),
            ]);
          } else if (asset.strategyType === "compound") {
            compoundAPY.push([
              date,
              parseFloat(groups[date][0].compoundApy.toFixed(4)),
            ]);
          } else if (asset.strategyType === "citadel") {
            citadelAPY.push([
              date,
              parseFloat(groups[date][0].citadelApy.toFixed(4)),
            ]);
          }

          // second attempt
          var halfCount = Math.round(Number(groups[date].length / 2));
          if (halfCount !== 1) {
            labels.push(date);

            if (asset.strategyType === "yearn") {
              earnAPY.push([
                date,
                parseFloat(
                  (parseFloat(groups[date][halfCount].aprs) * 100).toFixed(4)
                ),
              ]);
              vaultAPY.push([
                date,
                parseFloat(
                  groups[date][halfCount].apyInceptionSample.toFixed(4)
                ),
              ]);
            } else if (asset.strategyType === "compound") {
              compoundAPY.push([
                date,
                parseFloat(groups[date][halfCount].compoundApy.toFixed(4)),
              ]);
            } else if (asset.strategyType === "citadel") {
              citadelAPY.push([
                date,
                parseFloat(groups[date][halfCount].citadelApy.toFixed(4)),
              ]);
            }
          }
        });
      } catch (ex) {}
    }

    let options = {};

    if (asset.strategyType === "yearn") {
      options = {
        chart: {
          width: hideNav ? 300 : 420,
        },
        title: {
          text: "Historical Earn & Vault Performance",
        },
        xAxis: {
          categories: labels,
        },
        series: [
          {
            name: "Earn",
            data: earnAPY,
            color: "#7F25D9",
          },
          {
            name: "Vault",
            data: vaultAPY,
            color: "#027AFF",
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 450,
                chartOptions: {
                  chart: {
                    width: 300,
                  },
                },
              },
            },
          ],
        },
        credits: {
          enabled: false,
        },
      };
    } else if (asset.strategyType === "compound") {
      options = {
        chart: {
          width: hideNav ? 300 : 420,
        },
        title: {
          text: "Historical Vault Performance",
        },
        xAxis: {
          categories: labels,
        },
        series: [
          {
            name: "Compound",
            data: compoundAPY,
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 450,
                chartOptions: {
                  chart: {
                    width: 300,
                  },
                },
              },
            },
          ],
        },
        credits: {
          enabled: false,
        },
      };
    } else if (asset.strategyType === "citadel") {
      options = {
        chart: {
          width: hideNav ? 300 : 420,
        },
        title: {
          text: "Historical Vault Performance",
        },
        xAxis: {
          categories: labels,
        },
        series: [
          {
            name: "Citadel",
            data: citadelAPY,
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 450,
                chartOptions: {
                  chart: {
                    width: 300,
                  },
                },
              },
            },
          ],
        },
        credits: {
          enabled: false,
        },
      };
    }

    const chartTitle = {
      yearn: "Historical Earn & Vault Performance",
      compound: "Historical Vault Performance",
      citadel: "Historical Vault Performance",
    };

    // 调整折线图展示
    options["legend"] = {
      align: "right",
      verticalAlign: "top",
      padding: 3,
      itemMarginTop: 10,
      itemMarginBottom: 20,
      itemStyle: {
        lineHeight: "14px",
        color: this.state.interestTheme.themeColors.textP,
      },
    };

    options["title"] = {
      text: chartTitle[asset.strategyType],
      align: "left",
      floating: true,
      y: 20,
      style: {
        fontSize: "14px",
        
        color: this.state.interestTheme.themeColors.textT,
      },
    };

    options["chart"] = {
      width: hideNav ? 300 : null,
      backgroundColor: this.state.interestTheme.themeColors.itemBack,
      spacingLeft: 25,
    };

    options["yAxis"] = {
      gridLineColor: this.state.interestTheme.themeColors.lineT,
      title: {
        text: "",
      },
      labels: {
        style: {
          color: this.state.interestTheme.themeColors.textP,
          fontSize: "12px",
        },
        format: "{value}%",
      },
    };

    options["xAxis"] = {
      categories: labels,
      tickColor: this.state.interestTheme.themeColors.lineT,
      lineColor: this.state.interestTheme.themeColors.lineT,
      labels: {
        style: {
          color: this.state.interestTheme.themeColors.textP,
          fontSize: "12px",
        },
      },
    };

    options["tooltip"] = {
      backgroundColor: this.state.interestTheme.themeColors.tooltipBack,
      style: {
        color: this.state.interestTheme.themeColors.textT,
      },
      formatter: function () {
        var label =
          "<b>" + this.x + "</b><br/>" + this.series.name + ": " + this.y + "%";
        return label;
      },
    };

    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          style={{ margin: "auto" }}
        />
      </div>
    );
  };

  _getAPY = (asset) => {
    const { basedOn } = this.props;
    // To calculate APY (Vault + Earn divide by 2 : Estimated)
    // Compound APY is using compoundApy
    if (asset && asset.stats) {
      if (asset.strategyType === "compound") {
        if (asset.stats.compoundApy) {
          return asset.stats.compoundApy;
        } else {
          return "0.00";
        }
      } else if (asset.strategyType === "yearn") {
        switch (basedOn) {
          case 1:
            return (
              (asset.stats.apyOneWeekSample + parseFloat(asset.earnApr) * 100) /
              2
            );
          case 2:
            return (
              (asset.stats.apyOneMonthSample +
                parseFloat(asset.earnApr) * 100) /
              2
            );
          case 3:
            return (
              (asset.stats.apyInceptionSample +
                parseFloat(asset.earnApr) * 100) /
              2
            );
          default:
            return (asset.apy + parseFloat(asset.earnApr) * 100) / 2;
        }
      } else if (asset.strategyType === "citadel") {
        return asset.stats.citadelApy;
      }
    } else {
      return "0.00";
    }
  };

  _getEstimatedAPY = (asset) => {
    const { earnRatio, vaultRatio } = this.state;

    const earnAPY = asset.earnApr ? parseFloat(asset.earnApr) * 100 : 0;
    const vaultAPY = asset && asset.stats ? asset.stats.apyInceptionSample : 0;
    return (
      (earnAPY * earnRatio) / 100 +
      (vaultAPY * vaultRatio) / 100
    ).toFixed(2);
  };

  handleSliderChange = (event, newValue) => {
    this.setState({
      ratio: newValue,
      earnRatio: 100 - newValue,
      vaultRatio: newValue,
    });
  };

  onChange = (event) => {
    let val = [];
    val[event.target.id] = event.target.value;
    this.setState(val);
  };

  inputKeyDown = (event) => {
    if (event.which === 13) {
      this.onInvest();
    }
  };

  sliderValueText = (value) => {
    return value;
  };

  onDeposit = () => {
    this.setState({ amountError: false });

    const { amount, earnRatio, vaultRatio, tokenIndex } = this.state;
    const { asset, startLoading } = this.props;

    let assetBalance =
      asset.strategyType !== "citadel"
        ? asset.balance
        : asset.balances[this.state.tokenIndex];

    assetBalance = (Math.floor(assetBalance * 10000) / 10000).toFixed(4);

    if (
      !amount ||
      isNaN(amount) ||
      parseFloat(amount) <= parseFloat("0.0") ||
      parseFloat(amount) > assetBalance
    ) {
      this.setState({ amountError: true });
      return false;
    }

    this.setState({ loading: true });
    startLoading();

    if (asset.strategyType === "yearn") {
      dispatcher.dispatch({
        type: DEPOSIT_CONTRACT,
        content: {
          earnAmount: ((amount * earnRatio) / 100).toString(),
          vaultAmount: ((amount * vaultRatio) / 100).toString(),
          amount: "0",
          asset,
        },
      });
    } else if (asset.strategyType === "compound") {
      dispatcher.dispatch({
        type: DEPOSIT_CONTRACT,
        content: {
          earnAmount: 0,
          vaultAmount: 0,
          amount: amount.toString(),
          asset,
        },
      });
    } else if (asset.strategyType === "citadel") {
      dispatcher.dispatch({
        type: DEPOSIT_CONTRACT,
        content: {
          earnAmount: 0,
          vaultAmount: 0,
          amount: amount.toString(),
          tokenIndex: tokenIndex, // TODO: Change to state variable
          asset,
        },
      });
    }
  };

  onDepositAll = () => {
    const { asset, startLoading } = this.props;
    const { earnRatio, vaultRatio, tokenIndex } = this.state;
    this.setState({ loading: true });
    startLoading();
    let amount;

    if (asset.strategyType === "citadel") {
      amount = (asset.balances[this.state.tokenIndex] * 100) / 100;
    } else {
      const balance = asset.balance;
      amount = (balance * 100) / 100;
      amount = Math.floor(amount * 10000) / 10000;
    }

    amount = amount.toFixed(4);

    if (asset.strategyType === "yearn") {
      dispatcher.dispatch({
        type: DEPOSIT_ALL_CONTRACT,
        content: {
          asset,
          earnAmount: ((asset.balance * earnRatio) / 100).toString(),
          vaultAmount: ((asset.balance * vaultRatio) / 100).toString(),
        },
      });
    } else if (asset.strategyType === "compound") {
      dispatcher.dispatch({
        type: DEPOSIT_ALL_CONTRACT,
        content: {
          earnAmount: 0,
          vaultAmount: 0,
          amount: amount,
          asset,
        },
      });
    } else if (asset.strategyType === "citadel") {
      dispatcher.dispatch({
        type: DEPOSIT_ALL_CONTRACT,
        content: {
          earnAmount: 0,
          vaultAmount: 0,
          amount: amount,
          tokenIndex: tokenIndex,
          asset,
        },
      });
    }
  };

  onWithdraw = () => {
    this.setState({ redeemAmountError: false });
    let { redeemVaultAmount, redeemEarnAmount, redeemAmount, tokenIndex } =
      this.state;

    const { asset, startLoading } = this.props;

    if (asset.strategyType === "yearn") {
      // let redeemVaultAmount = this.state.redeemVaultAmount.toString();
      redeemVaultAmount = (
        Math.floor(redeemVaultAmount * 10000) / 10000
      ).toFixed(4);

      const vaultShares = (
        Math.floor(
          asset.vaultBalance *
            asset.vaultPricePerFullShare *
            10000
        ) / 10000
      ).toFixed(4);
      
      if (
        !redeemVaultAmount ||
        isNaN(redeemVaultAmount) ||
        redeemVaultAmount < parseFloat("0.0") ||
        redeemVaultAmount > vaultShares
      ) {
        this.setState({ redeemAmountError: true });
        return false;
      }

      // let redeemEarnAmount = this.state.redeemEarnAmount.toString();
      redeemEarnAmount = (
        Math.floor(redeemEarnAmount * 10000) 
        / 10000
      ).toFixed(4);

      const earnShares = (
        Math.floor(
          asset.earnBalance *
            asset.earnPricePerFullShare *
            10000
        ) / 10000
      ).toFixed(4);

      if (
        !redeemEarnAmount ||
        isNaN(redeemEarnAmount) ||
        redeemEarnAmount < parseFloat("0.0") ||
        redeemEarnAmount > earnShares
      ) {
        this.setState({ redeemAmountError: true });
        return false;
      }

      this.setState({ loading: true });
      startLoading();

      dispatcher.dispatch({
        type: WITHDRAW_BOTH,
        content: {
          earnAmount: redeemEarnAmount,
          vaultAmount: redeemVaultAmount,
          amount: "0",
          asset: asset,
        },
      });
    } else if (asset.strategyType === "compound") {
      // let redeemAmount = this.state.redeemAmount.toString();
      redeemAmount = (Math.floor(redeemAmount * 10000) / 10000).toFixed(4);
      
      const depositedShares = (
        Math.floor(
          asset.strategyBalance *
            asset.compoundExchangeRate *
            10000
        ) / 10000
      ).toFixed(4);

      if (!redeemAmount || isNaN(redeemAmount) || redeemAmount < parseFloat("0.0") || redeemAmount > depositedShares) {
        this.setState({ redeemAmountError: true });
        return false;
      }

      this.setState({ loading: true });
      startLoading();

      dispatcher.dispatch({
        type: WITHDRAW_BOTH,
        content: {
          earnAmount: "0",
          vaultAmount: "0",
          amount: redeemAmount,
          asset: asset,
        },
      });
    } else if (asset.strategyType === "citadel") {
      // let redeemAmount = this.state.redeemAmount.toString();
      // let tokenIndex = this.state
      redeemAmount = (Math.floor(redeemAmount * 10000) / 10000).toFixed(4);

      const depositedShares = (Math.floor((asset.strategyBalance / 10 ** asset.decimals) * 10000) / 10000).toFixed(4);

      if (!redeemAmount || isNaN(redeemAmount) || redeemAmount < parseFloat("0.0") || redeemAmount > depositedShares ) {
        this.setState({ redeemAmountError: true });
        return false;
      }

      let shares = (redeemAmount * 10 ** asset.decimals).toString();

      this.setState({ loading: true });
      startLoading();

      dispatcher.dispatch({
        type: WITHDRAW_BOTH,
        content: {
          earnAmount: "0",
          vaultAmount: "0",
          amount: shares,
          asset: asset,
          tokenIndex: tokenIndex,
        },
      });
    }
  };

  onWithdrawAll = () => {
    const { asset, startLoading } = this.props;
    const { tokenIndex } = this.state;

    this.setState({ loading: true });
    startLoading();
    dispatcher.dispatch({
      type: WITHDRAW_BOTH_VAULT,
      content: { asset: asset, tokenIndex: tokenIndex },
    });
  };

  setAmount = (percent) => {
    if (this.state.loading) {
      return;
    }

    const { asset } = this.props;

    let amount = 0.0;

    if (asset.strategyType === "citadel") {
      amount = (asset.balances[this.state.tokenIndex] * percent) / 100;
    } else {
      const balance = asset.balance;
      amount = (balance * percent) / 100;
      amount = Math.floor(amount * 10000) / 10000;
    }

    this.setState({ amount: amount.toFixed(4), percent });
  };

  setCurrency = (tokenIndex) => {
    if (this.state.loading) {
      return;
    }

    const { asset } = this.props;

    asset.symbol = asset.symbols[tokenIndex];
    asset.balance = asset.balances[tokenIndex];
    asset.erc20address = asset.erc20addresses[tokenIndex];

    this.setState({ tokenIndex: tokenIndex });
  };

  setRedeemAmount = (percent) => {
    if (this.state.loading) {
      return;
    }

    const balance = this.props.asset.strategyBalance;
    const decimals = this.props.asset.decimals;
    const asset = this.props.asset;
    let amount;

    if (asset.strategyType === "citadel") {
      amount = (balance * percent) / 100;
      amount = Math.floor((amount / 10 ** decimals) * 10000) / 10000;
    } else {
      amount = (balance * percent) / 100;
      amount = Math.floor((amount * 10000) / 10000);
    }

    this.setState({
      redeemAmount: amount.toFixed(4),
      redeemAmountPercent: percent,
    });
  };

  setRedeemVaultAmount = (percent) => {
    if (this.state.loading) {
      return;
    }

    const balance = this.props.asset.vaultBalance;

    let amount = (balance * percent) / 100;
    amount = Math.floor(amount * 10000) / 10000;

    this.setState({
      redeemVaultAmount: amount.toFixed(4),
      vaultPercent: percent,
    });
  };

  setRedeemEarnAmount = (percent) => {
    if (this.state.loading) {
      return;
    }

    const balance = this.props.asset.earnBalance;
    let amount = (balance * percent) / 100;
    amount = Math.floor(amount * 10000) / 10000;

    this.setState({
      redeemEarnAmount: amount.toFixed(4),
      earnPercent: percent,
    });
  };

  handleTooltipEarnClose = () => {
    this.setState({
      openEarnInfo: !this.state.openEarnInfo,
    });
  };

  handleTooltipVaultClose = () => {
    this.setState({
      openVaultInfo: !this.state.openVaultInfo,
    });
  };
}

export default withRouter(withStyles(styles, { withTheme: true })(Asset));
