import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CurrencyProvider, useCurrency } from './contexts/useCurrencyContext';

import data from './mocks/data_monedas.json';
localStorage.getItem('countries') || localStorage.setItem('countries', JSON.stringify(data));

createRoot(document.getElementById('root')).render(
  <CurrencyProvider>
    <App />
  </CurrencyProvider>
)
