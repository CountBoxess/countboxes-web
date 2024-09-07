import PaginatedTable from '../../../components/table/PaginatedTable';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api/api';
import React, { useEffect, useState } from 'react';

const columns = [
  { id: 'productCode', label: 'Código' },
  { id: 'description', label: 'Descrição' },
  { id: 'grossWeight', label: 'Peso Bruto' },
  { id: 'netWeight', label: 'Peso Liquido' },
  { id: 'unit', label: 'Unidade' }
];

// const columns = [
//   { id: 'name', label: 'Name' },
//   { id: 'price', label: 'Price' }
// ];

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Paper
      sx={{
        marginX: 12,
        marginY: 8
      }}>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <Typography fontSize={22}>Produtos</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigate('/criar-produto')}>
          Criar produto
        </Button>
      </Box>
      <PaginatedTable items={products} columns={columns} />
    </Paper>
  );
}
