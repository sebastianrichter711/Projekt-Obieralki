import React from "react";

import "../../../styles/restaurant-card.css";

import { Link } from "@mui/material";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const RestaurantCard = (props) => {
  const { id, name, address, waiting_time_for_delivery, delivery_cost } =
    props.item;
  const dispatch = useDispatch();
  console.log(id);
  var link = "/dishes/restaurants/" + id + "/" + name;

  // const addToCart = () => {
  //   dispatch(
  //     cartActions.addItem({
  //       id,
  //       title,
  //       image01,
  //       price,
  //     })
  //   );
  // };

  return (
    <div className="product__item">
      <div className="product__content">
        <h4>
          <Link href={link}>{name}</Link>
        </h4>
        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__address">{address}</span>
        </div>
        <br />
        <div>
          <p className="product__time">
            Czas oczekiwania: {waiting_time_for_delivery}
          </p>
        </div>
        <div>
          <p className="product__delivery">Koszt dostawy: {delivery_cost} zł</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
