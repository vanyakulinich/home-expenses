import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import {Router, Route, Switch } from "react-router-dom";
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';   

import "assets/css/material-dashboard-react.css?v=1.3.0";

import indexRoutes from "routes/index.jsx";

import allReducers from 'reducers/allReducers.jsx'

import createHistory from 'history/createBrowserHistory';

import Dashboard from 'layouts/Dashboard/Dashboard.jsx'

// const history = createBrowserHistory();
const history = createHistory();

const routing = routerMiddleware(history);


const store = createStore(
    allReducers,
    compose(
      applyMiddleware(routing, thunk),
      window.devToolsExtension && window.devToolsExtension()
    )
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
    </ConnectedRouter>
  </Provider>, document.getElementById("root")
);

