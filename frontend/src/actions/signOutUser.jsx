import SIGN_USER from '../actionTypes/signUser.jsx';
import USER_CATEGS from '../actionTypes/userCategsType.jsx';
import USER_EXPENSE from '../actionTypes/expenseActionType.jsx';
import CATEG_LIST from '../actionTypes/categListType.jsx';

export default function signOutUser() {
    return (dispatch)=>{
        localStorage.clear()
        dispatch([{
            type: SIGN_USER,
            user: null,
        },
        {  
            type: USER_CATEGS, 
            userCategories: null
        },
        {  
            type: USER_EXPENSE, 
            userExpenses: null
        },
        {  
            type: CATEG_LIST, 
            categList: null}
        ])
        
    }
}

