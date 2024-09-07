import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import ClientForm from '../../../components/forms/ClientForm';
import { api } from '../../../services/api/api';
import { useNavigate } from 'react-router-dom';

export default function CreateClient() {
  const initialValues = {
    CNPJ: '',
    name: '',
    phone: '',
    country: '',
    region: '',
    state: '',
    city: '',
    street: '',
    number: '',
    zipCode: ''
  };

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/clients', values);

      console.log(response);

      navigate('/clientes');
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
        <Typography variant="h4">Criar Cliente</Typography>
      </Box>
      <Box
        sx={{
          padding: 6
        }}>
        <ClientForm initialValues={initialValues} onSubmit={handleSubmit} />
      </Box>
    </Paper>
  );
}
