import {
  CHANGE_NETWORK,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  CURRENT_THEME_RETURNED,
  GET_HAPPY_HOUR_STATUS,
  HAPPY_HOUR_RETURN,
  TOGGLE_DRAWER,
  NETWORK,
  ENS_ADDRESS_RESOLVED
} from "../../constants";
import {
  HEADER_TITLE_DAOMINE,
  HEADER_TITLE_DAOVIP_DVD,
  HEADER_TITLE_DAOVIP_DVG,
  HEADER_TITLE_INVEST,
  HEADER_TITLE_PORTFOLIO,
  HEADER_TITLE_SWAP,
  HEADER_TITLE_UPGRADE,
} from "../../constants/page-constant";
import { IconButton, Typography } from "@material-ui/core";
import React, { Component } from "react";

import HappyHourTimer from "../happyHourTimer";
import Store from "../../stores/storev2";
import ToggleTheme from "../toggleTheme";
import UnlockModal from "../unlock/unlockModal.jsx";
import { colors } from "../../theme";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import NetworkSelect from "./network/network";

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

const networkObj = {
  1: "Ethereum",
  4: "Rinkeby",
  56: "Binance",
  97: "Binance",
  42: "Kovan",
  80001: "Matic Testnet",
  137: "Polygon(Matic)"
};

const styles = (theme) => ({
  root: {
    verticalAlign: "top",
    width: "calc(100% - 240px)",
    height: "120px",
    display: "flex",
    padding: "40px 80px 0px 80px",
    background: theme.themeColors.back,
    zIndex: theme.zIndex.drawer - 1,
    position: "fixed",
    // left: '319px',
    left: "240px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "20px",
      left: "0px",
      padding: "0px",
    },
  },
  headerV2: {
    // background: colors.white,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderColor: theme.themeColors.lineT,
    borderTop: "none",
    width: "100%",
    display: "flex",
    padding: "15px 0px",
    alignItems: "center",
    // justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
      padding: "15px",
      background: theme.themeColors.itemBack,
    },
  },
  icon: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    cursor: "pointer",
  },
  links: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
  link: {
    padding: "12px 0px",
    margin: "0px 12px",
    cursor: "pointer",
    "&:hover": {
      paddingBottom: "9px",
      borderBottom: "3px solid " + colors.darkGray,
    },
  },
  title: {
    textTransform: "capitalize",
  },
  linkActive: {
    padding: "12px 0px",
    margin: "0px 12px",
    cursor: "pointer",
    paddingBottom: "9px",
    borderBottom: "3px solid " + colors.darkGray,
  },
  account: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      flex: "0",
    },
  },
  walletAddress: {
    padding: "12px",
    borderRadius: "41px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    background: "rgba(24,160,251,0.1)",
    "&:hover": {
      background: "rgba(47, 128, 237, 0.1)",
    },
    // [theme.breakpoints.down('sm')]: {
    //   display: 'flex',
    //   position: 'absolute',
    //   transform: 'translate(0, 200%)',
    //   border: "1px solid "+colors.borderBlue,
    //   background: colors.white
    // }
  },
  walletTitle: {
    flex: 1,
    color: colors.darkGray,
  },
  name: {
    paddingLeft: "24px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuButton: {
    marginLeft: -16,
    marginRight: 3,
  },
  addressAlias: {
    color: "#222222",
    fontSize: "14px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  // 当前标题等
  currentMenu: {
    display: "flex",
    alignItems: "center",
    fontSize: "26px",
    color: theme.themeColors.textT,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-end",
    },
  },
  netWork: {
    height: "26px",
    padding: "0px 6px",
    display: "flex",
    alignItems: "center",
    background: theme.themeColors.tagBack,
    fontSize: "12px",
    color: theme.themeColors.textT,
    marginLeft: "20px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.themeColors.lineT,
    position: "relative",
    cursor: "pointer",
  },
  menuIcon: {
    fill: theme.themeColors.textT,
    width: "24px",
    height: "24px",
  },
  netWorkIcon: {
    width: "18px",
    height: "18px",
    fill: "#7367F7",
    // marginRight: '10px'
  },
  netWorkList: {
    width: "100%",
    height: "auto",
    listStyle: "none",
    position: "absolute",
    top: "25px",
    left: "0px",
    marginLeft: "0",
    background: theme.themeColors.walletSelectBg,
  },
  netWorkItem: {
    height: "26px",
    padding: "0 6px",
    lineHeight: "26px",
    display: "flex",
    alignItems: "center",
    border: "1px solid " + theme.themeColors.lineT,
    cursor: "pointer",
  },
  selectIcon: {
    fill: theme.themeColors.blockBorder,
    width: "14px",
    height: "14px",
  },
  selectIconActive: {
    fill: theme.themeColors.blockBorder,
    width: "14px",
    height: "14px",
    transform: "rotate(180deg)",
  },
  pathname: {
    fontSize: "22px",
    padding: "16px 0px 16px 11px",
    color: theme.themeColors.contactUsText,
    background: theme.themeColors.back,
    borderBottom: "1px solid " + theme.themeColors.lineT,
  },
});

