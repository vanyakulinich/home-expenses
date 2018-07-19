import SIGN_USER from '../actionTypes/signUser.jsx';
import {push} from 'react-router-redux';


export default function signOutUser() {
    return (dispatch)=>{
        localStorage.clear()
        dispatch({
            type: SIGN_USER,
            user: null
        })
    }
}

