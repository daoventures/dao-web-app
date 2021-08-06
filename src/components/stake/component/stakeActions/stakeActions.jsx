import React, { Component } from "react";
import Store from "../../../../stores/store";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import {
    WITHDRAW_DAOMINE,
    EMERGENCY_WITHDRAW_DAOMINE,
    YIELD_DAOMINE,
    ACTION_COMPOUND,
    ACTION_HARVEST,
    ACTION_WITHDRAW,
    MODAL_TITLE_WITHDRAW,
    DISABLE_ACTION_BUTTONS_RETURNED,
    WITHDRAW_DAOMINE_RETURNED
} from '../../../../constants/constants';
import BasicModal from "../../../common/basicModal/basicModal";
import StakeWithdraw from "../stakeWithdraw/stakeWithdraw";

const styles = (theme) => ({
    actionButton: {
        height: "42px",
        width: "100%",
        marginTop: "10px",
        background: "none",
        borderColor: theme.themeColors.border,
        color: theme.themeColors.textT,
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "0px",
        cursor: "pointer",
        "&:hover": {
            background: theme.themeColors.btnBack,
        },
        "&.Mui-disabled": {
            borderColor: theme.themeColors.btnDisabled,
            cursor: "not-allowed",
            color: theme.themeColors.textD,
        },
        "&:first-child": {
            marginTop: "0px",
        },
    },
   
    mt10 :{
        marginTop: "10px"
    },

    w10: {
        width: "10%"
    }
});

const dispatcher = Store.dispatcher;
const emitter = Store.emitter;

class StakeActions extends Component {
    constructor(props) {
        super();

        this.state = {
            loading: false,
            openWithdraw: false, // open withdraw modal
        };
    }

    componentWillMount() {
        emitter.on(DISABLE_ACTION_BUTTONS_RETURNED, this.handleActionButtonsControl);
        emitter.on(WITHDRAW_DAOMINE_RETURNED, this.handleWithdrawTxnHashReturned);
    }

    componentWillUnmount() {
        emitter.removeListener(DISABLE_ACTION_BUTTONS_RETURNED, this.handleActionButtonsControl);
        emitter.removeListener(WITHDRAW_DAOMINE_RETURNED, this.handleWithdrawTxnHashReturned);
    }

    handleActionButtonsControl = (disable) => {
        this.setState({loading: disable});
    }

    // To close withdraw modal once transaction hash is returned
    handleWithdrawTxnHashReturned = () => {
        this.openWithModal(false);
    }
    
    onHarvest = () => {
        const { startLoading, pool } = this.props;

        this.setState({ loading: true });
        startLoading();

        dispatcher.dispatch({
            type: WITHDRAW_DAOMINE,
            content: {
                pool,
                amount: "0"
            }
        })
    }

    onCompound = () => {
        const {  startLoading, pool } = this.props;
        const pid = pool.pid;
        if(!pool || !pid) { return; }
    
        this.setState({loading: true});
        startLoading();
    
        dispatcher.dispatch({
          type: YIELD_DAOMINE,
          content: {pid}
        })
    }

    onEmergencyWithdrawal = () => {
        const { startLoading, pool } = this.props;
        
        this.setState({ loading: true });
        startLoading();

        dispatcher.dispatch({
            type: EMERGENCY_WITHDRAW_DAOMINE,
            content: {
                pool,
            }
        })
    };

    renderWithdrawModal = () => {
        const { openWithdraw } = this.state;
        const { startLoading } = this.props;
        const pool = this.props.pool === undefined ? null : this.props.pool;

        if(!pool) {
            console.error("Missing pool when trying to open withdraw modal");
        }

        const content = (
          <StakeWithdraw
            pool={pool}
            startLoading={startLoading}
          ></StakeWithdraw>
        );
       
        return (
          <BasicModal
            content={content}
            title={MODAL_TITLE_WITHDRAW}
            setOpenModal={this.openWithModal}
            openModal={openWithdraw}
          ></BasicModal>
        );
    }

    openWithModal = (open) => { this.setState({openWithdraw: open}); }

    assignFunctionByType = (type) => {
        switch(type) {
            case ACTION_HARVEST:
                this.onHarvest();
                break;
            case ACTION_COMPOUND:
                this.onCompound();
                break;
            case ACTION_WITHDRAW:
                this.openWithModal(true);
                break;
            default:
                break;
        }
    }
    
    render() {
        const { classes, type, label } = this.props;
        const { loading } = this.state;

        const disabled = this.props.disabled === undefined ? false : this.props.disabled;

        // Additional class for Withdraw DAOmine button
        const additionalClasses = (type === ACTION_WITHDRAW) 
            ? classes.w10
            : "";
        
        return (
            <React.Fragment>
                <Button
                    disabled={disabled || loading}
                    className={`${classes.actionButton} ${additionalClasses}`}
                    onClick={() => this.assignFunctionByType(type)}
                >
                    <span>{label}</span>
                </Button>
                {(type === ACTION_WITHDRAW) && this.renderWithdrawModal()}
            </React.Fragment>
        );
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(StakeActions)));
