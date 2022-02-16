import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Store from "../../stores/storev2";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DoneIcon from '@material-ui/icons/Done';
import { formattingNumber } from "./utils";
import { APPROVE_PTOKEN, BLOCK_EXPLORERS, REDEEM_PTOKEN } from "../../constants/constants";
import { addToMetamask } from "./utils";

const store = Store.store;
const emitter = Store.emitter;

const styles = (theme) => ({
    contentContainer: {
        display: "flex", 
        flexDirection: "column",
        justifyContent: "space-between",
        color: "white", 
        minHeight: "300px"
    },
    amountContainer: {
        background: "rgba(21,2,59,0.7)",
        padding: "16px"
    },
    depositActionButton: {
        height: "42px",
        background: "#7B25D266",
        borderColor: theme.themeColors.border,
        color: theme.themeColors.textT,
        width: '100%',
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
        '& img': {
            height: "30px"
        },
        "& .MuiButton-label": {
            textTransform: "uppercase"
        }
    },
    approvalButton: {
        borderRadius: "24px"
    },
    grayText: {
        color: theme.themeColors.textGray
    },
    errorText: {
        color: theme.themeColors.formError,
    }, 
})

class ConfirmRedeem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requireApprove: false, 
            allowance: 0,
            enableSwap: false, 
            approvalLoading: false, 
            approvalSuccess: false,
            approvalError: "", 
            redeemLoading: false,
            redeemSuccess: false,
            redeemError: "",
            transactionUrl: "",
        };

        this.checkAllowance();
    }

    componentWillMount() {
        emitter.on(APPROVE_PTOKEN, this.handlePTokenStatus);
        emitter.on(REDEEM_PTOKEN, this.handleRedeemStatus);
    }

    componentWillUnmount() {
        emitter.removeListener(APPROVE_PTOKEN, this.handlePTokenStatus);
        emitter.removeListener(REDEEM_PTOKEN, this.handleRedeemStatus);
    }

    handleRedeemStatus = (event) => {

        if(event.success && event.receipt && event.action === "redeem") {
            const network = store.getStore("network");
            const receipt = event.receipt;
            const transactionHash = receipt.transactionHash;

            const blockExplorersUrl = BLOCK_EXPLORERS[network];
            const transactionUrl = blockExplorersUrl + transactionHash;

            this.setState({
                redeemSuccess: true,
                redeemLoading: false, 
                redeemError: "",
                transactionUrl
            })

            setTimeout(() => {
                this.resetAllVariable();
            }, 5000)
        }

        if(!event.success && event.error) {
            this.setState({
                redeemLoading: false, 
                redeemError: event.error.message
            })
        }
    }

    handlePTokenStatus = (event) => {

        if(event.success && event.receipt && event.action === "approve") {
            this.setState({
                approvalSuccess: true,
                approvalLoading: false, 
                approvalError: "", 
                requireApprove: false
            })
        }

        if(!event.success && event.error) {
            console.log(event);
            this.setState({
                approvalLoading: false, 
                approvalError: event.error.message
            })
        }
    }

    resetAllVariable() {
        this.setState({
            requireApprove: false, 
            allowance: 0,
            enableSwap: false, 
            approvalLoading: false, 
            approvalSuccess: false,
            approvalError: "", 
            redeemLoading: false,
            redeemSuccess: false,
            redeemError: "",
            transactionUrl: "",
        })
    }


    checkAllowance = async () => {
        const { redeemerInfo } = this.props;

        if(redeemerInfo !== null) {
            const allowance = await store.getAllowance(redeemerInfo.tokenAddress);
            this.setState({ allowance });

            if(allowance.allowanceRaw <= this.props.inputAmountRaw) {
                this.setState({ requireApprove: true})
            }
        }
    }

    renderAmount = (amount, label) => {
        const { classes } = this.props;

        return <div>
            <Typography variant="h3">
                {formattingNumber(amount)}
                <span className={classes.grayText} style={{ marginLeft: "5px"}}>{label}</span>
            </Typography>
        </div>
    }

    approveContract = async() => {
        this.setState({ 
            approvalLoading: true,
            approvalError: ""
        })
        this.props.handleTransaction();
        const tokenAddress = this.props.redeemerInfo.tokenAddress;
        await store.getApproval(tokenAddress);
    }

    redeemPToken = async() => {
        this.setState({ 
            requireApprove: false,
            redeemLoading: true,
            redeemError: ""
        })
        this.props.handleTransaction();
        const params = { amount: this.props.inputAmount, isVipToken: this.props.isVipToken};
        await store.redeemPToken(params);
    }

    addTokenToMetamask = async() => {
        const network = store.getStore("network");
        const assets = store._getDefaultValues(network);

        const { pD33D } = assets.redeemPD33D;

        await addToMetamask(pD33D);
    }

    viewTransactionOnBlockExplorer = async() => {
        window.open(this.state.transactionUrl, "_blank")
    }

    render() {
        const { classes, inputAmount, inputLabel, outputAmount, outputLabel } = this.props;
        const { requireApprove, approvalLoading, approvalSuccess, approvalError, redeemLoading, redeemSuccess, redeemError } = this.state;

        return <div className={classes.contentContainer}>
            <div>
                <div className={classes.amountContainer}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <Typography variant={"body1"} className={classes.grayText}>Kindly approve the transaction in your wallet</Typography>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "24px 24px 16px 24px" }}>
                        {this.renderAmount(inputAmount, inputLabel)}
                        <ArrowForwardIcon />
                        {this.renderAmount(outputAmount, outputLabel)}
                    </div>
                </div>

                {/** Approval */}
                {requireApprove && <div style={{ display: "flex", flexDirection: "row", marginTop: "32px", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="body1">
                        {approvalError === "" && <span>Allow your {inputLabel} to be swapped to {outputLabel}</span>}
                        {approvalError !== "" && <span className={classes.errorText}>{ approvalError }</span>}
                    </Typography>

                    <div style={{ width: "35%" }}>
                        <Button className={`${classes.depositActionButton} ${classes.approvalButton}`}
                            disabled={approvalLoading || approvalSuccess}
                            onClick={() => {this.approveContract()}}>
                            {!approvalLoading && !approvalSuccess && <span>Approve</span>}
                            {approvalLoading && <CircularProgress color="#FFFFFF" size="20px"/>}
                            {!approvalLoading && approvalSuccess && <DoneIcon/>}
                        </Button>
                    </div>
                </div>}


                {!requireApprove && <div style={{ display: "flex", flexDirection: "row", marginTop: "32px", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="body1" style={{textAlign:"center"}}>
                        {!redeemLoading&&redeemSuccess && <>Your {inputLabel}s have been swapped <span style={{display: "block"}}>to {outputLabel} successfully.</span></>}
                        {redeemLoading&&!redeemSuccess && <>Swapping your {inputLabel}</>}
                        {redeemError !== "" && <>
                            <span className={classes.errorText}>
                                Failed to swap {inputLabel}
                                <span style={{display: "block"}}>
                                    Please try again.
                                </span>
                            </span>
                        </>}
                    </Typography>
                </div>}
            </div>

            <div style={{ margin: "24px 0px", padding: "0px 24px" }}>
                {redeemSuccess && <>
                    <Button className={classes.depositActionButton}
                        onClick={() => this.addTokenToMetamask()}
                    >
                        Add {outputLabel} to Metamask
                    </Button>

                    <Button className={classes.depositActionButton}
                        style={{ marginTop: "16px"}}
                        onClick={() => this.viewTransactionOnBlockExplorer()}
                    >
                        View on Etherscan
                    </Button>
                </>}

                {!redeemSuccess&&<Button className={classes.depositActionButton}
                    onClick={() => this.redeemPToken()}
                     disabled={approvalLoading || redeemLoading || redeemSuccess}>
                    { !redeemLoading&&!redeemSuccess&&<span>Swap</span>}
                    { redeemLoading && <CircularProgress color="#FFFFFF" size="20px"/> }
                </Button>}
            </div>
        </div>;
    }

}

export default withNamespaces()(withRouter(withStyles(styles)(ConfirmRedeem)));