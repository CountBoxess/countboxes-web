import React, { useState, useEffect } from 'react';
import './style.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Substitua pela URL da sua API
    fetch('https://localhost:3000/users')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Erro ao buscar ordens:', error));
  }, []);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Ordens de pedido</h1>
        <div className="orders-buttons">
          <button>Criar</button>
          <button>Editar</button>
          <button>Excluir</button>
        </div>
      </div>
      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map(user => (
            <div key={user.id} className="order-item">
              #{user.id}
            </div>
          ))
        ) : (
          <p>Carregando ordens...</p>
        )}
      </div>
    </div>
  );
}
