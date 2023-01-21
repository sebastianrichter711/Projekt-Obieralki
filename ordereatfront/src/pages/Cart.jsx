import React from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  let restaurantId = cartItems[0].restaurantId;
  console.log(cartItems);
  return (
    <Helmet title="Koszyk">
      <CommonSection title="Twój koszyk" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {cartItems.length === 0 ? (
                <h5 className="text-center">Twój koszyk jest pusty</h5>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Lp.</th>
                      <th>Nazwa produktu</th>
                      <th>Cena</th>
                      <th>Ilość</th>
                      <th>Usuń</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <Tr item={item} key={item.id} />
                    ))}
                  </tbody>
                </table>
              )}

              <div className="mt-4">
                <h6>
                  Cena za zamawiane dania: &ensp;
                  <span className="cart__subtotal">{totalAmount}zł</span>
                </h6>
                <p>
                  Koszty dostawy będą wliczone w zależności od kwoty zamówienia
                  składanego w danej restauracji.
                </p>
                <div className="cart__page-btn">
                  <button className="addTOCart__btn me-4">
                    <Link to={`/dishes/restaurants/${restaurantId}`}>
                      Kontynuuj zakupy
                    </Link>
                  </button>
                  <button className="addTOCart__btn">
                    <Link to="/checkout">Złóż zamówienie</Link>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = (props) => {
  const { id, image01, name, price, quantity } = props.item;
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={image01} alt="" />
      </td>
      <td className="text-center">{name}</td>
      <td className="text-center">{price} zł</td>
      <td className="text-center">{quantity} szt.</td>
      <td className="text-center cart__item-del">
        <i class="ri-delete-bin-line" onClick={deleteItem}></i>
      </td>
    </tr>
  );
};

export default Cart;
