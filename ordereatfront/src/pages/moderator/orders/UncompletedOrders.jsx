import React, { useEffect, useState, useContext } from "react";
import { Container } from "@mui/material";
import { Link } from "@mui/material";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import RestaurantService from "../../../services/restaurant.service";
import AuthContext from "../../../services/AuthContext";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import OrderService from "../../../services/order.service";
import api from "../../../services/api";

export default function UncompletedOrders() {
  let { user } = useContext(AuthContext);

  const [orders, setOrders] = useState({
    orders: [],
  });

  console.log(user.id);

  useEffect(() => {
    api
      .get("/orders/uncompleted", {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("authTokens")).accessToken,
        },
      })
      .then((res) => {
        const allOrders = res.data;
        setOrders({ orders: allOrders });
        console.log(res.data);
      });
  }, [setOrders]);

  if (!orders.orders || orders.orders.length === 0)
    return <p style={{ textAlign: "center" }}>Nie znaleziono zamówień</p>;
  return (
    <React.Fragment>
      <Container component="main">
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Data złożenia zamówienia</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.orders.map((order) => {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {order.id}
                      </TableCell>
                      <TableCell align="left">
                        <Link color="textPrimary" href={"/orders/" + order.id}>
                          {order.orderDate}
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}