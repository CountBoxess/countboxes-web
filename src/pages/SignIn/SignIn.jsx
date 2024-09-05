import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuth } from '../../context/AuthContext';
import routes from '../../routes/routes';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const loginSchema = Yup.object({
  email: Yup.string().email('Insira um email válido.').required('Insira um email.'),
  password: Yup.string().required('Insira sua senha.')
});

function SignIn() {
  const { handleLogin } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      handleLogin(values.email, values.password);

      console.log(values);
    },
    validationSchema: loginSchema
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Typography
            component="h5"
            variant="h6"
            sx={{
              fontWeight: 'bold',
              marginTop: '16px',
              textAlign: 'center'
            }}>
            Acesse sua conta!
          </Typography>
          <Container component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={routes.RECOVER_PASSWORD} variant="body2" sx={{ textDecoration: 'none' }}>
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link to={routes.LOGIN} variant="body2" sx={{ textDecoration: 'none' }}>
                  {'Criar conta'}
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
