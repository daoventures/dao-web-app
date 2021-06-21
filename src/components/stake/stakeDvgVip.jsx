import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import {
    Grid,
} from '@material-ui/core';
import {
    GET_DVG_INFO,
    CONNECTION_CONNECTED,
    CHANGE_NETWORK,
    GET_DASHBOARD_SNAPSHOT,
    DASHBOARD_SNAPSHOT_RETURNED,
    GET_VAULT_BALANCES_FULL,
    GET_DVG_BALANCE_SUCCESS,
    DEPOSIT_XDVG,
    GET_XDVG_BALANCE,
    GET_XDVG_BALANCE_SUCCESS,
    WIDTHDRAW_XDVG,
    GET_DVG_APR,
    GET_XDVG_APR_SUCCESS,
    WITHDRAW_DVG_RETURNED,
    DEPOSIT_DVG_RETURNED
} from '../../constants'
import Store from "../../stores";
import ConnectWallet from "../connectWallet";
import { initOnboard } from '../../walletsServices.js';

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store
const styles = theme => ({
    root: {
        flex: 1,
        width: '100%',
        paddingLeft: '320px',
        paddingRight: '80px',
        paddingTop: '30px',
        paddingBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '10px',
            paddingRight: '10px'
        },
        '& p': {
            padding: '0px',
            margin: '0px'
        }
    },
    banner: {
        width: '100%',
        height: '120px',
        padding: '12px 50px',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundImage: 'url(' + require('../../assets/stakeImg/Daovip_banner@2x.png') + ')',
        [theme.breakpoints.down('sm')]: {
            height: '170px',
            padding: '12px 10px',
            position: 'relative',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
        }
    },
    text: {
        fontSize: '30px',
        fontWeight: '500',
        color: '#FFFFFF',
        lineHeight: '96px',
        [theme.breakpoints.down('sm')]: {
            widht:'100%',
            lineHeight: 1,
            textAlign:'center',
            fontSize: '20px',
            marginTop: '20px'
        }
    },
    bannerRight: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            display: 'flex',
            marginTop: '30px',
            justifyContent: 'space-between',
        }
    },
    toTrade: {

        [theme.breakpoints.down('sm')]: {
            width: '100%',
            display: 'flex',
            marginTop: '30px',
            justifyContent: 'space-between',
        }
    },
    toTradeUniswap: {
        width: '214px',
        height: '44px',
        backgroundImage: 'url(' + require('../../assets/stakeImg/button_Uniswap@2x.png') + ')',
        lineHeight: '44px',
        fontSize: '18px',
        fontWeight: '500',
        color: theme.themeColors.textT,
        backgroundSize: '100% 100%',
        textAlign: 'center',
        color:'#FFFFFF',
        marginBottom: '8px',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            width: '148px',
            fontSize: '14px'
        },
        '&:hover':{
            backgroundImage: 'url(' + require('../../assets/stakeImg/button_Uniswap_hover.png') + ')',
        }
    },
    toTradePancakeswap: {
        width: '214px',
        height: '44px',
        backgroundImage: 'url(' + require('../../assets/stakeImg/button_pancakeswap@2x.png') + ')',
        backgroundSize: '100% 100%',
        lineHeight: '44px',
        fontSize: '18px',
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            width: '148px',
            fontSize: '14px'
        },
        '&:hover':{
            backgroundImage: 'url(' + require('../../assets/stakeImg/button_pancakeswap_hover.png') + ')',
        }
    },
    content: {
        display: 'flex',
        marginTop: '35px',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    contentLeft: {
        width: '80%',
        // width: '556px',
        // background:'red'
        background: theme.themeColors.modelBack,
        // padding:'0 19px',
        // boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        border: ' 1px solid #7367F7',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    contentLeftTitle: {
        height: '48px',
        background: theme.themeColors.menuSel,
        padding: '0 19px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        fontSize: '18px',
        fontWeight: '400',
        color: theme.themeColors.textT,
        lineHeight: '48px',
    },
    titleRate: {
        background: theme.themeColors.btnBack,
        border: '1px solid #6C60E8',
        fontSize: '12px',
        fontWeight: '400',
        color: '#6c60e8',
        textAlign: 'center',
        lineHeight: '26px',
        height: '26px',
        padding: '0 8px'
    },
    contentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '25px',
        [theme.breakpoints.down('sm')]: {
            display:'block'            
        },
    },
    stakeTab: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(110,103,247,1)',
        width: '180px',
        height: '32px',
        display: 'flex'
    },
    stake: {
        width: '90px',
        background: theme.themeColors.stakeTextBg,
        color: theme.themeColors.stakeTextText,
        lineHeight: '32px',
        textAlign: 'center',
        cursor: 'pointer'
    },
    unStake: {
        width: '90px',
        color: theme.themeColors.stakeTextBg,
        lineHeight: '32px',
        textAlign: 'center',
        cursor: 'pointer'
    },
    available: {
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '16px',
        color: theme.themeColors.textT,
        [theme.breakpoints.down('sm')]: {
            marginTop:'23px',
            textAlign:'right'       
        },
    },
    stakeInput: {
        marginTop: '30px',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            marginTop: '10px',     
        },
    },
    input: {
        width: '100%',
        height: '56px',
        padding: '0 20px',
        border: '1px solid' + theme.themeColors.borderH,
        color: theme.themeColors.textT,
        background: theme.themeColors.inputBack,
        "& input": {
            color: theme.themeColors.textT,
        },
        "& .MuiInputBase-root": {
            borderRadius: "0px",
            height: "42px",
        },
        "& input::placeholder": {
            color: theme.themeColors.textP,
        },
    },
    approveStaking: {
        height: '44px',
        border: '1px solid rgba(115, 103, 247, 0.4);',
        marginTop: '31px',
        lineHeight: '44px',
        textAlign: 'center',
        marginBottom: '31px',
        color: 'rgba(115, 103, 247, 0.4)',
        cursor: 'pointer'
    },
    approveStakingActive:{
        height: '44px',
        marginTop: '31px',
        lineHeight: '44px',
        textAlign: 'center',
        marginBottom: '31px',
        color: 'rgba(115, 103, 247,1)',
        border: '1px solid rgba(115, 103, 247, 1);',
        cursor: 'pointer'
    },
    contentCenter: {
        padding: '0 19px'
    },
    max: {
        width: '50px',
        height: '24px',
        background: 'rgba(110,103,247,0.2)',
        borderRadius: '12px',
        color: '#7367F7',
        lineHeight: '24px',
        textAlign: 'center',
        position: 'absolute',
        right: '20px',
        top: '50%',
        marginTop: '-12px',
        cursor: 'pointer'
    },
    contentRight: {
        // width: '460px',
        marginLeft: '20px',
        [theme.breakpoints.down('sm')]: {
            margin: '19px 0px 0px 0px'
        }
        // background:'red'
        // background: 'linear-gradient(223deg, rgba(36, 33, 81, 0.54) 0%, rgba(38, 35, 83, 0.8) 40%, rgba(28, 26, 67, 0.45) 100%)',
        // padding:'0 19px',
        // boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        // border:' 1px solid #7367F7'
    },
    total: {
        display: 'flex',
        background: theme.themeColors.modelBack,
        // padding:'0 19px',
        // boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        border: ' 1px solid #7367F7',
        padding: '23px 16px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width:'167px',
            padding: '23px 9px',
        }

    },
    totalText: {

    },
    apr: {
        display: 'flex',
        width: '220px',
        background: theme.themeColors.modelBack,
        // padding:'0 19px',
        // boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        border: '1px solid #7367F7',
        padding: '23px 16px',
        alignItems: 'center',
        marginLeft: '20px',
        [theme.breakpoints.down('sm')]: {
            width:'167px',
            padding: '23px 9px',
        }
    },
    totalApr: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    aprText: {

    },
    smallImg: {
        width: '40px',
        height: '40px',
        marginRight: '12px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '5px',
            width:'28px',
            height:'28px',
            marginRight: '8px',
        }
    },
    totalTextTile: {
        fontSize: '16px',
        fontWeight: '400',
        display:'flex',
        alignItems:'center',
        color: theme.themeColors.textT,
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
        }
    },
    totalTextNum: {
        fontSize: '20px',
        fontWeight: '500',
        color: theme.themeColors.textT,
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
        }
    },
    myAssets: {
        padding: '49px 40px',
        display: 'flex',
        marginTop: '21px',
        background: theme.themeColors.modelBack,
        // padding:'0 19px',
        // boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        border: ' 1px solid #7367F7',
        alignItems: 'center'
    },
    myAssetsTitle: {
        fontSize: '24px',
        fontWeight: '400',
        color: theme.themeColors.textT
    },
    myAssetsNum: {
        fontSize: '24px',
        fontWeight: '500',
        color: theme.themeColors.textT
    },
    myAssetsRate: {
        fontSize: '20px',
        fontWeight: '500',
        color:theme.themeColors.myAssetsRateText,
    },
    bigImg: {
        width: '80px',
        height: '80px',
        marginRight: '23px',
    },
    share: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        background:'rgba(0,0,0,.6)',
        zIndex:'999999',
        top: 0,
        left: 0,
    },
    shareBox: {
        width: '419px',
        position: 'absolute',
        left: '40%',
        top: '30%',
        trantransform: 'translate(-50%)',
        background: theme.themeColors.modelBack,
        border: '1px solid #7367F7',
        [theme.breakpoints.down('sm')]: {
            width:'335px',
            position:'absolute',
            left:'50%',
            top:'15%',
            transform: 'translate(-50%)',
            // transform: 'translateX(-50%)',
        }
    },
    shareTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '48px',
        alignItems: 'center',
        background: theme.themeColors.menuSel,
        padding: '0 24px'
    },
    shareTitleText: {
        fontSize: '18px',
        color: theme.themeColors.textT
    },
    closeIcon: {
        width: '24px',
        height: '24px',
        fill: theme.themeColors.textT
    },
    aprTitle: {
        fontSize: '14px',
        color: theme.themeColors.textT
    },
    shareText: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '7px',
        padding: '0 72px'
    },
    shareTextTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '27px',
        padding: '0 72px',
        marginTop: '18px'
    },
    aprText: {
        fontSize: '16px',
        color: '#7367F7'
    },
    aprIntroduction: {
        padding: '0 23px',
        marginTop: '49px',
        fontSize: '12px',
        color: theme.themeColors.textT
    },
    shareBtn: {
        width: '217px',
        border: '1px solid #7367F7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '57px auto 34px',
        '& span': {
            fontSize: '18px',
            color: theme.themeColors.textT
        }
    },
    shareIcon: {
        width: '12px',
        height: '12px',
        fill: theme.themeColors.textT
    },
    calculator:{
        width:'14px',
        height:'14px',
        fill:theme.themeColors.textT,
        marginLeft:'5px'
    }






});


