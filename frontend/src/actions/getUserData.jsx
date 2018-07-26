import USER_DATA from '../actionTypes/userDataType';
import SIGN_USER from '../actionTypes/signUser';
import USER_EXPENSE from '../actionTypes/expenseActionType.jsx';
import CATEG_LIST from '../actionTypes/categListType.jsx';

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
                console.log('DATA REQUSET TO SERVER')
                console.log(data)
                dispatch([
                {  
                    type: SIGN_USER, 
                    user: data.email
                },
                {  
                    type: USER_DATA, 
                    userCategories: data.categories
                },
                {  
                    type: USER_EXPENSE, 
                    userExpenses: data.expenses
                },
                {  
                    type: CATEG_LIST, 
                    categList: data.categoriesList
                }])
            })
            .catch(e => console.log(e))
    }
}