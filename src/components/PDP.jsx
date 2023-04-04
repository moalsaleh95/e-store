import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../queries/productQueries';
import image_2 from '../assets/images/ProductD.png';


const PDP = () => {

  const id = 'huarache-x-stussy-le';
  // can't pass string id directly in variables object !
  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: {id} });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data)

  return (
    <div className='container mt-pdp'>
      <div className='grid-container mt-pdp'>

        <div className='pdp-left-container'>
          <div>
            <img className='pdp-sml-photos' src={image_2} alt="" />
            <img className='pdp-sml-photos' src={image_2} alt="" />
            <img className='pdp-sml-photos' src={image_2} alt="" />
          </div>
          <div>
           <img className='pdp-big-photo' src={image_2} alt="" />
          </div>
        </div>

        <div className=''>
          <p className='pdp-title'>Apollo</p>
          <div className='pdp-subtitle'>Running Shoes</div>
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
          <div>
            <p className='size-color-price'>PRICE:</p>
            <p className='price'>$50.00</p>
          </div>
          <div className='add-to-cart-div'>
            <a className='add-to-cart-btn' href='/'>ADD TO CART</a>
          </div>
          <p className='pdp-desc'>
            Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PDP