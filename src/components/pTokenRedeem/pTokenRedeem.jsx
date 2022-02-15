import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { Typography, Button } from "@material-ui/core";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { CHANGE_NETWORK, REDEEM_PTOKEN_ERROR, REDEEM_PTOKEN_HASH, REDEEM_PTOKEN_SUCCESS, CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from "../../constants/constants";
import Store from "../../stores/storev2"; // Update this
import SuportedNetwork from "../supportedNetwork/supportedNetwork";
import ConnectWallet from "../common/connectWallet/connectWallet";
import RedeemInput from "./redeemInput";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

const styles = (theme) => ({
    root: {
        width: "100%",
        paddingLeft: "320px",
        paddingRight: "80px",
        paddingTop: "32px",
        color: theme.themeColors.textT,
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "0px",
            paddingRight: "0px",
            paddingTop: "40px",
        },
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row",
    },
    redeemContainer: {
        width: "100%", 
        background: "#292750"
        // border: "1px solid "+ theme.themeColors.border,
    },
    switchNetworkButton: {
        height: "42px",
        margin: "16px 0px",
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
    titleContainer: {
        display: "flex",
        height: "48px",
        padding: "0px 19px",
        alignItems: "center",
        flexDirection: "row",
        background: theme.themeColors.menuSel,
        color: theme.themeColors.textT
    }, 
    title: {
        fontSize: "18px", 
        fontWeight: 400
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    }, 
    justifyCenter: {
        justifyContent: "center",
    },
    alignCenter: {
        alignItems: "center"
    }, 
    swapContainer: {
        padding: "16px 72px 48px 72px", 
        display: "flex",
        flexDirection: "column"
    }, 
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "16px 0px"
    },
    buttonContainer: {
        marginTop: "8px"
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
        }
    },
});

const supportedNetwork = [1, 4];
class PTokenRedeem extends Component { 
    constructor(props) {
        super(props);

        const account = store.getStore("account");

        this.state = {
            networkId: store.getStore("networkId"),
            account: store.getStore("account"),
            supportedNetwork: supportedNetwork, // Only supported on Rinkeby and Ethereum Network
            disableTransact : this.checkSupportedNetwork(supportedNetwork),
            token: "DVD", 
            redeemerInfo: null
        }

        // Check network after reload the page
        if (performance.getEntriesByType("navigation")[0].type === "reload") {
            
            this.state.disableTransact = this.checkSupportedNetwork(supportedNetwork);

            if(account && account.address) {
                this.checkRedeemerInfo();
            }
        }
    }

    componentWillMount() {
        emitter.on(CHANGE_NETWORK, this.networkChanged)
        emitter.on(CONNECTION_CONNECTED, this.walletConnected);
        emitter.on(CONNECTION_DISCONNECTED, this.walletDisconnected);
        emitter.on(REDEEM_PTOKEN_SUCCESS, this.handleSuccessfulRedeem);
        emitter.on(REDEEM_PTOKEN_HASH, this.handleRedeemHashGenerated);
        emitter.on(REDEEM_PTOKEN_ERROR, this.handleRedeemError);
    }

    componentWillUnmount() {
        emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
        emitter.removeListener(CONNECTION_CONNECTED, this.walletConnected);
        emitter.removeListener(CONNECTION_DISCONNECTED, this.walletDisconnected);
        emitter.removeListener(REDEEM_PTOKEN_SUCCESS, this.handleSuccessfulRedeem);
        emitter.removeListener(REDEEM_PTOKEN_HASH, this.handleRedeemHashGenerated);
        emitter.removeListener(REDEEM_PTOKEN_ERROR, this.handleRedeemError);
    }

    networkChanged = (obj) => {
        const networkId = obj.network;
        this.setState({
          networkId: networkId,
        });
        this.checkSupportedNetwork(supportedNetwork);
    };

    walletConnected = () => {
        this.setState({
            account: store.getStore("account")
        });

        // Get user PToken Info
        this.checkRedeemerInfo();

    }

    walletDisconnected = () => {
        this.setState({
            account: null,
            address: null,
            open: false
        });
    };

    checkSupportedNetwork = (supportedNetwork) => {
        const account = store.getStore("account").address;
        const network = store.getStore("network");

        if(supportedNetwork !== undefined && account !== undefined) {
            const isNetworkSupported = account !== undefined && supportedNetwork.includes(network);
            
            this.setState({ 
                disableTransact: !isNetworkSupported
            })

            if(!isNetworkSupported) {
                return;
            }

            this.checkRedeemerInfo();
        }
    }

    checkRedeemerInfo = async() => {
        const redeemerInfo = await store.getUserPD33DInfo();
       
        const that = this;
        that.setState({
            redeemerInfo
        })

    }


    handleSuccessfulRedeem = () => {

    }

    handleRedeemHashGenerated = () => {

    }

    handleRedeemError = () => {

    }

    handleInput = (event) => {

    }

    handleTokenSelected = (event) => {
       if(event!==undefined && event!==null) {
            this.setState({token : event.label})
       }
    }

    render() {
        const { classes } = this.props;
        const { account, token, redeemerInfo } = this.state;

        if (!account || !account.address) {
            return <ConnectWallet></ConnectWallet>;
        }

        return <>
            <div className={classes.root}>
                <div className={classes.contentContainer}>
                    <div className={classes.redeemContainer}>
                        {/** Title Container */}
                        <div className={classes.titleContainer}>
                            <Typography className={classes.title}>Swap ({token} - PD33D)</Typography>
                        </div>

                        {/** Action Container */}
                        <div style={{padding: "0px 19px", marginTop: "24px"}}>
                            <Typography variant="body" style={{ marginTop: "16px" }}>Convert your {token} token into PD33D</Typography>

                            {/** Swap */}
                            <div className={classes.swapContainer}>
                                <div className={classes.inputContainer}>
                                    <RedeemInput redeemerInfo={redeemerInfo} handleInput={this.handleInput} handleTokenSelected={this.handleTokenSelected} />
                                    
                                    <div style={{margin: "0px 16px"}}>
                                        <ArrowForwardIcon/>
                                    </div>
                                   
                                    <RedeemInput redeemerInfo={redeemerInfo} handleInput={this.handleInput} handleTokenSelected={this.handleTokenSelected} />

                                </div>

                                <div className={classes.buttonContainer}>
                                    <Button className={classes.depositActionButton}>Swap</Button>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
          
            <SuportedNetwork pageName="Redeem" supportedNetwork={this.state.supportedNetwork}/>
        </>
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(PTokenRedeem))) 