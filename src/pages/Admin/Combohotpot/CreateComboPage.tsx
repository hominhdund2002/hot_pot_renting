import React from "react";
import HotpotComboCreate from "../../../container/Createcombo/HotpotComboCreate";
import { Container } from "@mui/material";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";

const CreateCombo: React.FC = () => {
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

        <HotpotComboCreate />
      </Container>
    </>
  );
};

export default CreateCombo;
