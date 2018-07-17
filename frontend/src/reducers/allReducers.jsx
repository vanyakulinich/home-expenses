import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import tokenReducer from './tokenReducer.jsx'

const allReducers = combineReducers({
    token: tokenReducer,
    router: routerReducer
})
export default allReducers