import React, { useState, useEffect } from 'react';
import './style.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Substitua pela URL da sua API de usuários
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(prevUserId => (prevUserId === userId ? null : userId));
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>Usuários</h1>
      </div>
      <div className="users-list">
        {users.length > 0 ? (
          users.map(user => (
            <div key={user.userCode} className="user-item-container">
              <div
                className="user-item"
                onClick={() => handleUserClick(user.userCode)}
              >
                {user.name}
              </div>
              {}
              {selectedUserId === user.userCode && (
                <div className="user-details">
                  <h2>Detalhes do Usuário</h2>
                  <p><strong>ID:</strong> {user.userCode}</p>
                  <p><strong>Nome:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Telefone:</strong> {user.phone}</p>
                  <p><strong>Tipo:</strong> {user.type}</p>
                  <p><strong>Ativo:</strong> {user.active ? 'Ativo' : 'Inativo'}</p>

                  {}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Carregando usuários...</p>
        )}
      </div>
    </div>
  );
}
