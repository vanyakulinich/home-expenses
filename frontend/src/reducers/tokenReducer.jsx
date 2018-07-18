import TOKEN_ACTION from '../actionTypes/tokenActionType.jsx'
import { combineReducers } from 'redux';
 const token=(state = null, { type, token })=>{
    switch (type) {
        case TOKEN_ACTION:
            return token;
        default:
            return state;
    }
}

export default combineReducers({
    token,
});