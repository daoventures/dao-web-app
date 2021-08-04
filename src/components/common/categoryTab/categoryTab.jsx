import React, { Component } from "react";

import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  typeTab: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    paddingBottom: "10px",
  },
  typeTabItem: {
    width: "148px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    background: theme.themeColors.blockBack,
    borderColor: theme.themeColors.blockBorder,
    borderLeft: "1px solid",
    borderTop: "1px solid",
    borderBottom: "1px solid" + theme.themeColors.blockBorder,
    cursor: "pointer",
    color: theme.themeColors.blockTextColor,
    "&.last": {
        borderRight: "1px solid",
    },
    "&.active": {
      background: "linear-gradient(135deg, #0B2663 0%, #1152DF 100%)",
      // border: "none",
      color: "#ffffff",
      padding: "0",
    },
    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.down("md")]: {
      height: "34px",
      width: "32px",
      marginRight: "10px",
      "&.active": {
        width: "90px",
        minWidth: "90px",
        padding: "0 10px",
      },
    },
  },
  typeTabText: {
    [theme.breakpoints.up("md")]: {
      display: "inline-block",
    },
    [theme.breakpoints.down("md")]: {
    //   display: "none",
      "&.active": {
        display: "inline-block",
        fontSize: "12px",
      },
    },
  },
  disableButton: {
    pointerEvents: "none",
    color: theme.themeColors.btnDisabled,
    borderColor: theme.themeColors.btnDisabled,
    cursor: "not-allowed"
  }
});

class CategoryTab extends Component {
  constructor() {
    super();

    this.state = {
      currentTab: 0,
    };
  }

  selectTab = (index) => {
    const { items } = this.props;
    this.setState({ currentTab: index });
    this.props.selectedTab(items[index].value);
  };

  render() {
    const { items, classes, disableAllTab } = this.props;
    const { currentTab } = this.state;

    const disableTab = (disableAllTab === undefined) ? false : disableAllTab;
   
    if (!items || items.length < 0) {
      return null;
    }

    const tabs = items.map((item, index) => {
      return (
        <li
          key={index}
          className={`${classes.typeTabItem} ${currentTab === index ? "active" : ""} ${(index === items.length - 1 && currentTab !== index)? "last" : ""} ${(disableTab) ? classes.disableButton : ""}`}
          onClick={() => this.selectTab(index)}
        >
          <span
            className={`${classes.typeTabText} ${
              currentTab === index ? "active" : ""
            }`}
          >
            {item.label}
          </span>
        </li>
      );
    });

    return <ul className={classes.typeTab}>{tabs}</ul>;
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(CategoryTab));
