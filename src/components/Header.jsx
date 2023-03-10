import React from "react";
import logo from "../assets/a-logo.svg";
import dollar from "../assets/icons/dollar.svg";
import vector from "../assets/icons/vector.svg";
import cart from "../assets/icons/cart.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="container relative flex justify-content-between header mx-auto">

      <div className="flex" >
        <NavLink to='/' className='header-item flex justify-content-around px-16 relative'>
          WOMEN
        </NavLink>

        <NavLink to='/' className='header-item flex justify-content-around px-16 relative active'>
          MEN
        </NavLink>

        <NavLink to='/' className='header-item flex justify-content-around px-16 relative'>
          KIDS
        </NavLink>
      </div>

      <div>
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div>
        <div className="flex">
          <img src={dollar} alt="dollar" className="dollar-logo pr-10" />
          <img src={vector} alt="vector" className="vector-logo pr-22" />

          <span className="relative">
            <img alt="" className="cart-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACAklEQVR4nO3aP2sUURSH4dcmhSIKInZaW0nQQmNvJRrLdAFBAqK9hVgZYy0WgoWKvaCgXcg3MKApRKx0U4iFIIp/WRkywmEc10Ry5m6c94FpFu7cO+e3M2d374IkSZIkSZIkSZIkSZIkSdKWNfzD8R54AhwtvcC+BjCsj6/AdOlF9jmAIfAO2Fl6oX2zH3gdQpgpvaA+uh4CuFR6MX10IQRws/Ri+mg6BPCw9GL66HAI4GnpxfTRvsYnIXVsG/B5nR9VM45jJg6vChX/O7DDAGCpUADPLP6a+6Eos+S6GOa6kzzXlnEtFOVy8lx3w1zVdxAB50NRbiVX5HmYa8rqrzkVivKYPNuBbzbg30121BiP24Db7W1s0mSxAY/4MvYphJC1L2ADHuFlCOBgUgA24BEWQwAnEopvA/6LeyGAswkBTIXzV3eCGq6GAl0htwFXYathLhToNpvrALASzn9uk8//XzjZ0Q9wH4BdpS92HB3qoPg/gDOlL3Rc7Uks/FvgEXCk9EWOu4+haLtLL6aPXoQAqkeSOvagsVnidmHHTif2Aa3TDQMobwZYBr54B5QxUf9pdxUYAAv1a9ljVVtoeYZXG/fZY1VbbSli9Vr2WNUGLUV8Q/5YtfxP6NcxT/5Y1SbqQg7qd+/8Bpvwv46VJEmSJEmSJEmSJEmSJEmSJLERPwE7Y54h8NcB/wAAAABJRU5ErkJggg=="></img>
            <span className="quantity-bubble">3</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
