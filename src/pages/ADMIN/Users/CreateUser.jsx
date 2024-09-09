import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { api } from '../../../services/api/api';
import { useNavigate } from 'react-router-dom';
import UserForm from '../../../components/forms/UserForm';

export default function CreateUser() {
  const initialValues = {
    name: '',
    cpf: '',
    phone: '',
    type: '',
    active: '',
    email:  ''
  };

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/users', values);

      console.log(response);

      navigate('/usuarios');
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
        <Typography variant="h4">Criar Usuário</Typography>
      </Box>
      <Box
        sx={{
          padding: 6
        }}>
        <UserForm initialValues={initialValues} onSubmit={handleSubmit} isUserCodeReadOnly={true} isModal={false}/>
      </Box>
    </Paper>
  );
}
