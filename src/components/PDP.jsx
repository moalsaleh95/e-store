import React, { useEffect, useState } from 'react';
// import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'
// import { GET_PRODUCT } from '../queries/queries';
import { capAllLettersFunc } from '../hooks/capAllLetter';

import { useDispatch, useSelector } from 'react-redux';
import { productsAdded } from '../features/product/cartSlice';
import { fetchProduct } from '../features/product/pdpSlice';

const PDP = () => {
  const { id } = useParams();
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [displayedImage, setDisplayedImage] = useState(0)

  // console.log('idd', id)


  const dispatch = useDispatch();

  // dispatch(fetchProduct(id));

  useEffect(() => {
    console.log('effect')
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const data = useSelector((state) => state.pdpProduct);
  console.log('data', data)

  const isLoading = useSelector((state) => state.pdpProduct?.isLoading);
  console.log('isLoading', isLoading)

  const error = useSelector((state) => state.pdpProduct?.error);

  const product = useSelector((state) => state.pdpProduct?.product);


  // const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id } });


  if (isLoading) return <p className='mx-auto container'>Loading...</p>;
  if (error) return <p className='mx-auto container'>Error : {error.message} + {error}</p>;
  // console.log('data:', data.product)

  // const product = data;
  // const selectedProduct = { ...product }

  // console.log('viewing', product)

  const dispatchProduct = () => {
    // if (selectedAttribute.length > 0) {
    //   selectedProduct.selectedAttribute = selectedAttribute;
    //   console.log('added', selectedProduct)
    //   dispatch(
    //     productsAdded(productsAdded)
    //     // productsAdded(selectedProduct) // try this if above does not work !
    //   );
    // } else {
    //   alert('Please Select an Attribute Before Adding To Cart');
    // }
  }

  console.log('product', product)

  const imageSelector = (e) => {
    setDisplayedImage(e.target.id)
  }

  if (product !== null) {
    const { name, brand, inStock, description, prices, gallery, attributes } = product

    return (
      <>
        {!isLoading &&
          <div className='container mx-auto mt-pdp'>
            <div className='grid-container mt-pdp'>

              <div className='pdp-left-container'>
                <div>
                  {gallery?.map((image, index) => <img className='pdp-sml-photos' onClick={imageSelector} id={index} key={index} src={image} alt="" />)}
                </div>
                <div>
                  {Array.isArray(gallery) && <img className='pdp-big-photo' src={gallery[displayedImage]} alt="" />}
                </div>
              </div>

              <div className=''>
                <p className='pdp-title'>{brand}</p>
                <div className='pdp-subtitle'>{name}</div>

                <div>
                  {Array.isArray(attributes) && attributes[0] && <p className='size-color-price'>{capAllLettersFunc(attributes[0].name)}:</p>}
                  <div className='flex mt-20'>

                    {/* For Colors Values */}
                    {
                      Array.isArray(attributes) && attributes[0] && attributes[0].name === 'Color'
                      &&
                      <div className='flex'>
                        {
                          attributes[0].items.map(item => {
                            return (
                              <div
                                onClick={(e) => setSelectedAttribute(`${e.target.innerHTML}`)}
                                key={item.id}
                                className='color-boxes'
                                style={{ border: selectedAttribute === item.value ? '1px solid #5ECE7B' : '1px solid #D3D2D5', background: `${item.value}`, color: 'transparent' }}>{item.value}
                              </div>
                            )
                          })
                        }
                      </div>
                    }

                    {/* For Other values */}
                    {
                      Array.isArray(attributes) && attributes[0] && attributes[0].name !== 'Color'
                      &&
                      attributes[0].items.map(item => {
                        return (
                          <div
                            key={item.id}
                            onClick={(e) => setSelectedAttribute(`${e.target.innerHTML}`)}
                            style={{ background: selectedAttribute === item.value ? '#1D1F22' : '', color: selectedAttribute === item.value ? '#fff' : '#000' }}
                            className='size-boxes relative'>{item.value}
                          </div>
                        )
                      })
                    }
                  </div>
                </div>

                <div>
                  <div>
                    <p className='size-color-price'>PRICE:</p>
                    {Array.isArray(prices) && prices[0] && <p className='price'>{prices[0].currency.symbol}{prices[0].amount}</p>}
                  </div>
                  <div className='add-to-cart-div'>
                    <button
                      className='add-to-cart-btn cursor-pointer'
                      onClick={() => dispatchProduct()}
                      style={inStock ? { background: '#5ECE7B', border: '2px solid #5ECE7B' } : { pointerEvents: 'none', background: 'grey', border: '2px solid grey' }} >
                      {inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                    </button>
                  </div>
                  <p className='pdp-desc' dangerouslySetInnerHTML={{__html: `${description}`}}></p>
                </div>

              </div>
            </div>
          </div>
        }
      </>
    )
  }
}




export default PDP