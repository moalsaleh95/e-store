import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header';
import PLP from '../src/components/PLP';
import PDP from '../src/components/PDP';
import Cart from '../src/components/Cart';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<PLP />} />
        <Route path='/pdp' element={<PDP />} />
        <Route path='/Cart' element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
