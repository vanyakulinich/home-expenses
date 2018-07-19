import SIGN_USER from '../actionTypes/signUser'

export default function signUserReducer(state = null, { type, user }){
    switch (type) {
        case SIGN_USER:
            return user;
        default:
            return state;
    }
}