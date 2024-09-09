// @ts-nocheck
/* eslint-disable react/prop-types */
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import validateCPF from '../../utils/validateCPF';

export const schema = Yup.object({
  name:
  Yup.string()
      .required('O nome é obrigatório'),

  cpf:
  Yup.string()
      .required('O CPF é obrigatório')
      .test('validate-cpf', 'CPF inválido', value => validateCPF(value)),


  phone:
  Yup.string()
      .required('O telefone é obrigatório'),

  type:
  Yup.string()
      .required('O tipo é obrigatório.'),


  email:
  Yup.string()
      .email('Email incorreto.')
      .required('O Email é obrigatório.'),
});

export default function UserForm({ initialValues, onSubmit, isUserCodeReadOnly, isModal}) {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mb={2}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nome"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="cpf"
          name="cpf"
          label="CPF"
          onChange={formik.handleChange}
          value={formik.values.cpf}
          error={formik.touched.cpf && Boolean(formik.errors.cpf)}
          helperText={formik.touched.cpf && formik.errors.cpf}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
      <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Telefone"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
      <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          variant="outlined"
        />
      </Box>
    
    { !isModal && (
      <>
      <Box mb={2}>
      <TextField
          fullWidth
          id="password"
          name="password"
          label="Senha"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          variant="outlined"
          />
      </Box>
      <Box mb={2}>
      <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirme a senha"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          variant="outlined"
          />
      </Box>
      </>
      )}
     
      <Box mb={2}>
      <TextField
          fullWidth
          id="type"
          name="type"
          label="Tipo"
          onChange={formik.handleChange}
          value={formik.values.type}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="active"
            value={formik.values.active}
            name="active"
            label="Status"
            onChange={formik.handleChange}
          >
            <MenuItem value={true}>Ativo</MenuItem>
            <MenuItem value={false}>Inativo</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2
        }}>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{
            width: '100%'
          }}>
          Enviar
        </Button>
        {!isModal && (
          <Button
          variant="contained"
          onClick={() => navigate('/veiculos')}
          sx={{
            width: '100%',
            backgroundColor: '#f44336',
            ':hover': {
              backgroundColor: '#d32f2f'
            }
          }}
          >
          Cancelar
        </Button>
        )}
      </Box>
    </form>
  );
}
