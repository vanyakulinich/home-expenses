import USER_DATA from '../actionTypes/userDataType.jsx';
import ADD_CATEGORY from '../actionTypes/addCategory.jsx'


export default function userDataReducer(state=null, {type, data}) {
    switch(type) {
        case USER_DATA:
            return data;
        case ADD_CATEGORY:
            return [...state, data]
        default:
            return state;
    }
}