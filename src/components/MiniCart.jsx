import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { capAllLettersFunc } from '../hooks/capAllLetter';
import { increment, decrement } from '../features/product/cartSlice';
import { Component } from 'react';
import { connect } from 'react-redux';

class MiniCart extends Component {
  // = forwardRef((props, ref) => {
  constructor(props) {
    super(props);

    this.state = {
      isopen: this.props.isopen,
      selectedCurrencyIndex: null,
    }

    this.incrementFunc = this.incrementFunc.bind(this);
    this.decrementFunc = this.decrementFunc.bind(this);
  }

  incrementFunc(e) {
    this.props.dispatch(increment(e?.target?.id))
  }

  decrementFunc(e) {
    this.props.dispatch(decrement(e?.target?.id))
  }

  render() {
    const { productsAdded } = this.props;
    const { selectedCurrencyIndex, totalQuantity, totalPrice } = productsAdded;
    const { isopen } = this.props;
    // console.log('productsAdded:', productsAdded)

    return (
      <>
        <div className='mini-cart-container scroll absolute' ref={this.props.innerRef} style={isopen ? { display: 'block' } : { display: 'none' }}>
          <div className='mx-auto'>
            <span className='minicart-categoty'><b>My Bag, </b>{totalQuantity} items</span>
            {
              this.props.productsAdded.products.map(item => {
                const { id, brand, name, prices, gallery, quantity, selectedAttribute, attributes } = item;
                const selectedAttributesArray = Object.values(selectedAttribute)

                return (
                  <div className='minicart-container' key={id}>
                    <div className='left-container-minicart'>
                      <div className='minicart-title'>{brand}</div>
                      <div className='minicart-subtitle'>{name}</div>
                      {/* {Array.isArray(prices) && prices[selectedCurrencyIndex] && */}
                      <div className='minicart-price'>
                        {prices[0].currency.symbol}{prices[0].amount}
                      </div>
                      {/* } */}
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
                                        style={{ background: selectedAttribute[value.name] === item.value ? '#1D1F22' : '', color: selectedAttribute[value.name] === item.value ? '#fff' : '#000' }}
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
                        <button className='quant-box-minicart cursor-pointer' onClick={(e) => this.incrementFunc(e)} id={id}>+</button>
                        <div className='quant-minicart'>{quantity}</div>
                        <button className='quant-box-minicart cursor-pointer' onClick={(e) => this.decrementFunc(e)} id={id}>-</button>
                      </div>
                      <div>
                        {gallery?.map((image, index) => <img className='minicart-img' id={index} key={index} src={image} alt="" style={{ display: index === 0 ? 'block' : 'none' }} />)}
                      </div>
                    </div>
                  </div>
                )
              })
            }
            <div className='minicart-total'>
              <span><b>Total</b></span>
              <span><b>{this.props.productsAdded.products[0]?.prices[selectedCurrencyIndex]?.currency.symbol}{totalPrice}</b></span>
            </div>
            <div className='minicart-checkout'>
              <Link to='/cart' className='viewbag'>VIEW BAG</Link>
              <a href='#' className='checkout'>CHECK OUT</a>
            </div>
          </div>
        </div >
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  productsAdded: state.productsAdded,
})

React.forwardRef((props, ref) => <MiniCart innerRef={ref} {...props} />);

export default connect(mapStateToProps)(MiniCart);