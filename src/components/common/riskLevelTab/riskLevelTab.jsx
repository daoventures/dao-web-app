import  React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withStyles } from "@material-ui/core/styles";
import {
    BASIC,
    ADVANCE,
    EXPERT,
    DEGEN,
} from '../../../constants/constants';

const styles = (theme) => ({
  typeTab: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: "0px",
    paddingBottom: "10px",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "10px",
      paddingRight: "10px",
    },
  },
  typeTabItem: {
    "width": "148px",
    "height": "48px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "fontSize": "16px",
    "marginRight": "20px",
    "background": theme.themeColors.blockBack,
    "borderWidth": "1px",
    "borderStyle": "solid",
    "borderColor": theme.themeColors.blockBorder,
    "cursor": "pointer",
    "color": theme.themeColors.blockTextColor,
    "&.active": {
      background: "linear-gradient(135deg, #0B2663 0%, #1152DF 100%)",
      border: "none",
      color: "#ffffff",
      padding: '0'
    },
    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.down("md")]: {
      "height": "34px",
      "width": "32px",
      "marginRight": "10px",
      "&.active": {
        width: "90px",
        minWidth: '90px',
        padding: '0 10px'
      },
    },
  },
  typeTabSvg: {
    width: "20px",
    height: "20px",
    marginRight: "6px",
    [theme.breakpoints.down("md")]: {
      width: "16px",
      height: "16px",
      marginRight: "0px",
    },
  },
  typeTabText: {
    [theme.breakpoints.up("md")]: {
      display: "inline-block",
    },
    [theme.breakpoints.down("md")]: {
      "display": "none",
      "&.active": {
        display: "inline-block",
        fontSize: '12px',
      },
    },
  },
});

class RiskLevelTab extends Component {

    constructor() {
        super();

        this.state = {
            tabList : [
                { label: "All", icon: "#iconmeau-sel", color: "#6D61EA" },
                { label: BASIC, icon: "#iconbasic", color: "#15C73E" },
                { label: ADVANCE, icon: "#iconAdvance", color: "#C77815" },
                { label: EXPERT, icon: "#iconExpert", color: "#C715A7" },
                { label: DEGEN, icon: "#iconDegen", color: "#DC0B0C" }
            ],
            currentTab: 0,
        }
    }

    render() {
      const {tabList, currentTab} = this.state;
      const {classes} = this.props;

      const tabs = tabList.map((item, index) => {
        return (
          <li
            key={index}
            className={`${classes.typeTabItem} ${currentTab === index ? "active" : ""
              }`}
            onClick={() => this.selectTab(index)}>
            <svg
              aria-hidden="true"
              className={classes.typeTabSvg}
              style={{
                fill: currentTab === index ? "#ffffff" : item.color,
              }}>
              <use xlinkHref={item.icon}></use>
            </svg>
            <span
              className={`${classes.typeTabText} ${currentTab === index ? "active" : ""
                }`}>
              {item.label}
            </span>
          </li>
        );
      });

      return <ul className={classes.typeTab}>{tabs}</ul>
    }

    selectTab = (index) => {
      this.setState({currentTab: index});
      this.props.selectedRiskCallback(this.state.tabList[index].label);
    }
}

export default withRouter(withStyles(styles, {withTheme: true})(RiskLevelTab))