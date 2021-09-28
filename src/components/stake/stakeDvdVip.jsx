import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import {
    Grid,
    TextField,
    Typography,
    Button,
} from '@material-ui/core';
import {
    GET_DVG_INFO,
    CONNECTION_CONNECTED,
    GET_DVG_BALANCE_SUCCESS,
    DEPOSIT_XDVG,
    GET_XDVG_BALANCE_SUCCESS,
    WIDTHDRAW_XDVG,
    GET_DVG_APR,
    GET_XDVG_APR_SUCCESS,
    WITHDRAW_DVG_RETURNED,
    WITHDRAW_DVG_RETURNED_COMPLETED,
    DEPOSIT_DVG_RETURNED,
    DEPOSIT_DVG_RETURNED_COMPLETED,
    APPROVAL_DVG_RETURNED,
    APPROVAL_DVG_RETURNED_COMPLETED,
    ERROR,
    CHANGE_NETWORK,
} from '../../constants/constants'
import Store from "../../stores/storev2";
import ConnectWallet from "../common/connectWallet/connectWallet";
import Snackbar from "../snackbar/snackbar";
import InfoModal from "../common/infoModal/infoModal";
import { validateDigit, validateInputMoreThanBalance, validateAmountNotExist } from "./helper/validation";

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
    banner: {
        width: '100%',
        height: '120px',
        padding: '12px 50px',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundImage: 'url(' + require('../../assets/stakeImg/Daovip_banner@1x.png') + ')',
        [theme.breakpoints.down('sm')]: {
            height: '170px',
            padding: '12px 10px',
            position: 'relative',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            backgroundImage: 'url(' + require('../../assets/stakeImg/h5-Dvg_banenr@2x.png') + ')',
            backgroundSize: '100% 100%'
        }
    },
    bannerLeft: {
        width: '100%'
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
    bannerRight: {
        display: 'flex',
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            display: 'flex',
            marginTop: '30px',
            justifyContent: 'space-between',
        }
    },
    toTrade: {

        [theme.breakpoints.down('sm')]: {
            width: '100%',
            display: 'flex',
            marginTop: '30px',
            justifyContent: 'center',
        }
    },
    toTradeUniswap: {
        width: '214px',
        height: '44px',
        backgroundImage: 'url(' + require('../../assets/stakeImg/button_Uniswap@2x.png') + ')',
        lineHeight: '44px',
        fontSize: '18px',
        fontWeight: '500',
        color: theme.themeColors.textT,
        backgroundSize: '100% 100%',
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: '8px',
        marginRight: '20px',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            width: '160px',
            fontSize: '14px'
        },
        '&:hover': {
            backgroundImage: 'url(' + require('../../assets/stakeImg/button_Uniswap_hover.png') + ')',
        }
    },
    toTradePancakeswap: {
        width: '214px',
        height: '44px',
        backgroundImage: 'url(' + require('../../assets/stakeImg/button_pancakeswap@2x.png') + ')',
        backgroundSize: '100% 100%',
        lineHeight: '44px',
        fontSize: '18px',
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            width: '160px',
            fontSize: '14px'
        },
        '&:hover': {
            backgroundImage: 'url(' + require('../../assets/stakeImg/button_pancakeswap_hover.png') + ')',
        }
    },
    content: {
        display: 'flex',
        marginTop: '35px',
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
    titleRate: {
        background: theme.themeColors.btnBack,
        border: '1px solid #6C60E8',
        fontSize: '12px',
        fontWeight: '400',
        color: '#6c60e8',
        textAlign: 'center',
        lineHeight: '26px',
        height: '26px',
        padding: '0 8px'
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
    stakeTab: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(110,103,247,1)',
        width: '180px',
        height: '32px',
        display: 'flex'
    },
    stake: {
        width: '90px',
        background: theme.themeColors.stakeTextBg,
        color: theme.themeColors.stakeTextText,
        lineHeight: '32px',
        textAlign: 'center',
        cursor: 'pointer'
    },
    unStake: {
        width: '90px',
        color: theme.themeColors.stakeTextBg,
        lineHeight: '32px',
        textAlign: 'center',
        cursor: 'pointer'
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
        // padding: '0px 0px 12px 0px',
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
        // '& input:valid + fieldset': {
        //   borderColor: 'green',
        //   borderWidth: 2,
        // },
    },
    approveStaking: {
        height: '44px',
        border: '1px solid rgba(115, 103, 247, 0.4);',
        marginTop: '31px',
        lineHeight: '44px',
        textAlign: 'center',
        marginBottom: '31px',
        color: 'rgba(115, 103, 247, 0.4)',
        cursor: 'pointer'
    },
    approveStakingActive: {
        height: '44px',
        marginTop: '31px',
        lineHeight: '44px',
        textAlign: 'center',
        marginBottom: '31px',
        color: 'rgba(115, 103, 247,1)',
        border: '1px solid rgba(115, 103, 247, 1);',
        cursor: 'pointer'
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
        // width: '460px',
        width: '50%',
        marginLeft: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: '19px 0px 0px 0px'
        }
        // background:'red'
        // background: 'linear-gradient(223deg, rgba(36, 33, 81, 0.54) 0%, rgba(38, 35, 83, 0.8) 40%, rgba(28, 26, 67, 0.45) 100%)',
        // padding:'0 19px',
        // boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        // border:' 1px solid #7367F7'
    },
    total: {
        display: 'flex',
        background: theme.themeColors.modelBack,
        width: '50%',
        minWidth: '167px',
        // padding:'0 19px',
        // boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        border: '1px solid #7367F7',
        padding: '23px 16px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            minWidth: '167px',
            padding: '23px 9px',
        }

    },
    aprPercent: {
        display: 'flex',
        background: theme.themeColors.modelBack,
        width: '100%',
        minWidth: '167px',
        // padding:'0 19px',
        // boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        border: '1px solid #7367F7',
        padding: '33px 16px',
        alignItems: 'center',
        marginBottom: '10px',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            minWidth: '167px',
            padding: '33px 9px',
        }
    },
    totalText: {

    },
    apr: {
        display: 'flex',
        background: theme.themeColors.modelBack,
        width: '50%',
        minWidth: '167px',

        // padding:'0 19px',
        // boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        border: '1px solid #7367F7',
        padding: '23px 16px',
        alignItems: 'center',
        marginLeft: '20px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '167px',
            padding: '23px 9px',
        }
    },
    totalApr: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        }
    },
    aprText: {

    },
    smallImg: {
        width: '40px',
        height: '40px',
        marginRight: '12px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '5px',
            width: '28px',
            height: '28px',
            marginRight: '8px',
        }
    },
    totalTextTile: {
        fontWeight: '400',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        color: theme.themeColors.textT,
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
        }
    },
    totalTextNum: {
        fontSize: '20px',
        fontWeight: '500',
        color: theme.themeColors.textT,
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
        }
    },
    myAssets: {
        // padding: '49px 40px',
        // display: 'flex',
        // marginTop: '21px',
        // background: theme.themeColors.modelBack,
        // // padding:'0 19px',
        // // boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        // border: ' 1px solid #7367F7',
        // alignItems: 'center'
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
    },
    myAssetsTitle: {
        fontSize: '24px',
        fontWeight: '400',
        color: theme.themeColors.textT
    },
    myAssetsNum: {
        fontSize: '24px',
        fontWeight: '500',
        color: theme.themeColors.textT
    },
    myAssetsRate: {
        fontSize: '16px',
        fontWeight: '500',
        color: theme.themeColors.myAssetsRateText,
    },
    bigImg: {
        width: '80px',
        height: '80px',
        marginRight: '23px',
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
    aprTitle: {
        fontSize: '14px',
        color: theme.themeColors.textT
    },
    shareText: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '7px',
        padding: '0 72px'
    },
    shareTextTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '27px',
        padding: '0 72px',
        marginTop: '18px'
    },
    aprText: {
        fontSize: '16px',
        color: '#7367F7'
    },
    aprIntroduction: {
        padding: '0 23px',
        // marginTop: '49px',
        marginTop: '15px',
        marginBottom: '15px',
        fontSize: '12px',
        color: theme.themeColors.textT
    },
    shareBtn: {
        width: '217px',
        border: '1px solid #7367F7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '57px auto 34px',
        '& span': {
            fontSize: '18px',
            color: theme.themeColors.textT
        }
    },
    shareIcon: {
        width: '12px',
        height: '12px',
        fill: theme.themeColors.textT
    },
    calculator: {
        width: '14px',
        height: '14px',
        fill: theme.themeColors.textT,
        marginLeft: '5px'
    },

    seeMore: {
        textDecoration: "underline",
        cursor: "pointer",
        color: theme.themeColors.textT,
        marginTop: "2px",
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

    errorMessage: {
        color: theme.themeColors.formError,
        marginTop: "3px"
    },

    depositButtonBox: {
        width: "100%",
        display: "flex",
        marginTop: "20px",
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
    },

    modalInfo: {
        color: theme.themeColors.textT,
    }
});

