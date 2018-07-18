import SIGN_IN from '../actionTypes/signIn';
import {push} from 'react-router-redux';

const url = 'http://localhost:3001/signin';

export default function signIn(user) {
    return (dispatch)=>{
        let fetchOptions = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" }
        }
        fetch(url, fetchOptions)
            .then(res => res.json())
            .then(token => {
                // localStorage.setItem('token', token)
                // dispatch({
                //     type: SIGN_IN,
                //     token
                // })
                console.log(token)
            })
            // .then(() => dispatch(push('/dashboard')))
            .catch(e => console.log(e))
    }
}