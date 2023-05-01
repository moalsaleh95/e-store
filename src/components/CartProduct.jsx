import React, { Component } from 'react';
import { capAllLettersFunc } from '../hooks/capAllLetter';
import arrow from '../assets/icons/arrow.svg';

class CartProduct extends Component {
  constructor(props) {
    super(props);

    const { item } = this.props;
    const { gallery } = item;

    this.state = {
      galleryIndex: 0,
      galleryLength: gallery.length,
    };
  }

  showPrevImage = () => {
    this.setState(prevState => ({
      galleryIndex: prevState.galleryIndex > 0 ? prevState.galleryIndex - 1 : 0,
    }));
  };

  showNextImage = () => {
    const { galleryLength, galleryIndex } = this.state;
    this.setState(prevState => ({
      galleryIndex:
        prevState.galleryIndex < galleryLength - 1 ? prevState.galleryIndex + 1 : prevState.galleryIndex,
    }));
  };

  render() {
    const { item, selectedCurrencyIndex, incrementFunc, decrementFunc } = this.props;
    const { galleryIndex, galleryLength } = this.state;

    const { id, brand, name, prices, gallery, quantity, selectedAttribute, attributes } = item;

    const selectedAttributesArray = Object.values(selectedAttribute);

    return (
      <div className="cart-container" id={id} key={id}>
        <div className="left-container-cart">
          <div className="cart-title">{brand}</div>
          <div className="cart-subtitle">{name}</div>
          {Array.isArray(prices) && prices[selectedCurrencyIndex] && (
            <div>
              <div className="cart-price">
                {prices[selectedCurrencyIndex].currency.symbol}
                {prices[selectedCurrencyIndex].amount}
              </div>
            </div>
          )}

          <div>
            {Object.values(attributes).map(value => {
              if (value.name === 'Color') {
                return (
                  <>
                    <p className="cart-size-color-price">{capAllLettersFunc(value.name)}:</p>
                    <div className="flex mt-20">
                      {value.items.map(item => {
                        return (
                          <div
                            key={item.id}
                            className="color-boxes"
                            style={{
                              border: selectedAttributesArray.includes(item.value)
                                ? '1px solid #5ECE7B'
                                : '1px solid #D3D2D5',
                              background: `${item.value}`,
                              color: 'transparent',
                            }}>
                            {item.value}
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <p className="cart-size-color-price">{capAllLettersFunc(value.name)}:</p>
                    <div className="flex mt-20">
                      {value.items.map(item => {
                        return (
                          <div
                            key={item.id}
                            style={{
                              background:
                                selectedAttribute[value.name] === item.value ? '#1D1F22' : '',
                              color: selectedAttribute[value.name] === item.value ? '#fff' : '#000',
                            }}
                            className="size-boxes relative">
                            {item.value}
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
        <div className="right-container-cart">
          <div className="quantity-container">
            <button
              className="quant-box cursor-pointer"
              onClick={e => incrementFunc(e)}
              id={id}>
              +
            </button>
            <div className="quant">{quantity}</div>
            <button className='quant-box cursor-pointer' onClick={(e) => decrementFunc(e)} id={id}>-</button>
          </div>
          <div className='relative mx-auto'>
              <img className='cart-img' src={gallery[galleryIndex]} alt=""  />
              <div className='arrows-container' style={ galleryLength > 1 ? {visibility: 'visible'} : {visibility: 'hidden'} }>
                  <div><img onClick={this.showPrevImage} src={arrow} alt="" className='arrow' /></div>
                  <div><img onClick={this.showNextImage} src={arrow} alt="" className='arrow right-arrow' /></div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartProduct;
             
