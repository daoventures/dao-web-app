import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button
} from '@material-ui/core';
import { colors, drawerWidth } from '../../theme';
import { getTheme } from '../../theme';

import Loader from '../loader'

import {
  ERROR,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  GET_DASHBOARD_SNAPSHOT,
  DASHBOARD_SNAPSHOT_RETURNED,
  CURRENT_THEME_RETURNED,
  CHANGE_NETWORK,
  GET_VAULT_BALANCES_FULL
} from '../../constants'
import * as moment from 'moment';
import _ from 'lodash';

import Store from "../../stores";
import UnlockModal from "../unlock/unlockModal";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";

import ConnectWallet from "../connectWallet";

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: '320px',
    paddingRight: '80px',
    paddingTop: '30px',
    paddingBottom: '30px',
    minHeight: '800px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
      paddingRight: '0px'
    }
  },
  contentContainer: {
    minWidth: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // [theme.breakpoints.up('md')]: {
    //   minWidth: 'calc(100% - '+ drawerWidth + 'px)',
    // }
    [theme.breakpoints.down('md')]: {
      padding: '0px 10px'
    }
  },
  connectWalletContainer: {
    minWidth: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      minWidth: 'calc(100% - ' + drawerWidth + 'px)',
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: '2rem'
    }
  },
  investedContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: '100%',
    // [theme.breakpoints.up('md')]: {
    //   // minWidth: '900px',
    //   padding: '3rem'
    // },
    [theme.breakpoints.down('sm')]: {
      // minWidth: '90%',
      margin: 'auto',
      marginTop: '40px',
      width: '95vw'
    }
  },
  disaclaimer: {
    padding: '12px',
    border: '1px solid rgb(174, 174, 174)',
    borderRadius: '0.75rem',
    marginBottom: '24px',
    background: colors.white
  },
  portfolioContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingLeft: '20px',
    margin: '0px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px'
    }
  },
  vaultContainer: {
    // padding: '28px 30px',
    // borderRadius: '10px',
    border: '1px solid #d9d9d9',
    borderColor: theme.themeColors.blockBorder,
    borderWidth: '1px',
    borderStyle: 'solid',
    background: theme.themeColors.itemBack,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '2rem',
    [theme.breakpoints.down('md')]: {
      // padding: '10px'
    }
  },
  earnContainer: {
    marginTop: '40px',
    padding: '28px 30px',
    borderRadius: '50px',
    border: '1px solid ' + colors.borderBlue,
    background: colors.white,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  gray: {
    color: theme.themeColors.textP,
  },
  between: {
    width: '40px',
    height: '40px'
  },
  titleBalance: {
    height: '195px',
    // padding: '28px 30px !important',
    // borderRadius: '10px',
    padding: '0px!important',
    borderColor: theme.themeColors.blockBorder,
    borderWidth: '1px',
    borderStyle: 'solid',
    background: theme.themeColors.itemBack,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    cursor: 'pointer',
    marginTop: '20px',
    '&:first-child': {
      marginTop: '0px'
    },
    // maxWidth: '49%',
    [theme.breakpoints.down('sm')]: {
      // padding: '17px 20px !important',
      flexBasis: 'auto',
      '&:first-child': {
        marginTop: '20px'
      },
    }
  },
  prettyAlign: {
    display: 'flex',
    alignItems: 'center'
  },
  infoIcon: {
    fontSize: '1em',
    marginRight: '6px'
  },
  assetSummary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap'
    }
  },
  assetIcon: {
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    borderRadius: '20px',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: '12px',
  },
  heading: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '200px',
      alignItems: 'flex-end'
    }
  },
  headingName: {
    display: 'flex',
    alignItems: 'center',
    width: '325px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      flex: 1
    }
  },
  flexy: {
    display: 'flex',
    alignItems: 'center'
  },
  vault: {
    borderBottom: '1px solid rgba(25, 101, 233, 0.2)',
    padding: '12px 37px',
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  sectionHeading: {
    color: theme.themeColors.textT,
    fontSize: '18px',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px'
    }
  },
  inline: {
    display: 'flex',
    alignItems: 'baseline'
  },
  symbol: {
    paddingLeft: '6px'
  },
  symbolAt: {
    paddingLeft: '6px',
    color: colors.darkGray
  },
  basedOnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: '2rem',
    lineHeight: '38px',
    color: '#444444',
    textAlign: 'center'
  },
  warningMessage: {
    fontSize: '1rem',
    lineHeight: '19px',
    textAlign: 'center',
    color: '#18A0FB',
    position: 'absolute',
    bottom: '5%',
    left: '0',
    right: '0',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    }
  },
  buttonGroup: {
    background: '#18A0FB',
    borderRadius: '48px',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '50%',
    margin: 'auto',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    }
  },
  buttonIconContainer: {
    width: '60px',
    background: '#50B9FF',
    borderRadius: '48px 0px 0px 48px',
    textAlign: 'center',
    padding: '0.5rem 1.5rem',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  connectButtonIcon: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  buttonTextContainer: {
    padding: '1rem 2rem',
    textAlign: 'center'
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '5rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '3rem'
    }
  },
  descriptionContainer: {
    border: '1px solid #DDDDDD',
    marginTop: '8rem',
    borderRadius: '10px',
    padding: '1.5rem 3.5rem',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      margin: 'auto',
      marginTop: '4rem',
    }
  },
  shieldContainer: {
    background: 'rgba(24,160,251, 0.1)',
    borderRadius: '10px',
    width: '36px',
    margin: 'auto',
    padding: '0.6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#4444444',
    lineHeight: '22px',
    marginTop: '1rem'
  },
  securityDesc: {
    color: '#777777',
    fontSize: '.9rem',
    lineHeight: '18px',
    marginTop: '0.8rem'
  },
  chartContainer: {
    borderColor: theme.themeColors.blockBorder,
    borderWidth: '1px',
    borderStyle: 'solid',
    // borderRadius: '10px',
    // padding: '10px',
    background: theme.themeColors.itemBack,
    width: '100%',
    height: '410px'
  },
  amountValue: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.themeColors.textT,
    fontSize: '36px',
    wordBreak: 'break-all',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px'
    }
  },
  inlineBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.themeColors.menuSel,
    padding: '0px 24px',
    height: '48px',
    [theme.breakpoints.down('sm')]: {
      // display: 'block'
    }
  },
  netWorth: {
    color: theme.themeColors.textT,
    fontSize: '18px',
    textAlign: 'right',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px'
    }
  },
  assetName: {
    color: theme.themeColors.textT,
    fontSize: '1.1rem'
  },
  dataValue: {
    fontSize: '1rem',
    color: theme.themeColors.textT,
    background: 'rgba(21, 199, 62, 0.6)',
    borderRadius: '5px',
    padding: '10px'
  },
  labelSize: {
    fontSize: '13px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px'
    }
  },
  periodContainer: {
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-end',
    // padding: '0px 0px 12px 0px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  period: {
    minWidth: '50px',
    height: '26px',
    color: theme.themeColors.textP,
    [theme.breakpoints.down('md')]: {
      minWidth: '40px',
      padding: '0px'
    }
  },
  periodActive: {
    color: theme.themeColors.textT,
    // background: 'rgba(24, 160, 251, 0.2)',
    borderRadius: '0px',
    borderColor: theme.themeColors.border,
    borderWidth: '1px',
    borderStyle: 'solid',
    height: '26px',
    minWidth: '50px',
    [theme.breakpoints.down('md')]: {
      minWidth: '40px',
      padding: '0px'
    }
  },
  titleDesc: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem 2rem'
    }
  },
  alertDesc: {
    textAlign: 'center',
    width: '65%',
    margin: 'auto',
    whiteSpace: 'normal',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      width: '85%'
    }
  },
  // 样式调整新增
  chartTop: {
    display: 'flex',
    alignItems: 'center',
    background: theme.themeColors.menuSel,
    padding: '0px 24px',
    height: '48px',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
      padding: '0px 10px'
    }
  },
  chartTitText: {
    fontSize: '18px',
    color: theme.themeColors.textT,
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    }
  },
  dataTop: {
    width: '100%',
    height: '48px',
    background: theme.themeColors.menuSel,
    display: 'flex',
    alignItems: 'center',
    color: theme.themeColors.textT,
    fontSize: '18px',
    padding: '0px 24px',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
      padding: '0px 10px'
    }
  },
  myPortfolioSubTit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 24px',
    [theme.breakpoints.down('md')]: {
      padding: '10px 10px',
      flexDirection: 'column',
      alignItems: 'flex-start',
    }
  },
  myPortfolioSubTitText: {
    fontSize: '18px',
    color: theme.themeColors.textP,
    [theme.breakpoints.down('md')]: {
      fontSize: '14px'
    }
  },
  menuItemText: {
    fontSize: '18px',
    color: theme.themeColors.textP,
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px'
    },
  },
  noData: {
    padding: '48px 24px 99px',
    textAlign: 'center',
  },
  noDataImg: {
    width: '55px',
    height: '62px'
  },
  noDataText: {
    fontSize: '14px',
    fontWeight: '400',
    color: '#7367F7'
  },
  chartTopNoData: {
    height: '340px',
    padding: '0 57px',
    position: 'relative'
  },
  solidLine: {
    height: '64px',
    borderBottom: '1px dashed rgba(255, 255, 255, 0.1)'
  },
  refresh: {
    width: '108px',
    height: '41px',
    background: theme.themeColors.blockTextColor,
    textAlign: 'center',
    lineHeight: '41px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%)',
    color: theme.themeColors.textP
  },
  noDataText: {
    color: theme.themeColors.textT,
  },
  // refreshIcon:{
  //   width:'14px',
  //   height:'11px',
  //   fill:theme.themeColors.iconGray
  // }
});

