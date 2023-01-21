import React, { useEffect, useState, useContext } from "react";
import { Container } from "@mui/material";
import { Link } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
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
import DishService from "../../../services/dish.service";

export default function Dishes() {
  let { user } = useContext(AuthContext);

  const [dishes, setDishes] = useState({
    dishes: [],
  });

  console.log(user.id);

  useEffect(() => {
    DishService.getDishes().then((res) => {
      const allDishes = res.data;
      setDishes({ dishes: allDishes });
      console.log(res.data);
    });
  }, [setDishes]);

  if (!dishes.dishes || dishes.dishes.length === 0)
    return (
      <div>
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          Nie znaleziono dań
        </p>
        <Box textAlign="center">
          <Button href={"/dishes/add"} variant="contained" color="primary">
            Dodaj danie
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
                  <TableCell>Nazwa dania</TableCell>
                  <TableCell align="left">Akcje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dishes.dishes.map((dish) => {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {dish.id}
                      </TableCell>
                      <TableCell align="left">
                        <Link color="textPrimary" href={"/dishes/" + dish.id}>
                          {dish.name}
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        <Link
                          color="textPrimary"
                          href={"/dishes/edit/" + dish.id}
                        >
                          <Edit></Edit>
                        </Link>
                        <Link
                          color="textPrimary"
                          href={"/dishes/delete/" + dish.id}
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
                      href={"/dishes/add"}
                      variant="contained"
                      color="primary"
                    >
                      Dodaj danie
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
