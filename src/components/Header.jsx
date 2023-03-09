import React from "react";
import logo from "../assets/a-logo.svg";
import dollar from "../assets/icons/dollar.svg";
import vector from "../assets/icons/vector.svg";
import cart from "../assets/icons/cart.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container flex header fixed">

      <div className="flex" >
        <Link to='/' className='header-item flex px-16 relative'>
          WOMEN
        </Link>

        <Link to='/' className='header-item flex px-16 relative active'>
          MEN
        </Link>

        <Link to='/' className='header-item flex px-16 relative'>
          KIDS
        </Link>
      </div>

      <div>
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div>
        <div className="flex">
          <img src={dollar} alt="dollar" className="dollar-logo pr-10" />
          <img src={vector} alt="vector" className="vector-logo pr-22" />

          <span className="relative">
            <img src={cart} alt="" className=" cart-logo" />
            <span className="quantity-bubble">3</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
