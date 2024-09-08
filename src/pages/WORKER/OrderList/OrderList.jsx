import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulando requisição de API para listar ordens de compra
    setOrders([
      { id: 1, name: 'Ordem 1', status: 'Pendente' },
      { id: 2, name: 'Ordem 2', status: 'Pendente' }
    ]);
  }, []);

  const handleOrderClick = (orderId) => {
    navigate(`/work/orders/${orderId}`);
  };

  return (
    <div>
      <h1>Ordens de Compra Pendentes</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <button onClick={() => handleOrderClick(order.id)}>{order.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
