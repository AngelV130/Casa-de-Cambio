import React, { useState, useEffect } from 'react';

export default function CurrencyModal({ isOpen, onClose, onAdd, data }) {
  const [name, setName] = useState(data?.name);
  const [code, setCode] = useState(data?.code);
  const [exchangeRate, setExchangeRate] = useState(data?.exchangeRate);
  const [image, setImage] = useState(data?.image);
  const [index, setIndex] = useState(data?.image);
  const currencies = JSON.parse(localStorage.getItem('countries')) || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    // onAdd({ name, code, exchangeRate, image });
    // onClose();
  };
  useEffect(() => {
    setName(data?.name);
    setCode(data?.code);
    setExchangeRate(data?.exchangeRate);
    setImage(data?.image);
    setIndex(data?.index);
  },[data])
  function save(){
    const data = {
        "nombre_oficial": name,
        "url_imagen": image,
        "monedas": [
            {
                "codigo": code,
                "simbolo": code,
                "valor_en_usd": parseFloat(exchangeRate)
            }
        ]
    }
    currencies.push(data);
    localStorage.setItem('countries', JSON.stringify(currencies));
    onClose();
  }
  function edit(){
    const data = {
        "nombre_oficial": name,
        "url_imagen": image,
        "monedas": [
            {
                "codigo": code,
                "simbolo": code,
                "valor_en_usd": parseFloat(exchangeRate)
            }
        ]
    }
    currencies[Number(index)] = data;
    console.log(currencies[Number(index)]);
    localStorage.setItem('countries', JSON.stringify(currencies));
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999999]">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-white text-xl font-bold mb-4">AGREGAR MONEDA</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre"
              className="w-full bg-gray-700 text-white p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Abreviación"
              className="w-full bg-gray-700 text-white p-2 rounded"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              step="0.01"
              placeholder="Tipo de cambio a UDS"
              className="w-full bg-gray-700 text-white p-2 rounded"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Imagen (URL)"
              className="w-full bg-gray-700 text-white p-2 rounded"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              CANCELAR
            </button>
            {
              (index == '' || index == undefined) ? 
              (
                  <button
                  type="button"
                  onClick={save}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  AGREGAR
                </button>
              ) 
              : 
              (
                <button
                  type="button"
                  onClick={edit}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  EDITAR
                </button>
              )

            }
          </div>
        </form>
      </div>
    </div>
  );
}