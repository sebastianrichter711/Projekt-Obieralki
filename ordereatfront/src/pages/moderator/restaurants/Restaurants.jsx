import React, { useEffect, useState, useContext } from "react";
import { Container } from "@mui/material";
import { Link } from "@mui/material";
import { Box } from "@mui/material";

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

export default function Restaurants() {
  let { user } = useContext(AuthContext);

  const [restaurants, setRestaurants] = useState({
    restaurants: [],
  });

  console.log(user.id);

  useEffect(() => {
    RestaurantService.getRestaurants().then((res) => {
      const allRestaurants = res.data;
      setRestaurants({ restaurants: allRestaurants });
      console.log(res.data);
    });
  }, [setRestaurants]);

  if (!restaurants.restaurants || restaurants.restaurants.length === 0)
    return (
      <div>
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          Nie znaleziono restauracji
        </p>
        <Box textAlign="center">
          <Button href={"/restaurants/add"} variant="contained" color="primary">
            Dodaj restaurację
          </Button>
        </Box>
      </div>
    );
  return (
    <React.Fragment>
      <Container component="main">
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nazwa restauracji</TableCell>
                  <TableCell align="left">Akcje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurants.restaurants.map((restaurant) => {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {restaurant.id}
                      </TableCell>
                      <TableCell align="left">
                        <Link
                          color="textPrimary"
                          href={"/restaurants/" + restaurant.id}
                        >
                          {restaurant.name}
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        <Link
                          color="textPrimary"
                          href={"/restaurants/edit/" + restaurant.id}
                        >
                          <Edit></Edit>
                        </Link>
                        <Link
                          color="textPrimary"
                          href={"/restaurants/delete/" + restaurant.id}
                        >
                          <Delete></Delete>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <Button
                      href={"/restaurants/add"}
                      variant="contained"
                      color="primary"
                    >
                      Dodaj restaurację
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
