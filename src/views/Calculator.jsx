import React, { useState, useEffect } from 'react';
import { useCurrency } from '../contexts/useCurrencyContext';

const CurrencyCalculator = ({setCalculate, setFrom}) => {
  const currency = useCurrency();
  const [amount, setAmount] = useState('1');
  const [amountConvert, setAmountConvert] = useState('1');
  const [fromCurrency, setFromCurrency] = useState(currency.fromCurrency);
  const [toCurrency, setToCurrency] = useState(currency.toCurrency);

  useEffect(() => {
    setAmount('1');
  }, [fromCurrency, toCurrency]);
  useEffect(() => {
    setFromCurrency(currency.fromCurrency);
    setToCurrency(currency.toCurrency);
  }, [currency.fromCurrency, currency.toCurrency]);
  useEffect(() => {
    setAmountConvert(convertedAmount());
  }, [amount]);

  const handleNumberClick = (num) => {
    const prev = amount;
    const newAmount = (prev == '0' ? num.toString() : prev + num)
    setAmount(newAmount);
  };

  const handleClear = () => {
    setAmount('0');
  };

  const handleBackspace = () => {
    setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const handleDecimalPoint = () => {
    if (!amount.includes('.')) {
      setAmount((prev) => prev + '.');
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertedAmount = (mountA = amount) => {
    const tasaA = fromCurrency.monedas[0].valor_en_usd;
    const tasaB = toCurrency.monedas[0].valor_en_usd;
    const mountB = (mountA/tasaA) * tasaB;
    return mountB
  };
  const dateNow = (date = new Date()) => {
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day < 10 ?'0'+ day : day }/${month < 10 ?'0'+ month : month }/${year}`;
  }

  const Button = ({ children, onClick, className = '' }) => (
    <button
      className={`bg-gray-700 text-white text-2xl font-bold p-4 rounded-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  function showCalculate(from){
    if(from){
      setFrom(true);
    }else{
      setFrom(false);
    }
    setCalculate(false);
  }

  return (
    <div className="bg-gray-800 text-white p-4 w-full rounded-xl shadow-lg absolute bottom-0">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2"
          onClick={()=>{showCalculate(true)}}
          >
          <img width={'30px'} src={fromCurrency.url_imagen} alt={"img-"+fromCurrency.monedas[0].codigo} />
          </span>
          <span className="text-3xl font-bold">{parseFloat(amount).toLocaleString()}</span>
        </div>
        <div className="flex items-center"
        >
          <span className="text-2xl mr-2" 
          onClick={()=>{showCalculate(false)}}>
            <img width={'30px'} src={toCurrency.url_imagen} alt={"img-"+toCurrency.monedas[0].codigo} />
          </span>
          <span className="text-3xl font-bold">{parseFloat(amountConvert).toLocaleString()}</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button onClick={handleClear}>C</Button>
        <Button onClick={handleBackspace}>&larr;</Button>
        <Button onClick={handleSwapCurrencies}>↑↓</Button>
        <Button className="bg-orange-500">÷</Button>
        {[7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', 0].map((item, index) => (
          <Button
            key={index}
            onClick={() => typeof item === 'number' ? handleNumberClick(item) : null}
            className={typeof item !== 'number' ? 'bg-orange-500' : ''}
          >
            {item}
          </Button>
        ))}
        <Button onClick={handleDecimalPoint}>.</Button>
        <Button className="bg-orange-500">=</Button>
      </div>
      <div className="mt-4 text-sm text-gray-400">
        <p>{dateNow()}</p>
        <p>1 {toCurrency.monedas[0].codigo} = {parseFloat(convertedAmount()).toFixed(4)} {fromCurrency.monedas[0].codigo}</p>
      </div>
    </div>
  );
};

export default CurrencyCalculator;