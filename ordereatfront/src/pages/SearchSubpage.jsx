import React, { useState, useEffect } from "react";
import { Grid, IconButton } from "@mui/material";
import BasicCard from "../components/BasicCard/BasicCard";
import SearchBar from "../components/SearchBar/SearchBar";
import { Refresh } from "@mui/icons-material";
import { Box } from "@mui/material";
import { cardHeaderStyles } from "../styles/SearchBarStyles";
import CommonButton from "../components/CommonButton/CommonButton";
import { Typography } from "@mui/material";
import GridWrapper from "../components/GridWrapper/GridWrapper";
import RestaurantService from "../services/restaurant.service";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import RestaurantCard from "../components/UI/restaurant-card/RestaurantCard";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchSubpage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchResults, setSearchResults] = useState(restaurants);
  const navigate = useNavigate();
  const GetHeader = () => {
    const handleChange = (value) => {
      filterData(value);
    };

    const filterData = async (value) => {
      console.log(value);
      var results = await RestaurantService.getRestaurantsByNameOrLocation(
        value
      );
      console.log(results.data);
      if (results === []) setRestaurants(searchResults);
      else {
        setRestaurants(results.data);
      }
    };

    const handleSubmit = () => {
      navigate("/searched-restaurants", { state: { results: restaurants } });
    };

    return (
      <Box sx={cardHeaderStyles.wrapper}>
        <SearchBar
          placeholder="Wpisz lokalizację"
          onChange={(event) => handleChange(event.target.value)}
          searchBarWidth="920px"
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleSubmit}
        >
          Szukaj
        </Button>
      </Box>
    );
  };

  // const getContent = () => (
  //   <>
  //     {restaurants.length ? (
  //       restaurants.map((restaurant) => (
  //         <Col key={restaurant.id} className="mb-4">
  //           <RestaurantCard item={restaurant} />
  //         </Col>
  //       ))
  //     ) : (
  //       <Typography
  //         align="center"
  //         sx={{
  //           margin: "10px 10px",
  //           color: "rgba(0, 0, 0, 0.6)",
  //           fontSize: "1.3rem",
  //         }}
  //       >
  //         Nie znaleziono restauracji w pobliżu podanej lokalizacji!
  //       </Typography>
  //     )}
  //   </>
  // );

  return (
    <div>
      <BasicCard header={GetHeader()} />
    </div>
  );
};

export default SearchSubpage;
