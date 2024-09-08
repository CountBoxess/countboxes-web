import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api/api';
import PaginatedTable from '../../../components/table/PaginatedTable';
import VehicleModal from '../../../components/modal/VehicleModal';

const columns = [
  { id: 'plate', label: 'Placa' },
  { id: 'model', label: 'Modelo' },
  { id: 'type', label: 'Tipo' },
  { id: 'active', label: 'Ativo', format: (value) => (value ? 'Ativo' : 'Inativo') }
];

export default function Vehicles() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [selectedVehicle, setSelectedVehicle] = React.useState('')

  const handleOpenModal = (vehicles) => {
    setSelectedVehicle(vehicles)

    setOpen(true)
  }

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/vehicles');
      const mappedVehicles = response.data.map(vehicle => ({
        ...vehicle,
        active: vehicle.active ? 'Ativo' : 'Inativo'
      }));
      setVehicles(mappedVehicles);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <>
    <VehicleModal open={open} vehicle={selectedVehicle} handleClose={() => setOpen(false)} refetch={fetchVehicles}/>
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
        <Button startIcon={<Add />} variant="contained" onClick={() => navigate('/criar-veiculo')}>
          Criar veículo
        </Button>
      </Box>
      <PaginatedTable items={vehicles} columns={columns} onRowClick={handleOpenModal}/>
    </Paper>
    </>
  );
}
