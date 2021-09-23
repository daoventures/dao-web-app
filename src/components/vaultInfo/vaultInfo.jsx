import {
    ALL,
    APPROVE_COMPLETED,
    APPROVE_TRANSACTING,
    CHANGE_NETWORK,
    CONNECTION_CONNECTED,
    CONNECTION_DISCONNECTED,
    DEPOSIT_ALL_CONTRACT_RETURNED,
    DEPOSIT_ALL_CONTRACT_RETURNED_COMPLETED,
    DEPOSIT_CONTRACT_HAPPY_HOUR_RETURNED_COMPLETED,
    DEPOSIT_CONTRACT_RETURNED,
    DEPOSIT_CONTRACT_RETURNED_COMPLETED,
    ERROR,
    GET_STRATEGY_BALANCES_FULL,
    HAPPY_HOUR_RETURN,
    STRATEGY_BALANCES_FULL_RETURNED,
    VAULT_BALANCES_FULL_RETURNED,
    WITHDRAW_BOTH_VAULT_RETURNED,
    WITHDRAW_BOTH_VAULT_RETURNED_COMPLETED,
    WITHDRAW_VAULT_RETURNED,
    WITHDRAW_VAULT_RETURNED_COMPLETED,
} from "../../constants";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControlLabel,
    Grid,
    InputAdornment,
    MenuItem,
    TextField,
    Tooltip,
    Typography,
} from "@material-ui/core";
import React, { Component } from "react";

import Asset from "./asset";
import ConnectBiconomy from "../connectBiconomy";
import ConnectWallet from "../common/connectWallet/connectWallet";
import InfoIcon from "@material-ui/icons/Info";
import Loader from "../loader";
import RiskLevelLabel from "../common/riskLevelLabel/riskLevelLabel";
import RiskLevelTab from "../common/riskLevelTab/riskLevelTab";
import SearchIcon from "@material-ui/icons/Search";
import Snackbar from "../snackbar";
import Store from "../../stores";
import UnlockModal from "../unlock/unlockModal";
import { colors } from "../../theme";
import queryString from "query-string";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Celebrate from '../../assets/img_new/vaults/celebrate.svg';

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

