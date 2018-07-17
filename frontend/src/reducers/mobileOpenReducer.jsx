import MOBILE_OPEN from '../actionTypes/mobileOpenType.jsx'

export default function mobileOpenReducer(state = false, { type, mobile }) {
    switch (type) {
        case MOBILE_OPEN:
            return mobile;
        default:
            return state;
    }
}