class StakeDvdVip extends Component {
    constructor(props) {
        super();
        const account = store.getStore('account')
        this.state = {
            assets: store.getStore('account'),
            account: account,
            onboard: '',
            dvgInfoObj: '',
            amount: '',
            type: 'stake',
            isShowApr: false,
            max: false,
            aprInfo: {
                tvl: 0
            },
            amountError: false,
            errorMessage: '',
            network: 0,
            disableStake: false,
            disableUnstake: false,
        }
        if (account && account.address) {
            dispatcher.dispatch({ type: GET_DVG_INFO })
        }
        dispatcher.dispatch({ type: GET_DVG_APR , content: { type: "xdvd"}});
    }
    componentWillMount() {
        emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
        emitter.on(CHANGE_NETWORK, this.networkChanged);
        emitter.on(GET_DVG_BALANCE_SUCCESS, this.dvgBalance);
        emitter.on(GET_XDVG_BALANCE_SUCCESS, this.xdvgBalance);
        emitter.on(GET_XDVG_APR_SUCCESS, this.getAprInfo);
        emitter.on(WITHDRAW_DVG_RETURNED, this.showHash);
        emitter.on(WITHDRAW_DVG_RETURNED_COMPLETED, this.withdrawReturned);
        emitter.on(DEPOSIT_DVG_RETURNED, this.showHash);
        emitter.on(DEPOSIT_DVG_RETURNED_COMPLETED, this.depositReturned);
        emitter.on(APPROVAL_DVG_RETURNED, this.showHash);
        emitter.on(APPROVAL_DVG_RETURNED_COMPLETED, this.onApprovalCompleted);
        emitter.on(ERROR, this.errorReturned)
    }

