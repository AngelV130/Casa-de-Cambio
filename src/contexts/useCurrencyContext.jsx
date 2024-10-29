import React, { createContext, useContext, useState } from 'react';

// Define the shape of our context
const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const changeCurrency = (type, newCurrency) => {
    if (type === 'from') {
      setFromCurrency(newCurrency);
    } else {
      setToCurrency(newCurrency);
    }
  };

  return (
    <CurrencyContext.Provider 
      value={{
        fromCurrency,
        toCurrency,
        swapCurrencies,
        changeCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook to use the currency context
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};