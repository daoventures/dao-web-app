import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const styles = (theme) => ({
});

class PieChart extends Component {
    constructor() {
        super();

        this.state = {
            chartInnerSize: '90%',
            colors: [
                '#50B432',
                '#ED561B',
                '#DDDF00',
                '#24CBE5',
                '#64E572',
                '#FF9655',
                '#FFF263',
                '#6AF9C4'
            ]
        };
    }

    getDefaultChartOption = () => {
        const chartColor = this.state.colors;

        const options = {
            chart: {
                type: 'pie',
                backgroundColor: null, // Set no background
            },
            title: {
                text: null
            },
            tooltip: {
                formatter: function() {
                    return `<b>${this.point.label}</b>: ${this.point.y} %`;
                }
            },
            plotOptions: {
                pie: {
                    size: "80%",
                    innerSize: this.state.chartInnerSize,
                    dataLabels: {
                        enabled: false,
                    },
                    colors: chartColor,
                    borderWidth:8,
                    borderColor: "#292750"
                }
            },
            credits: {
                enabled: false
            }
        };

        return options;
    }

    setData = () => {

    }

    render() {
        const { data } = this.props;

        if(data.length <= 0) {
            return null;
        }

        let options = this.getDefaultChartOption();
        options["series"] = [{data: data,states: {hover:{halo:{opacity:0}}}}];

        // Inner Radius of pie chart
        if(this.props.innerSize !== undefined) {
            options.plotOptions.pie.innerSize = `${this.props.innerSize}%`;
        }
        // To show label on chart
        if(this.props.showLabel !== undefined) {
            options.plotOptions.pie.dataLabels.enabled = this.props.showLabel;
        }
        // Formatting tooltip display
        if(this.props.tooltipFormatter !== undefined) {
            options.tooltips.formatter = this.props.tooltipFormatter;
        }
        // Chart Color
        if(this.props.chartColors !== undefined) {
            options.plotOptions.pie.colors = this.props.tooltipFormatter;
        }

        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(PieChart));
