import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { colors } from "../../../styles/Color/color";
import { UserDetailInterface } from "../../../types/userDetail";
import adminUserManagementAPI from "../../../api/adminUserManagementAPI";
import { UserInterface } from "../../../types/user";

interface DetailPopupProps {
  handleOpen?: any;
  handleClose?: any;
  UserData?: UserInterface;
}

const DetailPopup: React.FC<DetailPopupProps> = ({
  handleOpen,
  handleClose,
  UserData,
}) => {
  console.log("data chọn được truyền : ", UserData);
  //Declare
  const [detailData, setDetailData] = useState<UserDetailInterface>();

  //Call API
  const getUserDetail = async () => {
    console.log("đã dc call");
    try {
      const res: any = await adminUserManagementAPI.getListUserById(
        UserData?.userId
      );
      setDetailData(res?.data);
    } catch (error) {
      console.log("lỗi: ", error);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, [UserData]);

  return (
    <>
      <Dialog open={handleOpen}>
        <Box
          sx={{
            bgcolor: colors.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "400px",
          }}
        >
          <DialogTitle color={colors.white}>Chi tiết</DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: colors.white }} />
          </IconButton>
        </Box>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Tên:</Typography>
            <Typography>{detailData?.name}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Điện thoại:</Typography>
            <Typography>{detailData?.phoneNumber}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Email:</Typography>
            <Typography>{detailData?.email}</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailPopup;
