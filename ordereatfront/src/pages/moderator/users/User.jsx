import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
//MaterialUI
import { CssBaseline } from "@mui/material";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import AuthContext from "../../../services/AuthContext";
import RestaurantService from "../../../services/restaurant.service";
import DishService from "../../../services/dish.service";
import userService from "../../../services/user.service";

export default function User() {
  let { user, logoutUser } = useContext(AuthContext);
  const { id } = useParams();
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    userService.getUser(id).then((res) => {
      const gotUser = res.data;
      setData({ data: gotUser });
      console.log(res.data);
    });
  }, [setData]);

  var role = "";
  switch (data.data.role) {
    case "admin":
      role = "Admin";
      break;
    case "moderator":
      role = "Moderator";
      break;
    case "user":
      role = "User";
      break;
    default:
      role = "";
      break;
  }

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
            {data.data.email}
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
            Aktywny: {String(data.data.active) === "true" ? "tak" : "nie"}
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
            Data nadania uprawnień: {data.data.authorize_date}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Data urodzenia: {data.data.birth_date}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Data utworzenia: {data.data.date_created}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Data ostatniego logowania: {data.data.date_of_last_login}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Data wygaśnięcia uprawnień: {data.data.end_authorize_date}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Imię: {data.data.name}
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
            Rola: {role}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Nazwisko: {data.data.surname}
          </Typography>
        </Container>
      </div>
    </Container>
  );
}
