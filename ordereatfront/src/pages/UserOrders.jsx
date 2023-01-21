import React, { useContext, useEffect } from "react";
import AuthContext from "../services/AuthContext";
import Dishes from "./moderator/dishes/Dishes";
import CompletedOrders from "./moderator/orders/CompletedOrders";
import Orders from "./moderator/orders/Orders";
import UncompletedOrders from "./moderator/orders/UncompletedOrders";
import Restaurants from "./moderator/restaurants/Restaurants";
import Users from "./moderator/users/Users";

const UserOrders = () => {
  let { user } = useContext(AuthContext);

  if (user === null)
    return (
      <h1 style={{ textAlign: "center" }}>
        Strona przeznaczona dla zalogowanych użytkowników!
      </h1>
    );
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Moje zamówienia</h1>
      <br />
      <h2 style={{ textAlign: "center" }}>Niedokończone</h2>
      <UncompletedOrders />
      <br />
      <h2 style={{ textAlign: "center" }}>Zrealizowane</h2>
      <CompletedOrders />
      <br />
    </div>
  );
};

export default UserOrders;
