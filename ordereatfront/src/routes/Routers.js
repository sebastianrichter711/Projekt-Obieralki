import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserPage from "../pages/UserPage";
import EditUser from "../pages/admin/user/EditUser";
import DeleteUser from "../pages/admin/user/DeleteUser";
import ForgotPasswordPage from "../pages/ForgotPassPage";
import ResetPasswordPage from "../pages/ResetPassPage";
import OrderFailedPage from "../pages/OrderFailedPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import AdminPage from "../pages/AdminPage";
import Restaurant from "../pages/moderator/restaurants/Restaurant";
import DeleteRestaurant from "../pages/moderator/restaurants/DeleteRestaurant";
import AddRestaurant from "../pages/moderator/restaurants/AddRestaurant";
import SearchedRestaurants from "../pages/SearchedRestaurants";
import NotFoundPage from "../pages/NotFoundPage";
import EditRestaurant from "../pages/moderator/restaurants/EditRestaurant";
import Dish from "../pages/moderator/dishes/Dish";
import DeleteDish from "../pages/moderator/dishes/DeleteDish";
import AddDish from "../pages/moderator/dishes/AddDish";
import EditDish from "../pages/moderator/dishes/EditDish";
import AddUser from "../pages/moderator/users/AddUser";
import User from "../pages/moderator/users/User";
import AdminEditUser from "../pages/moderator/users/AdminEditUser";
import Order from "../pages/moderator/orders/Order";
import DeleteOrder from "../pages/moderator/orders/DeleteOrder";
import EditOrder from "../pages/moderator/orders/EditOrder";
import UserOrders from "../pages/UserOrders";
import AdminDeleteUser from "../pages/moderator/users/AdminDeleteUser";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dishes/restaurants/:id/:name" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/user/edit/:id" element={<EditUser />} />
      <Route path="/users/delete/:id" element={<DeleteUser />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/order-completed" element={<OrderSuccessPage />} />
      <Route path="/order-uncompleted" element={<OrderFailedPage />} />
      <Route path="/searched-restaurants" element={<SearchedRestaurants />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/restaurants/:id" element={<Restaurant />} />
      <Route path="/restaurants/delete/:id" element={<DeleteRestaurant />} />
      <Route path="/restaurants/add" element={<AddRestaurant />} />
      <Route path="/restaurants/edit/:id" element={<EditRestaurant />} />
      <Route path="/dishes/:id" element={<Dish />} />
      <Route path="/dishes/delete/:id" element={<DeleteDish />} />
      <Route path="/dishes/add" element={<AddDish />} />
      <Route path="/dishes/edit/:id" element={<EditDish />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/users/add" element={<AddUser />} />
      <Route path="/users/admin/edit/:id" element={<AdminEditUser />} />
      <Route path="/users/admin/delete/:id" element={<AdminDeleteUser />} />
      <Route path="/orders/:id" element={<Order />} />
      <Route path="/orders/delete/:id" element={<DeleteOrder />} />
      <Route path="/orders/edit/:id" element={<EditOrder />} />
      <Route path="/user-orders" element={<UserOrders />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Routers;
