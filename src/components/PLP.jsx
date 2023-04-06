import React from 'react';
import { useQuery } from '@apollo/client';
import image_1 from '../assets/images/ProductB.png';
import image_2 from '../assets/images/ProductD.png';
import { GET_PRODUCTS } from '../queries/productQueries';

const PLP = () => {
  // const products = [
  //   {
  //     name: 'Apollo Running Short',
  //     price: '$50',
  //     image: image_1
  //   },
  //   {
  //     name: 'Apollo Running Short',
  //     price: '$40',
  //     image: image_2
  //   },
  //   {
  //     name: 'Apollo Running Short',
  //     price: '$50',
  //     image: image_1
  //   },
  //   {
  //     name: 'Apollo Running Short',
  //     price: '$40',
  //     image: image_2
  //   },
  //   {
  //     name: 'Apollo Running Short',
  //     price: '$50',
  //     image: image_1
  //   },
  //   {
  //     name: 'Apollo Running Short',
  //     price: '$40',
  //     image: image_2
  //   }
  // ]

  const { error, loading, data } = useQuery(GET_PRODUCTS)

  if (loading) return <p className='container'>Loading...</p>
  if (error) return (<p className='container'>Error : {error.message}</p>);

  // console.log(data)

  // data.map(cat => (cat.products.map(prod => console.log(prod.name))))

  const productsArray = (data).categories[0].products

  console.log('productsArray', productsArray)
  // (key => {data[key].map(category => {

  // console.log('category.products.length', category.products.length)
  // return category.products

  // category.products.map(product => {
  //   console.log('product.name', product.name)
  //   console.log('product.gallery', product.gallery[0])
  // })
  //   })
  // })

  return (

    <div className='container mx-auto'>

      <p className='plp-header'>Category Name</p>

      <div className='plp-container'>

      {!loading && !error && (
        productsArray.map(product => {

          const { name, gallery } = product
          return (
            <>

                <div className='plp-card relative'>
                  <img src={gallery[0]} alt={name} className='plp-img' />
                  <p className='plp-title'>{name}</p>
                  <p className='plp-price'>$40</p>
                  <img className='greenCart absolute' alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADjElEQVR4nO2a208TQRSH+UuXxHiLxgd9MllEgaiJJApRiZd4CeADJhAFnhQjKFFjyI/SEEo1BaEKFShSUAq9HbMlHayGBw3LGTu/Sc5Lk+nOfN+cc7rdrfPgC8NXY1BH+L7qAaQAUIBoQ2AGQB8ESxDcDPYAUIBoQ2AGQB8ESxDcDPYAUIBoQ2AGQB8ESxDcDPYAUIBoQ2AGQB8ESxDcDPYAUIBoQ2AGQB8ESxDcDPYAUIBoQ2AGQB8ESxDcDPYAOCRgr7FZyEo080Ga4rfUT6STAiqjUCpIe6JbHYqzAoKxkf8hRyPN6mBqUsBecXqyVdK5jFRGx2yP+pqcEuDBl8HUKyPg8Zdn6utxTkBXcsAIGFp+p74e5wS0J7qNAKzF1NfjnIDG6ZtGwNzmgvp6nBNwKnq56peQ9nqcE1CPBsmX8qI1muO33RbgwZelrbQK/GKpKEciTRQQ25hREZDMpliCPPjyZjVioNz91BsqlK7koLnW6zQowIMvA6kRA6V3YShUKKNpmGsF9yBaZdeqHtCZ7DdQXi6/D/Van7NfzbValBqwdQKuJboMlIlMPLTrHI5ckEKpqN6ArRNwLnbjQBpjS/yOFQ3YOgEno5eqHtLUegO2TkA9GmS7mDNwwnouYEsDtk6AB19SWysGztmptppuwFYKmNpIGDhXPj6o6QZspYDR9LgRcG+ub9+/PzjxlRFkgvZ+rRPQnxo2gPoWXoTagAPZ2vu1TsDD+acG0PDK2L5+95nJ1qr6f3/+ifp+rRNwNdEpBzGyxW05NtGivl/rBDTErocOvyQlaZ95pL5XKwWciF4MDfx6/ruMr03L+ekO9X1aK8CDX3UzdtyCMuGcgMWtZSMgKEna63FOwNjaVNV/Ndo3S84JaPvlHaH9Htp7+y8EePDl+dJbCtCW0DHbI3Obi5IvFZgBGgIOjTeWX9r9llsvx2BqpPxZ2HMPMqwtQV75jendh/SVETy4D3suBWAHQnByfx/BZ2HPpQDsDXE1lwl9LgXgz/eEdsvIcOhzKQA7EIKmGYAMTnNwegOAf9OE/3UuBcCdsPpXkOdAUAAoQLQhMAOgD4IlCG4GewAoQLQhMAOgD4IlCG4GewAoQLQhMAOgD4IlCG4GewAoQLQhMAOgD4IlCG4GewAoQLQhMAOgD4IlCG4GewAoQLQhMAOgD4IlCG4GewAoQLQhMAOgD4IlCPowNOInpSaJA2fo428AAAAASUVORK5CYII="></img>
                </div>

            </>
          )
        })
        
        )
      }
      </div>

    </div >
  )
}

export default PLP;