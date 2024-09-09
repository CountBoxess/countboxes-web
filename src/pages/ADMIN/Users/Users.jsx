import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import PaginatedTable from '../../../components/table/PaginatedTable';
import { api } from '../../../services/api/api';
import UserModal from '../../../components/modal/UserModal';

const columns = [
  { id: 'userCode', label: 'Código' },
  { id: 'name', label: 'Nome' },
  { id: 'cpf', label: 'CPF' },
  { id: 'phone', label: 'Telefone' },
  { id: 'type', label: 'Tipo' },
  { id: 'active', label: 'Ativo', format: (value) => (value ? 'Ativo' : 'Inativo') },
  { id: 'email', label: 'Email' },
];

export default function Users() {
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState('');

  const handleOpenModal = (users) => {
    setSelectedUser(users);

    setOpen(true);
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      const mappedUsers = response.data.map(user => ({
        ...user,
        active: user.active ? 'Ativo' : 'Inativo'
      }))
      setUsers(mappedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <UserModal open={open} user={selectedUser} handleClose={() => setOpen(false)} />
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
          <Typography fontSize={22}>Usuários</Typography>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => navigate('/criar-usuario')}>
            Criar usuário
          </Button>
        </Box>
        <PaginatedTable items={users} columns={columns} onRowClick={handleOpenModal} />
      </Paper>
    </>
  );
}
