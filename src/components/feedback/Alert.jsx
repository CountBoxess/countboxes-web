import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';
import { useAlertStore } from '../../store/useAlertStore.js';

const AlertMUI = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alert = () => {
  const { alert, closeAlert } = useAlertStore();

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={5000}
      onClose={closeAlert}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      sx={{
        maxWidth: '350px'
      }}>
      <AlertMUI onClose={closeAlert} severity={alert.type} sx={{ width: '100%' }}>
        {alert.message}
      </AlertMUI>
    </Snackbar>
  );
};

export default Alert;
