/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  AlertTitle,
  Fade,
  Skeleton,
  Container,
  Paper,
  Grid2,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import CTable from "../../components/table/CTable";
import adminBatchAPI from "../../api/Services/adminBatch";
import { useParams } from "react-router";

// Define the correct interface based on your API response
interface IngredientBatchDetail {
  ingredientBatchId: number;
  ingredientId: number;
  ingredientName: string;
  initialQuantity: number;
  remainingQuantity: number;
  provideCompany: string;
  unit: string;
  bestBeforeDate: string;
  batchNumber: string;
  receivedDate: string;
  measurementValue: number;
  physicalQuantity: number;
  formattedQuantity: string;
  daysUntilExpiration: number;
  isExpired: boolean;
}

const TableBatchDetail = () => {
  // State declarations with proper typing
  const { batchNumber } = useParams<{ batchNumber: string }>();
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [dataBatch, setDataBatch] = useState<IngredientBatchDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate summary statistics
  const summary = {
    totalItems: dataBatch.length,
    expiredItems: dataBatch.filter((item) => item.isExpired).length,
    expiringSoon: dataBatch.filter(
      (item) => !item.isExpired && item.daysUntilExpiration <= 7
    ).length,
  };

  // Fetch batch data
  const fetchBatchData = async () => {
    if (!batchNumber) return;

    setLoading(true);
    setError(null);

    try {
      const response: any = await adminBatchAPI.GetBatchDetail(batchNumber);
      const items = Array.isArray(response) ? response : response?.data || [];

      setDataBatch(items);
      setTotal(items.length);
    } catch (error: any) {
      console.error("Error fetching batch data:", error?.message);
      setError("Không thể tải dữ liệu chi tiết lô hàng. Vui lòng thử lại.");
      setDataBatch([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatchData();
  }, [batchNumber]);

  // Enhanced table headers with better formatting
  const tableHeader = [
    {
      id: "ingredientName",
      label: "Tên nguyên liệu",
      align: "left" as const,
      minWidth: 180,
      render: (value: string) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <InventoryIcon sx={{ fontSize: 16, color: "primary.main" }} />
          <Typography variant="body2" fontWeight="medium">
            {value}
          </Typography>
        </Box>
      ),
    },
    {
      id: "batchNumber",
      label: "Số lô",
      align: "left" as const,
      minWidth: 160,
      render: (value: string) => (
        <Chip
          label={value}
          size="small"
          variant="outlined"
          sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}
        />
      ),
    },
    {
      id: "provideCompany",
      label: "Công ty cung cấp",
      align: "left" as const,
      minWidth: 160,
    },
    {
      id: "initialQuantity",
      label: "SL ban đầu",
      align: "right" as const,
      minWidth: 100,
      render: (value: number, row: IngredientBatchDetail) => (
        <Typography variant="body2" fontWeight="medium">
          {value.toLocaleString()} {row.unit}
        </Typography>
      ),
    },
    {
      id: "remainingQuantity",
      label: "SL còn lại",
      align: "right" as const,
      minWidth: 100,
      render: (value: number, row: IngredientBatchDetail) => {
        const percentage = (value / row.initialQuantity) * 100;
        const color =
          percentage > 50
            ? "success.main"
            : percentage > 20
            ? "warning.main"
            : "error.main";

        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="body2" fontWeight="bold" sx={{ color }}>
              {value.toLocaleString()} {row.unit}
            </Typography>
          </Box>
        );
      },
    },
    {
      id: "formattedQuantity",
      label: "Khối lượng",
      align: "right" as const,
      minWidth: 120,
      render: (value: string) => (
        <Typography variant="body2" fontWeight="medium" color="primary.main">
          {value}
        </Typography>
      ),
    },
    {
      id: "bestBeforeDate",
      label: "Hạn sử dụng",
      align: "center" as const,
      minWidth: 120,
      render: (value: string, row: IngredientBatchDetail) => {
        const date = new Date(value).toLocaleDateString("vi-VN");
        const isExpired = row.isExpired;
        const isExpiringSoon = !isExpired && row.daysUntilExpiration <= 7;

        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: isExpired
                  ? "error.main"
                  : isExpiringSoon
                  ? "warning.main"
                  : "text.primary",
                fontWeight: isExpired || isExpiringSoon ? "bold" : "normal",
              }}
            >
              {date}
            </Typography>
            {(isExpired || isExpiringSoon) && (
              <WarningIcon
                sx={{
                  fontSize: 16,
                  color: isExpired ? "error.main" : "warning.main",
                }}
              />
            )}
          </Box>
        );
      },
    },
    {
      id: "receivedDate",
      label: "Ngày nhận",
      align: "center" as const,
      minWidth: 120,
      render: (value: string) => (
        <Typography variant="body2">
          {new Date(value).toLocaleDateString("vi-VN")}
        </Typography>
      ),
    },
    {
      id: "daysUntilExpiration",
      label: "Số ngày còn lại",
      align: "center" as const,
      minWidth: 120,
      render: (value: number, row: IngredientBatchDetail) => {
        if (row.isExpired) {
          return (
            <Chip
              label="Đã hết hạn"
              size="small"
              color="error"
              icon={<WarningIcon />}
            />
          );
        }

        const color = value <= 3 ? "error" : value <= 7 ? "warning" : "success";
        return (
          <Chip
            label={`${value} ngày`}
            size="small"
            color={color}
            variant={value <= 7 ? "filled" : "outlined"}
          />
        );
      },
    },
    {
      id: "isExpired",
      label: "Trạng thái",
      align: "center" as const,
      minWidth: 120,
      render: (value: boolean, row: IngredientBatchDetail) => {
        if (value) {
          return (
            <Chip
              label="HẾT HẠN"
              size="medium"
              color="error"
              icon={<WarningIcon />}
              variant="filled"
              sx={{
                fontWeight: "bold",
                fontSize: "0.75rem",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { opacity: 1 },
                  "50%": { opacity: 0.7 },
                  "100%": { opacity: 1 },
                },
              }}
            />
          );
        } else if (row.daysUntilExpiration <= 7) {
          return (
            <Chip
              label="SẮP HẾT HẠN"
              size="medium"
              color="warning"
              icon={<WarningIcon />}
              variant="filled"
              sx={{
                fontWeight: "bold",
                fontSize: "0.75rem",
              }}
            />
          );
        } else {
          return (
            <Chip
              label="CÒN HẠN"
              size="medium"
              color="success"
              icon={<CheckCircleIcon />}
              variant="filled"
              sx={{
                fontWeight: "bold",
                fontSize: "0.75rem",
              }}
            />
          );
        }
      },
    },
  ];

  // Handle pagination change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize);
    setPage(0);
  };

  // Calculate paginated data for client-side pagination
  const paginatedData = dataBatch.slice(page * size, (page + 1) * size);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <Box sx={{ p: 3 }}>
      <Grid2 container spacing={2} sx={{ mb: 3 }}>
        {[1, 2, 3, 4].map((i) => (
          <Grid2 size={{ mobile: 12, tablet: 6, desktop: 3 }} key={i}>
            <Skeleton
              variant="rectangular"
              height={80}
              sx={{ borderRadius: 2 }}
            />
          </Grid2>
        ))}
      </Grid2>
      <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
    </Box>
  );

  if (loading && dataBatch.length === 0) {
    return <LoadingSkeleton />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Fade in={true} timeout={500}>
        <Box>
          {/* Header */}
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                Chi tiết lô hàng
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <InfoIcon sx={{ fontSize: 20 }} />
                Lô: {batchNumber}
              </Typography>
            </Box>
            <Tooltip title="Làm mới dữ liệu">
              <IconButton
                onClick={fetchBatchData}
                disabled={loading}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                  "&:disabled": { bgcolor: "grey.300" },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <RefreshIcon />
                )}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
              onClose={() => setError(null)}
            >
              <AlertTitle>Lỗi</AlertTitle>
              {error}
            </Alert>
          )}

          {/* Summary Cards */}
          {!error && dataBatch.length > 0 && (
            <Grid2 container spacing={3} sx={{ mb: 3 }}>
              <Grid2 size={{ mobile: 12, tablet: 6, desktop: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <CardContent sx={{ color: "white", textAlign: "center" }}>
                    <InventoryIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {summary.totalItems}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Tổng số mặt hàng
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>

              <Grid2 size={{ mobile: 12, tablet: 6, desktop: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  }}
                >
                  <CardContent sx={{ color: "white", textAlign: "center" }}>
                    <WarningIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {summary.expiredItems}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Đã hết hạn
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>

              <Grid2 size={{ mobile: 12, tablet: 6, desktop: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                  }}
                >
                  <CardContent sx={{ color: "white", textAlign: "center" }}>
                    <WarningIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {summary.expiringSoon}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Sắp hết hạn (≤7 ngày)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            </Grid2>
          )}

          <Divider sx={{ mb: 3 }} />

          {/* Main Table */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
            }}
          >
            <Box sx={{ position: "relative" }}>
              {loading && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: "rgba(255, 255, 255, 0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                    backdropFilter: "blur(2px)",
                  }}
                >
                  <CircularProgress size={40} />
                </Box>
              )}

              <CTable
                tableHeaderTitle={tableHeader}
                data={paginatedData.map((item) => ({
                  ...item,
                  "data-expired": item.isExpired,
                  "data-expiring-soon":
                    !item.isExpired && item.daysUntilExpiration <= 7,
                }))}
                total={total}
                page={page}
                size={size}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                emptyMessage={
                  error
                    ? "Có lỗi xảy ra khi tải dữ liệu"
                    : "Không có dữ liệu chi tiết lô hàng"
                }
                sx={{
                  "& .MuiTableHead-root": {
                    "& .MuiTableCell-head": {
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "0.875rem",
                    },
                  },
                  "& .MuiTableRow-root:hover": {
                    bgcolor: "action.hover",
                    transform: "scale(1.001)",
                    transition: "all 0.2s ease-in-out",
                  },
                  "& .MuiTableRow-root": {
                    '&[data-expired="true"]': {
                      bgcolor: "rgba(244, 67, 54, 0.05)",
                      "&:hover": {
                        bgcolor: "rgba(244, 67, 54, 0.1)",
                      },
                    },
                    '&[data-expiring-soon="true"]': {
                      bgcolor: "rgba(255, 152, 0, 0.05)",
                      "&:hover": {
                        bgcolor: "rgba(255, 152, 0, 0.1)",
                      },
                    },
                  },
                  "& .MuiTableCell-root": {
                    borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
                  },
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Fade>
    </Container>
  );
};

export default TableBatchDetail;