const styles = (theme) => ({
    root: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingLeft: "320px",
        paddingRight: "80px",
        paddingTop: "32px",
        minHeight: "800px",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "0px",
            paddingRight: "0px",
            paddingTop: "40px",
        },
    },
    contentContainer: {
        minWidth: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: "82vw",
        [theme.breakpoints.up('md')] : {
            width: "75vw",
        },
        [theme.breakpoints.up('sm')] : {
             width: "65vw",
        }
        // [theme.breakpoints.up('md')]: {
        //   minWidth: 'calc(100% - '+ drawerWidth + 'px)',
        // }
    },
    investedContainerLoggedOut: {
        paddingTop: "60px",
    },
    investedContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minWidth: "100%",
        marginTop: "20px",
        marginBottom: "40px",
        [theme.breakpoints.up("md")]: {
            minWidth: "700px",
        },
        [theme.breakpoints.down("sm")]: {
            minWidth: "90%",
            margin: "auto",
            marginTop: "40px",
        },
        [theme.breakpoints.down("sm")]: {
            // minWidth: '90%',
            margin: "auto",
            marginTop: "40px",
        },
    },
    balancesContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        padding: "12px 12px",
        position: "relative",
    },
    connectContainer: {
        padding: "12px",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        maxWidth: "450px",
        [theme.breakpoints.up("md")]: {
            width: "450",
        },
    },
    intro: {
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: "32px",
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
            maxWidth: "calc(100vw - 24px)",
            flexWrap: "wrap",
        },
    },
    introCenter: {
        maxWidth: "500px",
        textAlign: "center",
        display: "flex",
        padding: "24px 0px",
    },
    introText: {
        paddingLeft: "20px",
    },
    actionButton: {
        "&:hover": {
            backgroundColor: "#2F80ED",
        },
        padding: "12px",
        backgroundColor: "#2F80ED",
        border: "1px solid #E1E1E1",
        fontWeight: 500,
        [theme.breakpoints.up("md")]: {
            padding: "15px",
        },
    },
    heading: {
        display: "none",
        flex: 1,
        [theme.breakpoints.up("md")]: {
            display: "block",
        },
    },
    headingName: {
        display: "flex",
        alignItems: "center",
        width: "325px",
        [theme.breakpoints.down("sm")]: {
            width: "auto",
            flex: 1,
        },
    },
    headingEarning: {
        display: "block",
    },
    buttonText: {
        fontWeight: "700",
        color: "white",
    },
    assetSummary: {
        display: "flex",
        alignItems: "center",
        flex: 1,
        flexWrap: "wrap",
        background: "#0E0632",
        [theme.breakpoints.up("sm")]: {
            flexWrap: "nowrap",
        },
    },
    assetIcon: {
        display: "flex",
        alignItems: "center",
        verticalAlign: "middle",
        borderRadius: "20px",
        height: "30px",
        width: "30px",
        textAlign: "center",
        cursor: "pointer",
        marginRight: "20px",
        [theme.breakpoints.up("sm")]: {
            height: "32px",
            width: "32px",
            marginRight: "12px",
        },
    },
    addressContainer: {
        display: "flex",
        justifyContent: "space-between",
        overflow: "hidden",
        flex: 1,
        whiteSpace: "nowrap",
        fontSize: "0.83rem",
        textOverflow: "ellipsis",
        cursor: "pointer",
        padding: "28px 30px",
        borderRadius: "50px",
        border: "1px solid " + colors.borderBlue,
        alignItems: "center",
        maxWidth: "450px",
        [theme.breakpoints.up("md")]: {
            width: "100%",
        },
    },
    between: {
        width: "40px",
    },
    expansionPanel: {
        maxWidth: "calc(100vw - 24px)",
        width: "100%",
        border: "none",
        margin: "14px 0 0 0 !important",
        // background: theme.themeColors.modelBack,
        background: theme.themeColors.itemBack,
        borderRadius: "0px",
    },
    versionToggle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    tableHeadContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    investAllContainer: {
        paddingTop: "24px",
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
    },
    disaclaimer: {
        padding: "12px",
        border: "1px solid rgb(174, 174, 174)",
        borderRadius: "0.75rem",
        marginBottom: "24px",
        lineHeight: "1.2",
        background: colors.white,
    },
    fees: {
        paddingRight: "75px",
        padding: "12px",
        lineHeight: "1.2",
    },
    walletAddress: {
        padding: "0px 12px",
    },
    walletTitle: {
        flex: 1,
        color: colors.darkGray,
    },
    grey: {
        color: colors.darkGray,
    },
    filters: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            padding: "0px 12px",
        },
    },
    searchField: {
        flex: 1,
        background: colors.white,
        borderRadius: "50px",
    },
    checkbox: {
        flex: 1,
        margin: "0px !important",
    },
    flexy: {
        display: "flex",
        alignItems: "center",
    },
    on: {
        color: colors.darkGray,
        padding: "0px 6px",
    },
    positive: {
        color: colors.compoundGreen,
    },
    basedOnContainer: {
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    infoIcon: {
        fontSize: "1em",
        marginRight: "6px",
    },
    removePadding: {
        padding: "0px",
        width: "100%",
        // maxWidth: '900px'
    },
    welcomeText: {
        fontWeight: "bold",
        fontSize: "36px",
        lineHeight: "36px",
        color: theme.themeColors.textT,
        textAlign: "center",
        [theme.breakpoints.down("md")]: {
            fontSize: "24px",
            padding: "0px 46px",
        },
    },
    warningMessage: {
        fontSize: "1rem",
        lineHeight: "19px",
        textAlign: "center",
        color: "#18A0FB",
        position: "absolute",
        bottom: "5%",
        left: "0",
        right: "0",
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "90%",
        },
    },
    buttonGroup: {
        background: "#18A0FB",
        borderRadius: "48px",
        color: "#ffffff",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        width: "50%",
        margin: "auto",
        cursor: "pointer",
        [theme.breakpoints.down("sm")]: {
            width: "80%",
        },
    },
    buttonIconContainer: {
        width: "60px",
        background: "#50B9FF",
        borderRadius: "48px 0px 0px 48px",
        textAlign: "center",
        padding: "0.5rem 1.5rem",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
    },
    connectButtonIcon: {
        width: "60%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    buttonTextContainer: {
        padding: "1rem 2rem",
        textAlign: "center",
    },
    buttonContainer: {
        textAlign: "center",
        marginTop: "5rem",
        [theme.breakpoints.down("sm")]: {
            marginTop: "3rem",
        },
    },
    descriptionContainer: {
        borderColor: theme.themeColors.border,
        borderWidth: "1px",
        borderStyle: "solid",
        marginTop: "8rem",
        // borderRadius: '10px',
        padding: "1.5rem 3.5rem",
        textAlign: "center",
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            margin: "auto",
            marginTop: "4rem",
        },
    },
    shieldContainer: {
        background: "rgba(24,160,251, 0.1)",
        borderRadius: "10px",
        width: "36px",
        margin: "auto",
        padding: "0.6rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    subtitle: {
        fontSize: "22px",
        color: theme.themeColors.textT,
        lineHeight: "22px",
        marginTop: "13px",
        [theme.breakpoints.down("md")]: {
            fontSize: "16px",
        },
    },
    securityDesc: {
        color: theme.themeColors.textP,
        fontSize: "20px",
        lineHeight: "20px",
        marginTop: "20px",
        [theme.breakpoints.down("md")]: {
            fontSize: "14px",
        },
    },
    titleDesc: {
        textAlign: "center",
        color: theme.themeColors.textP,
        fontSize: "20px",
        marginTop: "20px",
        [theme.breakpoints.down("md")]: {
            // padding: '1rem 2rem',
            fontSize: "14px",
            marginTop: "16px",
            padding: "0px 26px",
        },
    },
    alertDesc: {
        textAlign: "center",
        width: "65%",
        margin: "auto",
        whiteSpace: "normal",
        fontWeight: "bold",
        color: theme.themeColors.textP,
        fontSize: "20px",
        marginTop: "20px",
        [theme.breakpoints.down("sm")]: {
            width: "85%",
            fontSize: "14px",
            marginTop: "16px",
        },
    },
    strategyContainer: {
        width: "100%",
        position: "relative",
        // borderColor: theme.themeColors.blockBorder,
        // borderWidth: "1px",
        // borderStyle: "solid",
        boxShadow: "-2px 2px 40px 0px rgba(0, 0, 0, 0.05)",
        // borderRadius: '10px',
        // padding: '1rem',
        marginBottom: "20px",
        background: theme.themeColors.itemBack,
        [theme.breakpoints.down("sm")]: {
            width: "96%",
            margin: "0 auto",
            marginBottom: "20px",
        },
    },
    riskLowLabel: {
        background: "#15c73e",
        borderBottomLeftRadius: "14px",
        color: "#ffffff",
        padding: "5px 10px",
        textAlign: "center",
        width: "5rem",
        marginLeft: "auto",
        position: "absolute",
        right: "0px",
        top: "0px",
    },
    riskMediumLabel: {
        background: "#C77815",
        // borderRadius: '5px',
        color: "#ffffff",
        padding: "5px 10px",
        textAlign: "center",
        width: "7rem",
        marginLeft: "auto",
        position: "absolute",
        right: "0px",
        top: "0px",
        borderBottomLeftRadius: "14px",
    },
    riskExpertLabel: {
        background: "#C715A7",
        // borderRadius: '5px',
        color: "#ffffff",
        padding: "5px 10px",
        textAlign: "center",
        width: "7rem",
        marginLeft: "auto",
        position: "absolute",
        right: "0px",
        top: "0px",
        borderBottomLeftRadius: "15px",
    },
    riskDegenLabel: {
        background: "#DC0B0C",
        // borderRadius: '5px',
        color: "#ffffff",
        padding: "5px 10px",
        textAlign: "center",
        width: "7rem",
        marginLeft: "auto",
        position: "absolute",
        right: "0px",
        top: "0px",
        borderBottomLeftRadius: "15px",
    },
    assetName: {
        color: "#222222",
        fontSize: "1rem",
    },
    assetLabel: {
        color: "#888888",
        fontSize: "1rem",
        fontWeight: 600,
    },
    assetValue: {
        color: "#222222",
        fontSize: "1rem",
        fontWeight: 600,
    },
    gridItemColumn: {
        // display: 'flex',
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            marginBottom: "16px",
            alignItems: "stretch",
        },
    },
    roundIconClass: {
        background: "rgba(24, 160, 251, 0.1)",
        color: "#A7c0d6",
        borderRadius: "50%",
    },
    showDesktop: {
        display: "block",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    showMobile: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: "block",
        },
    },
    connectWalletContainer: {
        minWidth: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        [theme.breakpoints.up("md")]: {
            // minWidth: 'calc(100% - '+ drawerWidth + 'px)',
        },
        [theme.breakpoints.down("md")]: {
            paddingTop: "2rem",
        },
    },

    // 主题块儿样式调整
    warnIcon: {
        width: "20px",
        height: "20px",
        fill: theme.themeColors.iconGray,
        marginLeft: "8px",
    },
    itemTop: {
        height: "48px",
        background: theme.themeColors.menuSel,
        maxWidth: "calc(100vw - 24px)"
    },
    itemTitle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        fontSize: "18px",
        color: theme.themeColors.textT,
        background: "#0E0632",
        padding: "24px 0 0 24px",
        [theme.breakpoints.down("xs")]: {
            padding: "5px 10px",
        },
        zIndex: 0,
    },
    itemTitleText: {
        fontSize: "18px",
        [theme.breakpoints.down("md")]: {
            fontSize: "14px",
        },
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "bold",
        lineHeight: "21px"
    },
    itemTitleTextInfo: {
        fontSize: "14px",
        [theme.breakpoints.down("md")]: {
            fontSize: "14px",
        },
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "17px"
    },
    accordionsummary: {
        height: "100px",
        padding: "0px 26px",
        background: "#0E0632",
        margin: 0,
        [theme.breakpoints.down("md")]: {
            padding: "0px 10px",
        },
    },
    assetLabel1: {
        //display: 'block',
        display: "inline-block",
        fontSize: "18px",
        wordWrap: "break-word",
        color: theme.themeColors.textT,
        [theme.breakpoints.down("lg")]: {
            fontSize: "14px",
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "12px",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "10px",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "6px",
        },
    },
    assetLabel2: {
        display: "block",
        fontSize: "14px",
        color: theme.themeColors.textP,
        [theme.breakpoints.down("lg")]: {
            fontSize: "12px",
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "10px",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "8px",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "7px",
        },
    },
    assetIconImg: {
        height: "50px",
        [theme.breakpoints.down("lg")]: {
            height: "40px",
        },
        [theme.breakpoints.down("md")]: {
            height: "30px",
        },
        [theme.breakpoints.down("sm")]: {
            height: "25px",
        },
        [theme.breakpoints.down("xs")]: {
            height: "20px",
        },
    },
    dropDownIcon: {
        width: "30px",
        height: "30px",
        fill: theme.themeColors.textP,
    },
    assetLabelTextRight: {
        display: "block",
        fontSize: "18px",
        paddingLeft: "30px",
        color: theme.themeColors.textT,
        [theme.breakpoints.down("md")]: {
            fontSize: "14px",
        },
    },
    assetLabelTextRight1: {
        display: "block",
        fontSize: "14px",
        paddingLeft: "30px",
        color: theme.themeColors.textP,
        [theme.breakpoints.down("md")]: {
            fontSize: "12px",
        },
    },
    Tabs: {
        backgroundColor: "#292750"
    },
    TabText: {
        color: "#FFFFFF"
    },
    happyHourLabel: {
        right: "8rem",
        top: "0px",
        width: "120px",
        height: "32px",
        position: "absolute",
        background: "rgba(255, 191, 65, 0.2)",
        borderRadius: "0px 0px 4px 4px"
    },
    happyHourText: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "15px",
        lineHeight: "2.5",
        color: "#FFBF41",
    },
    happyHourSVG: {
        height: "17px",
        padding: "2px 0 0 5px"
    }
});

