import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import {
    Grid,
    Button,
} from '@material-ui/core';
import {
    CONNECTION_CONNECTED,
    CHANGE_NETWORK,
    ERROR,
    GET_UPGRADE_TOKEN,
    GET_UPGRADE_TOKEN_RETURN,
    UPGRADE_TOKEN,
    UPGRADE_TOKEN_SUCCESS,
    UPGRADE_TOKEN_RETURN,
    APPROVE_TRANSACTING,
    APPROVE_COMPLETED,
} from '../../constants'
import Store from "../../stores";
import ConnectWallet from "../common/connectWallet/connectWallet";
import { initOnboard } from '../../walletsServices.js';
import Snackbar from "../snackbar/snackbar";

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store
const styles = theme => ({
    root: {
        flex: 1,
        width: '100%',
        paddingLeft: '320px',
        paddingRight: '80px',
        paddingTop: '32px',
        paddingBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '100px',
        },
        '& p': {
            padding: '0px',
            margin: '0px'
        }
    },
    headerRow: {
        display: 'flex'
    },
    headerLeft: {
        width: '80%',
    },
    headerRight: {
        width: '50%',
        marginLeft: '20px',
        display: 'flex',
    },
    logoImg: {
        width: '126px',
        height: '146px',
        margin: 'auto',
    },
    text: {
        fontSize: '30px',
        fontWeight: '500',
        color: '#FFFFFF',
        lineHeight: '96px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            lineHeight: 1,
            textAlign: 'center',
            fontSize: '20px',
            marginTop: '20px'
        }
    },
    contentText: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#FFFFFF',
        lineHeight: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            lineHeight: 1,
            textAlign: 'center',
            fontSize: '8px',
            marginTop: '20px'
        }
    },
    content: {
        display: 'flex',
        marginTop: '2rem',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    contentLeft: {
        width: '80%',
        // width: '556px',
        // background:'red'
        background: theme.themeColors.modelBack,
        // padding:'0 19px',
        // boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        border: ' 1px solid #7367F7',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    contentLeftTitle: {
        height: '48px',
        background: theme.themeColors.menuSel,
        padding: '0 19px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        fontSize: '18px',
        fontWeight: '400',
        color: theme.themeColors.textT,
        lineHeight: '48px',
    },
    contentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '25px',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    },
    warnIcon: {
        width: "20px",
        height: "20px",
        fill: theme.themeColors.iconGray,
        marginLeft: "8px",
    },
    available: {
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '16px',
        color: theme.themeColors.textT,
        [theme.breakpoints.down('sm')]: {
            marginTop: '23px',
            textAlign: 'right'
        },
    },
    walletAmount: {
        fontSize: '16px',
        fontWeight: '400',
        display: 'flex',
        marginTop: '7px',
        color: theme.themeColors.textP,
        [theme.breakpoints.down('sm')]: {
            marginTop: '23px',
            textAlign: 'right'
        },
    },
    stakeInput: {
        marginTop: '30px',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            marginTop: '10px',
        },
    },
    input: {
        width: '100%',
        height: '56px',
        padding: '0 20px',
        border: '1px solid' + theme.themeColors.borderH,
        color: theme.themeColors.textT,
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
    actionInput: {
        "fontSize": "0.5rem",
        "marginTop": "1rem",
        "height": "42px",
        "width": "100%",
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
    },
    contentCenter: {
        padding: '0 19px'
    },
    max: {
        width: '50px',
        height: '24px',
        background: 'rgba(110,103,247,0.2)',
        borderRadius: '12px',
        color: '#7367F7',
        lineHeight: '24px',
        textAlign: 'center',
        position: 'absolute',
        right: '20px',
        top: '50%',
        marginTop: '-12px',
        cursor: 'pointer'
    },
    contentRight: {
        width: '50%',
        marginLeft: '20px',
        border: ' 1px solid #7367F7',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: '19px 0px 0px 0px'
        }
    },
    contentRightTitle: {
        height: '48px',
        background: theme.themeColors.menuSel,
        padding: '0 19px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
    },
    balanceLeft: {
        width: '20%',
    },
    balanceRight: {
        width: '80%'
    },
    dvgBalanceRow: {
        display: 'flex',
        marginBottom: '51px'
    },
    dvdBalanceRow: {
        display: 'flex',
        marginBottom: '27px'
    },
    balanceAmount: {
        fontSize: '20px',
        fontWeight: '400',
        lineHeight: '24px',
        color: theme.themeColors.textT,
        [theme.breakpoints.down('sm')]: {
            marginTop: '23px',
            textAlign: 'right'
        },
    },
    balanceCurrency: {
        fontSize: '20px',
        fontWeight: '400',
        display: 'flex',
        color: theme.themeColors.textP,
        [theme.breakpoints.down('sm')]: {
            marginTop: '23px',
            textAlign: 'right'
        },
    },
    balanceLogo: {
        width: '43px',
        height: '49px',
    },
    share: {
        width: '100%',
        height: '100%',
        //position: 'fixed',
        background: 'rgba(0,0,0,.6)',
        zIndex: '999999',
        top: 0,
        left: 0,
    },
    shareBox: {
        width: '419px',
        position: 'absolute',
        left: '40%',
        top: '30%',
        //trantransform: 'translate(-50%)',
        //background: theme.themeColors.modelBack,
        background: theme.themeColors.itemBack,
        border: '1px solid #7367F7',
        [theme.breakpoints.down('sm')]: {
            width: '335px',
            position: 'absolute',
            left: '50%',
            top: '15%',
            transform: 'translate(-50%)',
            // transform: 'translateX(-50%)',
        }
    },
    shareTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '48px',
        alignItems: 'center',
        background: theme.themeColors.menuSel,
        padding: '0 24px'
    },
    shareTitleText: {
        fontSize: '18px',
        color: theme.themeColors.textT
    },
    closeIcon: {
        width: '24px',
        height: '24px',
        fill: theme.themeColors.textT
    },
    aprIntroduction: {
        padding: '0 23px',
        // marginTop: '49px',
        marginTop: '15px',
        marginBottom: '15px',
        fontSize: '12px',
        color: theme.themeColors.textT
    },
    seeMore: {
        textDecoration: "underline",
        cursor: "pointer",
        color: theme.themeColors.textT,
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
    errorMessage: {
        color: theme.themeColors.formError,
        marginTop: "3px"
    },
    depositButtonBox: {
        width: "100%",
        display: "flex",
        marginTop: "4rem",
        marginBottom: "15px",
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
    }
});

