import React, { useState, useEffect } from "react";

import products from "../assets/fake-data/products";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

import "../styles/product-details.css";

import ProductCard from "../components/UI/product-card/ProductCard";

import DishService from "../services/dish.service";

const FoodDetails = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [dish, setDish] = useState([]);

  useEffect(() => {
    DishService.getDish(id).then((res) => {
      const gotDish = res.data;
      setDish(gotDish);
      console.log(gotDish);
    });
  }, [setDish]);

  //const product = products.find((product) => product.id === id);
  const [previewImg, setPreviewImg] = useState(dish.image01);
  const { name, price, category, description, image01 } = dish;
  var dishCategory;

  //const relatedProduct = products.filter((item) => category === item.category);

  switch (dish.dishType) {
    case 1:
      dishCategory = "przystawka";
      break;
    case 2:
      dishCategory = "zupa";
      break;
    case 3:
      dishCategory = "danie główne";
      break;
    case 4:
      dishCategory = "deser";
      break;
    case 5:
      dishCategory = "pizza";
      break;
    case 6:
      dishCategory = "kebab";
      break;
    case 7:
      dishCategory = "dodatki";
      break;
    case 8:
      dishCategory = "napoje";
      break;
    default:
      dishCategory = "";
      break;
  }

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        name,
        price,
        image01,
      })
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(enteredName, enteredEmail, reviewMsg);
  };

  useEffect(() => {
    setPreviewImg(dish.image01);
  }, [dish]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dish]);

  return (
    <Helmet title="Product-details">
      <CommonSection title={dish.name} />

      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images ">
                {/* <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(dish.image01)}
                >
                  <img src={dish.image01} alt="" className="w-50" />
                </div>
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(dish.image02)}
                >
                  <img src={dish.image02} alt="" className="w-50" />
                </div>

                <div
                  className="img__item"
                  onClick={() => setPreviewImg(dish.image03)}
                >
                  <img src={dish.image03} alt="" className="w-50" />
                </div> */}
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={dish} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{dish.name}</h2>
                <p className="product__price">
                  {" "}
                  Cena: <span>{dish.price}zł</span>
                </p>
                <p className="category mb-5">
                  Kategoria: <span>{dish.dish_type}</span>
                </p>

                <button onClick={addItem} className="addTOCart__btn">
                  Dodaj do koszyka
                </button>
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h5>Opis</h5>
              </div>

              <div className="tab__content">
                <p>{dish.description}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
