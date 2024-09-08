import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, name: 'Item A', quantity: 10, loaded: 0 },
    { id: 2, name: 'Item B', quantity: 5, loaded: 0 }
  ]);

  const handleScanItem = (itemId) => {
    navigate(`/work/orders/${orderId}/items/${itemId}/scan`);
  };

  return (
    <div>
      <h1>Detalhes da Ordem {orderId}</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <button onClick={() => handleScanItem(item.id)}>
              {item.name} - {item.loaded}/{item.quantity} Carregado
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
