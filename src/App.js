import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Switch, Route, Redirect } from "react-router-dom";
import IpfsRouter from "ipfs-react-router";

import { BrowserView, MobileView } from "react-device-detect";

import "./i18n";
import interestTheme from "./theme";
import { getTheme } from "./theme";

import APR from "./components/apr";
import InvestSimple from "./components/investSimple";
import Manage from "./components/manage";
// import Performance from './components/performance';
import Zap from "./components/zap";
import IDai from "./components/idai";
// import Footer from './components/footer';
// import Home from './components/home';
import Header from "./components/header";
import Vaults from "./components/vault";
import MobileViewWarning from "./components/mobileViewWarning";
import Dashboard from "./components/dashboard";
import SideDrawer from "./components/sideDrawer";
import MainContainer from "./components/mainContainer";

import StakeDvgVip from './components/stake/stakeDvgVip';
import Stake from './components/stake';

import Swap from './components/swap';

import { injected } from "./stores/connectors";
import { initOnboard } from "./walletsServices.js";

import {
  CONNECTION_CONNECTED,
  TOGGLE_THEME,
  GET_VAULT_INFO,
} from "./constants";

import Store from "./stores";
const emitter = Store.emitter;
const store = Store.store;
const dispatcher = Store.dispatcher;

class App extends Component {
  state = {
    currentTheme: store.getStore("currentTheme"),
    interestTheme: {},
  };

  componentWillMount() {
    dispatcher.dispatch({ type: GET_VAULT_INFO });

    // console.log('没到这里吗####');
    // const onboard = initOnboard({
    //   address: (address) => {
    //     console.log('onboard#####address####', address);
    //     store.setStore({account: {address: address}});
    //   },
    //   network: (network) => {
    //     console.log('onboard###network#####', network);
    //   },
    //   balance: (balance) => {
    //     console.log('onboard#####balance#####', balance);
    //   },
    //   wallet: (wallet) => {
    //     console.log('onboard#####wallet#####', wallet);
    //     window.localStorage.setItem('selectedWallet', wallet.name);
    //   },
    // });

    // const previouslySelectedWallet = window.localStorage.getItem(
    //   'selectedWallet'
    // );

    // if (previouslySelectedWallet && onboard) {
    //   onboard.walletSelect(previouslySelectedWallet);
    // }

    // 暂时注释
    // injected.isAuthorized().then((isAuthorized) => {
    //   if (isAuthorized) {
    //     injected
    //       .activate()
    //       .then((a) => {
    //         console.log('a@@@@######', a);
    //         store.setStore({
    //           account: {address: a.account},
    //           web3context: {library: {provider: a.provider}},
    //         });

    //         console.log('a######', a);
    //         console.log('a.account####', a.account);
    //         emitter.emit(CONNECTION_CONNECTED);
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //       });
    //   } else {
    //   }
    // });

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", function (accounts) {
        console.log("App.js#####accounts######", accounts);

        store.setStore({ account: { address: accounts[0] } });

        const web3context = store.getStore("web3context");
        if (web3context) {
          emitter.emit(CONNECTION_CONNECTED);
        }
      });
    }

    emitter.on("CURRENT_THEME_RETURNED", this.currentThemeChanged);

    const localTheme = localStorage.getItem("daobenturesTheme");
    // console.log('testlocalTheme######', localTheme);
    // this.currentThemeChanged(localTheme);
    if (!localTheme || (localTheme !== "dark" && localTheme !== "light")) {
      this.currentThemeChanged(localTheme);
    } else {
      dispatcher.dispatch({
        type: TOGGLE_THEME,
        content: { currentTheme: localTheme },
      });
    }
  }

  componentWillUnmount() {
    emitter.removeListener("CURRENT_THEME_RETURNED", this.currentThemeChanged);
  }

  currentThemeChanged = (theme) => {
    console.log("currentThemeChanged###theme###", theme);
    const currentTheme = theme || store.getStore("currentTheme");
    console.log("currentTheme####", currentTheme);
    this.setState({
      currentTheme: currentTheme,
      interestTheme: getTheme(currentTheme),
    });
  };

  render() {
    return (
      // <MuiThemeProvider theme={createMuiTheme(interestTheme)}>
      <MuiThemeProvider theme={createMuiTheme(this.state.interestTheme)}>
        <CssBaseline />
        <IpfsRouter>
          <div
            className="app-container"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              alignItems: "center",
              // background: '#f9fafb',
              background: this.state.interestTheme.themeColors.back,
            }}>
            <Switch>
              {/* <Route path="/stats">
                <Header />
                <APR />
              </Route>
              <Route path="/zap">
                <Header />
                <Zap />
              </Route>
              <Route path="/idai">
                <IDai />
              </Route> */}
              {/* <Route path="/performance">
                <Header />
                <Performance />
              </Route> */}
              {/* <Route path="/manage">
                <Header />
                <Manage />
              </Route> */}
              {/* <Route path="/vaults">
                <Header />
                <Vaults />
              </Route> */}
                {/* <Route path="/earn">
                <Header />
                <SideDrawer />
                <MainContainer />
                <InvestSimple />
              </Route> */}
              {/* <Route path="/portfolio">
                <Header />
                <SideDrawer />
                <MainContainer />
                <Dashboard />
              </Route> */}
            
              <Route path="/invest">
                <Header />
                <SideDrawer />
                <MainContainer />
                <BrowserView>
                  <Vaults />
                </BrowserView>
                <MobileView>
                  <MobileViewWarning />
                </MobileView>
              </Route>

              <Route path="/stake">
                <Header />
                <SideDrawer />
                <MainContainer />
                <StakeDvgVip />
              </Route>

              <Route path="/swap">
                <Header />
                <SideDrawer />
                <MainContainer />
                <Swap />
              </Route>

              <Route path="/daomine">
                <Header />
                <SideDrawer />
                <MainContainer />
                <Stake />
              </Route>

              <Route path="/">
                {/* <Home /> */}
                <Redirect to="/invest" />
              </Route>
            </Switch>
            {/* <Footer /> */}
          </div>
        </IpfsRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
