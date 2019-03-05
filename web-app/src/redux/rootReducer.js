import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import AuthReducer from "./reducers/AuthReducer";

const rootReducer = combineReducers({
  auth: AuthReducer
});

export default rootReducer;
