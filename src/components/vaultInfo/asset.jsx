
import {
    Avatar,
    Button,
    CircularProgress,
    Checkbox,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {
    APPROVE_DEPOSIT_CONTRACT,
    APPROVE_DEPOSIT_SUCCESS,
    CONFIRM_DEPOSIT_CONTRACT,
    DEPOSIT_ALL_CONTRACT_RETURNED,
    DEPOSIT_ALL_CONTRACT_RETURNED_COMPLETED,
    DEPOSIT_CONTRACT_RETURNED_COMPLETED,
    ERROR,
    HAPPY_HOUR_VERIFY,
    WITHDRAW_BOTH,
    WITHDRAW_BOTH_VAULT_FAIL_RETURNED,
    WITHDRAW_BOTH_VAULT_RETURNED_COMPLETED,
    WITHDRAW_VAULT_RETURNED_COMPLETED,
    ERROR_WALLET_APPROVAL, ERROR_DEPOSIT_WALLET, DEPOSIT_CONTRACT_HAPPY_HOUR_RETURNED_COMPLETED
} from "../../constants";
import React, {Component} from "react";

import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Store from "../../stores/storev2";
import {getTheme} from "../../theme";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import PieChart from '../common/pieChart';
import LineChart from '../common/chart/lineChart/lineChart';
import CurrencySelect from "../common/currencySelect/currencySelect";

import {
    getAssetData} from './vaultUtils';
import BasicModal from '../common/basicModal';
import DoneMark from '../../assets/done.png';

import InputValidation from "../../utils/inputValidation";

import InfoModal from "../common/infoModal/infoModal";

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

const styles = (theme) => ({
    value: {
        cursor: "pointer",
        fontSize: "10px"
    },
    test: {
        borderColor: "#ff0000",
    },
    table: {
        background: null,
        color: "white"
    },
    actionInput: {
        borderColor: "#ff0000",
        // padding: '0px 0px 12px 0px',
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
        // '& input:valid + fieldset': {
        //   borderColor: 'green',
        //   borderWidth: 2,
        // },
    },

    vaultContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        background: "#292750"
    },
    assetNameInfo: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "18px",
        lineHeight: "20px",
        color: "#FFFFFF",
        padding: "24px 24px 0 24px"
    },
    assetNameDescription: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#FFFFFF",
        padding: "8px 24px 0 24px"
    },
    actionsContainer: {
        paddingBottom: "12px",
        display: "flex",
        flex: "1",
        // padding: '24px',
        flexDirection: "column",
        [theme.breakpoints.down("sm")]: {
            // padding: '20px 0px',
        },
    },
    ratioContainer: {
        paddingBottom: "12px",
        display: "flex",
        flex: "1",
        padding: "24px 0",
    },
    withdrawContainer: {
        // paddingBottom: "12px",
        display: "flex",
        flex: "1",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            display: "block",
        },
    },
    title: {
        paddingRight: "24px",
    },
    actionButton: {
        height: "47px",
        margin: "auto",
        borderRadius: "5px",
        background: "#18a0fb",
        color: "#ffffff",
        width: "49%",
        "&:hover": {
            background: "#00c2ff",
        },
    },
    withdrawButtonBox: {
        display: "flex",
        width: "100%",
        // marginTop: "10px",
    },
    withdrawButton: {
        height: "42px",
        margin: "auto",
        borderRadius: "0px",
        background: "#7B25D266",
        borderColor: theme.themeColors.border,
        color: theme.themeColors.textT,
        flex: 1,
        marginLeft: "20px",
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
    withdrawButtonText: {
        color: theme.themeColors.textS,
        fontWeight: "700",
    },
    leftLabelContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    rightLabelContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
    },
    tradeContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        width: "100%",
        margin: "auto",
        marginBottom: "1.3rem",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    sepperator: {
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: theme.themeColors.lineT,
        margin: "24px 30px",
        // [theme.breakpoints.up('sm')]: {
        //   width: '40px',
        //   borderBottom: 'none',
        //   margin: '0px'
        // }
    },
    scaleContainer: {
        display: "flex",
        justifyContent: "center",
        padding: "12px 0px 12px 0px",
        alignItems: "center",
        flexWrap: "wrap",
    },
    scale: {
        // width: '24%',
        minWidth: "auto",
        width: "auto",
        padding: "0px",
        color: theme.themeColors.textP,
        marginLeft: "12px",
        "&:first-child": {
            marginLeft: "0px",
        },
    },
    scaleActive: {
        minWidth: "25%",
        color: "#222222",
        background: "rgba(24, 160, 251, 0.2)",
        borderRadius: "5px",
    },
    buttonText: {
        fontWeight: "700",
        color: "#ffffff",
    },
    headingContainer: {
        width: "100%",
        display: "flex",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    heading: {
        paddingBottom: "12px",
        flex: 1,
        flexShrink: 0,
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    right: {
        textAlign: "right",
    },
    disabledContainer: {
        width: "100%",
        paddingTop: "12px",
        textAlign: "center",
    },
    assetSummary: {
        display: "flex",
        alignItems: "stretch",
        flex: 1,
        width: "100%",
        marginBottom: "24px",
        flexWrap: "wrap",
        borderTop: "1px solid #d9d9d9",
        borderTopColor: theme.themeColors.lineO,
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        // borderBottom: '1px solid #d9d9d9'
    },
    headingEarning: {
        flex: 1,
        padding: "12px",
    },
    headingStrategy: {
        padding: "12px",
        width: "256px",
    },
    grey: {
        color: theme.themeColors.textP,
        fontSize: "12px",
    },
    flexy: {
        fontSize: "14px",
        color: theme.themeColors.textT,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: "0.5rem",
        marginBottom: "1rem",
    },
    fullWidth: {
        minWidth: "100%",
        margin: "18px 0px",
    },
    rail: {
        height: 8,
    },
    track: {
        height: 8,
    },
    thumb: {
        width: 18,
        height: 18,
    },
    slider: {
        // width: '80%',
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        marginBottom: 16,
        [theme.breakpoints.down("sm")]: {
            // width: '90%'
        },
    },
    projected: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
    withdrawalText: {
        marginTop: 20,
        marginBottom: 10,
    },
    assetDetails: {
        padding: "20px",
    },
    subtitle: {
        fontSize: "14px",
        color: theme.themeColors.textT,
    },

    // 调整样式新增
    apyText: {
        color: theme.themeColors.textT,
    },
    inputStyle: {
        borderRadius: "0px",
    },
    depositIputBox: {
        borderColor: "#ff0000",
        width: "100%",
        position: "relative",
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
        color: theme.themeColors.textT,
        minWidth: "30px",
        padding: "0px 6px",
    },
    depositScaleActive: {
        minWidth: "30px",
        padding: "0px 6px",
        color: theme.themeColors.textP,
        background: 'rgba(115, 103, 247, 0.15)',
        borderRadius: '5px',
        height: "14px"
    },
    depositButtonBox: {
        width: "100%",
        display: "flex",
        marginTop: "20px",
        justifyContent: "space-between",
    },
    depositActionButton: {
        height: "42px",
        margin: "auto",
        background: "#7B25D266",
        borderColor: theme.themeColors.border,
        color: theme.themeColors.textT,
        marginLeft: "20px",
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
        }
    },
    depositButtonText: {
        fontWeight: "700",
        color: theme.themeColors.textT,
        fontSize: "14px",
    },
    tradeBox: {
        marginTop: "20px",
        background: "#292750",
        padding: "0px 24px 0px 24px",
    },
    earnAndVaultValue: {
        fontSize: "12px",
        color: theme.themeColors.textT,
        width: "100%",
        textAlign: "left",
    },
    earnAndVaultInput: {
        // flex: 1,
        width: "100%",
    },
    yearnEarnAndVaultBlock: {
        display: "flex",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
    yearnEarnAndVaultItem: {
        flex: 1,
        marginLeft: "20px",
        "&:first-child": {
            marginLeft: "0px",
        },
        [theme.breakpoints.down("sm")]: {
            marginLeft: "0px",
        },
    },
    balances: {
        width: "100%",
        display: "flex",
        alignItems: "end",
        justifyContent: "space-between",
        color: theme.themeColors.textT,
    },
    alignCenter: {
        alignItems: "center",
    },
    pendingContainer: {
        // display: "flex",
        // alignItems: "center",
        textAlign: "right",
        marginTop: "-20px"
    },
    pendingInfo: {
        lineHeight: "1.6"
    },
    modalInfo: {
        color: theme.themeColors.textT,
        padding: "15px",
    },
    labelFonts: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "18px"
    },
    operationLabel: {
        color: theme.themeColors.textT,
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "500",
    },
    changeCurrencyContainer: {
        padding: "10px 20px 20px 20px",
        position: "relative",
    },
    accountInfoBlock: {
        position: "relative",
    },
    accountInfo: {
        marginTop: "-12px",
        marginRight: "-8px",
        width: "100%",
        height: "30px",
        color: theme.themeColors.textT,
        background: theme.themeColors.blockBack,
        borderColor: theme.themeColors.blockBorder,
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
    },
    disableAccountInfoBlock: {
        pointerEvents: "none",
        opacity: 0.7,
    },
    enableAccountInfoBlock: {
        pointerEvents: "auto",
        opacity: 1.0,
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.themeColors.menuSelText,
    },
    modalListItem: {
        border: "1px solid " + theme.themeColors.border,
        marginTop: "10px",
        color: theme.themeColors.textT,
        "&:active": {
            background: theme.themeColors.buttonActive,
        },
    },
    assetIconImg: {
        width: "20px",
        height: "20px",
        marginRight: "5px",
    },
    assetIconImgModal: {
        width: "20px",
        height: "20px",
        marginBottom: "-2%"
    },
    dialogRoot: {
        border: "1px solid " + theme.themeColors.border,
        background: theme.themeColors.itemBack,
    },
    dialogTitle: {
        background: theme.themeColors.menuSel,
        borderColor: theme.themeColors.blockBorder,
        color: theme.themeColors.menuSelText,
    },
    dialogContent: {
        background: theme.themeColors.itemBack,
    },
    arrowDropdownIcon: {
        height: "15px",
        fill: theme.themeColors.textP,
    },
    errorMessage: {
        align: "left",
        color: theme.themeColors.formError,
        marginTop: "-17px",
    },
    happyHourWarning: {
        align: "left",
        color: theme.themeColors.formWarning,
        marginTop: "3px",
    },
    happyHourMessage: {
        fontSize: "12px",
        align: "left",
        color: theme.themeColors.formHappyHour,
        marginTop: "-14px",
    },
    tokenColorKey: {
        width: "12px",
        height: "12px",
        left: "32px",
        borderRadius: "50%",
        padding: "5px",
        display: "inline-block",
        lineHeight: "7px",
        marginRight: "10px"

    },
    assetRowHover: {
        "&:hover": {
            backgroundColor: "#0E0632 !important"
        }
    },
    approvalDetails: {
        backgroundColor: "#191736",
        color: "#FFFFFF",
        textAlign: "center",
        padding: "12px 16px"
    },
    depositWarningDiv: {
        padding: "7% 0 10px 10px",
        color: "#FFFFFF",
    },
    warningCheckbox: {
        color: "#FFFFFF"
    },
    approvalBtnBlock: {
        display: "flex"
    },
    approvalButton: {
        color: "#FFFFFF",
        margin: "auto 0 auto auto",
        background: "#7B25D266",
        height: "25px",
        width: "80%",
        '& img': {
            height: "20px"
        },
        '& span.MuiButton-label': {
            fontFamily: "Rubik",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "15px",
            lineHeight: "25px",
            textAlign: "center",
            letterSpacing: "1px",
            textTransform: "uppercase",
        }
    },
    floatRightItems: {
        float: "right"
    },
    timeRangeMain: {
        display: "flex",
        justifyContent: "flex-end",
        color: "#FFFFFF",
        zIndex: 1,
        right: "1%",
        padding: "0px 24px 0px 24px",
        height: "14px"
    },
    timeRangeLabel: {
        fontFamily: "Rubik",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "10px",
        letterSpacing: "0px",
        textAlign: "right",
        padding: "3px",
        cursor: "pointer"
    },
    activeLabel: {
        color: "#7367F7",
        backgroundColor: "rgba(115, 103, 247, 0.15)",
        borderRadius: "5px"
    },
    erroredMessage: {
        color: "red",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 0 10px 0"
    },
    chartTitle: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        color: "#FFFFFF",
        padding: "0 0 0 2%",
        fontSize: "18px",
        fontWeight: 500,
        marginBottom: "5px"
    },
    assetChartDistributionBody: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#FFFFFF",
        marginTop: "0",
        padding: "0 0 0 2%",
    },
    pnlVault: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "26px",
        lineHeight: "20px",
        marginTop: "16px"
    },
    pnlDivPosition: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        fontSize: "14px",
        color: "#fff",
        padding: "0px 24px 0px 24px",
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "normal"
    },
    withdrawTextPadding: {
        padding: "17px",
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "normal",
        marginBottom: "15px",
        color: "rgba(255, 255, 255, 0.61)"
    },
    actionButtonText: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: 500
    },
    scaleText: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "10px"
    },
    strategyCellData: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "18px",
    },
    withDrawMessage: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "normal",
    },
    withdrawTextStandard: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "normal",
        color: "rgba(255, 255, 255, 0.61)"
    },
    withdrawMessageBlock: {
        textAlign: "center",
        marginBottom: "5%"
    },
    labelMessage: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px"
    },
    padding4Span: {
        padding: "4px"
    },
    infoLink: {
        textDecoration: "none",
        color: theme.themeColors.textT
    }
});

