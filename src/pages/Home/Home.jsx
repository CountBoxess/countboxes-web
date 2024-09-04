import { Button } from '@mui/material';
import React from 'react';
import { useToken } from '../../context/AuthContext';

export default function Home() {
  const { handleLogout } = useToken();

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <Button onClick={() => handleLogout()}>Sair</Button>
    </div>
  );
}
