// @ts-nocheck
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ProductForm from '../forms/ProductForm';
import { api } from '../../services/api/api';
import { styled } from '@mui/material';
const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProductModal({open, orderId, handleClose}) {
  
  
  const [orders, setOrders] = React.useState(null)
  
  
  const fetchOrders = async () => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      console.log(response)
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  React.useEffect(() => {
    console.log(orderId)
    fetchOrders()

  }, [open])
  
  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            orders &&
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Div>Código da ordem: {orderId}</Div>
            <Div>Endereço: {orders.address}</Div>
            <Div>Frete: {orders.shipping}</Div>
            <Div>Status: {orders.status}</Div>
          </Typography>
          }
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
        </Box>
      </Modal>
  );
}