class UpgradeToken extends Component {
    constructor(props) {
        super()
        const account = store.getStore('account')
        this.state = {
            assets: store.getStore('account'),
            account: account,
            amount: '',
            type: 'stake',
            isPopUp: false,
            max: false,
            amountError: false,
            errorMessage: '',
            network: 0,
            disableStake: false,
            disableUnstake: false,
            dvgBalance: 0,
            dvdBalance: 0,
        }
        if (account && account.address) {
            dispatcher.dispatch({ type: GET_UPGRADE_TOKEN })
        }
    }
    componentWillMount() {
        emitter.on(CHANGE_NETWORK, this.networkChanged);
        emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
        emitter.on(GET_UPGRADE_TOKEN_RETURN, this.getBalances)
        emitter.on(UPGRADE_TOKEN_SUCCESS, this.upgradeReturned)
        emitter.on(UPGRADE_TOKEN_RETURN, this.showHash)
        emitter.on(ERROR, this.errorReturned)
        emitter.on(APPROVE_TRANSACTING, this.showHashApproval);
        emitter.on(APPROVE_COMPLETED, this.onApprovalCompleted);
    }

    componentWillUnmount() {
        emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
        emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
        emitter.removeListener(GET_UPGRADE_TOKEN_RETURN, this.getBalances)
        emitter.removeListener(UPGRADE_TOKEN_SUCCESS, this.upgradeReturned)
        emitter.removeListener(UPGRADE_TOKEN_RETURN, this.showHash)
        emitter.removeListener(ERROR, this.errorReturned)
        emitter.removeListener(APPROVE_TRANSACTING, this.showHashApproval)
        emitter.removeListener(APPROVE_COMPLETED, this.onApprovalCompleted)
    }

