import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { IOrder } from "../../../types/order";
import CustomerInf from "./CustomerInf";
import orderManagementAPI from "../../../api/orderManagementAPI";

const OrderDetail = () => {
  //Declare
  const { orderId } = useParams();
  const [orderData, setOrderData] = React.useState<IOrder>();

  //call API
  const getOrderDataDetail = async () => {
    try {
      const res: any = await orderManagementAPI.getOrderById(orderId);
      setOrderData(res);
    } catch (error) {
      console.log("lỗi: ", error);
    }
  };

  useEffect(() => {
    getOrderDataDetail();
  }, []);

  return (
    <Box>
      <CustomerInf data={orderData} />
    </Box>
  );
};

export default OrderDetail;
