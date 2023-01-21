import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : "xxx"
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : "xxx"
  );

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    console.log("dta: ", data);
    console.log("res: ", response);

    console.log(response.status);

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.accessToken));
      console.log(authTokens);
      console.log(data);
      localStorage.setItem("authTokens", JSON.stringify(data));
      api.defaults.headers["Authorization"] = "Bearer " + data.accessToken;
      navigate("/home");
    } else {
      console.log(user);
      alert("Niepoprawny email lub hasło!");
    }
  };

  let logoutUser = () => {
    const response = api.post("/auth/logout", {
      Authorization:
        "Bearer " +
        JSON.parse(localStorage.getItem("authTokens")).accessToken.trim(),
    });
    setAuthTokens("xxx");
    setUser("xxx");
    localStorage.removeItem("authTokens");
    api.defaults.headers["Authorization"] = null;
    navigate("/login");
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
