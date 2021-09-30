import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { 
  Typography, 
  TextField, 
  Button, 
  Tooltip  
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import {
  DEPOSIT_DAOMINE,
  DEPOSIT_DAOMINE_RETURNED_COMPLETED,
  LATEST_POOLS,
  ERROR,
  ACTION_WITHDRAW,
  DISABLE_ACTION_BUTTONS_RETURNED
} from "../../../../constants/constants";
import Store from "../../../../stores/storev2";
import StakeActions from "../stakeActions/stakeActions";
import { validateDigit, validateInputMoreThanBalance, validateAmountNotExist } from "../../helper/validation";

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
    paddingTop: "15px",
    paddingBottom: "27px",
    paddingLeft: "20px",
    paddingRight: "20px",
    display: "flex",
    flex: "1",
    flexDirection: "column",
  },

  displayInfoBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
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
    minHeight: "60px",
    [theme.breakpoints.down("sm")]: {
      minHeight: "0px"
    },
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
    "&.active": {
      color: theme.themeColors.textT,
    },
  },

  depositActionButton: {
    height: "42px",
    margin: "auto",
    background: "none",
    borderColor: theme.themeColors.border,
    color: theme.themeColors.textT,
    borderWidth: "1px",
    borderStyle: "solid",
    marginLeft: "10px",
    marginRight: "5px",
    borderRadius: "0px",
    cursor: "pointer",
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

  w100: {
    width: "100%",
  },

  w10: {
    width: "10%"
  },

  w90: {
    width: "90%"
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
    emitter.on(DISABLE_ACTION_BUTTONS_RETURNED, this.handleActionButtonsControl);
    emitter.on(DEPOSIT_DAOMINE_RETURNED_COMPLETED, this.onDepositCompleted);
    emitter.on(ERROR, this.errorReturned);
  }

  componentWillUnmount() {
    emitter.on(DISABLE_ACTION_BUTTONS_RETURNED, this.handleActionButtonsControl);
    emitter.removeListener(DEPOSIT_DAOMINE_RETURNED_COMPLETED, this.onDepositCompleted);
    emitter.removeListener(ERROR, this.errorReturned);
  }

  handleActionButtonsControl = (disable) => {
    this.setState({loading: disable});
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
    let val = [];
    val[event.target.id] = event.target.value;
    this.verifyInput(val[event.target.id]);
    this.setState({amount: val[event.target.id], percent: 0});
  };

  verifyInput = (amount) => {
    const { pool } = this.props;
    const { userInfo } = pool;

    if(!validateDigit(amount) || validateAmountNotExist(amount))  {
      this.setInputErrorState("Invalid amount");
      return;
    }

    const tokenBalance = Math.floor((userInfo.tokenBalance / 10 ** pool.decimal) * 10000) / 10000;

    if(validateInputMoreThanBalance(amount, tokenBalance)){
      this.setInputErrorState("Exceed available balance.");
      return;
    }

    this.setState({ amountError: false, errorMessage: "" });
  }

  setInputErrorState = (message) => {
    this.setState({ amountError: true, errorMessage: message });
  }

  setAmount = (percent) => {
    const { pool } = this.props;
    const { userInfo } = pool;
    this.setState({
      amount:
        Math.floor((userInfo.tokenBalance / 10 ** pool.decimal) * 10000) /
        10000,
      percent,
      amountError: false,
      errorMessage: "",
    });
  };

  onDeposit = () => {
    const { startLoading, pool } = this.props;
    const { amount } = this.state;
    
    if(validateAmountNotExist(amount)) {
      this.setInputErrorState("Invalid amount");
      return;
    }
 
    if(!this.state.amountError && this.state.errorMessage === "") {
      this.setState({ loading: true });
      startLoading();
  
      dispatcher.dispatch({
        type: DEPOSIT_DAOMINE,
        content: {
          pool,
          amount: amount.toString()
        }
      })
    }
  };

  navigate = (vaultName) => {
    if (vaultName === 'ETH<->DVG') {
      window.open("https://info.uniswap.org/#/pools/0xa58262270521d7732fccbbdcdf9fcd1fc70d47e5", "_blank");
      return;
    } 
    if (vaultName === 'vipDVG') {
      this.props.history.push("/stake-dvg");
      return;
    } 
    if (vaultName === 'vipDVD') {
      this.props.history.push("/stake-dvd");
      return;
    }
    const path = "/invest#id=" + vaultName;
    this.props.history.push(path);
  }

  render() {
    const { amount, loading, amountError, percent, errorMessage } = this.state;
    const { classes, pool, startLoading } = this.props;

    const { userInfo } = pool;
    const selectedPoolType = store.getStore("daomineType");

    return  (
      <div className={classes.depositContainer}>
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
              {userInfo && userInfo.tokenBalance
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
              id={`${pool.pid}_amount`}
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
                className={`${classes.depositScale} 
                ${percent === 100 ? "active" : ""}`}
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
      
          <div className={classes.depositButtonBox}>
            {/** Deposit Button */}
            <Button
              disabled={(pool.deposit && loading) || !pool.deposit || !userInfo }
              className={`${classes.depositActionButton} 
                ${(selectedPoolType === LATEST_POOLS) ? classes.w90 : classes.w100}`}
              onClick={this.onDeposit}
            >
              <span>Confirm Deposit</span>
            </Button>

            {/** Withdraw Button */}
            {(selectedPoolType === LATEST_POOLS) && 
            <Tooltip title="Withdraw">
              <div>
                <StakeActions pool={pool} 
                  startLoading={startLoading} 
                  type={ACTION_WITHDRAW}
                  disabled={!pool.withdraw} 
                  label={`-`}></StakeActions>
              </div>
            </Tooltip>
            }
          </div>

          {/** Get LP Link*/}
          <div className={classes.displayInfoBox}>
            <a onClick={() => this.navigate(pool.name)} className={classes.lpLink}>
              Get {pool.label}<OpenInNewIcon></OpenInNewIcon>
            </a>
          </div> 
      </div>
    );
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(StakeDeposit)));
