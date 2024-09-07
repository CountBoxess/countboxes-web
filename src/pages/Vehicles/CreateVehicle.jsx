import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import VehicleForm from '../../components/forms/VehicleForm';
import { api } from '../../services/api/api';
import { useNavigate } from 'react-router-dom';

export default function CreateVehicle() {
  const initialValues = {
    plate: '',
    model: '',
    type: ''
  };

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/vehicles', values);

      console.log(response);

      navigate('/veiculos');
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
        <Typography variant="h4">Criar veículo</Typography>
      </Box>
      <Box
        sx={{
          padding: 6
        }}>
        <VehicleForm initialValues={initialValues} onSubmit={handleSubmit} />
      </Box>
    </Paper>
  );
}
