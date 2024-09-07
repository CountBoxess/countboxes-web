import React from 'react';
import PaginatedTable from '../../components/table/PaginatedTable';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const items = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
  { id: 4, name: 'Product 4', price: 400 },
  { id: 5, name: 'Product 5', price: 500 }
];

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'price', label: 'Price' }
];

export default function Products() {
  const navigate = useNavigate();

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
          onClick={() => navigate('/criar-ordem-de-pedido')}>
          Criar produto
        </Button>
      </Box>
      <PaginatedTable items={items} columns={columns} />
    </Paper>
  );
}
