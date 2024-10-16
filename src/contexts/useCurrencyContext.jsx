import React, { createContext, useContext, useState } from 'react';

// Define the shape of our context
const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState({
    "nombre_oficial": "Estados Unidos Mexicanos",
    "url_imagen": "banderas/Mexico.png",
    "monedas": [
        {
            "codigo": "MXN",
            "simbolo": "$",
            "valor_en_usd": 19.412767
        }
    ]
});
  const [toCurrency, setToCurrency] = useState({
    "nombre_oficial": "Georgia del Sur y las Islas Sandwich del Sur",
    "url_imagen": "banderas/South Georgia.png",
    "monedas": [
        {
            "codigo": "SHP",
            "simbolo": "£",
            "valor_en_usd": 0.761794
        }
    ]
});

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