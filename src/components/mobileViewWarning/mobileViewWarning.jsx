import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { drawerWidth } from "../../theme/theme";

const styles = (theme) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    minHeight: "800px",
  },
  connectWalletContainer: {
    minWidth: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    [theme.breakpoints.up("md")]: {
      minWidth: "calc(100% - " + drawerWidth + "px)",
      paddingTop: "66px",
    },
    [theme.breakpoints.down("md")]: {
      paddingTop: "2rem",
    },
  },
  welcomeText: {
    fontWeight: "bold",
    fontSize: "36px",
    lineHeight: "36px",
    color: theme.themeColors.textT,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "24px",
      padding: "0px 46px",
    },
  },
  warningMessage: {
    fontSize: "1rem",
    lineHeight: "19px",
    textAlign: "center",
    color: "#18A0FB",
    // position: 'absolute',
    // bottom: '5%',
    // left: '0',
    // right: '0',
    margin: "auto",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  buttonGroup: {
    background: "#18A0FB",
    borderRadius: "48px",
    color: "#ffffff",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "50%",
    margin: "auto",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  buttonIconContainer: {
    width: "60px",
    background: "#50B9FF",
    borderRadius: "48px 0px 0px 48px",
    textAlign: "center",
    padding: "0.5rem 1.5rem",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  connectButtonIcon: {
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  buttonTextContainer: {
    padding: "1rem 2rem",
    textAlign: "center",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "5rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "3rem",
    },
  },
  descriptionContainer: {
    borderColor: theme.themeColors.lineT,
    borderWidth: "1px",
    borderStyle: "solid",
    // marginTop: '8rem',
    marginTop: "4rem",
    padding: "1.5rem 1rem",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: "auto",
      marginTop: "4rem",
    },
  },
  shieldContainer: {
    background: "rgba(24,160,251, 0.1)",
    borderRadius: "10px",
    width: "36px",
    margin: "auto",
    padding: "0.6rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: "22px",
    color: theme.themeColors.textT,
    lineHeight: "22px",
    marginTop: "13px",
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
    },
  },
  securityDesc: {
    color: theme.themeColors.textP,
    fontSize: "20px",
    lineHeight: "20px",
    marginTop: "20px",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  },
  titleDesc: {
    textAlign: "center",
    color: theme.themeColors.textP,
    fontSize: "20px",
    marginTop: "20px",
    [theme.breakpoints.down("md")]: {
      // padding: '1rem 2rem',
      fontSize: "14px",
      marginTop: "16px",
      padding: "0px 26px",
    },
  },
  alertDesc: {
    textAlign: "center",
    width: "65%",
    margin: "auto",
    whiteSpace: "normal",
    fontWeight: "bold",
    color: theme.themeColors.textP,
    fontSize: "16px",
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
      fontSize: "14px",
      marginTop: "16px",
    },
  },
});

class ConnectWallet extends Component {
  constructor(props) {
    super();

    this.state = {
      loading: true,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.connectWalletContainer}>
          <div>
            <Typography variant={"h2"} className={classes.welcomeText}>
              Please use a desktop browser. The app is not yet optimized for
              mobile access.
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ConnectWallet));
