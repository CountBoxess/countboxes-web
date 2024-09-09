import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import OrderForm from '../../../components/forms/OrderForm';
import { api } from '../../../services/api/api';
import { useNavigate } from 'react-router-dom';

export default function CreateOrder() {
  const initialValues = {
    loadCode: '',
    shipping: '',
    address: '',
    clientCode: '',
    status: ''
  };

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/orders', values);

      console.log(response);

      navigate('/ordens-de-pedido');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Typography variant="h4">Criar Ordem de Pedido</Typography>
      </Box>
      <Box
        sx={{
          padding: 6
        }}>
        <OrderForm initialValues={initialValues} onSubmit={handleSubmit} />
      </Box>
    </Paper>
  );
}
