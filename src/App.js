import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Switch, Route, Redirect } from "react-router-dom";
import IpfsRouter from "ipfs-react-router";

import { BrowserView, MobileView } from "react-device-detect";

import "./i18n";
import { getTheme } from "./theme";

import Header from "./components/header";
import VaultsInfo from "./components/vaultInfo";
import SideDrawer from "./components/sideDrawer";
import MainContainer from "./components/mainContainer";

import StakeDvdVip from "./components/stake/stakeDvdVip";
import StakeDvgVip from "./components/stake/stakeDvgVip";
import Stake from "./components/stake";

import UpgradeToken from "./components/upgradeToken/upgradeToken";

import {
  CONNECTION_CONNECTED,
  TOGGLE_THEME,
  GET_VAULT_INFO,
} from "./constants";

import Store from "./stores/storev2";

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

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", function (accounts) {
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
    const currentTheme = theme || store.getStore("currentTheme");
    this.setState({
      currentTheme: currentTheme,
      interestTheme: getTheme(currentTheme),
    });
  };

  render() {
    return (
      // <MuiThemeProvider theme={createMuiTheme(interestTheme)}>
      <MuiThemeProvider theme={createTheme(this.state.interestTheme)}>
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
            }}
          >
            <Switch>
              <Route path="/invest">
                <Header />
                <SideDrawer keyName="invest" />
                <MainContainer />
                <BrowserView style={{ width: "100%" }}>
                  <VaultsInfo />
                </BrowserView>
                <MobileView>
                  {/* <MobileViewWarning /> */}
                  <VaultsInfo />
                </MobileView>
              </Route>

              <Route path="/stake-dvd">
                <Header />
                <SideDrawer keyName="stake-dvd" />
                <MainContainer />
                <StakeDvdVip />
              </Route>

              <Route path="/stake-dvg">
                <Header />
                <SideDrawer keyName="stake-dvg" />
                <MainContainer />
                <StakeDvgVip />
              </Route>

              <Route path="/daomine">
                <Header />
                <SideDrawer keyName="daomine" />
                <MainContainer />
                <Stake />
              </Route>

              <Route path="/upgrade">
                <Header />
                <SideDrawer keyName="upgrade" />
                <MainContainer />
                <UpgradeToken />
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
