import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button } from "@material-ui/core";
import Store from "../../../../stores/store";
import {
    WITHDRAW_DAOMINE,
    WITHDRAW_DAOMINE_RETURNED_COMPLETED,
    ERROR
} from '../../../../constants/constants';
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

    withdrawalContainer: {
        paddingBottom: "12px",
        display: "flex",
        flex: "1",
        paddingLeft: "5px",
        paddingRight: "5px",
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
        padding: "15px",
        margin: "auto",
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
        marginBottom: "5px"
    },

    cursor: {
        pointer: "cursor",
    },

    withdrawalInputContainer: {
        width: "100%",
        position: "relative",
    },

    withdrawalInput: {
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

    withdrawalScaleContainer: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0px 0px 12px 0px",
        alignItems: "center",
        flexWrap: "wrap",
        position: "absolute",
        right: "10px",
        top: "31px",
    },

    withdrawalScale: {
        color: theme.themeColors.textP,
        minWidth: "30px",
        padding: "0px 6px",
    },

    withdrawalScaleActive: {
        minWidth: "30px",
        padding: "0px 6px",
        color: theme.themeColors.textT,
    },

    withdrawalActionButton: {
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

    withdrawlButtonBox: {
        width: "100%",
        display: "flex",
        marginTop: "20px",
        marginBottom: "15px",
        justifyContent: "space-between",
    },

    claimRewardsButtonBox: {
        width: "100%",
        display: "flex",
        marginTop: "20px",
        marginBottom: "15px",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },

    errorMessage: {
        color: theme.themeColors.formError,
        marginTop: "3px"
    }
});

const store = Store.store;
const emitter = Store.emitter;
const dispatcher = Store.dispatcher;

class StakeWithdraw extends Component {
    constructor(props) {
        super();

        this.state = {
            amountError: false,
            loading: false,
            amount: 0,
            percent: 0,
            errorMessage: ""
        };
    }

    componentWillMount() {
        emitter.on(WITHDRAW_DAOMINE_RETURNED_COMPLETED, this.onWithdrawCompleted);
        emitter.on(ERROR, this.errorReturned);
    }

    componentWillUnmount() {
        emitter.removeListener(WITHDRAW_DAOMINE_RETURNED_COMPLETED, this.onWithdrawCompleted);
        emitter.removeListener(ERROR, this.errorReturned);
    }

    // Staked amount input on change handler
    onChange = (event) => {
        let val = [];
        val[event.target.id] = event.target.value;
        this.verifyInput(val[event.target.id]);
        this.setState({amount: val[event.target.id]});
    };

    verifyInput = (amount) => {
        const { pool } = this.props;
        const { userInfo } = pool;
    
        if(!validateDigit(amount) || validateAmountNotExist(amount))  {
          this.setInputErrorState("Invalid amount");
          return;
        }
    
        const displayStakedAmount = Math.floor((userInfo.depositedLPAmount / 10 ** pool.decimal) * 10000) / 10000;
    
        if(validateInputMoreThanBalance(amount, displayStakedAmount)){
          this.setInputErrorState("Exceed available balance.");
          return;
        }
    
        this.setState({ amountError: false, errorMessage: "" });
      }
    
      setInputErrorState = (message) => {
        this.setState({ amountError: true, errorMessage: message });
      }

    // Handler when withdrawal process completed
    onWithdrawCompleted = (txnHash) => {
        this.setState({
            amount: 0,
            amountError: false,
            errorMessage: "",
            percent: 0,
            loading: false
        })
    }

    errorReturned = () => {
        this.setState({ loading: false });
    }

    // Handler to set amount to staked amount input field
    setAmount = (percent) => {
        const { pool } = this.props;
        const { userInfo } = pool;
        this.setState({
            amount:
                Math.floor((userInfo.depositedLPAmount / 10 ** pool.decimal) * 10000) /
                10000,
            percent,
            amountError: false,
            errorMessage: ""
        });
    };

