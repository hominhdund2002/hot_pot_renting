import { useState } from "react";
import CTable from "../../components/table/CTable";
import MenuActionTableUser from "../../components/menuAction/menuActionTableUser/MenuActionTableUser";

const TableUsers = () => {
  // declare
  const [selectUserdata, setSelectedUserData] = useState<any>();
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  //select data
  const selecteData = (row: any) => {
    setSelectedUserData(row);
  };

  //Handle open detail
  const handleDetail = (row: any) => {
    console.log("chi tiết: ", row);
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenDetail(false);
  };

  const fieldData = [
    {
      id: 1,
      name: "andre",
      age: 8,
      address: "abc",
      phone: "0398297211",
      gender: "F",
    },
    {
      id: 2,
      name: "Dunx",
      age: 8,
      address: "abc",
      phone: "0398297211",
      gender: "F",
    },
    {
      id: 3,
      name: "Thann",
      age: 8,
      address: "abc",
      phone: "0398297211",
      gender: "F",
    },
  ];

  const tableHeader = [
    { id: "id", label: "#", align: "left" },
    { id: "name", label: "Tên", align: "center" },
    { id: "age", label: "Tuổi", align: "center" },
    { id: "address", label: "Địa chỉ", align: "center" },
    { id: "phone", label: "Điện thoại", align: "center" },
    { id: "gender", label: "Giới tính", align: "center" },
  ];

  // const handleDetail = (row: any) => {
  //   console.log("Detail clicked for row:", row);
  // };

  const handleDelete = (row: any) => {
    console.log("Delete clicked for row:", row);
  };

  return (
    <>
      <CTable
        data={fieldData}
        tableHeaderTitle={tableHeader}
        title="Quản lý người dùng"
        menuAction={
          <MenuActionTableUser
            userData={selectUserdata}
            onOpenDetail={handleDetail}
          />
        }
        selectedData={selecteData}
        isShowDeleteButton={true}
        isShowDetailButton={true}
        isShowUpdateButton={true}
        handleOpenDetail={handleDetail}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default TableUsers;
