import React from "react";
import { Container } from "@mui/material";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import FeedbackTable from "../../../container/Feedback/FeedbackTable";

const FeedbackPage: React.FC = () => {
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
        <FeedbackTable />{" "}
      </Container>
    </>
  );
};

export default FeedbackPage;
