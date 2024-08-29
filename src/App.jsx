import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import routes from './routes/routes';

import Layout from './components/Layout/Layout';

import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import Users from './pages/Users/Users';
import Orders from './pages/Orders/Orders';
import Loads from './pages/Loads/Loads';
import CreateOrder from './pages/Orders/CreateOrder';
import Products from './pages/Products/Products';

function App() {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path={routes.SIGNIN} element={<SignIn />} />
            <Route path={routes.HOME} element={<Home />} />
            <Route path={routes.USUARIOS} element={<Users />} />
            <Route path={routes.ORDENS_DE_PEDIDO} element={<Orders />} />
            <Route path={routes.CARGAS} element={<Loads />} />
            <Route path={routes.CRIAR_ORDEM_DE_PEDIDO} element={<CreateOrder />} />
            <Route path={routes.PRODUTOS} element={<Products />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
