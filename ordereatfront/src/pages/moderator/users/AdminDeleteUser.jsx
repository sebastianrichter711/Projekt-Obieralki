import React, { useState, useEffect } from "react";
import userService from "../../../services/user.service";
import { useNavigate, useParams } from "react-router-dom";
//MaterialUI
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import jwt_decode from "jwt-decode";

export default function AdminDeleteUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    userService
      .deleteUser(id)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(function () {
        navigate("/admin");
        window.location.reload();
      });
  };

  return (
    <Container component="main" maxWidth="sm">
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
          Naciśnij, jeśli chcesz usunąć
        </Button>
      </Box>
    </Container>
  );
}
