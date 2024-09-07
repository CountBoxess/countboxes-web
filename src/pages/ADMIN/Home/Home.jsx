import { Box, Skeleton, Typography } from '@mui/material';
import React from 'react';

const TOP_SKELETON_STYLE = {
  flex: 1,
  borderRadius: 2
};

export default function Home() {
  return (
    <Box
      sx={{
        backgroundColor: '#151515',
        height: '100vh',

        paddingX: 8,
        paddingY: 4
      }}>
      <Box
        sx={{
          height: 'auto',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',

          padding: '6px'
        }}>
        <Typography variant="h4" fontWeight={500}>
          Visão Geral
        </Typography>
      </Box>

      <Box
        sx={{
          // backgroundColor: '#d806bc66',

          display: 'flex',
          flexDirection: 'column',
          gap: 2,

          height: '90%'
        }}>
        <Box
          sx={{
            display: 'flex',
            gap: 3,

            flex: 1
          }}>
          <Skeleton variant="rectangular" height={'100%'} width={'100%'} sx={TOP_SKELETON_STYLE} />
          <Skeleton variant="rectangular" height={'100%'} width={'100%'} sx={TOP_SKELETON_STYLE} />
          <Skeleton variant="rectangular" height={'100%'} width={'100%'} sx={TOP_SKELETON_STYLE} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 3,

            flex: 2
          }}>
          <Box
            sx={{
              // backgroundColor: '#00ff37',
              display: 'flex',
              flexDirection: 'column',
              flex: 6,
              gap: 3
            }}>
            <Skeleton
              variant="rectangular"
              height={400}
              sx={{
                flex: 1,
                borderRadius: 2
              }}
            />
            <Skeleton
              variant="rectangular"
              height={400}
              sx={{
                flex: 1,
                borderRadius: 2
              }}
            />
          </Box>
          <Box
            sx={{
              // backgroundColor: '#003cff',
              display: 'flex',
              flexDirection: 'row',
              flex: 4,
              gap: 3
            }}>
            <Skeleton
              variant="rectangular"
              height={'100%'}
              width={'100%'}
              sx={{
                borderRadius: 2
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
