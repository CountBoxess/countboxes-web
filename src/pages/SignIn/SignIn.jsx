import React from 'react';
import { useFormik } from 'formik';
import { useAuth } from '../../context/AuthContext';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import backgroundImage from '../../assets/images/loginBackground.jpg';

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
    onSubmit: () => handleSubmit(),
    validationSchema: loginSchema
  });

  const handleSubmit = () => {
    handleLogin(formik.values.email, formik.values.password);
  };

  return (
    <Box
      component="main"
      sx={{
        width: '100vw',
        height: '100vh',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
      <CssBaseline />
      <Box
        sx={{
          padding: '16px',

          // background: rgba( 255, 255, 255, 0.25 );
          // box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
          // backdrop-filter: blur( 8px );
          // -webkit-backdrop-filter: blur( 8px );
          // border-radius: 10px;
          // border: 1px solid rgba( 255, 255, 255, 0.18 );

          background: 'rgb(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '10px'
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 4,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Typography variant="h4" fontWeight={700}>
            COUNT
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              letterSpacing: 4,
              marginLeft: 0.6
            }}>
            BOXES
          </Typography>
        </Box>
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
        <Container component="form" onSubmit={formik.handleSubmit}>
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
            sx={{
              '::-ms-fill': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
              }
            }}
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
        </Container>
      </Box>
    </Box>
  );
}

export default SignIn;
