import React from "react";
import FeedbackDetail from "../../../container/FeedbackDetail";

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
      <FeedbackDetail {...feedbackData} />{" "}
    </>
  );
};

export default FeedbackDetailPage;
