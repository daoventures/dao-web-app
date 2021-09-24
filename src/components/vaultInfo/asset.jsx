import * as moment from "moment";

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
    Slider,
    TextField,
    Tooltip,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {
    APPROVE_COMPLETED,
    APPROVE_DEPOSIT_CONTRACT,
    APPROVE_DEPOSIT_SUCCESS,
    CONFIRM_DEPOSIT_CONTRACT,
    DEPOSIT_ALL_CONTRACT,
    DEPOSIT_ALL_CONTRACT_RETURNED,
    DEPOSIT_ALL_CONTRACT_RETURNED_COMPLETED,
    DEPOSIT_CONTRACT,
    DEPOSIT_CONTRACT_RETURNED_COMPLETED,
    ERROR,
    HAPPY_HOUR_VERIFY,
    WITHDRAW_BOTH,
    WITHDRAW_BOTH_VAULT,
    WITHDRAW_BOTH_VAULT_FAIL_RETURNED,
    WITHDRAW_BOTH_VAULT_RETURNED_COMPLETED,
    WITHDRAW_VAULT_RETURNED,
    WITHDRAW_VAULT_RETURNED_COMPLETED,
    ERROR_WALLET_APPROVAL, ERROR_DEPOSIT_WALLET, DEPOSIT_CONTRACT_HAPPY_HOUR_RETURNED_COMPLETED
} from "../../constants";
import React, {Component} from "react";

import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import CloseIcon from "@material-ui/icons/Close";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import InfoIcon from "@material-ui/icons/Info";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Store from "../../stores";
import {getTheme} from "../../theme";
import SimpleTabs from "./Tabs";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import PieChart from '../common/pieChart';
import {
    getAssetData,
    getMappedData,
    strategyMap
} from './vaultUtils';
import BasicModal from '../common/basicModal';
import DoneMark from '../../assets/done.png';

