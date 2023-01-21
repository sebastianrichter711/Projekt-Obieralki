import React, { useContext, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import AuthContext from "../services/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let { loginUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
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
    <Helmet title="Logowanie">
      <CommonSection title="Logowanie" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <h3>Logowanie</h3>

              <form className="form mb-5" onSubmit={loginUser}>
                <div className="form__group">
                  <input
                    id="email"
                    type="email"
                    placeholder="e-mail"
                    required
                    //value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    id="password"
                    type="password"
                    placeholder="hasło"
                    required
                    //value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Zaloguj się
                </button>
              </form>
              <Link to="/register">Nie masz konta? Zarejestruj się!</Link>
              <br />
              <Link to="/forgot-password">
                Nie pamiętasz hasła? Zresetuj je!
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
