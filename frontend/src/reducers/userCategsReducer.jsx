import USER_CATEGS from '../actionTypes/userCategsType.jsx';
import recurse from '../functions/recurse.jsx'

export default function userCategsReducer(state=null, {type, userCategories}) {
    switch(type) {
        case USER_CATEGS:
            let recursedData = recurse(userCategories, null) || userCategories

            return recursedData;
        default:
            return state;
    }
}