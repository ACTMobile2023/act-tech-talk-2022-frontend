import {ActionTypes} from "../actions/actionTypes";

const initialState = {
    data: {}
}

export default function attenderReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.ADD_ATTENDER:
            return {
                ...state,
                data: {...action.attender}
            }
        default:
            return state
    }
}
