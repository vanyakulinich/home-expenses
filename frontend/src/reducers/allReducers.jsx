import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import tokenReducer from './tokenReducer.jsx'
import mobileOpenReducer from './mobileOpenReducer.jsx'

const allReducers = combineReducers({
    mobile: mobileOpenReducer,
    token: tokenReducer,
    router: routerReducer,
})
export default allReducers;