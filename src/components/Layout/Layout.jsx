import React from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  // ListItemIcon,
  ListItemText
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const drawerList = ['Usuarios', 'Ordens de serviço', 'Cargas', 'Produtos'];

  const DrawerList = (
    <Box sx={{ width: 300, textAlign: 'center' }} role="presentation">
      <List>
        {drawerList.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={() => navigate(`/`)}>
              {/* <ListItemIcon></ListItemIcon> */}
              <ListItemText
                primary={item}
                sx={{
                  textAlign: 'center'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <Drawer variant="permanent">{DrawerList}</Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </>
  );
}
