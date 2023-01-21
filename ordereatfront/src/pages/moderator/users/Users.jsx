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
import { Box } from "@mui/material";
import AuthContext from "../../../services/AuthContext";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import UserService from "../../../services/user.service";

export default function Users() {
  let { user } = useContext(AuthContext);

  const [users, setUsers] = useState({
    users: [],
  });

  console.log(user.id);

  useEffect(() => {
    UserService.getUsers().then((res) => {
      const allUsers = res.data;
      setUsers({ users: allUsers });
      console.log(res.data);
    });
  }, [setUsers]);

  if (!users.users || users.users.length === 0)
    return (
      <div>
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          Nie znaleziono użytkowników
        </p>
        <br />
        <Box textAlign="center">
          <Button href={"/users/add"} variant="contained" color="primary">
            Dodaj użytkownika
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
                  <TableCell>E-mail</TableCell>
                  <TableCell align="left">Akcje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.users.map((user) => {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {user.id}
                      </TableCell>
                      <TableCell align="left">
                        <Link color="textPrimary" href={"/users/" + user.id}>
                          {user.email}
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        <Link
                          color="textPrimary"
                          href={"/users/admin/edit/" + user.id}
                        >
                          <Edit></Edit>
                        </Link>
                        <Link
                          color="textPrimary"
                          href={"/users/admin/delete/" + user.id}
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
                      href={"/users/add"}
                      variant="contained"
                      color="primary"
                    >
                      Dodaj użytkownika
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
