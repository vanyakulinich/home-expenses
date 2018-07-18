import MOBILE_OPEN from '../actionTypes/mobileOpenType.jsx'
import { combineReducers } from 'redux';
const mobile=(state = false, { type, mobile })=> {
    switch (type) {
        case MOBILE_OPEN:
            return mobile;
        default:
            return state;
    }
}

export default combineReducers({
    mobile
});