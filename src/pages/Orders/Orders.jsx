import React, { useState, useEffect } from 'react';
import './style.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Substitua pela URL da sua API
    fetch('https://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Erro ao buscar ordens:', error));
  }, []);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Ordens de pedido</h1>
      </div>
      <div className="orders-list"></div>
    </div>
  );
}