    errorReturned = (error) => {
        const snackbarObj = { snackbarMessage: null, snackbarType: null };
        this.setState(snackbarObj);
        this.setState({ loading: false });
        const that = this;
        setTimeout(() => {
            const snackbarObj = {
                snackbarMessage: error,
                snackbarType: "Error",
            };
            that.setState(snackbarObj);
        });
    };

    networkChanged = (obj) => {
        this.setState({ networkId: obj.network });
        const account = store.getStore('account')
        if (account && account.address) {
            dispatcher.dispatch({ type: GET_UPGRADE_TOKEN })
        }
    }

    connectionConnected = () => {
        const account = store.getStore('account')
        this.setState({ loading: true, account: account })
        if (account && account.address) {
            dispatcher.dispatch({ type: GET_UPGRADE_TOKEN })
        }
    };

    showHashApproval = (txHash) => {
        const snackbarObj = { snackbarMessage: null, snackbarType: null };
        this.setState(snackbarObj);
        this.setState({ loading: false });
        const that = this;
        setTimeout(() => {
          const snackbarObj = {
            snackbarMessage: "Approving...",
            snackbarType: "Hash",
          };
          that.setState(snackbarObj);
        });
    };

    onApprovalCompleted = (txHash) => {
        const snackbarObj = { snackbarMessage: null, snackbarType: null };
        this.setState(snackbarObj);
        this.setState({ loading: false });
        const that = this;
        setTimeout(() => {
          const snackbarObj = {
            snackbarMessage: "Approved.",
            snackbarType: "Transaction Success",
          };
          that.setState(snackbarObj);
        });
    };
    
    getBalances = (asset) => {
        this.setState({
            loading: false,
            dvgBalance: asset.balance,
            dvdBalance: asset.upgradeBalance,
        })
    }

    upgrade = () => {
        this.setState({ errorMessage: "", loading: true });

        dispatcher.dispatch({
            type: UPGRADE_TOKEN,
        })
    }

    depositReturned = () => {
        this.setState({ loading: false, amount: "", });
    };

    showHash = (txHash) => {
        this.setState({
            snackbarMessage: null,
            snackbarType: null,
        });

        setTimeout(() => {
            this.setState({ 
                loading: false, 
                snackbarMessage: txHash, 
                snackbarType: 'Hash' 
            });
        });
    };

    upgradeReturned = (txHash) => {
        this.setState({
            snackbarMessage: null,
            snackbarType: null,
        });

        setTimeout(() => {
            this.setState({ 
                loading: false, 
                snackbarMessage: txHash, 
                snackbarType: 'Transaction Success' 
            });
        })
        
        dispatcher.dispatch({ type: GET_UPGRADE_TOKEN });
    };

    goUrl = (url) => {
        let tempwindow = window.open('_blank');
        tempwindow.location = url;
    }

    showPopupDetail = () => {
        this.setState({
            isPopUp: !this.state.isPopUp
        })
    }

    renderAvailableAmount = (amount, symbol) => {
        const { classes } = this.props;

        return (
            <div className={classes.available}>
                Available：
                {(Math.floor(amount * 10000) / 10000).toFixed(4)}
                {" "}
                {symbol}
            </div>
        )
    }

    renderSnackbar = () => {
        var { snackbarType, snackbarMessage } = this.state;
        return (
            <Snackbar
                type={snackbarType}
                message={snackbarMessage}
                open={true}
            />
        );
    }

    renderBalance = (symbol) => {
        const { classes } = this.props;
        const {
            dvgBalance,
            dvdBalance
        } = this.state;

        if (symbol === 'DVG') {
            return (
                <div className={classes.dvgBalanceRow}>
                    <div className={classes.balanceLeft}>
                        <img className={classes.balanceLogo} src={require('../../assets/DAO-logo.png')} alt="" />
                    </div>
                    <div className={classes.balanceRight}>
                        <div className={classes.balanceAmount}>{dvgBalance
                                    .toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}</div>
                        <div className={classes.balanceCurrency}>DVG</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={classes.dvdBalanceRow}>
                    <div className={classes.balanceLeft}>
                        <img className={classes.balanceLogo} src={require('../../assets/DAO-logo.png')} alt="" />
                    </div>
                    <div className={classes.balanceRight}>
                        <div className={classes.balanceAmount}>{dvdBalance
                                    .toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}</div>
                        <div className={classes.balanceCurrency}>DVD</div>
                    </div>
                </div>
            )
        }
    }

