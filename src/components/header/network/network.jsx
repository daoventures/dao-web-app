import React, { Component  } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Store from "../../../stores/storev2";
import {
    Typography
} from "@material-ui/core";
import { 
    ArrowDropDown
} from "@material-ui/icons"
import { 
    NETWORK_LABEL,
    CHANGE_NETWORK
} from "../../../constants/constants";
import {
    supportedNetworks,
    getNetworkIcon,
    switchNetwork
} from "./networkHelper";
import BasicModal from "../../common/basicModal/basicModal";


const dispatcher = Store.dispatcher;
const emitter = Store.emitter;
const store = Store.store;

const styles = (theme) => ({
    networkButton: {
        cursor: "pointer",
        display: "flex",
        border: `1px solid ${theme.themeColors.border}`,
        color: theme.themeColors.textT,
        padding: "8px",
        alignItems: "center"
    },
    networkLabel: {
        marginLeft: "3px",
        fontSize: "12px"
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column"
    },
    purpleText: {
        color: theme.themeColors.textP
    },
    networkSelectionRow: {
        display: "flex",
        justifyContent: "space-between",
    },
    networkSelectionBox: {
        width: "48%",
        height: "5vh",
        margin: "7px 0px",
        padding: "10px",
    },
    selectedNetworkSelectionBox: {
        background: "rgba(70, 64, 146, 0.3)",
    },
    networkSelectionLabel: {
        marginLeft: "8px"
    },
    titleNetworkLabel: {
        margin: "5px"
    },
    arrowDropDown: {
        height: "15px",
        width: "15px",
        fill: theme.themeColors.textP,
    }
});

class NetworkSelect extends Component {
    constructor(props) {
        super();
        this.state = {
            network: 0,
            supportedNetworks: supportedNetworks,
            openModal: false
        }
    }

    componentDidMount() {
        emitter.on(CHANGE_NETWORK, this.networkChanged);
    }

    componentWillUnmount() {
        emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
    }

    networkChanged = (obj) => {
        const networkId = obj.network;
        const networkLabel = this.getNetworkLabel(networkId);
        this.setState({ network: networkId, networkLabel });
    }

    getNetworkLabel = (network) => {
        if(network === 0) {
            return "";
        }
        const networkLabel = NETWORK_LABEL[network]
        return networkLabel === undefined ? "" : networkLabel;
    }

    setOpenModal = (openModal) => {
        this.setState({openModal});
    }

    changeNetwork = async(network) => {
        const result = await switchNetwork(network);
        this.setOpenModal(false);
    }
    
    isSelectedNetwork = (network) =>  {
        return parseFloat(network) === parseFloat(this.state.network);
    }

    renderNetworkSelection = () => {
        const { classes } = this.props;
        const { networkLabel, supportedNetworks, openModal} = this.state;

        const supportedNetworkKeys = Object.keys(supportedNetworks);

        const titleTemplate = (
            <div className={classes.titleContainer}>
                <Typography variant={"h3"} style={{fontWeight: "normal"}}>Select Network</Typography>
                <Typography variant={"h4"} style={{marginTop:"14px" , fontWeight: "normal"}}>
                    Currently you are using 
                    <span className={`${classes.titleNetworkLabel} ${classes.purpleText}`}>{networkLabel}</span>
                    Network
                </Typography>
            </div>
        );

        const contentTemplate = (
            supportedNetworkKeys.map((network, index) => {
                const remainder = index % 2;
                
                if(remainder === 0) {
                    const secondNetwork = supportedNetworkKeys[index + 1];
                    return (
                        <div className={`${classes.networkSelectionRow}`}>
                            <div id={index} className={`${classes.networkSelectionBox} ${classes.networkButton} ${(this.isSelectedNetwork(network) === true) ? classes.selectedNetworkSelectionBox: ""}`} onClick={() => this.changeNetwork(network)}>
                                <img src={ getNetworkIcon(network)} alt={network}/>
                                <Typography variant={"body1"} className={classes.networkSelectionLabel}>{supportedNetworks[network]["chainName"]}</Typography>
                            </div>
                            {(index + 1 <= supportedNetworkKeys.length - 1) &&
                                <div id={index + 1} className={`${classes.networkSelectionBox} ${classes.networkButton} ${(this.isSelectedNetwork(secondNetwork) === true) ? classes.selectedNetworkSelectionBox: ""}`} onClick={() => this.changeNetwork(secondNetwork)}>
                                   <img src={getNetworkIcon(secondNetwork)} alt={network}/>
                                   <Typography variant={"body1"} className={classes.networkSelectionLabel}>{supportedNetworks[secondNetwork]["chainName"]}</Typography>
                               </div>}
                        </div>
                    )
                } else {
                    return null;
                }
            })
        );

        return <BasicModal setOpenModal={this.setOpenModal} openModal={openModal} contentTemplate={contentTemplate} titleTemplate={titleTemplate}/>
        
    }

    render() {
        const { classes } = this.props;
        const { network, networkLabel } = this.state;
    
        if(network === 0) {
            return null;
        }

        const networkIcon = getNetworkIcon(network); 
    
        return <React.Fragment>
            <div className={classes.networkButton} onClick={() => this.setOpenModal(true)}>
                <img src={networkIcon} alt={network}/>
                <span className={classes.networkLabel}>{networkLabel}</span>
                <ArrowDropDown className={classes.arrowDropDown}/>
            </div>
            {this.renderNetworkSelection()}
        </React.Fragment>
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(NetworkSelect)));
