import React, { useState, useEffect } from "react";
import { Grid, IconButton } from "@mui/material";
import BasicCard from "../components/BasicCard/BasicCard";
import SearchBar from "../components/SearchBar/SearchBar";
import { Refresh, Restaurant } from "@mui/icons-material";
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
import Maps from "../components/maps/Maps";
import SearchBox from "../components/maps/SearchBox";

const SearchSubpage = () => {
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        left: "20%",
      }}
    >
      <div style={{ width: "45vw", height: "100%" }}>
        <Maps selectPosition={selectPosition} />
      </div>
      <div style={{ width: "40vw" }}>
        <SearchBox
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
        />
      </div>
    </div>
  );
};

export default SearchSubpage;