const networkObj = {
    1: "ethereum",
    4: "ethereum",
    56: "Binance",
    42: "ethereum",
    80001: "polygon",
    137: "polygon"
}

class Vault extends Component {
    constructor(props) {
        super();

        const account = store.getStore("account");
        const basedOn = localStorage.getItem("yearn.finance-dashboard-basedon");

        this.state = {
            assets: store.getStore("vaultAssets"),
            usdPrices: store.getStore("usdPrices"),
            networkId: store.getStore("networkId"),
            happyHour: store.getStore("happyHour"),
            account: account,
            address: account.address
                ? account.address.substring(0, 6) +
                "..." +
                account.address.substring(
                    account.address.length - 4,
                    account.address.length
                )
                : null,
            snackbarType: null,
            snackbarMessage: null,
            search: "",
            searchError: false,
            hideZero:
                localStorage.getItem("yearn.finance-hideZero") === "1" ? true : false,
            basedOn: basedOn ? parseInt(basedOn > 3 ? 3 : basedOn) : 3,
            loading: true,
            expanded: "",
            modalOpen: false,
            currentTab: ALL,
            disableSetVaultFromURL: false,
        };

        if (account && account.address) {
            dispatcher.dispatch({
                type: GET_STRATEGY_BALANCES_FULL,
                content: { interval: "30d" },
            });
        }

        // if (!this.state.happyHour) {
        //   dispatcher.dispatch({
        //     type: GET_STRATEGY_BALANCES_FULL,
        //     content: { interval: "30d" },
        //   });
        // }
    }

