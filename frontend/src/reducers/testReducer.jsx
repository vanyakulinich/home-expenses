import TEST_ACTION from '../actionTypes/testActionType.jsx'

export default function testAction(state = [], { type, test }) {
    switch (type) {
        case TEST_ACTION:
            return test;
        default:
            return state;
    }
}