import MOBILE_OPEN from '../actionTypes/mobileOpenType.jsx'

export default function mobileOpen(status) {
    return (dispatch) => {
        dispatch({
            type: MOBILE_OPEN,
            mobile: status
        })
    }
}