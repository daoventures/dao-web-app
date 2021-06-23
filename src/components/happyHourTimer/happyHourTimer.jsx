import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import useCountDown from "react-countdown-hook";
import { colors } from "../../theme";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    verticalAlign: "top",
    width: "calc(100% - 240px)",
    display: "flex",
    padding: "40px 80px 0px 80px",
    background: theme.themeColors.back,
    zIndex: theme.zIndex.drawer - 1,
    position: "fixed",
    // left: '319px',
    left: "240px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "40px",
      left: "0px",
      padding: "0px",
    },
  },
  happyHourOuterBox: {
    padding: "0px 2px 0px 2px",
    margin: "5px 15px 0px 15px",
    background: theme.themeColors.totalValue,
    // background: "red",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  happyHourTimeBox: {
    margin: "0px 2px 0px 2px",
    width: "38px",
    height: "41px",
    background: "#FFBF41",
  },
  happyHourConfettiBox: {
    margin: "13px 7px 13px 7px",
    width: "25px",
    height: "25px",
  },
  happyHourDropDownBox: {
    margin: "0px 8px 0px 0px",
    width: "8px",
    height: "23px",
  },
  happyHourTimeValueText: {
    margin: "5px 5px 0px 5px",
    fontFamily: "Rubik",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "19px",
    letterSpacing: "0px",
    textAlign: "center",
    color: "#000000",
  },
  happyHourTimeText: {
    fontFamily: "Rubik",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "12px",
    letterSpacing: "0px",
    textAlign: "center",
    color: "#666666",
  },
  dialogRoot: {
    padding: "5px 10px 5px 5px",
    position: "absolute",
    border: "1px solid " + theme.themeColors.border,
    background: theme.themeColors.itemBack,
    color: theme.themeColors.textT,
    top: 70,
    right: 0,
    width: "360px",
  },
  dialogTitle: {
    background: theme.themeColors.menuSel,
    borderColor: theme.themeColors.blockBorder,
    color: theme.themeColors.menuSelText,
  },
  dialogContent: {
    background: theme.themeColors.itemBack,
    color: theme.themeColors.textT,
  },
});

const HappyHourHelpBox = ({ classes, enabled }) => {
  if (enabled) {
    return (
      <div className={classes.dialogRoot}>
        {/* <div className={classes.dialogContent}> */}
        <ul>
          <li>Enjoy gasless......</li>
          <li>
            Deposit more than 500 USD stablecoins to selected strategies and
            enjoy gas free up to X.XX ETH deposit. See more here
          </li>
        </ul>
        {/* </div>{" "} */}
      </div>
    );
  } else {
    return null;
  }
};

const HappyHourTimer = ({ classes, happyHourStartTime, happyHourEndTime }) => {
  let initialTime; // initial time in milliseconds, defaults to 60000
  const interval = 1000; // interval to change remaining time amount, defaults to 1000

  const calculateEventDuration = (happyHourEndTime) => {
    return happyHourEndTime - Date.now();
  };

  initialTime = calculateEventDuration(happyHourEndTime);

  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    interval
  );

  const [helpBox, toggleHelpBox] = useState(false);
  // start the timer during the first render
  useEffect(() => {
    start();
  }, []);

  const toDays = (duration) => {
    return Math.floor(duration / (1000 * 60 * 60 * 24));
  };
  const toHours = (duration) => {
    return Math.floor((duration / (1000 * 60 * 60)) % 24);
  };
  const toMinutes = (duration) => {
    return Math.floor((duration / 1000 / 60) % 60);
  };
  const toSeconds = (duration) => {
    return Math.floor((duration / 1000) % 60);
  };

  const _handleHappyHourHelpBox = () => {
    if (helpBox) {
      toggleHelpBox(false);
    } else {
      toggleHelpBox(true);
    }
  };

  return (
    <div>
      <div
        className={classes.happyHourOuterBox}
        onClick={() => _handleHappyHourHelpBox()}>
        <HappyHourHelpBox
          classes={classes}
          enabled={helpBox}></HappyHourHelpBox>
        <div className={classes.happyHourTimeBox}>
          {" "}
          <Typography className={classes.happyHourTimeValueText}>
            {" "}
            {toHours(timeLeft)}{" "}
          </Typography>
          <Typography className={classes.happyHourTimeText}>Hr</Typography>
        </div>
        <div className={classes.happyHourTimeBox}>
          <Typography className={classes.happyHourTimeValueText}>
            {" "}
            {toMinutes(timeLeft)}{" "}
          </Typography>
          <Typography className={classes.happyHourTimeText}>Min</Typography>
        </div>
        <div className={classes.happyHourTimeBox}>
          <Typography className={classes.happyHourTimeValueText}>
            {" "}
            {toSeconds(timeLeft)}{" "}
          </Typography>
          <Typography className={classes.happyHourTimeText}>Sec</Typography>
        </div>
        <div className={classes.happyHourConfettiBox}>
          <img
            alt="icon-popular"
            src={require("../../assets/img_new/confetti.svg")}
          />
        </div>
        <div className={classes.happyHourDropDownBox}>
          <img alt="drop-down" src={require("../../assets/dropdown.svg")} />
        </div>
      </div>
      {/* <Dialog
        onClose={() => _handleHappyHourHelpBox(false)}
        fullWidth={true}
        maxWidth={"sm"}
        classes={{ paper: classes.dialogRoot }}
        aria-labelledby="customized-dialog-title"
        open={helpBox}>
        <DialogContent className={classes.dialogContent}>Hello</DialogContent>
      </Dialog> */}
    </div>
  );
};

export default withRouter(withStyles(styles)(HappyHourTimer));

// export default HappyHourTimer;