class Dashboard extends Component {

  constructor(props) {
    super()

    const dashboard = store.getStore('dashboard')
    const account = store.getStore('account')
    const growth = localStorage.getItem('yearn.finance-dashboard-growth')
    const currency = localStorage.getItem('yearn.finance-dashboard-currency')
    const basedOn = localStorage.getItem('yearn.finance-dashboard-basedon')

    this.state = {
      dashboard: dashboard,
      account: account,
      loading: true,
      growth: growth ? parseInt(growth) : 0, // 0=daily 1=weekly 2=yearly
      currency: currency ? currency : 'USD', // USD / ETH,
      basedOn: basedOn ? parseInt(basedOn > 3 ? 3 : basedOn) : 1, // 1=apyOneWeekSample  2= apyInceptionSample  3=apyInceptionSample (old)
      modalOpen: false,
      period: '1d',
      interestTheme: {}, // 当前主题数据
    }

    if (account && account.address) {
      dispatcher.dispatch({ type: GET_DASHBOARD_SNAPSHOT, content: { interval: this.state.period } })
    }
    dispatcher.dispatch({ type: GET_VAULT_BALANCES_FULL })
  }

  componentWillMount() {
    emitter.on(ERROR, this.errorReturned);
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.on(DASHBOARD_SNAPSHOT_RETURNED, this.dashboardSnapshotReturned);
    emitter.on(CHANGE_NETWORK, this.networkChanged);
    emitter.on('CURRENT_THEME_RETURNED', this.currentThemeChanged);
    const localTheme = localStorage.getItem('daobenturesTheme');
    this.currentThemeChanged(localTheme);
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.removeListener(DASHBOARD_SNAPSHOT_RETURNED, this.dashboardSnapshotReturned);
    emitter.removeListener('CURRENT_THEME_RETURNED', this.currentThemeChanged);
    emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
  };


