import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import LoadForm from '../../components/forms/LoadForm';
import { api } from '../../services/api/api';
import { useNavigate } from 'react-router-dom';

export default function CreateLoad() {
  const initialValues = {
    vehicleCode: '',
    userCode: '',
    status: ''
  };

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/loads', values);

      console.log(response);

      navigate('/cargas');
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
        <Typography variant="h4">Criar Carga</Typography>
      </Box>
      <Box
        sx={{
          padding: 6
        }}>
        <LoadForm initialValues={initialValues} onSubmit={handleSubmit} />
      </Box>
    </Paper>
  );
}
