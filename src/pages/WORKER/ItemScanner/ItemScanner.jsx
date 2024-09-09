//@ts-nocheck
import React, { useEffect, useState } from 'react';
import Scanner from '../../../components/scanner/Scanner';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Cancel } from '@mui/icons-material';
import { api } from '../../../services/api/api';
import { showAlert } from '../../../utils/showAlert';
import ConfirmModal from './components/ConfirmModal';
import { useAuth } from '../../../context/AuthContext';

const ItemScannerPage = () => {
  const { user } = useAuth();
  const { orderId, itemId } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);
  const [orderInfo, setOrderInfo] = useState('teste');
  const [loading, setLoading] = useState(true);

  const handleDetected = async (result) => {
    const resultCode = result.codeResult.code;

    if (resultCode !== orderInfo.product.productCode) return;

    console.log('Código escaneado:', resultCode);

    setOpen(true);
    setScannedCode(resultCode);
  };

  const handleConfirm = () => {
    postScannedCode();
    setOpen(false);

    // if all items were scanned, navigate to the next page
    if (orderInfo.Transaction.length + 1 === orderInfo.quantity) {
      showAlert({
        message: 'Todos os itens foram carregados com sucesso!',
        type: 'success'
      });

      navigate(-1);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const postScannedCode = async () => {
    try {
      await api.post(`/scan`, {
        orderCode: orderId,
        loadCode: orderInfo.order.loadCode,
        productCode: scannedCode,
        userCode: user.userCode,
        transactionCategory: 'CARREGAMENTO'
      });

      // refetch order infos
      await fetchOrderInfos();
    } catch (error) {
      showAlert({
        message:
          error.response.data.description || 'Houve um problema ao se comunicar com o servidor.',
        type: 'error'
      });
    }
  };

  const fetchOrderInfos = async () => {
    try {
      const response = await api.get(`/orders/products/getById/${itemId}`);

      console.log(response.data);
      setOrderInfo(response.data);

      setLoading(false);
    } catch (error) {
      showAlert({
        message:
          error.response.data.description || 'Houve um problema ao se comunicar com o servidor.',
        type: 'error'
      });
    }
  };

  useEffect(() => {
    fetchOrderInfos();
  }, []);

  return (
    <>
      <ConfirmModal open={open} onConfirm={handleConfirm} onCancel={handleCancel} />
      {!loading && (
        <Box
          sx={{
            backgroundColor: '#151515',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              flex: 1,
              alignItems: 'end',
              justifyContent: 'start'
            }}>
            <Button
              onClick={() => navigate(-1)}
              sx={{
                width: 'auto',
                height: 'auto',
                marginRight: 1,
                marginTop: 2
              }}
              color="error"
              size="large"
              endIcon={<Cancel />}>
              Voltar
            </Button>
          </Box>

          {/* Scanner Section */}
          <Box
            sx={{
              width: '100%',
              position: 'relative',
              flex: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '500px',
                height: 'auto',
                margin: 'auto',
                position: 'relative'
              }}>
              {!open && <Scanner onDetected={handleDetected} />}

              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'self-end',
                  justifyContent: 'center',
                  border: '12px solid #151515a9',
                  boxSizing: 'border-box'
                }}>
                <Typography
                  sx={{
                    color: 'white',
                    fontSize: '0.6rem',
                    fontWeight: 'bold',
                    backgroundColor: '#151515a9',
                    padding: '4px 16px',
                    borderRadius: '12% 12px 0px 0px'
                  }}
                  variant="overline">
                  Escaneando
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Informações das Leituras */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 3
            }}>
            <Typography fontWeight={600} color={'#f7f7f7'} variant="h6" textAlign={'center'}>
              Escaneando: <br />
              {orderInfo && orderInfo.product.description}
            </Typography>

            {/* Quantidade de itens */}
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              {orderInfo && (
                <>
                  <Box>
                    <Typography color={'#f7f7f7'} fontSize={14} textAlign="center">
                      Itens a serem carregados
                    </Typography>
                    <Typography fontWeight={700} fontSize={24} color={'#f7f7f7'} textAlign="center">
                      {orderInfo.quantity}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography color={'#f7f7f7'} fontSize={14} textAlign="center">
                      Itens carregados
                    </Typography>
                    <Typography fontWeight={700} fontSize={24} color={'#4caf50'} textAlign="center">
                      {orderInfo.Transaction.length}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ItemScannerPage;