    componentWillMount() {
        emitter.on(DEPOSIT_CONTRACT_RETURNED, this.showHash);
        emitter.on(DEPOSIT_CONTRACT_RETURNED_COMPLETED, this.onDepositCompleted);
        emitter.on(WITHDRAW_VAULT_RETURNED, this.showHash);
        emitter.on(WITHDRAW_VAULT_RETURNED_COMPLETED, this.onWithdrawalCompleted);
        emitter.on(DEPOSIT_ALL_CONTRACT_RETURNED, this.showHash);
        emitter.on(
            DEPOSIT_ALL_CONTRACT_RETURNED_COMPLETED,
            this.onDepositCompleted
        );
        emitter.on(WITHDRAW_BOTH_VAULT_RETURNED, this.showHash);
        emitter.on(
            WITHDRAW_BOTH_VAULT_RETURNED_COMPLETED,
            this.onWithdrawalCompleted
        );
        emitter.on(APPROVE_TRANSACTING, this.showHashApproval);
        emitter.on(APPROVE_COMPLETED, this.onApprovalCompleted);
        emitter.on(ERROR, this.errorReturned);
        emitter.on(STRATEGY_BALANCES_FULL_RETURNED, this.balancesReturned);
        emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
        emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
        emitter.on(CHANGE_NETWORK, this.networkChanged);
        emitter.on(VAULT_BALANCES_FULL_RETURNED, this.networkChanged);
        emitter.on(HAPPY_HOUR_RETURN, this.handleHappyHour);
        emitter.on(
            DEPOSIT_CONTRACT_HAPPY_HOUR_RETURNED_COMPLETED,
            this.handleHappyHourCompleted
        );
    }

    componentWillUnmount() {
        emitter.removeListener(DEPOSIT_CONTRACT_RETURNED, this.showHash);
        emitter.removeListener(DEPOSIT_CONTRACT_RETURNED_COMPLETED, this.showHash);
        emitter.removeListener(WITHDRAW_VAULT_RETURNED, this.showHash);
        emitter.removeListener(WITHDRAW_VAULT_RETURNED_COMPLETED, this.showHash);
        emitter.removeListener(DEPOSIT_ALL_CONTRACT_RETURNED, this.showHash);
        emitter.removeListener(
            DEPOSIT_ALL_CONTRACT_RETURNED_COMPLETED,
            this.onDepositCompleted
        );
        emitter.removeListener(WITHDRAW_BOTH_VAULT_RETURNED, this.showHash);
        emitter.removeListener(
            WITHDRAW_BOTH_VAULT_RETURNED_COMPLETED,
            this.showHash
        );
        emitter.removeListener(ERROR, this.errorReturned);
        emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
        emitter.removeListener(
            CONNECTION_DISCONNECTED,
            this.connectionDisconnected
        );
        emitter.removeListener(
            STRATEGY_BALANCES_FULL_RETURNED,
            this.balancesReturned
        );
        emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
        emitter.removeListener(VAULT_BALANCES_FULL_RETURNED, this.networkChanged);
    }

    handleHappyHour = (payload) => {
        this.setState({
            happyHour: payload.happyHour,
            happyHourThreshold: payload.happyHourThreshold,
        });
    };

    networkChanged = (obj) => {
        const account = store.getStore("account");
        const basedOn = localStorage.getItem("yearn.finance-dashboard-basedon");
        let allowedNetworkIds = [1,42,80001,137];
        const networkId = obj.network;
        if(!allowedNetworkIds.includes(networkId)) {
            alert('Please switch your wallet Network to Ethereum or Polygon')
        }
        if (account && account.address) {
            dispatcher.dispatch({
                type: GET_STRATEGY_BALANCES_FULL,
                content: { interval: "30d" },
            });
        }

        this.setState({
            networkId: networkId,
        });
    };

    balancesReturned = (returnedAssets) => {
        this.setState({assets: returnedAssets});
        // dispatcher.dispatch({
        //     type: GET_STRATEGY_BALANCES_FULL,
        //     content: { interval: "30d" },
        // });
    };

    connectionConnected = () => {
        const { t } = this.props;
        const account = store.getStore("account");

        this.setState({
            loading: true,
            account: account,
            address: account.address
                ? account.address.substring(0, 6) +
                "..." +
                account.address.substring(
                    account.address.length - 4,
                    account.address.length
                )
                : null,
        });

        dispatcher.dispatch({
            type: GET_STRATEGY_BALANCES_FULL,
            content: { interval: "30d" },
        });

        const that = this;
        setTimeout(() => {
            const snackbarObj = {
                snackbarMessage: t("Unlock.WalletConnected"),
                snackbarType: "Info",
            };
            that.setState(snackbarObj);
        });
    };

    connectionDisconnected = () => {
        this.setState({
            account: null,
            address: null,
        });
    };

