/* eslint-disable react/prop-types */
// @ts-nocheck
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { api } from '../../services/api/api';
import OrderProductForm from '../forms/OrderProductForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function OrderProductModal({ open, product, handleClose, refetch }) {
  if (!product) return null;

  const initialValues = {
    quantity: product.quantity
  };

  const handleSubmit = async (values) => {
    try {
      const response = await api.put(`orders/products/${product.orderProductCode}`, values);

      console.log(response);

      refetch();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <OrderProductForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            isProductCodeReadOnly={true}></OrderProductForm>
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
      </Box>
    </Modal>
  );
}
