import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mobileOpenReducer from './mobileOpenReducer.jsx';
import signUserReducer from './signUserReducer.jsx';
import userDataReducer from './userDataReducer.jsx';
import expensesReducer from './expensesReducer.jsx';
import categoriesListReducer from './catListReducer.jsx';

const data = combineReducers({
    userCategories: userDataReducer,
    userExpenses: expensesReducer,
    categList: categoriesListReducer,
})


const allReducers = combineReducers({
    mobile: mobileOpenReducer,
    user: signUserReducer,
    data,
    router: routerReducer,
})
export default allReducers;