import api from "./api";
// import axios from "axios";
// import authHeader from "./auth-header";

// const API_URL = "/posts";s

const getUser = (id) => {
  return api.get("/users/" + id);
};

const deleteUser = (id) => {
  return api.delete("/users/" + id);
};

const getUsers = () => {
  return api.get("/users");
};

// const getAllPrivatePosts = () => {
//   return axios.get(API_URL + "/private", { headers: authHeader() });
// };

const userService = {
  getUser,
  getUsers,
  deleteUser,
};

export default userService;
