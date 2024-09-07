import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api/api';
import PaginatedTable from '../../components/table/PaginatedTable';

const columns = [
  { id: 'plate', label: 'Placa' },
  { id: 'model', label: 'Modelo' },
  { id: 'type', label: 'Tipo' }
];

export default function Vehicles() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
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
        <Typography fontSize={22}>Veículos</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigate('/criar-veiculo')}>
          Criar veículo
        </Button>
      </Box>
      <PaginatedTable items={vehicles} columns={columns} />
    </Paper>
  );
}
