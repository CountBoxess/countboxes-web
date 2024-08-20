import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import routes from './routes/routes';
import SignIn from './pages/SignIn/SignIn';
import Users from './pages/Users/Users';
import Orders from './pages/Orders/Orders'
import Loads from "./pages/Loads/Loads"
function App() {
  const defaultTheme = createTheme();

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path={routes.SIGNIN} element={<SignIn />} />
            <Route path={routes.HOME} element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={routes.USUARIOS} element={<Users />} />
              <Route path={routes.ORDENS_DE_PEDIDO} element={<Orders />} />
              <Route path={routes.CARGAS} element={<Loads />} />

            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
