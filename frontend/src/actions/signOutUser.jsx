import SIGN_USER from '../actionTypes/signUser.jsx';
import USER_CATEGS from '../actionTypes/userCategsType.jsx';

export default function signOutUser() {
    return (dispatch)=>{
        localStorage.clear()
        dispatch([{
            type: SIGN_USER,
            user: null
        },
        {
            // type: USER_DATA,
            // data: null
        }])
        
    }
}

