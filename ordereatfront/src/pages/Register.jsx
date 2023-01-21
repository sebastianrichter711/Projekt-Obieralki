import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(
        true,
        new Date("1970-01-01T00:00:00"),
        email,
        new Date("1970-01-01T00:00:00"),
        password,
        passwordAgain,
        "user"
      ).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          navigate("/login");
          //window.location.reload();
        },
        (error) => {
          console.log(error.title);
          alert(
            "Rejestracja zakończona niepowodzeniem! Sprawdź, czy podane dane spełniają wymogi znajdujące się na stronie rejestracji!"
          );
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Helmet title="Rejestracja">
      <CommonSection title="Rejestracja" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <h3>Rejestracja</h3>
              <form className="form mb-5" onSubmit={handleSignup}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="e-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="hasło"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="powtórz hasło"
                    required
                    value={passwordAgain}
                    onChange={(e) => setPasswordAgain(e.target.value)}
                  />
                </div>
                <p> Twój adres e-mail musi być adresem zawierającym znak @.</p>
                <p> Twoje hasło: </p>
                <p>- musi zawierać co najmniej 8 znaków </p>
                <p>
                  - musi zawierać przynajmniej 1 dużą oraz małą literę, a także
                  1 cyfrę i znak specjalny
                </p>
                <button type="submit" className="addTOCart__btn">
                  Utwórz konto
                </button>
              </form>
              <Link to="/login">Masz już konto? Zaloguj się</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
