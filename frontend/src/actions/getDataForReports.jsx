import GET_REPORTS from '../actionTypes/reports.jsx';

export default function getUserData() {
    return (dispatch)=>{
        let fetchOptions = {
            method: 'GET',
            headers: { 
                "Authorization": "Bearer "+localStorage.getItem('token')
            }
        }
        fetch(`http://localhost:3001/userdata/get/reports`, fetchOptions)
            .then(res => res.json())
            .then((data) => {
                dispatch(
                {  
                    type: GET_REPORTS, 
                    reportList: data.listForReports
                })

            })
            .catch(e => console.log(e))
    }
}