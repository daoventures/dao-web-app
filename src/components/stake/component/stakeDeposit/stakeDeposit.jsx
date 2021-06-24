import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button } from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import {
  DEPOSIT_DAOMINE,
  DEPOSIT_DAOMINE_RETURNED_COMPLETED,
  ERROR
} from "../../../../constants/constants";
import Store from "../../../../stores/store";

const styles = (theme) => ({
  contentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "25px",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },

  depositContainer: {
    paddingBottom: "12px",
    paddingLeft: "5px",
    paddingRight: "5px",
    display: "flex",
    flex: "1",
    // padding: '24px',
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      // padding: '20px 0px',
    },
  },

  tradeContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "auto",
    padding: "15px",
    marginBottom: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  displayInfoBox: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between", // to push flex item to left and right
    alignItems: "center", // vertically align flex item
    color: theme.themeColors.textT,
    marginTop: "5px",
    marginBottom: "5px",
  },

  cursor: {
    pointer: "cursor",
  },

  depositInputContainer: {
    width: "100%",
    position: "relative",
  },

  depositInput: {
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

  depositButtonBox: {
    width: "100%",
    display: "flex",
    marginTop: "20px",
    marginBottom: "15px",
    justifyContent: "space-between",
  },

  lpLink: {
    textDecoration: "none",
    color: theme.themeColors.textP,
    cursor: "pointer"
  },

  errorMessage: {
    color: theme.themeColors.formError,
    marginTop: "3px"
  }
});

const store = Store.store;
const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
class StakeDeposit extends Component {
  constructor(props) {
    super();

    const account = store.getStore("account");

    this.state = {
      amountError: false,
      loading: false,
      amount: 0,
      percent: 0,
      errorMessage: ""
    };
  }

  componentWillMount() {
    emitter.on(DEPOSIT_DAOMINE_RETURNED_COMPLETED, this.onDepositCompleted);
    emitter.on(ERROR, this.errorReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(DEPOSIT_DAOMINE_RETURNED_COMPLETED, this.onDepositCompleted);
    emitter.removeListener(ERROR, this.errorReturned);
  }

  errorReturned = () => {
    this.setState({ loading: false });
  }

  onDepositCompleted = (txnHash) => {
    this.setState({
      amount: 0,
      amountError: false,
      errorMessage: "",
      percent: 0,
      loading: false
    })
  }

  onChange = (event) => {
    this.setState({ amountError: false, errorMessage: "", percent: 0 });
    let val = [];
    val[event.target.id] = event.target.value;
    this.setState(val);
  };

  setAmount = (percent) => {
    const { pool } = this.props;
    const { userInfo } = pool;
    this.setState({
      amount:
        Math.floor((userInfo.tokenBalance / 10 ** pool.decimal) * 10000) /
        10000,
      percent,
    });
  };

  onDeposit = () => {
    this.setState({ amountError: false, errorMessage: "" });

    const { startLoading, pool } = this.props;
    const { amount } = this.state;
    const { userInfo } = pool;

    const digitRegex = /^[0-9]\d*(\.\d+)?$/;

    if (!digitRegex.test(amount)) {
      this.setState({ amountError: true, errorMessage: "Invalid amount" });
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      this.setState({ amountError: true, errorMessage: "Invalid amount" });
      return;
    }

    const tokenBalance = Math.floor((userInfo.tokenBalance / 10 ** pool.decimal) * 10000) / 10000;

    if (parseFloat(amount) > tokenBalance) {
      this.setState({ amountError: true, errorMessage: "Exceed available balance" });
      return;
    }

    this.setState({ loading: true });
    startLoading();

    dispatcher.dispatch({
      type: DEPOSIT_DAOMINE,
      content: {
        pool,
        amount: amount.toString()
      }
    })

  };

  navigate = (vaultName) => {
    if (vaultName === 'ETH<->DVG') {
      window.open("https://info.uniswap.org/#/pools/0xa58262270521d7732fccbbdcdf9fcd1fc70d47e5", "_blank");
      return;
    }
    const path = "/invest#id=" + vaultName;
    this.props.history.push(path);
  }

  render() {
    const { amount, loading, amountError, percent, errorMessage } = this.state;
    const { classes, pool } = this.props;

    const { userInfo } = pool;

    return (
      <div className={classes.depositContainer}>
        <div className={classes.tradeContainer}>
          {/** Wallet Balance */}
          <div className={classes.displayInfoBox}>
            <Typography variant="body1" className={classes.cursor} noWrap>
              Available:
            </Typography>

            <Typography
              variant="body2"
              onClick={() => {
                this.setAmount(100);
              }}
              className={classes.cursor}
              noWrap
            >
              {userInfo.tokenBalance
                ? (
                  Math.floor(
                    (userInfo.tokenBalance / 10 ** pool.decimal) * 10000
                  ) / 10000
                ).toFixed(4)
                : "0.0000"}
              {" " + pool.name}
            </Typography>
          </div>

          {/** Deposit Amount Textbox */}
          <div className={classes.depositInputContainer}>
            <TextField
              style={{
                width: "100%",
              }}
              className={classes.depositInput}
              id="amount"
              cursor={amount}
              value={amount}
              error={amountError}
              onChange={this.onChange}
              disabled={loading}
              placeholder="0.00"
              variant="outlined"
            />

            <div className={classes.depositScaleContainer}>
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
                }}
              >
                <Typography variant={"h5"}>Max</Typography>
              </Button>
            </div>
          </div>

          {/** Error Message */}
          {
            errorMessage !== "" && (
              <Typography variant={"h5"} className={classes.errorMessage}>
                {this.state.errorMessage}
              </Typography>
            )
          }

          {/** Deposit Button */}
          <div className={classes.depositButtonBox}>
            <Button
              disabled={loading}
              className={classes.depositActionButton}
              onClick={this.onDeposit}
            >
              <span>Confirm Deposit</span>
            </Button>
          </div>

          {/** Get LP Link*/}
          <div className={classes.displayInfoBox}>
            <a onClick={() => this.navigate(pool.name)} className={classes.lpLink}>
              Get {pool.label}<OpenInNewIcon></OpenInNewIcon>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(StakeDeposit)));