    componentWillUnmount() {
        emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
        emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
        emitter.removeListener(GET_DVG_BALANCE_SUCCESS, this.dvgBalance);
        emitter.removeListener(GET_XDVG_BALANCE_SUCCESS, this.xdvgBalance);
        emitter.removeListener(GET_XDVG_APR_SUCCESS, this.getAprInfo);
        emitter.removeListener(WITHDRAW_DVG_RETURNED, this.withdrawReturned);
        emitter.removeListener(DEPOSIT_DVG_RETURNED, this.depositReturned);
        emitter.removeListener(APPROVAL_DVG_RETURNED, this.showHash);
        emitter.removeListener(APPROVAL_DVG_RETURNED_COMPLETED, this.onApprovalCompleted);
        emitter.removeListener(ERROR, this.errorReturned);
    }

    showHash = (txHash) => {
        const snackbarObj = { snackbarMessage: null, snackbarType: "Hash" };
        this.setState(snackbarObj);
        this.setState({ loading: false });
        const that = this;
        setTimeout(() => {
          const snackbarObj = { snackbarMessage: txHash, snackbarType: "Hash" };
          that.setState(snackbarObj);
        });
      };
    

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

    connectionConnected = () => {
        const account = store.getStore('account')
        this.setState({ loading: true, account: account })
        if (account && account.address) {
            console.log(`Connection Connected, dispatching get dvg info`);
            dispatcher.dispatch({ type: GET_DVG_INFO })
        }
    };

    networkChanged = (payload) => {
        console.log(`Network Changed:  ${payload.network}`);
        const account = store.getStore('account')
        if (account && account.address) {
            console.log(`Dispatching get DVG info upon network changed.`)
            dispatcher.dispatch({ type: GET_DVG_INFO })
        }
    }

    dvgBalance = (asset) => {
        this.setState({
            dvgInfoObj: asset,
            loading: false
        })
    }

    xdvgBalance = (asset) => {
        this.setState({
            dvgInfoObj: asset,
            loading: false
        })
    }

    submitStake = (autoCompound =  false) => {
        const { amount, type } = this.state;
        this.setState({ amountError: false, errorMessage: "" })

        if(validateAmountNotExist(amount)) {
            this.setInputErrorState("Invalid amount");
            return;
        }
       
        if(!this.state.amountError && this.state.errorMessage === "") {
            this.setState({ loading: true });

            let action, asset;
            const content = {};

            if(type === "stake") {
                action = DEPOSIT_XDVG;
                asset = this.state.dvgInfoObj[1]; // DVD Token
                content["autoCompound"] = autoCompound;
            } else {
                action = WIDTHDRAW_XDVG;
                asset = this.state.dvgInfoObj[0]; // xDVD Token
            }

            content["amount"] = amount.toString();
            content["asset"] = asset;

            dispatcher.dispatch({
                type: action,
                content
            })
        }
    }

