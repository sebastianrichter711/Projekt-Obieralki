import React, { useRef, useEffect, useState, useContext } from "react";

import { Container } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";

import "../../styles/header.css";

import Logo from "../../assets/images/logo.png";

import authService from "../../services/auth.service";
import AuthContext from "../../services/AuthContext";

import { Button } from "@mui/material";
import { red } from "@mui/material/colors";

const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "Cart",
    path: "/cart",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  //const [currentUser, setCurrentUser] = useState("");

  let { user, logoutUser } = useContext(AuthContext);

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => window.removeEventListener("scroll", null);
  }, []);

  // useEffect(() => {
  //   const user = authService.getCurrentUser();

  //   if (user) {
  //     setCurrentUser(user);
  //   }
  // }, []);

  // console.log(currentUser);

  const logOut = () => {
    authService.logout();
    //setCurrentUser("");
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to="/home">
              <img src={Logo} />
            </Link>
          </div>

          <div className="nav__right d-flex align-items-center gap-4">
            {user.role === "admin" ? (
              <Button href="/admin" style={{ textAlign: "center" }}>
                <p>Panel admina</p>
              </Button>
            ) : (
              <></>
            )}
            <span className="cart__icon" onClick={toggleCart}>
              <i class="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            {user !== "xxx" ? (
              <>
                <Link to="/user">
                  <i class="ri-user-line"></i>
                </Link>
                <span className="user">
                  <Button onClick={logoutUser}>
                    <p>Wyloguj się</p>
                  </Button>
                </span>
              </>
            ) : (
              <>
                <Button href="/login">
                  <p>Logowanie</p>
                </Button>
                <Button href="/register">
                  <p>Rejestracja</p>
                </Button>
              </>
            )}
            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

{
  /* <i class="ri-user-line"></i> */
}
