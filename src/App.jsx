/* eslint-disable react/prop-types */
import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { AuthProvider, useAuth } from './context/AuthContext';

import PageLoading from './components/loading/PageLoading';
import DrawerLayout from './components/layout/DrawerLayout';

import privateRoutes from './routes/privateRoutes';
import publicRoutes from './routes/publicRoutes';
import workerRoutes from './routes/workerRoutes';

import {
  CreateLoad,
  CreateOrder,
  CreateVehicle,
  CreateClient,
  Home,
  Loads,
  Orders,
  Products,
  Users,
  Vehicles,
  Clients
} from './pages/ADMIN';
import { SignIn } from './pages/PUBLIC';
import { ItemScannerPage, Main, OrderDetail, OrderList } from './pages/WORKER';
import CreateProduct from './pages/ADMIN/Products/CreateProduct';
import { OrderDetails } from './pages/ADMIN/OrderProducts/OrderDetails';
import CreateUser from './pages/ADMIN/Users/CreateUser';

function App() {
  const defaultTheme = createTheme();
  const Private = ({ children }) => {
    const { authenticated, loading, user } = useAuth();

    if (loading) return <PageLoading />;

    if (!authenticated) {
      return <Navigate to={publicRoutes.SIGNIN} />;
    }

    if (user.type != 'ADMIN') {
      return <Navigate to={workerRoutes.MAIN} />;
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
        return <Navigate to={workerRoutes.MAIN} />;
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
              path={privateRoutes.CRIAR_USUARIO}
              element={
                <Private>
                  <DrawerLayout>
                    <CreateUser />
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
              path={'/ordens-de-pedido/:orderId'}
              element={
                <Private>
                  <DrawerLayout>
                    <OrderDetails />
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
              path={privateRoutes.CLIENTES}
              element={
                <Private>
                  <DrawerLayout>
                    <Clients />
                  </DrawerLayout>
                </Private>
              }
            />
            <Route
              path={privateRoutes.CRIAR_CLIENTE}
              element={
                <Private>
                  <DrawerLayout>
                    <CreateClient />
                  </DrawerLayout>
                </Private>
              }
            />
            <Route
              path={privateRoutes.CRIAR_PRODUTO}
              element={
                <Private>
                  <DrawerLayout>
                    <CreateProduct />
                  </DrawerLayout>
                </Private>
              }
            />
            <Route
              path={workerRoutes.MAIN}
              element={
                <Worker>
                  <Main />
                </Worker>
              }
            />
            <Route
              path={workerRoutes.ORDERLIST}
              element={
                <Worker>
                  <OrderList />
                </Worker>
              }
            />
            <Route
              path={workerRoutes.ORDERDETAILS}
              element={
                <Worker>
                  <OrderDetail />
                </Worker>
              }
            />
            <Route
              path={workerRoutes.ITEMSCANNER}
              element={
                <Worker>
                  <ItemScannerPage />
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
