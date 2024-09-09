import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { api } from '../../../services/api/api';

const LoadedOrderList = () => {
  const [LoadedOrders, setLoadedOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoadedOrders = async () => {
      const response = await api.get('/orders/loaded');

      setLoadedOrders(response.data);
    };

    fetchLoadedOrders();
  }, []);

  const handleLoadedOrderClick = (orderId) => {
    navigate(`/work/loaded/orders/${orderId}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f7f7f7',
        minHeight: '100vh'
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
        <Button
          sx={{
            color: '#f7f7f7'
          }}
          onClick={() => {
            navigate(-1);
          }}>
          <ArrowBack />
          Voltar
        </Button>
        <Typography
          sx={{
            fontWeight: 700,
            color: '#f7f7f7'
          }}>
          COUNT BOXES
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          paddingTop: 10,
          alignItems: 'center'
        }}>
        <Typography variant="overline">Pedidos disponiveis para descarregamento</Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          paddingTop: 2,
          alignItems: 'center',

          paddingBottom: 5
        }}>
        {LoadedOrders.map((order) => (
          <Box
            component={'button'}
            key={order.orderCode}
            sx={{
              backgroundColor: '#f7f7f7',
              boxShadow: '5px 5px 6px #d7d7d7, -5px -5px 6px #ffffff',
              width: '85%',
              height: 40,

              borderRadius: 1,

              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',

              border: 0
            }}
            onClick={() => handleLoadedOrderClick(order.orderCode)}>
            <Typography>{order.orderCode}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LoadedOrderList;
