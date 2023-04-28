import React, { useEffect, useState } from 'react';
// import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'
// import { GET_PRODUCT } from '../queries/queries';
import { capAllLettersFunc } from '../hooks/capAllLetter';

import { useDispatch, useSelector } from 'react-redux';
// import { productsAdded } from '../features/product/cartSlice';
import { productAdded } from '../features/product/cartSlice';
import { fetchProduct } from '../features/product/pdpSlice';

const PDP = () => {
  const { id } = useParams();
  const [selectedAttribute, setSelectedAttribute] = useState({});
  const [displayedImage, setDisplayedImage] = useState(0);
  const [attributesArrayLen, setAttributesArrayLen] = useState(1)


  const ProductsInCart = useSelector((state) => state.productsAdded);
  console.log('ProductsInCart', ProductsInCart)

  const dispatch = useDispatch();

  // fetches the product:
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const isLoading = useSelector((state) => state.pdpProduct?.isLoading);

  const error = useSelector((state) => state.pdpProduct?.error);
  // selects the fetched product
  const product = useSelector((state) => state.pdpProduct?.product);

  // sets how many attributes the product has i.e. length:
  useEffect(() => {
    setAttributesArrayLen(product?.attributes.length)
    console.log('attributesArrayLen', attributesArrayLen)
  }, [product])


  // useEffect(() => {
  //   console.log('selectedAttribute', selectedAttribute)
  // }, [selectedAttribute])

  if (isLoading) return <p className='mx-auto container'>Loading...</p>;
  if (error) return <p className='mx-auto container'>Error : {error.message} + {error}</p>;

  const selectedProduct = { ...product }

  function removeQuotes(str) {
    return str.replace(/"/g, '');
  }

  const dispatchProduct = () => {
    if (Object.entries(selectedAttribute).length === attributesArrayLen) {
      selectedProduct.selectedAttribute = selectedAttribute;
      // change product id
      const newActionAttribute = removeQuotes(JSON.stringify(selectedProduct.selectedAttribute).split(' ').sort().join());
      selectedProduct.id = id + newActionAttribute
      // add quantity key to product - default is 1:
      selectedProduct.quantity = 1;
      console.log('added', selectedProduct)
      dispatch(productAdded(selectedProduct));
      setSelectedAttribute({})
    } else {
      alert('Please Select a Variation Before Adding To Cart');
    }
  }

  const imageSelector = (e) => {
    setDisplayedImage(e.target.id)
  }

  if (product !== null) {
    const { name, brand, inStock, description, prices, gallery, attributes } = product;

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
                  <img className='pdp-big-photo' src={gallery[displayedImage]} alt="" />
                </div>
              </div>

              <div className=''>
                <p className='pdp-title'>{brand}</p>
                <div className='pdp-subtitle'>{name}</div>

                <div>
                  {Object.values(attributes).map(value => {

                    {/* For Colors attribute */ }
                    if (value.name === 'Color') {
                      return (
                        <>
                          <p className='size-color-price'>{capAllLettersFunc(value.name)}:</p>
                          <div className='flex mt-20'>
                            {value.items.map(item => {
                              return (
                                <div
                                  onClick={(e) => setSelectedAttribute({ ...selectedAttribute, [value.name]: `${e.target.innerHTML}` })}
                                  key={item.id}
                                  className='color-boxes'
                                  style={{ border: Object.values(selectedAttribute).includes(item.value) ? '1px solid #5ECE7B' : '1px solid #D3D2D5', background: `${item.value}`, color: 'transparent' }}>{item.value}
                                </div>
                              )
                            })
                            }
                          </div>
                        </>
                      )
                    }
                    else {
                      {/* For Other attribute */ }
                      return (
                        <>
                          <p className='size-color-price'>{capAllLettersFunc(value.name)}:</p>
                          <div className='flex mt-20'>
                            {value.items.map(item => {
                              return (
                                <div
                                  key={item.id}
                                  onClick={(e) => setSelectedAttribute({ ...selectedAttribute, [value.name]: `${e.target.innerHTML}` })}
                                  style={{ background: Object.values(selectedAttribute).includes(item.value) ? '#1D1F22' : '', color: Object.values(selectedAttribute).includes(item.value) ? '#fff' : '#000' }}
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
                  <p className='pdp-desc' dangerouslySetInnerHTML={{ __html: `${description}` }}></p>
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