const StyledTableCell = withStyles(() => ({
    head: {
        color: "#FFFFFF",
        borderBottom: "none",
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "normal",
         letterSpacing: "1px"
    },
    body: {
        borderBottom: "none",
        color: "#FFFFFF",
        fontSize: 14,
    },
}))(TableCell);

const StyledTableCellDepositHead = withStyles(() => ({
    head: {
        color: "#FFFFFF",
    },
    body: {
        borderBottom: "none",
        color: "#FFFFFF",
        fontSize: 14,
    },
}))(TableCell);

const StyledTableCellDeposit = withStyles(() => ({
    head: {
        color: "#FFFFFF",
        borderBottom: "none"
    },
    body: {
        borderBottom: "none",
        color: "#FFFFFF",
        fontSize: 14,
        padding: "2px"
    },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
    root: {
        // '&:nth-of-type(odd)': {
        //     backgroundColor: theme.palette.action.hover,
        // },
    },
}))(TableRow);

class Asset extends Component {
    constructor(props) {
        super();

        this.state = {
            amount: "",
            amountError: false,
            redeemEarnAmount: "",
            redeemVaultAmount: "",
            redeemAmount: "",
            redeemAmountError: false,
            redeemEarnAmountError: false,
            account: store.getStore("account"),
            ratio: 50,
            earnRatio: 50,
            vaultRatio: 50,
            percent: 0,
            earnPercent: 0,
            vaultPercent: 0,
            amountPercent: 0,
            redeemAmountPercent: 0,
            redeemAmountInUsd: 0,
            hideNav: false,
            openEarnInfo: false,
            openVaultInfo: false,
            interestTheme: {}, // 当前主题数据,
            selectedCurrency: "USDT",
            selectedWithdrawCurrency: "USDT",
            tokenIndex: null,
            withdrawTokenIndex: null,
            errorMessage: "",
            amountAboveThreshold: false,
            scales: [0, 25, 50, 75, 100],
            timeRange: [{
                label: '1W',
                value: '7d'
            }, {
                label: '1M',
                value: '30d'
            }, {
                label: '6M',
                value: '6m'
            }, {
                label: '1Y',
                value: '1y'
            }],
            vaultAssetHistoricalData: {data: [], pnl: 0},
            withdrawErrorMessage: "",
            withdrawEarnErrorMessage: "",
            happyHourWarning: "",
            happyHourMessage: "",
            highRiskDepositWarningNeeded: false,
            highRiskDepositAccepted: false,
            openDepositDialogBox: false,
            openWithdrawDialogBox: false,
            isApprovalLoading: false,
            isApprovalErrored: false,
            isApprovalCompleted: false,
            isDepositLoading: false,
            isDepositCompleted: false,
            isDepositErrored: false,
            isWithdrawing: false,
            isWithdrawCompleted: false,
            isWithdrawError: false,
            needVaultApproval: false,
            isCheckingApproval: false,
            displayCurrencyModal: false,
            assetDistributionData: [],
            calculatingFees: 0,
            feeAmount: 0,
            finalAmount: 0,
            feePercentage: 0,
            refreshToken: false,
        };
    }

