import USER_DATA from '../actionTypes/userDataType.jsx';
import recurse from '../functions/recurse.jsx'

export default function userDataReducer(state=null, {type, data}) {
    switch(type) {
        case USER_DATA:
            let recursedData = recurse(data, null) || data

            return recursedData;
        default:
            return state;
    }
}