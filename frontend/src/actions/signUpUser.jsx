import SIGN_USER from '../actionTypes/signUser.jsx';

export default function signUpUser(user) {
    return (dispatch)=>{
        let fetchOptions = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" }
        }
        fetch(`http://localhost:3001/signup`, fetchOptions)
            .then(res => res.text())
            .then((text) => {
                if(text==='isuser') {
                    dispatch({
                        type: SIGN_USER,
                        user: 'isuser'
                    })
                }
                if(text ==='verify') {
                    dispatch({
                        type: SIGN_USER,
                        user: 'notverified'
                    })
                }
            })
            .catch(e => console.log(e))
    }
    
}