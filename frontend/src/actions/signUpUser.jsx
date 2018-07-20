import VERIFY_STATUS from '../actionTypes/verifyStatusType.jsx';


export default function signUpUser(user) {
    return (dispatch)=>{
        let fetchOptions = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" }
        }
        fetch(`http://localhost:3001/signup`, fetchOptions)
            .then(res => console.log(res.status))
            .then(() => {
                dispatch({
                    type: VERIFY_STATUS,
                    status: false
                })
            })
            .catch(e => console.log(e))
    }
    
}