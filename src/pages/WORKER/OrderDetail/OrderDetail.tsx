import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../services/api/api';
import DetailsSkeleton from './componenets/DetailsSkeleton';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [orderInfos, setOrderInfos] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleScanItem = (itemId) => {
    navigate(`/work/orders/${orderId}/items/${itemId}/scan`);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await api.get(`/orders/${orderId}`);

      setOrderInfos(response.data);

      setLoading(false);
    };

    fetchOrder();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#f7f7f7',
        minHeight: '100vh'
      }}>
      <Box
        sx={{
          backgroundColor: '#3687dd',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          position: 'fixed',
          width: '100%',

          boxShadow: '0px 0px 20px #8d8d8d'
        }}>
        <Button
          sx={{
            color: '#f7f7f7'
          }}
          onClick={() => {
            navigate(-1);
          }}>
          <ArrowBack />
          Voltar
        </Button>
        <Typography
          sx={{
            fontWeight: 700,
            color: '#f7f7f7'
          }}>
          COUNT BOXES
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          paddingTop: 10,
          alignItems: 'center'
        }}>
        <Typography variant="overline">Pedido {orderId}</Typography>
      </Box>
      {!loading ? (
        <Box
          sx={{
            width: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: 2,

            backgroundColor: '#fff',
            borderRadius: 2,
            margin: 2
          }}>
          <Typography variant="overline">Cliente</Typography>
          <Typography variant="overline">Nome: {orderInfos.client.name}</Typography>
          <Typography variant="overline">CNPJ: {orderInfos.client.CNPJ}</Typography>
          <Divider />
          <Typography variant="overline">Endereço da entrega:</Typography>
          <Typography variant="overline">
            {`${orderInfos.client.street}, ${orderInfos.client.number} - ${orderInfos.client.city}, ${orderInfos.client.state}, ${orderInfos.client.region}, ${orderInfos.client.country} - CEP: ${orderInfos.client.zipCode}`}
          </Typography>
          <Divider />
          <Typography variant="overline">Items:</Typography>
          {orderInfos.OrderProduct.map((item) => (
            <Box key={item.orderProductCode}>
              <Typography variant="overline">{item.product.description}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Typography variant="overline">Total: {item.quantity}</Typography>
                <Typography variant="overline">Carregados: {item.Transaction.length}</Typography>
              </Box>
              {item.quantity > item.Transaction.length && (
                <Button
                  variant="contained"
                  sx={{
                    marginBottom: 2,
                    width: '100%'
                  }}>
                  Carregar
                </Button>
              )}
              <Divider />
            </Box>
          ))}
        </Box>
      ) : (
        <DetailsSkeleton />
      )}
    </Box>
  );
};

export default OrderDetail;
