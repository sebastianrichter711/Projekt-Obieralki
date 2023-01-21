import axios from "axios";
import TokenService from "./token.service";
import AuthService from "./auth.service";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // Authorization:
    //   "Bearer " + JSON.parse(localStorage.getItem("authTokens")).accessToken,
  },
});

// Before making request, do the following
instance.interceptors.request.use(
  (config) => {
    // console.log("getLocalAccessToken", TokenService.getLocalAccessToken());
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// With response data, do the following
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // access token expired
      if (err.response.status === 403 && !originalConfig._retry) {
        // handle infinite loop
        originalConfig._retry = true;

        // console.log("refresh", TokenService.getLocalRefreshToken());
        try {
          const rs = await instance.post("/auth/token", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          console.log("response", rs);

          const { accessToken } = rs.data;

          console.log("updateNewAccessToken", accessToken);
          TokenService.updateNewAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }

      // refresh token expired
    }

    return Promise.reject(err);
  }
);

export default instance;
