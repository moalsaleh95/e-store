import React from "react";
import logo from "../assets/a-logo.svg";
import dollar from "../assets/icons/dollar.svg";
import vector from "../assets/icons/vector.svg";
import cart from "../assets/icons/cart.svg";

const Header = () => {
  return (
    <header className="container flex header fixed">

      <div className="flex" >
        <p>WOMEN</p>
        <p>MEN</p>
        <p>KIDS</p>
      </div>

      <div>
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div>
        <div>
          <img src={dollar} alt="dollar" className="dollar-logo" />
          <img src={vector} alt="vector" className="vector-logo" />
          <img src={cart} alt="cart" className="cart-logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
