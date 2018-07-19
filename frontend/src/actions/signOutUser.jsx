import SIGN_USER from '../actionTypes/signUser.jsx';
import {push} from 'react-router-redux';


export default function signOutUser(user) {
    return (dispatch)=>{

        let fetchOptions = {
            method: 'POST',
            body: JSON.stringify({user}),
            headers: { "Content-Type": "application/json" }
        }
        fetch(`http://localhost:3001/signout`, fetchOptions)
            .then(res => console.log(res.status))
        //     .then(data => {
        //         if(data.token) {
        //             localStorage.setItem('token', data.token)
        //             dispatch({
        //                 type: SIGN_USER,
        //                 user: user.email
        //             })
        //             appHistory.push('/dashboard')
        //         } else {
        //             dispatch({
        //                 type: SIGN_USER,
        //                 user: 'nouser'
        //             })
        //         }
        //     })
        //     .catch(e => console.log(e))


        // localStorage.clear()
        // dispatch({
        //     type: SIGN_USER,
        //     user: null
        // })
    }
}

