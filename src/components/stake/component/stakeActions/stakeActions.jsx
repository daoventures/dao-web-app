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
    ACTION_HARVEST
} from '../../../../constants/constants';

const styles = (theme) => ({
    actionButton: {
        height: "42px",
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
    }
});

const dispatcher = Store.dispatcher;

class StakeActions extends Component {
    constructor(props) {
        super();

        this.state = {
            amountError: false,
            loading: false,
            amount: 0,
            percent: 0,
            errorMessage: ""
        };
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

    assignFunctionByType = (type) => {
        switch(type) {
            case ACTION_HARVEST:
                this.onHarvest();
                break;
            case ACTION_COMPOUND:
                this.onCompound();
                break;
            default:
                break;
        }
    }
    
    render() {
        const { classes, type, label } = this.props;
        const { loading } = this.state;

        const disabled = this.props.disabled === undefined ? false : this.props.disabled;

        return (
            <Button
                disabled={ disabled || loading }
                className={classes.actionButton}
                onClick={() => this.assignFunctionByType(type)}
            >
                <span>{label}</span>
            </Button>
        );
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(StakeActions)));
