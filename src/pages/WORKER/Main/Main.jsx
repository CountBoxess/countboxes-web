import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const handleLoadOrders = () => {
    navigate('/work/orders');
  };

  return (
    <div>
      <h1>Bem-vindo ao Sistema de Carregamento</h1>
      <button onClick={handleLoadOrders}>Carregar Ordens de Compra</button>
    </div>
  );
};

export default Main;
