import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import image_2 from '../assets/images/ProductD.png';
import { useSelector } from 'react-redux';
import { capAllLettersFunc } from '../hooks/capAllLetter';

const MiniCart = forwardRef((props, ref) => {

  const { isopen } = props
  const ProductsInCart = useSelector((state) => state.productsAdded.products);
  // console.log('ProductsInCart', ProductsInCart)

  return (
    <>
      <div className='mini-cart-container absolute border-black' ref={ref} style={isopen ? { display: 'block' } : { display: 'none' }}>
        <div className='mx-auto'>
          <span className='minicart-categoty'><b>My Bag, </b>3 items</span>
          {
            ProductsInCart.map(item => {
              const { id, brand, name, prices, gallery, quantity, selectedAttribute, attributes } = item;
              const selectedAttributesArray = Object.values(selectedAttribute)

              return (
                <div className='minicart-container' key={id}>
                  <div className='left-container-minicart'>
                    <div className='minicart-title'>{brand}</div>
                    <div className='minicart-subtitle'>{name}</div>
                    <div className='minicart-price'>{prices[0].currency.symbol}{prices[0].amount}</div>
                    {/* <div>
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
                    </div> */}
                    <div>
                      {Object.values(attributes).map(value => {

                        {/* For Colors attribute */ }
                        if (value.name === 'Color') {

                          return (
                            <>
                              <p className='minicart-size-color-price'>{capAllLettersFunc(value.name)}:</p>
                              <div className='flex mt-20'>
                                {value.items.map(item => {
                                  return (
                                    <div
                                      key={item.id}
                                      className='color-boxes-minicart'
                                      style={{ border: selectedAttributesArray.includes(item.value) ? '1px solid #5ECE7B' : '1px solid #D3D2D5', background: `${item.value}`, color: 'transparent' }}>{item.value}
                                    </div>
                                  )
                                })
                                }
                              </div>
                            </>
                          )
                        }
                        else {
                          {/* For Other attributes */ }
                          return (
                            <>
                              <p className='minicart-size-color-price'>{capAllLettersFunc(value.name)}:</p>
                              <div className='flex mt-20'>
                                {value.items.map(item => {
                                  return (
                                    <div
                                      key={item.id}
                                      style={{ background: selectedAttributesArray.includes(item.value) ? '#1D1F22' : '', color: selectedAttributesArray.includes(item.value) ? '#fff' : '#000' }}
                                      className='size-boxes-minicart relative'>{item.value}
                                    </div>
                                  )
                                })
                                }
                              </div>
                            </>
                          )
                        }
                      })}
                    </div>
                  </div>
                  <div className='right-container-minicart'>
                    <div className='quantity-minicart-container'>
                      <div className='quant-box-minicart'>+</div>
                      <div className='quant-minicart'>{quantity}</div>
                      <div className='quant-box-minicart'>-</div>
                    </div>
                    <div>
                    {gallery?.map((image, index) => <img className='cart-img' id={index} key={index} src={image} alt="" style={{ display: index === 0 ? 'block' : 'none' }} />)}
                    </div>
                  </div>
                </div>
              )
            })
          }
          <div className='minicart-total'>
            <span><b>Total</b></span>
            <span><b>$200.00</b></span>
          </div>
          <div className='minicart-checkout'>
            <Link to='/cart' className='viewbag'>VIEW BAG</Link>
            <a href='/' className='checkout'>CHECK OUT</a>
          </div>
        </div>
      </div >
    </>
  )

});

export default MiniCart