import PaginatedTable from '../../../components/table/PaginatedTable';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api/api';
import React, { useEffect, useState } from 'react';
import ProductModal from '../../../components/modal/ProductModal';

const columns = [
  { id: 'productCode', label: 'Código' },
  { id: 'description', label: 'Descrição' },
  { id: 'grossWeight', label: 'Peso Bruto' },
  { id: 'netWeight', label: 'Peso Liquido' },
  { id: 'unit', label: 'Unidade' }
];

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState('');

  const handleOpenModal = (product) => {
    setSelectedProduct(product);

    setOpen(true);
  };

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
    <>
      <ProductModal open={open} product={selectedProduct} handleClose={() => setOpen(false)} />
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
        <PaginatedTable items={products} columns={columns} onRowClick={handleOpenModal} />
      </Paper>
    </>
  );
}
