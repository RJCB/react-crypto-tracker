import { useState } from 'react';
import './_app.scss';
import Header from './components/Header';
import { CurrencyProvider } from './context';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';


function App() {
  return (
    <CurrencyProvider>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/coins/:id' element={<CoinPage />} />
      </Routes>
    </CurrencyProvider>
  );
}

export default App;
