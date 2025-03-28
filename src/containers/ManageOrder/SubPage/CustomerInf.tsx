import { Box, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { IOrder } from "../../../types/order";
import moment from "moment";

interface UserInfProps {
  data?: IOrder;
}

const CustomerInf: React.FC<UserInfProps> = ({ data }) => {
  const funcFormat = (values: any) => {
    //status
    switch (values) {
      case "Pending":
        return "Đang chờ";
      case "Pending":
        return "Đang chờ";
      case "Pending":
        return "Đang chờ";
        break;
    }
    //BGcolors
    switch (values) {
      case "Pending":
        return "rgb(166, 246, 255)";
    }
    //colors
    switch (values) {
      case "Pending":
        return "#6499e9";
    }
  };

  const funcFormatBGColor = (values: any) => {
    //BGcolors
    switch (values) {
      case "Pending":
        return "rgb(166, 246, 255)";
    }
  };

  const funcFormatColor = (values: any) => {
    //BGcolors
    switch (values) {
      case "Pending":
        return "#6499e9";
    }
  };

  return (
    <Box>
      <Grid container spacing={20}>
        <Grid size={6}>
          <Paper sx={{ p: 4 }}>
            <Stack spacing={4}>
              <Typography variant="h5">Thông tin khách hàng</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>Khách hàng:</Typography>
                <Typography>{data?.user?.name}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>Email:</Typography>
                <Typography>{data?.user?.email}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>Điện thoại:</Typography>
                <Typography>{data?.user?.phoneNumber}</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={6}>
          <Paper sx={{ p: 4 }}>
            <Stack spacing={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">Đơn hàng</Typography>
                <Typography
                  textAlign={"center"}
                  sx={{
                    p: "4px",
                    borderRadius: "10px",
                    width: "100px",
                    bgcolor: funcFormatBGColor(data?.status),
                    color: funcFormatColor(data?.status),
                  }}
                >
                  {funcFormat(data?.status)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>Mã đơn:</Typography>
                <Typography>{data?.orderId}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>Địa chỉ giao:</Typography>
                <Typography>{data?.address}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>Thời gian đặt:</Typography>
                <Typography>
                  {moment(data?.createdAt).format("DD-mm-YYYY")}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>Tổng tiền:</Typography>
                <Typography>{data?.totalPrice}</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerInf;
