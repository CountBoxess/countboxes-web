import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

const Main = () => {
  const navigate = useNavigate();

  const handleLoadOrders = () => {
    navigate('/work/orders');
  };

  const { handleLogout } = useAuth();

  return (
    <Box
      sx={{
        backgroundColor: '#f7f7f7',
        height: '100vh'
      }}>
      <Box
        sx={{
          backgroundColor: '#3687dd',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          position: 'fixed',
          width: '100%',

          boxShadow: '0px 0px 20px #8d8d8d'
        }}>
        <Typography
          sx={{
            fontWeight: 700,
            color: '#f7f7f7'
          }}>
          COUNT BOXES
        </Typography>
        <Button
          sx={{
            color: '#f7f7f7'
          }}
          onClick={handleLogout}>
          <ExitToApp />
          SAIR
        </Button>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Button
          onClick={handleLoadOrders}
          variant="contained"
          sx={{
            height: 52
          }}>
          Fazer um carregamento
        </Button>
      </Box>
    </Box>
  );
};

export default Main;
