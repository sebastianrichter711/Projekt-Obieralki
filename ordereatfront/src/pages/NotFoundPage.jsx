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
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Helmet title="">
      <section>
        <Container>
          <div>
            <h1>Nie znaleziono takiej strony!</h1>
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default NotFoundPage;
