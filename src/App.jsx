/* eslint-disable react/prop-types */
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import CreateLoad from './pages/Loads/CreateLoad';
import { AuthProvider, useToken } from './context/AuthContext';
import PageLoading from './components/loading/PageLoading';

function App() {
  const defaultTheme = createTheme();

  const Private = ({ children }) => {
    const { authenticated, loading } = useToken();

    if (loading) return <PageLoading />;

    if (!authenticated) {
      return <Navigate to={routes.SIGNIN} />;
    }

    return children;
  };

  const Public = ({ children }) => {
    const { authenticated, loading } = useToken();

    if (loading) return <PageLoading />;

    if (authenticated) {
      return <Navigate to={routes.HOME} />;
    }

    return children;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path={routes.SIGNIN}
              element={
                <Public>
                  <SignIn />
                </Public>
              }
            />
            <Route
              path={routes.HOME}
              element={
                <Private>
                  <Home />
                </Private>
              }
            />
            <Route
              path={routes.USUARIOS}
              element={
                <Private>
                  <Users />
                </Private>
              }
            />
            <Route
              path={routes.ORDENS_DE_PEDIDO}
              element={
                <Private>
                  <Orders />
                </Private>
              }
            />
            <Route
              path={routes.CARGAS}
              element={
                <Private>
                  <Loads />
                </Private>
              }
            />
            <Route
              path={routes.CRIAR_CARGA}
              element={
                <Private>
                  <CreateLoad />
                </Private>
              }
            />
            <Route
              path={routes.CRIAR_ORDEM_DE_PEDIDO}
              element={
                <Private>
                  <CreateOrder />
                </Private>
              }
            />
            <Route
              path={routes.PRODUTOS}
              element={
                <Private>
                  <Products />
                </Private>
              }
            />
            <Route path="*" element={<h1>404: NOT FOUND</h1>} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