    errorReturned = (error) => {
        const snackbarObj = { snackbarMessage: null, snackbarType: null };
        this.setState(snackbarObj);
        this.setState({ loading: false });
        const that = this;

        const errorMessage = typeof error === "string" ? error : error.message;

        setTimeout(() => {
            const snackbarObj = {
                snackbarMessage: errorMessage,
                snackbarType: "Error",
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

    onDepositCompleted = (txHash) => {
        dispatcher.dispatch({
            type: GET_STRATEGY_BALANCES_FULL,
            content: { interval: "30d" },
        });

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

    onWithdrawalCompleted = (txHash) => {
        dispatcher.dispatch({
            type: GET_STRATEGY_BALANCES_FULL,
            content: { interval: "30d" },
        });
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

    handleHappyHourCompleted = (txHash) => {
        dispatcher.dispatch({
            type: GET_STRATEGY_BALANCES_FULL,
            content: { interval: "30d" },
        });
        const snackbarObj = { snackbarMessage: null, snackbarType: null };
        this.setState(snackbarObj);
        this.setState({ loading: false });
        const that = this;
        setTimeout(() => {
            const snackbarObj = {
                snackbarMessage: txHash,
                snackbarType: "Happy Hour Success",
            };
            that.setState(snackbarObj);
        });
    };

    showHash = (txHash) => {
        const snackbarObj = { snackbarMessage: null, snackbarType: null };
        this.setState(snackbarObj);
        this.setState({ loading: false });
        const that = this;
        setTimeout(() => {
            const snackbarObj = { snackbarMessage: txHash, snackbarType: "Hash" };
            that.setState(snackbarObj);
        });
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

    isUsdVault = (asset) => {
        return asset.strategyType === "citadel" ? true : false;
    };

    isLogoVault = (asset) => {
        return asset.strategyType === "citadel" ||
        asset.strategyType === "elon" ||
        asset.strategyType === "cuban" ||
        asset.strategyType === "daoFaang" ||
        asset.strategyType === "moneyPrinter" ||
        asset.strategyType === "metaverse"
            ? true
            : false;
    };

    render() {
        const { classes } = this.props;
        const { loading, account, snackbarMessage, modalOpen } = this.state;

        if (!account || !account.address) {
            return <ConnectWallet></ConnectWallet>;
        }

        return (
            <div className={classes.root}>
                <div className={classes.contentContainer}>
                    <div className={classes.investedContainer}>
                        {/* <Typography variant={'h5'} className={ classes.disaclaimer }>This project is in beta. Use at your own risk.</Typography>
            { this.renderFilters() }
            { this.renderBasedOn() } */}
                        {/* { this.renderChart() } */}
                        <RiskLevelTab selectedRiskCallback={this.selectTab}></RiskLevelTab>
                        <ConnectBiconomy></ConnectBiconomy>

                        {this.renderAssetBlocks()}
                    </div>
                </div>
                {loading && <Loader />}
                {snackbarMessage && this.renderSnackbar()}
            </div>
        );
    }

    selectTab = (current) => {
        this.setState({ currentTab: current });
    };

    onSearchChanged = (event) => {
        let val = [];
        val[event.target.id] = event.target.value;
        this.setState(val);
    };

    onChange = (event) => {
        let val = [];
        val[event.target.id] = event.target.checked;
        this.setState(val);
    };

    // Yearly Growth
    renderYearlyGrowth = (asset, showMobile) => {
        const { classes } = this.props;

        return showMobile ? (
            <React.Fragment>
                <Typography variant={"h5"} className={classes.assetLabel2}>
                    7D PNL
                </Typography>
                <Typography variant={"h3"} noWrap className={classes.assetLabel1}>
                    {/* {this.isUsdVault(asset) && (
            <Typography variant={"caption"}>est.&nbsp;</Typography>
          )} */}
                    {asset.strategyType === "citadel" || asset.strategyType === "daoFaang"  ||
                    asset.strategyType === "elon" ||
                    asset.strategyType === "cuban" ||
                    asset.strategyType === "moneyPrinter" || 
                    asset.strategyType === "metaverse"
                        ? this._get7dPNL(asset)
                        : this._getAPY(asset)}
                </Typography>
                q
            </React.Fragment>
        ) : (
            <React.Fragment>
                {/** Old version */}
                {/* <Typography variant={"h5"} className={classes.assetLabel1}>
          {this.isUsdVault(asset) && (
            <Typography variant={"caption"}>est.&nbsp;</Typography>
          )}
          {this._getAPY(asset)}{" "}
        </Typography>
        <Typography variant={"h5"} className={classes.assetLabel2}>
          {this.isUsdVault(asset) ? "YTD Performance" : "Yearly Growth"}
        </Typography> */}
                <div style={{ display: "flex" }}>
                    <div>
                        {/* <Typography variant={"h5"} className={classes.assetLabel2}>
              {this.isLogoVault(asset)
                ? asset.strategyType === "citadel" ||
                  asset.strategyType === "daoFaang"
                  ? "7d PnL"
                  : "YTD Performance"
                : "Yearly Growth"}
            </Typography> */}

                        <Typography variant={"h5"} className={classes.assetLabel2}>
                            P30D PNL
                        </Typography>
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <div>
                        <Typography variant={"h5"} className={classes.assetLabel1}>
                            {asset.strategyType === "citadel" ||
                            asset.strategyType === "daoFaang"  ||
                            asset.strategyType === "elon" ||
                            asset.strategyType === "cuban" ||
                            asset.strategyType === "moneyPrinter" ||
                            asset.strategyType === "metaverse" ||
                            asset.strategyType === "citadelv2" || 
                            asset.strategyType === "daoStonks"
                                ? this._getPnl(asset)
                                : this._getAPY(asset)}{" "}
                        </Typography>
                    </div>

                    {Number(asset.daomineApy) > parseInt(0) && (
                        <React.Fragment>
                            <div style={{ display: "flex", marginLeft: "5px" }}>
                                <div>
                                    <Typography variant={"h5"} className={classes.assetLabel1}>
                                        {" + "}
                                        {Number(asset.daomineApy)
                                            .toFixed(2)
                                            .toString()
                                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                                        {"%"}
                                    </Typography>
                                </div>
                                <div>
                                    <img
                                        alt="dvg"
                                        src={require("../../assets/stakeImg/liquidity-icon@2x.png")}
                                        style={{ height: "20px", width: "20px", marginLeft: "2px" }}
                                    />
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </div>

            </React.Fragment>
        );
    };

    // Available to deposit
    renderAvailableToDeposit = (asset, showMobile) => {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Typography
                    variant={showMobile ? "h5" : "h5"}
                    className={classes.assetLabel2}
                >
                    Available to deposit
                </Typography>
                <Typography
                    variant={showMobile ? "h3" : "h5"}
                    className={classes.assetLabel1}
                >
                    <div>
                        {(this.isLogoVault(asset)
                            ? asset.sumBalances
                                ? asset.sumBalances.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })
                                : "0.00"
                            : asset.balance
                                ? asset.balance.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })
                                : "0.00") +
                        " " +
                        (this.isLogoVault(asset) ? "USD" : asset.symbol)}
                    </div>
                </Typography>
            </React.Fragment>
        );
    };

    renderStakedBlocked = (asset, showMobile) => {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Typography
                    variant={showMobile ? "h5" : "h5"}
                    className={classes.assetLabel2}
                >
                    STAKED
                </Typography>
                <Typography
                    variant={showMobile ? "h3" : "h5"}
                    className={classes.assetLabel1}
                >
                    <div>
                        {
                            (asset.depositedSharesInUSD) 
                                ?  (asset.strategyType === "metaverse" || asset.strategyType === "citadelv2" || asset.strategyType === "daoStonks")
                                    ? `$${(Number(asset.depositedSharesInUSD) + Number(asset.pendingBalance)).toFixed(4)}`
                                    : `$${asset.depositedSharesInUSD.toFixed(4)}`
                                :  (asset.strategyType === "metaverse" || asset.strategyType === "citadelv2")
                                    ? `$${asset.pendingBalance ? (Number(asset.pendingBalance)).toFixed(4) : 0}` 
                                    : `$0`
                        }
                        {/* {asset.depositedSharesInUSD? asset.depositedSharesInUSD.toFixed(4): 0} USD */}
                    </div>
                </Typography>
            </React.Fragment>
        );
    }

    renderAvailableForDeposit = (asset, showMobile) => {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Typography
                    variant={showMobile ? "h5" : "h5"}
                    className={classes.assetLabel2}
                >
                    AVAILABLE FOR DEPOSIT
                </Typography>
                <Typography
                    variant={showMobile ? "h3" : "h5"}
                    className={classes.assetLabel1}
                >
                    <div>
                        ${asset.sumBalances? asset.sumBalances.toFixed(4).toLocaleString(): 0}
                    </div>
                </Typography>
            </React.Fragment>
        );
    }

    renderAssetBlocks = () => {
        const {
            assets,
            expanded,
            search,
            hideZero,
            basedOn,
            currentTab,
            disableSetVaultFromURL,
        } = this.state;
        const { classes, location } = this.props;
        const width = window.innerWidth;

        if (!disableSetVaultFromURL && location && location.hash) {
            const param = queryString.parse(this.props.location.hash);

            if (expanded !== param.id) {
                this.setState({
                    expanded: param.id,
                    disableSetVaultFromURL: true,
                });
            }
        }
        return assets
            .filter((asset) => {
                return currentTab === ALL || asset.group === currentTab ? true : false;
            })
            .map((asset, index) => {
                return (
                    <div key={index} className={classes.strategyContainer}>
                        <Grid container className={classes.itemTop}>
                            <Grid item sm={12} xs={12} className={classes.itemTitle}>
                                <Typography className={classes.itemTitleText} variant="h4">
                                    {asset.strategy}
                                </Typography>
                                <Typography className={classes.itemTitleTextInfo} variant="h4">
                                    {asset.strategyInfo}
                                </Typography>
                                {/*<a*/}
                                {/*    href={asset.infoLink}*/}
                                {/*    target="_blank"*/}
                                {/*    style={{ display: "flex" }}*/}
                                {/*>*/}
                                {/*    <svg aria-hidden="true" className={classes.warnIcon}>*/}
                                {/*        <use xlinkHref="#iconinformation-day"></use>*/}
                                {/*    </svg>*/}
                                {/*</a>*/}
                                {/*{asset.isPopularItem || this.state.happyHour*/}
                                {/*    ? this.state.happyHour && asset.happyHourEnabled === true*/}
                                {/*        ? this.renderHappyHourIcon(asset)*/}
                                {/*        : this.renderPopularIcon(asset)*/}
                                {/*    : null}*/}
                            </Grid>
                            {this.state.happyHour && asset.happyHourEnabled && <div className={classes.happyHourLabel}><span className={classes.happyHourText}><img className={classes.happyHourSVG} src={Celebrate} alt=""/> Happy Hour</span></div>
                            }
                            <RiskLevelLabel risk={asset.risk}/>
                        </Grid>
                        <Accordion
                            className={classes.expansionPanel}
                            square
                            key={asset.id + "_expand"}
                            expanded={expanded === asset.vaultSymbol}
                            onChange={() => {
                                this.handleChange(asset.vaultSymbol, asset);
                            }}
                        >
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon className={classes.roundIconClass} />}
                                expandIcon={
                                    <svg aria-hidden="true" className={classes.dropDownIcon}>
                                        <use xlinkHref="#iconicon_list_dropDown"></use>
                                    </svg>
                                }
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                className={classes.accordionsummary}
                            >
                                <div className={classes.assetSummary}>
                                    <Grid container>
                                        {/** Asset Logo */}
                                        <Grid item sm={1} xs={1} className={classes.gridItemColumn}>
                                            <div className={classes.assetIcon}>
                                                <img
                                                    alt=""
                                                    src={require("../../assets/img_new/vaults/" +
                                                        asset.id + '.' + asset.logoFormat)}
                                                    // height={ '50px' }
                                                    className={classes.assetIconImg}
                                                    style={
                                                        asset.disabled ? { filter: "grayscale(100%)" } : {}
                                                    }
                                                />
                                            </div>
                                        </Grid>

                                        {/** Asset name */}
                                        <Grid item sm={2} xs={2} className={classes.gridItemColumn}>
                                            <Typography
                                                variant={"h5"}
                                                className={classes.assetLabel2}
                                            >
                                                ACCEPTED COINS
                                            </Typography>
                                            <Typography
                                                variant={"h5"}
                                                className={classes.assetLabel1}
                                            >
                                                {asset.name}
                                            </Typography>

                                        </Grid>

                                        {/** Total Value Locked */}
                                        {/* <Grid item sm={2} xs={6} className={classes.gridItemColumn}>
                      <Typography variant={'h5'} className={classes.assetLabel1, classes.assetLabelTextRight}>$ {asset.tvl ? Number(asset.tvl).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) : '0.00'}</Typography>
                      <Typography variant={'h5'} className={classes.assetLabel2, classes.assetLabelTextRight1}>Total Value Locked</Typography>
                    </Grid> */}

                                        <Grid item sm={2} xs={2} className={classes.gridItemColumn}>
                                            <div>
                                                {this.renderStakedBlocked(asset, false)}
                                            </div>
                                        </Grid>
                                        {/** Underlying Token Balance , Available to deposit */}
                                        {/*<Grid item sm={3} xs={6} className={classes.gridItemColumn}>*/}
                                        {/*    <div className={classes.showDesktop}>*/}
                                        {/*        {this.renderStackedBlocked(asset, false)}*/}
                                        {/*    </div>*/}

                                        {/*    <div className={classes.showMobile}>*/}
                                        {/*        {this.renderYearlyGrowth(asset, false)}*/}
                                        {/*    </div>*/}

                                        {/*    <div className={classes.showDesktop}>*/}
                                        {/*        {this.renderYearlyGrowth(asset, false)}*/}
                                        {/*    </div>*/}
                                        {/*</Grid>*/}

                                        {/** Yearly Growth */}
                                        <Grid item sm={2} xs={2} className={classes.gridItemColumn}>
                                            {!["LINK"].includes(asset.id) && asset.vaultBalance > 0 && (
                                                <div>
                                                    {/** Default className: showDesktop */}
                                                    {/* <div className={classes.showDesktop}>
                            {this.renderYearlyGrowth(asset, false)}
                          </div>
                          <div className={classes.showMobile}>
                            {this.renderYearlyGrowth(asset, true)}
                          </div> */}
                                                    {this.renderYearlyGrowth(asset, false)}
                                                </div>
                                            )}
                                            {!["LINK"].includes(asset.id) &&
                                            asset.vaultBalance === 0 && (
                                                <div>
                                                    {/* <div className={classes.showDesktop}>
                              {this.renderYearlyGrowth(asset, false)}
                            </div> */}
                                                    {/* <div className={classes.showMobile}>
                              {this.renderYearlyGrowth(asset, true)}
                            </div> */}
                                                    {this.renderYearlyGrowth(asset, false)}
                                                </div>
                                            )}
                                        </Grid>
                                        <Grid item sm={5} md={5} xs={5} className={classes.gridItemColumn}>
                                            <div >
                                                {this.renderAvailableForDeposit(asset, false)}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className={classes.removePadding}>
                                <Asset
                                    key={index}
                                    happyHour={this.state.happyHour}
                                    happyHourThreshold={this.state.happyHourThreshold}
                                    asset={asset}
                                    startLoading={this.startLoading}
                                    basedOn={basedOn}
                                    expanded={this.state.expanded}
                                    // refreshVault={this.refreshVault}
                                />
                            </AccordionDetails>
                        </Accordion>
                    </div>
                );
            });
    };

    renderFilters = () => {
        const { loading, search, searchError, hideZero } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.filters}>
                <FormControlLabel
                    className={classes.checkbox}
                    control={
                        <Checkbox
                            checked={hideZero}
                            onChange={this.handleChecked}
                            color="primary"
                        />
                    }
                    label="Hide zero balances"
                />
                <div className={classes.between}>
                    <Tooltip
                        title={
                            <React.Fragment>
                                <Typography variant={"h5"} className={classes.fees}>
                                    There is a 0.5% withdrawal fee on all vaults.
                                    <br />
                                    <br />
                                    There is a 5% performance fee on subsidized gas.
                                </Typography>
                            </React.Fragment>
                        }
                        arrow
                    >
                        <InfoIcon />
                    </Tooltip>
                </div>
                <TextField
                    fullWidth
                    disabled={loading}
                    className={classes.searchField}
                    id={"search"}
                    value={search}
                    error={searchError}
                    onChange={this.onSearchChanged}
                    placeholder="ETH, CRV, ..."
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="end" className={classes.inputAdornment}>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        );
    };

