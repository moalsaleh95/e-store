import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../features/product/cartSlice';
import CartProduct from './CartProduct';

class Cart extends Component {
  incrementFunc = (e) => {
    this.props.dispatch(increment(e?.target?.id))
  }

  decrementFunc = (e) => {
    this.props.dispatch(decrement(e?.target?.id))
  }

  render() {
    const { productsAdded } = this.props;
    const selectedCurrencyIndex = productsAdded.selectedCurrencyIndex;
    const totalCartQuantity = productsAdded.totalQuantity;
    const totalCartCost = productsAdded.totalPrice;

    console.log('productsAdded', productsAdded)

    return (
      <>
        <div className='container mx-auto mt-80 mb-80'>
          <span className='cart-categoty'>CART</span>
          <hr className='divider'></hr>
          {
            productsAdded.products.map(item => {
              console.log('item:', item)

              return (
                <>
                  <CartProduct
                    item={item}
                    selectedCurrencyIndex={selectedCurrencyIndex}
                    incrementFunc={this.incrementFunc}
                    decrementFunc={this.decrementFunc}
                  />

                  <hr className='divider-1'></hr>
                </>


              )
            })
          }

          <div className='cart-tax cart-bottom'>Tax 21%: <b>{productsAdded.products[0]?.prices[selectedCurrencyIndex].currency.symbol}{(totalCartCost * 0.21).toFixed(2)}</b></div>
          <div className='cart-quantity cart-bottom'>Quantity: <b>{totalCartQuantity}</b></div>
          <div className='cart-total cart-bottom'>Total: <b>{productsAdded.products[0]?.prices[selectedCurrencyIndex].currency.symbol}{totalCartCost}</b></div>

          <div><a href='#' className='cart-order'>ORDER</a></div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  productsAdded: state.productsAdded,
})

export default connect(mapStateToProps)(Cart);
