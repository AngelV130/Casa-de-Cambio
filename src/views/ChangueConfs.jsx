import React, { useState, useEffect } from 'react';

export default function CurrencyModal({ isOpen, onClose }) {
  const [confData, setConfData] = useState({
    name_sucursal: '',
    direction: '',
    colonia: '',
    city: '',
    state: '',
    cp: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    let data = localStorage.getItem('confData');
    if(data){
      data = JSON.parse(data);
      setConfData(data);
    }
  },[])
  function save(){
    const data = confData;
    localStorage.setItem('confData', JSON.stringify(data));
    onClose();
  }
  function setData(target){
    const name = target.name;
    const value = target.value;
    setConfData({
      ...confData,
      [name]: value
    });
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
              placeholder="Nombre Sucursal"
              className="w-full bg-gray-700 text-white p-2 rounded"
              value={confData?.name_sucursal}
              name='name_sucursal'
              onChange={(e) => setData(e.target)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Dirección"
              className="w-full bg-gray-700 text-white p-2 rounded"
              value={confData?.direction}
              name='direction'
              onChange={(e) => setData(e.target)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Colonia"
              className="w-full bg-gray-700 text-white p-2 rounded"
              value={confData?.colonia}
              name='colonia'
              onChange={(e) => setData(e.target)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Ciudad"
              className="w-full bg-gray-700 text-white p-2 rounded"
              value={confData?.city}
              name='city'
              onChange={(e) => setData(e.target)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Estado"
              className="w-full bg-gray-700 text-white p-2 rounded"
              value={confData?.state}
              name='state'
              onChange={(e) => setData(e.target)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Código Postal"
              className="w-full bg-gray-700 text-white p-2 rounded"
              value={confData?.cp}
              name='cp'
              onChange={(e) => setData(e.target)}
              required
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
              type="button"
              onClick={save}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              ACTUALIZAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}