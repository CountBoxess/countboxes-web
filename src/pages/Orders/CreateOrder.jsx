import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import OrderForm from '../../components/forms/OrderForm';

export default function CreateOrder() {
  const initialValues = {
    loadCode: '',
    shipping: '',
    address: '',
    clientCode: '',
    products: []
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
        <OrderForm initialValues={initialValues} />
      </Box>
    </Paper>
  );
}
