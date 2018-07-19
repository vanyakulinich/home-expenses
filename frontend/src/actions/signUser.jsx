import SIGN_USER from '../actionTypes/signUser.jsx';
// import {push} from 'react-router-redux';
import appHistory from '../index';


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
                console.log(data)
                localStorage.setItem('token', data.token)
                dispatch({
                    type: SIGN_USER,
                    user: user.email
                })
            })
            .then(() =>appHistory.push('/')) // c bindActionCreators еще не разобрался
            .catch(e => console.log(e))
    }
    
}