import React, { useState, useEffect, useId, useContext } from "react";
import { useParams } from "react-router-dom";
import authService from "../services/auth.service";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import userService from "../services/user.service";
import AuthContext from "../services/AuthContext";
import { Button } from "@mui/material";
import "../styles/user-page.css";

const UserPage = () => {
  const { user, authTokens } = useContext(AuthContext);
  const [gotUser, setGotUser] = useState("");

  useEffect(() => {
    userService.getUser(user.id).then((res) => {
      setGotUser(res.data);
      console.log(res.data);
    });
  }, [setGotUser]);

  var userFullName = gotUser.name + " " + gotUser.surname;

  if (user === "xxx") {
    return (
      <Helmet title="Profil użytkownika">
        <CommonSection title="Profil użytkownika" />
        <h1>Strona dostępna tylko dla zalogowanych użytkowników!</h1>
      </Helmet>
    );
  }
  return (
    <Helmet title="Dane użytkownika">
      <CommonSection title="Dane użytkownika" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <form className="checkout__form">
                <div className="form__group">
                  <p type="text" required>
                    Data nadania uprawnień: {gotUser.authorize_date}
                  </p>
                  <p type="text" required>
                    Data wygaśnięcia uprawnień: {gotUser.end_authorize_date}
                  </p>
                  <p type="text" required>
                    Data urodzenia: {gotUser.birth_date}
                  </p>
                  <p type="text" required>
                    Email: {gotUser.email}
                  </p>
                  <p type="text" required>
                    Imię: {gotUser.name}
                  </p>
                  <p type="text" required>
                    Nazwisko: {gotUser.surname}
                  </p>
                  <p type="text" required>
                    Nr telefonu: {gotUser.phone}
                  </p>
                  <p type="text" required>
                    Adres: {gotUser.address}
                  </p>
                </div>

                <Button
                  href={"https://localhost:3000/user/edit/" + user.id}
                  variant="outlined"
                >
                  EDYTUJ KONTO
                </Button>
                <Button
                  href={"https://localhost:3000/users/delete/" + user.id}
                  variant="outlined"
                >
                  USUŃ KONTO
                </Button>
                <Button
                  href={"https://localhost:3000/forgot-password"}
                  variant="outlined"
                >
                  ZMIEŃ HASŁO
                </Button>
                <Button
                  href={"https://localhost:3000/user-orders"}
                  variant="outlined"
                >
                  MOJE ZAMÓWIENIA
                </Button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default UserPage;
