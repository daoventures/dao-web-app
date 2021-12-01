import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import {
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@material-ui/core";

import Store from "../../stores/storev2";
import {
  DRAWER_RETURNED,
  TOGGLE_DRAWER,
  CURRENT_THEME_RETURNED,
  CHANGE_NETWORK,
  CONNECTION_CONNECTED,
  GET_VAULT_INFO,
  NETWORK,
  CLAIM_DVD_HASH,
  CLAIM_DVD_SUCCESS,
  CLAIM_DVD_ERROR,
} from "../../constants/constants";
import {
  SIDE_MENU,
  SOCIAL_MEDIAS,
  SUB_MENU,
  AUDITORS,
} from "../../constants/page-constant";
import { drawerWidth } from "../../theme/theme";

import copy from "copy-to-clipboard";
import Snackbar from "../snackbar";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Airdrop from "../air-drop/airdrop";
import { hotjar } from "react-hotjar";

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;
const networkObj = {
  1: "Ethereum Mainnet",
  4: "Rinkeby Test Network",
};

const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    // padding: '26px',
    boxShadow: theme.themeColors.silderBoxShadow,
    // background: theme.themeColors.sidbarBack,
    background: theme.themeColors.back,
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderColor: theme.themeColors.lineT,
    overflowX: "hidden",
    // overflowY: 'auto',
    // minHeight: '1200px'
    display: "flex",
    flexDirection: "column",
    "&::-webkit-scrollbar": {
      width: "3px" /* 纵向滚动条*/,
      height: "5px" /* 横向滚动条 */,
      backgroundColor: "rgba(21,2,59,0.7)",
    },

    /*定义滚动条轨道 内阴影*/
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0)",
      /* background-color: rgba(21,2,59,0.7); */
      background: theme.themeColors.sliderLight,
    },

    /*定义滑块 内阴影*/
    "&::-webkit-scrollbar-thumb": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0)",
      background: theme.themeColors.back,
    },
  },
  drawerLeft: {
    borderRight: 0,
  },
  toolbar: {
    minHeight: "96px",
    [theme.breakpoints.down("sm")]: {
      minHeight: "73px",
    },
  },
  selected: {
    height: "60px",
    padding: "0px 20px",
    display: "flex",
    alignItems: "center",
    color: theme.themeColors.menuSelText,
    background: theme.themeColors.menuSel,
    borderColor: "transparent",
    borderImage: "linear-gradient(135deg, #0B2663 0%, #1152DF 100%)",
    borderImageSlice: 6,
    borderLeftWidth: "6px",
    borderStyle: "solid",
  },
  menuItem: {
    height: "60px",
    padding: "0px 20px",
    display: "flex",
    alignItems: "center",
    color: theme.themeColors.textZ,
    borderColor: "rgba(255, 255, 255, 0)",
    borderLeftWidth: "6px",
    borderStyle: "solid",
  },
  menuItem2: {
    height: "60px",
    padding: "0px 20px",
    display: "flex",
    alignItems: "center",
    color: theme.themeColors.contactUsText,
    borderColor: "rgba(255, 255, 255, 0)",
    borderLeftWidth: "6px",
    borderStyle: "solid",
  },
  menuSvg: {
    width: "24px",
    height: "24px",
    fill: theme.themeColors.textZ,
  },
  selectedSvg: {
    fill: theme.themeColors.menuSelText,
    width: "24px",
    height: "24px",
  },
  logo: {
    width: "100%",
    padding: "60px 20px 0px 20px",
  },
  paddingGitter: {
    paddingLeft: "26px",
    paddingRight: "16px",
  },
  footerMenu: {
    // position: 'absolute',
    // bottom: '5%'
    paddingTop: "100px",
    paddingBottom: "50px",
  },
  footerMenuH5: {
    position: "absolute",
    bottom: "-25%",
  },
  contactIcon: {
    fill: theme.themeColors.textZ,
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  accountInfoBlock: {
    // padding: '46px 20px 20px 20px'
    padding: "10px 20px 20px 20px",
    position: "relative",
  },
  accountInfo: {
    marginTop: "10px",
    width: "100%",
    height: "32px",
    color: theme.themeColors.textT,
    background: theme.themeColors.blockBack,
    borderColor: theme.themeColors.blockBorder,
    borderWidth: "1px",
    borderStyle: "solid",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    padding: "0px 10px",
    cursor: "pointer",
  },
  netWorkIcon: {
    width: "18px",
    height: "18px",
    fill: "#7367F7",
    marginRight: "10px",
  },
  bottomLink: {
    height: "40px",
  },
  bottomLinkBox: {
    paddingBottom: "20px",
  },
  addressSpan: {
    display: "inline-block",
    width: "115px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  selectIcon: {
    fill: theme.themeColors.blockBorder,
    width: "14px",
    height: "14px",
    marginLeft: "34px",
  },
  selectIconActive: {
    fill: theme.themeColors.blockBorder,
    width: "14px",
    height: "14px",
    marginLeft: "34px",
    transform: "rotate(180deg)",
  },
  walletList: {
    width: "201px",
    position: "absolute",
    top: "70px",
    background: theme.themeColors.walletSelectBg,
    borderColor: theme.themeColors.walletSelectBorder,
    borderStyle: "solid",
    borderWidth: "1px",
    textAlign: "center",
    left: "20px",
    zIndex: "5",
    userSelect: "none",
  },
  walletInfo: {
    padding: "25px 20px 23px",
  },
  addressP: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  addressIcon: {
    width: "14px",
    height: "14px",
    marginRight: "7px",
    fill: theme.themeColors.textT,
  },
  actionWallet: {
    padding: "28px 20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  changeWallet: {
    fontSize: "14px",
    color: theme.themeColors.textT,
    textAlign: "center",
    lineHeight: "40px",
    border: "1px solid " + theme.themeColors.blockBorder,
    marginBottom: "10px",
  },
  selectNetworkTitle: {
    fontSize: "20px",
    fontWeight: "500",
    color: theme.themeColors.textT,
  },
  selectNetwork: {
    width: "200px",
    margin: "auto",
    textAlign: "center",
  },
  totalValue: {
    padding: "0px 20px 20px 20px",
    background: theme.themeColors.totalValue,
    display: "flex",
    alignItems: "center",
  },
  totalValueRightText: {
    fontSize: "12px",
    fontWeight: "400",
    color: theme.themeColors.textT,
  },
  totalValueRightNum: {
    marginTop: "10px",
    fontSize: "14px",
    fontWeight: "500",
    color: theme.themeColors.textT,
    whiteSpace: "nowrap",
  },
  lockImg: {
    width: "36px",
    height: "36px",
    marginRight: "13px",
  },
  totalValueLeft: {
    paddingTop: "27px",
  },
  drawerBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  menuList: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
  },
  purpleText: {
    color: theme.themeColors.textP,
  },
  justifyCenter: {
    justifyContent: "center",
  },
  auditors: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px 0px",
  },
  submenuLinks: {
    fontSize: "12px",
  },
});

