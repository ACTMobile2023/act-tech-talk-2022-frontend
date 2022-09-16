import {combineReducers} from "redux";
import attenderReducer from "./attender";

export default combineReducers({
        addedAttender: attenderReducer
    }
);