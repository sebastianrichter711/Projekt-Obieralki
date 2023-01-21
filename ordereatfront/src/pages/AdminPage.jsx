import React, { useContext, useEffect } from "react";
import AuthContext from "../services/AuthContext";
import Dishes from "./moderator/dishes/Dishes";
import Orders from "./moderator/orders/Orders";
import Restaurants from "./moderator/restaurants/Restaurants";
import Users from "./moderator/users/Users";

const AdminPage = () => {
  let { user } = useContext(AuthContext);

  if (user.role !== "admin")
    return (
      <h1 style={{ textAlign: "center" }}>
        Strona przeznaczona dla administratorów!
      </h1>
    );
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Panel administracyjny</h1>
      <br />
      <Users />
      <br />
      <Restaurants />
      <br />
      <Dishes />
      <br />
      <Orders />
      <br />
    </div>
  );
};

export default AdminPage;
