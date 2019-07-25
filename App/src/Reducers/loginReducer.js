import { AsyncStorage } from "react-native";

AsyncStorage.clear();
export const LoginReducer = (
  state = {
    loggedIn: false,
    token: null,
    skipped: false,
    username: null,
    showLoginSpinner: false
  },
  action
) => {
  switch (action.type) {
    case "SKIPPED":
      return {
        ...state,
        skipped: true
      };
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        loggedIn: true
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        loggedIn: false
      };
    case "LOGIN_SPINNER":
      return {
        ...state,
        showLoginSpinner: action.payload.showLoginSpinner
      };
    default:
      return state;
  }
};
