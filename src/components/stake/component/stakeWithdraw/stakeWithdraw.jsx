import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button } from "@material-ui/core";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
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
        alignItems: "center",
        width: "100%",
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
    }
});

const store = Store.store;
class StakeWithdraw extends Component {
    constructor(props) {
        super();

        const account = store.getStore("account");

        this.state = {
            pool: {
                userDepositedToken: "0.112100",
                dvgReward: "0.12345",
                underlyingToken: "DAI",
                userPoolShare: "50",
            },
            amountError: false,
            loading: false,
            amount: 0,
            percent: 0,
        };
    }

    onDeposit = () => { };

    render() {
        const { pool, amount, loading, amountError, percent } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.withdrawalContainer}>
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
                            {pool.userDepositedToken + " " + pool.underlyingToken}
                        </Typography>
                    </div>

                    {/** Deposit Amount Textbox */}
                    <div className={classes.withdrawalInputContainer}>
                        <TextField
                            style={{
                                width: "100%",
                            }}
                            className={classes.withdrawalInput}
                            id="amount"
                            cursor={amount}
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

                    {/** Withdrawal Button */}
                    <div className={classes.withdrawlButtonBox}>
                        <Button
                            className={classes.withdrawalActionButton}
                            onClick={this.onDeposit}
                        >
                            <span>Confirm Withdraw & Claim Rewards</span>
                        </Button>
                    </div>

                    {/** DVG Rewards */}
                    <div className={classes.displayInfoBox}>
                        <Typography variant="body1" className={classes.cursor} noWrap>
                           DVG Rewards:
                        </Typography>

                        <Typography
                            variant="body2"
                            className={classes.cursor}
                            noWrap
                        >
                            {pool.dvgReward + " DVG"}
                        </Typography>
                    </div>

                   {/** Claim Rewards Button */}
                   <div className={classes.claimRewardsButtonBox}>
                        <Button
                            className={classes.withdrawalActionButton}
                            onClick={this.onDeposit}
                        >
                            <span>Claim Rewards</span>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(StakeWithdraw)));
