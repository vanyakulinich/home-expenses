import { push } from 'react-router-redux';

export default function redirection() {
    return dispatch=> dispatch(push('/'))
}