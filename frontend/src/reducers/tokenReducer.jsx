import TOKEN_ACTION from '../actionTypes/tokenActionType.jsx'

export default function testAction(state = null, { type, token }) {
    switch (type) {
        case TOKEN_ACTION:
            return token;
        default:
            return state;
    }
}