import React from "react";
import FeedbackDetail from "../../../container/Feedback/FeedbackDetail";
import { Container } from "@mui/material";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";

const FeedbackDetailPage: React.FC = () => {
  const feedbackData = {
    id: "FB12345",
    customerName: "Nguyễn Văn A",
    phone: "0987654321",
    email: "nguyenvana@example.com",
    orderId: "ORD67890",
    content: "Nồi lẩu bị lỗi không hoạt động. Mong được hỗ trợ đổi sản phẩm.",
    feedbackType: "Phản ánh sản phẩm",
    status: "Chưa xử lý",
    createdAt: "2025-01-15 14:30",
    priority: "Cao",
  };
  return (
    <>
      <Container sx={{ width: "100% !important", maxWidth: "none !important" }}>
        <HeaderBreadcrumbs
          heading="Thêm mới thực đơn lẩu"
          links={[
            { name: "Thống kê" },
            { name: "Thực đơn lẩu" },
            { name: "Thêm mới thực đơn lẩu" },
          ]}
        />
        <FeedbackDetail {...feedbackData} />{" "}
      </Container>
    </>
  );
};

export default FeedbackDetailPage;
