import React, { useState, useEffect } from 'react';
import { useCurrency } from '../contexts/useCurrencyContext';
import ModalConfigs from './ChangueConfs';

const CurrencyCalculator = ({setCalculate, setFrom}) => {
  const currency = useCurrency();
  const [amount, setAmount] = useState('1');
  const [amountConvert, setAmountConvert] = useState('1');
  const [fromCurrency, setFromCurrency] = useState(currency.fromCurrency);
  const [toCurrency, setToCurrency] = useState(currency.toCurrency);
  const [modalConfigsState, setModalConfigsState] = useState(false);

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
    const tasaA = fromCurrency.value;
    const tasaB = toCurrency.value;
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
      <ModalConfigs 
        isOpen={modalConfigsState}
        onClose={() => {setModalConfigsState(false)}}
      />
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2 flex flex-col"
          onClick={()=>{showCalculate(true)}}
          >
          {/* <img width={'30px'} src={fromCurrency.flag_icon} alt={"img-"+fromCurrency.code} /> */}
          {fromCurrency.flag_icon}
            <small className='text-sm'>
            {fromCurrency.name.slice(0, 7) + (fromCurrency.name.length > 7 ? '...':'')}
            </small>
          </span>
          <span className="text-3xl font-bold">{parseFloat(amount).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-8"
        >
          <span className="text-2xl mr-2 flex flex-col" 
          onClick={()=>{showCalculate(false)}}>
            {/* <img width={'30px'} src={} alt={"img-"+toCurrency.code} /> */}
            {toCurrency.flag_icon}
            <small className='text-sm'>
            {toCurrency.name.slice(0, 7) + (toCurrency.name.length > 7 ? '...':'')}
            </small>
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
      <div className="flex justify-between mt-4 text-sm text-gray-400">
        <div>
          <p>{dateNow()}</p>
          <p>
            1 {toCurrency.code} = {parseFloat(convertedAmount()).toFixed(4)} {fromCurrency.code}
          </p>
        </div>
          <p className='cursor-pointer' onClick={() => {setModalConfigsState(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </p>
      </div>
    </div>
  );
};

export default CurrencyCalculator;