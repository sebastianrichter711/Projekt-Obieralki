import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
//MaterialUI
import { CssBaseline } from "@mui/material";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import AuthContext from "../../../services/AuthContext";
import RestaurantService from "../../../services/restaurant.service";

export default function Restaurant() {
  let { user, logoutUser } = useContext(AuthContext);
  const { id } = useParams();
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    RestaurantService.getRestaurant(id).then((res) => {
      const gotRestaurant = res.data;
      setData({ data: gotRestaurant });
      console.log(res.data);
    });
  }, [setData]);

  return (
    <Container component="main" xs={3} md={3}>
      <br />
      <br />
      <br />
      <CssBaseline />
      <div>
        <Container xs={3}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
            style={{ fontWeight: 600 }}
          >
            {data.data.name}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Id: {data.data.id}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Adres: {data.data.address}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Koszt dostawy: {data.data.delivery_cost} zł
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Opis: {data.data.description}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Czy jest dostawa:{" "}
            {String(data.data.is_delivery) === "true" ? "tak" : "nie"}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Typ kuchni: {data.data.kitchen_type}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Minimalny koszt zamówienia: {data.data.min_order_cost} zł
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Bezpłatna dostawa przy kwocie:{" "}
            {data.data.min_order_cost_free_delivery} zł
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Nazwa: {data.data.name}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Nr telefonu: {data.data.phone}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Czas oczekiwania na dostawę: {data.data.waiting_time_for_delivery}
          </Typography>
        </Container>
      </div>
    </Container>
  );
}
