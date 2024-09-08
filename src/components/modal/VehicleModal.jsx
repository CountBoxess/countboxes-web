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
import VehicleForm from '../forms/VehicleForm';

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


export default function VehicleModal({open, vehicle, handleClose}) {
  const navigate = useNavigate();


  const initialValues = {
    // Não tem como trocar a placa pois não tem verificação se ja existe a placa na api
    plate: vehicle.plate,
    model: vehicle.model,
    type: vehicle.type,
    active: vehicle.active
  };
  
  const handleSubmit = async (values) => {
    try {
      const response = await api.put(`/vehicles/${vehicle.vehicleCode}`, values);
  
      console.log(response);

      window.location.reload()
  
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
            <VehicleForm initialValues={initialValues} onSubmit={handleSubmit} isPlateReadOnly={true} isModal={true}></VehicleForm>
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
        </Box>
      </Modal>
  );
}