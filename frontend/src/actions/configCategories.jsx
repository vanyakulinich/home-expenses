import USER_CATEGS from '../actionTypes/userCategsType.jsx';
import CATEG_LIST from '../actionTypes/categListType.jsx';
import USER_EXPENSE from '../actionTypes/expenseActionType.jsx';


export default function configCategories(method, path, body) {
    return (dispatch)=>{
        let route = path ? path : ''
        let fetchOptions = {
            method,
            body: JSON.stringify(body),
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem('token'),
                
            }
        }
        fetch(`http://localhost:3001/userdata/config/`+route, fetchOptions)
            .then(res => res.json())
            .then((data) => {
                console.log('DATA UPDATED ON SERVER')
                if(data.categories) {
                    dispatch([{
                        type: USER_CATEGS,
                        userCategories: data.categories,
                     },
                     {
                        type: CATEG_LIST,
                        categList: data.categories.map(el=>({name: el.name, id: el.id})),
                     }
                    ])
                }

                if(data.expenses) {
                    dispatch({
                        type: USER_EXPENSE,
                        userExpenses: data.expenses,
                    })
                }        
            })
        
            .catch(e => console.log(e))
    }
}