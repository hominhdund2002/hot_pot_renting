import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AssignOrderType } from "../../types/assignOrder";
import staffGetOrderApi from "../../api/staffGetOrderAPI";
import useAuth from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { OrderStatus } from "../../api/Services/orderManagementService";

const StatusChip = ({ status }: { status: string }) => {
  const theme = useTheme();
  const statusColors: Record<string, string> = {
    "Chờ xác nhận": theme.palette.warning.main,
    "Đã xác nhận": theme.palette.success.main,
    "Đã hủy": theme.palette.error.main,
  };

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        backgroundColor: statusColors[status] || theme.palette.grey[500],
        color: theme.palette.common.white,
      }}
    />
  );
};

const AssignOrder: React.FC = () => {
  //Declare
  const theme = useTheme();
  const { auth } = useAuth();
  const id = auth?.user?.id;
  const [orders, setOrders] = useState<AssignOrderType[]>([]);

  //call api
  const getAssignOrderByStaffId = async () => {
    try {
      const res = await staffGetOrderApi.getAssignOrderByStaffId(id);
      setOrders(res?.data);
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  React.useEffect(() => {
    getAssignOrderByStaffId();
  }, [id]);

  //Header arr
  const headerArr = [
    "Tên khách hàng",
    "Lẩu & Thêm vào",
    "Ghi chú đặc biệt",
    "Trạng thái",
    "Thao tác",
  ];

  const body = {
    status: OrderStatus.Shipping,
    notes: "",
  };

  //handle
  const handleChangeStatus = async (orderId: any) => {
    console.log("log id: ", orderId);
    try {
      const res = await staffGetOrderApi.updateStatus(orderId, body);
      console.log(res);
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" component="h1" mb={3} color="primary">
        Quản lý đơn hàng lẩu
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.grey[200] }}>
              {headerArr.map((header, _index) => (
                <TableCell sx={{ fontWeight: 600 }}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.userName}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <TextField
                    multiline
                    rows={2}
                    sx={{
                      width: "300px",
                      "& .MuiInputBase-root": {
                        bgcolor: theme.palette.background.paper,
                      },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <StatusChip status={order.status} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleChangeStatus(order.orderId)}
                  >
                    Đơn hàng sẵn sàng
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AssignOrder;
