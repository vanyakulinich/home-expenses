import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux'  
import appHistory from '../index'

import allReducers from '../reducers/allReducers.jsx'

const routing = routerMiddleware(appHistory);

const store = createStore(
    allReducers,
    compose(
      applyMiddleware(routing, thunk),
      window.devToolsExtension && window.devToolsExtension()
    )
);

export default store;