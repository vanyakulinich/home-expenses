import SIGN_USER from '../actionTypes/signUser.jsx';
import {push} from 'react-router-redux';



export default function signUser(user, signType) {
    console.log(push)
    return (dispatch)=>{
        let fetchOptions = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" }
        }
        fetch(`http://localhost:3001/${signType}`, fetchOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                localStorage.setItem('token', data.token)
                dispatch({
                    type: SIGN_USER,
                    user: user.email
                }, )
            })
            .then(() => dispatch(push('/')))
            .catch(e => console.log(e))
    }
    
}