import VERIFY_STATUS from '../actionTypes/verifyStatusType.jsx';

export default function verificationStatusReducer(state = null, { type, status }){
    switch (type) {
        case VERIFY_STATUS:
            return status;
        default:
            return state;
    }
}