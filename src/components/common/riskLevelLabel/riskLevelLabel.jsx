import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
    BASIC,
    ADVANCE,
    EXPERT,
    DEGEN
} from '../../../constants/constants';
import { withRouter } from "react-router";

const styles = (theme) => ({
    riskLowLabel: {
        background: "#72C6AE",
        //borderRadius: "5px",
        color: "#ffffff",
        padding: "5px 10px",
        textAlign: "center",
        width: "5rem",
        marginLeft: "auto",
        position: "absolute",
        right: "0px",
        top: "0px",
        borderBottomLeftRadius: "15px",
    },
    riskMediumLabel: {
        background: "#EC9956",
        // borderRadius: '5px',
        color: "#ffffff",
        padding: "5px 10px",
        textAlign: "center",
        width: "7rem",
        marginLeft: "auto",
        position: "absolute",
        right: "0px",
        top: "0px",
        borderBottomLeftRadius: "15px",
    },
    riskExpertLabel: {
        background: "#C715A7",
        // borderRadius: '5px',
        color: "#ffffff",
        padding: "5px 10px",
        textAlign: "center",
        width: "7rem",
        marginLeft: "auto",
        position: "absolute",
        right: "0px",
        top: "0px",
        borderBottomLeftRadius: "15px",
    },
    riskDegenLabel: {
        background: "#DC0B0C",
        // borderRadius: '5px',
        color: "#ffffff",
        padding: "5px 10px",
        textAlign: "center",
        width: "7rem",
        marginLeft: "auto",
        position: "absolute",
        right: "0px",
        top: "0px",
        borderBottomLeftRadius: "15px",
    },
});

class RiskLevelLabel extends Component {
    constructor(props) {
        super();
    }

    render() {
        const { classes, risk } = this.props;
        return (
            <div
                className={
                    risk === BASIC
                        ? classes.riskLowLabel
                        : risk === ADVANCE
                            ? classes.riskMediumLabel
                            : risk === EXPERT
                                ? classes.riskExpertLabel
                                : risk === DEGEN
                                    ? classes.riskDegenLabel
                                    : ""
                }>
                <Typography variant="caption">{risk}</Typography>
            </div>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(RiskLevelLabel))