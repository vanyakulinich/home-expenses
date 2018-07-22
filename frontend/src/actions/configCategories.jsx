import USER_DATA from '../actionTypes/userDataType.jsx';

export default function configCategories(method, body) {
    return (dispatch)=>{
        let fetchOptions = {
            method,
            body: JSON.stringify(body),
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem('token'),
                
            }
        }
        console.log(fetchOptions)
        fetch(`http://localhost:3001/userdata`, fetchOptions)
            .then(res => res.json())
            .then((data) => {
                console.log('DATA UPDATED ON SERVER')
                dispatch({
                    type: USER_DATA,
                    data,
                })
            })
            .catch(e => console.log(e))
    }
}