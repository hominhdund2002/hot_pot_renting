import { useState } from "react";
import CTable from "../../components/table/CTable";
import MenuActionTableUser from "../../components/menuAction/menuActionTableUser/MenuActionTableUser";

const TableCombo = () => {
  // declare
  const [selectedData, setSelectedData] = useState<any>();

  //select data
  const selecteData = (row: any) => {
    setSelectedData(row);
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
    { id: "name", label: "Tên nguyên liệu", align: "center" },
    { id: "age", label: "Hình ảnh", align: "center" },
    { id: "address", label: "Loại nguyên liệu", align: "center" },
    { id: "phone", label: "Giá tiền", align: "center" },
    { id: "gender", label: "Ngày tạo", align: "center" },
  ];

  return (
    <>
      <CTable
        data={fieldData}
        tableHeaderTitle={tableHeader}
        title="Bảng Combo Lẩu"
        menuAction={
          <MenuActionTableUser
            userData={selectedData}
            onOpenDetail={selecteData}
          />
        }
        selectedData={selecteData}
      />
    </>
  );
};

export default TableCombo;
