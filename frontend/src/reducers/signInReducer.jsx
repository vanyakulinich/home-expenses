import SIGN_IN from '../actionTypes/signIn'

export default function signInreducer(state = null, { type, token }){
    switch (type) {
        case SIGN_IN:
            return token;
        default:
            return state;
    }
}