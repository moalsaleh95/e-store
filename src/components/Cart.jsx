import React from 'react';
import image_2 from '../assets/images/ProductD.png';
import arrow from '../assets/icons/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {

  // const ProductsInCart = useSelector((state)=> state.productsAdded);
  // console.log('ProductsInCart', ProductsInCart)
  const ProductsInCart = useSelector((state) => state.productsAdded);
  console.log('ProductsInCart', ProductsInCart)

  const {name, price, id, brand, selectedAttributes} = ProductsInCart

  return (
    <div className='container mx-auto mt-80'>
      <span className='cart-categoty'>CART</span>
      <hr className='divider'></hr>

      <div className='cart-container'>
        <div className='left-container-cart'>
          <div className='cart-title'>Apollo</div>
          <div className='cart-subtitle'>Running Shoes</div>
          <div>
            <div className='cart-price'>$50.00</div>
          </div>
          <div>
            <div className='cart-size-color-price'>SIZE:</div>
            <div className='flex'>
              <div className='size-boxes relative'><b>XS</b></div>
              <div className='size-boxes relative'><b>S</b></div>
              <div className='size-boxes relative'><b>M</b></div>
              <div className='size-boxes relative'><b>L</b></div>
            </div>
          </div>
          <div>
            <div className='cart-size-color-price'>COLOR:</div>
            <div className='flex'>
              <div className='color-boxes'></div>
              <div className='color-boxes'></div>
              <div className='color-boxes'></div>
            </div>
          </div>
        </div>
        <div className='right-container-cart'>
          <div className='quantity-container'>
            <div className='quant-box'>+</div>
            <div className='quant'>1</div>
            <div className='quant-box'>-</div>
          </div>
          <div className='relative mx-auto'>
            <img src={image_2} alt="" className='cart-img' />
            <div className='arrows-container'>
            <div><img src={arrow} alt="" className='arrow' /></div>
            <div><img src={arrow} alt="" className='arrow right-arrow' /></div>
          </div>
          </div>

        </div>
      </div>

      <hr className='divider-1'></hr>

      <div className='cart-tax cart-bottom'>Tax 21%: <b>$42.00</b></div>
      <div className='cart-quantity cart-bottom'>Quantity: <b>3</b></div>
      <div className='cart-total cart-bottom'>Total: <b>$200.00</b></div>

      <a href='/' className='cart-order'>ORDER</a>
    </div>
  )
}

export default Cart