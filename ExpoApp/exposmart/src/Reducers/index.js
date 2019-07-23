import { LoginReducer } from "./loginReducer";
import { combineReducers } from "redux";
import { widgetReducer } from "./myWidgetsReducer";

export default combineReducers({
  login: LoginReducer,
  widget: widgetReducer
});
