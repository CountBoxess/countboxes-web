import React, { useState, useEffect } from 'react';
import './style.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>Usuários</h1>
      </div>
    </div>
  );
}
