/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Autocomplete, TextField, FormControl, Button, Grid } from '@mui/material';
import PaginatedTable from '../table/PaginatedTable';
import { api } from '../../services/api/api';
import OrderProductModal from '../modal/OrderProductModal';

const orderProductColumns = [
    { id: 'productCode', label: 'Código' },
    { id: 'quantity', label: 'Quantidade' },
];

export default function OrderDetailsInfo({ order }) {
    const [orderProducts, setOrderProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [selectedOrderProduct, setSelectedOrderProduct] = useState(null);

    const handleOpenOrderProductModal = (orderProduct) => {
        setSelectedOrderProduct(orderProduct);
        setOpen(true);
    }

    const fetchOrderProducts = async (orderCode) => {
        try {
            const response = await api.get(`/orders/products/${orderCode}`);
            setOrderProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    const handleCreateProduct = async (order) => {
        if (selectedProduct && quantity) {
            try {
                const newOrderProduct = {
                    productCode: selectedProduct.productCode.toString(),
                    quantity: quantity,
                    orderCode: order.orderCode
                };
                await api.post('/orders/products', newOrderProduct);
                console.log('Produto criado com sucesso!');
                fetchOrderProducts(order.orderCode);
            } catch (error) {
                console.log('Erro ao criar o produto:', error);
            }
        } else {
            console.log('Por favor, selecione um produto e defina a quantidade.');
        }
    }

    useEffect(() => {
        if (order.orderCode) {
            fetchOrderProducts(order.orderCode);
        }
        fetchProducts();
        setLoading(false)
    }, [order.orderCode]);

    return (
        <>
            <OrderProductModal open={open} product={selectedOrderProduct} handleClose={() => setOpen(false)} refetch={() => fetchOrderProducts(order.orderCode)} />

            {
                !loading && (


                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 2,
                            margin: 2,
                            backgroundColor: '#f5f5f5',
                            height: 'auto'
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Paper
                                    sx={{
                                        padding: 2,
                                        backgroundColor: 'white',
                                        boxShadow: 3,
                                        height: '100%',
                                    }}
                                >
                                    <Typography variant="h6" gutterBottom>
                                        Detalhes da Ordem
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Código da Carga:</strong> {order.loadCode}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Frete:</strong> {order.shipping}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Endereço de Entrega:</strong> {order.address}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Código do Cliente:</strong> {order.client ? order.client.name : 'N/A'}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>CNPJ:</strong> {order.client ? order.client.CNPJ : 'N/A'}
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        height: '100%',
                                        overflow: 'unset', // Remover overflow
                                    }}
                                >
                                    <PaginatedTable
                                        items={orderProducts}
                                        columns={orderProductColumns}
                                        onRowClick={handleOpenOrderProductModal}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', marginTop: 2 }}>
                            Adicionar Produto
                        </Typography>

                        <Paper
                            sx={{
                                padding: 2,
                                backgroundColor: 'white',
                                boxShadow: 3,
                                marginTop: 2,
                                display: 'flex',
                                justifyContent: 'center',  // Centraliza horizontalmente
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    alignItems: 'center',  // Centraliza verticalmente
                                    width: 'auto',         // Adapta ao conteúdo interno
                                    padding: 2             // Adiciona espaçamento interno
                                }}
                            >
                                <Autocomplete
                                    disablePortal
                                    options={products}
                                    getOptionLabel={(option) => option.description || ''}
                                    value={selectedProduct}
                                    onChange={(event, newValue) => {
                                        console.log('Selected product:', newValue);
                                        setSelectedProduct(newValue);
                                    }}
                                    sx={{ width: 300 }} // Largura do campo de Autocomplete
                                    renderInput={(params) => <TextField {...params} label="Produto" />}
                                />
                                <FormControl sx={{ width: 200 }}>
                                    <TextField
                                        label="Quantidade"
                                        value={quantity}
                                        onChange={(event) => setQuantity(event.target.value)}
                                        type="number"
                                        InputProps={{
                                            inputProps: { min: 1 }
                                        }}
                                    />
                                </FormControl>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleCreateProduct(order)}
                                    sx={{ marginTop: 2 }}
                                >
                                    Confirmar
                                </Button>
                            </Box>
                        </Paper>
                    </Box>
                )
            }
        </>


    );
}
