import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from "react-router-dom";
import { colors } from '../../theme'
import ENS from 'ethjs-ens';

import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  TOGGLE_DRAWER,
  CURRENT_THEME_RETURNED,
  CHANGE_NETWORK
} from '../../constants'

import UnlockModal from '../unlock/unlockModal.jsx'
import ToggleTheme from '../toggleTheme'

import Store from "../../stores";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const networkObj = {
  1: 'Ethereum',
  4: 'Rinkeby',
  56: 'Binance',
  42:'Kovan'
};

const styles = theme => ({
  root: {
    verticalAlign: 'top',
    width: 'calc(100% - 240px)',
    display: 'flex',
    padding: '40px 80px 0px 80px',
    background: theme.themeColors.back,
    zIndex: theme.zIndex.drawer - 1,
    position: 'fixed',
    // left: '319px',
    left: '240px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '40px',
      left: '0px',
      padding: '0px'
    },
  },
  headerV2: {
    // background: colors.white,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderColor: theme.themeColors.lineT,
    borderTop: 'none',
    width: '100%',
    display: 'flex',
    padding: '15px 0px',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      padding: '15px'
    }
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    cursor: 'pointer'
  },
  links: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    }
  },
  link: {
    padding: '12px 0px',
    margin: '0px 12px',
    cursor: 'pointer',
    '&:hover': {
      paddingBottom: '9px',
      borderBottom: "3px solid " + colors.darkGray,
    }
  },
  title: {
    textTransform: 'capitalize'
  },
  linkActive: {
    padding: '12px 0px',
    margin: '0px 12px',
    cursor: 'pointer',
    paddingBottom: '9px',
    borderBottom: "3px solid " + colors.darkGray,
  },
  account: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      flex: '0'
    }
  },
  walletAddress: {
    padding: '12px',
    borderRadius: '41px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    background: 'rgba(24,160,251,0.1)',
    '&:hover': {
      background: 'rgba(47, 128, 237, 0.1)'
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
    color: colors.darkGray
  },
  name: {
    paddingLeft: '24px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  menuButton: {
    marginLeft: -16,
    marginRight: 3,
  },
  addressAlias: {
    color: '#222222',
    fontSize: '14px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    }
  },
  // 当前标题等
  currentMenu: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    fontSize: '26px',
    color: theme.themeColors.textT,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
    },
  },
  netWork: {
    height: '26px',
    padding: '0px 6px',
    display: 'flex',
    alignItems: 'center',
    background: theme.themeColors.tagBack,
    fontSize: '12px',
    color: theme.themeColors.textT,
    marginLeft: '20px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.themeColors.lineT,
    position:'relative',
    cursor:'pointer'
  },
  menuIcon: {
    fill: theme.themeColors.textT,
    width: '24px',
    height: '24px'
  },
  netWorkIcon: {
    width: '18px',
    height: '18px',
    fill: '#7367F7',
    // marginRight: '10px'
  },
  netWorkList:{
    width:'100%',
    height:'auto',
    listStyle:'none',
    position:'absolute',
    top:'25px',
    left:'0px',
    marginLeft:'0',
    background:theme.themeColors.walletSelectBg,
  },
  netWorkItem:{
    height:'26px',
    padding:'0 6px',
    lineHeight:'26px',
    display:'flex',
    alignItems:'center',
    border:'1px solid '+ theme.themeColors.lineT,
    cursor:'pointer'

  },
  selectIcon: {
    fill:theme.themeColors.blockBorder,
    width: '14px',
    height: '14px',
  },
  selectIconActive:{
    fill: theme.themeColors.blockBorder,
    width: '14px',
    height: '14px',
    transform:'rotate(180deg)'
  },
});

class Header extends Component {

