import React from 'react';
import image_2 from '../assets/images/ProductD.png';
import arrow from '../assets/icons/arrow.svg';

const Cart = () => {
  return (
    <div className='container mx-auto'>
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
              <div className='size-boxes relative'>XS</div>
              <div className='size-boxes relative'>S</div>
              <div className='size-boxes relative'>M</div>
              <div className='size-boxes relative'>L</div>
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
          <div>
            <img src={image_2} alt="" className='cart-img' />
          </div>
          <div className='arrows-container'>
            <div><img src={arrow} alt="" className='arrow' /></div>
            <div><img src={arrow} alt="" className='arrow right-arrow' /></div>
          </div>
        </div>
      </div>

      <hr className='divider-1'></hr>

    </div>
  )
}

export default Cart