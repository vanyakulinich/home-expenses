import SIGN_USER from '../actionTypes/signUser.jsx';

export default function signOutUser() {
    return (dispatch)=>{
        localStorage.clear()
        dispatch({
            type: SIGN_USER,
            user: null
        })
        
    }
}

