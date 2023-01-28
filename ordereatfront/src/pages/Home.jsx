import React, { useState, useEffect } from "react";

import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import "../styles/hero-section.css";
import heroImg from "../assets/images/delivery.png";

import { Link } from "react-router-dom";

import "../styles/home.css";

import products from "../assets/fake-data/products.js";
import Category from "../components/UI/category/Category.jsx";

import ProductCard from "../components/UI/product-card/ProductCard.jsx";
import SearchSubpage from "./SearchSubpage.jsx";

const featureData = [
  {
    title: "Szybka dostawa",
    desc: "Na swoje zamówienia z restauracji, które znajdziesz w naszej aplikacji, poczekasz max. 30 minut! Ponadto, niektóre lokale oferują bezpłatną dostawę\
    po przekroczeniu kwoty zamówienia określonej przez restaurację.",
  },
  {
    title: "Najlepsze restauracje",
    desc: "Kuchnia włoska, hiszpańska, polska, a może azjatycka? Każdy może tu znaleźć coś dla siebie, a cały świat może być na Twoim talerzu.",
  },
  {
    title: "Zniżki i rabaty",
    desc: "Na naszym portalu możesz bez problemu wykorzystać vouchery i kody zniżkowe do restauracji zarejestrowanych u nas!",
  },
];

const Home = () => {
  const [category, setCategory] = useState("ALL");
  const [allProducts, setAllProducts] = useState(products);

  const [hotPizza, setHotPizza] = useState([]);

  useEffect(() => {
    const filteredPizza = products.filter((item) => item.category === "Pizza");
    const slicePizza = filteredPizza.slice(0, 4);
    setHotPizza(slicePizza);
  }, []);

  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content  ">
                <h5 className="mb-3">Jeszcze nigdy nie było to takie proste</h5>
                <h1 className="mb-4 hero__title">
                  <span>GŁODNY?</span> Zamów jedzenie <br /> z dostawą
                  <span> do Twojego domu</span>
                </h1>

                <p>
                  Wyszukaj ulubioną restaurację w Twojej okolicy, wybierz dania,
                  które chcesz zamówić i ciesz się smakiem!
                </p>

                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-car-line"></i>
                    </span>{" "}
                    Szybka i bezpłatna dostawa
                  </p>

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-shield-check-line"></i>
                    </span>{" "}
                    100% bezpieczna płatność
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <SearchSubpage />
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">
                Wiele smaków w jednym miejscu
              </h5>
              <h2 className="feature__title">Wybierz swoje menu</h2>
              <h2 className="feature__title">
                nie ruszając się <span>z domu</span>
              </h2>
              <p className="mb-1 mt-4 feature__text">
                Zobacz poniżej, co oferujemy dla Ciebie.
              </p>
            </Col>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3">
                  <h5 className=" fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
