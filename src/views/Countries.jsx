import React, { useState } from 'react';
import datos_paises from '../mocks/datos_paises.json';
import AddCountries from './AddCountries';

import { useCurrency } from '../contexts/useCurrencyContext';

let Data = (JSON.parse(localStorage.getItem('countries')) || []);
if(Data.length === 0){
  Data = datos_paises;
  localStorage.setItem('countries', JSON.stringify(datos_paises));
}

const currencies = Data.map((country) => {
    return {
        nombre_oficial: country?.nombre_oficial || 'SIN NOMBRE',
        monedas: country?.monedas.length > 0 ? country?.monedas : [{codigo: 'SIN CODIGO', valor_en_usd: 1}],
        url_imagen: country?.url_imagen || 'https://via.placeholder.com/150',
        };
    }
);

export default function Countries({setCalculate, from}) {
  const currency = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState(false);
  const filteredCurrencies = currencies
  .filter(currency =>
    currency.nombre_oficial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.monedas[0].codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function changueCountry(newCurrency){
    if(from){
      currency.changeCurrency('from',newCurrency);
    }else{
      currency.changeCurrency('to',newCurrency);
    }
    setCalculate(true)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <AddCountries 
        isOpen={modal}
        onClose={() => setModal(false)}
        onAdd={(currency) => {
          currencies.push(currency);
          setModal(false);
        }}
      />
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center mb-4">
          <span className="mr-2 text-2xl cursor-pointer"
          onClick={()=>{setCalculate(true)}}
          >&larr;</span>
          <h1 className="text-xl font-bold">Monedas</h1>
        </header>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-800 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">&#128269;</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCurrencies.map((currency) => (
            <div key={currency.monedas[0].codigo + currency.nombre_oficial} className="flex items-center bg-gray-800 p-4 rounded-md hover:scale-105 hover:cursor-pointer"
            onClick={()=>{changueCountry(currency)}}
            >
              <span className="text-2xl mr-3"><img width={'80px'} src={currency.url_imagen} alt={"img-"+currency.monedas[0].codigo} /></span>
              <div>
                <p>{currency.nombre_oficial}</p>
                <p className="text-gray-400">{currency.monedas[0].codigo}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="fixed bottom-4 right-4 bg-green-500 rounded-full p-3 w-12 h-12 flex items-center 
        justify-center text-2xl hover:scale-105"
        onClick={() => setModal(true)}
        >
          +
        </button>
      </div>
    </div>
  );
}