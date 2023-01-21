import api from "./api";
import React, { useState, useContext, useEffect } from "react";

// import axios from "axios";
// import authHeader from "./auth-header";
import AuthContext from "./AuthContext";

// const API_URL = "/posts";

const getOrder = (id) => {
  return api.get("/orders/" + id);
};

const deleteOrder = (id) => {
  return api.delete("/orders/" + id);
};

const getOrders = () => {
  return api.get("/orders/");
};

const getOrdersCompleted = (id) => {
  return api.get("/orders/completed");
};

const getOrdersUncompleted = (id) => {
  return api.get("/orders/uncompleted");
};

const OrderService = {
  getOrder,
  deleteOrder,
  getOrders,
  getOrdersCompleted,
  getOrdersUncompleted,
};

export default OrderService;