  networkChanged = (obj) => {
    const account = store.getStore('account')
    if (account && account.address) {
      dispatcher.dispatch({ type: GET_DASHBOARD_SNAPSHOT, content: { interval: this.state.period } })
    }
  }

  dashboardSnapshotReturned = () => {
    this.setState({
      loading: false,
      dashboard: store.getStore('dashboard')
    })
  }

  currentThemeChanged = (theme) => {
    const currentTheme = theme || store.getStore('currentTheme');
    this.setState({
      interestTheme: getTheme(currentTheme),
    });
  };

  connectionConnected = () => {
    const { period } = this.state;
    const account = store.getStore('account')
    this.setState({ loading: true, account: account })
    dispatcher.dispatch({ type: GET_DASHBOARD_SNAPSHOT, content: { interval: period } })
  };

  connectionDisconnected = () => {
    this.setState({ account: null })
  };

  errorReturned = (error) => {
    this.setState({ loading: false })
  };

  render() {
    const { classes } = this.props;
    const {
      loading,
      dashboard,
      growth,
      currency,
      account,
      modalOpen,
    } = this.state

    if (!account || !account.address) {
      return <ConnectWallet></ConnectWallet>
      // return (
      //   <div className={ classes.root }>
      //     <div className={classes.connectWalletContainer}>
      //       <div>
      //         <Typography variant={'h2'} className={classes.welcomeText}>Welcome to DAOventures</Typography>
      //         <Typography className={classes.titleDesc} variant={'body1'}>Connect an Ethereum wallet to manage and invest your DeFi portfolio</Typography>
      //         <Typography variant='body1' className={classes.alertDesc}>Alert: The deposit into any of investment strategies will incur high gas fees due to Ethereum network</Typography>
      //         <div className={classes.buttonContainer}>
      //           <Grid container className={classes.buttonGroup} onClick={this.addressClicked}>
      //             <Grid item sm={3} xs={3} className={classes.buttonIconContainer}>
      //               <img 
      //                   alt=""
      //                   src={require('../../assets/metamask.svg')}
      //                   className={classes.connectButtonIcon}
      //                 />
      //             </Grid>
      //             <Grid item sm={9} xs={9} className={classes.buttonTextContainer}>
      //               <Typography variant='h4'>Connect to Metamask wallet</Typography>
      //             </Grid>
      //           </Grid>
      //         </div>
      //         <div className={classes.descriptionContainer}>
      //           <div className={classes.shieldContainer}>
      //             <img 
      //               alt=""
      //               src={require('../../assets/shield.svg')}
      //             />
      //           </div>
      //           <Typography variant='h3' className={classes.subtitle}>Non-custodial & Secure</Typography>
      //           <Typography variant='body2' className={classes.securityDesc}>We do not own your private keys and cannot access your funds.</Typography>
      //         </div>
      //       </div>
      //       <Typography variant='body1' className={classes.warningMessage}>*Crypto is volatile, DeFi is new and risky. Please use it at your own risk.</Typography>
      //     </div>
      //     { modalOpen && this.renderModal() }
      //   </div>
      // )
    }

    return (
      <div className={classes.root}>
        <div className={classes.contentContainer}>
          <div className={classes.investedContainer}>

            <Grid container>
              <Grid item sm={8} xs={12}>
                {this.renderChart(dashboard)}
              </Grid>
              <Grid item sm={4} xs={12}>
                <Grid container spacing={1} className={classes.portfolioContainer}>
                  <Grid item sm={12} xs={12} className={classes.titleBalance}>
                    <Typography variant={'h4'} className={classes.dataTop}>Portfolio Balance</Typography>
                    <Typography variant={'h2'} className={classes.amountValue}>$ {parseFloat(dashboard.portfolio_balance_usd.toFixed(2)).toLocaleString()}</Typography>
                  </Grid>
                  {growth === 0 &&
                    <Grid item sm={12} xs={12} className={classes.titleBalance} onClick={this.growthClicked}>
                      <Typography variant={'h4'} className={classes.dataTop}>
                        Daily Growth
                      </Typography>
                      <Typography variant={'h2'} className={classes.amountValue}>$ {parseFloat(dashboard.portfolio_growth_usd_daily.toFixed(2)).toLocaleString()}</Typography>
                    </Grid>
                  }

                  {growth === 1 &&
                    <Grid item sm={12} xs={12} className={classes.titleBalance} onClick={this.growthClicked}>
                      <Typography variant={'h4'} className={classes.dataTop}>
                        Weekly Growth
                      </Typography>
                      <Typography variant={'h2'} className={classes.amountValue}>$ {parseFloat(dashboard.portfolio_growth_usd_weekly.toFixed(2)).toLocaleString()}</Typography>
                    </Grid>
                  }

                  {growth === 2 &&
                    <Grid item sm={12} xs={12} className={classes.titleBalance} onClick={this.growthClicked}>
                      <Typography variant={'h4'} className={classes.dataTop}>
                        Yearly Growth
                      </Typography>
                      <Typography variant={'h2'} className={classes.amountValue}>$ {parseFloat(dashboard.portfolio_growth_usd_yearly.toFixed(2)).toLocaleString()}</Typography>
                    </Grid>
                  }
                </Grid>

              </Grid>
            </Grid>
            {(true) &&
              <div className={classes.vaultContainer}>
                <div className={classes.inlineBlock}>
                  <div>
                    <Typography variant={'h3'} className={classes.sectionHeading}>My Portfolio</Typography>
                  </div>

                </div>
                <div className={classes.myPortfolioSubTit}>
                  {this.renderBasedOn()}
                  <Typography variant={'caption'} className={classes.netWorth}>NET BALANCE</Typography>
                </div>

                {
                  this.state.dashboard ? this.renderVaults() :
                   <div className={classes.noData}>
                    <img className={classes.noDataImg} src={require('../../assets/no_data_night@2x.png')} alt="" />
                    <p className={classes.noDataText}>No Data
                  
                    </p>
                  </div>
                }

              </div>
            }


          </div>
        </div>
        { loading && <Loader />}
      </div>
    )
  };

