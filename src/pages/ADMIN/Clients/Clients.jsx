import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api/api';
import PaginatedTable from '../../../components/table/PaginatedTable';
import privateRoutes from '../../../routes/privateRoutes';
import ClientModal from '../../../components/modal/ClientModal';


const columns = [
  { id: 'clientCode', label: 'Código' },
  { id: 'CNPJ', label: 'CNPJ' },
  { id: 'name', label: 'Nome' },
  { id: 'phone', label: 'Telefone' },
  { id: 'country', label: 'País' },
  { id: 'region', label: 'Região' },
  { id: 'state', label: 'Estado' },
  { id: 'city', label: 'Cidade' },
  { id: 'street', label: 'Rua' },
  { id: 'number', label: 'Número' },
  { id: 'zipCode', label: 'CEP' }
];

export default function Clients() {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState('');

  const handleOpenModal = (clients) => {
    setSelectedClient(clients)
    setOpen(true)
  }

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients');
      setClients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <>
    <ClientModal open={open} client={selectedClient} handleClose={() => setOpen(false)} refetch={fetchClients}></ClientModal>
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
        <Typography fontSize={22}>Clientes</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigate(privateRoutes.CRIAR_CLIENTE)}>
          Criar Cliente
        </Button>
      </Box>
      <PaginatedTable items={clients} columns={columns} onRowClick={handleOpenModal}/>
    </Paper>
    </>
  );
}
