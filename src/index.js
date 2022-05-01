import React from 'react';
import ReactDOM from 'react-dom/client';
import './_index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <BrowserRouter basename="/react-crypto-tracker"> must be used if we want to deploy to Github pages,seems like base-url issue when deployed
  <BrowserRouter basename="/react-crypto-tracker">
    <App />
  </BrowserRouter>
);