  renderBasedOn = () => {

    const { classes } = this.props
    const { basedOn, loading } = this.state

    const options = [
      {
        value: 1,
        description: '1 week'
      },
      {
        value: 2,
        description: '1 month'
      },
      {
        value: 3,
        description: '1 year'
      }
    ]

    return (
      <div className={classes.basedOnContainer}>
        <Typography className={classes.myPortfolioSubTitText}>Growth is based on the vault's performance {basedOn === 3 ? 'since' : 'for the past'}</Typography>
        <TextField
          id={'basedOn'}
          name={'basedOn'}
          select
          value={basedOn}
          onChange={this.onSelectChange}
          SelectProps={{
            native: false
          }}
          disabled={loading}
          className={classes.assetSelectRoot}
        >
          {options &&
            options.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  <Typography variant='body1' className={classes.menuItemText}>{option.description}</Typography>
                </MenuItem>
              )
            })
          }
        </TextField>
      </div>
    )
  }

  onSelectChange = (event) => {
    let val = []
    const { period } = this.state;
    val[event.target.name] = event.target.value
    this.setState(val)

    localStorage.setItem('yearn.finance-dashboard-basedon', event.target.value)

    this.setState({ loading: true })

    dispatcher.dispatch({ type: GET_DASHBOARD_SNAPSHOT, content: { interval: period } })
  }

  growthClicked = () => {
    const { growth } = this.state
    let newGrowth = 0
    switch (growth) {
      case 0:
        newGrowth = 1
        break;
      case 1:
        newGrowth = 2
        break;
      case 2:
        newGrowth = 0
        break;
      default:
        newGrowth = 0
    }
    this.setState({ growth: newGrowth })
    localStorage.setItem('yearn.finance-dashboard-growth', newGrowth.toString())
  }

  renderVaults = () => {
    const { growth, currency } = this.state
    const { vaults } = this.state.dashboard
    const { classes } = this.props

    if (!vaults || vaults.length === 0) {
      return null
    }

    return vaults.map((asset) => {
      return (<div className={classes.vault} key={asset.id}>
        <div className={classes.assetSummary}>
          <div className={classes.headingName}>
            <div className={classes.assetIcon}>
              <img
                alt=""
                src={require('../../assets/' + asset.symbol + '-logo.' + asset.logoFormat)}
                height={'30px'}
              />
            </div>
            <div>
              <Typography variant={'h5'} noWrap className={classes.assetName}>{asset.name}</Typography>
              <Typography variant={'h5'} noWrap className={classes.gray}>{asset.description}</Typography>
            </div>
          </div>
          <div className={classes.heading}>
            <Typography variant={'h3'} noWrap className={classes.dataValue}>$ {parseFloat(asset.usdBalance ? (asset.usdBalance).toFixed(2) : '0.00').toLocaleString()}</Typography>
          </div>
        </div>
      </div>)
    })
  }

  _getAPY = (asset) => {
    const { basedOn } = this.state

    if (asset && asset.stats) {
      switch (basedOn) {
        case 1:
          return asset.stats.apyOneWeekSample
        case 2:
          return asset.stats.apyOneMonthSample
        case 3:
          return asset.stats.apyInceptionSample
        default:
          return asset.apy
      }
    } else if (asset.apy) {
      return asset.apy
    } else {
      return '0.00'
    }
  }

  renderChart = (dashboard) => {
    const { classes } = this.props;
    const { period } = this.state;
    let flag = true;
    let dataSet = [];
    if (dashboard.totalPerformance) {

      dashboard.totalPerformance.map(balance => {
        balance[1] = parseFloat(balance[1].toFixed(4))
        return balance;
      });
      // 开始统计时间
      let startTime = dashboard.totalPerformance[0][0];
      var temp;
      switch (period) {
        case '1d':
          temp = _.groupBy(dashboard.totalPerformance, (d) => {

            return Math.floor((d[0] - startTime) / (1000 * 60 * 60))
          });
          Object.keys(temp).forEach(l => {
            dataSet.push([temp[l][temp[l].length - 1][0], temp[l][temp[l].length - 1][1]]);
          })
          break;
        case '7d':
          temp = _.groupBy(dashboard.totalPerformance, (d) => {
            return Math.floor((d[0] - startTime) / (1000 * 60 * 60 * 24))
          });
          Object.keys(temp).forEach(l => {
            dataSet.push([temp[l][temp[l].length - 1][0], temp[l][temp[l].length - 1][1]]);
          })
          break;
        case '30d':
          temp = _.groupBy(dashboard.totalPerformance, (d) => {
            return Math.floor((d[0] - startTime) / (1000 * 60 * 60 * 24))
          });
          Object.keys(temp).forEach(l => {
            dataSet.push([temp[l][temp[l].length - 1][0], temp[l][temp[l].length - 1][1]]);
          })
          break;
        default:
      }
    } else {
      flag = false;
    }

    const options = {
      chart: {
        // width: 800,
        width: null,
        backgroundColor: this.state.interestTheme.themeColors.itemBack,
        // spacingLeft: 25,
        height: 340,
        type: 'area',
        marginTop: 40,
        spacingLeft: 20,
        spacingRight: 20
      },
      title: {
        text: ''
      },
      series: [
        {
          name: '',
          data: dataSet
          // data: [
          //   [1,2],
          //   [2,2],
          //   [3,2],
          //   [4,2],
          //   [5,2],
          //   [6,2],
          //   [7,2]
          // ],
        },
      ],
      tooltip: {
        formatter: function () {
          return moment.unix(this.x / 1000).format('DD-MM-YYYY  hh:mm:ss')
            + '<br/>' +
            '<span style="color:' + this.point.color + '">\u25CF</span> ' +
            '<b>' + this.y + '</b>';
        }
      },
      xAxis: {
        labels: {
          formatter: function () {
            return moment.unix(this.value / 1000).format('DD-MM-YYYY hh:mm:ss');
          },
          style: {
            color: this.state.interestTheme.themeColors.textP,
            fontSize: '12px'
          }
        },
        tickColor: this.state.interestTheme.themeColors.lineT,
        lineColor: this.state.interestTheme.themeColors.lineT,
      },
      yAxis: {
        gridLineColor: this.state.interestTheme.themeColors.lineT,
        title: {
          text: ''
        },
        labels: {
          style: {
            color: this.state.interestTheme.themeColors.textP,
            fontSize: '12px'
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      }
    };

    return (
      <div className={classes.chartContainer}>
        <Grid container className={classes.chartTop}>
          <Grid item sm={6} xs={4}>
            <Typography variant='body1' className={classes.chartTitText}>Performance</Typography>
          </Grid>
          <Grid item sm={6} xs={8} className={classes.periodContainer}>
            <Button
              className={period === '1d' ? classes.periodActive : classes.period}
              variant='text'
              color="primary"
              onClick={() => { this.setChartPeriod('1d') }}>
              <Typography variant={'h5'}>1D</Typography>
            </Button>
            <Button
              className={period === '7d' ? classes.periodActive : classes.period}
              variant='text'
              color="primary"
              onClick={() => { this.setChartPeriod('7d') }}>
              <Typography variant={'h5'}>1W</Typography>
            </Button>
            <Button
              className={period === '30d' ? classes.periodActive : classes.period}
              variant='text'
              color="primary"
              onClick={() => { this.setChartPeriod('30d') }}>
              <Typography variant={'h5'}>1M</Typography>
            </Button>
          </Grid>



        </Grid>
        {flag || !this.state.loading ?
         <HighchartsReact highcharts={Highcharts} options={options} /> : <div className={classes.chartTopNoData}>
          <div className={classes.solidLine}></div>
          <div className={classes.solidLine}></div>
          <div className={classes.solidLine}></div>
          <div className={classes.solidLine}></div>
          <div className={classes.refresh}>
            <span className={classes.noDataText}>No Data
            </span>
          </div>
        </div>
        } 

      </div>
    );
  }

  setChartPeriod = (period) => {
    const account = store.getStore('account')
    this.setState({
      period
    }, function () {
      if (account && account.address) {
        dispatcher.dispatch({ type: GET_DASHBOARD_SNAPSHOT, content: { interval: this.state.period } })
      }
    })

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

}

export default withRouter(withStyles(styles)(Dashboard));