    componentWillMount() {
        emitter.on(DEPOSIT_CONTRACT_RETURNED_COMPLETED, this.depositReturned); // Trigger function after deposit contract process is completd
        emitter.on(DEPOSIT_ALL_CONTRACT_RETURNED, this.depositReturned);
        emitter.on(DEPOSIT_CONTRACT_HAPPY_HOUR_RETURNED_COMPLETED, this.depositReturned);
        emitter.on(WITHDRAW_VAULT_RETURNED_COMPLETED, this.withdrawReturned);
        emitter.on(WITHDRAW_BOTH_VAULT_RETURNED_COMPLETED, this.withdrawReturned);
        emitter.on(WITHDRAW_BOTH_VAULT_FAIL_RETURNED, this.withDrawErrorReturned);
        emitter.on(APPROVE_DEPOSIT_SUCCESS, this.approvalCompleted)
        emitter.on(ERROR, this.errorReturned);
        emitter.on(ERROR_WALLET_APPROVAL, this.walletApprovalErrorReturned);
        emitter.on(ERROR_DEPOSIT_WALLET, this.walletDepositErrorReturned);
        emitter.on("CURRENT_THEME_RETURNED", this.currentThemeChanged);
        emitter.on(HAPPY_HOUR_VERIFY, this.happyHourVerify);
        const localTheme = localStorage.getItem("daobenturesTheme");
        this.currentThemeChanged(localTheme);
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
    }

    componentDidUpdate(prevProps){
        if(prevProps.expanded !== this.props.expanded && this.props.expanded === this.props.asset.id) {
            this.selectRangeLabel(this.props.asset, '7d');
        }

        if(prevProps.asset !== this.props.asset) {
            this.setTokenIndex();
        }
    }

    componentWillUnmount() {
        emitter.removeListener(
            DEPOSIT_CONTRACT_RETURNED_COMPLETED,
            this.depositReturned
        );
        emitter.removeListener(
            DEPOSIT_ALL_CONTRACT_RETURNED_COMPLETED,
            this.depositReturned
        );
        emitter.removeListener(
            DEPOSIT_CONTRACT_HAPPY_HOUR_RETURNED_COMPLETED,
            this.depositReturned
        );
        emitter.removeListener(
            WITHDRAW_VAULT_RETURNED_COMPLETED,
            this.withdrawReturned
        );
        emitter.removeListener(
            WITHDRAW_BOTH_VAULT_RETURNED_COMPLETED,
            this.withdrawReturned
        );
        emitter.removeListener(
            WITHDRAW_BOTH_VAULT_FAIL_RETURNED,
            this.withDrawErrorReturned
        );
        emitter.removeListener(APPROVE_DEPOSIT_SUCCESS, this.approvalCompleted)
        emitter.removeListener(ERROR, this.errorReturned);
        emitter.removeListener(ERROR_WALLET_APPROVAL, this.walletApprovalErrorReturned);
        emitter.removeListener(ERROR_DEPOSIT_WALLET, this.walletDepositErrorReturned);
        window.removeEventListener("resize", this.resize.bind(this));
        emitter.removeListener("CURRENT_THEME_RETURNED", this.currentThemeChanged);
        emitter.removeListener(HAPPY_HOUR_VERIFY, this.happyHourVerify);
    }

    selectRangeLabel = async (asset, value) => {

        this.setState({
            selectedTimeRange: value,
        });

        let apyResponseData = await store.getHistoricDataOfVault(asset.id, value);

        if (apyResponseData.success) {
            this.setState({vaultAssetHistoricalData: {chartData: apyResponseData.data.chartData , pnl: apyResponseData.data.performanceHistory}});
        }
    }

    setTokenIndex = () => {
        const { asset } = this.props;
        const tokenIndex = asset.depositCurrencies ?  asset.depositCurrencies[0].tokenIndex : 0;
        const selectedCurrency = asset.depositCurrencies ? asset.depositCurrencies[0].label: "USDT";

        const withdrawTokenIndex = asset.withdrawCurrencies ? asset.withdrawCurrencies[0].tokenIndex: 0;
        const selectedWithdrawCurrency = asset.withdrawCurrencies ? asset.withdrawCurrencies[0].label: "USDC";

        // asset.symbol = asset.symbols[tokenIndex];
        asset.balance = asset.balances[tokenIndex];
        asset.erc20address = asset.erc20addresses[tokenIndex];

        const refreshToken = !this.state.refreshToken;

        this.setState({tokenIndex, selectedCurrency, refreshToken, withdrawTokenIndex,selectedWithdrawCurrency});
    }

