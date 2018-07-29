import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mobileOpenReducer from './mobileOpenReducer.jsx';
import signUserReducer from './signUserReducer.jsx';
import userCategsReducer from './userCategsReducer.jsx';
import expensesReducer from './expensesReducer.jsx';
import categoriesListReducer from './catListReducer.jsx';
import descriptionBaseReducer from './descriptionBaseReducer.jsx';
import reportsReducer from './descriptionBaseReducer.jsx';

const data = combineReducers({
    userCategories: userCategsReducer,
    userExpenses: expensesReducer,
    categList: categoriesListReducer,
    descBase: descriptionBaseReducer,
    reportList: reportsReducer
})


const allReducers = combineReducers({
    mobile: mobileOpenReducer,
    user: signUserReducer,
    data : data,
    router: routerReducer,
})
export default allReducers;