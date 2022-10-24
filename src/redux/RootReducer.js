import { combineReducers } from "redux";
import { todoReducers } from "./todo/TodoReducer";
import { errorReducer } from "./todo/TodoReducer";

const rootReducer = combineReducers({
     todoReducers,
     errorReducer
});

export default rootReducer;