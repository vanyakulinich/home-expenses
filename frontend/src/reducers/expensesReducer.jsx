import USER_EXPENSE from '../actionTypes/expenseActionType.jsx';

export default function expensesReducer(state = null, { type, userExpenses }){
    switch (type) {
        case USER_EXPENSE:
            return userExpenses;
        default:
            return state;
    }
}