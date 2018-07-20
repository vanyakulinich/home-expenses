import SIGN_USER from '../actionTypes/signUser.jsx';
import appHistory from '../index'

export default function signOutUser(token) {
    return (dispatch)=>{

        let fetchOptions = {
            method: 'POST',
            body: JSON.stringify({token}),
            headers: { "Content-Type": "application/json" }
        }
        fetch(`http://localhost:3001/signout`, fetchOptions)
            .then(res => console.log(res.status))
            .then(() => {
                dispatch({
                    type: SIGN_USER,
                    user: null
                })
                localStorage.clear()
                appHistory.push('/signin')
            })
            .catch(e => console.log(e))
    }
}

