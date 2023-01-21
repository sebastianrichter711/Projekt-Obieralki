import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//MaterialUI

import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import RestaurantService from "../../../services/restaurant.service";
import DishService from "../../../services/dish.service";

export default function DeleteDish() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    DishService.deleteDish(id)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(function () {
        window.location.reload();
        navigate("/admin");
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <br />
      <br />
      <br />
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleSubmit}
        >
          Naciśnij, jeśli chcesz usunąć danie
        </Button>
      </Box>
    </Container>
  );
}
