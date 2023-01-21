import React from "react";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Routes from "../../routes/Routers";

import Carts from "../UI/cart/Carts.jsx";
import { useSelector } from "react-redux";
import { AuthProvider } from "../../services/AuthContext.js";

const Layout = () => {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  return (
    <div>
      <AuthProvider>
        <Header />

        {showCart && <Carts />}

        <div>
          <Routes />
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default Layout;