  constructor(props) {
    super()

    this.state = {
      account: store.getStore('account'),
      modalOpen: false,
      hideNav: true,
      menuObj: {
        '/portfolio': 'Portfolio',
        '/invest': 'Invest',
        '/stake': 'Grow',
        '/swap': 'Swap'
      },
      currentTheme: store.getStore('currentTheme'),
      currentNetwork: 0,
      isShowNetWorkList:false,
      netWorkList: [
        {
          label: 'Ethereum',
          value: 1,
          imgUrl: require('../../assets/ETH-logo.png')
        },
        // {
        //   label:'Rinkeby',
        //   value:4,
        //   imgUrl:require('../../assets/ETH-logo.png')
        // },
        {
          label: 'Binance',
          value: 56,
          imgUrl: require('../../assets/img_new/bnb-icon.png')
        },
      ]
    }
  }

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.on(CURRENT_THEME_RETURNED, this.currentThemeChanged);
    emitter.on(CHANGE_NETWORK, this.networkChanged);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let currentHideNav = (window.innerWidth <= 760);
    if (currentHideNav !== this.state.hideNav) {
      this.setState({ hideNav: currentHideNav });
    }
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    window.removeEventListener("resize", this.resize.bind(this));
    emitter.removeListener(CURRENT_THEME_RETURNED, this.currentThemeChanged);
    emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
  }

  currentThemeChanged = () => {
    this.setState({ currentTheme: store.getStore('currentTheme') })
  }

  connectionConnected = () => {
    this.setState({ account: store.getStore('account') })
    this.setAddressEnsName();
  };

  connectionDisconnected = () => {
    this.setState({ account: store.getStore('account') })
  }

  networkChanged = (obj) => {
    console.log('networkChanged###', obj);
    this.setState({
      currentNetwork: obj.network
    });
  }

  setAddressEnsName = async () => {
    const context = store.getStore('web3context')
    if (context && context.library && context.library.provider) {
      const provider = context.library.provider
      const account = store.getStore('account')
      const { address } = account
      const network = provider.networkVersion
      const ens = new ENS({ provider, network })
      const addressEnsName = await ens.reverse(address).catch(() => { })
      if (addressEnsName) {
        this.setState({ addressEnsName })
      }
    }
  }

  showNetWorkList(){
    this.setState({
      isShowNetWorkList:!this.state.isShowNetWorkList
    });
  }

  checkNetWork (id,e){
    const onboard = store.getStore('onboard');
    // 阻止事件冒泡，（阻止这个合成事件，往document上冒泡，因此不会触发click方法）
    e.nativeEvent.stopImmediatePropagation();
    // 阻止合成事件间的冒泡，不会往最外层的div的test方法冒了，如果不加这句代码，就会冒泡至外层div，执行test方法。      
      e.stopPropagation();
    onboard.config({
      darkMode: true,
      networkId: id
    });
    this.setState({
      isShowNetWorkList:false
    });
    // const onboard = Onboard({
      // networkId: 35,
      // ...other config options
    // })
  }

  render() {
    const {
      classes
    } = this.props;

    const {
      account,
      addressEnsName,
      modalOpen,
      hideNav
    } = this.state

    var address = null;
    if (account.address) {
      address = account.address.substring(0, 6) + '...' + account.address.substring(account.address.length - 4, account.address.length)
    }
    const addressAlias = addressEnsName || address

    // if (!hideNav && address == null) {
    //   return null;
    // }

    return (
      <div className={classes.root}>
        <div className={classes.headerV2}>
          {hideNav && this.renderToggleButton()}
          {hideNav &&
            <div className={classes.icon}>
              <img
                alt=""
                src={this.state.currentTheme === 'light' ? require('../../assets/img_new/logo_light@2x.png') : require('../../assets/img_new/logo_dark@2x.png')}
                height={'25px'}
                onClick={() => { this.nav('') }}
              />
            </div>
          }

          {/* <div className={ classes.links }>
            { this.renderLink('dashboard') }
            { this.renderLink('vaults') }
            { this.renderLink('portfolio') }
            { this.renderLink('zap') }
            { this.renderLink('cover') }
            { this.renderLink('stats') }
          </div> */}

          {/* 钱包地址 (不放这里了)*/}
          {/* <div className={ classes.account }>
            { address &&
              <div className={ classes.walletAddress }>
                <img 
                  alt="" 
                  src={require('../../assets/profile.svg')} />
                <Typography variant={ 'h4'} className={classes.addressAlias} style={{marginLeft: '10px'}} noWrap onClick={this.addressClicked} >
                { addressAlias }
              </Typography>
              </div>
            }
          </div> */}
          <div className={classes.currentMenu}>
            {!hideNav && <span>{this.state.menuObj[this.props.history.location.pathname]}</span>}
            {/* onClick={() => { this.showNetWorkList() }} */}
            { (this.state.currentNetwork==1||this.state.currentNetwork==56||this.state.currentNetwork==42) ? <div className={ classes.netWork } >
              {(this.state.currentNetwork === 1||this.state.currentNetwork === 42) ? <svg aria-hidden="true" className={classes.netWorkIcon}>
                <use xlinkHref="#iconETH"></use>
              </svg> : null}
              {this.state.currentNetwork === 56 ? 
              <img src={require("../../assets/img_new/bnb-icon.png")} className={classes.netWorkIcon}/>
              : null}
              <span>{networkObj[this.state.currentNetwork]}</span>
              {/* <svg className={this.state.isShowNetWorkList ?classes.selectIconActive :classes.selectIcon} aria-hidden="true">
              <use xlinkHref="#iconicon_menu_dropDown__day"></use>
            </svg> */}
            {
              this.state.isShowNetWorkList?<div className={classes.netWorkList}>
              <div className={classes.netWorkItem} onClick={(e)=>{this.checkNetWork(1,e)}}>
                <img src={require('../../assets/ETH-logo.png')} className={classes.netWorkIcon} />
                <span>Ethereum</span>
              </div>
              <div className={classes.netWorkItem} onClick={(e)=>{this.checkNetWork(56,e)}}>
                <img src={require('../../assets/img_new/bnb-icon.png')} className={classes.netWorkIcon} />
                <span>Binance</span>
              </div>
            </div>:null
            }
            </div> : null}
            
            <div>
              {/* <svg aria-hidden="true" className={classes.netWorkIcon}>
                <use xlinkHref="#iconETH"></use>
              </svg> */}
            </div>
          </div>
          {!hideNav && <ToggleTheme></ToggleTheme>}
        </div>
        { modalOpen && this.renderModal()}
      </div>
    )
  }

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
  }

  renderLink = (screen) => {
    const {
      classes
    } = this.props;

    return (
      <div className={(window.location.pathname === '/' + screen) ? classes.linkActive : classes.link} onClick={() => { this.nav(screen) }}>
        <Typography variant={'h4'} className={`title`}>{this.captializeFirstLetter(screen)}</Typography>
      </div>
    )
  }

  captializeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  nav = (screen) => {
    if (screen === 'cover') {
      window.open("https://yinsure.finance", "_blank")
      return
    }
    this.props.history.push('/' + screen)
  }

  addressClicked = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  renderModal = () => {
    return (
      <UnlockModal closeModal={this.closeModal} modalOpen={this.state.modalOpen} />
    )
  }

  handleDrawerOpen = () => {
    if (store.getStore('openDrawer')) {
      dispatcher.dispatch({ type: TOGGLE_DRAWER, content: { open: false } })
    } else {
      dispatcher.dispatch({ type: TOGGLE_DRAWER, content: { open: true } })
    }
  }
}

export default withRouter(withStyles(styles)(Header));