import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Store from "../../stores/storev2"; // Update this
import { Typography, 
    Button, 
    Dialog, 
    DialogContent, 
    IconButton,
    CircularProgress 
} from "@material-ui/core";
import { CONFIRM_CLAIM_DVD, 
    CLAIM_DVD_SUCCESS, 
    CLAIM_DVD_ERROR, 
    CLAIM_DVD_HASH,
    BLOCK_EXPLORERS
} from "../../constants/constants";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Celebrate from '../../assets/img_new/vaults/celebrate.svg';
import DAOventures from '../../assets/img_new/airdrop/DAOventures.svg';
import WrappedGift from "../../assets/img_new/airdrop/wrapped-gift.svg";

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

const styles = (theme) => ({
    flexCenter: {
        display: "flex",
        alignItems: "center",
    },
    flexColumn: {
        flexDirection: "column"
    },
    flexRow: {
        flexDirection: "row"
    },
    h50: {
        height: "20vh",
    },
    padding30: {
        padding: "30px",
    },
    width40: {
        width: "40%"
    },
    airDropContainer: {
        width: "100%",
        color: "#ffffff",
        background: "linear-gradient(141.11deg, #1D0D48 6.13%, rgba(111, 79, 199, 0.503561) 47.59%, rgba(144, 126, 194, 0) 89.65%)" 
    },
    logo: {
        width: '43px',
        height: '49px',
        margin: '15px'
    },
    celebrateSVG: {
        height: "17px",
        padding: "2px 5px 0 5px"
    },
    appreciationContainer: {
        textAlign: "center",
        margin: "15px"
    },
    claimButton: {
        height: "42px",
        margin: "15px",
        background: "#7B25D266",
        borderColor: theme.themeColors.border,
        color: theme.themeColors.textT,
        padding: "15px",
        borderRadius: "0px",
        cursor: "pointer",
        flex: "1",
        fontSize: "12px",
        "&:hover": {
            background: theme.themeColors.btnBack,
        },
        "&.Mui-disabled": {
            borderColor: theme.themeColors.btnDisabled,
            cursor: "not-allowed",
            color: theme.themeColors.textD,
        },
    },
    claimButtonText:{
        fontSize: "12px"
    },
    dialogRoot: {
        border: "1px solid " + theme.themeColors.border,
        background: "linear-gradient(144.77deg, #1D0D48 3.91%, rgba(111, 79, 199 , 0.9) 50.04%, rgba(144, 126, 194, 0) 150.84%)",
        color: "#ffffff",
    },
    dialogTitle: {
        color: theme.themeColors.menuSelText,
        minHeight: "60px",
    },
    dialogContent: {
        padding: "0px",
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.themeColors.menuSelText,
    },
    title: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "18px"
    },
    claimDVDContainer: {
        background: theme.themeColors.itemBack,
        padding: "20px 50px 20px 50px",
    },
    claimDVDLinkContainer: {
        margin: "10px 0px"
    },
    claimDVDLink: {
        color: theme.themeColors.textT,
        marginTop: "3px",
        marginBottom: "3px"
    },
    claimInProgressContainer: {
        height: "350px"
    },
    progressIconContainer: {
        margin: "30px 0px"
    },
    claimInProgressTitle: {
        marginTop: "10px",
        textAlign: "center",
        marginLeft: "35px",
        marginRight: "35px"
    },
    claimInProgressSubtitle: {
        marginTop: "40px"
    },
    grayText: {
        color: theme.themeColors.textGray
    },
    purpleText: {
        color: theme.themeColors.textP
    },
    whiteText: {
        color: theme.themeColors.textT
    }
})

class AirDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            network: store.getStore("network"),
            logoPath: "../../assets/DAO-logo.png",
            openModal: false,
            isClaimDVD: false,
            isClaimInProgress: false,
            isClaimSuccess: false,
            isClaimError: false,
            isAllDVDBeingClaimed: false,
            isUserClaimedDVDBefore: false,
            airdropInfo: this.props.info,
            disableButton: false,
            isHashGenerated: false,
            hashLink: ""
        }
    }

    componentDidMount() {
        emitter.on(CLAIM_DVD_SUCCESS, this.handleSuccessfulDVDClaim);
        emitter.on(CLAIM_DVD_HASH, this.handleTransactionHashGenerated);
        emitter.on(CLAIM_DVD_ERROR, this.handleErrorClaim);
    }

    componentDidUpdate(prevProps) {
        // Update airdrop info to the latest info from props, if wallet address is changing.
        if(prevProps.info) {
            const info = prevProps.info;
            if(info.address !== this.state.airdropInfo.address) {
                this.setState({airdropInfo: info});
                this.airdropConditionChecking();
            }
        }
    }

    componentWillUnmount() {
        emitter.removeListener(CLAIM_DVD_SUCCESS, this.handleSuccessfulDVDClaim);
        emitter.removeListener(CLAIM_DVD_HASH, this.handleTransactionHashGenerated);
        emitter.removeListener(CLAIM_DVD_ERROR, this.handleErrorClaim);
    }

    closeModal = () => {
        this.setState({
            openModal: false,
            isClaimDVD: false,
            isClaimInProgress: false,
            isClaimSuccess: false,
            isClaimError: false,
            disableButton: false,
            isHashGenerated: false,
            hashLink: ""
        });
    }

    setOpenModal = (openModal = false) => {
        this.setState({ openModal });
        this.airdropConditionChecking();
    }

    claimDVD = () => {
        const { isAllDVDBeingClaimed, isUserClaimedDVDBefore} = this.state;
        this.setState({isClaimDVD: true});

        console.log(`claim dvd all being claim ${isAllDVDBeingClaimed},claim before ${isUserClaimedDVDBefore}`);
        if(isAllDVDBeingClaimed || isUserClaimedDVDBefore) {
            return;
        } else {
            this.setState({ isClaimInProgress: true });
            dispatcher.dispatch({ type: CONFIRM_CLAIM_DVD });
        }
    }

    airdropConditionChecking = async() => {
        this.setState({ disableButton: true });

        const isAllDVDBeingClaimed = await store.checkIsAllDVDBeingClaimed();
        this.setState({ isAllDVDBeingClaimed });
        console.log(`is all dvd being claimed ${isAllDVDBeingClaimed}`);
        
        if(!isAllDVDBeingClaimed) {
            const isUserClaimedDVDBefore = await store.processedAirdrops();
            this.setState({ isUserClaimedDVDBefore });
            console.log(`is user claimed before ${isUserClaimedDVDBefore}`);
           
            // const isUserClaimedDVDBefore = false; // For testing purpose
            // this.setState({ isUserClaimedDVDBefore });
            // console.log(`is user claimed before ${isUserClaimedDVDBefore}`);
        }

        this.setState({ disableButton: false });
    }

    handleSuccessfulDVDClaim = (transactionHash) => {
        this.setState({
            isClaimInProgress: false,
            isClaimSuccess: true,
        });
    }

    handleErrorClaim = (error) => {
        this.setState({
            isClaimInProgress: false,
            isClaimSuccess: false,
            isClaimError: true
        })
    }

    handleTransactionHashGenerated = (transactionHash) => {
        const blockExplorer = BLOCK_EXPLORERS[this.state.network];
        const hashLink = blockExplorer + transactionHash;
        this.setState({
            isHashGenerated: true,
            hashLink
        })
    }

    getAirdropAmount = () => {
        const {airdropInfo} = this.state;
        const amount = (airdropInfo !== undefined && airdropInfo.amount)
            ? airdropInfo.amount / 10 ** 18
            : 0 
        return `${amount} DVD`
    }

    claimDVDInProgress = () => {
        const { classes } = this.props;
        const {
            isAllDVDBeingClaimed,
            isUserClaimedDVDBefore,
            isClaimInProgress,
            isClaimSuccess,
            isClaimError,
            isHashGenerated,
            hashLink
        } = this.state;

        const claimContent = <div className={`${classes.flexCenter} ${classes.flexColumn}`}>
            <div className={`${classes.flexCenter} ${classes.flexColumn} ${classes.claimInProgressContainer}`}>
                <div className={`${classes.progressIconContainer}`}>
                    { (isAllDVDBeingClaimed || isUserClaimedDVDBefore || !isClaimInProgress) &&
                        <img className={classes.logo} src={DAOventures} style={{width: "65px", height: "75px"}} alt="" /> 
                    }
                    { isClaimInProgress && <CircularProgress color="#FFFFFF" size="60px" />}
                </div>

                <div className={`${classes.claimInProgressTitle}`}>
                    {/** Claimed Previously */}
                    {  isUserClaimedDVDBefore && 
                        <Typography variant={"h3"}>
                            Oops! Looks like you have already claimed your ${this.getAirdropAmount()}
                        </Typography>
                    }
                    {/** All DVD being claimed */}
                    { isAllDVDBeingClaimed && 
                        <Typography variant={"h3"}>
                            Oops! Looks like all the Airdrop amount has been claimed
                        </Typography>
                    }
                    {/**  Successfully Claimed */}
                    { (!isClaimInProgress && isClaimSuccess) &&
                        <Typography variant={"h3"} className={classes.purpleText}>
                            {this.getAirdropAmount()}
                        </Typography> 
                    }
                    {/** Claim Error */}
                    { (!isClaimInProgress && !isClaimSuccess && isClaimError) && 
                        <Typography variant={"h3"}>
                            Oops ! Something went wrong, please try again.
                        </Typography> 
                    }
                    {/** Claim In Progress */}
                    { isClaimInProgress && <Typography variant={"h3"}>Claiming</Typography>}
                </div>

                <div className={`${classes.claimInProgressTitle}`}>
                    {/** Claim In Progress */}
                    {
                        isClaimInProgress && 
                        <Typography variant={"h2"} className={`${classes.purpleText}`}>
                            {this.getAirdropAmount()}
                        </Typography>
                    }

                    {/**  Successfully Claimed */}
                    { (!isClaimInProgress && isClaimSuccess) &&
                        <Typography variant={"h3"}>Claimed</Typography> 
                    }
                </div>

                <div className={`${classes.textGray} ${classes.claimInProgressSubtitle}`}>
                    {/** Claim In Progress */} 
                    { (isClaimInProgress && !isHashGenerated) &&  <Typography variant={"h5"}>Confirm this transaction in your wallet.</Typography>}
                    { (isClaimInProgress && isHashGenerated) &&  
                        <div className={`${classes.flexCenter} ${classes.flexRow}`}>
                            <Typography variant={"h5"}>
                                View your transaction hash 
                                <a href={hashLink} rel="noopener noreferrer" target="_blank" className={classes.whiteText} style={{marginLeft: "5px"}}>here</a>
                            </Typography>

                        </div>
                    }

                    {/** Successfully Claimed and Claimed Previously */}
                    {
                        ((!isClaimInProgress && isClaimSuccess) || isUserClaimedDVDBefore) && 
                        <div className={`${classes.flexCenter} ${classes.flexRow}`}>
                            <img className={classes.celebrateSVG} src={Celebrate} alt=""/>
                            <Typography variant={"h4"}>Welcome to DAOventures</Typography>
                            <img className={classes.celebrateSVG} src={Celebrate} alt=""/>
                        </div>
                    }
                  
                    {/**  All DVD being Claimed */}
                    { isAllDVDBeingClaimed &&
                        <div className={`${classes.flexCenter} ${classes.flexRow}`}>
                            <img className={classes.celebrateSVG} src={WrappedGift} alt=""/>
                            <Typography variant={"h4"}>Come back later for more rewards :)</Typography>
                            <img className={classes.celebrateSVG} src={WrappedGift} alt=""/>
                        </div> 
                    }
                </div>
            </div>
        </div>

        return claimContent;
    }

    claimDVDContent = () => {
        const { classes } = this.props;
        const { disableButton } = this.state;

        const claimContent = <div className={`${classes.flexCenter} ${classes.flexColumn}`}>
            <div className={`${classes.h50} ${classes.padding30}`}>
                <Typography variant={"h2"} className={`${classes.padding30}`}>
                    {this.getAirdropAmount()}
                </Typography>
            </div>
            <div className={`${classes.claimDVDContainer} ${classes.textGray}`}>
                <Typography variant={"h5"}>
                    As a member of DAOventures community you may claim DVD to be used for Voting and Governance.
                </Typography>

                <div className={classes.claimDVDLinkContainer}>
                    <a className={classes.claimDVDLink} href="https://www.google.com">Read more about DVD</a>
                </div>

                <div className={classes.flexCenter}>
                    <Button className={`${classes.width40} ${classes.claimButton}`}
                        disabled={disableButton}
                        onClick={()=> this.claimDVD()}>
                        <span className={classes.claimButtonText}>
                            Claim DVD
                        </span>
                    </Button>
                </div>
            </div>
        </div>

        return claimContent;
    }

    renderModal = () => {
        const { classes } = this.props;
        const { 
            openModal,
            isClaimDVD,
        } = this.state;

        // When user first entry, haven't start to claim DVD yet
        let titleTemplate; 
        if(!isClaimDVD) {
            titleTemplate = <div>
               Claim DVD
            </div>
        }
        
        return (
            <Dialog
                onClose={this.closeModal}
                fullWidth={true}
                minWidth={"sm"}
                classes={{ paper: classes.dialogRoot }}
                aria-labelledby="customized-dialog-title"
                open={openModal}
            >
                <MuiDialogTitle disableTypography className={classes.dialogTitle}>
                    { (titleTemplate !== undefined) && titleTemplate }
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={() => this.closeModal()}
                    >
                        <CloseIcon />
                    </IconButton>
                </MuiDialogTitle>

                <DialogContent dividers className={classes.dialogContent}>
                    <div>
                        { !isClaimDVD && this.claimDVDContent() }
                        { isClaimDVD  && this.claimDVDInProgress() }
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    render() {
        const { classes } = this.props;
        const { openModal } = this.state;
       
        return <div className={`${classes.flexCenter} ${classes.flexColumn} ${classes.airDropContainer}`}>
            <div>
                <img className={classes.logo} src={DAOventures} alt="" />
            </div>
            <div className={`${classes.flexCenter} ${classes.flexRow}`}>
                <img className={classes.celebrateSVG} src={Celebrate} alt=""/>
                <Typography variant={"h4"}>
                   {this.getAirdropAmount()}
                </Typography>
                <img className={classes.celebrateSVG} src={Celebrate} alt=""/>
            </div>
            <div className={classes.appreciationContainer}>
                <Typography variant={"h5"}>
                    Thanks for being part of our community :)
                </Typography>
            </div>
            <div>
                <Button className={`${classes.claimButton}`}
                    onClick={()=> this.setOpenModal(true)}>
                    <span className={classes.claimButtonText}>
                        Claim your DVD Token
                    </span>
                </Button>
            </div>
            {openModal && this.renderModal()}
        </div>;
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(AirDrop))) 