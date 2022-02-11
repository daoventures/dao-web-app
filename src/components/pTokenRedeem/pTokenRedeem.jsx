import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { CHANGE_NETWORK, REDEEM_PTOKEN_ERROR, REDEEM_PTOKEN_HASH, REDEEM_PTOKEN_SUCCESS, CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from "../../constants/constants";
import Store from "../../stores/storev2"; // Update this
import SuportedNetwork from "../supportedNetwork/supportedNetwork";
import ConnectWallet from "../common/connectWallet/connectWallet";

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
    }
});

class PTokenRedeem extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            networkId: store.getStore("networkId"),
            account: store.getStore("account"),
            supportedNetwork: [1, 4], // Only supported on Rinkeby and Ethereum Network
            disableTransact : false
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
        this.checkSupportedNetwork();
    };

    walletConnected = () => {
        console.log(`connected from p token redeem`);
        this.setState({
            account: store.getStore("account")
        });
    }

    walletDisconnected = () => {
        this.setState({
            account: null,
            address: null,
            open: false
        });
    };


    checkSupportedNetwork = () => {
        const account = store.getStore("account").address;
        const network = store.getStore("network");

        const isNetworkSupported = account !== undefined && this.state.supportedNetwork.includes(network);

        this.setState({ 
            disableTransact: !isNetworkSupported
        })
    }


    handleSuccessfulRedeem = () => {

    }

    handleRedeemHashGenerated = () => {

    }

    handleRedeemError = () => {

    }

    render() {
        const { classes } = this.props;
        const { account } = this.state;

        if (!account || !account.address) {
            return <ConnectWallet></ConnectWallet>;
        }

        return <>
            <div className={classes.root}>
                <div className={classes.contentContainer}>
                    <div style={{ height: "240px", width: "240px", background: "#7367b7" }}>
                        <Button disabled={this.state.disableTransact} onClick={() => console.log(`Hello`)}>Hello</Button>
                    </div>
                </div>
            </div>
          
            <SuportedNetwork pageName="Redeem" supportedNetwork={this.state.supportedNetwork}/>
        </>
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(PTokenRedeem))) 