class SideDrawer extends Component {
  constructor(props) {
    super();
    this.state = {
      hideNav: true,
      openDrawer: store.getStore("openDrawer"),
      currentTheme: store.getStore("currentTheme"),
      currentNetwork: 0,
      currentAddress:
        (store.getStore("account") && store.getStore("account").address) || "",
      isShowWalletSelect: false,
      snackbarType: "",
      snackbarMessage: "",
      balance:
        (store.getStore("account") && store.getStore("account").balance) || "",
      totalValue: "",
      listItem: SIDE_MENU,
      subMenus: SUB_MENU,
      socialMedias: SOCIAL_MEDIAS,
      open: false,
      showAirDrop: false,
      airdropInfo: null,
      airdropSupportedNetwork: [NETWORK.ETHEREUM, NETWORK.KOVAN],
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    emitter.on(DRAWER_RETURNED, this.toggleDrawer);
    this.resize();
    this.getTotalTVL();
    emitter.on(CLAIM_DVD_HASH, this.handleClaim);
    emitter.on(CLAIM_DVD_SUCCESS, this.handleSuccessClaim);
    emitter.on(CLAIM_DVD_ERROR, this.handleErrorClaim);
  }

  componentWillMount() {
    emitter.on(CURRENT_THEME_RETURNED, this.currentThemeChanged);
    emitter.on(CHANGE_NETWORK, this.networkChanged);
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(GET_VAULT_INFO, this.currentValueTotal);
  }

  componentWillUnmount() {
    emitter.removeListener(DRAWER_RETURNED, this.toggleDrawer);
    window.removeEventListener("resize", this.resize.bind(this));
    emitter.removeListener(CURRENT_THEME_RETURNED, this.currentThemeChanged);
    emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CLAIM_DVD_HASH, this.handleClaim);
    emitter.removeListener(CLAIM_DVD_SUCCESS, this.handleSuccessClaim);
    emitter.removeListener(CLAIM_DVD_ERROR, this.handleErrorClaim);
  }

