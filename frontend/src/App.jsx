import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Header from './components/Header';
import PLP from './components/PLP';
import PDP from './components/PDP';
import Cart from './components/Cart';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});


function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route element={<PLP />} >
            <Route path='/' element={<PLP />} />
            <Route path='/:cat' element={<PLP />} />
          </Route>
          <Route path='/:cat/:id' element={<PDP />} />
          <Route path='/Cart' element={<Cart />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
