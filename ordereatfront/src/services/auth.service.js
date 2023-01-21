import api from "./api";
import TokenService from "./token.service";
import jwt from "jwt-decode";

// import axios from "axios";

// const API_URL = "/auth";

const forgotPassword = (email) => {
  return api.post("/auth/forgot-password", { email }).then((response) => {
    //localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  });
};

const resetPassword = (token, password, passwordAgain) => {
  return api
    .post("/auth/reset-password", { token, password, passwordAgain })
    .then((response) => {
      //localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    });
};

const signup = (
  active,
  authorizeDate,
  email,
  endAuthorizeDate,
  password,
  passwordAgain,
  role
) => {
  return api
    .post("/auth/register", {
      active,
      authorizeDate,
      email,
      endAuthorizeDate,
      password,
      passwordAgain,
      role,
    })
    .then((response) => {
      if (response.data.accessToken) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const login = (email, password) => {
  return api
    .post("/auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  // localStorage.removeItem("user");
  TokenService.removeUser();
};

const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) return null;
  const decodedUser = jwt(user.accessToken);
  return decodedUser;
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
};

export default authService;
