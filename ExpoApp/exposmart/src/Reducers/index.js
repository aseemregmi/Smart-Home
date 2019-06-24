import { LoginReducer } from "./loginReducer";
import { combineReducers } from "redux";

export default combineReducers({
  login: LoginReducer
});
