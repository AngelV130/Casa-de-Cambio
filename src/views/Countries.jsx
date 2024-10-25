import React, { useState, useEffect } from 'react';
import datos_paises from '../mocks/datos_paises.json';
import AddCountries from './AddCountries';

import { useCurrency } from '../contexts/useCurrencyContext';


export default function Countries({setCalculate, from}) {
  const currency = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState(false);
  const [dataSelected, setDataSelected] = useState();
  const [filteredCurrencies, setFilteredCurrencies] = useState();
  function changueCountry(newCurrency){
    if(from){
      currency.changeCurrency('from',newCurrency);
    }else{
      currency.changeCurrency('to',newCurrency);
    }
    setCalculate(true)
  }
  function setData(data,index){
    index = String(index);
    setDataSelected({
      name: data?.nombre_oficial || '',
      code: data?.monedas[0].codigo || '',
      exchangeRate: data?.monedas[0].valor_en_usd || '',
      image: data?.url_imagen || '',
      index: index,
    })
  }

  useEffect(()=>{
    // Leer data de localStorage
    const data_countries = JSON.parse(localStorage.getItem('countries')) || [];
    setFilteredCurrencies(
      data_countries.map((country) => {
      return {
          nombre_oficial: country?.nombre_oficial || 'SIN NOMBRE',
          monedas: country?.monedas.length > 0 ? country?.monedas : [{codigo: 'SIN CODIGO', valor_en_usd: 1}],
          url_imagen: country?.url_imagen || 'https://via.placeholder.com/150',
          };
      }).filter(currency =>
        currency.nombre_oficial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.monedas[0].codigo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  },[modal])
  useEffect(()=>{
    // Leer data de localStorage
    const data_countries = JSON.parse(localStorage.getItem('countries')) || [];
    setFilteredCurrencies(
      data_countries.map((country) => {
      return {
          nombre_oficial: country?.nombre_oficial || 'SIN NOMBRE',
          monedas: country?.monedas.length > 0 ? country?.monedas : [{codigo: 'SIN CODIGO', valor_en_usd: 1}],
          url_imagen: country?.url_imagen || 'https://via.placeholder.com/150',
          };
      }).filter(currency =>
        currency.nombre_oficial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.monedas[0].codigo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  },[])
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <AddCountries 
        isOpen={modal}
        onClose={() => setModal(false)}
        onAdd={(currency) => {
          currencies.push(currency);
          setModal(false);
        }}
        data={{
          name: dataSelected?.name || '',
          code: dataSelected?.code || '',
          exchangeRate: dataSelected?.exchangeRate || '',
          image: dataSelected?.image || '',
          index: dataSelected?.index
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
            onChange={
              (e) =>{
                setSearchTerm(e.target.value);
                // Filtrar currencies
                const data_countries = (JSON.parse(localStorage.getItem('countries')) || []).map((country) => {
                  return {
                      nombre_oficial: country?.nombre_oficial || 'SIN NOMBRE',
                      monedas: country?.monedas.length > 0 ? country?.monedas : [{codigo: 'SIN CODIGO', valor_en_usd: 1}],
                      url_imagen: country?.url_imagen || 'https://via.placeholder.com/150',
                      };
                  }).filter(currency =>
                    currency.nombre_oficial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    currency.monedas[0].codigo.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                setFilteredCurrencies(
                  data_countries.filter(currency =>
                    currency.nombre_oficial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    currency.monedas[0].codigo.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                );
              }
            }
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">&#128269;</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCurrencies && filteredCurrencies.map((currency, index) => (
            <div key={currency.monedas[0].codigo + currency.nombre_oficial} className="flex items-center bg-gray-800 p-4 rounded-md hover:scale-105 hover:cursor-pointer relative"
            
            >
              <span className="text-2xl mr-3"><img width={'80px'} src={currency.url_imagen} alt={"img-"+currency.monedas[0].codigo} /></span>
              <div onClick={()=>{changueCountry(currency)}}>
                <p>{currency.nombre_oficial}</p>
                <p className="text-gray-400">{currency.monedas[0].codigo}</p>
              </div>
              <button className='absolute right-3 bottom-2'
              onClick={()=>{setData(currency,index); setModal(true)}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <path fill="currentColor" 
                  d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h8.386l-1 1H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h12.77q.23 0 .423-.192t.192-.423v-7.489l1-1v8.489q0 .69-.462 1.153T18.384 20zM10 14v-2.615l8.944-8.944q.166-.166.348-.23t.385-.063q.189 0 .368.064t.326.21L21.483 3.5q.16.166.242.365t.083.4t-.061.382q-.06.18-.226.345L12.52 14zm10.814-9.715l-1.112-1.17zM11 13h1.092l6.666-6.666l-.546-.546l-.61-.584L11 11.806zm7.212-7.211l-.61-.585zl.546.546z"/>
                  </svg>
              </button>
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