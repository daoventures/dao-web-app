import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import {
    Button, Typography,
} from "@material-ui/core";
import { PERIODS } from "../../../../constants/constants";

const styles = (theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
    },

    item: {
        color: theme.themeColors.textP,
        margin: "0px 5px",
        fontWeight: "bold",
        cursor: "pointer"
    },

    itemActive: {
        margin: "0px 5px",
        padding: "0px 3px",
        color: theme.themeColors.textT,
        borderRadius: '5px',
        fontWeight: "bold",
        cursor: "pointer",
        background: theme.themeColors.buttonActive,
    }
});

class PeriodSelection extends Component {
    constructor() {
        super();
        this.state = {
            periods: PERIODS, 
            selectedIndex: null,
        }
    }

    handleSelectedItem = (index) => {
        console.log(`selected index: ${index}`);
        this.setState({selectedIndex: index});
    }

    render() {
        const { classes } = this.props;
        const { periods, selectedIndex } = this.state;

        return (
            <div className={classes.container}>
                {periods.map((p, index) => {
                    return (
                        <div className={`
                            ${(selectedIndex) === index ? classes.itemActive : classes.item}`}
                            onClick={() => this.handleSelectedItem(index)}>
                            {p.label}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(PeriodSelection));
