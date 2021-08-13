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
  DEPOSIT_CONTRACT_RETURNED_COMPLETED,
  ERROR,
  HAPPY_HOUR_VERIFY,
  WITHDRAW_BOTH,
  WITHDRAW_BOTH_VAULT,
  WITHDRAW_BOTH_VAULT_FAIL_RETURNED,
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
  test: {
    borderColor: "#ff0000",
  },
  actionInput: {
    borderColor: "#ff0000",
    // padding: '0px 0px 12px 0px',
    fontSize: "0.5rem",
    marginTop: "1rem",
    height: "42px",
    background: theme.themeColors.inputBack,
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
    // paddingBottom: "12px",
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
    height: "47px",
    margin: "auto",
    borderRadius: "5px",
    background: "#18a0fb",
    color: "#ffffff",
    width: "49%",
    "&:hover": {
      background: "#00c2ff",
    },
  },
  withdrawButtonBox: {
    display: "flex",
    width: "100%",
    // marginTop: "10px",
  },
  withdrawButton: {
    height: "42px",
    margin: "auto",
    borderRadius: "0px",
    background: "none",
    borderColor: theme.themeColors.border,
    borderStyle: "solid",
    borderWidth: "1px",
    color: theme.themeColors.textT,
    flex: 1,
    marginLeft: "20px",
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
    // alignItems: "center",
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
    minWidth: "auto",
    width: "auto",
    padding: "0px",
    color: theme.themeColors.textP,
    marginLeft: "12px",
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
  depositIputBox: {
    borderColor: "#ff0000",
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
    height: "42px",
    margin: "auto",
    background: "none",
    borderColor: theme.themeColors.border,
    color: theme.themeColors.textT,
    borderWidth: "1px",
    borderStyle: "solid",
    marginLeft: "20px",
    // width: '49%',
    borderRadius: "0px",
    cursor: "pointer",
    flex: "1",
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
    flex: 1,
    marginLeft: "20px",
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
    "&:active": {
      background: theme.themeColors.buttonActive,
    },
  },
  assetIconImg: {
    width: "20px",
    height: "20px",
    marginRight: "5px",
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
  errorMessage: {
    align: "left",
    color: theme.themeColors.formError,
    marginTop: "3px",
  },
  happyHourWarning: {
    align: "left",
    color: theme.themeColors.formWarning,
    marginTop: "3px",
  },
  happyHourMessage: {
    fontSize: "12px",
    align: "left",
    color: theme.themeColors.formHappyHour,
    marginTop: "3px",
  },
});

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

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
      redeemEarnAmountError: false,
      account: store.getStore("account"),
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
      errorMessage: "",
      amountAboveThreshold: false,
      scales: [25, 50, 75, 100],
      withdrawErrorMessage: "",
      withdrawEarnErrorMessage: "",
      happyHourWarning: "",
      happyHourMessage: "",
    };
  }

  componentWillMount() {
    emitter.on(DEPOSIT_CONTRACT_RETURNED_COMPLETED, this.depositReturned); // Trigger function after deposit contract process is completd
    emitter.on(DEPOSIT_ALL_CONTRACT_RETURNED, this.depositReturned);
    emitter.on(WITHDRAW_VAULT_RETURNED_COMPLETED, this.withdrawReturned);
    emitter.on(WITHDRAW_BOTH_VAULT_RETURNED_COMPLETED, this.withdrawReturned);
    emitter.on(WITHDRAW_BOTH_VAULT_FAIL_RETURNED, this.errorReturned);
    emitter.on(ERROR, this.errorReturned);
    emitter.on("CURRENT_THEME_RETURNED", this.currentThemeChanged);
    emitter.on(HAPPY_HOUR_VERIFY, this.happyHourVerify);
    const localTheme = localStorage.getItem("daobenturesTheme");
    this.currentThemeChanged(localTheme);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  componentWillUnmount() {
    emitter.removeListener(
      DEPOSIT_CONTRACT_RETURNED_COMPLETED,
      this.depositReturned
    );
    emitter.removeListener(
      DEPOSIT_ALL_CONTRACT_RETURNED_COMPLETED,
      this.depositReturned
    );
    emitter.removeListener(
      WITHDRAW_VAULT_RETURNED_COMPLETED,
      this.withdrawReturned
    );
    emitter.removeListener(
      WITHDRAW_BOTH_VAULT_RETURNED_COMPLETED,
      this.withdrawReturned
    );
    emitter.removeListener(
      WITHDRAW_BOTH_VAULT_FAIL_RETURNED,
      this.errorReturned
    );
    emitter.removeListener(ERROR, this.errorReturned);
    window.removeEventListener("resize", this.resize.bind(this));
    emitter.removeListener("CURRENT_THEME_RETURNED", this.currentThemeChanged);
    emitter.removeListener(HAPPY_HOUR_VERIFY, this.happyHourVerify);
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
      errorMessage: "",
    });

    this.handleModalDisplay(false);
  };

  depositReturned = () => {
    this.setState({ loading: false, amount: "" });
  };

  withdrawReturned = () => {
    this.setState({ loading: false, redeemAmount: "" });
  };

  errorReturned = () => {
    this.setState({ loading: false });
  };

  happyHourVerify = (payload) => {
    if (
      payload.body.happyHour === true &&
      payload.body.amountAboveThreshold === false
    ) {
      this.setState({
        amountAboveThreshold: payload.body.amountAboveThreshold,
        // happyHourWarning: payload.body.message,
      });
    }
  };

  isUsdVault = (asset) => {
    return asset.strategyType === "citadel" ||
      asset.strategyType === "elon" ||
      asset.strategyType === "cuban" ||
      asset.strategyType === "daoFaang" ||
      asset.strategyType === "moneyPrinter"
      ? true
      : false;
  };

  // Handle input validation message
  renderErrorMessage = (classes) => {
    const {
      errorMessage,
      happyHourMessage,
      happyHourThreshold,
      happyHourWarning,
      amountAboveThreshold,
    } = this.state;
    if (errorMessage !== "") {
      return (
        <Typography variant={"h5"} className={classes.errorMessage}>
          {errorMessage}
        </Typography>
      );
    } else {
      if (happyHourWarning !== "") {
        return (
          <Typography variant={"h5"} className={classes.happyHourWarning}>
            {happyHourWarning}
          </Typography>
        );
      } else if (happyHourMessage !== "") {
        return (
          <Typography variant={"h5"} className={classes.happyHourMessage}>
            {happyHourMessage}
          </Typography>
        );
      } else {
        return null;
      }
    }
  };

  renderCurrencyModal = (currencies) => {
    const { classes } = this.props;
    const { displayCurrencyModal } = this.state;

    return (
      <Dialog
        onClose={() => this.handleModalDisplay(false)}
        fullWidth={true}
        maxWidth={"sm"}
        classes={{ paper: classes.dialogRoot }}
        aria-labelledby="customized-dialog-title"
        open={displayCurrencyModal}
      >
        <MuiDialogTitle disableTypography className={classes.dialogTitle}>
          <Typography variant="h6">Select a Currency</Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => this.handleModalDisplay(false)}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
          <List component="nav" aria-label="main mailbox folders">
            {currencies.length > 0 &&
              currencies.map((currency) => {
                return (
                  <ListItem
                    button
                    onClick={() => this.handleSelectedCurrency(currency)}
                    className={classes.modalListItem}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt=""
                        src={require("../../assets/" + currency + "-logo.png")}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={currency} />
                  </ListItem>
                );
              })}
          </List>
        </DialogContent>
      </Dialog>
    );
  };

  renderDepositWithdrawInput = (isDeposit) => {
    const { classes } = this.props;
    const {
      amount,
      amountError,
      scales,
      loading,
      redeemAmount,
      redeemAmountError,
      percent,
      redeemAmountPercent,
      happyHourWarning,
      happyHourMessage,
    } = this.state;

    return (
      <React.Fragment>
        <div className={classes.depositIputBox}>
          <TextField
            style={{
              width: "100%",
            }}
            className={classes.actionInput}
            id={isDeposit ? "amount" : "redeemAmount"}
            value={isDeposit ? amount : redeemAmount}
            error={isDeposit ? amountError : redeemAmountError}
            onChange={isDeposit ? this.onChangeDeposit : this.onChange}
            disabled={loading}
            placeholder="0.00"
            variant="outlined"
            onKeyDown={isDeposit ? this.inputKeyDown : this.inputRedeemKeyDown}
          />
          <div className={classes.depositScaleContainer}>
            {scales.length > 0 &&
              scales.map((percentage) => {
                return (
                  <Button
                    className={
                      isDeposit
                        ? percent === percentage
                          ? classes.depositScaleActive
                          : classes.depositScale
                        : redeemAmountPercent === percentage
                        ? classes.depositScaleActive
                        : classes.depositScale
                    }
                    variant="text"
                    disabled={loading}
                    onClick={() => {
                      isDeposit
                        ? this.setAmount(percentage)
                        : this.setRedeemAmount(percentage);
                    }}
                  >
                    <Typography variant={"h5"}>
                      {percentage === 100 ? "Max" : percentage + "%"}
                    </Typography>
                  </Button>
                );
              })}
          </div>
        </div>

        {/** Error Message */}
        {isDeposit && this.state.errorMessage !== "" && (
          <Typography variant={"h5"} className={classes.errorMessage}>
            {this.state.errorMessage}
          </Typography>
        )}
        {isDeposit &&
          this.state.errorMessage === "" &&
          this.state.happyHourWarning !== "" && (
            <Typography variant={"h5"} className={classes.happyHourWarning}>
              {happyHourWarning}
            </Typography>
          )}
        {isDeposit &&
          this.state.errorMessage === "" &&
          this.state.happyHourMessage !== "" && (
            <Typography variant={"h5"} className={classes.happyHourMessage}>
              {happyHourMessage}
            </Typography>
          )}
        {!isDeposit && this.state.withdrawErrorMessage !== "" && (
          <Typography variant={"h5"} className={classes.errorMessage}>
            {this.state.withdrawErrorMessage}
          </Typography>
        )}
      </React.Fragment>
    );
  };

  renderYearnRatio = (isYEarn) => {
    const { classes, asset } = this.props;
    const { openEarnInfo, openVaultInfo, earnRatio, vaultRatio } = this.state;

    return (
      <React.Fragment>
        <Typography
          variant="h4"
          style={{
            color: isYEarn ? "#7B25D2" : "#027AFF",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HtmlTooltip
            placement={"top"}
            title={
              <React.Fragment>
                <Typography>
                  See{" "}
                  <a
                    href="https://daoventures.gitbook.io/daoventures/"
                    target="_blank"
                  >
                    FAQ: Product
                  </a>{" "}
                  for more information
                </Typography>
              </React.Fragment>
            }
            open={isYEarn ? openEarnInfo : openVaultInfo}
            onClose={
              isYEarn
                ? this.handleTooltipEarnClose
                : this.handleTooltipVaultClose
            }
            PopperProps={{
              disablePortal: true,
              style: {
                pointerEvents: "auto",
              },
            }}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <InfoIcon
              style={{
                verticalAlign: "text-top",
                cursor: "pointer",
                width: "16px",
                height: "16px",
              }}
              onClick={() =>
                isYEarn
                  ? this.handleTooltipEarnClose()
                  : this.handleTooltipVaultClose()
              }
            />
          </HtmlTooltip>
          &nbsp;
          {isYEarn ? "yEarn: " + earnRatio : "yVault: " + vaultRatio}
          {" %"}
        </Typography>
      </React.Fragment>
    );
  };

  renderStrategy() {
    const { classes, asset } = this.props;
    const {
      redeemEarnAmount,
      redeemEarnAmountError,
      redeemAmount,
      redeemAmountError,
      loading,
      ratio,
      earnPercent,
      vaultPercent,
      scales,
    } = this.state;
    if (asset.strategyType === "citadel" || asset.strategyType === "daoFaang") {
      return (
        <div>
          <Typography variant={"h4"} className={classes.subtitle} noWrap>
            STRATEGY
          </Typography>
          <Grid container style={{ marginTop: "1rem" }}>
            <Grid item sm={3} xs={6}>
              <Typography variant={"h5"} className={classes.grey}>
                Currently Active:
              </Typography>
              <div className={classes.flexy}>
                <Typography variant={"h4"} styles={{ wordWrap: "break-word" }}>
                  {asset.strategy}
                </Typography>
              </div>
            </Grid>
            <Grid item sm={3} xs={6}>
              <Typography variant={"h5"} className={classes.grey}>
                Inception PnL:
              </Typography>
              <div className={classes.flexy}>
                <Typography variant={"h4"} noWrap>
                  {(this._getPNL(asset)["inception"] * 100).toFixed(2)}%{" "}
                </Typography>
              </div>
            </Grid>
            <Grid item sm={3} xs={6}>
              <Typography variant={"h5"} className={classes.grey}>
                Monthly PnL:
              </Typography>
              <div className={classes.flexy}>
                <Typography variant={"h4"} noWrap>
                  {(this._getPNL(asset)["30d"] * 100).toFixed(2)}%{" "}
                </Typography>
              </div>
            </Grid>
            <Grid item sm={3} xs={6}>
              <Typography variant={"h5"} className={classes.grey}>
                Weekly PnL:
              </Typography>
              <div className={classes.flexy}>
                <Typography variant={"h4"} noWrap>
                  {(this._getPNL(asset)["7d"] * 100).toFixed(2)}%{" "}
                </Typography>
              </div>
            </Grid>
          </Grid>

          <div className={classes.fullWidth}></div>
        </div>
      );
    } else {
      return (
        <div>
          <Typography variant={"h4"} className={classes.subtitle} noWrap>
            STRATEGY
          </Typography>
          <Grid container style={{ marginTop: "1rem" }}>
            <Grid item sm={3} xs={6}>
              <Typography variant={"h5"} className={classes.grey}>
                Currently Active:
              </Typography>
              <div className={classes.flexy}>
                <Typography variant={"h4"} styles={{ wordWrap: "break-word" }}>
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
        </div>
      );
    }
  }

  render() {
    const { classes, asset } = this.props;
    const {
      redeemEarnAmount,
      redeemEarnAmountError,
      redeemAmount,
      redeemAmountError,
      loading,
      ratio,
      earnPercent,
      vaultPercent,
      scales,
    } = this.state;

    return (
      <div className={classes.vaultContainer}>
        <Grid container className={classes.assetSummary}>
          <Grid item sm={6} xs={12}>
            {this.renderChart(asset)}

            <Grid item sm={12} xs={12} className={classes.assetDetails}>
              {/* STRATEGY */}
              {this.renderStrategy()}

              {/** STATISTICS */}
              <Typography variant={"h4"} className={classes.subtitle} noWrap>
                STATISTICS
              </Typography>
              <Grid container style={{ marginTop: "1rem" }}>
                {/** Total Earnings */}
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Total Earnings:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {asset.addressStatistics
                        ? (this.isUsdVault(asset)
                            ? Number(asset.addressStatistics.earnings)
                            : asset.addressStatistics.earnings / asset.decimals
                          ).toFixed(2)
                        : "0.00"}{" "}
                      {this.isUsdVault(asset) ? "USD" : asset.symbol}
                    </Typography>
                  </div>
                </Grid>

                {/** Deposit */}
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Deposits:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {asset.addressStatistics
                        ? (this.isUsdVault(asset)
                            ? Number(asset.addressStatistics.totalDepositsInUSD)
                            : asset.addressStatistics.totalDeposits /
                              10 ** asset.decimals
                          ).toFixed(2)
                        : "0.00"}{" "}
                      {this.isUsdVault(asset) ? "USD" : asset.symbol}
                    </Typography>
                  </div>
                </Grid>

                {/** Withdrawals */}
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Withdrawals:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {asset.addressStatistics
                        ? (this.isUsdVault(asset)
                            ? Number(
                                asset.addressStatistics.totalWithdrawalsInUSD
                              )
                            : asset.addressStatistics.totalWithdrawals /
                              10 ** asset.decimals
                          ).toFixed(2)
                        : "0.00"}{" "}
                      {this.isUsdVault(asset) ? "USD" : asset.symbol}
                    </Typography>
                  </div>
                </Grid>

                {/** Transferred In */}
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Transferred In:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {asset.addressStatistics
                        ? (this.isUsdVault(asset)
                            ? Number(
                                asset.addressStatistics.totalTransferredInUSD
                              )
                            : asset.addressStatistics.totalTransferredIn /
                              10 ** asset.decimals
                          ).toFixed(2)
                        : "0.00"}{" "}
                      {this.isUsdVault(asset) ? "USD" : asset.symbol}
                    </Typography>
                  </div>
                </Grid>

                {/** Transferred Out */}
                <Grid item sm={3} xs={6}>
                  <Typography variant={"h5"} className={classes.grey}>
                    Transferred Out:
                  </Typography>
                  <div className={classes.flexy}>
                    <Typography variant={"h4"} noWrap>
                      {asset.addressStatistics
                        ? (this.isUsdVault(asset)
                            ? Number(
                                asset.addressStatistics.totalTransferredOutInUSD
                              )
                            : asset.addressStatistics.totalTransferredOut /
                              10 ** asset.decimals
                          ).toFixed(2)
                        : "0.00"}{" "}
                      {this.isUsdVault(asset) ? "USD" : asset.symbol}
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
                      {this.renderYearnRatio(true)}
                    </div>
                    <div>
                      <Typography
                        className={classes.apyText}
                        variant="h4"
                        noWrap
                      >
                        {"APY " + this._getEstimatedAPY(asset) + "%"}
                      </Typography>
                    </div>
                    <div className={classes.rightLabelContainer}>
                      {this.renderYearnRatio(false)}
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
                  {/** Wallet Balance */}
                  <Typography
                    variant="body1"
                    className={classes.value}
                    noWrap
                    onClick={() => {
                      this.setAmount(100);
                    }}
                  >
                    Your wallet
                  </Typography>

                  <Typography
                    variant="body2"
                    onClick={() => {
                      this.setAmount(100);
                    }}
                    className={classes.value}
                    noWrap
                  >
                    {/** Wallet Balance */}
                    {this.isUsdVault(asset) && (
                      <div>
                        {asset.balances
                          ? (
                              Math.floor(
                                asset.balances[this.state.tokenIndex] * 10000
                              ) / 10000
                            ).toFixed(4)
                          : "0.0000"}{" "}
                        {asset.symbols
                          ? asset.symbols[this.state.tokenIndex]
                          : ""}
                      </div>
                    )}
                    {!this.isUsdVault(asset) && (
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

                  {/** Change Currency  */}
                  {this.isUsdVault(asset) && (
                    <React.Fragment>
                      <div className={classes.accountInfoBlock}>
                        <div
                          className={classes.accountInfo}
                          onClick={() => {
                            this.handleModalDisplay(true);
                          }}
                        >
                          <img
                            alt=""
                            src={require("../../assets/" +
                              this.state.selectedCurrency +
                              "-logo.png")}
                            className={classes.assetIconImg}
                            style={
                              asset.disabled
                                ? { filter: "grayscale(100%)" }
                                : {}
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
                      {this.renderCurrencyModal(asset.symbols)}
                    </React.Fragment>
                  )}
                </div>

                {/** Deposit Input */}
                {this.renderDepositWithdrawInput(true)}

                {/** Deposit Buttons */}
                <div className={classes.depositButtonBox}>
                  {asset.deposit === true && (
                    <Button
                      className={classes.depositActionButton}
                      disabled={
                        loading ||
                        asset.balance <= 0 ||
                        asset.depositDisabled === true
                      }
                      onClick={this.onDeposit}
                    >
                      <span>Deposit</span>
                    </Button>
                  )}
                  {/** DAO-157: Remove "Deposit All" button from Invest  */}
                  {/* {asset.depositAll === true && (
                    <Button
                      className={classes.depositActionButton}
                      disabled={
                        loading ||
                        asset.balance <= 0 ||
                        asset.depositDisabled === true
                      }
                      onClick={this.onDepositAll}
                    >
                      <span>Deposit All</span>
                    </Button>
                  )} */}
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

              {/* 提现部分 Withdrawal */}
              <div className={classes.tradeContainer}>
                {/** Yearn Strategy */}
                {asset.strategyType === "yearn" && (
                  <div className={classes.yearnEarnAndVaultBlock}>
                    <div className={classes.yearnEarnAndVaultItem}>
                      {/** Earn Balance*/}
                      <Typography
                        variant="h5"
                        style={{ color: "#7B25D2" }}
                        className={classes.withdrawalText}
                      >
                        Earn
                      </Typography>
                      <Typography
                        variant="h4"
                        onClick={() => {
                          this.setRedeemEarnAmount(100);
                        }}
                        className={classes.earnAndVaultValue}
                        noWrap
                      >
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

                      {/** Earn Amount Input */}
                      <TextField
                        className={`${classes.actionInput} ${classes.earnAndVaultInput}`}
                        id="redeemEarnAmount"
                        value={redeemEarnAmount}
                        error={redeemEarnAmountError}
                        onChange={this.onChange}
                        disabled={loading}
                        placeholder="0.00"
                        variant="outlined"
                        onKeyDown={this.inputRedeemKeyDown}
                      />
                      <div className={classes.scaleContainer}>
                        {scales.length > 0 &&
                          scales.map((percentage) => {
                            return (
                              <Button
                                className={
                                  earnPercent === percentage
                                    ? classes.depositScaleActive
                                    : classes.depositScale
                                }
                                variant="text"
                                disabled={loading}
                                color="primary"
                                onClick={() => {
                                  this.setRedeemEarnAmount(percentage);
                                }}
                              >
                                <Typography variant={"h5"}>
                                  {percentage === 100
                                    ? "Max"
                                    : percentage + "%"}
                                </Typography>
                              </Button>
                            );
                          })}
                      </div>
                      {this.state.redeemEarnAmountError &&
                        this.state.withdrawEarnErrorMessage !== "" && (
                          <Typography
                            variant={"h5"}
                            className={classes.errorMessage}
                          >
                            {this.state.withdrawEarnErrorMessage}
                          </Typography>
                        )}
                    </div>

                    <div className={classes.yearnEarnAndVaultItem}>
                      {/** Vault Balance */}
                      <Typography
                        variant="h5"
                        style={{ color: "#027AFF" }}
                        className={classes.withdrawalText}
                      >
                        Vault
                      </Typography>
                      <Typography
                        variant="h4"
                        onClick={() => {
                          this.setRedeemVaultAmount(100);
                        }}
                        className={classes.earnAndVaultValue}
                        noWrap
                      >
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

                      {/** Vault Amount Input */}
                      <TextField
                        fullWidth
                        className={`${classes.actionInput} ${classes.earnAndVaultInput}`}
                        id="redeemVaultAmount"
                        value={redeemAmount}
                        error={redeemAmountError}
                        onChange={this.onChange}
                        disabled={loading}
                        placeholder="0.00"
                        variant="outlined"
                        onKeyDown={this.inputRedeemKeyDown}
                      />
                      <div className={classes.scaleContainer}>
                        {scales.length > 0 &&
                          scales.map((percentage) => {
                            return (
                              <Button
                                className={
                                  vaultPercent === percentage
                                    ? classes.depositScaleActive
                                    : classes.depositScale
                                }
                                variant="text"
                                disabled={loading}
                                color="primary"
                                onClick={() => {
                                  this.setRedeemVaultAmount(percentage);
                                }}
                              >
                                <Typography variant={"h5"}>
                                  {percentage === 100
                                    ? "Max"
                                    : percentage + "%"}
                                </Typography>
                              </Button>
                            );
                          })}
                      </div>
                      {this.state.redeemAmountError &&
                        this.state.withdrawErrorMessage !== "" && (
                          <Typography
                            variant={"h5"}
                            className={classes.errorMessage}
                          >
                            {this.state.withdrawErrorMessage}
                          </Typography>
                        )}
                    </div>
                  </div>
                )}
                {/** Compound Strategy */}
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
                          noWrap
                        >
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
                      {this.renderDepositWithdrawInput(false)}
                    </div>
                  </div>
                )}
                {/** Citadel, Elon, Cuban, DAO Faang Strategy*/}
                {(asset.strategyType === "citadel" ||
                  asset.strategyType === "elon" ||
                  asset.strategyType === "cuban" ||
                  asset.strategyType === "daoFaang" ||
                  asset.strategyType === "moneyPrinter") && (
                  <div className={classes.withdrawContainer}>
                    <div className={classes.tradeContainer}>
                      <div className={classes.balances}>
                        <Typography
                          variant="body1"
                          onClick={() => {
                            this.setRedeemAmount(100);
                          }}
                          className={classes.value}
                          noWrap
                        >
                          {(asset.strategyBalance
                            ? (
                                Math.floor(
                                  (asset.strategyBalance /
                                    10 ** asset.decimals) *
                                    10000
                                ) / 10000
                              ).toFixed(4)
                            : "0.0000") +
                            " " +
                            asset.id}{" "}
                          {asset.strategyBalance && (
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
                      {this.renderDepositWithdrawInput(false)}
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
                      fullWidth
                    >
                      <span>Withdraw</span>
                    </Button>
                  )}
                  {/** DAO-157 */}
                  {/* {asset.withdrawAll === true && (
                    <Button
                      className={classes.withdrawButton}
                      disabled={
                        loading ||
                        (asset.vaultBalance <= 0 &&
                          asset.earnBalance <= 0 ** asset.strategyBalance <= 0)
                      }
                      onClick={this.onWithdrawAll}
                      fullWidth
                    >
                      <span>Withdraw All</span>
                    </Button>
                  )} */}
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
    let ethAPY = [];
    let btcAPY = [];
    var elonAPY = [];
    var cubanAPY = [];
    var faangAPY = [];
    var moneyPrinterAPY = [];
    var labels = [];

    const { hideNav } = this.state;

    const sortByTimestamp = (a, b) => {
      if (a.timestamp > b.timestamp) return 1;
      if (a.timestamp < b.timestamp) return -1;
      return 0;
    };

    if (asset.historicalAPY || asset.historicalPerformance) {
      // this gives an object with dates as keys
      let groups;
      if (
        asset.strategyType === "citadel" ||
        asset.strategyType === "daoFaang"
      ) {
        groups = asset.historicalPerformance
          .sort(sortByTimestamp)
          .reduce((groups, apy) => {
            const date = moment.unix(apy["time_stamp"]).format("DD-MM-YYYY");
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(apy);
            return groups;
          }, {});
      } else {
        groups = asset.historicalAPY
          .sort(sortByTimestamp)
          .reduce((groups, apy) => {
            const date = moment.unix(apy.timestamp / 1000).format("DD-MM-YYYY");
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(apy);
            return groups;
          }, {});
      }

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
              parseFloat((groups[date][0]["lp_performance"] * 100).toFixed(4)),
            ]);
            btcAPY.push([
              date,
              parseFloat((groups[date][0]["btc_performance"] * 100).toFixed(4)),
            ]);
            ethAPY.push([
              date,
              parseFloat((groups[date][0]["eth_performance"] * 100).toFixed(4)),
            ]);
          } else if (asset.strategyType === "elon") {
            elonAPY.push([
              date,
              parseFloat(groups[date][0].elonApy.toFixed(4)),
            ]);
          } else if (asset.strategyType === "cuban") {
            cubanAPY.push([
              date,
              parseFloat(groups[date][0].cubanApy.toFixed(4)),
            ]);
          } else if (asset.strategyType === "daoFaang") {
            faangAPY.push([
              date,
              parseFloat((groups[date][0]["lp_performance"] * 100).toFixed(4)),
            ]);
            btcAPY.push([
              date,
              parseFloat((groups[date][0]["btc_performance"] * 100).toFixed(4)),
            ]);
            ethAPY.push([
              date,
              parseFloat((groups[date][0]["eth_performance"] * 100).toFixed(4)),
            ]);
          } else if (asset.strategyType === "moneyPrinter") {
            moneyPrinterAPY.push([
              date,
              parseFloat(groups[date][0].moneyPrinterApy.toFixed(4)),
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
            } else if (asset.strategyType === "elon") {
              elonAPY.push([
                date,
                parseFloat(groups[date][halfCount].elonApy.toFixed(4)),
              ]);
            } else if (asset.strategyType === "cuban") {
              cubanAPY.push([
                date,
                parseFloat(groups[date][halfCount].cubanApy.toFixed(4)),
              ]);
            } else if (asset.strategyType === "daoFaang") {
              faangAPY.push([
                date,
                parseFloat(groups[date][halfCount].faangApy.toFixed(4)),
              ]);
            } else if (asset.strategyType === "moneyPrinter") {
              moneyPrinterAPY.push([
                date,
                parseFloat(groups[date][halfCount].moneyPrinterApy.toFixed(4)),
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
            color: "#FFFFFF",
          },
          {
            name: "BTC",
            data: btcAPY,
            color: "#f7931b",
          },
          {
            name: "ETH",
            data: ethAPY,
            color: "#464a75",
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
    } else if (asset.strategyType === "elon") {
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
            name: "Elon",
            data: elonAPY,
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
    } else if (asset.strategyType === "cuban") {
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
            name: "Cuban",
            data: cubanAPY,
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
    } else if (asset.strategyType === "daoFaang") {
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
            name: "FAANG Stonk",
            data: faangAPY,
            color: "#FFFFFF",
          },
          {
            name: "BTC",
            data: btcAPY,
            color: "#f7931b",
          },
          {
            name: "ETH",
            data: ethAPY,
            color: "#464a75",
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
    } else if (asset.strategyType === "moneyPrinter") {
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
            name: "Money Printer",
            data: moneyPrinterAPY,
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
      elon: "Historical Vault Performance",
      cuban: "Historical Vault Performance",
      daoFaang: "Historical Vault Performance",
      moneyPrinter: "Historical Vault Performance",
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
      } else if (asset.strategyType === "elon") {
        if (asset.stats.elonApy) {
          return asset.stats.elonApy;
        }
      } else if (asset.strategyType === "cuban") {
        if (asset.stats.cubanApy) {
          return asset.stats.cubanApy;
        }
      } else if (asset.strategyType === "daoFaang") {
        return asset.stats.faangApy;
      } else if (asset.strategyType === "moneyPrinter") {
        return asset.stats.moneyPrinterApy;
      }
    }
    return 0;
  };

  _getPNL = (asset) => {
    const { basedOn } = this.props;
    // To calculate APY (Vault + Earn divide by 2 : Estimated)
    // Compound APY is using compoundApy
    if (asset && asset.stats) {
      // if (asset.strategyType === "compound") {
      //   if (asset.stats.compoundApy) {
      //     return asset.stats.compoundApy;
      //   }
      // } else if (asset.strategyType === "yearn") {
      //   switch (basedOn) {
      //     case 1:
      //       return (
      //         (asset.stats.apyOneWeekSample + parseFloat(asset.earnApr) * 100) /
      //         2
      //       );
      //     case 2:
      //       return (
      //         (asset.stats.apyOneMonthSample +
      //           parseFloat(asset.earnApr) * 100) /
      //         2
      //       );
      //     case 3:
      //       return (
      //         (asset.stats.apyInceptionSample +
      //           parseFloat(asset.earnApr) * 100) /
      //         2
      //       );
      //     default:
      //       return (asset.apy + parseFloat(asset.earnApr) * 100) / 2;
      //   }
      // } else if (asset.strategyType === "citadel") {
      if (
        asset.strategyType === "citadel" ||
        asset.strategyType === "daoFaang"
      ) {
        // console.log("🚀 | Asset | asset.stats.pnl", asset.stats.pnl);

        return asset.stats.pnl;
      }
      // else if (asset.strategyType === "elon") {
      //   if (asset.stats.elonApy) {
      //     return asset.stats.elonApy;
      //   }
      // } else if (asset.strategyType === "cuban") {
      //   if (asset.stats.cubanApy) {
      //     return asset.stats.cubanApy;
      //   }
      // } else if (asset.strategyType === "daoFaang") {
      //   return asset.stats.faangApy;
      // }
    }
    return 0;
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
    this.verifyWithdrawInput(val[event.target.id], event.target.id);
    if (event.target.id === "redeemEarnAmount") {
      this.setState({ redeemEarnAmount: val[event.target.id], earnPercent: 0 });
    } else {
      this.setState({
        redeemAmount: val[event.target.id],
        vaultPercent: 0,
        redeemAmountPercent: 0,
      });
    }
  };

  onChangeDeposit = (event) => {
    let val = [];
    val[event.target.id] = event.target.value;

    this.verifyInput(val[event.target.id]);
    if (event.target.id === "amount") {
      this.setState({ amount: val[event.target.id], percent: 0 });
    }
  };

  verifyInput = (amount) => {
    // const { amount } = this.state;
    const { asset, startLoading, happyHour, happyHourThreshold } = this.props;

    let assetBalance = !this.isUsdVault(asset)
      ? asset.balance
      : asset.balances[this.state.tokenIndex];

    assetBalance = (Math.floor(assetBalance * 10000) / 10000).toFixed(4);

    const digitRegex = /^[0-9]\d*(\.\d+)?$/;

    if (!digitRegex.test(amount)) {
      this.setState({ amountError: true, errorMessage: "Invalid amount" });
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      this.setState({ amountError: true, errorMessage: "Invalid amount" });
      return;
    }

    if (parseFloat(amount) > assetBalance) {
      this.setState({
        amountError: true,
        errorMessage: "Exceed available balance",
      });
      return;
    }

    if (
      parseFloat(amount) <= parseFloat("0.0") ||
      parseFloat(amount) > assetBalance
    ) {
      this.setState({ amountError: true });
      // return false;
    } else {
      this.setState({ amountError: false, errorMessage: "" });
    }

    if (asset.happyHourEnabled === true && happyHour === true) {
      if (parseFloat(amount) < parseFloat(happyHourThreshold)) {
        this.setState({
          // amountError: true,
          happyHourWarning: `Below required deposit ${happyHourThreshold} USD for Happy Hour. Gas fee will be required.`,
          happyHourMessage: "",
        });
      } else {
        this.setState({
          // amountError: true,
          happyHourWarning: "",
          happyHourMessage: "Gas fee is on us!",
        });
      }
    }
  };

  inputKeyDown = (event) => {
    if (event.which === 13) {
      this.onInvest();
    }
  };

  validateDigit = (amount) => {
    const digitRegex = /^[0-9]\d*(\.\d+)?$/;
    return digitRegex.test(amount);
  };

  validateAmount = (amount) => {
    return !amount || isNaN(amount) || parseFloat(amount) <= 0;
  };

  validateInputValMoreThanBalance = (amount, balance) => {
    return parseFloat(amount) > parseFloat(balance);
  };

  calculateDepositShare = (asset, type) => {
    if (asset.strategyType === "compound") {
      return (
        Math.floor(asset.strategyBalance * asset.compoundExchangeRate * 10000) /
        10000
      ).toFixed(4);
    } else if (this.isUsdVault(asset)) {
      return (
        Math.floor((asset.strategyBalance / 10 ** asset.decimals) * 10000) /
        10000
      ).toFixed(4);
    } else if (asset.strategyType === "yearn") {
      if (type === "earn") {
        return (
          Math.floor(asset.earnBalance * asset.earnPricePerFullShare * 10000) /
          10000
        ).toFixed(4);
      } else {
        return (
          Math.floor(
            asset.vaultBalance * asset.vaultPricePerFullShare * 10000
          ) / 10000
        ).toFixed(4);
      }
    } else {
      return 0;
    }
  };

  setRedeemAmountError = (message) => {
    this.setState({ redeemAmountError: true, withdrawErrorMessage: message });
  };

  verifyWithdrawInput = (amount, divId) => {
    const { asset } = this.props;

    if (asset.strategyType === "yearn") {
      if (!this.validateDigit(amount)) {
        const errorMessage = "Invalid amount";
        divId === "redeemEarnAmount"
          ? this.setState({
              redeemEarnAmountError: true,
              withdrawEarnErrorMessage: errorMessage,
            })
          : this.setState({
              redeemAmountError: true,
              withdrawErrorMessage: errorMessage,
            });
        return;
      }

      // No need to validate 0 input, as either one of them can be 0
      if (!amount || isNaN(amount) || parseFloat(amount) < 0) {
        const errorMessage = "Invalid amount";
        divId === "redeemEarnAmount"
          ? this.setState({
              redeemEarnAmountError: true,
              withdrawEarnErrorMessage: errorMessage,
            })
          : this.setState({
              redeemAmountError: true,
              withdrawErrorMessage: errorMessage,
            });
        return;
      }

      const depositedShares = this.calculateDepositShare(
        asset,
        divId === "redeemEarnAmount" ? "earn" : "vault"
      );

      if (this.validateInputValMoreThanBalance(amount, depositedShares)) {
        const errorMessage = "Exceed Available Balance";
        divId === "redeemEarnAmount"
          ? this.setState({
              redeemEarnAmountError: true,
              withdrawEarnErrorMessage: errorMessage,
            })
          : this.setState({
              redeemAmountError: true,
              withdrawErrorMessage: errorMessage,
            });
        return;
      }

      divId === "redeemEarnAmount"
        ? this.setState({
            redeemEarnAmountError: false,
            withdrawEarnErrorMessage: "",
          })
        : this.setState({ redeemAmountError: false, withdrawErrorMessage: "" });
    } else {
      if (!this.validateDigit(amount)) {
        this.setRedeemAmountError("Invalid amount");
        return;
      }

      if (this.validateAmount(amount)) {
        this.setRedeemAmountError("Invalid amount");
        return;
      }

      const depositedShares = this.calculateDepositShare(asset, null);

      if (this.validateInputValMoreThanBalance(amount, depositedShares)) {
        this.setRedeemAmountError("Exceed available balance");
        return;
      }

      this.setState({ redeemAmountError: false, withdrawErrorMessage: "" });
    }
  };

  verifyInput = (amount) => {
    const { asset, happyHour, happyHourThreshold } = this.props;

    let assetBalance = !this.isUsdVault(asset)
      ? asset.balance
      : asset.balances[this.state.tokenIndex];

    assetBalance = (Math.floor(assetBalance * 10000) / 10000).toFixed(4);

    if (!this.validateDigit(amount)) {
      this.setState({ amountError: true, errorMessage: "Invalid amount" });
      return;
    }

    if (this.validateAmount(amount)) {
      this.setState({ amountError: true, errorMessage: "Invalid amount" });
      return;
    }

    if (this.validateInputValMoreThanBalance(amount, assetBalance)) {
      this.setState({
        amountError: true,
        errorMessage: "Exceed available balance",
      });
      return;
    }

    this.setState({ amountError: false, errorMessage: "" });

    if (asset.happyHourEnabled === true && happyHour === true) {
      if (parseFloat(amount) < parseFloat(happyHourThreshold)) {
        this.setState({
          // amountError: true,
          happyHourWarning: `Below required deposit ${happyHourThreshold} USD for Happy Hour. Gas fee will be required.`,
          happyHourMessage: "",
        });
      } else {
        this.setState({
          // amountError: true,
          happyHourWarning: "",
          happyHourMessage: "Gas fee is on us!",
        });
      }
    }
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
    const {
      amount,
      earnRatio,
      vaultRatio,
      tokenIndex,
      amountError,
      errorMessage,
    } = this.state;
    const { asset, startLoading } = this.props;

    if (this.validateAmount(amount)) {
      this.setState({
        amountError: true,
        errorMessage: "Invalid amount",
      });
      return;
    }

    if (!amountError && errorMessage === "") {
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
      } else if (this.isUsdVault(asset)) {
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
    }
  };

  onDepositAll = () => {
    const { asset, startLoading } = this.props;
    const { earnRatio, vaultRatio, tokenIndex } = this.state;
    this.setState({ loading: true });
    startLoading();
    let amount;

    if (this.isUsdVault(asset)) {
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
    } else if (this.isUsdVault(asset)) {
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
    let { redeemEarnAmount, redeemAmount, tokenIndex } = this.state;

    const { asset, startLoading } = this.props;

    if (asset.strategyType === "yearn") {
      // Both input field are blank
      if (
        (!redeemAmount || isNaN(redeemAmount)) &&
        (!redeemEarnAmount || isNaN(redeemEarnAmount))
      ) {
        this.setState({
          redeemAmountError: true,
          redeemEarnAmountError: true,
          withdrawErrorMessage: "Invalid amount",
          withdrawEarnErrorMessage: "Invalid amount",
        });
        return;
      }

      if (
        !this.state.redeemAmountError &&
        this.state.withdrawErrorMessage === "" &&
        !this.state.redeemEarnAmountError &&
        this.state.withdrawEarnErrorMessage === ""
      ) {
        redeemAmount = redeemAmount
          ? (Math.floor(redeemAmount * 10000) / 10000).toFixed(4)
          : 0;
        redeemEarnAmount = redeemEarnAmount
          ? (Math.floor(redeemEarnAmount * 10000) / 10000).toFixed(4)
          : 0;

        this.setState({ loading: true });
        startLoading();

        dispatcher.dispatch({
          type: WITHDRAW_BOTH,
          content: {
            earnAmount: redeemEarnAmount.toString(),
            vaultAmount: redeemAmount.toString(),
            amount: "0",
            asset: asset,
          },
        });
      }
    } else if (asset.strategyType === "compound") {
      if (this.validateAmount(redeemAmount)) {
        this.setState({
          redeemAmountError: true,
          withdrawErrorMessage: "Invalid amount",
        });
        return;
      }

      if (!this.state.redeemAmountError && this.withdrawErrorMessage !== "") {
        this.setState({ loading: true });
        startLoading();

        redeemAmount = (Math.floor(redeemAmount * 10000) / 10000).toFixed(4);

        dispatcher.dispatch({
          type: WITHDRAW_BOTH,
          content: {
            earnAmount: "0",
            vaultAmount: "0",
            amount: redeemAmount.toString(),
            asset: asset,
          },
        });
      }
    } else if (this.isUsdVault(asset)) {
      if (this.validateAmount(redeemAmount)) {
        this.setState({
          redeemAmountError: true,
          withdrawErrorMessage: "Invalid amount",
        });
        return;
      }

      if (!this.state.redeemAmountError && this.withdrawErrorMessage !== "") {
        redeemAmount = (Math.floor(redeemAmount * 10000) / 10000).toFixed(4);
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

    if (this.isUsdVault(asset)) {
      amount = (asset.balances[this.state.tokenIndex] * percent) / 100;
    } else {
      const balance = asset.balance;
      amount = (balance * percent) / 100;
    }

    amount = (Math.floor(amount * 10000) / 10000).toFixed(4);
    this.verifyInput(amount);

    this.setState({ amount, percent, amountError: false, errorMessage: "" });
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

    if (this.isUsdVault(asset)) {
      amount = (balance * percent) / 100;
      amount = Math.floor((amount / 10 ** decimals) * 10000) / 10000;
    } else {
      amount = (balance * percent) / 100;
      amount = Math.floor(amount * 10000) / 10000;
    }

    this.setState({
      redeemAmount: amount.toFixed(4),
      redeemAmountPercent: percent,
      redeemAmountError: false,
      withdrawErrorMessage: "",
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
      redeemAmount: amount.toFixed(4),
      redeemAmountError: false,
      withdrawErrorMessage: "",
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
      redeemEarnAmountError: false,
      withdrawEarnErrorMessage: "",
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
