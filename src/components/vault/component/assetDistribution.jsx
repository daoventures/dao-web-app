import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";

import PieChart from "../../common/chart/pieChart/pieChart";

const styles = (theme) => ({
    contentRow: {
        display: "flex",
        width: "100%",
        margin: "3px",
        color: theme.themeColors.textT
    },

    assetDistributionRow: {
        display: "flex",
        flexDirection: "row",
        color: theme.themeColors.textT,
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
    },

    backgroundSelected: {
        backgroundColor: theme.themeColors.blockTextColor
    },

    textDanger: {
        color: theme.themeColors.formError
    },

    textSuccess: {
        color: "#08BF74"
    }
});

class AssetDistribution extends Component {
    constructor() {
        super();
        this.state = {
            selectedSection: null
        };
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
        const {selectedSection} = this.state;

        if(!data) {
            return null;
        }

        const assetName = (index === 0) ? "" : data[0];
       
        return (
          <React.Fragment>
            {/** Asset Label */}
            <div
              className={`${classes.assetLabelContainer} ${
                selectedSection === assetName ? classes.backgroundSelected : ""
              }`}
            >
              {index === 0 ? (
                <Typography variant={"overline"}>{data[0]}</Typography>
              ) : (
                this.renderAssetLogo(data[0])
              )}
            </div>

            {/** Allocation Percentage */}
            <div
              className={`${classes.allocationContainer} ${
                selectedSection === assetName ? classes.backgroundSelected : ""
              }`}
            >
              {index === 0 ? (
                <Typography variant={"overline"}>{data[1]}</Typography>
              ) : (
                `${Number(data[1]).toFixed(2)}%`
              )}
            </div>

            {/** 24 Hour USD Price Change */}
            <div
              className={`${classes.priceChangeContainer} ${
                selectedSection === assetName ? classes.backgroundSelected : ""
              }`}
            >
              <span>
                {index === 0 ? (
                  <Typography variant={"overline"}>{data[2]}</Typography>
                ) : (
                  <span className={`${this.getPercentageCss(data[2])}`}>
                    {(Number(data[2]) > 0) ? "+" : ""}
                    {Number(data[2]).toFixed(2)}%
                  </span>
                )}
              </span>
            </div>
          </React.Fragment>
        );
    }

    renderAssetLogo = (asset) => {
        const {classes} = this.props;
        return (
            <div className={`${classes.contentRow} ${classes.alignCenter}`}>
                <img 
                    className={classes.icon}
                    alt={asset}
                    src={require(`../../../assets/USDT-logo.png`)}
                />
                <Typography variant={"h5"}>
                    {asset}
                </Typography>
            </div>
        )
    }

    getPercentageCss = (percentage) => {
        const {classes} = this.props;
        if(percentage < 0) {
            return classes.textDanger;
        } else if (percentage > 0) {
            return classes.textSuccess;
        } else {
            return ""
        }
    }

    handleSelectedPieChartSection = (section) => {
        this.setState({selectedSection: section});
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
                            onSectionSelected={this.handleSelectedPieChartSection}
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
