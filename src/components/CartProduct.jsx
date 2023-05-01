import React, { useState } from 'react'
import { capAllLettersFunc } from '../hooks/capAllLetter'
import arrow from '../assets/icons/arrow.svg';

const CartProduct = (props) => {
    const { 
        item, 
        selectedCurrencyIndex,
        // galleryIndex,
        // setGalleryLength, 
        incrementFunc, 
        decrementFunc, 
        // showNextImage, 
        // showPrevImage 
    } = props

    const { id, brand, name, prices, gallery, quantity, selectedAttribute, attributes } = item;

    const [galleryIndex, setGalleryIndex] = useState(0);
    const [galleryLength, setGalleryLength] = useState(gallery.length);
    
    // the commented line was causing an infinite loop, instead set the setGalleryLength directly in the useState
    // setGalleryLength(gallery.length)

    const showPrevImage = () => {
        setGalleryIndex( prevGalleryIndex => prevGalleryIndex > 0 ? prevGalleryIndex - 1 : 0)
      }
    
      const showNextImage = () => {
        setGalleryIndex( prevGalleryIndex => prevGalleryIndex < galleryLength-1 ? prevGalleryIndex + 1 : prevGalleryIndex)
      }

    const selectedAttributesArray = Object.values(selectedAttribute)
    return (
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
                                                    style={{ background: selectedAttribute[value.name] === item.value ? '#1D1F22' : '', color: selectedAttribute[value.name] === item.value ? '#fff' : '#000' }}
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

                    {/* {gallery?.map((image, index) => <img className='cart-img' id={index} key={index} src={image} alt="" style={{ display: index === 0 ? 'block' : 'none' }} />)} */}
                    <img className='cart-img' src={gallery[galleryIndex]} alt=""  />

                    {/* {if there is one image onlt don't display the arrows} */}
                    <div className='arrows-container'>
                        <div><img onClick={showPrevImage} src={arrow} alt="" className='arrow' /></div>
                        <div><img onClick={showNextImage} src={arrow} alt="" className='arrow right-arrow' /></div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CartProduct