    onChange = (event) => {
        let val = [];
        val[event.target.id] = event.target.value;
        this.verifyInput(val[event.target.id]);
        this.setState({
            amount: event.target.value,
            max: false,
        })
    }

    setInputErrorState = (message) => {
        this.setState({ amountError: true, errorMessage: message });
    }

    verifyInput = (amount) => {
        const { type } = this.state;

        if(!validateDigit(amount) || validateAmountNotExist(amount)) {
            this.setInputErrorState("Invalid amount");
            return;
        }

        let balance = (type === "stake") ? this.state.dvgInfoObj[1].balance : this.state.dvgInfoObj[0].balance;
        balance = (Math.floor(balance * 10000) / 10000).toFixed(4);

        if(validateInputMoreThanBalance(amount, balance)){
            this.setInputErrorState("Exceed available balance.");
            return;
        }

        this.setState({ amountError: false, errorMessage: "" });
    }

    stakeTab = (type) => {
        if (type !== this.state.type) {
            this.setState({
                type: type,
                amount: '',
                max: false,
                amountError: false,
                errorMessage: ""
            })
        }
    }

    depositReturned = (txHash) => {
        const snackbarObj = { snackbarMessage: null, snackbarType: null };
        this.setState(snackbarObj);
        this.setState({ loading: false });
        const that = this;
        setTimeout(() => {
          const snackbarObj = {
            snackbarMessage: txHash,
            snackbarType: "Transaction Success",
          };
          that.setState(snackbarObj);
        });
        dispatcher.dispatch({ type: GET_DVG_INFO });
        this.setState({ loading: false, amount: "" });
    };

    withdrawReturned = (txHash) => {
        const snackbarObj = { snackbarMessage: null, snackbarType: null };
        this.setState(snackbarObj);
        this.setState({ loading: false });
        const that = this;
        setTimeout(() => {
          const snackbarObj = {
            snackbarMessage: txHash,
            snackbarType: "Transaction Success",
          };
          that.setState(snackbarObj);
        });
        dispatcher.dispatch({ type: GET_DVG_INFO });
        this.setState({ loading: false, amount: "" });
    };

    onApprovalCompleted = (txHash) => {
        const snackbarObj = { snackbarMessage: null, snackbarType: null };
        this.setState(snackbarObj);
        this.setState({ loading: false });
        const that = this;
        setTimeout(() => {
          const snackbarObj = {
            snackbarMessage: txHash,
            snackbarType: "Transaction Success",
          };
          that.setState(snackbarObj);
        });
      };

    maxAmount() {
        const { type, dvgInfoObj } = this.state;
        if (dvgInfoObj) {
            const objIndex = type === "stake" ? 1 : 0;
            this.setState({
                amount: (Math.floor(dvgInfoObj[objIndex].balance * 10000) / 10000).toFixed(4),
                max: true,
                amountError: false,
                errorMessage: ""
            })
        }
    }

    getAprInfo = () => {
        const aprInfo = store.getStore('dvgApr');
        console.log("xdvd apr info", aprInfo["xdvd"]);
        this.setState({ aprInfo: aprInfo["xdvd"]});
    }

    goUrl = (url) => {
        let tempwindow = window.open('_blank');
        tempwindow.location = url;
    }