  handleClaim = (txnHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null };
    this.setState(snackbarObj);
    const that = this;
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txnHash, snackbarType: "Hash" };
      that.setState(snackbarObj);
    });
  };

  handleSuccessClaim = (txnHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null };
    this.setState(snackbarObj);
    const that = this;
    setTimeout(() => {
      const snackbarObj = {
        snackbarMessage: txnHash,
        snackbarType: "Transaction Success",
      };
      that.setState(snackbarObj);
    });
  };

  handleErrorClaim = (error) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null };
    this.setState(snackbarObj);
    const errorMessage = typeof error === "string" ? error : error.message;
    const that = this;
    setTimeout(() => {
      const snackbarObj = {
        snackbarMessage: errorMessage,
        snackbarType: "Error",
      };
      that.setState(snackbarObj);
    });
  };

  getTotalTVL = async () => {
    const tvlResult = await store._getTotalTVL();
    this.setState({
      totalValue: tvlResult.success
        ? parseFloat(tvlResult.tvl).toFixed(2)
        : `0`,
    });
  };

  getAirdropInfo = async (address) => {
    const network = store.getStore("network");

    if (!this.state.airdropSupportedNetwork.includes(network)) {
      this.setState({ showAirDrop: false });
      return;
    }

    const airdropInfoResponse = await store._getAirdropInfo(address);

    if (airdropInfoResponse && airdropInfoResponse.success) {
      const airdropInfo = airdropInfoResponse.result.info;
      const ongoingEvent = airdropInfoResponse.result.active;

      // No ongoing airdrop event, or user address not found
      if (!ongoingEvent || (ongoingEvent && airdropInfo === null)) {
        this.setState({ showAirDrop: false });
        return;
      }

      this.setState({
        showAirDrop: true,
        airdropInfo,
      });
    } else {
      this.setState({
        showAirDrop: false,
        airdropInfo: null,
      });
    }
  };

  resize() {
    let currentHideNav = window.innerWidth <= 760;
    if (currentHideNav !== this.state.hideNav) {
      this.setState({ hideNav: currentHideNav });
    }
  }

  networkChanged = (obj) => {
    const showAirDrop = this.state.airdropSupportedNetwork.includes(
      obj.network
    );
    this.setState({
      currentNetwork: obj.network,
      showAirDrop: showAirDrop,
    });
  };

  currentThemeChanged = () => {
    this.setState({ currentTheme: store.getStore("currentTheme") });
  };

  currentValueTotal = () => {
    this.setState({
      totalValue: Number(store.getStore("totalValue")).toFixed(2),
    });
  };

  connectionConnected = () => {
    const account = store.getStore("account");
    this.setState({
      currentAddress: account.address,
    });
    this.getAirdropInfo(this.state.currentAddress);
  };

  render() {
    return this.renderDrawer();
  }

  toggleDrawer = () => {
    this.setState({ openDrawer: store.getStore("openDrawer") });
  };

  dispatchToggle = () => {
    dispatcher.dispatch({ type: TOGGLE_DRAWER, content: { open: false } });
  };

  nav = (url) => {
    console.log(`in this.nav ${url}`);
    window.open(url, "_blank");
    hotjar.stateChange(`${url}`);
  };

  navInApp(screen) {
    this.props.history.push("/" + screen);
    hotjar.stateChange("/" + screen);
  }

  // changeWallet = async () => {

  // const onboard = store.getStore('onboard');
  // console.log(onboard,'onboard##');
  // await onboard.walletReset();
  // await onboard.walletSelect();

  // setTimeout(async () => {
  //   await onboard.walletCheck();
  // }, 1000);
  // }

  changeWallet = async () => {
    const onboard = store.getStore("onboard");
    await onboard.walletSelect();
  };

  disConnect = async () => {
    const onboard = store.getStore("onboard");
    await onboard.walletReset();
  };

  showWalletSelect = async () => {
    this.setState({
      isShowWalletSelect: !this.state.isShowWalletSelect,
    });
  };

  copyAddress = async () => {
    this.setState({
      snackbarMessage: "coop success",
      snackbarType: "Info",
    });
    copy(this.state.currentAddress);
    // const snackbarObj = { snackbarMessage: 'copy success', snackbarType: 'Error' }
    // this.setState(snackbarObj);
  };

  renderSnackbar = () => {
    var { snackbarType, snackbarMessage } = this.state;
    return (
      <Snackbar type={snackbarType} message={snackbarMessage} open={true} />
    );
  };
  handleClick = () => {};

  renderWalletInfo = () => {
    const { classes } = this.props;
    const { currentAddress } = this.state;
    const link =
      this.state.currentNetwork === 1
        ? "https://etherscan.io/address/"
        : "https://kovan.etherscan.io/address/";

    return (
      <div className={classes.accountInfoBlock}>
        {/* {this.state.currentNetwork && <div className={classes.accountInfo}>
          <svg aria-hidden="true" className={classes.netWorkIcon}>
            <use xlinkHref="#iconETH"></use>
          </svg>
          <span>{networkObj[this.state.currentNetwork]}</span>
        </div>} */}

        {this.state.currentAddress && (
          <div
            className={classes.accountInfo}
            onClick={() => {
              this.showWalletSelect();
            }}
          >
            <img
              alt="wallet"
              src={require("../../assets/img_new/wallet/metamask.c879a582@2x.png")}
              style={{ width: "18px", height: "18px", marginRight: "10px" }}
            />
            <span className={classes.addressSpan}>
              {this.state.currentAddress}
            </span>
            <i
              style={{
                display: "block",
                width: "6px",
                height: "6px",
                background: "#15C73E",
                borderRadius: "100%",
                marginLeft: "6px",
              }}
            ></i>
            <svg
              className={
                this.state.isShowWalletSelect
                  ? classes.selectIconActive
                  : classes.selectIcon
              }
              aria-hidden="true"
            >
              <use xlinkHref="#iconicon_menu_dropDown__day"></use>
            </svg>

            {this.state.isShowWalletSelect ? (
              <div className={classes.walletList}>
                <div className={classes.walletInfo}>
                  <img
                    alt="wallet"
                    src={require("../../assets/img_new/wallet/metamask.c879a582@2x.png")}
                    style={{
                      width: "28px",
                      height: "26px",
                      textAlign: "center",
                    }}
                  />

                  <p className={classes.addressP}>
                    {this.state.currentAddress}
                  </p>

                  <svg
                    className={classes.addressIcon}
                    aria-hidden="true"
                    onClick={() => {
                      this.copyAddress();
                    }}
                  >
                    <use xlinkHref="#iconcopy"></use>
                  </svg>

                  <svg
                    onClick={() => {
                      this.nav(`${link}${currentAddress}`);
                    }}
                    className={classes.addressIcon}
                    aria-hidden="true"
                  >
                    <use xlinkHref="#iconshare"></use>
                  </svg>
                </div>
                <div className={classes.actionWallet}>
                  <div
                    className={classes.changeWallet}
                    onClick={() => {
                      this.changeWallet();
                    }}
                  >
                    CHANGE WALLET
                  </div>
                  <div
                    className={classes.changeWallet}
                    onClick={() => {
                      this.disConnect();
                    }}
                  >
                    DISCONNECT
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  };

  renderTotalValueLocked = () => {
    const { classes } = this.props;
    return this.state.currentAddress ? (
      <div className={classes.accountInfoBlock}>
        <div className={classes.totalValue}>
          <div className={classes.totalValueLeft}>
            <img
              className={classes.lockImg}
              src={require("../../assets/lock-icon@2x.png")}
              alt=""
            />
          </div>
          <div className={classes.totalValueLeft}>
            <div className={classes.totalValueRightText}>
              Total Value Locked
            </div>
            <div className={classes.totalValueRightNum}>
              ${" "}
              {this.state.totalValue &&
                this.state.totalValue !== undefined &&
                this.state.totalValue
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
          </div>
        </div>
      </div>
    ) : null;
  };

  renderDrawer = () => {
    const { snackbarMessage, listItem, airdropInfo } = this.state;
    const {
      classes,
      match: { path },
    } = this.props;

    const { hideNav } = this.state;

    if (hideNav) {
      return this.renderSideDrawer();
    }

    return (
      <Fragment key={path}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          key={path}
          style={{
            WebkitScrollbarTrack:
              "'background-color': 'red','-webkit-border-radius': '2em','-moz-border-radius': '2em','border-radius': '2em'",
          }}
        >
          {/**  DAOventures Logo */}
          <div className={classes.logo} key={path}>
            <img
              alt=""
              src={
                this.state.currentTheme === "light"
                  ? require("../../assets/img_new/logo_light@2x.png")
                  : require("../../assets/img_new/logo_dark@2x.png")
              }
              style={{ cursor: "pointer", width: "100%" }}
              onClick={() => {
                this.nav("https://daoventures.co/");
              }}
            />
          </div>

          {/** Wallet information */}
          {this.renderWalletInfo()}

          {/** Total Value Locked */}
          {this.renderTotalValueLocked()}

          {/** Side Navigation Bar */}
          <div className={classes.menuList}>
            <List>
              {listItem && listItem.length > 0
                ? listItem.map((item) => this.renderMenuListItem(item))
                : null}
            </List>
          </div>

          {/** Airdrop */}
          {this.state.showAirDrop && this.state.airdropInfo && (
            <div className={classes.accountInfoBlock}>
              <Airdrop info={airdropInfo} />
            </div>
          )}

          {/** SubMenu */}
          {this.renderSubmenu()}

          {/** Footer */}
          {this.renderFooterMenu(false)}
          {snackbarMessage && this.renderSnackbar()}
        </Drawer>
      </Fragment>
    );
  };

  renderSideDrawer = () => {
    const {
      classes,
      match: { path },
    } = this.props;
    const { listItem, airdropInfo } = this.state;

    return (
      <Fragment key={path}>
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          key={path}
          open={this.state.openDrawer}
          onClose={this.dispatchToggle}
        >
          {/** Wallet information */}
          {this.renderWalletInfo()}

          {/** Total Value Locked */}
          {this.renderTotalValueLocked()}

          {/** Side Navigation Bar */}
          <List>
            {listItem && listItem.length > 0
              ? listItem.map((item) => this.renderMenuListItem(item))
              : null}
          </List>

          {/** Airdrop */}
          {this.state.showAirDrop && this.state.airdropInfo && (
            <Airdrop info={airdropInfo} />
          )}

          {this.renderSubmenu()}

          {/* *Footer */}
          {this.renderFooterMenu(true)}
        </Drawer>
      </Fragment>
    );
  };

  handleOpenMenu = (item) => {
    const { listItem } = this.state;
    listItem.forEach((i) => {
      if (i.name === item.name) {
        i.open = !item.open;
      }
    });
    this.setState({ listItem });
  };

  renderMenuListItem = (item) => {
    const { classes } = this.props;
    return (
      <React.Fragment key={item.key}>
        <ListItem
          button
          key={item.key}
          className={
            this.linkSelected(item.path) ? classes.selected : classes.menuItem
          }
          onClick={() =>
            item.childrens
              ? this.handleOpenMenu(item)
              : item.isExternalPath === true
              ? this.nav(item.path)
              : this.navInApp(item.name)
          }
        >
          <ListItemIcon style={{ minWidth: "40px" }}>
            <svg
              className={
                this.linkSelected(item.path)
                  ? classes.selectedSvg
                  : classes.menuSvg
              }
              aria-hidden="true"
            >
              <use xlinkHref={item.icon}></use>
            </svg>
          </ListItemIcon>
          <ListItemText primary={item.key} />

          {item.childrens ? item.open ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItem>

        {item.childrens && (
          <Collapse in={item.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.childrens.map((c) => {
                return (
                  <ListItem
                    button
                    key={c.key}
                    className={
                      window.location.pathname === item.path
                        ? classes.selected
                        : classes.menuItem
                    }
                    onClick={() => {
                      c.isExternalPath === true
                        ? this.nav(c.path)
                        : this.navInApp(c.name);
                    }}
                  >
                    <ListItemText primary={c.key} />
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  renderSubmenu = () => {
    const { classes } = this.props;
    const { subMenus } = this.state;

    return (
      <List className={classes.bottomLinkBox}>
        {subMenus && subMenus.length > 0
          ? subMenus.map((menu) => {
              return (
                <ListItem
                  button
                  key={menu.title}
                  className={`${
                    this.linkSelected(menu.link)
                      ? classes.selected
                      : classes.menuItem2
                  } ${classes.bottomLink} ${classes.submenuLinks}`}
                  onClick={() => {
                    this.nav(menu.link);
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography type={"h2"} style={{ fontSize: "12px" }}>
                        {menu.title}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })
          : null}
      </List>
    );
  };

  renderAuditor = () => {
    const { classes } = this.props;

    const auditors = AUDITORS;

    return (
      <div className={classes.accountInfoBlock}>
        <div
          className={`${classes.flexCenter} ${classes.purpleText} ${classes.justifyCenter}`}
        >
          <Typography variant={"h5"}>Audited By</Typography>
        </div>
        {auditors.map((row) => {
          return (
            <div className={classes.auditors}>
              {row.map((r) => {
                const imgLink = require(`../../assets/img_new/sidebar/auditor-${r.name}.${r.format}`);
                return (
                  <img
                    alt={r.name}
                    src={imgLink}
                    style={{ width: "84px", height: "18px", margin: "10px" }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  renderFooterMenu = (isMobile) => {
    const { classes } = this.props;
    const { hideNav } = this.state;

    const socialMedias = SOCIAL_MEDIAS;

    return (
      <div className={isMobile ? classes.footerMenuH5 : classes.footerMenu}>
        {hideNav && (
          <div style={{ marginLeft: "20px", paddingBottom: "40px" }}>
            {/*<ToggleTheme></ToggleTheme>*/}
          </div>
        )}

        {<div style={{ marginBottom: "10px" }}>{this.renderAuditor()}</div>}

        {/** Social Medias */}
        {socialMedias &&
          socialMedias.map((row, index) => {
            return (
              <Grid
                container
                spacing={2}
                className={classes.paddingGitter}
                key={index}
              >
                {row.map((item, i) => {
                  return this.renderSocialMediaIcon(item, index + "" + i);
                })}
              </Grid>
            );
          })}
      </div>
    );
  };

  renderSocialMediaIcon = (contact, key) => {
    const { classes } = this.props;
    return (
      <Grid item key={key}>
        <svg
          className={classes.contactIcon}
          aria-hidden="true"
          onClick={() => {
            if (contact.link !== "") {
              this.nav(contact.link);
            }
          }}
        >
          <use xlinkHref={contact.icon}></use>
        </svg>
      </Grid>
    );
  };

  linkSelected = (link) => {
    return window.location.pathname === link;
  };
}

export default withRouter(withStyles(styles)(SideDrawer));
