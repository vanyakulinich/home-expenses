import SIGN_USER from '../actionTypes/signUser.jsx';
import {push} from 'react-router-redux';


export default function signOutUser() {
    return (dispatch)=>{
        dispatch({
            type: SIGN_USER,
            user: null
        })
        // .then(()=>dispatch(push('/signup')))
    }
}