    render() {
        const {
            classes
        } = this.props;
        const {
            loading,
            account,
            isPopUp,
            disableStake,
            dvgBalance,
            dvdBalance
        } = this.state

        if (!account || !account.address) {
            return <ConnectWallet></ConnectWallet>
        } else {

            return <div className={classes.root}>
                <Grid className={classes.headerRow}>
                    <div className={classes.headerLeft}>
                        <div className={classes.text}>Upgrade your DVG to the new DVD token</div>

                        <div className={classes.contentText}>
                            A brand new upgraded DAOVentures DeFi token (DVD) is created to replace the DVG tokens with additional features (such as token burning and tier rewards) that are designed to boost the utility of the token. 
                        </div>
                        <br />
                        <div className={classes.contentText}>
                            Users that hold DVG before block 12801522 can swap their DVG tokens to DVD tokens at a 1:1 ratio.
                        </div>
                    </div>
                    <div className={classes.headerRight}>
                        <img className={classes.logoImg} src={require("../../assets/DAO-logo.png")} alt="" />
                    </div>
                </Grid>
                

                <div className={classes.content}>
                    <div className={classes.contentLeft}>
                        <div className={classes.contentLeftTitle}>
                            <div className={classes.titleText}>Upgrade DVG to DVD</div>
                        </div>
                        <div className={classes.contentCenter}>
                            <div className={classes.contentHeader}>
                                {/** Stake or Unstake Button */}
                                <div>
                                    <div className={classes.available}>Your wallet</div>
                                    <div className={classes.walletAmount}>Eligible for upgrade 
                                        <svg aria-hidden="true" className={classes.warnIcon} onClick={() => { this.showPopupDetail() }}>
                                            <use xlinkHref="#iconinformation-day"></use>
                                        </svg>
                                    </div>
                                </div>

                                {/** Available Amount in Wallet */}
                                <div>
                                    <div className={classes.available}>{dvgBalance
                                    .toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })} DVG</div>
                                    <div className={classes.walletAmount}>{dvdBalance
                                    .toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })} DVD</div>
                                </div>
                            </div>        

                            {/** Button to trigger stake function */}
                            <div className={classes.depositButtonBox}>
                                <Button disabled={disableStake || (!disableStake && loading)}
                                        className={classes.depositActionButton}
                                        onClick={() => this.upgrade()}
                                    >
                                        <span>Upgrade</span>
                                    </Button>
                            </div>
                        </div>
                    </div>

                    <div className={classes.contentRight}>
                        <div className={classes.contentRightTitle}>
                            <div className={classes.titleText}>Balance</div>
                        </div>
                        <div className={classes.contentCenter}>
                            { this.renderBalance('DVG') }
                            { this.renderBalance('DVD') }
                        </div>
                    </div>
                </div>
                
                {isPopUp ?
                    <div className={classes.share}>
                        <div className={classes.shareBox}>
                            <div className={classes.shareTitle}>
                                <p className={classes.shareTitleText}></p>
                                <svg className={classes.closeIcon} aria-hidden="true" onClick={() => { this.showPopupDetail() }}>
                                    <use xlinkHref="#iconclose"></use>
                                </svg>
                            </div>
                            <div className={classes.shareContent}>
                                <div className={classes.aprIntroduction}>
                                    <h3>
                                        Tokens in your wallet at block 12801522 (Jul-10-2021 07:28:49 PM +UTC) are eligible for swapping at a ratio of 1:1.
                                    </h3>
                                    <h3>
                                        Tokens that are purchased after the block will be swapped based on an initial price of $0.225. Please reach out to us via our Telegram or Discord if you had purchased the DVG token after block 12801522.
                                    </h3>
                                    <h3>
                                        <a href="https://daoventuresco.medium.com/the-day-after-chainswap-exploit-our-action-plan-4a53a75a0c26" target="_blank" rel="noopener noreferrer" className={classes.seeMore}>Read more here</a>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div> : null}
                {/** Snackbar */}
                {this.state.snackbarMessage && this.renderSnackbar()}
            </div>
        }

    }
}
export default withNamespaces()(withRouter(withStyles(styles)(UpgradeToken)));