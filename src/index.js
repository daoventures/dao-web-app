import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { hotjar } from "react-hotjar";
import TagManager from "react-gtm-module";
const tagManagerArgs = {
  gtmId: "GTM-MPWKGT4",
};
TagManager.initialize(tagManagerArgs);
//console.log(tagManagerArgs);
hotjar.initialize(2496922, 6);
// Identify the user
hotjar.identify("USER_ID", { userProperty: "value" });

// Add an event
hotjar.event("Homepage visited");

// Update SPA state
hotjar.stateChange("/my/page");

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
