/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StaffAssignemtAPI from "../../api/Services/staffAssignmentAPI";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  ArrowBack,
  CheckCircle,
  CalendarToday,
  AttachMoney,
  AccessTime,
  LocationOn,
  Person,
  Phone,
  Email,
  ShoppingCart,
  Edit,
} from "@mui/icons-material";
import { formatDateFunc } from "../../utils/fn";
import { AssignmentCompletionDialog } from "./Modal/ModalUpdateAssignment";

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const getStatusText = (
  status: number
): {
  text: string;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
} => {
  switch (status) {
    case 0:
      return { text: "Đang chờ", color: "warning" };
    case 1:
      return { text: "Đã xác nhận", color: "info" };
    case 2:
      return { text: "Đang thực hiện", color: "primary" };
    case 3:
      return { text: "Hoàn thành", color: "success" };
    case 4:
      return { text: "Đã hủy", color: "error" };
    default:
      return { text: "Không xác định", color: "default" };
  }
};

const AssignmentDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const navigate = useNavigate();
  const [rentalOrder, setRentalOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const getAssignmentDetail = async () => {
    try {
      setLoading(true);
      const res: any = await StaffAssignemtAPI.getAssignmentDetail(orderId);
      setRentalOrder(res);
      setLoading(false);
    } catch (error: any) {
      console.error("Lỗi khi tải chi tiết thuê:", error);
      setError(error.message || "Không thể tải chi tiết đơn hàng thuê");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAssignmentDetail();
  }, [orderId]);

  const handleOpen = () => {
    setOpen(true);
  };

  const onSave = () => {
    setOpen(false);
    getAssignmentDetail();
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Đang tải thông tin...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 600, width: "100%" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Đã xảy ra lỗi!
          </Typography>
          {error}
          <Box sx={{ mt: 2 }}>
            <Button
              color="error"
              variant="contained"
              onClick={() => navigate(-1)}
              startIcon={<ArrowBack />}
            >
              Quay lại
            </Button>
          </Box>
        </Alert>
      </Box>
    );
  }

  if (!rentalOrder) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Alert severity="info" sx={{ maxWidth: 600, width: "100%" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Không tìm thấy!
          </Typography>
          Không tìm thấy đơn thuê với mã: {orderId}
          <Box sx={{ mt: 2 }}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => navigate(-1)}
              startIcon={<ArrowBack />}
            >
              Quay lại danh sách
            </Button>
          </Box>
        </Alert>
      </Box>
    );
  }

  const getInventoryStatusCounts = () => {
    const statusCounts = {
      available: 0,
      inUse: 0,
      maintenance: 0,
      total: rentalOrder?.rentOrderDeetails?.length,
    };

    rentalOrder?.rentOrderDetails.forEach((detail: any) => {
      if (detail.hotpotInventory) {
        switch (detail.hotpotInventory.status) {
          case 1:
            statusCounts.available++;
            break;
          case 2:
            statusCounts.inUse++;
            break;
          case 3:
            statusCounts.maintenance++;
            break;
        }
      }
    });

    return statusCounts;
  };

  const inventoryStatusCounts = getInventoryStatusCounts();

  const calculateRentalDays = () => {
    const startDate = new Date(rentalOrder.rentalStartDate);
    const endDate = rentalOrder.actualReturnDate
      ? new Date(rentalOrder.actualReturnDate)
      : new Date(rentalOrder.expectedReturnDate);

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const rentalDays = calculateRentalDays();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2, color: "white" }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Chi Tiết Phân Công Cho Thuê
        </Typography>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 120,
            height: 120,
            bgcolor: getStatusText(rentalOrder?.order.status).color + ".light",
            transform: "rotate(45deg) translate(35%, -50%)",
            zIndex: 0,
          }}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <ShoppingCart sx={{ mr: 1, color: "primary.main" }} /> Đơn hàng:{" "}
              {rentalOrder?.order.orderCode}
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <CalendarToday
                sx={{ mr: 1, fontSize: "small", color: "text.secondary" }}
              />
              Ngày tạo: {formatDateFunc.formatDate(rentalOrder?.createdAt)}
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <AttachMoney
                sx={{ mr: 1, fontSize: "small", color: "text.secondary" }}
              />
              Tổng tiền:{" "}
              <Box component="span" sx={{ fontWeight: "bold", ml: 0.5 }}>
                {formatCurrency(rentalOrder?.order.totalPrice)}
              </Box>
            </Typography>
            <Chip
              label={getStatusText(rentalOrder?.order.status).text}
              color={getStatusText(rentalOrder?.order.status).color}
              sx={{ mt: 1, fontWeight: "bold" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Person sx={{ mr: 1, color: "primary.main" }} /> Thông tin khách
              hàng
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ bgcolor: "primary.light", mr: 2 }}>
                {rentalOrder?.order.user.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {rentalOrder?.order.user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Khách hàng thân thiết • {rentalOrder?.order.user.loyatyPoint}{" "}
                  điểm
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <Email
                sx={{ mr: 1, fontSize: "small", color: "text.secondary" }}
              />
              {rentalOrder?.order.user.email}
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <Phone
                sx={{ mr: 1, fontSize: "small", color: "text.secondary" }}
              />
              {rentalOrder?.order.user.phoneNumber}
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <LocationOn
                sx={{ mr: 1, fontSize: "small", color: "text.secondary" }}
              />
              {rentalOrder?.order.address}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Thông tin thời gian thuê */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            color: "#334d6e",
          }}
        >
          <AccessTime sx={{ mr: 1, color: "primary.main" }} /> Thời Gian Thuê
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: "100%", bgcolor: "white", boxShadow: 2 }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Ngày bắt đầu:
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {formatDateFunc.formatDate(rentalOrder?.rentalStartDate)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: "100%", bgcolor: "white", boxShadow: 2 }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Ngày trả dự kiến:
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {formatDateFunc.formatDate(rentalOrder?.expectedReturnDate)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: "100%", bgcolor: "white", boxShadow: 2 }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Ngày trả thực tế:
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {rentalOrder?.actualReturnDate
                    ? formatDateFunc.formatDate(rentalOrder?.actualReturnDate)
                    : "Chưa trả"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: "100%", bgcolor: "white", boxShadow: 2 }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Số ngày thuê:
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {rentalDays} ngày
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Tóm tắt trạng thái kho */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Tóm Tắt Trạng Thái Sản Phẩm
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h4" align="center" fontWeight="bold">
                  {inventoryStatusCounts?.total}
                </Typography>
                <Typography
                  variant="subtitle1"
                  align="center"
                  color="text.secondary"
                >
                  Tổng Sản Phẩm
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                height: "100%",
                bgcolor: "#e3f2fd",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  align="center"
                  fontWeight="bold"
                  color="primary.dark"
                >
                  {inventoryStatusCounts?.available}
                </Typography>
                <Typography
                  variant="subtitle1"
                  align="center"
                  color="primary.dark"
                >
                  Có Sẵn
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                height: "100%",
                bgcolor: "#fff8e1",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  align="center"
                  fontWeight="bold"
                  color="warning.dark"
                >
                  {inventoryStatusCounts?.inUse}
                </Typography>
                <Typography
                  variant="subtitle1"
                  align="center"
                  color="warning.dark"
                >
                  Đang Sử Dụng
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                height: "100%",
                bgcolor: "#ffebee",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  align="center"
                  fontWeight="bold"
                  color="error.dark"
                >
                  {inventoryStatusCounts?.maintenance}
                </Typography>
                <Typography
                  variant="subtitle1"
                  align="center"
                  color="error.dark"
                >
                  Đang Bảo Trì
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Bảng các mặt hàng thuê */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
          Danh Sách Sản Phẩm Thuê
        </Typography>
        <TableContainer sx={{ borderRadius: 1 }}>
          <Table>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Hình ảnh
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Sản phẩm
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Loại
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Mã/ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Số lượng
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Giá
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rentalOrder?.rentOrderDetails.map((detail: any) => {
                const isHotpot = detail.hotpotInventory !== null;
                const item = isHotpot
                  ? detail.hotpotInventory?.hotpot
                  : detail.utensil;
                const imageUrl = isHotpot
                  ? item?.imageURLs && item.imageURLs.length > 0
                    ? item.imageURLs[0]
                    : "/placeholder.jpg"
                  : item?.imageURL || "/placeholder.jpg";
                const serialNumber = isHotpot
                  ? detail.hotpotInventory?.seriesNumber
                  : `UT-${detail.utensilId}`;

                let cleanImageUrl = imageUrl;
                if (typeof imageUrl === "string" && imageUrl.startsWith("[")) {
                  try {
                    const parsedUrls = JSON.parse(imageUrl);
                    cleanImageUrl = parsedUrls[0];
                  } catch (e: any) {
                    console.log(e);

                    cleanImageUrl = imageUrl.replace(/[[\]"]/g, "");
                  }
                }

                return (
                  <TableRow
                    key={detail?.rentOrderDetailId}
                    sx={{
                      "&:nth-of-type(odd)": { bgcolor: "background.default" },
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <TableCell>
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          sx={{
                            width: 70,
                            height: 70,
                            objectFit: "cover",
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                          }}
                          image={cleanImageUrl}
                          alt={item?.name || "Hình ảnh sản phẩm"}
                        />
                        {isHotpot && (
                          <Tooltip title="Nồi lẩu" placement="top">
                            <Avatar
                              sx={{
                                width: 22,
                                height: 22,
                                bgcolor: "primary.main",
                                position: "absolute",
                                top: -5,
                                right: -5,
                                fontSize: 12,
                              }}
                            >
                              H
                            </Avatar>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {item?.name || "Sản phẩm không xác định"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {isHotpot
                          ? `${item?.size || ""} • ${item?.material || ""}`
                          : item?.material}
                      </Typography>
                    </TableCell>
                    <TableCell>{isHotpot ? "Nồi lẩu" : "Dụng cụ"}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ fontFamily: "monospace", fontWeight: "bold" }}
                      >
                        {serialNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>{detail?.quantity}</TableCell>
                    <TableCell>
                      <Typography fontWeight="medium">
                        {formatCurrency(detail?.rentalPrice)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Return Information / Actions Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Edit sx={{ mr: 1 }} /> Quản lý thuê
        </Typography>

        {rentalOrder?.actualReturnDate ? (
          <>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Tình trạng nhận:</Typography>
                <Typography variant="body1">
                  {rentalOrder?.returnCondition || "Not recorded"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Ghi chú thuê:</Typography>
                <Typography variant="body1">
                  {rentalOrder?.rentalNotes || "No notes"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Phí Hư Hỏng:</Typography>
                <Typography variant="body1">
                  {rentalOrder?.damageFee
                    ? formatCurrency(rentalOrder?.damageFee)
                    : "None"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Phí trả trễ:</Typography>
                <Typography variant="body1">
                  {rentalOrder?.lateFee
                    ? formatCurrency(rentalOrder?.lateFee)
                    : "None"}
                </Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={handleOpen}
                startIcon={<CheckCircle />}
              >
                Cập nhật công việc
              </Button>
            </Box>
          </>
        )}
      </Paper>

      {open && (
        <AssignmentCompletionDialog
          onClose={() => setOpen(false)}
          open={open}
          assignment={rentalOrder}
          onSave={onSave}
          assignId={assignmentId}
        />
      )}
    </Container>
  );
};

export default AssignmentDetail;
