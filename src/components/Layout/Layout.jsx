import React from 'react';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Layout({ children }) {
  const navigate = useNavigate();

  const drawerList = [
    { text: 'Usuarios', path: '/usuarios' },
    { text: 'Ordens de pedido', path: '/ordens-de-pedido' },
    { text: 'Cargas', path: '/cargas' }
  ];

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation">
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
        <Avatar
          src="https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg"
          sx={{ width: 60, height: 60, marginTop: 1, marginBottom: 3 }}
        />
        <Box>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>John Doe</Typography>
          <Typography sx={{ fontSize: 16, wordWrap: 'break-word' }}>example@email.com</Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        {drawerList.map((route) => (
          <ListItem key={route.text} disablePadding>
            <ListItemButton onClick={() => navigate(route.path)}>
              <ListItemText primary={route.text} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
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
