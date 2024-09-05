/* eslint-disable react/prop-types */
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { OrderStatus } from '../../utils/enums';

export const schema = Yup.object({
  loadCode: Yup.number().required('O código da carga é obrigatório.'),
  shipping: Yup.number().required('O frete é obrigatório.'),
  address: Yup.string().required('O endereço é obrigatório.'),
  clientCode: Yup.number().required('O código do cliente é obrigatório.'),
  status: Yup.string()
    .transform((value) => (value ? value.toUpperCase() : value))
    .oneOf(Object.values(OrderStatus), 'Status inválido.')
    .required('O status é obrigatório.')
});

export default function OrderForm({ initialValues, onSubmit }) {
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
          id="loadCode"
          name="loadCode"
          label="Código da carga"
          onChange={formik.handleChange}
          value={formik.values.loadCode}
          error={formik.touched.loadCode && Boolean(formik.errors.loadCode)}
          helperText={formik.touched.loadCode && formik.errors.loadCode}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="shipping"
          name="shipping"
          label="Frete"
          onChange={formik.handleChange}
          value={formik.values.shipping}
          error={formik.touched.shipping && Boolean(formik.errors.shipping)}
          helperText={formik.touched.shipping && formik.errors.shipping}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="address"
          name="address"
          label="Endereço"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="clientCode"
          name="clientCode"
          label="Código do cliente"
          onChange={formik.handleChange}
          value={formik.values.clientCode}
          error={formik.touched.clientCode && Boolean(formik.errors.clientCode)}
          helperText={formik.touched.clientCode && formik.errors.clientCode}
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
            {Object.values(OrderStatus).map((status) => (
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
