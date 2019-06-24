import { AsyncStorage } from "react-native";

AsyncStorage.clear();
export const LoginReducer = (
  state = {
    loggedIn: false,
    token: null,
    skipped: false
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
        loggedIn: true
      };
    default:
      return state;
  }
};