class Header extends Component {
  constructor(props) {
    super();

    this.state = {
      account: store.getStore("account"),
      modalOpen: false,
      hideNav: true,
      happyHour: store.getStore("happyHour"),
      menuObj: {
        "/portfolio": HEADER_TITLE_PORTFOLIO,
        "/invest": HEADER_TITLE_INVEST,
        "/stake-dvg": HEADER_TITLE_DAOVIP_DVG,
        "/stake-dvd": HEADER_TITLE_DAOVIP_DVD,
        "/daomine": HEADER_TITLE_DAOMINE,
        "/swap": HEADER_TITLE_SWAP,
        "/upgrade": HEADER_TITLE_UPGRADE,
      },
      currentTheme: store.getStore("currentTheme"),
      currentNetwork: 0,
      isShowNetWorkList: false,
      netWorkList: [
        {
          label: "Ethereum",
          value: 1,
          imgUrl: require("../../assets/ETH-logo.png"),
        },
        // {
        //   label:'Rinkeby',
        //   value:4,
        //   imgUrl:require('../../assets/ETH-logo.png')
        // },
        {
          label: "Binance",
          value: 56,
          imgUrl: require("../../assets/img_new/bnb-icon.png"),
        },
        {
          label: "Mumbai",
          value: NETWORK.MUMBAI,
          imgUrl: require("../../assets/img_new/polygon-icon.svg"),
        },
        {
          label: "Polygon(Matic)",
          value: NETWORK.MATIC,
          imgUrl: require("../../assets/img_new/polygon-icon.svg"),
        },
      ],
    };

    dispatcher.dispatch({
      type: GET_HAPPY_HOUR_STATUS,
    });
  }

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.on(CURRENT_THEME_RETURNED, this.currentThemeChanged);
    emitter.on(CHANGE_NETWORK, this.networkChanged);
    emitter.on(HAPPY_HOUR_RETURN, this.handleHappyHour);
    emitter.on(ENS_ADDRESS_RESOLVED, this.setAddressEnsName);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let currentHideNav = window.innerWidth <= 760;
    if (currentHideNav !== this.state.hideNav) {
      this.setState({ hideNav: currentHideNav });
    }
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(
      CONNECTION_DISCONNECTED,
      this.connectionDisconnected
    );
    window.removeEventListener("resize", this.resize.bind(this));
    emitter.removeListener(CURRENT_THEME_RETURNED, this.currentThemeChanged);
    emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
    emitter.removeListener(HAPPY_HOUR_RETURN, this.handleHappyHour);
    emitter.removeListener(ENS_ADDRESS_RESOLVED, this.setAddressEnsName);
  }

  handleHappyHour = (payload) => {
    this.setState({
      happyHour: payload.happyHour,
      threshold: payload.happyHourThreshold,
    });
  };

  currentThemeChanged = () => {
    this.setState({ currentTheme: store.getStore("currentTheme") });
  };

  connectionConnected = () => {
    this.setState({ account: store.getStore("account") });
  };

  connectionDisconnected = () => {
    this.setState({ account: store.getStore("account") });
  };

  networkChanged = (obj) => {
    console.log("networkChanged###", obj);
    this.setState({
      currentNetwork: obj.network,
    });
  };

  setAddressEnsName = async () => {
    this.setState({ addressEnsName: store.getStore("account").ensName });
  };

  showNetWorkList() {
    this.setState({
      isShowNetWorkList: !this.state.isShowNetWorkList,
    });
  }

  checkNetWork(id, e) {
    const onboard = store.getStore("onboard");
    // 阻止事件冒泡，（阻止这个合成事件，往document上冒泡，因此不会触发click方法）
    e.nativeEvent.stopImmediatePropagation();
    // 阻止合成事件间的冒泡，不会往最外层的div的test方法冒了，如果不加这句代码，就会冒泡至外层div，执行test方法。
    e.stopPropagation();
    onboard.config({
      darkMode: true,
      networkId: id,
    });
    this.setState({
      isShowNetWorkList: false,
    });
    // const onboard = Onboard({
    // networkId: 35,
    // ...other config options
    // })
  }

  render() {
    const { classes } = this.props;

    const { account, addressEnsName, modalOpen, hideNav } = this.state;

    var address = null;
    if (account.address) {
      address =
        account.address.substring(0, 6) +
        "..." +
        account.address.substring(
          account.address.length - 4,
          account.address.length
        );
    }
    const addressAlias = addressEnsName || address;

    // if (!hideNav && address == null) {
    //   return null;
    // }

    return (
      <div className={classes.root}>
        <div className={classes.headerV2}>
          {hideNav && this.renderToggleButton()}
          {hideNav && (
            <div className={classes.icon}>
              <img
                alt=""
                src={
                  this.state.currentTheme === "light"
                    ? require("../../assets/img_new/logo_light@2x.png")
                    : require("../../assets/img_new/logo_dark@2x.png")
                }
                height={"25px"}
                onClick={() => {
                  this.nav("");
                }}
              />
            </div>
          )}
      
          <div className={classes.currentMenu}>
            {/*** Page Header Title */}
            {!hideNav && (
              <span>
                {this.state.menuObj[this.props.history.location.pathname]}
              </span>
            )}

            {/*** Network Type */}
            <div style={{ marginLeft: "24px"}}>
              <NetworkSelect />
            </div>
          </div>
          
          {/*{!hideNav && <ToggleTheme></ToggleTheme>}*/}
          {this.renderHappyHourTimer()}
        </div>
        {hideNav ? (
          <div className={classes.pathname}>
            {this.state.menuObj[this.props.history.location.pathname]}
          </div>
        ) : null}

        {modalOpen && this.renderModal()}
      </div>
    );
  }

  renderHappyHourTimer = () => {
    const { classes } = this.props;

    let happyHour = store.getStore("happyHour");
    let happyHourStartTime = store.getStore("happyHourStartTime");
    let happyHourEndTime = store.getStore("happyHourEndTime");
    let happyHourThreshold = store.getStore("happyHourThreshold");
    // let happyHour = true;
    // let happyHourStartTime = "1624368201289";
    // let happyHourEndTime = Date.now() + 600000;

    if (happyHour) {
      return (
        <HappyHourTimer
          happyHourStartTime={happyHourStartTime}
          happyHourEndTime={happyHourEndTime}
          happyHourThreshold={happyHourThreshold}
          color="inherit"
          aria-label="Open drawer"
        ></HappyHourTimer>
      );
    } else {
      return null;
    }
  };

  renderToggleButton = () => {
    const { classes } = this.props;

    return (
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={this.handleDrawerOpen}
        className={classes.menuButton}
      >
        {/* <MenuIcon /> */}
        <svg aria-hidden="true" className={classes.menuIcon}>
          <use xlinkHref="#iconmenu-fold-line"></use>
        </svg>
      </IconButton>
    );
  };

  renderLink = (screen) => {
    const { classes } = this.props;

    return (
      <div
        className={
          window.location.pathname === "/" + screen
            ? classes.linkActive
            : classes.link
        }
        onClick={() => {
          this.nav(screen);
        }}
      >
        <Typography variant={"h4"} className={`title`}>
          {this.captializeFirstLetter(screen)}
        </Typography>
      </div>
    );
  };

  captializeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  nav = (screen) => {
    if (screen === "cover") {
      window.open("https://yinsure.finance", "_blank");
      return;
    }
    this.props.history.push("/" + screen);
  };

  addressClicked = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  renderModal = () => {
    return (
      <UnlockModal
        closeModal={this.closeModal}
        modalOpen={this.state.modalOpen}
      />
    );
  };

  handleDrawerOpen = () => {
    if (store.getStore("openDrawer")) {
      dispatcher.dispatch({ type: TOGGLE_DRAWER, content: { open: false } });
    } else {
      dispatcher.dispatch({ type: TOGGLE_DRAWER, content: { open: true } });
    }
  };
}

export default withRouter(withStyles(styles)(Header));
