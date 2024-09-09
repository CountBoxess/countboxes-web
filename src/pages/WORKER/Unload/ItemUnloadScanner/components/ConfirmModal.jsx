/* eslint-disable react/prop-types */
import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

export default function ConfirmModal({ open, onConfirm, onCancel }) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '50%',
          backgroundColor: '#f7f7f7',
          boxShadow: 24,
          p: 4,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '8px'
        }}>
        <Typography>ITEM ESCANEADO COM SUCESSO</Typography>
        <Button onClick={onConfirm}>Confirmar</Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </Box>
    </Modal>
  );
}
