import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mobileOpenReducer from './mobileOpenReducer.jsx';
import signUserReducer from './signUserReducer.jsx';
import userDataReducer from './userDataReducer.jsx'


const allReducers = combineReducers({
    mobile: mobileOpenReducer,
    user: signUserReducer,
    userData: userDataReducer,
    router: routerReducer,
})
export default allReducers;