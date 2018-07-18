import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import {Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store from './store'

import "assets/css/material-dashboard-react.css?v=1.3.0";

import App from "layouts/App/App.jsx";

const appHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={appHistory}>
      <Route path='/' component={App}/>
    </ConnectedRouter>
  </Provider>, document.getElementById("root")
);

export default appHistory;