    onWithdrawal = () => {
        this.setState({ amountError: false, errorMessage: "" });

        const { startLoading, pool } = this.props;
        const { amount } = this.state;
        const { userInfo } = pool;

        if (validateAmountNotExist(amount)) {
            this.setState({ amountError: true, errorMessage: "Invalid amount" });
            return;
        }

        let finalAmount = 0;

        const displayStakedAmount = Math.floor((userInfo.depositedLPAmount / 10 ** pool.decimal) * 10000) / 10000;
        const exactStakedAmount = userInfo.depositedLPAmount / 10 ** pool.decimal;

        if (parseFloat(displayStakedAmount) === parseFloat(amount)) {
            // Example remaining = 0.45219, display on UI as 0.4521 (4 d.p.)
            // User input to withdraw 0.4521, which is max on UI
            // Then we append final withdrawal amount as all of staked amount.i.e. 0.45219
            finalAmount = exactStakedAmount;
        } else if (parseFloat(amount) < parseFloat(displayStakedAmount) ||
            parseFloat(amount) <= exactStakedAmount) {
            // Example remaining = 0.45219, display on UI as 0.4521 (4 d.p.)
            // Case 1 : User input to withdraw 0.2, 0.2 < 0.45219, final amount = 0.2
            // Case 2 : User input to withdraw 0.45215, still <= 0.45219, final amount = 0.45215
            finalAmount = parseFloat(amount);
        } else if (parseFloat(amount) > parseFloat(exactStakedAmount)) {
            // Example remaining = 0.45219, display on UI as 0.4521 (4 d.p.)
            // User input to withdraw 0.452198
            // 0.452198 > 0.45219, show error message.
            // this.setState({ amountError: true, errorMessage: "Exceed available balance" });
            // return;
        }

        if(!this.state.amountError && this.state.errorMessage === "") {
            this.setState({ loading: true });
            startLoading();

            dispatcher.dispatch({
                type: WITHDRAW_DAOMINE,
                content: {
                    pool,
                    amount: finalAmount.toString()
                }
            })
        }
    };

    render() {
        const { amount, loading, amountError, percent, errorMessage } = this.state;
        const { classes, pool } = this.props;

        const { userInfo } = pool;

        return (
            <div className={classes.withdrawalContainer}>
                <div className={classes.tradeContainer}>
                    {/** Wallet Balance */}
                    <div className={classes.displayInfoBox}>
                        <Typography variant="body1" className={classes.cursor} noWrap>
                            Staked:
                        </Typography>

                        <Typography
                            variant="body2"
                            onClick={() => {
                                this.setAmount(100);
                            }}
                            className={classes.cursor}
                            noWrap
                        >
                            {userInfo.depositedLPAmount
                                ? (
                                    Math.floor(
                                        (userInfo.depositedLPAmount / 10 ** pool.decimal) * 10000
                                    ) / 10000
                                ).toFixed(4)
                                : "0.0000"}
                            {" " + pool.name}
                        </Typography>
                    </div>

                    {/** Deposit Amount Textbox */}
                    <div className={classes.withdrawalInputContainer}>
                        <TextField
                            style={{
                                width: "100%",
                            }}
                            className={classes.withdrawalInput}
                            id={`${pool.pid}_withdraw`}
                            cursor={amount}
                            value={amount}
                            error={amountError}
                            onChange={this.onChange}
                            disabled={loading}
                            placeholder="0.00"
                            variant="outlined"
                            onKeyDown={this.inputKeyDown}
                        />

                        <div className={classes.withdrawalScaleContainer}>
                            <Button
                                className={
                                    percent === 100
                                        ? classes.withdrawalScaleActive
                                        : classes.withdrawalScale
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

                    {/** Withdrawal Button */}
                    <div className={classes.withdrawlButtonBox}>
                        <Button
                            disabled={(pool.withdraw && loading) || !pool.withdraw}
                            className={classes.withdrawalActionButton}
                            onClick={this.onWithdrawal}
                        >
                            <span>Confirm Withdraw & Claim Rewards</span>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(StakeWithdraw)));
