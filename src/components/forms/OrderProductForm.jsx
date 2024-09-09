// @ts-nocheck
/* eslint-disable react/prop-types */
import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export const schema = Yup.object({
  quantity: Yup.number(),
});

export default function OrderProductForm({ initialValues, onSubmit }) {

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
          id="quantity"
          name="quantity"
          label="Quantidade"
          onChange={formik.handleChange}
          value={formik.values.quantity}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
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
      </Box>
    </form>
  );
}
