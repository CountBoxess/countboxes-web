/* eslint-disable react/prop-types */
import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

export default function ConfirmModal({ open, onConfirm, onCancel }) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description">
      <Box
        sx={{
          position: 'absolute',
          width: '80%',
          maxWidth: '400px',
          backgroundColor: 'background.paper',
          boxShadow: 24,
          p: 4,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 2,
          textAlign: 'center'
        }}>
        <Typography id="confirm-modal-title" variant="h6" gutterBottom>
          Item escaneado com sucesso
        </Typography>
        <Typography id="confirm-modal-description" variant="body2" color="text.secondary" mb={3}>
          Deseja confirmar a ação?
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Button
            onClick={onCancel}
            variant="outlined"
            color="secondary"
            sx={{ mr: 2, flex: 1 }}>
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="primary"
            sx={{ ml: 2, flex: 1 }}>
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
