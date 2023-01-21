import api from "./api";
// import axios from "axios";
// import authHeader from "./auth-header";

// const API_URL = "/posts";s

const getDishesFromRestaurant = (id) => {
  return api.get("/dishes/restaurants/" + id);
};

const getDish = (id) => {
  return api.get("/dishes/" + id);
};

const deleteDish = (id) => {
  return api.delete("/dishes/" + id);
};

const getDishes = (i) => {
  return api.get("/dishes/");
};

// const getAllPrivatePosts = () => {
//   return axios.get(API_URL + "/private", { headers: authHeader() });
// };

const DishService = {
  getDishesFromRestaurant,
  getDish,
  getDishes,
  deleteDish,
};

export default DishService;
