import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';

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
    GET_XDVG_APR_SUCCESS
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
        height: '120px',
        padding: '12px 50px',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundImage: 'url(' + require('../../assets/stakeImg/Daovip_banner@2x.png') + ')'
    },
    text: {
        fontSize: '30px',
        fontWeight: '500',
        color: theme.themeColors.textT,
        lineHeight: '96px'
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
        marginBottom: '8px'
    },
    toTradePancakeswap: {
        width: '214px',
        height: '44px',
        backgroundImage: 'url(' + require('../../assets/stakeImg/button_pancakeswap@2x.png') + ')',
        backgroundSize: '100% 100%',
        lineHeight: '44px',
        fontSize: '18px',
        fontWeight: '500',
        color: theme.themeColors.textT,
        textAlign: 'center'
    },
    content: {
        display: 'flex',
        marginTop: '35px'
    },
    contentLeft: {
        width: '80%',
        // width: '556px',
        // background:'red'
        background: 'linear-gradient(223deg, rgba(36, 33, 81, 0.54) 0%, rgba(38, 35, 83, 0.8) 40%, rgba(28, 26, 67, 0.45) 100%)',
        // padding:'0 19px',
        boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        border: ' 1px solid #7367F7'
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
    },
    stakeTab: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme.themeColors.blockBorder,
        width: '180px',
        height: '32px',
        display: 'flex'
    },
    stake: {
        width: '90px',
        background: theme.themeColors.blockBorder,
        color: theme.themeColors.textT,
        lineHeight: '32px',
        textAlign: 'center',
        cursor:'pointer'
    },
    unStake: {
        width: '90px',
        color: theme.themeColors.textP,
        lineHeight: '32px',
        textAlign: 'center',
        cursor:'pointer'
    },
    available: {
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '16px',
        color: theme.themeColors.textT
    },
    stakeInput: {
        marginTop: '30px',
        position: 'relative'
    },
    input: {
        width: '100%',
        height: '56px',
        background: 'rgba(0,0,0,.2)',
        padding: '0 20px',
        border: 'none',
        color:theme.themeColors.textT
    },
    approveStaking: {
        height: '44px',
        border: '1px solid rgba(115, 103, 247, 0.4);',
        marginTop: '31px',
        lineHeight: '44px',
        textAlign: 'center',
        marginBottom: '31px',
        color: 'rgba(115, 103, 247, 0.4)'
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
        cursor:'pointer'
    },
    contentRight: {
        // width: '460px',
        marginLeft: '20px',
        // background:'red'
        // background: 'linear-gradient(223deg, rgba(36, 33, 81, 0.54) 0%, rgba(38, 35, 83, 0.8) 40%, rgba(28, 26, 67, 0.45) 100%)',
        // padding:'0 19px',
        // boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        // border:' 1px solid #7367F7'
    },
    total: {
        display: 'flex',
        background: 'linear-gradient(223deg, rgba(36, 33, 81, 0.54) 0%, rgba(38, 35, 83, 0.8) 40%, rgba(28, 26, 67, 0.45) 100%)',
        // padding:'0 19px',
        boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        border: ' 1px solid #7367F7',
        padding: '23px 16px',
        alignItems: 'center'
    },
    totalText: {

    },
    apr: {
        display: 'flex',
        width: '220px',
        background: 'linear-gradient(223deg, rgba(36, 33, 81, 0.54) 0%, rgba(38, 35, 83, 0.8) 40%, rgba(28, 26, 67, 0.45) 100%)',
        // padding:'0 19px',
        boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        border: ' 1px solid #7367F7',
        padding: '23px 16px',
        alignItems: 'center',
        marginLeft: '20px'
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
        marginRight: '12px'
    },
    totalTextTile: {
        fontSize: '16px',
        fontWeight: '400',
        color: theme.themeColors.textT
    },
    totalTextNum: {
        fontSize: '20px',
        fontWeight: '500',
        color: theme.themeColors.textT
    },
    myAssets: {
        padding: '49px 40px',
        display: 'flex',
        marginTop: '21px',
        background: 'linear-gradient(223deg, rgba(36, 33, 81, 0.54) 0%, rgba(38, 35, 83, 0.8) 40%, rgba(28, 26, 67, 0.45) 100%)',
        // padding:'0 19px',
        boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
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
        fontSize: '24px',
        fontWeight: '500',
        color: theme.themeColors.textT,
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
        top: 0,
        left: 0
    },
    shareBox: {
        width: '419px',
        position: 'absolute',
        left: '50%',
        top: '30%',
        trantransform: 'translate(-50%)',
        background: 'linear-gradient(223deg, rgba(36, 33, 81, 0.54) 0%, rgba(38, 35, 83, 0.8) 40%, rgba(28, 26, 67, 0.45) 100%)',
        boxShadow: '0px 2px 10px 0px rgba(23, 18, 43, 0.85)',
        border: '1px solid #7367F7',
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
        fill: '#FFFFFF'
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
            dvgInfoObj:'',
            amount:'',
            type:'stake',
            aprInfo:{}
        }
        console.log(account,'account####');
        if (account && account.address) {
            dispatcher.dispatch({ type: GET_DVG_INFO })
            dispatcher.dispatch({ type: GET_XDVG_BALANCE })
        }
        dispatcher.dispatch({ type: GET_VAULT_BALANCES_FULL })
        dispatcher.dispatch({type:GET_DVG_APR})
    }
    componentWillMount() {
        const onboard = initOnboard({
            address: (address) => {
                console.log('onboard#####address####', address);
                store.setStore({ account: { address: address } });
                emitter.emit(CONNECTION_CONNECTED);
            },
            network: (network) => {
                console.log('onboard###network#####', network);
                store.setStore({ network: network });
                emitter.emit('CHANGE_NETWORK', { network: network });
            },
            balance: (balance) => {
                let account = store.getStore('account');
                console.log('onboard#####balance#####', balance);
                store.setStore({ account: { ...account, balance: balance } });
                emitter.emit(CONNECTION_CONNECTED);
            },
            wallet: (wallet) => {
                console.log('onboard#####wallet#####', wallet);
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
        emitter.on(GET_DVG_BALANCE_SUCCESS,this.dvgBalance)
        emitter.on(GET_XDVG_BALANCE_SUCCESS,this.xdvgBalance)
        emitter.on(GET_XDVG_APR_SUCCESS,this.getAprInfo)
    }

    componentWillUnmount() {
        emitter.removeListener(CHANGE_NETWORK, this.networkChanged);
        emitter.removeListener(DASHBOARD_SNAPSHOT_RETURNED, this.dashboardSnapshotReturned);
        emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
        emitter.on(GET_DVG_BALANCE_SUCCESS,this.dvgBalance)
        emitter.on(GET_XDVG_BALANCE_SUCCESS,this.xdvgBalance)
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
        console.log(account,'account428##3');
        this.setState({ loading: true, account: account })
            if (account && account.address) {
                dispatcher.dispatch({ type: GET_DVG_INFO })
            }
        dispatcher.dispatch({ type: GET_DASHBOARD_SNAPSHOT, content: { interval: period } })
    };
    
    dvgBalance =(asset)=>{
            this.setState({
                dvgInfoObj:asset
            })
    }


    xdvgBalance =(asset)=>{
        this.setState({
            dvgInfoObj:asset
        })
    }

    submitStake=()=>{
        if(this.state.type=='stake'){
            dispatcher.dispatch({type:DEPOSIT_XDVG,content:{amount:this.state.amount,asset:this.state.dvgInfoObj[0]}})
        }else{
            dispatcher.dispatch({type:WIDTHDRAW_XDVG,content:{amount:this.state.amount,asset:this.state.dvgInfoObj[1]}})
        }
    }

    onChange = (event) => {
        this.setState({
            amount:event.target.value
        })
      }

    stakeTab = (type) =>{
        if(type!==this.state.type){
            this.setState({
                type:type,
                amount:''
            })
        }
    }

    maxAmount(){
        const {type,dvgInfoObj} = this.state;
        if(type=='stake'){
            this.setState({
                amount:dvgInfoObj&&dvgInfoObj[1].balance
            })
        }else{
            this.setState({
                amount:dvgInfoObj&&dvgInfoObj[0].balance
            })
        }
    }

    getAprInfo=()=>{
        const aprInfo = store.getStore('dvgApr');
        console.log(aprInfo,'aprInfo##');
        this.setState({
            aprInfo:aprInfo
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
            aprInfo
        } = this.state
        const dvgBalance=dvgInfoObj&&dvgInfoObj[1].balance;
        const xdvgBalance=dvgInfoObj&&dvgInfoObj[0].balance;
        if (!account || !account.address) {
            return <ConnectWallet></ConnectWallet>
        } else {

            return <div className={classes.root}>

                <div className={classes.banner}>
                    <div className={classes.bannerLeft}>
                        <div className={classes.text}>Buy DVG on DEX Liquidity Pools</div>
                    </div>
                    <div className={classes.bannerRight}>
                        <div className={classes.toTrade}>
                            <div className={classes.toTradeUniswap}>Buy on Uniswap</div>
                            <div className={classes.toTradePancakeswap}>Buy on Pancakeswap</div>

                        </div>
                    </div>

                </div>
                <div className={classes.content}>
                    <div className={classes.contentLeft}>
                        <div className={classes.contentLeftTitle}>
                            <div className={classes.titleText}>Stake Pool</div>
                            <div className={classes.titleRate}>
                                1 xDVG = 1.001 DVG
                        </div>
                        </div>
                        <div className={classes.contentCenter}>
                            <div className={classes.contentHeader}>
                                <div className={classes.stakeTab}>
                                    <div className={type=='stake'?classes.stake:classes.unStake} onClick={()=>this.stakeTab('stake')}>Stake</div>
                                    <div className={type=='stake'?classes.unStake:classes.stake} onClick={()=>this.stakeTab('unStake')}>Unstake</div>
                                </div>
                                <div className={classes.available}>Available：{Number(dvgBalance).toFixed(2)}DVG</div>
                            </div>
                            <div className={classes.stakeInput}>

                                <input className={classes.input} value={amount} onChange={this.onChange} type="text" />
                                <div className={classes.max} onClick={()=>this.maxAmount()}>Max</div>
                            </div>
                            <div className={classes.approveStaking} onClick={()=>{this.submitStake()}}>
                                Approve Staking
                        </div>
                        </div>
                    </div>
                    <div className={classes.contentRight}>
                        <div className={classes.totalApr}>
                            <div className={classes.total}>
                                <img className={classes.smallImg} src={require("../../assets/stakeImg/lock-icon@2x.png")} alt="" />
                                <div className={classes.totalText}>
                                    <p className={classes.totalTextTile}>Total Value Locked</p>
                                    <p className={classes.totalTextNum}>$ 1,0002.00</p>
                                </div>
                            </div>
                            <div className={classes.apr}>
                                <img className={classes.smallImg} src={require("../../assets/stakeImg/apy-icon@2x.png")} alt="" />
                                <div className={classes.aprText}>
                                    <p className={classes.totalTextTile}>APR</p>
                                    <p className={classes.totalTextNum}>{aprInfo.apr} %</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.myAssets}>
                            <img className={classes.bigImg} src={require("../../assets/stakeImg/liquidity-icon@2x.png")} alt="" />
                            <div className={classes.myAssetstext}>
                                <p className={classes.myAssetsTitle}>My vipDVG</p>
                                <p className={classes.myAssetsNum}>{Number(xdvgBalance).toFixed(2)}</p>
                                <p className={classes.myAssetsRate}>≈ $ 1,0002.00</p>
                            </div>
                        </div>
                    </div>
                </div>
                {false ?
                    <div className={classes.share}>
                        <div className={classes.shareBox}>
                            <div className={classes.shareTitle}>
                                <p className={classes.shareTitleText}>Est. ROI</p>
                                <svg className={classes.closeIcon} aria-hidden="true">
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
                                    <p className={classes.aprText}>0.26%</p>
                                </div>
                                <div className={classes.shareText}>
                                    <p className={classes.aprText}>7d</p>
                                    <p className={classes.aprText}>1.73%</p>
                                </div>
                                <div className={classes.shareText}>
                                    <p className={classes.aprText}>30d</p>
                                    <p className={classes.aprText}>7.72%</p>
                                </div>
                                <div className={classes.shareText}>
                                    <p className={classes.aprText}>365d(APY)</p>
                                    <p className={classes.aprText}>147.45%</p>
                                </div>
                                <div className={classes.aprIntroduction}>
                                    Calculated based on current rates. Rates are estimates provided for your convenience and reference only, which does not represent any guaranteed returns.
                        </div>
                                <div className={classes.shareBtn}>
                                    <span>Get DVG</span>
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