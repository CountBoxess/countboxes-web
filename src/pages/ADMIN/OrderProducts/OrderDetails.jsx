import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../services/api/api';
import OrderDetailsInfo from '../../../components/details/OrderDetailsInfo';

export function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState({});

  const fetchOrder = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder(orderId);
  }, [orderId]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 5,
          alignItems: 'start',
          flexDirection: 'column',
          height: '100vh', // Use 100vh para ocupar toda a altura da tela
          padding: 2, // Adiciona um espaçamento interno
          backgroundColor: '#f5f5f5' // Cor de fundo para melhor contraste
        }}>
        <Button
          variant="contained"
          onClick={() => navigate(-1)} // Navegar para a página anterior
          sx={{ marginBottom: 2 }}>
          Voltar
        </Button>
        <Paper
          sx={{
            padding: 2, // Adiciona um pouco de padding interno
            width: '100%',
            height: 'auto', // Garante que o Paper ocupe toda a largura disponível
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Typography
            fontSize={22}
            style={{
              textAlign: 'center'
            }}>
            Ordem {orderId}
          </Typography>
        </Paper>
        <OrderDetailsInfo order={order} />
      </Box>
    </>
  );
}
