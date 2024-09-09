/* eslint-disable react/prop-types */
// @ts-nocheck
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ProductForm from '../forms/ProductForm';
import { api } from '../../services/api/api';
import { styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoadForm from '../forms/LoadForm';
import ClientForm from '../forms/ClientForm';

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


export default function LoadModal({open, client, handleClose, refetch}) {

  const initialValues = {
    CNPJ: client.CNPJ,
    name: client.name,
    phone: client.phone,
    country: client.country,
    region: client.region,
    state: client.state,
    city: client.city,
    street: client.street,
    number: client.number,
    zipCode: client.zipCode
  };

  const handleSubmit = async (values) => {
    try {
      console.log(values)

      const response = await api.put(`/clients/${client.clientCode}`, values);
  
      console.log(response);

      refetch()
      handleClose()
  
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <ClientForm initialValues={initialValues} onSubmit={handleSubmit} isCNPJReadOnly={true} isModal={true}></ClientForm>
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
        </Box>
      </Modal>
  );
}