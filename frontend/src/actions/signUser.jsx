import SIGN_USER from '../actionTypes/signUser.jsx';
import {push} from 'react-router-redux';


export default function signIn(user, signType) {
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
                dispatch({
                    type: SIGN_USER,
                    user: data.email
                })
            })
            // .then(() => dispatch(push('/')))
            .catch(e => console.log(e))
    }
}