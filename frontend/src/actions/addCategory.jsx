import ADD_CATEGORY from '../actionTypes/addCategory.jsx';

export default function addCategory() {
    return (dispatch)=>{
        dispatch({
            type: ADD_CATEGORY,
            userData: 'New Category'
        })
    }
}