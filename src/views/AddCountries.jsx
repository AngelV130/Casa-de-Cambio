import React, { useState } from 'react';

export default function CurrencyModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    save();
    // onAdd({ name, code, exchangeRate, image });
    // onClose();
  };

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
    console.log(data);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
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
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              AGREGAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}