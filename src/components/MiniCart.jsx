import React from 'react';
import image_2 from '../assets/images/ProductD.png';
import arrow from '../assets/icons/arrow.svg';

const MiniCart = (props) => {

  const {isopen} = props

  return (
    <div className='mini-cart-container absolute border-black' style={ isopen ? {display: 'block'} : {display: 'none'}}>
      <div className='mx-auto'>
        <span className='minicart-categoty'><b>My Bag, </b>3 items</span>

        <div className='minicart-container'>
          <div className='left-container-minicart'>
            <div className='minicart-title'>Apollo</div>
            <div className='minicart-subtitle'>Running Shoes</div>
            <div className='minicart-price'>$50.00</div>
            <div>
              <div className='minicart-size-color-price'>SIZE:</div>
              <div className='flex'>
                <div className='size-boxes-minicart relative'><b>XS</b></div>
                <div className='size-boxes-minicart relative'><b>S</b></div>
                <div className='size-boxes-minicart relative'><b>M</b></div>
                <div className='size-boxes-minicart relative'><b>L</b></div>
              </div>
            </div>
            <div>
              <div className='minicart-size-color-price'>COLOR:</div>
              <div className='flex'>
                <div className='color-boxes-minicart'></div>
                <div className='color-boxes-minicart'></div>
                <div className='color-boxes-minicart'></div>
              </div>
            </div>
          </div>
          <div className='right-container-minicart'>
            <div className='quantity-minicart-container'>
              <div className='quant-box-minicart'>+</div>
              <div className='quant-minicart'>1</div>
              <div className='quant-box-minicart'>-</div>
            </div>
            <div>
              <img src={image_2} alt="" className='minicart-img' />
            </div>
          </div>
        </div>

        <div className='minicart-total'>
          <span><b>Total</b></span>
          <span><b>$200.00</b></span>
        </div>
        <div className='minicart-checkout'>
          <a href='/' className='viewbag'>VIEW BAG</a>
          <a href='/' className='checkout'>CHECK OUT</a>
        </div>

      </div>
    </div>
  )
}

export default MiniCart