    renderRiskLabel = (asset) => {
        return <RiskLevelLabel risk={asset.risk}></RiskLevelLabel>;
    };

    renderPopularIcon = (asset) => {
        return (
            asset.isPopularItem && (
                <div style={{ display: "flex" }}>
                    <img
                        alt="icon-popular"
                        src={require("../../assets/img_new/icon_popular.svg")}
                        style={{ marginLeft: "10px" }}
                    />
                </div>
            )
        );
    };

    renderHappyHourIcon = (asset) => {
        return (
            <div>
                <img
                    alt="icon-popular"
                    src={require("../../assets/img_new/icon_happyhour.svg")}
                    style={{ marginLeft: "10px", marginTop: "8px" }}
                />
            </div>
        );
    };

    handleChecked = (event) => {
        this.setState({ hideZero: event.target.checked });
        localStorage.setItem(
            "yearn.finance-hideZero",
            event.target.checked ? "1" : "0"
        );
    };

    handleChange = (id, asset) => {
        this.setState({ expanded: this.state.expanded === id ? null : id });
    };

    startLoading = () => {
        this.setState({ loading: true });
    };

    renderSnackbar = () => {
        var { snackbarType, snackbarMessage, networkId } = this.state;
        return (
            <Snackbar
                type={snackbarType}
                message={snackbarMessage}
                networkId={networkId}
                open={true}
            />
        );
    };

