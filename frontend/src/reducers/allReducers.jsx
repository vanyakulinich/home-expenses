import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mobileOpenReducer from './mobileOpenReducer.jsx';
import signUserReducer from './signUserReducer.jsx';
import verificationStatusReducer from './verificationStatusReducer.jsx';


const allReducers = combineReducers({
    mobile: mobileOpenReducer,
    user: signUserReducer,
    verification: verificationStatusReducer,
    router: routerReducer,
})
export default allReducers;