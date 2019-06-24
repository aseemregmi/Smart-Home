import axios from "axios";

export const Login = (username, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        "http://192.168.100.10:3000/api/users/login",
        {
          username,
          password
        }
      );
      dispatch({ type: "LOGIN", payload: { token: response.headers.token } });
    } catch (err) {}
  };
};

export const Logout = () => {
  return {
    type: "LOGOUT"
  };
};

export const Skipped = () => {
  return async dispatch => {
    dispatch({
      type: "SKIPPED"
    });
  };
};