    _getAPY = (asset) => {
        const { basedOn } = this.state;

        // To calculate APY (Vault + Earn divide by 2 : Estimated)
        // Compound APY is using compoundApy
        if (asset && asset.stats) {
            if (asset.strategyType === "compound") {
                if (asset.stats.compoundApy) {
                    return (asset.stats.compoundApy / 1).toFixed(2) + "%";
                } else {
                    return "0.00%";
                }
            } else if (
                asset.strategyType === "yearn" &&
                JSON.stringify(asset.stats !== "Object")
            ) {
                switch (basedOn) {
                    case 1:
                        return this.calculateYearnAPY(
                            parseFloat(asset.earnApr),
                            asset.stats.apyOneWeekSample
                        );
                    case 2:
                        return this.calculateYearnAPY(
                            parseFloat(asset.earnApr),
                            asset.stats.apyOneMonthSample
                        );
                    case 3:
                        return this.calculateYearnAPY(
                            parseFloat(asset.earnApr),
                            asset.stats.apyInceptionSample
                        );
                    default:
                        return this.calculateYearnAPY(parseFloat(asset.earnApr), asset.apy);
                }
            } else if (asset.strategyType === "citadel") {
                // if (asset.stats.citadelApy) {
                //   return (asset.stats.citadelApy / 1).toFixed(2) + '%';
                // } else {
                //   return "0.00%";
                // }
                return "55% - 75%";
            } else if (asset.strategyType === "elon") {
                if (asset.stats.elonApy) {
                    return (asset.stats.elonApy / 1).toFixed(2) + "%";
                } else {
                    return "0.00%";
                }
            } else if (asset.strategyType === "cuban") {
                if (asset.stats.cubanApy) {
                    return (asset.stats.cubanApy / 1).toFixed(2) + "%";
                } else {
                    return "0.00%";
                }
            } else if (asset.strategyType === "daoFaang") {
                return asset.stats.faangApy
                    ? (asset.stats.faangApy / 1).toFixed(2) + "%"
                    : "0.00%";
            } else if (asset.strategyType === "moneyPrinter") {
                return asset.stats.moneyPrinterApy
                    ? (asset.stats.moneyPrinterApy / 1).toFixed(2) + "%"
                    : "0.00%";
            }
        } else {
            return "0.00%";
        }
    };

