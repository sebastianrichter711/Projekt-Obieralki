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
import OrderService from "../../../services/order.service";
import { Paper } from "@mui/material";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import api from "../../../services/api";

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

export default function Order() {
  let { user, logoutUser, authTokens } = useContext(AuthContext);
  const { id } = useParams();
  const [data, setData] = useState({ data: [] });
  var token = useEffect(() => {
    api.get("/orders/" + id).then((res) => {
      const gotOrder = res.data;
      setData({ data: gotOrder });
      console.log(res.data);
    });
  }, [setData]);

  console.log(id);
  console.log(JSON.parse(localStorage.getItem("authTokens")).accessToken);
  var paymentForm = "";
  switch (data.data.paymentForm) {
    case "card":
      paymentForm = "karta płatnicza";
      break;
    case "blik":
      paymentForm = "blik";
      break;
    case "voucher":
      paymentForm = "voucher";
      break;
    default:
      paymentForm = "";
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
            Zamówienie nr {data.data.id}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Adres dostawy: {data.data.delivery_address}
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
            Koszt dań: {data.data.dishes_cost} zł
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Czy zamknięte: {data.data.is_completed == true ? "tak" : "nie"}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Data złożenia zamówienia: {data.data.order_date}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Forma płatności: {data.data.payment_form}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Łączny koszt zamówienia: {data.data.total_cost} zł
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Zamawiający: {data.data.user_id}
          </Typography>
          {/* <Paper>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id dania</TableCell>
                    <TableCell>Ilość</TableCell>
                    <TableCell>Cena</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.data.dishes.map((dish) => {
                    return (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {dish.dishId}
                        </TableCell>
                        <TableCell align="left">{dish.count}</TableCell>
                        <TableCell align="left">{dish.price}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper> */}
        </Container>
      </div>
    </Container>
  );
}
