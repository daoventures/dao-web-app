import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid} from '@material-ui/core';
import { drawerWidth } from '../../../theme'


import {
  ERROR,
  CONNECTION_CONNECTED} from '../../../constants'
import _ from 'lodash';

// blocknative测试
import {initOnboard} from '../../../walletsServices.js';

import Store from "../../../stores/storev2";
import UnlockModal from "../../unlock/unlockModal";
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
    minHeight: '800px',
  },
  connectWalletContainer: {
    minWidth: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      minWidth: 'calc(100% - '+ drawerWidth + 'px)',
      paddingTop: '66px'
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: '2rem'
    }
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: '36px',
    lineHeight: '36px',
    color: theme.themeColors.textT,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '24px',
      padding: '0px 46px'
    }
  },
  warningMessage: {
    fontSize: '1rem',
    lineHeight: '19px',
    textAlign: 'center',
    color: theme.themeColors.textT,
    // position: 'absolute',
    // bottom: '5%',
    // left: '0',
    // right: '0',
    margin: 'auto',
    marginTop: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    }
  },
  buttonGroup: {
    // background: '#18A0FB',
    background: 'linear-gradient(135deg, #0B2663 0%, #1152DF 100%)',
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
    borderColor: theme.themeColors.border,
    borderWidth: '1px',
    borderStyle: 'solid',
    // marginTop: '8rem',
    marginTop: '4rem',
    padding: '1.5rem 1rem',
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
    fontSize: '22px',
    color: theme.themeColors.textT,
    lineHeight: '22px',
    marginTop: '13px',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    }
  },
  securityDesc: {
    color: theme.themeColors.textP,
    fontSize: '20px',
    lineHeight: '20px',
    marginTop: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px'
    }
  },
  titleDesc: {
    textAlign: 'center',
    color: theme.themeColors.textP,
    fontSize: '20px',
    marginTop: '20px',
    [theme.breakpoints.down('md')]: {
      // padding: '1rem 2rem',
      fontSize: '14px',
      marginTop: '16px',
      padding: '0px 26px'
    }
  },
  alertDesc: {
    textAlign: 'center',
    width: '65%',
    margin: 'auto',
    whiteSpace: 'normal',
    fontWeight: 'bold',
    color: theme.themeColors.textP,
    fontSize: '16px',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '85%',
      fontSize: '14px',
      marginTop: '16px'
    }
  },
});

class ConnectWallet extends Component {

  constructor(props) {
    super()

    this.state = {
      loading: true,
      modalOpen: false,
      period: '1d',
      onboard: null
    }
  }

  componentWillMount() {
    emitter.on(ERROR, this.errorReturned);
    const onboard = initOnboard({
      address: (address) => {
        store.setStore({account: {address: address}});
        if (store.getStore('network')) {
          emitter.emit(CONNECTION_CONNECTED);
        }
      },
      network: (network) => {
        const oldNetwork = store.getStore("network");
        const executeStrategyBalanceFunction = store.getStore("executeStrategyBalanceFunction");

        if(network !== undefined && oldNetwork !== network) {
          console.log(`Old network ${oldNetwork}, network: ${network}`);
          if(executeStrategyBalanceFunction) {
            alert("Changing of network is detected, a page reload will take place.");
            window.location.reload();
          }
          this.updateOnboard(network);
        }

        store.setStore({network: network});
        emitter.emit('CHANGE_NETWORK', {network: network});

        const account = store.getStore('account')
        if (account && account.address) {
          emitter.emit(CONNECTION_CONNECTED);
        }
      },
      balance: (balance) => {
        let account = store.getStore('account');
        store.setStore({account: {...account,balance: balance}});
      },
      wallet: (wallet) => {
        store.setStore({
          web3context: {library: {provider: wallet.provider}},
        })
        window.localStorage.setItem('selectedWallet', wallet.name);
      },
      ens: (ens) => {
        if (ens && ens.name) {
          console.log('ENS name is available for the account. ', ens.name)
          let account = store.getStore('account');
          store.setStore({account: {...account, ensName: ens.name}})
          emitter.emit('ENS_ADDRESS_RESOLVED');
        }
      }
    });
    this.setState({
      onboard: onboard
    });
    store.setStore({'onboard': onboard});

    const previouslySelectedWallet = window.localStorage.getItem(
      'selectedWallet'
    );

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }
 
  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned);
  };

  errorReturned = (error) => {
    this.setState({ loading: false })
  };

  render() {
    const { classes } = this.props;
    const {
      loading,
      modalOpen,
    } = this.state

      return (
        <div className={ classes.root }>
          <div className={classes.connectWalletContainer}>
            <div>
              <Typography variant={'h2'} className={classes.welcomeText}>Welcome to DAOventures</Typography>
              <Typography className={classes.titleDesc} variant={'body1'}>Connect a wallet to invest and manage your DeFi portfolio</Typography>
              <div className={classes.buttonContainer}>
                <Grid container className={classes.buttonGroup} onClick={this.addressClicked}>
                  {/* <Grid item sm={3} xs={3} className={classes.buttonIconContainer}>
                    <img 
                        alt=""
                        src={require('../../assets/metamask.svg')}
                        className={classes.connectButtonIcon}
                      />
                  </Grid> */}
                  {/* <Grid item sm={9} xs={9} className={classes.buttonTextContainer}> */}
                  <Grid item sm={12} xs={12} className={classes.buttonTextContainer}>
                    {/* <Typography variant='h4'>Connect to Metamask wallet</Typography> */}
                    <Typography variant='h4'>Connect wallet</Typography>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.descriptionContainer}>
                <div className={classes.shieldContainer}>
                  <img 
                    alt=""
                    src={require('../../../assets/shield.svg')}
                  />
                </div>
                <Typography variant='h3' className={classes.subtitle}>Non-custodial & Secure</Typography>
                <Typography variant='body2' className={classes.securityDesc}>We do not own your private keys and cannot access your funds.</Typography>
                <Typography variant='body1' className={classes.warningMessage}>*Crypto is volatile, DeFi is new and risky. Please use it at your own risk.</Typography>
              </div>
            </div>
            
          </div>
          { modalOpen && this.renderModal() }
        </div>
      )
  };

  addressClicked = async () => {
    if (this.state.onboard) {
      const walletSelected = await this.state.onboard.walletSelect();
      const readyToTransact = await this.state.onboard.walletCheck();
      console.log(`Wallet Selected: ${walletSelected}, Ready to transact: ${readyToTransact}`);
    }
  }

  updateOnboard = async (network) => {
    if (this.state.onboard) {
     await this.state.onboard.config({networkId: network});
    }
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  renderModal = () => {
    return (
      <UnlockModal closeModal={ this.closeModal } modalOpen={ this.state.modalOpen } />
    )
  }

}

  export default withRouter(withStyles(styles)(ConnectWallet));