class StakeDvgVip extends Component {
    constructor(props) {
        super()
        const dashboard = store.getStore('dashboard')
        const account = store.getStore('account')
        this.state = {
            assets: store.getStore('account'),
            account: account,
            onboard: '',
            dvgInfoObj: '',
            amount: '',
            type: 'stake',
            isShowApr:false,
            aprInfo: {
                tvl:0
            }
        }
        if (account && account.address) {
            dispatcher.dispatch({ type: GET_DVG_INFO })
            dispatcher.dispatch({ type: GET_XDVG_BALANCE })
        }
        // dispatcher.dispatch({ type: GET_VAULT_BALANCES_FULL })
        dispatcher.dispatch({ type: GET_DVG_APR })
    }
    componentWillMount() {
        const onboard = initOnboard({
            address: (address) => {
                // console.log('onboard#####address####', address);
                store.setStore({ account: { address: address } });
                emitter.emit(CONNECTION_CONNECTED);
            },
            network: (network) => {
                // console.log('onboard###network#####', network);
                store.setStore({ network: network });
                emitter.emit('CHANGE_NETWORK', { network: network });
            },
            balance: (balance) => {
                let account = store.getStore('account');
                // console.log('onboard#####balance#####', balance);
                store.setStore({ account: { ...account, balance: balance } });
                emitter.emit(CONNECTION_CONNECTED);
            },
            wallet: (wallet) => {
                // console.log('onboard#####wallet#####', wallet);
                store.setStore({
                    web3context: { library: { provider: wallet.provider } },
                })
                window.localStorage.setItem('selectedWallet', wallet.name);
            }
        });
        this.setState({
            onboard: onboard
        });
        store.setStore({ 'onboard': onboard });
        emitter.on(CHANGE_NETWORK, this.networkChanged);
        emitter.on(DASHBOARD_SNAPSHOT_RETURNED, this.dashboardSnapshotReturned);
        emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
        emitter.on(GET_DVG_BALANCE_SUCCESS, this.dvgBalance)
        emitter.on(GET_XDVG_BALANCE_SUCCESS, this.xdvgBalance)
        emitter.on(GET_XDVG_APR_SUCCESS, this.getAprInfo)
        emitter.on(WITHDRAW_DVG_RETURNED, this.withdrawReturned)
        emitter.on(DEPOSIT_DVG_RETURNED, this.depositReturned)
    }