import fromExponential from "from-exponential";
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
    }
});

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
    },
}))(Tooltip);

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
    constructor() {
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
            tokenIndex: 0,
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
            let mappedHistoricalData = getMappedData(apyResponseData.data.chartData || [], asset.id);
            this.setState({vaultAssetHistoricalData: {...mappedHistoricalData, pnl: apyResponseData.data.performanceHistory}});
        }
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

        if (this.validateAmount(amount)) {
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

        asset.symbol = asset.symbols[tokenIndex];
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

    isUsdVault = (asset) => {
        return asset.strategyType === "citadel" ||
            asset.strategyType === "elon" ||
            asset.strategyType === "cuban" ||
            asset.strategyType === "daoFaang" ||
            asset.strategyType === "moneyPrinter" ||
            asset.strategyType === "metaverse" || 
            asset.strategyType === "citadelv2" || 
            asset.strategyType === "daoStonks";
    };

    // Handle input validation message
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
                        {this.isUsdVault(asset) && (
                            <React.Fragment>
                                <div className={classes.accountInfoBlock}>
                                    <div
                                        className={classes.accountInfo}
                                        onClick={() => {
                                            this.handleModalDisplay(true);
                                        }}
                                    >
                                        <img
                                            alt=""
                                            src={require("../../assets/" +
                                                this.state.selectedCurrency +
                                                "-logo.png")}
                                            className={classes.assetIconImg}
                                            style={
                                                asset.disabled
                                                    ? {filter: "grayscale(100%)"}
                                                    : {}
                                            }
                                        />
                                        <span className={classes.addressSpan}>
                            {this.state.selectedCurrency}
                          </span>
                                        <ArrowDropDownCircleIcon
                                            className={classes.arrowDropdownIcon}
                                        />
                                    </div>
                                </div>
                                {this.renderCurrencyModal(asset.symbols)}
                            </React.Fragment>
                        )}
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
                                    disabled={loading}
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
                                    /> {asset.symbol}</StyledTableCellDepositHead>
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
                                    <StyledTableCellDeposit align="right"> {this.state.finalAmount} {asset.symbol}</StyledTableCellDeposit>
                                </StyledTableRow>
                                <StyledTableRow key={"approveDepositFee"}>
                                    <StyledTableCellDeposit align="left">Fee({this.state.feePercentage}%)</StyledTableCellDeposit>
                                    <StyledTableCellDeposit align="right">-{this.state.feeAmount} {asset.symbol}</StyledTableCellDeposit>
                                </StyledTableRow>
                                <StyledTableRow key={"approveDepositTotal"}>
                                    <StyledTableCellDeposit align="left">TOTAL</StyledTableCellDeposit>
                                    <StyledTableCellDeposit
                                        align="right">{this.state.amount} {asset.symbol}</StyledTableCellDeposit>
                                </StyledTableRow>
                            </TableBody>}
                        </Table>
                    </Grid>
                </Grid>
            </div>
            {this.state.needVaultApproval && <div className={classes.depositWarningDiv}>
                <Grid container>
                    {!this.state.isApprovalErrored && <Grid item sm={8} xs={8}>
                        Allow your {asset.symbol} to be deposited in {asset.strategy}
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
                                            this.state.selectedCurrency +
                                            "-logo.png")}
                                        className={classes.assetIconImgModal}
                                        style={
                                            asset.disabled
                                                ? {filter: "grayscale(100%)"}
                                                : {}
                                        }
                                    /> <span className={classes.withdrawTextStandard}>{asset.symbol}</span></StyledTableCellDepositHead>
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
                        <span className={classes.erroredMessage}>Failed to withdraw {this.state.selectedCurrency}
                            <br/> from {asset.strategy} Strategy. <br/>Please try again</span>
                    </Grid>}
                    {this.state.isWithdrawCompleted && <Grid item sm={8} xs={8} className={classes.withdrawMessageBlock}>
                        <span className={classes.withDrawMessage}>Your {this.state.selectedCurrency} has been withdrawn <br/>from {asset.strategy} Strategy <br/>successfully.</span>
                    </Grid>}
                    {this.state.isWithdrawing && <Grid item sm={8} xs={8} className={classes.withdrawMessageBlock}>
                        <span className={classes.withDrawMessage}>Withdrawing your {this.state.selectedCurrency} <br/> in {asset.strategy} Strategy</span>
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


        if (this.validateAmount(amount)) {
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

            if (asset.strategyType === "yearn") {
                dispatcher.dispatch({
                    type: APPROVE_DEPOSIT_CONTRACT,
                    content: {
                        earnAmount: ((amount * earnRatio) / 100).toString(),
                        vaultAmount: ((amount * vaultRatio) / 100).toString(),
                        amount: "0",
                        asset,
                    },
                });
            } else if (asset.strategyType === "compound") {
                dispatcher.dispatch({
                    type: APPROVE_DEPOSIT_CONTRACT,
                    content: {
                        earnAmount: 0,
                        vaultAmount: 0,
                        amount: amount.toString(),
                        asset,
                    },
                });
            } else if (this.isUsdVault(asset)) {
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
    }

    depositTokenToContract = () => {
        const {
            amount,
            earnRatio,
            vaultRatio,
            tokenIndex,
            amountError,
            errorMessage,
        } = this.state;
        const {asset, startLoading} = this.props;

        if (this.validateAmount(amount)) {
            this.setState({
                amountError: true,
                errorMessage: "Invalid amount",
            });
            return;
        }

        if (!amountError && errorMessage === "") {
            this.setState({loading: true, isDepositLoading: true});
            startLoading();

            if (asset.strategyType === "yearn") {
                dispatcher.dispatch({
                    type: CONFIRM_DEPOSIT_CONTRACT,
                    content: {
                        earnAmount: ((amount * earnRatio) / 100).toString(),
                        vaultAmount: ((amount * vaultRatio) / 100).toString(),
                        amount: "0",
                        asset,
                    },
                });
            } else if (asset.strategyType === "compound") {
                dispatcher.dispatch({
                    type: CONFIRM_DEPOSIT_CONTRACT,
                    content: {
                        earnAmount: 0,
                        vaultAmount: 0,
                        amount: amount.toString(),
                        asset,
                    },
                });
            } else if (this.isUsdVault(asset)) {
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
    }

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
        const { classes, asset } = this.props;
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
                                                                    asset.priceInUSD[this.state.tokenIndex]
                                                                ).toFixed(4)
                                                                : "0.0000"}{" "}
                                                            {asset.symbols[this.state.tokenIndex]}
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
                                            <span className={classes.strategyCellData}>{row.label}</span>
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
        var earnAPY = [];
        var vaultAPY = [];
        var compoundAPY = [];
        var citadelAPY = [];
        let ethAPY = [];
        let btcAPY = [];
        var elonAPY = [];
        var cubanAPY = [];
        var faangAPY = [];
        var moneyPrinterAPY = [];
        var metaverseAPY = [];
        var citadelv2APY = [];
        var daoStonksAPY = [];
        var labels = [];

        const {hideNav} = this.state;

        const sortByTimestamp = (a, b) => {
            if (a.timestamp > b.timestamp) return 1;
            if (a.timestamp < b.timestamp) return -1;
            return 0;
        };

        let labelColorData = {};

        if (asset.historicalAPY || asset.historicalPerformance) {
            // this gives an object with dates as keys
            let groups;
            if (
                asset.strategyType === "citadel" ||
                asset.strategyType === "daoFaang"  ||
                asset.strategyType === "cuban"  ||
                asset.strategyType === "elon"  ||
                asset.strategyType === "moneyPrinter" ||
                asset.strategyType === "metaverse" || 
                asset.strategyType === "citadelv2" || 
                asset.strategyType === "daoStonks"
            ) {

                let data = this.state.vaultAssetHistoricalData && this.state.vaultAssetHistoricalData.data && this.state.vaultAssetHistoricalData.data.length ? this.state.vaultAssetHistoricalData.data : asset.historicalPerformance || [];
                labelColorData = this.state.vaultAssetHistoricalData && this.state.vaultAssetHistoricalData.data.length ? this.state.vaultAssetHistoricalData.colorInfo: {};
                groups = data
                    .sort(sortByTimestamp)
                    .reduce((groups, apy) => {
                        const date = moment.unix(apy["time_stamp"]).format("DD-MM-YYYY");
                        if (!groups[date]) {
                            groups[date] = [];
                        }
                        groups[date].push(apy);
                        return groups;
                    }, {});
            } else {
                let data = this.state.vaultAssetHistoricalData  && this.state.vaultAssetHistoricalData.data  && this.state.vaultAssetHistoricalData.data.length ? this.state.vaultAssetHistoricalData.data : asset.historicalAPY || [];
                labelColorData = this.state.vaultAssetHistoricalData && this.state.vaultAssetHistoricalData.data.length ? this.state.vaultAssetHistoricalData.colorInfo: {};
                groups = data
                    .sort(sortByTimestamp)
                    .reduce((groups, apy) => {
                        const date = moment.unix(apy.timestamp / 1000).format("DD-MM-YYYY");
                        if (!groups[date]) {
                            groups[date] = [];
                        }
                        groups[date].push(apy);
                        return groups;
                    }, {});
            }

            try {
                Object.keys(groups).forEach((date) => {
                    // first attempt
                    labels.push(date);
                    if (asset.strategyType === "yearn") {
                        earnAPY.push([
                            date,
                            parseFloat((parseFloat(groups[date][0].aprs) * 100).toFixed(4)),
                        ]);
                        vaultAPY.push([
                            date,
                            parseFloat(groups[date][0].apyInceptionSample.toFixed(4)),
                        ]);
                    } else if (asset.strategyType === "compound") {
                        compoundAPY.push([
                            date,
                            parseFloat(groups[date][0].compoundApy.toFixed(4)),
                        ]);
                    } else if (asset.strategyType === "citadel") {
                        citadelAPY.push([
                            date,
                            parseFloat((groups[date][0]["lp_performance"]).toFixed(4)),
                        ]);
                        btcAPY.push([
                            date,
                            parseFloat((groups[date][0]["btc_performance"]).toFixed(4)),
                        ]);
                        ethAPY.push([
                            date,
                            parseFloat((groups[date][0]["eth_performance"]).toFixed(4)),
                        ]);
                    } else if (asset.strategyType === "citadelv2") {
                        citadelv2APY.push([
                            date,
                            parseFloat((groups[date][0]["lp_performance"]).toFixed(4)),
                        ]);
                        btcAPY.push([
                            date,
                            parseFloat((groups[date][0]["btc_performance"]).toFixed(4)),
                        ]);
                        ethAPY.push([
                            date,
                            parseFloat((groups[date][0]["eth_performance"]).toFixed(4)),
                        ]);
                    } else if (asset.strategyType === "elon") {
                        elonAPY.push([
                            date,
                            parseFloat(groups[date][0]['lp_performance'].toFixed(4)),
                        ]);
                        btcAPY.push([
                            date,
                            parseFloat((groups[date][0]["btc_performance"]).toFixed(4)),
                        ]);
                        ethAPY.push([
                            date,
                            parseFloat((groups[date][0]["eth_performance"]).toFixed(4)),
                        ]);
                    } else if (asset.strategyType === "cuban") {
                        cubanAPY.push([
                            date,
                            parseFloat(groups[date][0]['lp_performance'].toFixed(4)),
                        ]);
                        btcAPY.push([
                            date,
                            parseFloat((groups[date][0]["btc_performance"]).toFixed(4)),
                        ]);
                        ethAPY.push([
                            date,
                            parseFloat((groups[date][0]["eth_performance"]).toFixed(4)),
                        ]);
                    } else if (asset.strategyType === "metaverse") {
                        metaverseAPY.push([
                            date,
                            parseFloat(groups[date][0]['lp_performance'].toFixed(4)),
                        ]);
                        btcAPY.push([
                            date,
                            parseFloat((groups[date][0]["btc_performance"]).toFixed(4)),
                        ]);
                        ethAPY.push([
                            date,
                            parseFloat((groups[date][0]["eth_performance"]).toFixed(4)),
                        ]);
                    } else if (asset.strategyType === "daoFaang") {
                        faangAPY.push([
                            date,
                            parseFloat((groups[date][0]["lp_performance"]).toFixed(4)),
                        ]);
                    } else if (asset.strategyType === "moneyPrinter") {
                        moneyPrinterAPY.push([
                            date,
                            parseFloat(groups[date][0]['lp_performance'].toFixed(4)),
                        ]);
                        btcAPY.push([
                            date,
                            parseFloat((groups[date][0]["btc_performance"]).toFixed(4)),
                        ]);
                        ethAPY.push([
                            date,
                            parseFloat((groups[date][0]["eth_performance"]).toFixed(4)),
                        ]);
                    } else if (asset.strategyType === "daoStonks") {
                        daoStonksAPY.push([
                            date,
                            parseFloat(groups[date][0]['lp_performance'].toFixed(4)),
                        ]);
                        btcAPY.push([
                            date,
                            parseFloat((groups[date][0]["btc_performance"]).toFixed(4)),
                        ]);
                        ethAPY.push([
                            date,
                            parseFloat((groups[date][0]["eth_performance"]).toFixed(4)),
                        ]);
                    }
                    
                    // second attempt
                    var halfCount = Math.round(Number(groups[date].length / 2));
                    if (halfCount !== 1) {
                        labels.push(date);

                        if (asset.strategyType === "yearn") {
                            earnAPY.push([
                                date,
                                parseFloat(
                                    (parseFloat(groups[date][halfCount].aprs) * 100).toFixed(4)
                                ),
                            ]);
                            vaultAPY.push([
                                date,
                                parseFloat(
                                    groups[date][halfCount].apyInceptionSample.toFixed(4)
                                ),
                            ]);
                        } else if (asset.strategyType === "compound") {
                            compoundAPY.push([
                                date,
                                parseFloat(groups[date][halfCount].compoundApy.toFixed(4)),
                            ]);
                        } else if (asset.strategyType === "citadel") {
                            citadelAPY.push([
                                date,
                                parseFloat(groups[date][halfCount].citadelApy.toFixed(4)),
                            ]);
                        } else if (asset.strategyType === "elon") {
                            elonAPY.push([
                                date,
                                parseFloat(groups[date][halfCount].elonApy.toFixed(4)),
                            ]);
                        } else if (asset.strategyType === "cuban") {
                            cubanAPY.push([
                                date,
                                parseFloat(groups[date][halfCount].cubanApy.toFixed(4)),
                            ]);
                        } else if (asset.strategyType === "daoFaang") {
                            faangAPY.push([
                                date,
                                parseFloat(groups[date][halfCount].faangApy.toFixed(4)),
                            ]);
                        } else if (asset.strategyType === "moneyPrinter") {
                            moneyPrinterAPY.push([
                                date,
                                parseFloat(groups[date][halfCount].moneyPrinterApy.toFixed(4)),
                            ]);
                        }
                    }
                });
            } catch (ex) {
            }
        }

        let options = {};

        if (asset.strategyType === "yearn") {
            options = {
                chart: {
                    width: hideNav ? 300 : 420,
                },
                title: {
                    text: "Historical Earn & Vault Performance",
                },
                xAxis: {
                    categories: labels,
                },
                series: [
                    {
                        name: "Earn",
                        data: earnAPY,
                        color: "#7F25D9",
                    },
                    {
                        name: "Vault",
                        data: vaultAPY,
                        color: "#027AFF",
                    },
                ],
                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 450,
                                chartOptions: {
                                    chart: {
                                        width: 300,
                                    },
                                },
                            },
                        },
                    ],
                },
                credits: {
                    enabled: false,
                },
            };
        } else if (asset.strategyType === "compound") {
            options = {
                chart: {
                    width: hideNav ? 300 : 420,
                },
                title: {
                    text: "Vault Performance History",
                },
                xAxis: {
                    categories: labels,
                },
                series: [
                    {
                        name: "Compound",
                        data: compoundAPY,
                    },
                ],
                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 450,
                                chartOptions: {
                                    chart: {
                                        width: 300,
                                    },
                                },
                            },
                        },
                    ],
                },
                credits: {
                    enabled: false,
                },
            };
        } else if (asset.strategyType === "citadel") {
            options = {
                chart: {
                    width: hideNav ? 300 : 420,
                },
                title: {
                    text: "Vault Performance History",
                },
                xAxis: {
                    categories: labels,
                },
                series: [
                    {
                        name: "Citadel",
                        data: citadelAPY,
                        color: labelColorData[strategyMap.Citadel]? labelColorData[strategyMap.Citadel]: "#FFFFF"
                    },
                    {
                        name: "BTC",
                        data: btcAPY,
                        color:  labelColorData[strategyMap.Citadel]? labelColorData[strategyMap.BTC]: "#f7931b",
                    },
                    {
                        name: "ETH",
                        data: ethAPY,
                        color: labelColorData[strategyMap.Citadel]? labelColorData[strategyMap.ETH]:"#464a75",
                    },
                ],
                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 300,
                                chartOptions: {
                                    chart: {
                                        width: 150,
                                    },
                                },
                            },
                        },
                    ],
                },
                credits: {
                    enabled: false,
                },
            };
        } else if (asset.strategyType === "elon") {
            options = {
                chart: {
                    width: hideNav ? 300 : 420,
                },
                title: {
                    text: "Vault Performance History",
                },
                xAxis: {
                    categories: labels,
                },
                series: [
                    {
                        name: "Elon",
                        data: elonAPY,
                        color: labelColorData[strategyMap.Elon]? labelColorData[strategyMap.Elon]: "#FFFFF"
                    },
                    {
                        name: "BTC",
                        data: btcAPY,
                        color:  labelColorData[strategyMap.Citadel]? labelColorData[strategyMap.BTC]: "#f7931b",
                    },
                    {
                        name: "ETH",
                        data: ethAPY,
                        color: labelColorData[strategyMap.Citadel]? labelColorData[strategyMap.ETH]:"#464a75",
                    }
                ],
                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 300,
                                chartOptions: {
                                    chart: {
                                        width: 150,
                                    },
                                },
                            },
                        },
                    ],
                },
                credits: {
                    enabled: false,
                },
            };
        } else if (asset.strategyType === "cuban") {
            options = {
                chart: {
                    width: hideNav ? 300 : 420,
                },
                title: {
                    text: "Vault Performance History",
                },
                xAxis: {
                    categories: labels,
                },
                series: [
                    {
                        name: "Cuban",
                        data: cubanAPY,
                        color: labelColorData[strategyMap.Cuban]? labelColorData[strategyMap.Cuban]: "#FFFFF"
                    },
                    {
                        name: "BTC",
                        data: btcAPY,
                        color:  labelColorData[strategyMap.Citadel]? labelColorData[strategyMap.BTC]: "#f7931b",
                    },
                    {
                        name: "ETH",
                        data: ethAPY,
                        color: labelColorData[strategyMap.Citadel]? labelColorData[strategyMap.ETH]:"#464a75",
                    }
                ],
                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 300,
                                chartOptions: {
                                    chart: {
                                        width: 150,
                                    },
                                },
                            },
                        },
                    ],
                },
                credits: {
                    enabled: false,
                },
            };
        } else if (asset.strategyType === "daoFaang") {
            options = {
                chart: {
                    width: hideNav ? 300 : 420,
                },
                title: {
                    text: "Vault Performance History",
                },
                xAxis: {
                    categories: labels,
                },
                series: [
                    {
                        name: "FAANG Stonk",
                        data: faangAPY,
                        color:  labelColorData[strategyMap['FAANG Stonk']]? labelColorData[strategyMap['FAANG Stonk']]: "#FFFFFF",
                    }
                ],
                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 300,
                                chartOptions: {
                                    chart: {
                                        width: 150,
                                    },
                                },
                            },
                        },
                    ],
                },
                credits: {
                    enabled: false,
                },
            };
        } else if (asset.strategyType === "moneyPrinter") {
            options = {
                chart: {
                    width: hideNav ? 300 : 420,
                },
                title: {
                    text: "Vault Performance History",
                },
                xAxis: {
                    categories: labels,
                },
                series: [
                    {
                        name: "Money Printer",
                        data: moneyPrinterAPY,
                    },
                    {
                        name: "BTC",
                        data: btcAPY,
                        color:  labelColorData[strategyMap["Money Printer"]]? labelColorData[strategyMap.BTC]: "#f7931b",
                    },
                    {
                        name: "ETH",
                        data: ethAPY,
                        color: labelColorData[strategyMap["Money Printer"]]? labelColorData[strategyMap.ETH]:"#464a75",
                    },
                ],
                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 450,
                                chartOptions: {
                                    chart: {
                                        width: 300,
                                    },
                                },
                            },
                        },
                    ],
                },
                credits: {
                    enabled: false,
                },
            };
        } else if (asset.strategyType === "metaverse") {
            options = {
                chart: {
                    width: hideNav ? 300 : 420,
                },
                title: {
                    text: "Vault Performance History",
                },
                xAxis: {
                    categories: labels,
                },
                series: [
                    {
                        name: "Metaverse",
                        data: metaverseAPY,
                        color: labelColorData[strategyMap.Metaverse]? labelColorData[strategyMap.Metaverse]: "#FFFFF"
                    },
                    {
                        name: "BTC",
                        data: btcAPY,
                        color:  labelColorData[strategyMap.Citadel]? labelColorData[strategyMap.BTC]: "#f7931b",
                    },
                    {
                        name: "ETH",
                        data: ethAPY,
                        color: labelColorData[strategyMap.Citadel]? labelColorData[strategyMap.ETH]:"#464a75",
                    }
                ],
                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 450,
                                chartOptions: {
                                    chart: {
                                        width: 300,
                                    },
                                },
                            },
                        },
                    ],
                },
                credits: {
                    enabled: false,
                },
            };
        } else if (asset.strategyType === "citadelv2") {
            options = {
                chart: {
                    width: hideNav ? 300 : 420,
                },
                title: {
                    text: "Vault Performance History",
                },
                xAxis: {
                    categories: labels,
                },
                series: [
                    {
                        name: "Citadel V2",
                        data: citadelv2APY,
                        color: labelColorData[strategyMap["Citadel V2"]] ? labelColorData[strategyMap["Citadel V2"]]: "#FFFFF",
                    }, 
                    {
                        name: "BTC",
                        data: btcAPY,
                        color:  labelColorData[strategyMap.Citadel]? labelColorData[strategyMap.BTC]: "#f7931b",
                    },
                    {
                        name: "ETH",
                        data: ethAPY,
                        color: labelColorData[strategyMap.Citadel]? labelColorData[strategyMap.ETH]:"#464a75",
                    }
                ],
                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 450,
                                chartOptions: {
                                    chart: {
                                        width: 300,
                                    },
                                },
                            },
                        },
                    ],
                },
                credits: {
                    enabled: false,
                },
            };
        } else if (asset.strategyType === "daoStonks") {
            options = {
                chart: {
                    width: hideNav ? 300 : 420,
                },
                title: {
                    text: "Vault Performance History",
                },
                xAxis: {
                    categories: labels,
                },
                series: [
                    {
                        name: "DAO Stonks",
                        data: daoStonksAPY,
                        color: labelColorData[strategyMap["DAO Stonks"]]? labelColorData[strategyMap["DAO Stonks"]]: "#FFFFF"
                    },
                    {
                        name: "BTC",
                        data: btcAPY,
                        color:  labelColorData[strategyMap.Citadel]? labelColorData[strategyMap.BTC]: "#f7931b",
                    },
                    {
                        name: "ETH",
                        data: ethAPY,
                        color: labelColorData[strategyMap.Citadel]? labelColorData[strategyMap.ETH]:"#464a75",
                    }
                ],
                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 450,
                                chartOptions: {
                                    chart: {
                                        width: 300,
                                    },
                                },
                            },
                        },
                    ],
                },
                credits: {
                    enabled: false,
                },
            };
        }

        const chartTitle = {
            yearn: "Historical Earn & Vault Performance",
            compound: "Vault Performance History",
            citadel: "Vault Performance History",
            elon: "Vault Performance History",
            cuban: "Vault Performance History",
            daoFaang: "Vault Performance History",
            moneyPrinter: "Vault Performance History",
            metaverse: "Vault Performance History",
            citadelv2: "Vault Performance History",
            daoStonks: "Vault Performance History"
        };

        // 调整折线图展示
        options["legend"] = {
            align: "right",
            verticalAlign: "bottom",
            padding: 3,
            itemMarginTop: 10,
            itemMarginBottom: 20,
            itemStyle: {
                lineHeight: "14px",
                color: this.state.interestTheme.themeColors.textP,
            },
        };

        options["title"] = {
            text: chartTitle[asset.strategyType],
            align: "left",
            floating: true,
            y: -50,
            style: {
                fontSize: "14px",
                color: this.state.interestTheme.themeColors.textT
            },
        };

        options["chart"] = {
            width: hideNav ? 300 : null,
            backgroundColor: "#292750",
            spacingLeft: 25,
            spacingTop: 70
        };

        options["yAxis"] = {
            gridLineColor: this.state.interestTheme.themeColors.lineT,
            title: {
                text: "",
            },
            labels: {
                style: {
                    color: this.state.interestTheme.themeColors.textP,
                    fontSize: "12px",
                },
                format: "{value}%",
            },
        };

        options["xAxis"] = {
            categories: labels,
            tickColor: this.state.interestTheme.themeColors.lineT,
            lineColor: this.state.interestTheme.themeColors.lineT,
            labels: {
                style: {
                    color: this.state.interestTheme.themeColors.textP,
                    fontSize: "12px",
                },
            },
        };

        options["tooltip"] = {
            backgroundColor: this.state.interestTheme.themeColors.tooltipBack,
            style: {
                color: this.state.interestTheme.themeColors.textT,
            },
            formatter: function () {
                var label =
                    "<b>" + this.x + "</b><br/>" + this.series.name + ": " + this.y + "%";
                return label;
            },
        };

        const {classes} = this.props;
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
                        {options.title.text}
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
                <HighchartsReact
                    highcharts={Highcharts}
                    options={{...options, title: {text: ''}}}
                    style={{margin: "auto"}}
                    containerProps={{className: 'asset-chart'}}
                />
            </>
        );
    };

    onChange = (event) => {
        let val = [];
        let asset = this.props.asset;
        const balance = asset.strategyBalance;
        const decimals = asset.decimals;
        const priceInUsd = asset.depositedSharesInUSD;

        val[event.target.id] = event.target.value;

        let assetTokenAmount = event.target.value * ((balance / 10 ** decimals) / priceInUsd);
        assetTokenAmount = (
            Math.floor(assetTokenAmount * 10 ** 8) /
            10 ** 8
        ).toFixed(8)

        this.verifyWithdrawInput(assetTokenAmount, event.target.id);

        if (event.target.id === "redeemEarnAmount") {
            this.setState({redeemEarnAmount: val[event.target.id], earnPercent: 0});
        } else {
            this.setState({
                redeemAmountInUsd: val[event.target.id],
                vaultPercent: 0,
                redeemAmountPercent: 0,
                redeemAmount: assetTokenAmount,
            });
        }
    };

    onChangeDeposit = (event) => {
        let val = [];
        val[event.target.id] = event.target.value;

        this.verifyInput(val[event.target.id]);
        if (event.target.id === "amount") {
            this.setState({amount: val[event.target.id], percent: 0});
        }
    };

    verifyInput = (amount) => {
        // const { amount } = this.state;
        const {asset, happyHour, happyHourThreshold} = this.props;

        let assetBalance = !this.isUsdVault(asset)
            ? asset.balance
            : asset.balances[this.state.tokenIndex];

        assetBalance = (Math.floor(assetBalance * 10000) / 10000).toFixed(4);

        const digitRegex = /^[0-9]\d*(\.\d+)?$/;

        if (!digitRegex.test(amount)) {
            this.setState({amountError: true, errorMessage: "Invalid amount"});
            return;
        }

        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            this.setState({amountError: true, errorMessage: "Invalid amount"});
            return;
        }

        if (parseFloat(amount) > assetBalance) {
            this.setState({
                amountError: true,
                errorMessage: "Exceed available balance",
            });
            return;
        }

        if (
            parseFloat(amount) <= parseFloat("0.0") ||
            parseFloat(amount) > assetBalance
        ) {
            this.setState({amountError: true});
            // return false;
        } else {
            this.setState({amountError: false, errorMessage: ""});
        }

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

    validateDigit = (amount) => {
        let finalAmount = fromExponential(amount);
        const digitRegex = /^[0-9]\d*(\.\d+)?$/;
        return digitRegex.test(finalAmount);
    };

    validateAmount = (amount) => {
        return !amount || isNaN(amount) || parseFloat(amount) <= 0;
    };

    validateInputValMoreThanBalance = (amount, balance) => {
        return parseFloat(amount) > parseFloat(balance);
    };

    calculateDepositShare = (asset, type) => {
        if (asset.strategyType === "compound") {
            return (
                Math.floor(asset.strategyBalance * asset.compoundExchangeRate * 10000) /
                10000
            ).toFixed(4);
        } else if (this.isUsdVault(asset)) {
            return (
                Math.floor((asset.strategyBalance / 10 ** asset.decimals) * 10000) /
                10000
            ).toFixed(4);
        } else if (asset.strategyType === "yearn") {
            if (type === "earn") {
                return (
                    Math.floor(asset.earnBalance * asset.earnPricePerFullShare * 10000) /
                    10000
                ).toFixed(4);
            } else {
                return (
                    Math.floor(
                        asset.vaultBalance * asset.vaultPricePerFullShare * 10000
                    ) / 10000
                ).toFixed(4);
            }
        } else {
            return 0;
        }
    };

    setRedeemAmountError = (message) => {
        this.setState({redeemAmountError: true, withdrawErrorMessage: message});
    };

    verifyWithdrawInput = (amount, divId) => {
        const {asset} = this.props;

        if (asset.strategyType === "yearn") {
            if (!this.validateDigit(amount)) {
                const errorMessage = "Invalid amount";
                divId === "redeemEarnAmount"
                    ? this.setState({
                        redeemEarnAmountError: true,
                        withdrawEarnErrorMessage: errorMessage,
                    })
                    : this.setState({
                        redeemAmountError: true,
                        withdrawErrorMessage: errorMessage,
                    });
                return;
            }

            // No need to validate 0 input, as either one of them can be 0
            if (!amount || isNaN(amount) || parseFloat(amount) < 0) {
                const errorMessage = "Invalid amount";
                divId === "redeemEarnAmount"
                    ? this.setState({
                        redeemEarnAmountError: true,
                        withdrawEarnErrorMessage: errorMessage,
                    })
                    : this.setState({
                        redeemAmountError: true,
                        withdrawErrorMessage: errorMessage,
                    });
                return;
            }

            const depositedShares = this.calculateDepositShare(
                asset,
                divId === "redeemEarnAmount" ? "earn" : "vault"
            );

            if (this.validateInputValMoreThanBalance(amount, depositedShares)) {
                const errorMessage = "Exceed Available Balance";
                divId === "redeemEarnAmount"
                    ? this.setState({
                        redeemEarnAmountError: true,
                        withdrawEarnErrorMessage: errorMessage,
                    })
                    : this.setState({
                        redeemAmountError: true,
                        withdrawErrorMessage: errorMessage,
                    });
                return;
            }

            divId === "redeemEarnAmount"
                ? this.setState({
                    redeemEarnAmountError: false,
                    withdrawEarnErrorMessage: "",
                })
                : this.setState({redeemAmountError: false, withdrawErrorMessage: ""});
        } else {
            if (!this.validateDigit(amount)) {
                this.setRedeemAmountError("Invalid amount");
                return;
            }

            if (this.validateAmount(amount)) {
                this.setRedeemAmountError("Invalid amount");
                return;
            }

            const depositedShares = this.calculateDepositShare(asset, null);

            if(depositedShares <= 0 ) {
                this.setRedeemAmountError("Invalid amount");
                return;
            }

            if (this.validateInputValMoreThanBalance(amount, depositedShares)) {
                this.setRedeemAmountError("Exceed available balance");
                return;
            }

            this.setState({redeemAmountError: false, withdrawErrorMessage: ""});
        }
    };

    verifyInput = (amount) => {
        const {asset, happyHour, happyHourThreshold} = this.props;

        let assetBalance = !this.isUsdVault(asset)
            ? asset.balance
            : asset.balances[this.state.tokenIndex];

        assetBalance = (Math.floor(assetBalance * 10000) / 10000).toFixed(4);

        if (!this.validateDigit(amount)) {
            this.setState({amountError: true, errorMessage: "Invalid amount"});
            return;
        }

        if (this.validateAmount(amount)) {
            this.setState({amountError: true, errorMessage: "Invalid amount"});
            return;
        }

        if (this.validateInputValMoreThanBalance(amount, assetBalance)) {
            this.setState({
                amountError: true,
                errorMessage: "Exceed available balance",
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

    onWithdraw = () => {
        let {redeemEarnAmount, redeemAmount, tokenIndex} = this.state;

        const {asset, startLoading} = this.props;

        if (asset.strategyType === "yearn") {
            // Both input field are blank
            if (
                (!redeemAmount || isNaN(redeemAmount)) &&
                (!redeemEarnAmount || isNaN(redeemEarnAmount))
            ) {
                this.setState({
                    redeemAmountError: true,
                    redeemEarnAmountError: true,
                    withdrawErrorMessage: "Invalid amount",
                    withdrawEarnErrorMessage: "Invalid amount",
                });
                return;
            }

            if (
                !this.state.redeemAmountError &&
                this.state.withdrawErrorMessage === "" &&
                !this.state.redeemEarnAmountError &&
                this.state.withdrawEarnErrorMessage === ""
            ) {
                redeemAmount = redeemAmount
                    ? (Math.floor(redeemAmount * 10000) / 10000).toFixed(4)
                    : 0;
                redeemEarnAmount = redeemEarnAmount
                    ? (Math.floor(redeemEarnAmount * 10000) / 10000).toFixed(4)
                    : 0;

                this.setState({loading: true, isWithdrawing: true});
                startLoading();

                dispatcher.dispatch({
                    type: WITHDRAW_BOTH,
                    content: {
                        earnAmount: redeemEarnAmount.toString(),
                        vaultAmount: redeemAmount.toString(),
                        amount: "0",
                        asset: asset,
                        tokenIndex
                    },
                });
            }
        } else if (asset.strategyType === "compound") {
            if (this.validateAmount(redeemAmount)) {
                this.setState({
                    redeemAmountError: true,
                    withdrawErrorMessage: "Invalid amount",
                });
                return;
            }

            if (!this.state.redeemAmountError && this.withdrawErrorMessage !== "") {
                this.setState({loading: true, isWithdrawing: true});
                startLoading();

                redeemAmount = (Math.floor(redeemAmount * 10000) / 10000).toFixed(4);

                dispatcher.dispatch({
                    type: WITHDRAW_BOTH,
                    content: {
                        earnAmount: "0",
                        vaultAmount: "0",
                        amount: redeemAmount.toString(),
                        asset: asset,
                    },
                });
            }
        } else if (this.isUsdVault(asset)) {
            if (this.validateAmount(redeemAmount)) {
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
                        tokenIndex: tokenIndex,
                    },
                });
            }
        }
    };

    setAmount = (percent) => {
        if (this.state.loading) {
            return;
        }

        const {asset} = this.props;

        let amount = 0.0;

        if (this.isUsdVault(asset)) {
            amount = (asset.balances[this.state.tokenIndex] * percent) / 100;
        } else {
            const balance = asset.balance;
            amount = (balance * percent) / 100;
        }

        amount = (Math.floor(amount * 10000) / 10000).toFixed(4);
        this.verifyInput(amount);

        this.setState({amount, percent, amountError: false, errorMessage: ""});
    };

    setCurrency = (tokenIndex) => {
        if (this.state.loading) {
            return;
        }

        const {asset} = this.props;

        asset.symbol = asset.symbols[tokenIndex];
        asset.balance = asset.balances[tokenIndex];
        asset.erc20address = asset.erc20addresses[tokenIndex];

        this.setState({tokenIndex: tokenIndex});
    };

    setRedeemAmount = (percent) => {
        if (this.state.loading) {
            return;
        }
        const asset = this.props.asset;
        const balance = asset.strategyBalance;
        const decimals = asset.decimals;
        const priceInUsd = asset.depositedSharesInUSD;


        let amount;

        if (this.isUsdVault(asset)) {
            amount = (balance * percent) / 100;
            amount = Math.floor((amount / 10 ** decimals) * 10000) / 10000;
        } else {
            amount = (balance * percent) / 100;
            amount = Math.floor(amount * 10000) / 10000;
        }

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
