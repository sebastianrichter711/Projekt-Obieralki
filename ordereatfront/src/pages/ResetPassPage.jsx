import React, { useContext, useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import AuthContext from "../services/AuthContext";
import userService from "../services/user.service";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const { state } = useLocation();
  const { token } = state;
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await authService.resetPassword(token, password, passwordAgain).then(
        () => {
          navigate("/home");
          //window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Helmet title="Zmień hasło">
      <CommonSection title="Zmień hasło" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <h3>Zmień hasło</h3>
              <form className="form mb-5" onSubmit={handleResetPassword}>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Nowe hasło"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Powtórz nowe hasło"
                    required
                    value={passwordAgain}
                    onChange={(e) => setPasswordAgain(e.target.value)}
                  />
                </div>
                <p> Twoje hasło: </p>
                <p>- musi zawierać co najmniej 8 znaków </p>
                <p>
                  - musi zawierać przynajmniej 1 dużą oraz małą literę, a także
                  1 cyfrę i znak specjalny
                </p>
                <button type="submit" className="addTOCart__btn">
                  Zmień hasło
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ResetPasswordPage;
