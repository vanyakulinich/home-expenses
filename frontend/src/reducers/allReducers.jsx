import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import tokenReducer from './tokenReducer.jsx'
import mobileOpenReducer from './mobileOpenReducer.jsx'
import signInReducer from './signInReducer.jsx'

const allReducers = combineReducers({
    mobile: mobileOpenReducer,
    token: signInReducer,
    router: routerReducer,
})
export default allReducers;