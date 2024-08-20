import React, { useState, useEffect } from 'react';
import './style.css';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Substitua pela URL da sua API de usuários
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>Usuários</h1>
        <div className="users-buttons">
          <button>Criar</button>
          <button>Editar</button>
          <button>Excluir</button>
        </div>
      </div>
      <div className="users-list">
        {users.length > 0 ? (
          users.map(user => (
            <div key={user.id} className="user-item">
              {user.name}
            </div>
          ))
        ) : (
          <p>Carregando usuários...</p>
        )}
      </div>
    </div>
  );
}
