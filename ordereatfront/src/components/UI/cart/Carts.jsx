import React from "react";

import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../../store/shopping-cart/cartUiSlice";

import "../../../styles/shopping-cart.css";

const Carts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  var totalAmount = useSelector((state) => state.cart.totalAmount);

  totalAmount = Math.round(totalAmount * 100) / 100;

  console.log(cartProducts);

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  return (
    <div className="cart__container">
      <ListGroup className="cart">
        <div className="cart__close">
          <span onClick={toggleCart}>
            <i class="ri-close-fill"></i>
          </span>
        </div>

        <div className="cart__item-list">
          {cartProducts.length === 0 ? (
            <h6 className="text-center mt-5">Brak dań w koszyku</h6>
          ) : (
            cartProducts.map((item, index) => (
              <CartItem item={item} key={index} />
            ))
          )}
        </div>

        <div className="cart__bottom d-flex align-items-center justify-content-between">
          <h6>
            Razem : <span>{totalAmount}zł</span>
          </h6>
          {totalAmount > 0.0 ? (
            <button>
              <Link to="/checkout" onClick={toggleCart}>
                Przejdź do zapłaty
              </Link>
            </button>
          ) : (
            <></>
          )}
        </div>
      </ListGroup>
    </div>
  );
};

export default Carts;
