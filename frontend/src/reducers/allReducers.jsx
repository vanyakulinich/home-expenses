import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mobileOpenReducer from './mobileOpenReducer.jsx';
import signUserReducer from './signUserReducer.jsx';


const allReducers = combineReducers({
    mobile: mobileOpenReducer,
    user: signUserReducer,
    router: routerReducer,
})
export default allReducers;