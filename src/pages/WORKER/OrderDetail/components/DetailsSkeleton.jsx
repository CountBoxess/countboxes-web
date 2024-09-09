import React from 'react';
import { Box, Skeleton } from '@mui/material';

export default function DetailsSkeleton() {
  return (
    <Box
      sx={{
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: 2,

        backgroundColor: '#fff',
        borderRadius: 2,
        margin: 2
      }}>
      <Skeleton variant="rounded" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
    </Box>
  );
}
