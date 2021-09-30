import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Store from "../../stores/storev2"; // Update this
import { Typography, Button, Dialog, DialogContent, IconButton, CircularProgress } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Celebrate from '../../assets/img_new/vaults/celebrate.svg';


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
        textAlign: "center"
    },
    claimInProgressSubtitle: {
        marginTop: "40px"
    },
    grayText: {
        color: theme.themeColors.textGray
    },
    purpleText: {
        color: theme.themeColors.textP
    }
})

class AirDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoPath: "../../assets/DAO-logo.png",
            openModal: false,
            isClaimDVD: false,
            isClaimInProgress: false,
            isClaimSuccess: false,
            isAllDVDBeingClaimed: false,
            isUserClaimedDVDBefore: false,
            airdropInfo: this.props.info
        }
    }

    componentDidMount() {
        this.airdropConditionChecking();
    }

    closeModal = () => {
        this.setState({
            openModal: false,
            isClaimDVD: false,
            isClaimInProgress: false,
            isClaimSuccess: false,
            isAllDVDBeingClaimed: false,
            isUserClaimedDVDBefore: false,
        });
    }

    setOpenModal = (openModal = false) => {
        this.setState({ openModal });
    }

    claimDVD = () => {
        const { isAllDVDBeingClaimed, isUserClaimedDVDBefore} = this.state;
        this.setState({isClaimDVD: true});

        console.log(`all being claim ${isAllDVDBeingClaimed}, claim before ${isUserClaimedDVDBefore}`);
        if(isAllDVDBeingClaimed || isUserClaimedDVDBefore) {
            return;
        } else {
            this.setState({ isClaimInProgress: true })
        }
    }

    getAirdropAmount = () => {
        const {airdropInfo} = this.state;
        const amount = (airdropInfo !== undefined && airdropInfo.amount)
            ? airdropInfo.amount / 10 ** 18
            : 0 
        return `${amount} DVD`
    }

    airdropConditionChecking = async() => {
        const isAllDVDBeingClaimed = await store.checkIsAllDVDBeingClaimed();
        this.setState({ isAllDVDBeingClaimed });

        // const isAllDVDBeingClaimed = false;
        // this.setState({ isAllDVDBeingClaimed });
    
        if(!isAllDVDBeingClaimed) {
            const isUserClaimedDVDBefore = await store.processedAirdrops();
            this.setState({ isUserClaimedDVDBefore });

            // const isUserClaimedDVDBefore = false;
            // this.setState({ isUserClaimedDVDBefore });
        }
    }

    claimDVDInProgress = () => {
        const { classes } = this.props;
        const {
            isAllDVDBeingClaimed,
            isUserClaimedDVDBefore,
            isClaimInProgress,
            isClaimSuccess
        } = this.state;

        const claimContent = <div className={`${classes.flexCenter} ${classes.flexColumn}`}>
            <div className={`${classes.flexCenter} ${classes.flexColumn} ${classes.claimInProgressContainer}`}>
                <div className={`${classes.progressIconContainer}`}>
                    { (isAllDVDBeingClaimed || isUserClaimedDVDBefore) &&
                        <img className={classes.logo} src={require('../../assets/DAO-logo.png')} style={{width: "65px", height: "75px"}} alt="" /> 
                    }
                    { isClaimInProgress && <CircularProgress color="#FFFFFF" size="60px" />}
                </div>

                <div className={`${classes.claimInProgressTitle}`}>
                    {/** Claimed Previously */}
                    { isUserClaimedDVDBefore && 
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
                    {isClaimInProgress &&  <Typography variant={"h5"}>Confirm this transaction in your wallet.</Typography>}

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
                            <img className={classes.celebrateSVG} src={Celebrate} alt=""/>
                            <Typography variant={"h4"}>Come back later for more rewards :)</Typography>
                            <img className={classes.celebrateSVG} src={Celebrate} alt=""/>
                        </div> 
                    }
                </div>
            </div>
        </div>

        return claimContent;
    }

    claimDVDContent = () => {
        const { classes } = this.props;

        const claimContent = <div className={`${classes.flexCenter} ${classes.flexColumn}`}>
            <div className={`${classes.h50} ${classes.padding30}`}>
                <Typography variant={"h2"} className={`${classes.padding30}`}>
                    {this.getAirdropAmount()}
                </Typography>
            </div>
            <div className={`${classes.h50} ${classes.claimDVDContainer} ${classes.textGray}`}>
                <Typography variant={"h5"}>
                    As a member of DAOventures community you may claim DVD to be used for Voting and Governance.
                </Typography>

                <div className={classes.claimDVDLinkContainer}>
                    <a className={classes.claimDVDLink} href="https://www.google.com">Read more about DVD</a>
                </div>

                <div className={classes.flexCenter}>
                    <Button className={`${classes.width40} ${classes.claimButton}`}
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
                <img className={classes.logo} src={require('../../assets/DAO-logo.png')} alt="" />
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