    componentWillUnmount() {
        emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
        emitter.removeListener(DASHBOARD_SNAPSHOT_RETURNED, this.dashboardSnapshotReturned);
        emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
        emitter.removeListener(GET_DVG_BALANCE_SUCCESS, this.dvgBalance)
        emitter.removeListener(GET_XDVG_BALANCE_SUCCESS, this.xdvgBalance)
        emitter.removeListener(GET_XDVG_APR_SUCCESS, this.getAprInfo)
        emitter.removeListener(WITHDRAW_DVG_RETURNED, this.withdrawReturned)
        emitter.removeListener(DEPOSIT_DVG_RETURNED, this.depositReturned)
    }


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
    connectionConnected = () => {
        const { period } = this.state;
        const account = store.getStore('account')
        this.setState({ loading: true, account: account })
        if (account && account.address) {
            dispatcher.dispatch({ type: GET_DVG_INFO })
        }
        dispatcher.dispatch({ type: GET_DASHBOARD_SNAPSHOT, content: { interval: period } })
    };

    dvgBalance = (asset) => {
        this.setState({
            dvgInfoObj: asset
        })
    }


    xdvgBalance = (asset) => {
        this.setState({
            dvgInfoObj: asset
        })
    }

    submitStake = () => {
        if (this.state.type == 'stake') {
            dispatcher.dispatch({ type: DEPOSIT_XDVG, content: { amount: this.state.amount, asset: this.state.dvgInfoObj[0] } })
        } else {
            dispatcher.dispatch({ type: WIDTHDRAW_XDVG, content: { amount: this.state.amount, asset: this.state.dvgInfoObj[1] } })
        }
    }

