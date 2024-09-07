/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import routes from '../../routes/routes';
import { ExitToApp, Inventory2, LocalShipping, ReceiptLong, Garage} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

export default function DrawerLayout({ children }) {
  const navigate = useNavigate();

  const { handleLogout, user } = useAuth();

  const drawerList = [
    { text: 'Home', path: routes.HOME, icon: <DashboardIcon /> },
    { text: 'Pedidos', path: routes.ORDENS_DE_PEDIDO, icon: <ReceiptLong /> },
    { text: 'Cargas', path: routes.CARGAS, icon: <LocalShipping /> },
    { text: 'Produtos', path: routes.PRODUTOS, icon: <Inventory2 /> },
    { text: 'Veículos', path: routes.VEICULOS, icon: <Garage /> }
  ];

  const DrawerList = (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      role="presentation">
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 4,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Typography variant="h4" fontWeight={700}>
            COUNT
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              letterSpacing: 4,
              marginLeft: 0.6
            }}>
            BOXES
          </Typography>
        </Box>
        <List>
          {drawerList.map((route) => (
            <ListItem key={route.text} disablePadding>
              <ListItemButton onClick={() => navigate(route.path)}>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ p: 2 }}>
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', maxWidth: 150 }} noWrap>
              Olá, {user.name}
            </Typography>
            <Typography sx={{ fontSize: 14, color: 'gray' }}>{user.email}</Typography>
          </Box>
          <Button
            sx={{
              marginLeft: 'auto',
              backgroundColor: 'white',
              color: 'gray',
              textTransform: 'none'
            }}
            onClick={() => handleLogout()}>
            <ExitToApp />
            <Typography sx={{ fontSize: 14, color: 'gray' }}>Sair</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 300,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' }
        }}>
        {DrawerList}
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
