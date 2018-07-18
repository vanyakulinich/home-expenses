import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import {Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store from './store'

import "assets/css/material-dashboard-react.css?v=1.3.0";

import indexRoutes from "routes/index.jsx";

const appHistory = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={appHistory}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
    </ConnectedRouter>
  </Provider>, document.getElementById("root")
);

export default appHistory;

