import SIGN_USER from '../actionTypes/signUser.jsx';
import USER_DATA from '../actionTypes/userDataType.jsx'

export default function signOutUser() {
    return (dispatch)=>{
        localStorage.clear()
        dispatch({
            type: SIGN_USER,
            user: null
        })
        dispatch({
            type: USER_DATA,
            data: null
        })
        
    }
}

