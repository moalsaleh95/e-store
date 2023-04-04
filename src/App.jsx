import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Header from '../src/components/Header';
import PLP from '../src/components/PLP';
import PDP from '../src/components/PDP';
import Cart from '../src/components/Cart';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query Product {
//         product (id: "huarache-x-stussy-le") {
//           id
//           name
//           brand
//           inStock
//           description
//           category
//       }
//     }
//   `
//   })
//   .then((result) => console.log(result));

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<PLP />} />
          <Route path='/pdp' element={<PDP />} />
          <Route path='/Cart' element={<Cart />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
