/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import adminFeedbackAPI from "../../api/Services/adminFeedbackAPI";
import { useParams } from "react-router";

const FeedbackDetail: React.FC = () => {
  const { feedbackId } = useParams<{ feedbackId: string }>();
  const [dataFeedback, setDataFeedback] = useState<any>();

  useEffect(() => {
    const getListFeedback = async () => {
      try {
        console.log(feedbackId);

        if (!feedbackId) return;
        const res: any = await adminFeedbackAPI.getFeedbackDetails(feedbackId);

        console.log(res);

        setDataFeedback(res?.data);
      } catch (error: any) {
        console.error("Error fetching ingredients:", error?.message);
      }
    };

    getListFeedback();
  }, []);

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          {/* Title */}
          <Typography variant="h5" gutterBottom>
            Chi tiết phản hồi
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Thông tin người gửi */}
          <Typography variant="h6" gutterBottom>
            Thông tin khách hàng
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ mobile: 12, desktop: 6 }}>
              <Typography variant="body1">
                <strong>Tên khách hàng:</strong> {dataFeedback?.userName}
              </Typography>
            </Grid>
            <Grid size={{ mobile: 12, desktop: 6 }}>
              <Typography variant="body1">
                <strong>Số điện thoại:</strong>
              </Typography>
            </Grid>
            <Grid size={{ mobile: 12, desktop: 6 }}>
              <Typography variant="body1">
                <strong>Email:</strong>
              </Typography>
            </Grid>
            <Grid size={{ mobile: 12, desktop: 6 }}>
              <Typography variant="body1">
                <strong>ID Đơn hàng:</strong> {dataFeedback?.orderId}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 2 }} />

          {/* Nội dung phản hồi */}
          <Typography variant="h6" gutterBottom>
            Nội dung phản hồi
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ mobile: 12 }}>
              <Typography variant="body1">
                <strong>Loại phản hồi:</strong> {dataFeedback?.title}
              </Typography>
            </Grid>
            <Grid size={{ mobile: 12 }}>
              <Typography variant="body1">
                <strong>Nội dung:</strong> {dataFeedback?.comment}
              </Typography>
            </Grid>
            <Grid size={{ mobile: 12 }}>
              <Typography variant="body1">
                <strong>Thời gian gửi:</strong> {dataFeedback?.createdAt}
              </Typography>
            </Grid>
            <Grid size={{ mobile: 12 }}>
              <Typography variant="body1">
                <strong>Mức độ ưu tiên:</strong>{" "}
                {/* <Chip
                  label=
                  color={
                    priority === "Cao"
                      ? "error"
                      : priority === "Trung bình"
                      ? "warning"
                      : "success"
                  }
                /> */}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 2 }} />

          {/* Trạng thái xử lý */}
          <Typography variant="h6" gutterBottom>
            Trạng thái xử lý
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ mobile: 6 }}>
              <Typography variant="body1">
                <strong>Trạng thái:</strong>{" "}
                <Chip
                  label={status}
                  color={
                    status === "Chưa xử lý"
                      ? "default"
                      : status === "Đang xử lý"
                      ? "warning"
                      : "success"
                  }
                />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FeedbackDetail;
