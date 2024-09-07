/* eslint-disable react/prop-types */
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { LoadStatus } from '../../utils/enums';
import { useNavigate } from 'react-router-dom';

export const schema = Yup.object({
  vehicleCode: Yup
    .number()
    .required('O código do veículo é obrigatório.'),

  userCode: Yup
    .number()
    .required('O código do usuário é obrigatório.'),

  status: Yup.string()
    .transform((value) => (value ? value.toUpperCase() : value))
    .oneOf(Object.values(LoadStatus), 'Status inválido.')
    .required('O status é obrigatório.')
});

export default function LoadForm({ initialValues, onSubmit }) {
  const navigate = useNavigate();

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
          id="vehicleCode"
          name="vehicleCode"
          label="Código do Veículo"
          onChange={formik.handleChange}
          value={formik.values.vehicleCode}
          error={formik.touched.vehicleCode && Boolean(formik.errors.vehicleCode)}
          helperText={formik.touched.vehicleCode && formik.errors.vehicleCode}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="userCode"
          name="userCode"
          label="Código do Usuário"
          onChange={formik.handleChange}
          value={formik.values.userCode}
          error={formik.touched.userCode && Boolean(formik.errors.userCode)}
          helperText={formik.touched.userCode && formik.errors.userCode}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.status}
            name="status"
            label="status"
            onChange={formik.handleChange}>
            {Object.values(LoadStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
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
        <Button
          variant="contained"
          onClick={() => {
            formik.resetForm();
            navigate('/cargas');
          }} 
          sx={{
            width: '100%',
            backgroundColor: '#f44336',
            ':hover': {
              backgroundColor: '#d32f2f'
            }
          }}>
          Cancelar
        </Button>
      </Box>
    </form>
  );
}
