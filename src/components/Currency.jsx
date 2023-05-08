import React, { forwardRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
// import { GET_CURRENCIES } from '../queries/queries';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrency } from '../features/product/cartSlice';
import { fetchCurrencies } from '../features/product/cartSlice';

const Currency = forwardRef((props, ref) => {
  const {isopen} = props;

  const dispatch = useDispatch()


  // const { error, loading, data } = useQuery(GET_CURRENCIES);

  // console.log('isopen', isopen);

  // fetches the currencies:
  useEffect(()=> {
    dispatch(fetchCurrencies())
  },[dispatch])

  const currencies = useSelector((state) => state.productsAdded?.currencies);
  // console.log('currencies:',currencies)
  // if (error) return <p>Error</p>
  // if (loading) return <p>Loading</p>
  
  
  const handleCurrencyClick = (e) => {
    const currencyIndex = currencies.findIndex(item => item.label === e.target.id)
    dispatch(selectCurrency(currencyIndex))
}

console.log('ref:', ref)

  return (
    <div className='currency-container' ref={ref} style={ isopen ? {display: 'block'} : {display: 'none'}}>

      {currencies.map((currency) => {
        return (
          <div onClick={(e) => handleCurrencyClick(e)} id={currency.label} key={currency.label} className='currency-option'>
            {currency.symbol} {currency.label}
          </div>
        )
      })}

    </div>
  )
})

export default Currency