import SIGN_USER from '../actionTypes/signUser.jsx';
// import {push} from 'react-router-redux';
import appHistory from '../index'; // c bindActionCreators еще не разобрался


export default function signUser(user, signType) {
    return (dispatch)=>{
        let fetchOptions = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" }
        }
        fetch(`http://localhost:3001/${signType}`, fetchOptions)
            .then(res => res.json())
            .then(data => {
                if(data.token) {
                    localStorage.setItem('token', data.token)
                    appHistory.push('/dashboard')
                } else {
                    dispatch({
                        type: SIGN_USER,
                        user: data.verify ? 'notverified' : 'nouser'
                    })
                }
            })
            .catch(e => console.log(e))
    }
    
}