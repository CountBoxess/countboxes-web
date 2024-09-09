import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { api } from '../../../services/api/api';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../../../components/forms/ProductForm';

export default function CreateProduct() {
  const initialValues = {
    productCode: '',
    description: '',
    grossWeight: '',
    netWeight: '',
    unit: ''
  };

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/products', values);

      console.log(response);
 
      navigate('/produtos');
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
        <Typography variant="h4">Criar Produto</Typography>
      </Box>
      <Box
        sx={{
          padding: 6
        }}>
        <ProductForm initialValues={initialValues} onSubmit={handleSubmit} isProductCodeReadOnly={false}/>
      </Box>
    </Paper>
  );
}
