import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { Typography} from "@material-ui/core";

import {
    EARLY_HARVEST_PENALTY,
    ACTION_HARVEST,
    ACTION_COMPOUND,
    ACTION_EMERGENCY
} from "../../../../constants/constants";

import InfoModal from "../../../common/infoModal/infoModal";
import StakeActions from "../stakeActions/stakeActions";

const styles = (theme) => ({
    container: {
        paddingTop: "15px",
        paddingBottom: "27px",
        paddingLeft: "20px",
        paddingRight: "20px",
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },

    rowContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: theme.themeColors.textT,
        marginTop: "5px",
        marginBottom: "5px",

        [theme.breakpoints.down("sm")]: {
            justifyContent: "flex-start",
            alignItem: "center"
        },
    },

    earlyHarvestContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        minHeight: "60px",
    },

    columnContainer: {
        width: "100%",
        display: "flex",
        // alignItems: "center",
        color: theme.themeColors.textT,
        flexDirection: "column",
    },
     
    spaceBetween: {
        justifyContent: "space-between",
    },

    alignFlexEnd: {
        alignItems: "flex-end"
    },

    alignFlexStart: {
        alignItems: "flex-start"
    },

    modalInfo: {
        color: theme.themeColors.textT,
        padding: "15px",
    },

    mt15: {
        marginTop: "15px"
    },

    w100: {
        width: "100%",
    },

    h100: {
        height: "100%",
    },

    earlyaHarvestContent: {
        lineHeight: "1.6"
    }
});

class PendingReward extends Component {
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

    renderPenaltyInfo = () => {
        const { classes } = this.props;
        const modalContent = (
            <div className={classes.modalInfo}>
                <Typography variant={"h5"} className={classes.earlyaHarvestContent}>
                    Only applies when harvesting within 72hrs of previous harvest/withdrawal. Harvesting
                    after 3 days will not incur a fee. The timer resets every time a harvest or withdrawal is performed.
                </Typography>
            </div>
        );
        return <InfoModal content={modalContent}></InfoModal>;
    }

    render() {
        const { classes, pool, startLoading } = this.props;
        const { userInfo } = pool;
        
        return (
            <React.Fragment>
                <div className={classes.container}>
                    <div className={`${classes.rowContainer} ${classes.spaceBetween}`}>
                        {/** DVD Balance */}
                        <Typography variant="body1" noWrap>
                            Pending Rewards:
                        </Typography>

                        <Typography variant="body2" noWrap>
                            {userInfo && userInfo.pendingDVG
                                ? (Number(userInfo.pendingDVG) / 10 ** 18)
                                    .toFixed(2)
                                    .toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })
                                : "0.0000"}
                            {" DVD"}
                        </Typography>
                    </div>

                    <div className={classes.earlyHarvestContainer}>
                        <div className={`${classes.rowContainer} ${classes.minHeight60}`}>
                            {/** Early Harvest Penalty */}
                            <Typography variant="subtitle1" noWrap>
                                Early Harvest Penalty: {EARLY_HARVEST_PENALTY} %
                            </Typography>
                            {this.renderPenaltyInfo()}
                        </div>
                    </div>

                    <div className={`${classes.rowContainer} ${classes.h100} ${classes.alignFlexStart}`}>
                        <div className={`${classes.w100}`}>
                            <div className={`${classes.columnContainer} ${classes.mt15}`}>
                                {
                                    (!pool.emergencyWithdraw) &&
                                    <React.Fragment>
                                        {/** Harvest Button */}
                                        <StakeActions
                                            type={ACTION_HARVEST}
                                            label={ACTION_HARVEST}
                                            pool={pool}
                                            disabled={!pool.harvest}
                                            startLoading={startLoading}>
                                        </StakeActions>

                                        {/** Compound Button */}
                                        <StakeActions
                                            type={ACTION_COMPOUND}
                                            label={ACTION_COMPOUND}
                                            pool={pool}
                                            disabled={!pool.compound}
                                            startLoading={startLoading}>
                                        </StakeActions>
                                    </React.Fragment>
                                }
                                {
                                    (pool.emergencyWithdraw) &&
                                    <React.Fragment>
                                        {/** Emergency Button */}
                                        <StakeActions
                                            type={ACTION_EMERGENCY}
                                            label={`Confirm MAX withdrawal ${pool.name} only`}
                                            pool={pool}
                                            startLoading={startLoading}>
                                        </StakeActions>
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(PendingReward)));