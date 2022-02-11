import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Store from "../../stores/storev2"; // Update this
import { Box, Typography, Button } from "@material-ui/core";
import Warning from "../../assets/warning.png";
import BasicModal from "../common/basicModal/basicModal";
import { CHANGE_NETWORK, CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from "../../constants/constants";

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

const styles = (theme) => ({
    flexCenter: {
        display: "flex",
        alignItems: "center",
    },
    flexRow: {
        flexDirection: "row"
    },
    flexColumn: {
        flexDirection: "column"
    },
    justifyCenter: {
        justifyContent: "center"
    },
    warningText: {
        color: theme.themeColors.textT
    },
    margin16px: {
        margin: "16px"
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
})

class SupportedNetwork extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: this.checkSupportedNetwork()
        }

        if (performance.getEntriesByType("navigation")[0].type === "reload") {
            console.log(`reload`);
            this.state.open = this.checkSupportedNetwork();
        }
    }

    componentDidMount() {
        emitter.on(CONNECTION_CONNECTED, this.walletConnected);
        emitter.on(CONNECTION_DISCONNECTED, this.walletDisconnected);
        emitter.on(CHANGE_NETWORK, this.handleNetworkChange)
    }

    componentWillUnmount() {
        emitter.removeListener(CONNECTION_CONNECTED, this.walletConnected)
        emitter.removeListener(CONNECTION_DISCONNECTED, this.walletDisconnected);
        emitter.removeListener(CHANGE_NETWORK, this.handleNetworkChange)
    }

    walletConnected = () => {
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

    handleNetworkChange = (obj) => {
        this.setState({
            open: this.checkSupportedNetwork()
        })
    }

    checkSupportedNetwork = () => {
        const account = store.getStore("account").address;
        const network = store.getStore("network");
        const supportedNetwork = this.props.supportedNetwork
            ? this.props.supportedNetwork
            : [1, 42];

        return account !== undefined && !supportedNetwork.includes(network);
    }


    render() {
        const { classes, pageName } = this.props;

        const content = <>
            <Box className={`${classes.flexColumn} ${classes.flexCenter} ${classes.justifyCenter}`}>
                <img src={Warning} alt="warning" />
                <Typography variant="h4" className={`${classes.warningText} ${classes.margin16px}`}>
                    {pageName} page only works on Ethereum Mainnet
                </Typography>

                <Button className={`${classes.switchNetworkButton}`}>Switch to Ethereum Network</Button>
            </Box>
        </>

        const handleOpenModal = (open) => {
            this.setState({ open });
        }

        const modalProps = {
            contentTemplate: content,
            openModal: this.state.open,
            setOpenModal: handleOpenModal,
        }

        return <BasicModal {...modalProps} />;
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(SupportedNetwork))) 