import {
  Box,
  Button,
  Paper,
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
import React from "react";
import staffShippingListApi from "../../api/staffShippingListAPI";
import { ShippingOrder } from "../../types/shippingOrder";
import DoneIcon from "@mui/icons-material/Done";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import useAuth from "../../hooks/useAuth";

const ShippingList = () => {
  //Declare
  const [shippingList, setShippingList] = React.useState<ShippingOrder[]>([]);
  const theme = useTheme();
  const { auth } = useAuth();

  //Call api
  const getShippingList = async () => {
    try {
      const res = await staffShippingListApi.getShippingOrderByStaffId(
        auth?.user?.id
      );
      setShippingList(res?.data);
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  React.useEffect(() => {
    getShippingList();
  }, []);

  //handle redirect to gg map
  const handleViewOnMap = (address: any) => {
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
      window.open(googleMapsUrl, "_blank");
    } else {
      alert("Không có địa chỉ được cung cấp.");
    }
  };

  //handle confirm delivery
  const handleConfirmDelivery = (orderId: any) => {
    // Implement the logic to confirm delivery here
    console.log("Confirm delivery for order ID:", orderId);
  };

  //Header arr
  const headerArr = [
    "Mã đơn hàng",
    "Tên khách hàng",
    "Địa chỉ giao hàng",
    "Ghi chú",
    "Trạng thái",
    "",
  ];

  return (
    <Box>
      <Paper sx={{ p: 5 }}>
        <Box>
          <Typography variant="h4" component="h1" mb={3} color="primary">
            Danh sách đơn hàng giao
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow sx={{ bgcolor: theme.palette.grey[200] }}>
                {headerArr.map((header, _index) => (
                  <TableCell sx={{ fontWeight: 600 }} align="left">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {shippingList.map((row) => (
                <TableRow key={row?.orderID}>
                  <TableCell align="left">{row?.orderID}</TableCell>
                  <TableCell align="left">{row?.customerName}</TableCell>
                  <TableCell align="left">{row?.deliveryAddress}</TableCell>
                  <TableCell align="left">
                    <TextField
                      multiline
                      rows={3}
                      value={row?.deliveryNotes ?? "-"}
                    />
                  </TableCell>
                  <TableCell align="left">{row?.orderStatus}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DeliveryDiningIcon />}
                      onClick={() => handleViewOnMap(row?.deliveryAddress)}
                    >
                      Chỉ đường
                    </Button>
                    <Button
                      sx={{
                        border: "1px solid #4caf50",
                        color: "#4caf50",
                        ml: 2,
                      }}
                      startIcon={<DoneIcon />}
                      onClick={() => handleConfirmDelivery(row?.orderID)}
                    >
                      Đã giao
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ShippingList;
