import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api/api';
import PaginatedTable from '../../../components/table/PaginatedTable';
import privateRoutes from '../../../routes/privateRoutes';
import LoadModal from '../../../components/modal/LoadModal';

const columns = [
  { id: 'loadCode', label: 'Código' },
  { id: 'vehicleCode', label: 'Codigo do veiculo' },
  { id: 'userCode', label: 'Codigo do usuario' },
  { id: 'status', label: 'status' }
];

export default function Loads() {
  const navigate = useNavigate();

  const [loads, setLoads] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedLoad, setSelectedLoad] = React.useState('');

  const handleOpenModal = (loads) => {
    setSelectedLoad(loads);
    setOpen(true);
  };

  const fetchLoads = async () => {
    try {
      const response = await api.get('/loads');
      setLoads(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLoads();
  }, []);

  return (
    <>
      <LoadModal
        open={open}
        load={selectedLoad}
        handleClose={() => setOpen(false)}
        refetch={fetchLoads}></LoadModal>
      <Paper
        sx={{
          marginX: 12,
          marginY: 8
        }}>
        <Box
          sx={{
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Typography fontSize={22}>Cargas</Typography>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => navigate(privateRoutes.CRIAR_CARGA)}>
            Criar Carga
          </Button>
        </Box>
        <PaginatedTable items={loads} columns={columns} onRowClick={handleOpenModal} />
      </Paper>
    </>
  );
}
