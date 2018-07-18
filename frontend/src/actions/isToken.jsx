import TOKEN_ACTION from '../actionTypes/tokenActionType.jsx'

export default function isToken(token) {
    return (dispatch) => {
        dispatch({
            type: TOKEN_ACTION,
            token
        })
    }
}