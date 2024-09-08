/* eslint-disable react/prop-types */
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import validateCNPJ from '../../utils/validateCNPJ';

export const schema = Yup.object({
  name: Yup
    .string()
    .required('O nome do cliente é obrigatório.'),
    
  CNPJ: Yup
    .string()
    .required('O CNPJ é obrigatório.')
    .test('validate-cnpj', 'CNPJ inválido', value => validateCNPJ(value)),

  phone: Yup
    .string()
    .required('O telefone é obrigatório')
    .matches(/^[0-9]{11}$/, 'O telefone não é válido'),

  country: Yup
    .string()
    .required('O país é obrigatório'),

  region: Yup
    .string()
    .required('Região é obrigatório'),

  state: Yup
    .string()
    .required('Estado é obrigatório'),

  city: Yup
    .string()
    .required('Cidade é obrigatório'),

  street: Yup
    .string()
    .required('Rua é obrigatório'),

  number: Yup
    .string()
    .required('Número é obrigatório'),

  zipCode: Yup
    .string()
    .required('O CEP é obrigatório')
});

export default function ClientForm({ initialValues, onSubmit, isCNPJReadOnly, isModal}) {
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
          id="CNPJ"
          name="CNPJ"
          label="CNPJ"
          onChange={formik.handleChange}
          value={formik.values.CNPJ}
          error={formik.touched.CNPJ && Boolean(formik.errors.CNPJ)}
          helperText={formik.touched.CNPJ && formik.errors.CNPJ}
          variant="outlined"
          InputProps={{
            readOnly: isCNPJReadOnly,
          }}
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
          id="country"
          name="country"
          label="País"
          onChange={formik.handleChange}
          value={formik.values.country}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="region"
          name="region"
          label="Região"
          onChange={formik.handleChange}
          value={formik.values.region}
          error={formik.touched.region && Boolean(formik.errors.region)}
          helperText={formik.touched.region && formik.errors.region}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="state"
          name="state"
          label="Estado"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="city"
          name="city"
          label="Cidade"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="street"
          name="street"
          label="Rua"
          onChange={formik.handleChange}
          value={formik.values.street}
          error={formik.touched.street && Boolean(formik.errors.street)}
          helperText={formik.touched.street && formik.errors.street}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="number"
          name="number"
          label="Número"
          onChange={formik.handleChange}
          value={formik.values.number}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
          variant="outlined"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="zipCode"
          name="zipCode"
          label="CEP"
          onChange={formik.handleChange}
          value={formik.values.zipCode}
          error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
          helperText={formik.touched.zipCode && formik.errors.zipCode}
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
        {!isModal && (
          <Button
          variant="contained"
          onClick={() => navigate('/clientes')}
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
