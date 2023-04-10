import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'
import { GET_PRODUCT } from '../queries/queries';
import image_2 from '../assets/images/ProductD.png';
import { capAllLettersFunc } from '../hooks/capAllLetter';


const PDP = () => {

  const { id } = useParams();
  console.log('idd', id)
  
  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log('data:', data.product)

  const product = data.product;

  {
    const { id, name, brand, inStock, description, prices, gallery, attributes } = product

    return (

      <div className='container mt-pdp'>
        <div className='grid-container mt-pdp'>

          <div className='pdp-left-container'>
            <div>
              {gallery.map(image => <img className='pdp-sml-photos' src={image} alt="" />)}
            </div>
            <div>
              <img className='pdp-big-photo' src={gallery[0]} alt="" />
            </div>
          </div>

          <div className=''>
            <p className='pdp-title'>{brand}</p>
            <div className='pdp-subtitle'>{name}</div>

            <div>
              <p className='size-color-price'>{capAllLettersFunc(attributes[0].name)}:</p>
              <div className='flex mt-20'>

                {/* For Colors Values */}
                {
                  attributes[0].name === 'Color'
                  &&
                  <div className='flex'>
                    {
                      attributes[0].items.map(item => {
                        return (
                          <div key={item.id} className='color-boxes' style={{ background: `${item.value}` }}></div>
                        )
                      })
                    }
                  </div>
                }

                {/* For Other values */}
                {
                  attributes[0].name !== 'Color'
                  &&
                  attributes[0].items.map(item => {
                    return (
                      <div key={item.id} className='size-boxes relative'>{item.value}</div>
                    )
                  })
                }
              </div>
            </div>

            <div>
              <div>
                <p className='size-color-price'>PRICE:</p>
                <p className='price'>{prices[0].currency.symbol}{prices[0].amount}</p>
              </div>
              <div className='add-to-cart-div'>
                <a className='add-to-cart-btn' href='/' style={!inStock ? {pointerEvents: 'none', background: 'grey'} : {background: '#5ECE7B'}} >
                  {inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                </a>
              </div>
              {/* <p className='pdp-desc'> */}
              {description}
              {/* </p> */}
            </div>

          </div>
        </div>
      </div>
    )
  }


}

export default PDP