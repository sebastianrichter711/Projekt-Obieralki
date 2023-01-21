import React from "react";

import "../../../styles/product-card.css";

import { Link, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const ProductCard = (props) => {
  const { id, name, price, restaurant_id } = props.item;
  const dispatch = useDispatch();

  console.log(id);

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        name,
        price,
        restaurant_id,
      })
    );
  };

  return (
    <div className="product__item">
      <div className="product__content">
        <h5>
          <Link to={`/foods/${id}`}>{name}</Link>
        </h5>
        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">{price}zł</span>
          <button className="addTOCart__btn" onClick={addToCart}>
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