    checkTheWalletApprovedStatus = async () => {
        const {
            amount,
            earnRatio,
            vaultRatio,
            tokenIndex,
            amountError,
            errorMessage,
        } = this.state;
        const {asset} = this.props;

        if (InputValidation.validateAmountNotExist(amount)) {
            this.setState({
                amountError: true,
                errorMessage: "Invalid amount",
            });
            return;
        }

        this.setState({
            isCheckingApproval: true
        })

        if (!amountError && errorMessage === "") {

            let respondedInfo = await store.getWalletApprovedStatus({
                earnAmount: ((amount * earnRatio) / 100).toString(),
                vaultAmount: ((amount * vaultRatio) / 100).toString(),
                amount: amount.toString(),
                asset,
                tokenIndex: tokenIndex,
            });

            if (respondedInfo.success) {
                this.setState({
                    needVaultApproval: respondedInfo.needApproval
                });
            } else {
                console.log(respondedInfo);
            }

        }

        this.setState({
            isCheckingApproval: false
        })

    }

    approvalCompleted = () => {
        this.setState({
            isApprovalLoading: false,
            isApprovalCompleted: true,
            isApprovalErrored: false
        });
    }

    withDrawErrorReturned = () => {
        this.setState({
            isWithdrawing: false,
            isWithdrawError: true
        });
    }

    resize() {
        let currentHideNav = window.innerWidth <= 760;
        if (currentHideNav !== this.state.hideNav) {
            this.setState({hideNav: currentHideNav});
        }
    }

    currentThemeChanged = (theme) => {
        const currentTheme = theme || store.getStore("currentTheme");
        this.setState({
            interestTheme: getTheme(currentTheme),
        });
    };

    handleModalDisplay = (open) => {
        this.setState({displayCurrencyModal: open});

    };

    handleSelectedCurrency = (currencyType) => {
        if (this.state.loading) {
            return;
        }

        const {asset} = this.props;

        const tokenMap = {USDT: "0", USDC: "1", DAI: "2"};
        const tokenIndex = tokenMap[currencyType];

        //asset.symbol = asset.symbols[tokenIndex];
        asset.balance = asset.balances[tokenIndex];
        asset.erc20address = asset.erc20addresses[tokenIndex];

        this.setState({
            selectedCurrency: currencyType,
            tokenIndex: tokenIndex,
            amount: "",
            percent: 0,
            errorMessage: "",
        });

        this.handleModalDisplay(false);
    };

    handleSelectedDepositCurrency = (selectedCurrency) => {
        const { label: currencyType, tokenIndex } = selectedCurrency;
        const {asset} = this.props;

        // asset.symbol = asset.symbols[tokenIndex];
        asset.balance = asset.balances[tokenIndex];
        asset.erc20address = asset.erc20addresses[tokenIndex];
        
        this.setState({
            selectedCurrency: currencyType,
            tokenIndex: tokenIndex,
            amount: "",
            percent: 0,
            errorMessage: "",
        });
    }

    handleSelectedWithdrawCurrency = (selectedCurrency) => {
        const { label: currencyType, tokenIndex } = selectedCurrency;
        const {asset} = this.props;

        // asset.symbol = asset.symbols[tokenIndex];
        // asset.balance = asset.balances[tokenIndex];
        // asset.erc20address = asset.erc20addresses[tokenIndex];
        
        this.setState({
            selectedWithdrawCurrency: currencyType,
            withdrawTokenIndex: tokenIndex,
            amount: "",
            percent: 0,
            errorMessage: "",
        });
    }

    depositReturned = () => {
        this.setState({
            loading: false,
            amount: "",
            isDepositLoading: false,
            isDepositCompleted: true,
            isDepositErrored: false,
            highRiskDepositWarningNeeded: false,
            highRiskDepositAccepted: false,
        });

        setTimeout(() => {
            this.setState({
                isDepositCompleted: false,
                openDepositDialogBox: false,
            })
        })
    };

    withdrawReturned = () => {
        this.setState({
            loading: false,
            redeemAmount: "",
            redeemAmountInUsd: 0,
            isWithdrawing: false,
            isWithdrawCompleted: true,
            isWithdrawError: false,
        });
        setTimeout(() => {
            this.setState({
                openWithdrawDialogBox: false,
                isWithdrawCompleted: false
            })
        }, 2000)
    };

    errorReturned = () => {
        this.setState({loading: false});
    };

    walletApprovalErrorReturned = () => {
        this.setState({
            isApprovalLoading: false,
            isApprovalErrored: true,
        });
    }

    walletDepositErrorReturned = () => {
        this.setState({
            isDepositLoading: false,
            isDepositErrored: true,
        });
    }

    happyHourVerify = (payload) => {
        if (
            payload.body.happyHour === true &&
            payload.body.amountAboveThreshold === false
        ) {
            this.setState({
                amountAboveThreshold: payload.body.amountAboveThreshold,
                // happyHourWarning: payload.body.message,
            });
        }
    };

    renderErrorMessage = (classes) => {
        const {
            errorMessage,
            happyHourMessage,
            happyHourWarning,
        } = this.state;
        if (errorMessage !== "") {
            return (
                <Typography variant={"h5"} className={classes.errorMessage}>
                    {errorMessage}
                </Typography>
            );
        } else {
            if (happyHourWarning !== "") {
                return (
                    <Typography variant={"h5"} className={classes.happyHourWarning}>
                        {happyHourWarning}
                    </Typography>
                );
            } else if (happyHourMessage !== "") {
                return (
                    <Typography variant={"h5"} className={classes.happyHourMessage}>
                        {happyHourMessage}
                    </Typography>
                );
            } else {
                return null;
            }
        }
    };

