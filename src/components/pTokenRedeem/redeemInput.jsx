import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { Button, TextField, Typography } from "@material-ui/core";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import InputValidation from "../../utils/inputValidation";
import { TOKEN_TYPE as tokenType } from "../../constants/constants";

const styles = (theme) => ({
    flexColumm: {
        display: "flex",
        flexDirection: "column",
        width: "100%"
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
        background:  "#000000",
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
        padding: "0px 14px",
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
        alignItems: "center"
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

    // props
    // isPToken, amount

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
          return;
        }

        if ( InputValidation.validateInputMoreThanBalance(amount, balance)) {
            this.setState({
                error: true,
                errorMessage: `Exceed available balance`,
            });
            return;
        }

        this.setState({error: false, errorMessage: ""});
    }

    closeExpanded = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    onChange = (event) => {
        let val = [];
        val[event.target.id] = event.target.value;

        this.validateInput(val[event.target.id]);

        this.setState({
            inputAmount: val[event.target.id]
        })

        
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
        let { classes, amount, isPToken, loading, redeemerInfo } = this.props;
        const { inputAmount, error, expanded, errorMessage, tokenLabel } = this.state;

        if (isPToken === undefined) {
            isPToken = false;
        }

        if (loading === undefined) {
            loading = false;
        }

        return <div className={classes.flexColumm}>
            <div className={classes.messageContainer}>
                {/** Token Label */}
                <div className={classes.topLabel}>
                    <Typography variant={"h5"}>{tokenLabel}</Typography>
                </div>

                {/** Balance */}
                <div className={classes.topLabel} style={{ marginRight: "15px"}}>
                    <span>Balance: {
                        redeemerInfo !== null
                            ? redeemerInfo[this.state.selectedToken].balance
                            : 0
                    } {tokenLabel}</span>
                </div>
            </div>
           
            <div className={classes.depositContainer}>
                <TextField
                    className={classes.actionInput}
                    value={isPToken ? amount : inputAmount}
                    error={error}
                    id="input"
                    disabled={loading || isPToken}
                    variant="outlined"
                    onChange={this.onChange}
                />

                <div className={classes.currencyContainer} onClick={() => this.closeExpanded()}>
                    <img alt="icon" className={classes.currency} src={require(`../../assets/img_new/swap/${this.state.tokenLabel.toLowerCase()}.png`)}/>
                    <span>{tokenLabel}</span>
                    {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </div>

                {expanded && <div className={classes.selectionContainer}>
                    {tokenType.map(d => {
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
