import React, { useContext, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import AuthContext from "../services/AuthContext";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleForgotPass = async (e) => {
    e.preventDefault();
    try {
      await authService.forgotPassword(email).then(
        (res) => {
          console.log(res);
          navigate("/reset-password", {
            state: {
              token: res,
            },
          });
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
    <Helmet title="Resetowanie hasła">
      <CommonSection title="Resetowanie hasła" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={handleForgotPass}>
                <div className="form__group">
                  <input
                    id="email"
                    type="email"
                    placeholder="email"
                    required
                    //value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Zresetuj hasło
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ForgotPasswordPage;
