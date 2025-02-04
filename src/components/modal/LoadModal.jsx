/* eslint-disable react/prop-types */
// @ts-nocheck
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { api } from '../../services/api/api';
import LoadForm from '../forms/LoadForm';

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

export default function LoadModal({ open, load, handleClose, refetch }) {
  const initialValues = {
    loadCode: load.loadCode,
    vehicleCode: load.vehicleCode,
    userCode: load.usercode,
    status: load.status
  };

  const handleSubmit = async (values) => {
    try {
      console.log(values);

      const response = await api.put(`/loads/${load.loadCode}`, values);

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
          <LoadForm initialValues={initialValues} onSubmit={handleSubmit} isModal={true}></LoadForm>
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
      </Box>
    </Modal>
  );
}
