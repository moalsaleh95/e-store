import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { capAllLettersFunc } from '../hooks/capAllLetter';
import { useDispatch, useSelector } from 'react-redux';
import { productAdded } from '../features/product/cartSlice';
import { fetchProduct } from '../features/product/pdpSlice';
import ColorAttribute from './ColorAttribute';
import OtherAttributes from './OtherAttributes';
// import { useQuery } from '@apollo/client';
// import { productsAdded } from '../features/product/cartSlice';
// import { GET_PRODUCT } from '../queries/queries';

const PDP = () => {
  const { id } = useParams();
  const [selectedAttribute, setSelectedAttribute] = useState({});
  const [displayedImage, setDisplayedImage] = useState(0);
  const [attributesArrayLen, setAttributesArrayLen] = useState(1)
  const ProductsInCart = useSelector((state) => state.productsAdded);
  const selectedCurrencyIndex = ProductsInCart.selectedCurrencyIndex

  // console.log('ProductsInCart', ProductsInCart)
  const isLoading = useSelector((state) => state.pdpProduct?.isLoading);
  const error = useSelector((state) => state.pdpProduct?.error);

  const dispatch = useDispatch();

  // fetches the product:
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  // console.log('selectedCurrencyIndex:',selectedCurrencyIndex)

  // selects the fetched product
  const product = useSelector((state) => state.pdpProduct?.product);
  console.log('product:',product)

  // sets how many attributes the product has i.e. length:
  useEffect(() => {
    setAttributesArrayLen(product?.attributes.length)
    // console.log('attributesArrayLen', attributesArrayLen)
  }, [product])

  if (isLoading) return <p className='mx-auto container'>Loading...</p>;
  if (error) return <p className='mx-auto container'>Error : {error.message} + {error}</p>;

  const selectedProduct = { ...product }

  function removeQuotes(str) {
    return str.replace(/"/g, '');
  }

  // dispatch selected product with its attributes:
  const dispatchProduct = () => {
    if (Object.entries(selectedAttribute).length === attributesArrayLen) {
      selectedProduct.selectedAttribute = selectedAttribute;
      // change product id
      const newActionAttribute = removeQuotes(JSON.stringify(selectedProduct.selectedAttribute).split(' ').sort().join());
      selectedProduct.id = id + newActionAttribute
      // add quantity key to product - default is 1:
      selectedProduct.quantity = 1;
      // console.log('added', selectedProduct)
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

              <div className='pdp-right-container'>
                <div className='pdp-title'>{brand}</div>
                <div className='pdp-subtitle'>{name}</div>

                <div>
                  {Object.values(attributes).map(value => {

                    {/* For Colors attribute */ }
                    if (value.name === 'Color') {
                      return (
                        <ColorAttribute selectedAttribute={selectedAttribute} setSelectedAttribute={setSelectedAttribute} value={value} />
                      )
                    }
                    else {
                      {/* For Other attribute */ }
                      return (
                        <OtherAttributes selectedAttribute={selectedAttribute} setSelectedAttribute={setSelectedAttribute} value={value} />
                      )
                    }
                  })}
                </div>

                <div>
                  <div>
                    <p className='size-color-price'>PRICE:</p>
                    {Array.isArray(prices) && prices[selectedCurrencyIndex] && <p className='price'>{prices[selectedCurrencyIndex].currency.symbol}{prices[selectedCurrencyIndex].amount}</p>}
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