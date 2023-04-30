import React, { useEffect, useState } from 'react';
import arrow from '../assets/icons/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../features/product/cartSlice';
import { capAllLettersFunc } from '../hooks/capAllLetter';

const Cart = () => {
  const dispatch = useDispatch()
  const ProductsInCart = useSelector((state) => state.productsAdded);
  const selectedCurrencyIndex = ProductsInCart.selectedCurrencyIndex;
  const totalCartQuantity = ProductsInCart.totalQuantity;
  const totalCartCost = ProductsInCart.totalPrice;
  // const [galleryIndex, setGalleryIndex] = useState(0);
  // const [galleryLength, setGalleryLength] = useState();

  // console.log('ProductsInCart', ProductsInCart)

  const incrementFunc = (e) => {
    dispatch(increment(e?.target?.id))
  }

  const decrementFunc = (e) => {
    dispatch(decrement(e?.target?.id))
  }

  const showPrevImage = () => {
    // setGalleryIndex( prevGalleryIndex => prevGalleryIndex > 0 ? prevGalleryIndex - 1 : 0)
  }

  const showNextImage = () => {
    // setGalleryIndex( prevGalleryIndex => prevGalleryIndex < galleryLength ? prevGalleryIndex + 1 : prevGalleryIndex)
  }

  return (

    <>
      <div className='container mx-auto mt-80'>
        <span className='cart-categoty'>CART</span>
        <hr className='divider'></hr>
        {
          ProductsInCart.products.map(item => {
            const { id, brand, name, prices, gallery, quantity, selectedAttribute, attributes } = item;
            const selectedAttributesArray = Object.values(selectedAttribute)
            // setGalleryLength(gallery.length)

            return (

              <>
                <div className='cart-container' id={id} key={id}>
                  <div className='left-container-cart'>
                    <div className='cart-title'>{brand}</div>
                    <div className='cart-subtitle'>{name}</div>
                    {Array.isArray(prices) && prices[selectedCurrencyIndex] &&
                      <div>
                        <div className='cart-price'>
                          {prices[selectedCurrencyIndex].currency.symbol}{prices[selectedCurrencyIndex].amount}
                        </div>
                      </div>}

                    <div>
                      {Object.values(attributes).map(value => {

                        {/* For Colors attribute */ }
                        if (value.name === 'Color') {

                          return (
                            <>
                              <p className='cart-size-color-price'>{capAllLettersFunc(value.name)}:</p>
                              <div className='flex mt-20'>
                                {value.items.map(item => {
                                  return (
                                    <div
                                      key={item.id}
                                      className='color-boxes'
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
                              <p className='cart-size-color-price'>{capAllLettersFunc(value.name)}:</p>
                              <div className='flex mt-20'>
                                {value.items.map(item => {
                                  return (
                                    <div
                                      key={item.id}
                                      style={{ background: selectedAttributesArray.includes(item.value) ? '#1D1F22' : '', color: selectedAttributesArray.includes(item.value) ? '#fff' : '#000' }}
                                      className='size-boxes relative'>{item.value}
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
                  <div className='right-container-cart'>
                    <div className='quantity-container'>
                      <button className='quant-box cursor-pointer' onClick={(e) => incrementFunc(e)} id={id}>+</button>
                      <div className='quant'>{quantity}</div>
                      <button className='quant-box cursor-pointer' onClick={(e) => decrementFunc(e)} id={id}>-</button>
                    </div>
                    <div className='relative mx-auto'>
                      {/* <img src={image_2} alt="" className='cart-img' /> */}

                      {gallery?.map((image, index) => <img className='cart-img' id={index} key={index} src={image} alt="" style={{ display: index === 0 ? 'block' : 'none' }} />)}
                      {/* {if there is one image onlt don't display the arrows} */}
                      <div className='arrows-container'>
                        <div><img onClick={showPrevImage} src={arrow} alt="" className='arrow' /></div>
                        <div><img onClick={showNextImage} src={arrow} alt="" className='arrow right-arrow' /></div>
                      </div>
                    </div>

                  </div>

                </div>
                <hr className='divider-1'></hr>
              </>


            )
          })
        }


        <div className='cart-tax cart-bottom'>Tax 21%: <b>{ProductsInCart.products[0]?.prices[selectedCurrencyIndex].currency.symbol}{totalCartCost * 0.21}</b></div>
        <div className='cart-quantity cart-bottom'>Quantity: <b>{totalCartQuantity}</b></div>
        <div className='cart-total cart-bottom'>Total: <b>{ProductsInCart.products[0]?.prices[selectedCurrencyIndex].currency.symbol}{totalCartCost}</b></div>

        <div ><a href='/' className='cart-order'>ORDER</a></div>
      </div>
    </>

  )
}

export default Cart