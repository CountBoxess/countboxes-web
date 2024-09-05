import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const PageLoading = () => {
  return (
    <Box
      style={{
        width: '100%',
        height: '100%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <CircularProgress />
    </Box>
  );
};
export default PageLoading;
