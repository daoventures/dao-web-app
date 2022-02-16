import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { Button, TextField, Typography } from "@material-ui/core";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import InputValidation from "../../utils/inputValidation";
import { TOKEN_TYPE as tokenTypes } from "../../constants/constants";
import { formattingNumber } from "./utils";
import { CHANGE_NETWORK } from "../../constants/constants";
import Store from "../../stores/storev2";

const emitter = Store.emitter;

const styles = (theme) => ({
    flexColumm: {
        display: "flex",
        flexDirection: "column",
        width: "100%", 
        minHeight: "120px",
    },
    actionContainer: {
        width: "100%",
        position: "relative",
    },
    actionInput: {
        fontSize: "0.5rem",
        height: "42px",
        width: "100%",
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
    depositContainer: {
        position: "relative",
    },
    currencyContainer: {
        position: "absolute",
        top: "10px",
        right: "10px",
        color: theme.themeColors.textT, 
        display: "flex",
        alignItems: "center", 
        cursor: "pointer"
    },
    currency: {
        width: "16px",
        marginRight: "8px"
    },
    selectionContainer: {
        position: "absolute",
        right: "15px",
        background:  "rgba(21,2,59,0.7)",
        border: "1px solid " + theme.themeColors.border,
        zIndex: 5, 
        display: "flex",
        flexDirection: "column", 
        padding : "14px 0px"

    }, 
    selection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
        padding: "8px 14px",
        color: theme.themeColors.textT,
        "&:hover": {
            background: "#7357b7"
        }
    }, 
    errorText: {
        color: theme.themeColors.formError,
    }, 
    topLabel: {
        color: theme.themeColors.textT,
        margin: "14px 0px"
    },
    hide: {
        display :"none"
    }, 
    messageContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between", 
        alignItems: "center", 
        minHeight: "50px"
    }
})

class RedeemInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputAmount: "0", 
            error: false,
            errorMessage: "",
            expanded: false,
            selectedToken: "token",
            tokenLabel: "DVD"
        };
    }

    componentWillMount() {
        emitter.on(CHANGE_NETWORK, this.networkChanged)
    }

    componentWillUnmount() {
        emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
    }

    networkChanged = () => {
        this.setState({ 
            inputAmount: "0",
            error: false,
            errorMessage: ""
        })
    }

    validateInput(amount) {
        const { redeemerInfo } = this.props;

        const balance = redeemerInfo !== null ? redeemerInfo[this.state.selectedToken].balance : 0;
       
        if( !InputValidation.validateDigit(amount) || 
            InputValidation.validateAmountNotExist(amount)
        ) {
        
          this.setState({
            error: true,
            errorMessage: `Invalid amount`,
          });
          return { error: true };
        }

        if ( InputValidation.validateInputMoreThanBalance(amount, balance)) {
            this.setState({
                error: true,
                errorMessage: `Exceed available balance`,
            });
            return { error: true };;
        }

        this.setState({error: false, errorMessage: ""});
        return { error: false };
    }

    closeExpanded = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    onChange = (event) => {
        let val = [];
        val[event.target.id] = event.target.value;

        const {error} = this.validateInput(val[event.target.id]);

        this.setState({
            inputAmount: val[event.target.id]
        })

        this.props.handleInput({ 
            error, 
            amount: val[event.target.id],
            tokenType: this.state.selectedToken,
        });
        
    }

    handleTokenSelected = (event) => {
        this.setState({
            selectedToken: event.type,
            tokenLabel: event.label, 
            expanded: false, 
            inputAmount: "0", 
            error: false,
            errorMessage:""
        });

        this.props.handleTokenSelected(event);
    }
 
    render() {
        let { classes , isForDisplay, loading, redeemerInfo, info } = this.props;
        const { inputAmount, error, expanded, errorMessage, tokenLabel } = this.state;

        if (isForDisplay === undefined) {
            isForDisplay = false;
        }

        if (loading === undefined) {
            loading = false;
        }

        return <div className={classes.flexColumm}>
            <div className={classes.messageContainer}>
                {/** Token Label */}
                <div className={classes.topLabel}>
                    <Typography variant={"h5"}>{isForDisplay ? info.label: tokenLabel}</Typography>
                </div>

                {/** Balance */}
                {!isForDisplay&&<div className={classes.topLabel} style={{ marginRight: "15px"}}>
                    <span>Balance: {
                        redeemerInfo !== null && redeemerInfo !== undefined
                            ? formattingNumber(redeemerInfo[this.state.selectedToken].balance)
                            : 0
                    } {tokenLabel}</span>
                </div>}
            </div>
           
            <div className={classes.depositContainer}>
                <TextField
                    className={classes.actionInput}
                    value={isForDisplay ? info.amount : inputAmount}
                    error={error}
                    id="input"
                    disabled={loading || isForDisplay}
                    variant="outlined"
                    onChange={this.onChange}
                />

                {!isForDisplay&&<div className={classes.currencyContainer} onClick={() => this.closeExpanded()}>
                    <img alt="icon" className={classes.currency} src={require(`../../assets/img_new/swap/${this.state.tokenLabel.toLowerCase()}.png`)}/>
                    <span>{tokenLabel}</span>
                    {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </div>}

                {expanded && <div className={classes.selectionContainer}>
                    {tokenTypes.map(d => {
                        return <div className={classes.selection} onClick={() => this.handleTokenSelected(d)}>
                            <img alt="icon" className={classes.currency} src={require(`../../assets/img_new/swap/${this.state.tokenLabel.toLowerCase()}.png`)}/>
                            <span>{d.label}</span>
                        </div>
                    })}
                </div>}
            </div>

            {/** Error Message */}
            {error&&<div className={`${classes.errorText}`}>
                <span>{errorMessage}</span>
            </div>}

        </div>
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(RedeemInput)))