    onChange = (event) => {
        this.setState({
            amount: event.target.value
        })
    }

    stakeTab = (type) => {
        if (type !== this.state.type) {
            this.setState({
                type: type,
                amount: ''
            })
        }
    }

    depositReturned = () => {
        this.setState({ loading: false, amount: "" });
      };
    
      withdrawReturned = (txHash) => {
        this.setState({ loading: false, amount: "" });
      };
    
    maxAmount() {
        const { type, dvgInfoObj } = this.state;
        if (type == 'stake') {
            this.setState({
                // amount: Number(dvgInfoObj && dvgInfoObj[1].balance).toFixed(4)
                amount:dvgInfoObj && dvgInfoObj[1].balance.toString()
            })
        } else {
            this.setState({
                // amount: Number(dvgInfoObj && dvgInfoObj[0].balance).toFixed(4)
                amount:dvgInfoObj && dvgInfoObj[0].balance.toString()
            })
        }
    }

    getAprInfo = () => {
        const aprInfo = store.getStore('dvgApr');
        this.setState({
            aprInfo: aprInfo
        })
    }

    goUrl = (url) => {
        let tempwindow = window.open('_blank');
        tempwindow.location = url;
    }

    showAprDetail=()=>{
        this.setState({
            isShowApr:!this.state.isShowApr
        })
    }

