import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENCIES } from '../queries/queries';

const Currency = (props) => {

  const {isopen} = props;
  const { error, loading, data } = useQuery(GET_CURRENCIES);

  // console.log('isopen', isopen);

  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>


  return (
    <div className='currency-container' style={ isopen ? {display: 'block'} : {display: 'none'}}>

      {data?.currencies.map((currency) => {
        return (
          <div className='currency-option'>
            {currency.symbol} {currency.label}
          </div>
        )
      })}

    </div>
  )
}

export default Currency