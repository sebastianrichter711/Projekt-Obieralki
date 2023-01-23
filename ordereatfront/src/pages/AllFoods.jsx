import React, { useState, useEffect, useId } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

import { Container, Row, Col } from "reactstrap";

import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";

import "../styles/all-foods.css";
import "../styles/pagination.css";

import DishService from "../services/dish.service";
import RestaurantService from "../services/restaurant.service";

const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

  const [dishes, setDishes] = useState([]);
  const [restaurant, setRestaurant] = useState("");

  const { id, name } = useParams();

  console.log(id);

  useEffect(() => {
    DishService.getDishesFromRestaurant(id).then((res) => {
      const allDishes = res.data;
      setDishes(allDishes);
      console.log(res.data);
    });
  }, [setDishes]);

  useEffect(() => {
    RestaurantService.getRestaurant(id).then((res) => {
      const gotRest = res.data;
      setRestaurant(gotRest);
      console.log(res.data);
    });
  }, [setRestaurant]);

  const searchedProduct = dishes.filter((item) => {
    if (searchTerm.value === "") {
      return item;
    }
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });

  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let title = name;

  return (
    <Helmet title="All-Foods">
      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search__widget d-flex align-items-center justify-content-between ">
                <input
                  type="text"
                  placeholder="Szukaj dania"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
              <div className="sorting__widget text-end">
                <select className="w-50">
                  <option>Domyślnie</option>
                  <option value="ascending">Alfabetycznie, A-Z</option>
                  <option value="descending">Alfabetycznie, Z-A</option>
                  <option value="high-price">Od najwyższej ceny</option>
                  <option value="low-price">Od najniższej ceny</option>
                </select>
              </div>
            </Col>

            <p> Lokalizacja: {restaurant.address}</p>
            <p> Koszt dostawy: {restaurant.delivery_cost} zł</p>
            <p> Minimalna kwota zamówienia: {restaurant.min_order_cost} zł</p>
            <p>
              {" "}
              Bezpłatna dostawa od: {restaurant.min_order_cost_free_delivery} zł
            </p>
            <p> Czas oczekiwania: {restaurant.waiting_time_for_delivery}</p>

            {displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}

            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Wstecz"}
                nextLabel={"Dalej"}
                containerClassName=" paginationBttns "
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
