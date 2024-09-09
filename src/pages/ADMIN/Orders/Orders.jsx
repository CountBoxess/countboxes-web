import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api/api';
import PaginatedTable from '../../../components/table/PaginatedTable';
// import ProductModal from '../../../components/modal/productModal';

const columns = [
  { id: 'orderCode', label: 'Código' },
  { id: 'address', label: 'Endereço' },
  { id: 'shipping', label: 'Frete' },
  { id: 'status', label: 'Status' }
];

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [setOpen] = React.useState(false);
  const [setSelectedOrder] = React.useState('');

  const handleOpenModal = (orderId) => {
    setSelectedOrder(orderId);

    setOpen(true);
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {/* <ProductModal open={open} orderId={selectedOrder} handleClose={() => setOpen(false)}/> */}
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
          <Typography fontSize={22}>Ordens de pedido</Typography>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => navigate('/criar-ordem-de-pedido')}>
            Criar ordem de pedido
          </Button>
        </Box>
        <PaginatedTable items={orders} columns={columns} onRowClick={handleOpenModal} />
      </Paper>
    </>
  );
}
