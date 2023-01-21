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

const resetPassword = (token, password, password_again) => {
  return api
    .post("/auth/reset-password", { token, password, password_again })
    .then((response) => {
      //localStorage.setItem("user", JSON.stringify(response.data));
      console.log(response.data);
      return response.data;
    });
};

const signup = (
  active,
  authorize_date,
  email,
  end_authorize_date,
  password,
  password_again,
  role
) => {
  return api
    .post("/auth/register", {
      active,
      authorize_date,
      email,
      end_authorize_date,
      password,
      password_again,
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
