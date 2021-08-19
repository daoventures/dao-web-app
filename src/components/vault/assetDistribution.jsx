import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";

import PieChart from "../common/pieChart/pieChart";

const styles = (theme) => ({
    contentRow: {
        display: "flex",
        width: "100%"
    },

    assetDistributionRow: {
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },

    chartSection: {
        width: "40%",
        [theme.breakpoints.down("sm")]: {
           width: "100%"
        },
    },

    distributionSection: {
        width: "60%",
        paddingLeft: "10px",
        marginBottom: "15px",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },

    assetLabelContainer: {
        width: "25%",
        [theme.breakpoints.down("sm")]: {
            width: "30%",
            justifyContent: "center"
        },
    },

    allocationContainer: {
        width: "20%",
        [theme.breakpoints.down("sm")]: {
            width: "35%",
            justifyContent: "center"
        },
    },

    priceChangeContainer: {
        width: "30%",
        display: "flex",
        justifyContent: "flex-end",
        [theme.breakpoints.down("sm")]: {
            width: "35%",
            justifyContent: "center"
        },
    },
    
    assetTitle: {
        color: theme.themeColors.textP,
    },

    flexRow: {
        flexDirection: "row",
    },

    flexCol: {
        flexDirection: "column",
    },

    alignCenter: {
        alignItems: "center"
    },
    
    icon: {
        height: "20px",
        marginRight: "2px"
    }
});

class AssetDistribution extends Component {
    constructor() {
        super();
        this.state = {};
    }

    processAssetDistributionChartData = (distribution) => {
        const data = [];
        distribution.forEach(asset => {
            const assetLabel = asset[0];
            const assetPercentage = asset[1].percent;

            data.push({label: assetLabel, y: assetPercentage});
        });
        return data;
    }

    renderDistributionTable = (distribution) => {
        const {classes} = this.props;
        const tableData = [];

        const header = ["COIN", "ASSET %", "24H CHANGE USD"];
        tableData.push(header);

        distribution.forEach(asset => {
            tableData.push([asset[0], asset[1].percent, asset[1].changePercentage]);
        })

        const content = tableData.map((data, index) => {
           return (
            <div className={classes.contentRow}>
                {this.renderTableRow(data,index)}
            </div>
           );
        });

        return content;
    }

    renderTableRow = (data, index) => {
        const {classes} = this.props;

        if(!data) {
            return null;
        }

        return (
            <React.Fragment>
                {/** Asset Label */}
                <div className={classes.assetLabelContainer}>
                    {(index === 0) ? data[0] : this.renderAssetLogo(data[0])}
                </div>

                {/** Allocation Percentage */}
                <div className={classes.allocationContainer}>
                   {(index === 0) ? data[1]  : `${Number(data[1]).toFixed(2)}%`}
                </div>

                {/** 24 Hour USD Price Change */}
                <div className={`${classes.priceChangeContainer}`}>
                    <span>
                        {(index === 0) ? data[2] : `${Number(data[2]).toFixed(2)}%`}
                    </span>
                </div>
            </React.Fragment>
        )
    }

    renderAssetLogo = (asset) => {
        const {classes} = this.props;
        return (
            <div className={`${classes.contentRow} ${classes.alignCenter}`}>
                <img 
                    className={classes.icon}
                    alt={asset}
                    src={require(`../../assets/USDT-logo.png`)}
                />
                <Typography variant={"h5"}>
                    {asset}
                </Typography>
            </div>
        )
    }

    render() {
        const { asset, classes } = this.props;

        const distribution = asset.distribution;
        if(!distribution) {
            return null;
        }

        const distributionChartData = this.processAssetDistributionChartData(distribution);
        
        return (
            <React.Fragment>
                <div className={`${classes.contentRow} ${classes.flexCol}`}>
                    <Typography variant={"h4"}>
                        Asset Strategy
                    </Typography>
                    <Typography variant={"h5"}>
                        Testing
                    </Typography>
                </div>

                <div className={`${classes.assetDistributionRow} ${classes.alignCenter}`}>
                    {/** Render Distribution Pie Chart */}
                    <div className={`${classes.chartSection}`}>
                        <PieChart 
                            data={distributionChartData}
                            innerSize={`90%`}
                        />
                    </div>

                    {/** Show Distribution */}
                    <div className={`${classes.distributionSection}`}>
                        {this.renderDistributionTable(distribution)}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(AssetDistribution));
