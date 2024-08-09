import React from 'react';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  // ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const drawerList = [
    {
      text: 'Usuarios',
      path: '/usuarios'
    }
  ];

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 3
        }}>
        <Avatar
          src="https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg"
          sx={{
            width: 60,
            height: 60,
            marginTop: 1,
            marginBottom: 3
          }}
        />
        <Box>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 'bold'
            }}>
            John Doe
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              wordWrap: 'break-word'
            }}>
            sdaadaadadsaadd@gmail.com
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        {drawerList.map((route) => (
          <ListItem key={route.text} disablePadding>
            <ListItemButton onClick={() => navigate(`${route.path}`)}>
              {/* <ListItemIcon></ListItemIcon> */}
              <ListItemText
                primary={route.text}
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
