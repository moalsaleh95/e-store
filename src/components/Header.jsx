import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import logo from "../assets/a-logo.svg";
import vector_ from "../assets/icons/vector_.svg";
import { Link, NavLink } from "react-router-dom";
import MiniCart from '../components/MiniCart';
import Currency from '../components/Currency';
import { useDispatch, useSelector } from "react-redux";
import { totalQuantity, totalCost } from '../features/product/cartSlice';

const Header = () => {
  // const activeLink = window.location.pathname.split('/');

  const totalCartQuantity = useSelector((state) => state.productsAdded.totalQuantity);

  const [isopenCurrency, setIsOpenCurrency] = useState(false);
  const [isopenCart, setIsOpenCart] = useState(false);
  const cartRef = useRef(null)
  const currencyRef = useRef(null)
  const dispatch = useDispatch()
  const ProductsInCart = useSelector((state) => state.productsAdded);
  const selectedCurrencyIndex = ProductsInCart.selectedCurrencyIndex;
  const allFetchedProductsData = useSelector((state) => state.plpProducts.products)


  function handleClickOutside(e) {
    if (isopenCurrency && currencyRef.current && !currencyRef.current.contains(e.target)) {
      setIsOpenCurrency(false)
    }
    if (isopenCart && cartRef.current && !cartRef.current.contains(e.target)) {
      setIsOpenCart(false)
    }
  }

  function handleClickCurrency() {
    setIsOpenCurrency(prev => !prev);
  }

  function handleClickMiniCart() {
    setIsOpenCart(prev => !prev);
  }

  function lockA() {
    const xPos = window.scrollX;
    const yPos = window.scrollY;
    window.onscroll = () => window.scroll(xPos, yPos);
  }

  function unlock() { window.onscroll = "" }

  useEffect(() => {
    // isopenCart ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';
    isopenCart ? lockA() : unlock();
  }, [isopenCart])


  // closes the dropdown menu when clicking anywhere on the page
  document.addEventListener('mousedown', handleClickOutside)


  const totalQuant = ProductsInCart.products.reduce((total, current) => {
    if (current && current.quantity) {
      // console.log('total:', total)
      return total + current.quantity
    } else {
      return total;
    }
  }, 0)
  dispatch(totalQuantity(totalQuant))

  const totalPrice = ProductsInCart.products.reduce((total, current) => {
    if (current && current.prices) {
      // console.log('current:', current)
      return total + current.prices[selectedCurrencyIndex].amount * current.quantity
    } else {
      return total;
    }
  }, 0)
  // console.log('totalPrice:',totalPrice)
  dispatch(totalCost((totalPrice).toFixed(2)))

  return (
    <div className="relative">
      <header className="container header_container flex justify-content-between header mx-auto">

        <div className="flex relative grid_left" >
          <NavLink exact to="/all" className={` header-item flex justify-content-around px-16 relative`}>
            ALL
          </NavLink>

          <NavLink to='/clothes' className={`header-item flex justify-content-around px-16 relative`}>
            CLOTHES
          </NavLink>

          <NavLink to='/tech' className={`header-item flex justify-content-around px-16 relative`}>
            TECH
          </NavLink>
        </div>

        <div>
          <Link to='/'><img src={logo} alt="logo" className="logo" /></Link>
        </div>


        <div className="grid_right">
          <div className="flex">
            <div className="dollar-vector cursor-pointer" onClick={handleClickCurrency}>
              <div className="currency_sign">{allFetchedProductsData?.categories[0].products[0]?.prices[selectedCurrencyIndex].currency.symbol}</div>
              <img src={vector_} alt="vector" className="vector-logo" style={isopenCurrency ? { transform: 'rotate(0deg)' } : { transform: 'rotate(180deg)' }} />
              <Currency isopen={isopenCurrency} ref={currencyRef} />
            </div>

            <div className="relative cursor-pointer" onClick={handleClickMiniCart}>
              <img alt="" className="cart-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACAklEQVR4nO3aP2sUURSH4dcmhSIKInZaW0nQQmNvJRrLdAFBAqK9hVgZYy0WgoWKvaCgXcg3MKApRKx0U4iFIIp/WRkywmEc10Ry5m6c94FpFu7cO+e3M2d374IkSZIkSZIkSZIkSZIkSdKWNfzD8R54AhwtvcC+BjCsj6/AdOlF9jmAIfAO2Fl6oX2zH3gdQpgpvaA+uh4CuFR6MX10IQRws/Ri+mg6BPCw9GL66HAI4GnpxfTRvsYnIXVsG/B5nR9VM45jJg6vChX/O7DDAGCpUADPLP6a+6Eos+S6GOa6kzzXlnEtFOVy8lx3w1zVdxAB50NRbiVX5HmYa8rqrzkVivKYPNuBbzbg30121BiP24Db7W1s0mSxAY/4MvYphJC1L2ADHuFlCOBgUgA24BEWQwAnEopvA/6LeyGAswkBTIXzV3eCGq6GAl0htwFXYathLhToNpvrALASzn9uk8//XzjZ0Q9wH4BdpS92HB3qoPg/gDOlL3Rc7Uks/FvgEXCk9EWOu4+haLtLL6aPXoQAqkeSOvagsVnidmHHTif2Aa3TDQMobwZYBr54B5QxUf9pdxUYAAv1a9ljVVtoeYZXG/fZY1VbbSli9Vr2WNUGLUV8Q/5YtfxP6NcxT/5Y1SbqQg7qd+/8Bpvwv46VJEmSJEmSJEmSJEmSJEmSJLERPwE7Y54h8NcB/wAAAABJRU5ErkJggg=="></img>
              <span className="quantity-bubble">{totalCartQuantity}</span>
            </div>
          </div>
        </div>
        <MiniCart isopen={isopenCart} ref={cartRef} />

        {/* {displat grey layer when mini-cart is open} */}
        {
          createPortal(
            <div className="layer" style={isopenCart ? { visibility: 'visible' } : { visibility: 'hidden' }}></div>
            , document.getElementById('root')
          )
        }


      </header>
    </div>
  );
};

export default Header;