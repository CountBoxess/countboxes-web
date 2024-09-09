import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../services/api/api';
import DetailsSkeleton from '../OrderDetail/components/DetailsSkeleton';

const LoadedOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [loadedOrderInfos, setLoadedOrderInfos] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleScanItem = (itemId) => {
    navigate(`/work/loaded/orders/${orderId}/items/${itemId}/scan`);
  };

  const updateOrder = async (orderId) => {
    try {
      const response = await api.put(`/orders/${orderId}`, {
        status: 'ENTREGUE'
      });
      if(response.status === 200){
        console.log('Pedido descarregado com sucesso');
        navigate('/work/loaded/orders');
      }

    } catch (error){
      console.log('Erro ao atualizar o pedido: ', error)
    }
  }


  const handleConfirmUnloading = () => {
      updateOrder(orderId)
      navigate('/orders')
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await api.get(`/orders/${orderId}`);

      setLoadedOrderInfos(response.data);

      setLoading(false);
    };

    fetchOrder();
  }, []);

  const allItemsUnloaded = loadedOrderInfos?.OrderProduct?.every(
    (item) => item.quantity === item.Transaction.length - item.quantity
  );


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
          <Typography variant="overline">Nome: {loadedOrderInfos.client.name}</Typography>
          <Typography variant="overline">CNPJ: {loadedOrderInfos.client.CNPJ}</Typography>
          <Divider />
          <Typography variant="overline">Endereço da entrega:</Typography>
          <Typography variant="overline">
            {`${loadedOrderInfos.client.street}, ${loadedOrderInfos.client.number} - ${loadedOrderInfos.client.city}, ${loadedOrderInfos.client.state}, ${loadedOrderInfos.client.region}, ${loadedOrderInfos.client.country} - CEP: ${loadedOrderInfos.client.zipCode}`}
          </Typography>
          <Divider />
          <Typography variant="overline">Items:</Typography>
          {loadedOrderInfos.OrderProduct.map((item) => (
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
                <Typography variant="overline">Descarregados: {item.Transaction.length - item.quantity}</Typography>
              </Box>
              {item.Transaction.length !== item.quantity * 2 && (
                <Button
                  variant="contained"
                  sx={{
                    marginBottom: 2,
                    width: '100%'
                  }}
                  onClick={() => handleScanItem(item.orderProductCode)}>
                  Descarregar
                </Button>
              )}
              <Divider />
            </Box>
          ))}
        {allItemsUnloaded && (
          <Button
            variant="contained"
            color="success"
            sx={{
              marginTop: 4
            }}
            onClick={handleConfirmUnloading}>
            Confirmar Carregamento
          </Button>
        )}
        </Box>
      ) : (
        <DetailsSkeleton />
      )}
    </Box>
  );
};

export default LoadedOrderDetail;
