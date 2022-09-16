import {ActionTypes} from "./actionTypes";

export const newAttender = attender => {
    return {
        type: ActionTypes.ADD_ATTENDER,
        attender: attender,
    };
};