    showAprDetail = () => {
        this.setState({
            isShowApr: !this.state.isShowApr
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

    renderMultiplierInfo = () => {
        const { classes } = this.props;

        const rewards = [
            { range: ">0 - 1000", multiplier: "1.1"},
            { range: ">1000 - 10000", multiplier: "1.2"},
            { range: ">10000 - 50000", multiplier: "1.3"},
            { range: ">50000 - 100000", multiplier: "1.4"},
            { range: ">100000", multiplier: "1.5"},
        ];
        
        const modalContent = (
            <div className={classes.modalInfo}>
                 <Typography variant={"h5"}>
                    Stake more DVD tokens to receive more rewards with DAOmine:
                </Typography>
                <div>
                    <ul>
                        {
                           rewards.map(r => {
                               return <li>{r.range} DVD = {r.multiplier}x</li>
                           }) 
                        }
                    </ul>
                </div>
            </div>
        );

        return <InfoModal content={modalContent} ></InfoModal>
    }

    renderAPRInfo = () => {
        const { classes } = this.props;

        const info = [
            { amount: 1000, day: 30, receive: 33, apr: 40 },
            { amount: 10000, day: 45, receive: 740, apr: 60 },
            { amount: 100000, day: 60 , receive: 13151 , apr: 80 },
        ];

        const modalContent = (
            <div className={classes.modalInfo}>
                <Typography variant={"h5"}>
                    Stake before 23th July 2021 14.00 UTC to receive early bird reward.
                </Typography>

                <Typography variant={"h5"} style={{marginTop: "5px"}}>
                    <a href="https://daoventuresco.medium.com/" 
                        target="_blank" 
                        className={classes.seeMore}>
                            See more here.
                    </a>
                </Typography>

                <ul>
                    {
                        info.map(i => {
                            return <li>
                                Stake {i.amount} DVD for {i.day} days to receive {i.receive} vipDVD ({i.apr}% APR)
                            </li>
                        })
                    }
                </ul>
            </div>
        );
        return <InfoModal content={modalContent} ></InfoModal>
    }

    renderStakeButton = () => {
        const { classes } = this.props;
        const { disableStake, loading } = this.state;

        const stakeButton = (
            <Button disabled={disableStake || (!disableStake && loading)}
                className={classes.depositActionButton}
                onClick={() => this.submitStake()}
            >
                <span>Approve Staking</span>
             </Button>
        );

        const stakeWithAutoCompoundButton = (
            <Button disabled={disableStake || (!disableStake && loading)}
                className={classes.depositActionButton}
                onClick={() => this.submitStake(true)}
            >
                <span>Stake With Auto Compound</span>
            </Button>
        );

        return <React.Fragment>{stakeButton}{stakeWithAutoCompoundButton}</React.Fragment>
    }

    render() {
        const {
            classes
        } = this.props;
        const {
            loading,
            account,
            amount,
            type,
            dvgInfoObj,
            aprInfo,
            amountError,
            max,
            errorMessage,
            disableStake,
            disableUnstake,
        } = this.state;
        
        const dvgBalance = dvgInfoObj && dvgInfoObj[1].balance;
        const xdvgBalance = dvgInfoObj && dvgInfoObj[0].balance;

        const xDVGObj =  dvgInfoObj[0];

        if (!account || !account.address) {
            return <ConnectWallet></ConnectWallet>
        } else {

            return <div className={classes.root}>

                <Grid>
                    <div className={classes.banner}>
                        <div className={classes.bannerLeft}>
                            <div className={classes.text}>Buy DVD on DEX Liquidity Pools</div>
                        </div>
                        <div className={classes.bannerRight}>
                            <div className={classes.toTrade}>
                                <div className={classes.toTradeUniswap} onClick={() => this.goUrl('https://app.uniswap.org/#/swap?outputCurrency=0x77dce26c03a9b833fc2d7c31c22da4f42e9d9582')}>Buy on Uniswap</div>
                                {/* <div className={classes.toTradePancakeswap} onClick={() => this.goUrl('https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x51e00a95748dbd2a3f47bc5c3b3e7b3f0fea666c')}>Buy on Pancakeswap</div> */}
                            </div>
                        </div>

                    </div>
                </Grid>

                <div className={classes.content}>
                    <div className={classes.contentLeft}>
                        <div className={classes.contentLeftTitle}>
                            <div className={classes.titleText}>Stake Pool</div>
                            <div className={classes.titleRate}>
                                1 vipDVD = {aprInfo && aprInfo.xDVDPrice && aprInfo.xDVDPrice.toFixed(2)}DVD
                            </div>
                        </div>
                        <div className={classes.contentCenter}>
                            <div className={classes.contentHeader}>
                                {/** Stake or Unstake Button */}
                                <div className={classes.stakeTab}>
                                    <div className={type === 'stake' ? classes.stake : classes.unStake} onClick={() => this.stakeTab('stake')}>Stake</div>
                                    <div className={type === 'stake' ? classes.unStake : classes.stake} onClick={() => this.stakeTab('unStake')}>Unstake</div>
                                </div>

                                {/** Available Amount in Wallet */}
                                {
                                    (type === "stake")
                                        ? this.renderAvailableAmount(dvgBalance, "DVD")
                                        : this.renderAvailableAmount(xdvgBalance, "vipDVD")
                                }
                            </div>

                            {/** Amount Input Field */}
                            <div className={classes.stakeInput}>
                                <TextField className={classes.actionInput}
                                    id="amount"
                                    value={amount}
                                    onChange={this.onChange}
                                    error={amountError}
                                    disabled={loading}
                                    placeholder="0.00"
                                    variant="outlined" />
                                <div className={classes.depositScaleContainer}>
                                    <Button className={
                                        max
                                            ? classes.depositScaleActive
                                            : classes.depositScale
                                    }
                                        variant="text"
                                        disabled={loading}
                                        onClick={() => {
                                            this.maxAmount(100);
                                        }}>
                                        <Typography variant={"h5"}>Max</Typography>
                                    </Button>
                                </div>
                                {/* <div className={classes.max} onClick={() => this.maxAmount()}>Max</div> */}
                            </div>

                            {/** Render error message */}
                            {
                                errorMessage !== "" && (
                                    <Typography variant={"h5"} className={classes.errorMessage}>
                                        {this.state.errorMessage}
                                    </Typography>
                                )
                            }

                            {/** Button to trigger stake function */}
                            <div className={classes.depositButtonBox}>
                                { (type === "stake") && this.renderStakeButton() }
                                {
                                    (type !== "stake") && 
                                    <Button disabled={disableUnstake || (!disableUnstake && loading)}
                                            className={classes.depositActionButton}
                                            onClick={() => this.submitStake()}
                                    >
                                        <span>Approve Unstaking</span>
                                    </Button>
                                }
                                {/* <Button
                                    disabled={(type === "stake" && disableStake) || 
                                            (type !== "stake" && disableUnstake) ||
                                            (!disableStake && !disableUnstake && loading)}
                                    className={classes.depositActionButton}
                                    onClick={() => this.submitStake()}
                                >
                                    <span>{ (type === "stake") ? "Approve Staking" : "Approve Unstaking"}</span>
                                </Button> */}
                            </div>
                        </div>
                    </div>

                    <div className={classes.contentRight}>
                        <div className={classes.totalApr}>
                             {/** APR */}
                            <div className={classes.aprPercent}>
                                <img className={classes.smallImg} src={require("../../assets/stakeImg/apy-icon@2x.png")} alt="" />
                                <div className={classes.aprText}>
                                    <p className={classes.totalTextTile}>APR
                                    {/* {this.renderAPRInfo()} */}
                                    </p>
                                    <p className={classes.totalTextNum}>
                                        {/* {aprInfo.apr && Number(aprInfo.apr).toFixed(2)} % */}
                                        {/** TODO: Remove this after DAOmine launched */}
                                        {dvgInfoObj[0] ? dvgInfoObj[0].apr.toFixed(2) + '%' : '0.00%'}
                                    </p>
                                </div>
                            </div>
                            {/** Multiplier */}
                            {/* <div className={classes.apr}>
                                <img className={classes.smallImg} src={require("../../assets/stakeImg/multiplier.png")} alt="" />
                                <div className={classes.aprText}>
                                    <p className={classes.totalTextTile}>Multiplier
                                       {this.renderMultiplierInfo()}
                                    </p>
                                    <p className={classes.totalTextNum}>
                                       {xDVGObj && (
                                           <span>1.{Number(xDVGObj.tier)}x</span>
                                       )}
                                    </p>
                                </div>
                            </div> */}
                        </div>
                        
                        <div className={classes.myAssets}>
                            {/** Wallet Balance */}
                            <div className={classes.total}>
                                <img className={classes.smallImg} src={require("../../assets/stakeImg/liquidity-icon@2x.png")} alt="" />
                                <div className={classes.totalText}>
                                    <p className={classes.totalTextTile}>My vipDVD</p>
                                    <p className={classes.totalTextNum}>{xdvgBalance && Number(xdvgBalance).toFixed(2)}</p>
                                    <p className={classes.myAssetsRate}>≈ ${xdvgBalance && aprInfo.xDVDPrice && aprInfo.dvdPrice && Number(xdvgBalance * aprInfo.xDVDPrice * aprInfo.dvdPrice).toFixed(2)}</p>
                                </div>
                            </div>

                            {/** Total Value Locked */}
                            <div className={classes.apr}>
                                <img className={classes.smallImg} src={require("../../assets/stakeImg/lock-icon@2x.png")} alt="" />
                                <div className={classes.totalText}>
                                    <p className={classes.totalTextTile}>Total Value Locked</p>
                                    <p className={classes.totalTextNum}>$ {Number(aprInfo.tvl).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
                {/** Snackbar */}
                {this.state.snackbarMessage && this.renderSnackbar()}
            </div>
        }

    }
}
export default withNamespaces()(withRouter(withStyles(styles)(StakeDvdVip)));