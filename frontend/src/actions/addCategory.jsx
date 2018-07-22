import USER_DATA from '../actionTypes/userDataType.jsx';

export default function addCategory() {
    return (dispatch)=>{

        let fetchOptions = {
            method: 'POST',
            headers: { 
                "Authorization": "Bearer "+localStorage.getItem('token')
            }
        }
        fetch(`http://localhost:3001/userdata`, fetchOptions)
            .then(res => res.json())
            .then((data) => {
                console.log('DATA UPDATED ON SERVER')
                dispatch({
                    type: USER_DATA,
                    data: data.categories
                })
            })
            .catch(e => console.log(e))
    }
}