import React from 'react'

const Cart = () => {
  return (
    <div className='container mx-auto'>
      <span className='cart-categoty'>CART</span>

      <hr className='divider'></hr>

      <div className='cart-container'>
        <div>
          <p className='pdp-title'>Apollo</p>
          <div className='pdp-subtitle'>Running Shoes</div>
          <div>
            <p className='size-color-price'>PRICE:</p>
            <p className='price'>$50.00</p>
          </div>
          <div>
            <p className='size-color-price'>SIZE:</p>
            <div className='flex mt-20'>
              <div className='size-boxes relative'>XS</div>
              <div className='size-boxes relative'>S</div>
              <div className='size-boxes relative'>M</div>
              <div className='size-boxes relative'>L</div>
            </div>
          </div>
          <div>
            <p className='size-color-price'>COLOR:</p>
            <div className='flex'>
              <div className='color-boxes'></div>
              <div className='color-boxes'></div>
              <div className='color-boxes'></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart