import api from "./api";
// import axios from "axios";
// import authHeader from "./auth-header";

// const API_URL = "/posts";

const getRestaurantsByNameOrLocation = (value) => {
  return api.get("/restaurants/" + value);
};

const getRestaurant = (id) => {
  return api.get("/restaurants/one/" + id);
};

const getRestaurants = (i) => {
  return api.get("/restaurants/");
};

const deleteRestaurant = (id) => {
  return api.delete("/restaurants/" + id);
};

const getModeratorsRestaurants = (id) => {
  return api.get("/restaurants/users/" + id);
};

// const getAllPrivatePosts = () => {
//   return axios.get(API_URL + "/private", { headers: authHeader() });
// };

const RestaurantService = {
  getRestaurantsByNameOrLocation,
  getRestaurant,
  getModeratorsRestaurants,
  deleteRestaurant,
  getRestaurants,
};

export default RestaurantService;
