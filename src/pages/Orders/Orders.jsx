import React, { useEffect, useState } from 'react';
import './style.css';
import {
  Box,
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api/api';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Paper>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <Typography fontSize={22}>Ordens de pedido</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigate('/criar-ordem-de-pedido')}>
          Criar ordem de pedido
        </Button>
      </Box>
      <Box
        sx={{
          padding: 2
        }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Codigo</StyledTableCell>
                <StyledTableCell>Nome cliente</StyledTableCell>
                <StyledTableCell>endereço</StyledTableCell>
                <StyledTableCell>frete</StyledTableCell>
                <StyledTableCell>status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleOrders.map((order) => (
                <StyledTableRow
                  key={order.orderCode}
                  onClick={() => console.log('cliclou', order.orderCode)}>
                  <StyledTableCell component="th" scope="row">
                    {order.orderCode}
                  </StyledTableCell>
                  <StyledTableCell>{order.client.name}</StyledTableCell>
                  <StyledTableCell>{order.address}</StyledTableCell>
                  <StyledTableCell>{order.shipping}</StyledTableCell>
                  <StyledTableCell>{order.status}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Paper>
  );
}
