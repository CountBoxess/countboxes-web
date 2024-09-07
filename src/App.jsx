/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import Home from './pages/ADMIN/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import Users from './pages/ADMIN/Users/Users';
import Orders from './pages/Orders/Orders';
import Loads from './pages/Loads/Loads';
import CreateOrder from './pages/Orders/CreateOrder';
import Products from './pages/Products/Products';
import CreateLoad from './pages/Loads/CreateLoad';
import { AuthProvider, useAuth } from './context/AuthContext';
import PageLoading from './components/loading/PageLoading';
import DrawerLayout from './components/layout/DrawerLayout';
import Vehicles from './pages/Vehicles/Vehicles';
import CreateVehicle from './pages/Vehicles/CreateVehicle';
import privateRoutes from './routes/privateRoutes';
import publicRoutes from './routes/publicRoutes';
import workerRoutes from './routes/workerRoutes';

function App() {
  const defaultTheme = createTheme();

  const Private = ({ children }) => {
    const { authenticated, loading, user } = useAuth();

    if (loading) return <PageLoading />;

    if (!authenticated) {
      return <Navigate to={privateRoutes.SIGNIN} />;
    }

    console.log(user);

    if (user.type != 'ADMIN') {
      return <Navigate to={privateRoutes.ORDENS_DE_PEDIDO} />;
    }

    return children;
  };

  const Worker = ({ children }) => {
    const { authenticated, loading } = useAuth();

    if (loading) return <PageLoading />;

    if (!authenticated) {
      return <Navigate to={privateRoutes.SIGNIN} />;
    }

    return children;
  };

  const Public = ({ children }) => {
    const { authenticated, loading, user } = useAuth();

    if (loading) return <PageLoading />;

    if (authenticated) {
      if (user.type === 'ADMIN') {
        return <Navigate to={privateRoutes.HOME} />;
      } else {
        return <Navigate to={privateRoutes.ORDENS_DE_PEDIDO} />;
      }
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
              path={publicRoutes.SIGNIN}
              element={
                <Public>
                  <SignIn />
                </Public>
              }
            />
            <Route
              path={privateRoutes.HOME}
              element={
                <Private>
                  <DrawerLayout>
                    <Home />
                  </DrawerLayout>
                </Private>
              }
            />
            <Route
              path={privateRoutes.USUARIOS}
              element={
                <Private>
                  <DrawerLayout>
                    <Users />
                  </DrawerLayout>
                </Private>
              }
            />
            <Route
              path={privateRoutes.ORDENS_DE_PEDIDO}
              element={
                <Private>
                  <DrawerLayout>
                    <Orders />
                  </DrawerLayout>
                </Private>
              }
            />
            <Route
              path={privateRoutes.CARGAS}
              element={
                <Private>
                  <DrawerLayout>
                    <Loads />
                  </DrawerLayout>
                </Private>
              }
            />
            <Route
              path={privateRoutes.CRIAR_CARGA}
              element={
                <Private>
                  <DrawerLayout>
                    <CreateLoad />
                  </DrawerLayout>
                </Private>
              }
            />
            <Route
              path={privateRoutes.CRIAR_ORDEM_DE_PEDIDO}
              element={
                <Private>
                  <DrawerLayout>
                    <CreateOrder />
                  </DrawerLayout>
                </Private>
              }
            />
            <Route
              path={privateRoutes.PRODUTOS}
              element={
                <Private>
                  <DrawerLayout>
                    <Products />
                  </DrawerLayout>
                </Private>
              }
            />
            <Route
              path={privateRoutes.VEICULOS}
              element={
                <Private>
                  <DrawerLayout>
                    <Vehicles />
                  </DrawerLayout>
                </Private>
              }
            />
            <Route
              path={privateRoutes.CRIAR_VEICULO}
              element={
                <Private>
                  <DrawerLayout>
                    <CreateVehicle />
                  </DrawerLayout>
                </Private>
              }
            />
            <Route
              path={workerRoutes.HOME}
              element={
                <Worker>
                  <DrawerLayout>
                    <Orders />
                  </DrawerLayout>
                </Worker>
              }
            />
            <Route
              path="*"
              element={
                <Public>
                  <h1>404: NOT FOUND</h1>
                </Public>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
