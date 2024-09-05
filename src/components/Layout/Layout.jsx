import React from 'react';
import {
  Avatar,
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
import PropTypes from 'prop-types';
import DashboardIcon from '@mui/icons-material/Dashboard';
import routes from '../../routes/routes';
import { ExitToApp, Inventory2, LocalShipping, ReceiptLong } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

export default function Layout({ children }) {
  const navigate = useNavigate();

  const { handleLogout } = useAuth();

  const drawerList = [
    { text: 'Home', path: routes.HOME, icon: <DashboardIcon /> },
    { text: 'Pedidos', path: routes.ORDENS_DE_PEDIDO, icon: <ReceiptLong /> },
    { text: 'Cargas', path: routes.CARGAS, icon: <LocalShipping /> },
    { text: 'Produtos', path: routes.PRODUTOS, icon: <Inventory2 /> }
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
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
          <Avatar
            src="https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg"
            sx={{ width: 60, height: 60, marginTop: 1, marginBottom: 3 }}
          />
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
          <Avatar
            src="https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg"
            sx={{ width: 40, height: 40, marginRight: 2 }}
          />
          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', maxWidth: 150 }} noWrap>
              Andrew D.
            </Typography>
            <Typography sx={{ fontSize: 14, color: 'gray' }}>admin@gmail.com</Typography>
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};
