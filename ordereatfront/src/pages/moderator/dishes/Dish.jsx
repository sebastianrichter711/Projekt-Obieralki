import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
//MaterialUI
import { withStyles } from "@mui/styles";
import { CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import AuthContext from "../../../services/AuthContext";
import RestaurantService from "../../../services/restaurant.service";
import DishService from "../../../services/dish.service";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mainPhoto: {
    width: "1100px",
    height: "770px",
    top: "40px",
    alignContent: "left",
  },
  bold: {
    fontWeight: 600,
  },
}));

const BlackTextTypography = withStyles({
  root: {
    color: "#000000",
  },
})(Typography);

export default function Dish() {
  let { user, logoutUser } = useContext(AuthContext);
  const { id } = useParams();
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    DishService.getDish(id).then((res) => {
      const gotDish = res.data;
      setData({ data: gotDish });
      console.log(res.data);
    });
  }, [setData]);

  var dishCategory = "";
  switch (data.data.dishType) {
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

  const classes = useStyles();
  return (
    <Container component="main" xs={3} md={3}>
      <br />
      <br />
      <br />
      <CssBaseline />
      <div className={classes.paper}></div>
      <div className={classes.heroContent}>
        <Container xs={3}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
            className={classes.bold}
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
            Opis: {data.data.description}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Subkategoria dania: {data.data.dishSubtype}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Kategoria: {dishCategory}
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
            Średnica pizzy: {data.data.pizzaDiameter}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Cena: {data.data.price}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Restauracja(ID): {data.data.restaurantId}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Sosy: {data.data.sauces}
          </Typography>
        </Container>
      </div>
    </Container>
  );
}
