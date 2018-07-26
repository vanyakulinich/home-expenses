import USER_DATA from '../actionTypes/userDataType.jsx';
import recurse from '../functions/recurse.jsx'

export default function userDataReducer(state=null, {type, userCategories}) {
    switch(type) {
        case USER_DATA:
            let recursedData = recurse(userCategories, null) || userCategories

            return recursedData;
        default:
            return state;
    }
}