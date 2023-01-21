import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import "../../styles/footer.css";

import { Link } from "@mui/material";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="4" sm="6">
            <div className=" footer__logo text-start">
              <h5>twojejedzenie.pl</h5>
              <p>Wiele smaków w jednym miejscu</p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Kontakt</h5>
            <ListGroup className="deliver__time-list">
              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <p>Warszawska 1, 40-009 Katowice, Polska</p>
              </ListGroupItem>
              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <span>Telefon: +48 654 321 234</span>
              </ListGroupItem>

              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <span>Email: kontakt@twojejedzenie.pl</span>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Newsletter</h5>
            <p>Zapisz się na newsletter</p>
            <div className="newsletter">
              <input type="email" placeholder="Wpisz swój adres email" />
              <span>
                <i class="ri-send-plane-line"></i>
              </span>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg="6" md="6">
            <p className="copyright__text">
              Copyright © {new Date().getFullYear()} All Rights Reserved.
            </p>
          </Col>
          <Col lg="6" md="6">
            <div className="social__links d-flex align-items-center gap-4 justify-content-end">
              <p className="m-0">Obserwuj nas: </p>
              <span>
                {" "}
                <Link
                  color="textPrimary"
                  href="https://www.facebook.com/PolitechnikaSlaska"
                >
                  <i class="ri-facebook-line"></i>
                </Link>{" "}
              </span>

              <span>
                <Link
                  color="textPrimary"
                  href="https://github.com/sebastianrichter711"
                >
                  <i class="ri-github-line"></i>
                </Link>
              </span>

              <span>
                {" "}
                <Link
                  color="textPrimary"
                  href="https://www.youtube.com/channel/UC1vIfTrSJWMfFGrmBtktm-w"
                >
                  <i class="ri-youtube-line"></i>
                </Link>{" "}
              </span>

              <span>
                {" "}
                <Link
                  color="textPrimary"
                  href="https://www.linkedin.com/in/sebastian-richter-sr/"
                >
                  <i class="ri-linkedin-line"></i>
                </Link>{" "}
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
