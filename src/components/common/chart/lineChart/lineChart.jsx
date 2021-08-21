import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { getTheme } from "../../../../theme/theme";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { HIDE_NAV_INNERWIDTH } from "../../../../constants/constants";

import Store from "../../../../stores/store";
const emitter = Store.emitter;
const store = Store.store;

const styles = (theme) => ({
    highChartContainer: {
        width: "100%",
    }
});

class LineChart extends Component {
    constructor() {
        super();

        this.state = {
            chartInnerSize: '70%',
            colors: [
                '#7F25D9',
                '#027AFF',
                '#FFFFFF'
            ],
            chartTitle: {
                yearn: "Historical Earn & Vault Performance",
                compound: "Historical Vault Performance",
                citadel: "Historical Vault Performance",
                elon: "Historical Vault Performance",
                cuban: "Historical Vault Performance",
                daoFaang: "Historical Vault Performance",
                moneyPrinter: "Historical Vault Performance",
            }, 
            hideNav: false,
            interestTheme: store.getStore("currentTheme"),
            options: this.getDefaultChartOption(),
        };
    }

    componentWillMount() {
        emitter.on("CURRENT_THEME_RETURNED", this.currentThemeChanged);
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
    }

    componentWillUnmount() {
        emitter.removeListener("CURRENT_THEME_RETURNED", this.currentThemeChanged);
        window.removeEventListener("resize", this.resize.bind(this));
    }

    resize() {
        let currentHideNav = window.innerWidth <= HIDE_NAV_INNERWIDTH;
        if (currentHideNav !== this.state.hideNav) {
          this.setState({ hideNav: currentHideNav });
        }
    }

    currentThemeChanged = (theme) => {
        const currentTheme = theme || store.getStore("currentTheme");
        console.log(`Current Theme: `, currentTheme);
        this.setState({
          interestTheme: getTheme(currentTheme),
          options: this.getDefaultChartOption()
        });
     };
    
    getDefaultChartOption = () => {
        const theme = getTheme(store.getStore("currentTheme"));
        const themeColors = theme.themeColors;

        const options = {
            chart: {
                backgroundColor: themeColors.itemBack,
            },
            title: {
                text: null,
                align: "left",
                y: 20,
                style: {
                    fontSize: "14px",
                    color: themeColors.textT,
                },
            },
            legend: {
                align: "right",
                verticalAlign: "bottom",
                padding: 3,
                itemMarginTop: 10,
                itemMarginBottom: 20,
                itemStyle: {
                  lineHeight: "14px",
                  color: themeColors.textP,
                },
            },
            xAxis: {
                tickColor: themeColors.lineT,
                lineColor: themeColors.lineT,
                labels: {
                    style: {
                      color: themeColors.textP,
                      fontSize: "12px",
                    },
                },
            },
            yAxis: {
                gridLineColor: themeColors.lineT,
                title: {
                    text: "",
                },
                labels: {
                    style: {
                        color: themeColors.textP,
                        fontSize: "12px",
                    },
                    format: "{value}%",
                },
            },
            tooltip: {
                backgroundColor: themeColors.tooltipBack,
                style: {
                    color: themeColors.textT,
                },
                formatter: function () {
                    var label =
                        "<b>" + Highcharts.dateFormat('%d %Y %H:%M:%S', this.x) + "</b><br/>" + this.series.name + ": " + this.y + "%";
                    return label;
                },
            },
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 450,
                        },  
                        chartOptions: {
                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom',
                                layout: 'horizontal'
                            },
                            yAxis: {
                                labels: {
                                    align: 'left',
                                    x: 0,
                                    y: -5
                                },
                                title: {
                                    text: null
                                }
                            },
                            subtitle: {
                                text: null
                            },
                        },
                    },
                ]
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },
            credits: {
                enabled: false,
            },
        };

        return options;
    }

    getSeries = (data) => {
        const { colors } = this.state;
        const seriesData = data.map((d, index) => {
            return {
                name: d[0], // Series Name
                data: d[1], // Data
                color: colors[index] !== undefined ? colors[index] : '#7F25D9' // line color
            }
        });
        console.log(seriesData);
        return seriesData;
    } 

    render() {
        const { options } = this.state;
        const { data, classes } = this.props;

        if(!data || data === undefined) {
            return null;
        }

        options["series"] =  this.getSeries(data);

        setTimeout({}, 4000);

        console.log(`Options: `, options);

        return (
            <div className={classes.highChartContainer}>
                <HighchartsReact
                highcharts={Highcharts}
                options={options}
                style={{ margin: "auto" }}
                />
          </div>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(LineChart));