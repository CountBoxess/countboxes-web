/* eslint-disable react/prop-types */
import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import validatePlate from '../../utils/validatePlate';
import { useNavigate } from 'react-router-dom';

export const schema = Yup.object({
  productCode:
  Yup.number()
      .required('Código do Produto é obrigatório'),

description:
  Yup.string()
      .optional(),


grossWeight:
  Yup.number()
      .required('Peso Bruto é obrigatório'),

netWeight:
  Yup.number()
      .required('Peso Líquido é obrigatório'),


unit:
  Yup.string()
      .required('Unidade é obrigatório'),
});

export default function ProductForm({ initialValues, onSubmit }) {
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
          id="productCode"
          name="productCode"
          label="Código do Produto"
          onChange={formik.handleChange}
          value={formik.values.productCode}
          error={formik.touched.productCode && Boolean(formik.errors.productCode)}
          helperText={formik.touched.productCode && formik.errors.productCode}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Descrição"
          onChange={formik.handleChange}
          value={formik.values.description}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
      <TextField
          fullWidth
          id="grossWeight"
          name="grossWeight"
          label="Peso bruto"
          onChange={formik.handleChange}
          value={formik.values.grossWeight}
          error={formik.touched.grossWeight && Boolean(formik.errors.grossWeight)}
          helperText={formik.touched.grossWeight && formik.errors.grossWeight}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
      <TextField
          fullWidth
          id="netWeight"
          name="netWeight"
          label="Peso liquido"
          onChange={formik.handleChange}
          value={formik.values.netWeight}
          error={formik.touched.netWeight && Boolean(formik.errors.netWeight)}
          helperText={formik.touched.netWeight && formik.errors.netWeight}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
      <TextField
          fullWidth
          id="unit"
          name="unit"
          label="Unidade"
          onChange={formik.handleChange}
          value={formik.values.unit}
          error={formik.touched.unit && Boolean(formik.errors.unit)}
          helperText={formik.touched.unit && formik.errors.unit}
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
          onClick={() => {
            formik.resetForm();
            navigate('/produtos');
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
