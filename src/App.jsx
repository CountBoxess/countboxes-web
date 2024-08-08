import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import routes from './routes/routes';
import SignIn from './pages/SignIn/SignIn';

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
              <Route path={routes.USUARIOS} element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
