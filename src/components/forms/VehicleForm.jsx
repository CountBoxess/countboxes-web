/* eslint-disable react/prop-types */
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import validatePlate from '../../utils/validatePlate';
import { useNavigate } from 'react-router-dom';

export const schema = Yup.object({
    plate: Yup
    .string()
    .required('Placa é obrigatória')
    .test('validate-plate', 'Placa Inválida', value => validatePlate(value)),

  model: Yup
    .string()
    .required('Modelo é obrigatório'),

  type: Yup
    .string()
    .required('Tipo é obrigatório'),
});

export default function VehicleForm({ initialValues, onSubmit, isPlateReadOnly, isModal}) {
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
          id="plate"
          name="plate"
          label="Placa"
          onChange={formik.handleChange}
          value={formik.values.plate}
          error={formik.touched.plate && Boolean(formik.errors.plate)}
          helperText={formik.touched.plate && formik.errors.plate}
          variant="outlined"
          InputProps={{
            readOnly: isPlateReadOnly, // Torna o campo "plate" somente leitura com base na prop
          }}
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