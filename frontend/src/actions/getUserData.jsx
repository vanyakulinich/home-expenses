import USER_DATA from '../actionTypes/userDataType.jsx'
import SIGN_USER from '../actionTypes/signUser.jsx'

export default function getUserData() {
    return (dispatch)=>{
        let fetchOptions = {
            method: 'GET',
            headers: { 
                "Authorization": "Bearer "+localStorage.getItem('token')
            }
        }
        fetch(`http://localhost:3001/userdata`, fetchOptions)
            .then(res => res.json())
            .then((data) => {
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                dispatch({  
                    type: SIGN_USER, 
                    user: data.email
                });
                return data
            })
            .then(data=> dispatch({
                type: USER_DATA,
                data: data.categories
            }))
            .catch(e => console.log(e))
    }
}