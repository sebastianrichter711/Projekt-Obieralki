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
import successImg from "../assets/images/success.png";
import { Link } from "react-router-dom";
import "../styles/order-success-page.css";

const OrderSuccessPage = () => {
  return (
    <Helmet title="">
      <section>
        <Container>
          <div className="success_img">
            <img src={successImg} alt={successImg}></img>
          </div>
          <div className="text_btn">
            <h1>Złożono pomyślnie zamówienie!</h1>
            <br />
            <button className="addTOCart__btn me-4">
              <Link to="/home">Wróć do strony głównej</Link>
            </button>
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default OrderSuccessPage;
