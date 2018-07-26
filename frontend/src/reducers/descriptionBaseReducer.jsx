import DESC_BASE from '../actionTypes/descriptionBaseType.jsx';

export default function descriptionBaseReducer(state = null, { type, descBase }){
    switch (type) {
        case DESC_BASE:
            return descBase;
        default:
            return state;
    }
}