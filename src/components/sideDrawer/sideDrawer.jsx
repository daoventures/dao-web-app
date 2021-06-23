import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { Drawer, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';

import Store from "../../stores";
import {
  DRAWER_RETURNED,
  TOGGLE_DRAWER,
  CURRENT_THEME_RETURNED,
  CHANGE_NETWORK,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  GET_VAULT_BALANCES_FULL,
  GET_VAULT_INFO
} from '../../constants/constants';
import { drawerWidth } from "../../theme/theme";
import ToggleTheme from '../toggleTheme'

import copy from 'copy-to-clipboard';
import Snackbar from '../snackbar'
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store
const networkObj = {
  1: 'Ethereum Mainnet',
  4: 'Rinkeby Test Network'
};

const styles = theme => ({
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
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderColor: theme.themeColors.lineT,
    overflowX: 'hidden',
    // overflowY: 'auto',
    // minHeight: '1200px'
    display: 'flex',
    flexDirection: 'column',
    '&::-webkit-scrollbar':{
      width: '3px',/* 纵向滚动条*/
      height: '5px',/* 横向滚动条 */
      backgroundColor: 'rgba(21,2,59,0.7)'
    },
    
    /*定义滚动条轨道 内阴影*/
    '&::-webkit-scrollbar-track':{
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0)',
      /* background-color: rgba(21,2,59,0.7); */
      'background': theme.themeColors.sliderLight
    },
    
    /*定义滑块 内阴影*/
    '&::-webkit-scrollbar-thumb':{
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0)',
      'background': theme.themeColors.back
    }
  },
  drawerLeft: {
    borderRight: 0
  },
  toolbar: {
    minHeight: '96px',
    [theme.breakpoints.down('sm')]: {
      minHeight: '73px'
    }
  },
  selected: {
    height: '60px',
    padding: '0px 20px',
    display: 'flex',
    alignItems: 'center',
    color: theme.themeColors.menuSelText,
    background: theme.themeColors.menuSel,
    borderColor: 'transparent',
    borderImage: 'linear-gradient(135deg, #0B2663 0%, #1152DF 100%)',
    borderImageSlice: 6,
    borderLeftWidth: '6px',
    borderStyle: 'solid'
  },
  menuItem: {
    height: '60px',
    padding: '0px 20px',
    display: 'flex',
    alignItems: 'center',
    color: theme.themeColors.textZ,
    borderColor: 'rgba(255, 255, 255, 0)',
    borderLeftWidth: '6px',
    borderStyle: 'solid'
  },
  menuItem2: {
    height: '60px',
    padding: '0px 20px',
    display: 'flex',
    alignItems: 'center',
    color: theme.themeColors.contactUsText,
    borderColor: 'rgba(255, 255, 255, 0)',
    borderLeftWidth: '6px',
    borderStyle: 'solid'
  },
  menuSvg: {
    width: '24px',
    height: '24px',
    fill: theme.themeColors.textZ
  },
  selectedSvg: {
    fill: theme.themeColors.menuSelText,
    width: '24px',
    height: '24px'
  },
  logo: {
    width: '100%',
    padding: '60px 20px 0px 20px'
  },
  paddingGitter: {
    paddingLeft: '16px',
    paddingRight: '16px'
  },
  footerMenu: {
    // position: 'absolute',
    // bottom: '5%'
    paddingTop: '100px',
    paddingBottom: '50px'
  },
  footerMenuH5: {
    position: 'absolute',
    bottom: '-25%'
  },
  contactIcon: {
    fill: theme.themeColors.textZ,
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  accountInfoBlock: {
    // padding: '46px 20px 20px 20px'
    padding: '10px 20px 20px 20px',
    position: 'relative'
  },
  accountInfo: {
    marginTop: '10px',
    width: '100%',
    height: '32px',
    color: theme.themeColors.textT,
    background: theme.themeColors.blockBack,
    borderColor: theme.themeColors.blockBorder,
    borderWidth: '1px',
    borderStyle: 'solid',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 10px',
    cursor: 'pointer'
  },
  netWorkIcon: {
    width: '18px',
    height: '18px',
    fill: '#7367F7',
    marginRight: '10px'
  },
  bottomLink: {
    height: '40px'
  },
  bottomLinkBox: {
    paddingBottom: '20px'
  },
  addressSpan: {
    display: 'inline-block',
    width: '115px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  selectIcon: {
    fill: theme.themeColors.blockBorder,
    width: '14px',
    height: '14px',
    marginLeft: '34px'
  },
  selectIconActive: {
    fill: theme.themeColors.blockBorder,
    width: '14px',
    height: '14px',
    marginLeft: '34px',
    transform: 'rotate(180deg)'
  },
  walletList: {
    width: '201px',
    position: 'absolute',
    top: '70px',
    background: theme.themeColors.walletSelectBg,
    borderColor: theme.themeColors.walletSelectBorder,
    borderStyle:'solid',
    borderWidth:'1px',
    textAlign: 'center',
    left: '20px',
    zIndex: '5',
    userSelect: 'none'
  },
  walletInfo: {
    padding: '25px 20px 23px',

  },
  addressP: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  addressIcon: {
    width: '14px',
    height: '14px',
    marginRight: '7px',
    fill: theme.themeColors.textT,
  },
  actionWallet: {
    padding: '28px 20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  },
  changeWallet: {
    fontSize: '14px',
    color: theme.themeColors.textT,
    textAlign: 'center',
    lineHeight: '40px',
    border: '1px solid ' + theme.themeColors.blockBorder,
    marginBottom: '10px'
  },
  selectNetworkTitle: {
    fontSize: '20px',
    fontWeight: '500',
    color: theme.themeColors.textT
  },
  selectNetwork: {
    width: '200px',
    margin: 'auto',
    textAlign: 'center'
  },
  totalValue: {
    padding: '0px 20px 20px 20px',
    background: theme.themeColors.totalValue,
    display: 'flex',
    alignItems: 'center'
  },
  totalValueRightText: {
    fontSize: '12px',
    fontWeight: '400',
    color: theme.themeColors.textT
  },
  totalValueRightNum: {
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: '500',
    color: theme.themeColors.textT,
    whiteSpace: 'nowrap'
  },
  lockImg: {
    width: '36px',
    height: '36px',
    marginRight: '13px'
  },
  totalValueLeft: {
    paddingTop: '27px'
  },
  drawerBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  menuList:{
    height:'100%',
    display:'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  }
})

class SideDrawer extends Component {
  constructor(props) {
    super()
    this.state = {
      hideNav: true,
      openDrawer: store.getStore('openDrawer'),
      currentTheme: store.getStore('currentTheme'),
      currentNetwork: 0,
      currentAddress: store.getStore('account') && store.getStore('account').address || '',
      isShowWalletSelect: false,
      snackbarType: '',
      snackbarMessage: '',
      balance: store.getStore('account') && store.getStore('account').balance || '',
      totalValue: '',
      open:false
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    emitter.on(DRAWER_RETURNED, this.toggleDrawer)
    this.resize();
  }

  componentWillMount() {
    emitter.on(CURRENT_THEME_RETURNED, this.currentThemeChanged);
    emitter.on(CHANGE_NETWORK, this.networkChanged);
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(GET_VAULT_INFO, this.currentValueTotal);
  }

  componentWillUnmount() {
    emitter.removeListener(DRAWER_RETURNED, this.toggleDrawer)
    window.removeEventListener("resize", this.resize.bind(this));
    emitter.removeListener(CURRENT_THEME_RETURNED, this.currentThemeChanged);
    emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
  }

  resize() {
    let currentHideNav = (window.innerWidth <= 760);
    if (currentHideNav !== this.state.hideNav) {
      this.setState({ hideNav: currentHideNav });
    }
  }

  networkChanged = (obj) => {
    this.setState({
      currentNetwork: obj.network
    });
  }

  currentThemeChanged = () => {
    this.setState({ currentTheme: store.getStore('currentTheme') })
  }

  currentValueTotal = () => {
    this.setState({
      totalValue: Number(store.getStore('totalValue')).toFixed(2)
    })
  }

  connectionConnected = () => {
    const account = store.getStore('account')
    this.setState({
      currentAddress: account.address
    });
  }

  render() {
    return this.renderDrawer();
  }

  toggleDrawer = () => {
    this.setState({ openDrawer: store.getStore('openDrawer') })
  }

  dispatchToggle = () => {
    dispatcher.dispatch({ type: TOGGLE_DRAWER, content: { open: false } })
  }

  nav = (url) => {
    window.open(url, '_blank')
  }

  navInApp(screen) {
    this.props.history.push('/' + screen)
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
    const onboard = store.getStore('onboard');
    await onboard.walletSelect();
  }

  disConnect = async () => {
    const onboard = store.getStore('onboard');
    await onboard.walletReset();
  }


  showWalletSelect = async () => {
    this.setState({
      isShowWalletSelect: !this.state.isShowWalletSelect
    });
  }

  copyAddress = async () => {
    this.setState({
      snackbarMessage: 'coop success',
      snackbarType: 'Info'
    });
    copy(this.state.currentAddress);
    // const snackbarObj = { snackbarMessage: 'copy success', snackbarType: 'Error' }
    // this.setState(snackbarObj);
  }

  renderSnackbar = () => {
    var {
      snackbarType,
      snackbarMessage
    } = this.state
    return <Snackbar type={snackbarType} message={snackbarMessage} open={true} />
  };
  handleClick=()=>{

  }

  renderDrawer = () => {
    const {
      snackbarMessage,
    } = this.state
    const {
      classes
    } = this.props;

    const {
      hideNav
    } = this.state;

    if (hideNav) {
      return this.renderSideDrawer();
    }

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
          // paperAnchorLeft: classes.drawerLeft,
        }}
        style={{
          WebkitScrollbarTrack:
            "'background-color': 'red','-webkit-border-radius': '2em','-moz-border-radius': '2em','border-radius': '2em'"

        }}
      >
        <div className={classes.logo}>
          <img
            alt=""
            // src={ require('../../assets/DAOventures-logo.png') }
            src={this.state.currentTheme === 'light' ? require('../../assets/img_new/logo_light@2x.png') : require('../../assets/img_new/logo_dark@2x.png')}
            // height={ '30px' }
            style={{ cursor: 'pointer', width: '100%' }}
            onClick={() => { this.nav('https://daoventures.co/') }}
          />
        </div>

        <div className={classes.accountInfoBlock}>
          {/* {this.state.currentNetwork && <div className={classes.accountInfo}>
            <svg aria-hidden="true" className={classes.netWorkIcon}>
              <use xlinkHref="#iconETH"></use>
            </svg>
            <span>{networkObj[this.state.currentNetwork]}</span>
          </div>} */}
          {this.state.currentAddress && <div className={classes.accountInfo} onClick={() => { this.showWalletSelect() }}>
            <img src={require('../../assets/img_new/wallet/metamask.c879a582@2x.png')} style={{ width: '18px', height: '18px', marginRight: '10px' }} />
            <span className={classes.addressSpan}>{this.state.currentAddress}</span>
            <i style={{
              display: 'block',
              width: '6px',
              height: '6px',
              background: '#15C73E',
              borderRadius: '100%',
              marginLeft: '6px'
            }}></i>
            <svg className={this.state.isShowWalletSelect ? classes.selectIconActive : classes.selectIcon} aria-hidden="true">
              <use xlinkHref="#iconicon_menu_dropDown__day"></use>
            </svg>
            {this.state.isShowWalletSelect ? <div className={classes.walletList}>
              <div className={classes.walletInfo}>
                <img alt="" src={require('../../assets/img_new/wallet/metamask.c879a582@2x.png')} style={{ width: '28px', height: '26px', textAlign: 'center' }} />
                <p className={classes.addressP}>{this.state.currentAddress}</p>
                <svg className={classes.addressIcon} aria-hidden="true" onClick={() => { this.copyAddress() }} >
                  <use xlinkHref="#iconcopy"></use>
                </svg>
                <svg onClick={() => { this.nav('https://twitter.com/VenturesDao') }} className={classes.addressIcon} aria-hidden="true" >
                  <use xlinkHref="#iconshare"></use>
                </svg>
              </div>
              <div className={classes.actionWallet}>
                <div className={classes.changeWallet} onClick={() => { this.changeWallet() }}>CHANGE WALLET</div>
                <div className={classes.changeWallet} onClick={() => { this.disConnect() }}>DISCONNECT</div>
              </div>
            </div> : null}

          </div>}
        </div>
        {this.state.currentAddress && <div className={classes.accountInfoBlock}>
          <div className={classes.totalValue}>
            <div className={classes.totalValueLeft}>
              <img className={classes.lockImg} src={require('../../assets/lock-icon@2x.png')} alt="" />
            </div>
            <div className={classes.totalValueLeft}>
              <div className={classes.totalValueRightText}>Total Value Locked</div>
              <div className={classes.totalValueRightNum}>$ {this.state.totalValue}</div>
            </div>
          </div>
        </div>}
        <div className={classes.menuList}>

        
        <List>
          {/**
             * <ListItem button key={'PORTFOLIO'} className={this.linkSelected('/portfolio') ? classes.selected : classes.menuItem} onClick={() => { this.navInApp('portfolio') }}>
                <ListItemIcon>
                  <svg className={(this.linkSelected('/portfolio')) ? classes.selectedSvg : classes.menuSvg} aria-hidden="true">
                    <use xlinkHref="#iconmenu_porftfolio_nor_day"></use>
                  </svg>
                </ListItemIcon>
                <ListItemText primary={'PORTFOLIO'} />
              </ListItem>
           */}
          

          <ListItem button key={'INVEST'} className={this.linkSelected('/invest') ? classes.selected : classes.menuItem} onClick={() => { this.navInApp('invest') }}>
            <ListItemIcon>
              {/* {this.renderIcon('line-chart', '/invest')} */}
              <svg className={(this.linkSelected('/invest')) ? classes.selectedSvg : classes.menuSvg} aria-hidden="true">
                <use xlinkHref="#iconmenu_porftfolio_normal_nightbeifen1"></use>
              </svg>
            </ListItemIcon>
            <ListItemText primary={'INVEST'} />
          </ListItem>

          <ListItem button key={'GROW'} className={this.linkSelected('/stake') ? classes.selected : classes.menuItem} onClick={() => { this.navInApp('stake') }}>
            <ListItemIcon>
              
              <svg className={(this.linkSelected('/stake')) ? classes.selectedSvg : classes.menuSvg} aria-hidden="true">
                <use xlinkHref="#iconmenu_stake_normal_night"></use>
              </svg>
            </ListItemIcon>
            <ListItemText primary={'GROW'} />
          </ListItem>
          {/* <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItem>
            </List>
          </Collapse> */}

          <ListItem button key={'SWAP'} className={this.linkSelected('/swap') ? classes.selected : classes.menuItem} onClick={() => { this.navInApp('swap') }}>
            <ListItemIcon>
              {/* {this.renderIcon('pie-chart', '/portfolio')} */}
              <svg className={(this.linkSelected('/swap')) ? classes.selectedSvg : classes.menuSvg} aria-hidden="true">
                <use xlinkHref="#iconmenu_features_nor_night"></use>
              </svg>
            </ListItemIcon>
            <ListItemText primary={'SWAP'} />
          </ListItem>
          


          {/* <div className={classes.selectNetwork}>
          <div className={classes.selectNetworkTitle}>Select network</div>
          <div className={classes.netWork}>
                <div className={classes.changeWallet} onClick={() => { this.changeWallet() }}>ETH Mainnet</div>
                <div className={classes.changeWallet} onClick={() => { this.disConnect() }}>BSC Mainnet</div>
          </div>
        </div> */}
        </List>
        { this.renderFooterMenu()}
        </div>
        { snackbarMessage && this.renderSnackbar()}
      </Drawer >
    );
  }

  renderSideDrawer = () => {
    const {
      classes
    } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={this.state.openDrawer}
        onClose={this.dispatchToggle}
      >
        <div className={classes.accountInfoBlock}>
          {/* {this.state.currentNetwork && <div className={classes.accountInfo}>
            <svg aria-hidden="true" className={classes.netWorkIcon}>
              <use xlinkHref="#iconETH"></use>
            </svg>
            <span>{networkObj[this.state.currentNetwork]}</span>
          </div>} */}
          {this.state.currentAddress && <div className={classes.accountInfo} onClick={() => { this.showWalletSelect() }}>
            <img src={require('../../assets/img_new/wallet/metamask.c879a582@2x.png')} style={{ width: '18px', height: '18px', marginRight: '10px' }} />
            <span className={classes.addressSpan}>{this.state.currentAddress}</span>
            <i style={{
              display: 'block',
              width: '6px',
              height: '6px',
              background: '#15C73E',
              borderRadius: '100%',
              marginLeft: '6px'
            }}></i>
            <svg className={this.state.isShowWalletSelect ? classes.selectIconActive : classes.selectIcon} aria-hidden="true">
              <use xlinkHref="#iconicon_menu_dropDown__day"></use>
            </svg>
            {this.state.isShowWalletSelect ? <div className={classes.walletList}>
              <div className={classes.walletInfo}>
                <img alt="" src={require('../../assets/img_new/wallet/metamask.c879a582@2x.png')} style={{ width: '28px', height: '26px', textAlign: 'center' }} />
                <p className={classes.addressP}>{this.state.currentAddress}</p>
                <svg className={classes.addressIcon} aria-hidden="true" onClick={() => { this.copyAddress() }} >
                  <use xlinkHref="#iconcopy"></use>
                </svg>
                <svg onClick={() => { this.nav('https://twitter.com/VenturesDao') }} className={classes.addressIcon} aria-hidden="true" >
                  <use xlinkHref="#iconshare"></use>
                </svg>
              </div>
              <div className={classes.actionWallet}>
                <div className={classes.changeWallet} onClick={() => { this.changeWallet() }}>CHANGE WALLET</div>
                <div className={classes.changeWallet} onClick={() => { this.disConnect() }}>DISCONNECT</div>
              </div>
            </div> : null}

          </div>}
        </div>
        {this.state.currentAddress && <div className={classes.accountInfoBlock}>
          <div className={classes.totalValue}>
            <div className={classes.totalValueLeft}>
              <img className={classes.lockImg} src={require('../../assets/lock-icon@2x.png')} alt="" />
            </div>
            <div className={classes.totalValueLeft}>
              <div className={classes.totalValueRightText}>Total Value Locked</div>
              <div className={classes.totalValueRightNum}>$ {this.state.totalValue}</div>
            </div>
          </div>
        </div>}
        <List>
          {/**
           * <ListItem button key={'Portfolios'} className={this.linkSelected('/portfolio') ? classes.selected : classes.menuItem} onClick={() => { this.navInApp('portfolio') }}>
                <ListItemIcon>
                  <svg className={(this.linkSelected('/portfolio')) ? classes.selectedSvg : classes.menuSvg} aria-hidden="true">
                    <use xlinkHref="#iconmenu_porftfolio_nor_day"></use>
                  </svg>
                </ListItemIcon>
              <ListItemText primary={'Portfolios'} />
          </ListItem>
           */}
         

          <ListItem button key={'Invest'} className={this.linkSelected('/invest') ? classes.selected : classes.menuItem} onClick={() => { this.navInApp('invest') }}>
            <ListItemIcon>
              {/* {this.renderIcon('line-chart', '/invest')} */}
              <svg className={(this.linkSelected('/invest')) ? classes.selectedSvg : classes.menuSvg} aria-hidden="true">
                <use xlinkHref="#iconmenu_porftfolio_normal_nightbeifen1"></use>
              </svg>
            </ListItemIcon>
            <ListItemText primary={'Invest'} />
          </ListItem>

          <ListItem button key={'GROW'} className={this.linkSelected('/stake') ? classes.selected : classes.menuItem} onClick={() => { this.navInApp('stake') }}>
            <ListItemIcon>
              {/* {this.renderIcon('pie-chart', '/portfolio')} */}
              <svg className={(this.linkSelected('/stake')) ? classes.selectedSvg : classes.menuSvg} aria-hidden="true">
                <use xlinkHref="#iconmenu_stake_normal_night"></use>
              </svg>
            </ListItemIcon>
            <ListItemText primary={'GROW'} />
          </ListItem>

          <ListItem button key={'SWAP'} className={this.linkSelected('/swap') ? classes.selected : classes.menuItem} onClick={() => { this.navInApp('swap') }}>
            <ListItemIcon>
              {/* {this.renderIcon('pie-chart', '/portfolio')} */}
              <svg className={(this.linkSelected('/swap')) ? classes.selectedSvg : classes.menuSvg} aria-hidden="true">
                <use xlinkHref="#iconmenu_features_nor_night"></use>
              </svg>
            </ListItemIcon>
            <ListItemText primary={'SWAP'} />
          </ListItem>


        </List>

        {this.renderFooterMenuH5()}
      </Drawer>
    );
  }

  renderFooterMenu = () => {
    const { classes } = this.props;
    const {
      hideNav
    } = this.state;
    return (
      <div className={classes.footerMenu}>
        <List className={classes.bottomLinkBox}>
          <ListItem button key={'Your Feedback'} className={`${(this.linkSelected('/user-feedback')) ? classes.selected : classes.menuItem2} ${classes.bottomLink}`} onClick={() => { this.nav('http://feedback.daoventures.co/beta-product-v1') }}>
            <ListItemText primary={'Your Feedback'} />
          </ListItem>

          <ListItem button key={'FAQ'} className={`${(this.linkSelected('/faq')) ? classes.selected : classes.menuItem2} ${classes.bottomLink}`} onClick={() => { this.nav('https://daoventures.gitbook.io/daoventures/frequently-asked-question') }}>
            <ListItemText primary={'FAQ'} />
          </ListItem>

          <ListItem button key={'About Us'} className={`${(this.linkSelected('/about-us')) ? classes.selected : classes.menuItem2} ${classes.bottomLink}`} onClick={() => { this.nav('https://daoventures.co/about') }}>
            <ListItemText primary={'About Us'} />
          </ListItem>
        </List>

        {hideNav && <div style={{ marginLeft: '20px', paddingBottom: '40px' }}><ToggleTheme></ToggleTheme></div>}

        {/* <Grid container spacing={2} className={classes.paddingGitter}>
            <Grid item>
              <img alt="" src={require('../../assets/reddit.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://www.reddit.com/r/DAOVentures/') } } />
            </Grid>
            <Grid item>
              <img alt="" src={require('../../assets/twitter.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://twitter.com/VenturesDao') } } />
            </Grid>
            <Grid item>
              <img alt="" src={require('../../assets/facebook.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://www.facebook.com/DAOventuresCo/') } } />
            </Grid>
            <Grid item>
              <img alt="" src={require('../../assets/medium.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://daoventuresco.medium.com/ ') } } />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.paddingGitter}>
            <Grid item>
              <img alt="" src={require('../../assets/slack.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://join.slack.com/t/daoventures/shared_invite/zt-k4hmm44g-p5ME~5I~fm0pkfY2U8AUIw') } } />
            </Grid>
            <Grid item>
              <img alt="" src={require('../../assets/linkedin.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://www.linkedin.com/company/daoventuresco/') } } />
            </Grid>
            <Grid item>
              <img alt="" src={require('../../assets/email.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('mailto:support@daoventures.co') } } />
            </Grid>
            <Grid item>
              <img alt="" src={require('../../assets/telegram.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://t.me/DAOventures') } } />
            </Grid>
          </Grid> */}
        <Grid container spacing={2} className={classes.paddingGitter}>

          <Grid item>
            {/* <img alt="" src={require('../../assets/facebook.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://www.facebook.com/DAOventuresCo/') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://www.facebook.com/DAOventuresCo/') }}>
              <use xlinkHref="#iconfacebook"></use>
            </svg>
          </Grid>
          <Grid item>
            {/* <img alt="" src={require('../../assets/twitter.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://twitter.com/VenturesDao') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://twitter.com/VenturesDao') }}>
              <use xlinkHref="#icontwitter"></use>
            </svg>
          </Grid>
          <Grid item>
            {/* <img alt="" src={require('../../assets/linkedin.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://www.linkedin.com/company/daoventuresco/') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://www.linkedin.com/company/daoventuresco/') }} >
              <use xlinkHref="#iconlinked"></use>
            </svg>
          </Grid>
          <Grid item>
            <svg className={classes.contactIcon} aria-hidden="true">
              <use xlinkHref="#icondiscord"></use>
            </svg>
          </Grid>
          <Grid item>
            {/* <img alt="" src={require('../../assets/medium.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://daoventuresco.medium.com/ ') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://daoventuresco.medium.com/ ') }}>
              <use xlinkHref="#iconmedium"></use>
            </svg>
          </Grid>
        </Grid>

        <Grid container spacing={2} className={classes.paddingGitter}>
          <Grid item>
            {/* <img alt="" src={require('../../assets/reddit.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://www.reddit.com/r/DAOVentures/') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://www.reddit.com/r/DAOVentures/') }}>
              <use xlinkHref="#iconreddit"></use>
            </svg>
          </Grid>
          <Grid item>
            {/* <img alt="" src={require('../../assets/telegram.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://t.me/DAOventures') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://t.me/DAOventures') }}>
              <use xlinkHref="#icontelegram"></use>
            </svg>
          </Grid>
          <Grid item>
            {/* <img alt="" src={require('../../assets/email.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('mailto:support@daoventures.co') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('mailto:support@daoventures.co') }}>
              <use xlinkHref="#iconemail"></use>
            </svg>
          </Grid>
          <Grid item>
            {/* <img alt="" src={require('../../assets/slack.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://join.slack.com/t/daoventures/shared_invite/zt-k4hmm44g-p5ME~5I~fm0pkfY2U8AUIw') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://join.slack.com/t/daoventures/shared_invite/zt-k4hmm44g-p5ME~5I~fm0pkfY2U8AUIw') }} >
              <use xlinkHref="#iconslack"></use>
            </svg>
          </Grid>
          <Grid item>
            <svg className={classes.contactIcon} aria-hidden="true">
              <use xlinkHref="#iconweibo"></use>
            </svg>
          </Grid>
        </Grid>

        <Grid container spacing={2} className={classes.paddingGitter}>
          <Grid item>
            <svg className={classes.contactIcon} aria-hidden="true">
              <use xlinkHref="#iconweixin1"></use>
            </svg>
          </Grid>
          <Grid item>
            <svg className={classes.contactIcon} aria-hidden="true">
              <use xlinkHref="#iconcoinMarketCap"></use>
            </svg>
          </Grid>
          <Grid item>
            <svg className={classes.contactIcon} aria-hidden="true">
              <use xlinkHref="#iconcoingecko"></use>
            </svg>
          </Grid>
        </Grid>
      </div>
    )
  }
  renderFooterMenuH5 = () => {
    const { classes } = this.props;
    const {
      hideNav
    } = this.state;
    return (
      <div className={classes.footerMenuH5}>
        <List className={classes.bottomLinkBox}>
          <ListItem button key={'Your Feedback'} className={`${(this.linkSelected('/user-feedback')) ? classes.selected : classes.menuItem2} ${classes.bottomLink}`} onClick={() => { this.nav('http://feedback.daoventures.co/beta-product-v1') }}>
            <ListItemText primary={'Your Feedback'} />
          </ListItem>

          <ListItem button key={'FAQ'} className={`${(this.linkSelected('/faq')) ? classes.selected : classes.menuItem2} ${classes.bottomLink}`} onClick={() => { this.nav('https://daoventures.gitbook.io/daoventures/frequently-asked-question') }}>
            <ListItemText primary={'FAQ'} />
          </ListItem>

          <ListItem button key={'About Us'} className={`${(this.linkSelected('/about-us')) ? classes.selected : classes.menuItem2} ${classes.bottomLink}`} onClick={() => { this.nav('https://daoventures.co/about') }}>
            <ListItemText primary={'About Us'} />
          </ListItem>
        </List>

        {hideNav && <div style={{ marginLeft: '20px', paddingBottom: '40px' }}><ToggleTheme></ToggleTheme></div>}

        {/* <Grid container spacing={2} className={classes.paddingGitter}>
            <Grid item>
              <img alt="" src={require('../../assets/reddit.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://www.reddit.com/r/DAOVentures/') } } />
            </Grid>
            <Grid item>
              <img alt="" src={require('../../assets/twitter.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://twitter.com/VenturesDao') } } />
            </Grid>
            <Grid item>
              <img alt="" src={require('../../assets/facebook.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://www.facebook.com/DAOventuresCo/') } } />
            </Grid>
            <Grid item>
              <img alt="" src={require('../../assets/medium.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://daoventuresco.medium.com/ ') } } />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.paddingGitter}>
            <Grid item>
              <img alt="" src={require('../../assets/slack.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://join.slack.com/t/daoventures/shared_invite/zt-k4hmm44g-p5ME~5I~fm0pkfY2U8AUIw') } } />
            </Grid>
            <Grid item>
              <img alt="" src={require('../../assets/linkedin.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://www.linkedin.com/company/daoventuresco/') } } />
            </Grid>
            <Grid item>
              <img alt="" src={require('../../assets/email.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('mailto:support@daoventures.co') } } />
            </Grid>
            <Grid item>
              <img alt="" src={require('../../assets/telegram.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://t.me/DAOventures') } } />
            </Grid>
          </Grid> */}
        <Grid container spacing={2} className={classes.paddingGitter}>

          <Grid item>
            {/* <img alt="" src={require('../../assets/facebook.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://www.facebook.com/DAOventuresCo/') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://www.facebook.com/DAOventuresCo/') }}>
              <use xlinkHref="#iconfacebook"></use>
            </svg>
          </Grid>
          <Grid item>
            {/* <img alt="" src={require('../../assets/twitter.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://twitter.com/VenturesDao') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://twitter.com/VenturesDao') }}>
              <use xlinkHref="#icontwitter"></use>
            </svg>
          </Grid>
          <Grid item>
            {/* <img alt="" src={require('../../assets/linkedin.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://www.linkedin.com/company/daoventuresco/') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://www.linkedin.com/company/daoventuresco/') }} >
              <use xlinkHref="#iconlinked"></use>
            </svg>
          </Grid>
          <Grid item>
            <svg className={classes.contactIcon} aria-hidden="true">
              <use xlinkHref="#icondiscord"></use>
            </svg>
          </Grid>
          <Grid item>
            {/* <img alt="" src={require('../../assets/medium.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://daoventuresco.medium.com/ ') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://daoventuresco.medium.com/ ') }}>
              <use xlinkHref="#iconmedium"></use>
            </svg>
          </Grid>
        </Grid>

        <Grid container spacing={2} className={classes.paddingGitter}>
          <Grid item>
            {/* <img alt="" src={require('../../assets/reddit.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://www.reddit.com/r/DAOVentures/') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://www.reddit.com/r/DAOVentures/') }}>
              <use xlinkHref="#iconreddit"></use>
            </svg>
          </Grid>
          <Grid item>
            {/* <img alt="" src={require('../../assets/telegram.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://t.me/DAOventures') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://t.me/DAOventures') }}>
              <use xlinkHref="#icontelegram"></use>
            </svg>
          </Grid>
          <Grid item>
            {/* <img alt="" src={require('../../assets/email.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('mailto:support@daoventures.co') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('mailto:support@daoventures.co') }}>
              <use xlinkHref="#iconemail"></use>
            </svg>
          </Grid>
          <Grid item>
            {/* <img alt="" src={require('../../assets/slack.svg')} style={{ cursor: 'pointer' }} onClick={ () => { this.nav('https://join.slack.com/t/daoventures/shared_invite/zt-k4hmm44g-p5ME~5I~fm0pkfY2U8AUIw') } } /> */}
            <svg className={classes.contactIcon} aria-hidden="true" onClick={() => { this.nav('https://join.slack.com/t/daoventures/shared_invite/zt-k4hmm44g-p5ME~5I~fm0pkfY2U8AUIw') }} >
              <use xlinkHref="#iconslack"></use>
            </svg>
          </Grid>
          <Grid item>
            <svg className={classes.contactIcon} aria-hidden="true">
              <use xlinkHref="#iconweibo"></use>
            </svg>
          </Grid>
        </Grid>

        <Grid container spacing={2} className={classes.paddingGitter}>
          <Grid item>
            <svg className={classes.contactIcon} aria-hidden="true">
              <use xlinkHref="#iconweixin1"></use>
            </svg>
          </Grid>
          <Grid item>
            <svg className={classes.contactIcon} aria-hidden="true">
              <use xlinkHref="#iconcoinMarketCap"></use>
            </svg>
          </Grid>
          <Grid item>
            <svg className={classes.contactIcon} aria-hidden="true">
              <use xlinkHref="#iconcoingecko"></use>
            </svg>
          </Grid>
        </Grid>
      </div>
    )
  }

  renderIcon = (name, url) => {
    if (this.linkSelected(url)) {
      return (
        <img
          alt=""
          src={require(`../../assets/${name}_blue.svg`)} />
      );
    } else {
      return (
        <img
          alt=""
          src={require(`../../assets/${name}.svg`)} />
      );
    }
  }

  linkSelected = (link) => {
    return window.location.pathname === link
  }
}

export default withRouter(withStyles(styles)(SideDrawer));