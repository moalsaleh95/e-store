import React from 'react';
import { connect } from 'react-redux';
import { selectCurrency } from '../features/product/cartSlice';
import { fetchCurrencies } from '../features/product/cartSlice';

class Currency extends React.Component {
  componentDidMount() {
    this.props.fetchCurrencies();
  }

  handleCurrencyClick = (e) => {
    const { currencies } = this.props;
    const currencyIndex = currencies.findIndex((item) => item.label === e.target.id);
    this.props.selectCurrency(currencyIndex);
  };

  render() {
    const { isopen, currencies } = this.props;

    return (
      <div className='currency-container' ref={this.props.forwardedRef} style={isopen ? { display: 'block' } : { display: 'none' }}>
        {currencies.map((currency) => {
          return (
            <div onClick={(e) => this.handleCurrencyClick(e)} id={currency.label} key={currency.label} className='currency-option'>
              {currency.symbol} {currency.label}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.productsAdded?.currencies,
});

export default connect(mapStateToProps, { selectCurrency, fetchCurrencies })(Currency);
