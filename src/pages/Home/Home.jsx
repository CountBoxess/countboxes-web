import { Button } from '@mui/material';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  const { handleLogout } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <Button onClick={() => handleLogout()}>Sair</Button>
    </div>
  );
}
