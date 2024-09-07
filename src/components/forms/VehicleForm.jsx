/* eslint-disable react/prop-types */
import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import validatePlate from '../../utils/validatePlate';

export const schema = yup.object({
    plate: yup
    .string()
    .required('Placa é obrigatória')
    .test('validate-plate', 'Placa Inválida', value => validatePlate(value)),

  model: yup
    .string()
    .required('Modelo é obrigatório'),

  type: yup
    .string()
    .required('Tipo é obrigatório'),
});

export default function VehicleForm({ initialValues, onSubmit }) {
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
          id="plate"
          name="plate"
          label="Placa"
          onChange={formik.handleChange}
          value={formik.values.plate}
          error={formik.touched.plate && Boolean(formik.errors.plate)}
          helperText={formik.touched.plate && formik.errors.plate}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="model"
          name="model"
          label="Modelo"
          onChange={formik.handleChange}
          value={formik.values.model}
          error={formik.touched.model && Boolean(formik.errors.model)}
          helperText={formik.touched.model && formik.errors.model}
          variant="outlined"
        />
      </Box>
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
          onAbort={() => formik.resetForm()}
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
