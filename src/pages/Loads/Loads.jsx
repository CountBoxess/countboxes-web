import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api/api';
import PaginatedTable from '../../components/table/PaginatedTable';

const columns = [
  { id: 'loadCode', label: 'Código' },
  { id: 'vehicleCode', label: 'Codigo do veiculo' },
  { id: 'status', label: 'status' }
];

export default function Loads() {
  const navigate = useNavigate();

  const [loads, setLoads] = useState([]);

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
    <Paper>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <Typography fontSize={22}>Cargas </Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigate('/criar-ordem-de-pedido')}>
          Criar ordem de pedido
        </Button>
      </Box>
      <PaginatedTable items={loads} columns={columns} />
    </Paper>
  );
}
