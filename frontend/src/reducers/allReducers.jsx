import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import testReducer from './testReducer.jsx'

const allReducers = combineReducers({
    test: testReducer,
    router: routerReducer
})
export default allReducers