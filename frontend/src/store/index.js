import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reduxMulti from 'redux-multi'
import {routerMiddleware} from 'react-router-redux'  
import appHistory from '../index'

import allReducers from '../reducers/allReducers.jsx'

const routing = routerMiddleware(appHistory);

const store = createStore(
    allReducers,
    compose(
      applyMiddleware(thunk, reduxMulti, routing),
      window.devToolsExtension && window.devToolsExtension()
    )
);

export default store;