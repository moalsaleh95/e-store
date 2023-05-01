import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../features/product/cartSlice';
import CartProduct from './CartProduct';

const Cart = () => {
  const dispatch = useDispatch()
  const ProductsInCart = useSelector((state) => state.productsAdded);
  const selectedCurrencyIndex = ProductsInCart.selectedCurrencyIndex;
  const totalCartQuantity = ProductsInCart.totalQuantity;
  const totalCartCost = ProductsInCart.totalPrice;

  console.log('ProductsInCart', ProductsInCart)

  const incrementFunc = (e) => {
    dispatch(increment(e?.target?.id))
  }

  const decrementFunc = (e) => {
    dispatch(decrement(e?.target?.id))
  }

  return (

    <>
      <div className='container mx-auto mt-80 mb-80'>
        <span className='cart-categoty'>CART</span>
        <hr className='divider'></hr>
        {
          ProductsInCart.products.map(item => {
            console.log('item:', item)

            return (
              <>
                <CartProduct
                  item={item}
                  selectedCurrencyIndex={selectedCurrencyIndex}
                  incrementFunc={incrementFunc}
                  decrementFunc={decrementFunc}
                />

                <hr className='divider-1'></hr>
              </>


            )
          })
        }


        <div className='cart-tax cart-bottom'>Tax 21%: <b>{ProductsInCart.products[0]?.prices[selectedCurrencyIndex].currency.symbol}{(totalCartCost * 0.21).toFixed(2)}</b></div>
        <div className='cart-quantity cart-bottom'>Quantity: <b>{totalCartQuantity}</b></div>
        <div className='cart-total cart-bottom'>Total: <b>{ProductsInCart.products[0]?.prices[selectedCurrencyIndex].currency.symbol}{totalCartCost}</b></div>

        <div><a href='#' className='cart-order'>ORDER</a></div>
      </div>
    </>

  )
}

export default Cart