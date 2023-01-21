import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AuthContext from "../services/AuthContext";
import { useDispatch } from "react-redux";

import "../styles/checkout.css";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import RestaurantService from "../services/restaurant.service";
import Select from "react-select";
import { cartActions } from "../store/shopping-cart/cartSlice";

const Checkout = () => {
  const [enterDeliveryAddress, setEnterDeliveryAddress] = useState("");
  const [enterPaymentForm, setEnterPaymentForm] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [paymentForm, setPaymentForm] = useState("");

  let { user } = useContext(AuthContext);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const shippingInfo = [];
  var dishesCost = useSelector((state) => state.cart.totalAmount);
  const dishes = useSelector((state) => state.cart.cartItems);
  var restId;
  if (dishes.length === 0) restId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeee";
  else restId = dishes[0].restaurant_id;
  console.log(dishes);
  let restaurant_id = restId;
  dishesCost = Math.round(dishesCost * 100) / 100;

  var deliveryCost = 0.0;

  const paymentOptions = [
    { value: "card", label: "Karta płatnicza" },
    { value: "blik", label: "BLIK" },
    { value: "voucher", label: "Voucher" },
  ];

  const clearBasket = () => {
    dispatch(cartActions.clearBasket());
  };

  useEffect(() => {
    RestaurantService.getRestaurant(restaurant_id).then((res) => {
      const gotRestaurant = res.data;
      setRestaurant(gotRestaurant);
      console.log(res.data);
    });
  }, [setRestaurant]);

  if (restaurant.is_delivery) {
    if (
      dishesCost >= restaurant.min_order_cost_free_delivery &&
      restaurant.min_order_cost_free_delivery !== null
    )
      deliveryCost = 0.0;
    else deliveryCost = restaurant.delivery_cost;
  }

  const totalCost = Math.round((dishesCost + deliveryCost) * 100) / 100;

  const initialFormData = Object.freeze({
    deliveryAddress: "",
    deliveryCost: "",
    dishes: [],
    dishesCost: "",
    paymentForm: "",
    restaurant_id: "",
    totalCost: "",
    userId: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    let newFormData = new FormData();
    newFormData.append("deliveryAddress", enterDeliveryAddress);
    newFormData.append("deliveryCost", deliveryCost);
    newFormData.append("dishes", JSON.stringify(dishes));
    newFormData.append("dishesCost", dishesCost);
    newFormData.append("paymentForm", paymentForm);
    newFormData.append("restaurantId", restaurant_id);
    newFormData.append("totalCost", totalCost);
    newFormData.append("userId", user.id);

    console.log(newFormData);

    var resp = api
      .post("orders/complete", newFormData, {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("authTokens")).accessToken,
        },
      })
      .then(() => {
        navigate("/order-completed");
        clearBasket();
        window.location.reload();
      })
      .catch(() => {
        navigate("/order-uncompleted");
      });
    console.log(resp);
  };

  if (user === "xxx")
    return (
      <h1 style={{ textAlign: "center" }}>
        {" "}
        Zaloguj się, aby zamówić jedzenie do Twojego domu!
      </h1>
    );
  else if (dishes.length === 0)
    return (
      <h1>W koszyku pusto! Dodaj coś do niego, by cieszyć się smakiem!</h1>
    );

  return (
    <Helmet title="Złóż zamówienie">
      <CommonSection title="Złóż zamówienie" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Dane do zamówienia</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Wpisz adres dostawy"
                    required
                    onChange={(e) => setEnterDeliveryAddress(e.target.value)}
                  />
                  &ensp;
                  <Select
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    placeholder="Wybierz formę płatności"
                    options={paymentOptions}
                    onChange={(choice) => setPaymentForm(choice.value)}
                  />
                </div>

                {/* <div className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    onChange={(e) => setEnterEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Phone number"
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Country"
                    required
                    onChange={(e) => setEnterCountry(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Postal code"
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div> */}
                <button type="submit" className="addTOCart__btn">
                  Złóż zamówienie
                </button>
              </form>
            </Col>

            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Dania: <span>{dishesCost}zł</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Dostawa: <span>{deliveryCost}zł</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Razem: <span>{totalCost}zł</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