    _get7dPNL = (asset) => {
        const { basedOn } = this.props;
        // To calculate APY (Vault + Earn divide by 2 : Estimated)
        // Compound APY is using compoundApy
        // if (asset && asset.stats && asset.stats.pnl) {
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
            if ( asset.pnl && (
                asset.strategyType === "citadel" ||
                asset.strategyType === "daoFaang" ||
                asset.strategyType === "elon" ||
                asset.strategyType === "cuban" ||
                asset.strategyType === "moneyPrinter")
            ) {

                return (asset.pnl * 100).toFixed(2) + "%";
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
        // }
        return 0 +'%';
    };

    _getPnl = (asset) => {
        // if ( asset.pnl && (
        //     asset.strategyType === "citadel" ||
        //     asset.strategyType === "daoFaang" ||
        //     asset.strategyType === "elon" ||
        //     asset.strategyType === "cuban" ||
        //     asset.strategyType === "moneyPrinter" ||
        //     asset.strategyType === "")
        // ) {

        //     return (asset.pnl).toFixed(2) + "%";
        // }
        // return '0.00 %';
        return `${(asset && asset.pnl) ? (asset.pnl).toFixed(2) : 0.00 } %`;
    }

    calculateYearnAPY = (earnAPR, vaultAPY) => {
        if (earnAPR * 100 > vaultAPY) {
            return (
                (vaultAPY / 1).toFixed(2) +
                "% - " +
                ((earnAPR * 100) / 1).toFixed(2) +
                "%"
            );
        } else {
            return (
                ((earnAPR * 100) / 1).toFixed(2) +
                "% - " +
                (vaultAPY / 1).toFixed(2) +
                "%"
            );
        }
    };

    renderBasedOn = () => {
        const { classes } = this.props;
        const { basedOn, loading } = this.state;

        const options = [
            {
                value: 1,
                description: "1 week",
            },
            {
                value: 2,
                description: "1 month",
            },
            {
                value: 3,
                description: "inception",
            },
        ];

        return (
            <div className={classes.basedOnContainer}>
                <InfoIcon className={classes.infoIcon} />
                <Typography>
                    Growth is based on the vault's performance{" "}
                    {basedOn === 3 ? "since" : "for the past"}
                </Typography>
                <TextField
                    id={"basedOn"}
                    name={"basedOn"}
                    select
                    value={basedOn}
                    onChange={this.onSelectChange}
                    SelectProps={{
                        native: false,
                    }}
                    disabled={loading}
                    className={classes.assetSelectRoot}
                >
                    {options &&
                    options.map((option) => {
                        return (
                            <MenuItem key={option.value} value={option.value}>
                                <Typography variant="h4">{option.description}</Typography>
                            </MenuItem>
                        );
                    })}
                </TextField>
            </div>
        );
    };

    // refreshVault = () => {
    //   dispatcher.dispatch({
    //     type: GET_STRATEGY_BALANCES_FULL,
    //     content: { interval: "30d" },
    //   });
    //   this.setState({ loading: false });
    // };

    onSelectChange = (event) => {
        let val = [];
        val[event.target.name] = event.target.value;
        this.setState(val);

        localStorage.setItem("yearn.finance-dashboard-basedon", event.target.value);

        this.setState({ loading: true });
        dispatcher.dispatch({
            type: GET_STRATEGY_BALANCES_FULL,
            content: { interval: "30d" },
        });
    };

    closeModal = () => {
        this.setState({ modalOpen: false });
    };

    // renderModal = () => {
    //     return (
    //         <UnlockModal
    //             closeModal={this.closeModal}
    //             modalOpen={this.state.modalOpen}
    //         />
    //     );
    // };
}

export default withNamespaces()(withRouter(withStyles(styles)(Vault)));