    render() {
        const {
            classes
        } = this.props;
        const {
            loading,
            account,
            amount,
            type,
            dvgInfoObj,
            isShowApr,
            aprInfo
        } = this.state
        const dvgBalance = dvgInfoObj && dvgInfoObj[1].balance;
        const xdvgBalance = dvgInfoObj && dvgInfoObj[0].balance;
        if (!account || !account.address) {
            return <ConnectWallet></ConnectWallet>
        } else {

            return <div className={classes.root}>

                <Grid>

                    <div className={classes.banner}>
                        <div className={classes.bannerLeft}>
                            <div className={classes.text}>Buy DVG on DEX Liquidity Pools</div>
                        </div>
                        <div className={classes.bannerRight}>
                            <div className={classes.toTrade}>
                                <div className={classes.toTradeUniswap} onClick={() => this.goUrl('https://app.uniswap.org/#/swap?outputCurrency=0x51e00a95748dbd2a3f47bc5c3b3e7b3f0fea666c')}>Buy on Uniswap</div>
                                <div className={classes.toTradePancakeswap} onClick={() => this.goUrl('https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x51e00a95748dbd2a3f47bc5c3b3e7b3f0fea666c')}>Buy on Pancakeswap</div>

                            </div>
                        </div>

                    </div>
                </Grid>
                <div className={classes.content}>
                    <div className={classes.contentLeft}>
                        <div className={classes.contentLeftTitle}>
                            <div className={classes.titleText}>Stake Pool</div>
                            <div className={classes.titleRate}>
                                1 vipDVG = {aprInfo.xDVGPrice && aprInfo.xDVGPrice.toFixed(2)}DVG

                        </div>
                        </div>
                        <div className={classes.contentCenter}>
                            <div className={classes.contentHeader}>
                                <div className={classes.stakeTab}>
                                    <div className={type == 'stake' ? classes.stake : classes.unStake} onClick={() => this.stakeTab('stake')}>Stake</div>
                                    <div className={type == 'stake' ? classes.unStake : classes.stake} onClick={() => this.stakeTab('unStake')}>Unstake</div>
                                </div>
                                {type == 'stake' ?
                                    <div className={classes.available}>Available：{dvgBalance && Number(dvgBalance).toFixed(2)}DVG</div>
                                    : <div className={classes.available}>Available：{xdvgBalance && Number(xdvgBalance).toFixed(2)}vipDVG</div>

                                }
                            </div>
                            <div className={classes.stakeInput}>

                                <input className={classes.input} value={amount} onChange={this.onChange} type="text" />
                                <div className={classes.max} onClick={() => this.maxAmount()}>Max</div>
                            </div>
                            
                            <div className={amount?classes.approveStakingActive:classes.approveStaking} onClick={() => { this.submitStake() }}>
                                
                                {
                                  type == 'stake'?  'Approve Staking':'Approve Unstaking'
                                }
                        </div>
                        </div>
                    </div>
                    <div className={classes.contentRight}>
                        <div className={classes.totalApr}>
                            <div className={classes.total}>
                                <img className={classes.smallImg} src={require("../../assets/stakeImg/lock-icon@2x.png")} alt="" />
                                <div className={classes.totalText}>
                                    <p className={classes.totalTextTile}>Total Value Locked</p>
                                    <p className={classes.totalTextNum}>$ {Number(aprInfo.tvl).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className={classes.apr}>
                                <img className={classes.smallImg} src={require("../../assets/stakeImg/apy-icon@2x.png")} alt="" />
                                <div className={classes.aprText}>
                                    <p className={classes.totalTextTile}>APR
                                    <svg className={classes.calculator} aria-hidden="true" onClick={()=>{this.showAprDetail()}}>
                                        <use xlinkHref="#iconcalculator-line"></use>
                                    </svg>
                                    </p>
                                    <p className={classes.totalTextNum}>{aprInfo.apr && Number(aprInfo.apr).toFixed(2)} %</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.myAssets}>
                            <img className={classes.bigImg} src={require("../../assets/stakeImg/liquidity-icon@2x.png")} alt="" />
                            <div className={classes.myAssetstext}>
                                <p className={classes.myAssetsTitle}>My vipDVG</p>
                                <p className={classes.myAssetsNum}>{xdvgBalance && Number(xdvgBalance).toFixed(2)}</p>
                                <p className={classes.myAssetsRate}>≈ $ {xdvgBalance && aprInfo.xDVGPrice && aprInfo.dvgPrice && Number(xdvgBalance * aprInfo.xDVGPrice * aprInfo.dvgPrice).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {isShowApr ?
                    <div className={classes.share}>
                        <div className={classes.shareBox}>
                            <div className={classes.shareTitle}>
                                <p className={classes.shareTitleText}>Est. ROI</p>
                                <svg className={classes.closeIcon} aria-hidden="true" onClick={()=>{this.showAprDetail()}}>
                                    <use xlinkHref="#iconclose"></use>
                                </svg>
                            </div>
                            <div className={classes.shareContent}>
                                <div className={classes.shareTextTitle}>
                                    <p className={classes.aprTitle}>TIMEFRAME</p>
                                    <p className={classes.aprTitle}>Est. ROI</p>
                                </div>
                                <div className={classes.shareText}>
                                    <p className={classes.aprText}>1d</p>
                                    <p className={classes.aprText}>{aprInfo.aprOneDay.toFixed(2)}%</p>
                                </div>
                                <div className={classes.shareText}>
                                    <p className={classes.aprText}>7d</p>
                                    <p className={classes.aprText}>{aprInfo.aprOneWeek.toFixed(2)}%</p>
                                </div>
                                <div className={classes.shareText}>
                                    <p className={classes.aprText}>30d</p>
                                    <p className={classes.aprText}>{aprInfo.aprOneMonth.toFixed(2)}%</p>
                                </div>
                                <div className={classes.shareText}>
                                    <p className={classes.aprText}>365d(APY)</p>
                                    <p className={classes.aprText}>{aprInfo.aprOneYear.toFixed(2)}%</p>
                                </div>
                                <div className={classes.aprIntroduction}>
                                    Calculated based on current rates. Rates are estimates provided for your convenience and reference only, which does not represent any guaranteed returns.
                        </div>
                                <div className={classes.shareBtn}>
                                    <span onClick={()=>{this.goUrl('https://app.uniswap.org/#/swap?outputCurrency=0x51e00a95748dbd2a3f47bc5c3b3e7b3f0fea666c')}}>Get DVG</span>
                                    <svg className={classes.shareIcon} aria-hidden="true">
                                        <use xlinkHref="#iconshare"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div> : null}
            </div>
        }

    }
}
export default withNamespaces()(withRouter(withStyles(styles)(StakeDvgVip)));