    renderCurrencyModal = (currencies) => {
        const {classes} = this.props;
        const {displayCurrencyModal} = this.state;

        return (
            <Dialog
                onClose={() => this.handleModalDisplay(false)}
                fullWidth={true}
                maxWidth={"sm"}
                classes={{paper: classes.dialogRoot}}
                aria-labelledby="customized-dialog-title"
                open={displayCurrencyModal}
            >
                <MuiDialogTitle disableTypography className={classes.dialogTitle}>
                    <Typography variant="h6">Select a Currency</Typography>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={() => this.handleModalDisplay(false)}
                    >
                        <CloseIcon/>
                    </IconButton>
                </MuiDialogTitle>
                <DialogContent dividers className={classes.dialogContent}>
                    <List component="nav" aria-label="main mailbox folders">
                        {currencies.length > 0 &&
                        currencies.map((currency, index) => {
                            return (
                                <ListItem
                                    button
                                    onClick={() => this.handleSelectedCurrency(currency)}
                                    key={index}
                                    className={classes.modalListItem}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt=""
                                            src={require("../../assets/" + currency + "-logo.png")}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary={currency}/>
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
            </Dialog>
        );
    };

    renderDepositWithdrawInput = (isDeposit, asset) => {
        const {classes} = this.props;
        const {
            amount,
            amountError,
            scales,
            loading,
            redeemAmountInUsd,
            redeemAmountError,
            percent,
            redeemAmountPercent,
            happyHourWarning,
            happyHourMessage,
        } = this.state;

        return (
            <React.Fragment>
                <div className={classes.depositIputBox}>
                    <TextField
                        style={{
                            width: "100%",
                        }}
                        className={classes.actionInput}
                        id={isDeposit ? "amount" : "redeemAmountInUsd"}
                        value={isDeposit ? amount : redeemAmountInUsd}
                        error={isDeposit ? amountError : redeemAmountError}
                        onChange={isDeposit ? this.onChangeDeposit : this.onChange}
                        disabled={loading || (!(isDeposit ? asset.isDepositEnabled : asset.isWithdrawEnabled))}
                        placeholder="0.00"
                        variant="outlined"
                    />
                    <div className={classes.depositScaleContainer}>
                        <div className={classes.accountInfoBlock}>
                            <CurrencySelect currencies={isDeposit? asset.depositCurrencies : asset.withdrawCurrencies} 
                                refresh={this.state.refreshToken} 
                                selectedCurrency={isDeposit ? this.handleSelectedDepositCurrency : this.handleSelectedWithdrawCurrency} 
                            />
                        </div>
                        {this.renderCurrencyModal(asset.symbols)}
                    </div>
                    <div className={classes.floatRightItems}>
                        {scales.length > 0 &&
                        scales.map((percentage, index) => {
                            return (
                                <Button
                                    className={
                                        isDeposit
                                            ? percent === percentage
                                            ? classes.depositScaleActive
                                            : classes.depositScale
                                            : redeemAmountPercent === percentage
                                            ? classes.depositScaleActive
                                            : classes.depositScale
                                    }
                                    variant="text"
                                    disabled={loading||!(isDeposit ? asset.isDepositEnabled : asset.isWithdrawEnabled)}
                                    onClick={() => {
                                        isDeposit
                                            ? this.setAmount(percentage)
                                            : this.setRedeemAmount(percentage);
                                    }}
                                    key={index}
                                >
                                    <Typography variant={"h5"} className={classes.scaleText}>
                                        {percentage === 100 ? "Max" : percentage + "%"}
                                    </Typography>
                                </Button>
                            );
                        })}
                    </div>
                </div>

                {/** Error Message */}
                {isDeposit && this.state.errorMessage !== "" && (
                    <Typography variant={"h5"} className={classes.errorMessage}>
                        {this.state.errorMessage}
                    </Typography>
                )}
                {isDeposit &&
                this.state.errorMessage === "" &&
                this.state.happyHourWarning !== "" && (
                    <Typography variant={"h5"} className={classes.happyHourWarning}>
                        {happyHourWarning}
                    </Typography>
                )}
                {isDeposit &&
                this.state.errorMessage === "" &&
                this.state.happyHourMessage !== "" && (
                    <Typography variant={"h5"} className={classes.happyHourMessage}>
                        {happyHourMessage}
                    </Typography>
                )}
                {!isDeposit && this.state.withdrawErrorMessage !== "" && (
                    <Typography variant={"h5"} className={classes.errorMessage}>
                        {this.state.withdrawErrorMessage}
                    </Typography>
                )}
            </React.Fragment>
        );
    };

    calculateFeeAmount = async () => {
        this.setState({
            calculatingFees: true
        });

       let feeData = await store.getFeeInfo(this.props.asset, this.state.amount * (10 ** this.props.asset.feeDecimals));
       let feeAmount = (this.state.amount * feeData.feePercent/100).toFixed(4);
       let finalAmount = (this.state.amount - feeAmount).toFixed(4);
       this.setState({
           calculatingFees: false,
           feeAmount,
           finalAmount,
           feePercentage: feeData.feePercent
       });
    }

    handleRiskAcceptance = (event) => {
        this.setState({
            highRiskDepositAccepted: event.target.checked
        });
    }

    setOpenModal = (modalState) => {
        let usdWarningLimit = 4000;
        this.setState({
            openDepositDialogBox: modalState,
            isApprovalLoading: false,
            isApprovalErrored: false,
            isApprovalCompleted: false,
            isDepositLoading: false,
            isDepositCompleted: false,
            highRiskDepositWarningNeeded: this.state.amount > usdWarningLimit,
            highRiskDepositAccepted: false,
        });
        if (modalState) {
            this.checkTheWalletApprovedStatus();
            this.calculateFeeAmount();

        }
    }

    setOpenWithdrawModal = (modalState) => {
        this.setState({
            openWithdrawDialogBox: modalState,
            isApprovalLoading: false,
            isApprovalErrored: false,
            isApprovalCompleted: false,
            isDepositLoading: false,
            isDepositCompleted: false
        });
    }

    depositModalTemplate = (classes, asset) => {
        return <div>
            <div className={classes.approvalDetails}>
                <Grid item sm={12} xs={12}>
                    Kindly approve the transaction in your wallet
                </Grid>
                <Grid item sm={12} xs={12}>
                    <Grid item sm={12} xs={12}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCellDepositHead align="left"> <img
                                        alt=""
                                        src={require("../../assets/" +
                                            this.state.selectedCurrency +
                                            "-logo.png")}
                                        className={classes.assetIconImgModal}
                                        style={
                                            asset.disabled
                                                ? {filter: "grayscale(100%)"}
                                                : {}
                                        }
                                    /> {this.state.selectedCurrency}</StyledTableCellDepositHead>
                                    <StyledTableCellDepositHead
                                        align="right">{this.state.amount}</StyledTableCellDepositHead>
                                </TableRow>
                            </TableHead>
                            {!this.state.calculatingFees && <TableBody>
                                <StyledTableRow key={"emptyRow"}>
                                    <StyledTableCellDeposit align="left">&nbsp;</StyledTableCellDeposit>
                                    <StyledTableCellDeposit align="right"></StyledTableCellDeposit>
                                </StyledTableRow>
                                <StyledTableRow key={"approveDepositValue"}>
                                    <StyledTableCellDeposit align="left">Deposit</StyledTableCellDeposit>
                                    <StyledTableCellDeposit align="right"> {this.state.finalAmount} {this.state.selectedCurrency}</StyledTableCellDeposit>
                                </StyledTableRow>
                                <StyledTableRow key={"approveDepositFee"}>
                                    <StyledTableCellDeposit align="left">Fee({this.state.feePercentage}%)</StyledTableCellDeposit>
                                    <StyledTableCellDeposit align="right">-{this.state.feeAmount} {this.state.selectedCurrency}</StyledTableCellDeposit>
                                </StyledTableRow>
                                <StyledTableRow key={"approveDepositTotal"}>
                                    <StyledTableCellDeposit align="left">TOTAL</StyledTableCellDeposit>
                                    <StyledTableCellDeposit
                                        align="right">{this.state.amount} {this.state.selectedCurrency}</StyledTableCellDeposit>
                                </StyledTableRow>
                            </TableBody>}
                        </Table>
                    </Grid>
                </Grid>
            </div>
            {this.state.needVaultApproval && <div className={classes.depositWarningDiv}>
                <Grid container>
                    {!this.state.isApprovalErrored && <Grid item sm={8} xs={8}>
                        Allow your {this.state.selectedCurrency} to be deposited in {asset.strategy}
                    </Grid>}
                    {this.state.isApprovalErrored && <Grid item sm={8} xs={8}>
                        <span className={classes.erroredMessage}>Transaction denied. Please try again</span>
                    </Grid>}
                    <Grid item sm={4} xs={4} className={classes.approvalBtnBlock}>
                        <Button className={classes.approvalButton} onClick={this.getDepositApproval}
                                disabled={this.state.isApprovalLoading || this.state.isApprovalCompleted}>
                            {this.state.isApprovalLoading ?
                                <CircularProgress color="#FFFFFF" size="20px"/> : this.state.isApprovalCompleted ?
                                    <img src={DoneMark} alt="Done"/> : 'Approve'}
                        </Button>
                    </Grid>
                </Grid>
            </div>}
            {this.state.highRiskDepositWarningNeeded && <div className={classes.warningCheckbox}>
            <Checkbox
                checked={this.state.highRiskDepositAccepted}
                onChange={this.handleRiskAcceptance}
                size="small"
                color="primary"
                style={{color: "white"}}
            /> I understand that my deposit may experience high slippage due to low liquidity
            </div>}
            {this.state.isCheckingApproval && <div className={classes.erroredMessage}>
                Checking the wallet connection <CircularProgress color="#FFFFFF" size="25px"/>
            </div>}

            {this.state.calculatingFees && <div className={classes.erroredMessage}>
               Calculating Fees <CircularProgress color="#FFFFFF" size="25px"/>
            </div>}
            <div className={classes.depositWarningDiv}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item sm={8} xs={12}>
                        {this.state.isDepositCompleted &&
                        <span>Your Token  has been deposited in {asset.strategy} Strategy successfully.</span>}
                        {!this.state.isDepositCompleted && this.state.isDepositErrored &&
                        <span className={classes.erroredMessage}>Failed to deposit Token in {asset.strategy} Strategy. Please try again</span>}
                    </Grid>
                    <Grid xs={12}/>
                    {!this.state.isCheckingApproval && <Grid item sm={6} xs={8}>
                        <Button
                            className={classes.depositActionButton}
                            onClick={this.depositTokenToContract}
                            disabled={this.state.isApprovalLoading || this.state.isApprovalErrored || this.state.calculatingFees || (this.state.needVaultApproval && !this.state.isApprovalCompleted)
                            || (this.state.highRiskDepositWarningNeeded && !this.state.highRiskDepositAccepted)}
                        >
                            {this.state.isDepositLoading ?
                                <CircularProgress color="#FFFFFF" size="30px"/> : this.state.isDepositCompleted ?
                                    <img src={DoneMark} alt="Done"/> : <span>Deposit</span>}

                        </Button>
                    </Grid>}
                </Grid>
            </div>

        </div>
    }

    withdrawModalTemplate = (classes, asset) => {
        return <div>
            <div className={classes.approvalDetails}>
                <Grid item sm={12} xs={12}>
                    <span className={classes.withdrawTextStandard}>Kindly approve the transaction in your wallet</span>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <Grid item sm={12} xs={12}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCellDepositHead align="left"> <img
                                        alt=""
                                        src={require("../../assets/" +
                                            this.state.selectedWithdrawCurrency +
                                            "-logo.png")}
                                        className={classes.assetIconImgModal}
                                        style={
                                            asset.disabled
                                                ? {filter: "grayscale(100%)"}
                                                : {}
                                        }
                                    /> <span className={classes.withdrawTextStandard}>{this.state.selectedWithdrawCurrency}</span></StyledTableCellDepositHead>
                                    <StyledTableCellDepositHead
                                        align="right"><span className={classes.withdrawTextStandard}>{this.state.redeemAmountInUsd}</span></StyledTableCellDepositHead>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </Grid>
                    <Grid item sm={12} xs={12} className={classes.withdrawTextPadding}>
                        *Final amount might differ after the 20% profit sharing fee
                    </Grid>
                </Grid>
            </div>
            <div className={classes.depositWarningDiv}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    {this.state.isWithdrawError && !this.state.isWithdrawCompleted && <Grid item sm={12} xs={12}>
                        <span className={classes.erroredMessage}>Failed to withdraw {this.state.selectedWithdrawCurrency}
                            <br/> from {asset.strategy} Strategy. <br/>Please try again</span>
                    </Grid>}
                    {this.state.isWithdrawCompleted && <Grid item sm={8} xs={8} className={classes.withdrawMessageBlock}>
                        <span className={classes.withDrawMessage}>Your {this.state.selectedWithdrawCurrency} has been withdrawn <br/>from {asset.strategy} Strategy <br/>successfully.</span>
                    </Grid>}
                    {this.state.isWithdrawing && <Grid item sm={8} xs={8} className={classes.withdrawMessageBlock}>
                        <span className={classes.withDrawMessage}>Withdrawing your {this.state.selectedWithdrawCurrency} <br/> in {asset.strategy} Strategy</span>
                    </Grid>}
                    <Grid item xs={12}/>
                    <Grid item sm={6} xs={8}>
                        <Button
                            className={classes.depositActionButton}
                            onClick={this.onWithdraw}
                        >
                            {this.state.isWithdrawing ?
                                <CircularProgress color="#FFFFFF"/> : this.state.isWithdrawCompleted ?
                                    <img src={DoneMark} alt="Done"/> : <span>Withdraw</span>}

                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    }

    // Dispatch ERC20 Approval Action
    getDepositApproval = () => {
        const {
            amount,
            earnRatio,
            vaultRatio,
            tokenIndex,
            amountError,
            errorMessage,
        } = this.state;
        const {asset, startLoading} = this.props;


        if (InputValidation.validateAmountNotExist(amount)) {
            this.setState({
                amountError: true,
                errorMessage: "Invalid amount",
            });
            return;
        }

        if (!amountError && errorMessage === "") {
            this.setState({
                isApprovalLoading: true,
                loading: true,
            });
            startLoading();

            dispatcher.dispatch({
                type: APPROVE_DEPOSIT_CONTRACT,
                content: {
                    earnAmount: 0,
                    vaultAmount: 0,
                    amount: amount.toString(),
                    tokenIndex: tokenIndex, // TODO: Change to state variable
                    asset,
                },
            });
        }
    }

    // Dispatch Deposit action
    depositTokenToContract = () => {
        const {
            amount,
            tokenIndex,
            amountError,
            errorMessage,
        } = this.state;
        const {asset, startLoading} = this.props;

        if (InputValidation.validateAmountNotExist(amount)) {
            this.setState({
                amountError: true,
                errorMessage: "Invalid amount",
            });
            return;
        }

        if (!amountError && errorMessage === "") {
            this.setState({loading: true, isDepositLoading: true});
            startLoading();

            dispatcher.dispatch({
                type: CONFIRM_DEPOSIT_CONTRACT,
                content: {
                    earnAmount: 0,
                    vaultAmount: 0,
                    amount: amount.toString(),
                    tokenIndex: tokenIndex, // TODO: Change to state variable
                    asset,
                },
            });
        }
    }

    // Dispatch withdraw action
    onWithdraw = () => {
        let {redeemAmount, withdrawTokenIndex} = this.state;

        const {asset, startLoading} = this.props;

        if (InputValidation.validateAmountNotExist(redeemAmount)) {
            this.setState({
                redeemAmountError: true,
                withdrawErrorMessage: "Invalid amount",
            });
            return;
        }

        if (!this.state.redeemAmountError && this.withdrawErrorMessage !== "") {
            redeemAmount = (Math.floor(redeemAmount * 10000) / 10000).toFixed(4);
            let shares = (redeemAmount * 10 ** asset.decimals).toString();

            this.setState({loading: true, isWithdrawing: true});
            startLoading();

            dispatcher.dispatch({
                type: WITHDRAW_BOTH,
                content: {
                    earnAmount: "0",
                    vaultAmount: "0",
                    amount: shares,
                    asset: asset,
                    tokenIndex: withdrawTokenIndex,
                },
            });
        }
    };

    invest = async(asset) => {
        const result = await store.invest(asset);
    }

    // Pending balance info modal renderring
    renderPendingInfo = () => {
        const { classes } = this.props;
        const modalContent = (
            <div className={classes.modalInfo}>
                <Typography variant={"h5"} className={classes.pendingInfo}>
                    Funds being deployed therefore cannot be withdrawn. Please check back in 24-48 hrs.
                </Typography>
            </div>
        );
        return <InfoModal content={modalContent}></InfoModal>;
    }

    render() {
        const { classes, asset, } = this.props;
        const { loading } = this.state;
        
        const AssetInfo = getAssetData(asset.asset_distribution ? asset.asset_distribution : []);

        return (
            <div className={classes.vaultContainer} key={asset.id}>
                <Grid container className={classes.assetSummary}>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.assetNameInfo}
                            variant="h4"
                            noWrap
                        >
                            {asset.strategyInfo}
                        </Typography>
                        <Typography
                            className={classes.assetNameDescription}
                            paragraph
                        >
                            {asset.strategyDescription}
                        </Typography>

                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.sepperator}></div>
                    </Grid>

                     {/** DEPOSIT */}
                    <Grid item sm={6} xs={12} className={classes.tradeBox}>
                        <div className={classes.actionsContainer}>
                            <div className={classes.tradeContainer}>
                                <div className={classes.operationLabel}>
                                    Deposit
                                </div>
                                <div className={classes.balances}>
                                    <Typography
                                        variant="body1"
                                        className={classes.labelMessage}
                                        noWrap
                                    >
                                        Deposit funds into this strategy.
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        className={classes.labelMessage}
                                        noWrap
                                    >
                                        AVAILABLE {asset.balances
                                            ? (
                                                Math.floor(
                                                    asset.balances[this.state.tokenIndex] * 10000
                                                ) / 10000
                                            ).toFixed(4)
                                            : "0.0000"}{" "}
                                        {asset.symbols
                                            ? asset.symbols[this.state.tokenIndex]
                                            : ""}
                                    </Typography>
                                </div>

                                {/** Deposit Input */}
                                {this.renderDepositWithdrawInput(true, asset)}

                                <div>
                                    <BasicModal
                                        title={this.state.openDepositDialogBox ? "Approve Deposit": "Confirm Withdraw"}
                                        subTitle={(this.state.openDepositDialogBox ? "In ": "from ") + asset.strategyName}
                                        contentTemplate={this.state.openDepositDialogBox ? this.depositModalTemplate(classes, asset) : this.withdrawModalTemplate(classes, asset)}
                                        openModal={this.state.openDepositDialogBox || this.state.openWithdrawDialogBox}
                                        setOpenModal={this.state.openDepositDialogBox ? this.setOpenModal : this.setOpenWithdrawModal}
                                    />
                                </div>

                                {/** Deposit Buttons */}
                                <div className={classes.depositButtonBox}>
                                    {asset.deposit === true && (
                                        <Button
                                            className={classes.depositActionButton}
                                            disabled={
                                                loading ||
                                                asset.balance <= 0 ||
                                                asset.depositDisabled === true ||
                                                    this.state.amountError ||
                                               !this.state.amount
                                            }
                                            onClick={() => this.setOpenModal(true)}
                                        >
                                            <span className={classes.actionButtonText}>Deposit</span>
                                        </Button>
                                    )}
                                </div>
                                {asset.depositDisabled === true && (
                                    <div className={classes.disabledContainer}>
                                        <Typography variant="h4">
                                            Deposits are currently disabled for this vault
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Grid>

                    {/** WITHDRAWAL */}
                    <Grid item sm={6} xs={12} className={classes.tradeBox}>
                        <div className={classes.actionsContainer}>
                            <div className={classes.tradeContainer}>
                                <div className={classes.withdrawContainer}>
                                    <div className={classes.tradeContainer}>
                                        <div className={classes.operationLabel}>
                                            Withdrawal
                                            {
                                                (Number(asset.pendingBalance) > 0) &&
                                                <div className={classes.pendingContainer}>

                                                    <Typography
                                                        variant="body2"
                                                        className={classes.labelMessage}
                                                        noWrap
                                                    >
                                                        <span className={classes.padding4Span}>{this.renderPendingInfo()}</span>
                                                        PROCESSING:&nbsp;
                                                        {asset.pendingBalance.toFixed(4)} USD
                                                    </Typography>
                                                </div>
                                            }
                                        </div>
                                        <div className={`${classes.balances} ${classes.alignCenter}`}>
                                            <Typography
                                                variant="body1"
                                                className={classes.labelMessage}
                                                noWrap
                                            >
                                                Withdraw funds from this strategy.
                                            </Typography>

                                            <div>
                                                {/** Available balance for withdraw */}
                                                <Typography
                                                    variant="body2"
                                                    className={classes.labelMessage}
                                                    noWrap
                                                >
                                                    AVAILABLE:&nbsp;
                                                    {asset.strategyBalance && (
                                                        <span>

                                                            {asset.depositedSharesInUSD
                                                                ? (
                                                                    asset.depositedSharesInUSD /
                                                                    asset.priceInUSD[this.state.withdrawTokenIndex]
                                                                ).toFixed(4)
                                                                : "0.0000"}{" "}
                                                            {this.state.selectedWithdrawCurrency}
                                                        </span>
                                                    )}
                                                </Typography>
                                            </div>
                                        </div>
                                        {/** Withdrawal Input */}
                                        {this.renderDepositWithdrawInput(false, asset)}
                                    </div>
                                </div>
                                {/** Withdraw Buttons */}
                                <div className={classes.withdrawButtonBox}>
                                    {asset.withdraw === true && (
                                        <Button
                                            className={classes.withdrawButton}
                                            disabled={
                                                loading ||
                                                (asset.vaultBalance <= 0 &&
                                                    asset.earnBalance <= 0 ** asset.strategyBalance <= 0) ||
                                                this.state.redeemAmountError ||
                                                !this.state.redeemAmount

                                            }
                                            onClick={() => this.setOpenWithdrawModal(true)}
                                            fullWidth
                                        >
                                            <span className={classes.actionButtonText}>Withdraw</span>
                                        </Button>
                                    )}

                                    {/** INVEST Button remember to remove this */}
                                    {  (["daoAXA","daoAXS","daoASA","daoA2S"].includes(asset.vaultSymbol) && store.getStore("network") === 43113 ) && <Button
                                            className={classes.withdrawButton}
                                            onClick={() => this.invest(asset)}
                                            fullWidth
                                        >
                                            <span className={classes.actionButtonText}>Invest</span>
                                        </Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </Grid>

                    {/** PNL CHART */}                        
                    <Grid item xs={12}>
                        <div className={classes.sepperator}></div>
                    </Grid>
                    <Grid item xs={12}>
                        {this.renderChart(asset)}
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.sepperator}></div>
                    </Grid>

                    {/** ASSET DISTRIBUTION */}
                    <Grid item xs={12}>
                        <div>
                            <p className={classes.chartTitle}>Asset Strategy</p>
                            <p className={classes.assetChartDistributionBody}> {asset.strategyInfo}</p>
                        </div>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <PieChart
                            data={AssetInfo}
                        />
                    </Grid>
                    <Grid item sm={6} xs={6}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>COIN</StyledTableCell>
                                    <StyledTableCell align="left">ASSET %</StyledTableCell>
                                    <StyledTableCell align="right">24H CHANGE</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {AssetInfo.map((row) => (
                                    <StyledTableRow key={row.label} hover className={classes.assetRowHover}>
                                        <StyledTableCell component="th" scope="row">
                                            <span className={classes.tokenColorKey}
                                                  style={{"backgroundColor": row.color}}>&nbsp;</span>
                                            <a href={row.infoLink} target="_blank" rel="noopener noreferrer" className={classes.infoLink}>
                                                <span className={classes.strategyCellData}>{row.label}</span>
                                            </a>
                                        </StyledTableCell>
                                        <StyledTableCell align="left" className={classes.strategyCellData}>{row.percent.toFixed(2)} %</StyledTableCell>
                                        <StyledTableCell align="right"
                                                         style={row.textColorStyle} className={classes.strategyCellData}>{row.changeValue}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </div>
        );
    }

    renderChart = (asset) => {
        const {classes} = this.props;
        const chartTitle =  "Vault Performance History";

        let pnl = this.state.vaultAssetHistoricalData  && this.state.vaultAssetHistoricalData.pnl ? this.state.vaultAssetHistoricalData.pnl.toFixed(2) : '0.00';
        const pnlTextColor = parseFloat(pnl) <0?'red':'#15C73E';
        if(parseFloat(pnl) > 0) {
            pnl = '+' + pnl;
        }
        return (
            <>
                <Grid
                    container
                    justifyContent="space-between"
                >
                    <Grid item xs={6} className={classes.pnlDivPosition}>
                        {chartTitle}
                        <span className={classes.pnlVault}
                              style={{color: pnlTextColor}}>{pnl}%</span>
                    </Grid>
                    <Grid item xs={6} className={classes.timeRangeMain}>
                        {this.state.timeRange.map((range, index) => {
                            return <span
                                className={classes.timeRangeLabel + (range.value === this.state.selectedTimeRange ? " " + classes.activeLabel : "")}
                                onClick={() => this.selectRangeLabel(asset, range.value)}
                                key={index}
                            >
                                {range.label}
                            </span>
                        })}
                    </Grid>
                </Grid>
                <LineChart data={this.state.vaultAssetHistoricalData.chartData} title={""}/>
            </>
        );
    };

    // Withdraw Input On Change
    onChange = (event) => {
        let val = [];
        let asset = this.props.asset;
        const decimals = asset.decimals;
        const balance = asset.strategyBalance / 10 ** decimals;
        
        let inputAmount = event.target.value;
        val[event.target.id] = inputAmount;

        const pricePerFullShareInUSD = asset.depositedSharesInUSD / balance;

        let assetTokenAmount = (inputAmount * asset.priceInUSD[this.state.withdrawTokenIndex]) / pricePerFullShareInUSD;
         
        assetTokenAmount = (
            Math.floor(assetTokenAmount * 10 ** 8) /
            10 ** 8
        ).toFixed(8)

        this.verifyWithdrawInput(assetTokenAmount, event.target.value);

        this.setState({
            redeemAmountInUsd: val[event.target.id],
            vaultPercent: 0,
            redeemAmountPercent: 0,
            redeemAmount: assetTokenAmount,
        });
    };

    // Deposit Input On Change
    onChangeDeposit = (event) => {
        let val = [];
        val[event.target.id] = event.target.value;

        this.verifyInput(val[event.target.id]);
        if (event.target.id === "amount") {
            this.setState({amount: val[event.target.id], percent: 0});
        }
    };

    // Verify amount on Withdraw Input
    verifyWithdrawInput = (shareAmount, inputAmount) => {
        const {asset} = this.props;

        const depositedShares = (
            Math.floor((asset.strategyBalance / 10 ** asset.decimals) * 10 ** 8) / 
            10 ** 8
        ).toFixed(8);

        const displayBalance = (asset.depositedSharesInUSD)
            ? (asset.depositedSharesInUSD / asset.priceInUSD[this.state.withdrawTokenIndex]).toFixed(4)
            : 0;

        if( !InputValidation.validateDigit(shareAmount) || 
            InputValidation.validateAmountNotExist(shareAmount) ||
            parseFloat(depositedShares) <= 0
        ) {
          this.setState({
            redeemAmountError: true,
            withdrawErrorMessage: `Invalid amount`,
          });
          return;
        }
  
        if (
            InputValidation.validateInputMoreThanBalance(inputAmount, displayBalance) ||  
            InputValidation.validateInputMoreThanBalance(shareAmount, depositedShares)
        ) {
            this.setState({
                redeemAmountError: true,
                withdrawErrorMessage: `Exceed available balance`,
            });
            return;
        }

        this.setState({redeemAmountError: false, withdrawErrorMessage: ""});
    };

    // Verify amount on Deposit Input
    verifyInput = (amount) => {
        const {asset, happyHour, happyHourThreshold} = this.props;

        let assetBalance = asset.balances[this.state.tokenIndex];
        assetBalance = (Math.floor(assetBalance * 10000) / 10000).toFixed(4);

        if( !InputValidation.validateDigit(amount) || 
            InputValidation.validateAmountNotExist(amount)
        ) {
          this.setState({
            amountError: true,
            errorMessage: `Invalid amount`,
          });
          return;
        }

        if ( InputValidation.validateInputMoreThanBalance(amount, assetBalance)) {
            this.setState({
                amountError: true,
                errorMessage: `Exceed available balance`,
            });
            return;
        }

        this.setState({amountError: false, errorMessage: ""});

        if (asset.happyHourEnabled === true && happyHour === true) {
            if (parseFloat(amount) < parseFloat(happyHourThreshold)) {
                this.setState({
                    // amountError: true,
                    happyHourWarning: `Below required deposit ${happyHourThreshold} USD for Happy Hour. Gas fee will be required.`,
                    happyHourMessage: "",
                });
            } else {
                this.setState({
                    // amountError: true,
                    happyHourWarning: "",
                    happyHourMessage: "Gas fee is on us!",
                });
            }
        }
    };

    // Auto Deposit amount calculation when click on percentage on input
    setAmount = (percent) => {
        if (this.state.loading) {
            return;
        }

        const {asset} = this.props;

        let amount = 0.0;

        amount = (asset.balances[this.state.tokenIndex] * percent) / 100;

        amount = (Math.floor(amount * 10000) / 10000).toFixed(4);
        this.verifyInput(amount);

        this.setState({amount, percent, amountError: false, errorMessage: ""});
    };

    // Auto withdraw amount calculation when click on percentage on input
    setRedeemAmount = (percent) => {
        if (this.state.loading) {
            return;
        }
        const asset = this.props.asset;
        const balance = asset.strategyBalance;
        const decimals = asset.decimals;
        const priceInUsd = asset.depositedSharesInUSD;

        let amount;

        amount = (balance * percent) / 100;
        amount = Math.floor((amount / 10 ** decimals) * 10000) / 10000;

        this.setState({
            redeemAmount: amount.toFixed(4),
            // redeemCoins: ,
            redeemAmountPercent: percent,
            redeemAmountInUsd: (priceInUsd * percent / 100).toFixed(4),
            redeemAmountError: false,
            withdrawErrorMessage: "",
        });
    };
}

export default withRouter(withStyles(styles, {withTheme: true})(Asset));
