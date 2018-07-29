import GET_REPORTS from '../actionTypes/reports.jsx';


export default function reportsReducer(state = null, { type, reportList }){
    switch (type) {
        case GET_REPORTS:
            return reportList;
        default:
            return state;
    }
}