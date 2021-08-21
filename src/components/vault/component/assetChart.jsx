import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import PeriodSelection from "../../common/select/period/periodSelection";
import LineChart from "../../common/chart/lineChart/lineChart";

import{
    Typography,
} from "@material-ui/core";

const styles = (theme) => ({
    container:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },

    spaceBetween: {
        justifyContent: "space-between",
    },

    title: {
        color: theme.themeColors.textT,
    },

    mt10:{
        marginTop: "10px"
    },

    mt25: {
        marginTop: "25px"
    }
});


class AssetChart extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        const {classes, asset} = this.props;
        if(!asset) {
            return null;
        }
        return (
            <React.Fragment>
                <div className={`${classes.container} ${classes.spaceBetween}`}>
                    <div className={classes.title}>
                        <Typography variant={"h4"}>
                            Vault Performance History
                        </Typography>
                    </div>

                    <div>
                        <PeriodSelection/>
                    </div>
                </div>
                <div className={`${classes.container} ${classes.mt10}`}>
                    <Typography variant={"h3"} className={`${classes.title}`}>
                        25.00%
                    </Typography>
                </div>
                <div className={`${classes.container} ${classes.mt25}`}>
                    <LineChart data={asset.testingPerformance}/>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(AssetChart));
