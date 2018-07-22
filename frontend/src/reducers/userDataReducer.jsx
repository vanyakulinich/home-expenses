import USER_DATA from '../actionTypes/userDataType.jsx';

export default function userDataReducer(state=null, {type, data}) {
    switch(type) {
        case USER_DATA:
            return data;
        default:
            return state;
    }
}