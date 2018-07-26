import USER_EXPENSE from '../actionTypes/userDataType';

export default function addNewExpense(method, body) {
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
        fetch(`http://localhost:3001/userdata/expenses`, fetchOptions)
            .then(res => res.json())
            .then((data) => {
                dispatch(
                {
                    type: USER_EXPENSE,
                    userExpenses: data,
                },
                
            )
            })
            .catch(e => console.log(e))
    }
}