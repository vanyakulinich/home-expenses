import CATEG_LIST from '../actionTypes/categListType.jsx';


export default function categoriesListReducer(state = null, { type, categList }){
    switch (type) {
        case CATEG_LIST:
            return categList;
        default:
            return state;
    }
}