import { useEffect, useState } from "react";
import CTable from "../../components/table/CTable";
import MenuActionTableUser from "../../components/menuAction/menuActionTableUser/MenuActionTableUser";
import adminIngredientsAPI from "../../api/Services/adminIngredientsAPI";
import { Ingredient } from "../../types/ingredients";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import config from "../../configs";

const TableIngredients = () => {
  // declare
  const [selectedData, setSelectedData] = useState<any>();
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [dataIngredients, setDataIngredients] = useState<Ingredient[]>([]);

  const navigate = useNavigate();

  //Handle pagination
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };
  //select data
  const selecteData = (row: any) => {
    setSelectedData(row);
  };

  const tableHeader = [
    { id: "ingredientId", label: "#", align: "left" },
    { id: "name", label: "Tên nguyên liệu", align: "center" },
    { id: "imageURL", label: "Hình ảnh", align: "center" },
    { id: "ingredientTypeName", label: "Loại nguyên liệu", align: "center" },
    { id: "price", label: "Giá tiền", align: "center" },
    { id: "createdAt", label: "Ngày tạo", align: "center" },
  ];

  //Call API

  useEffect(() => {
    const getListIngredients = async () => {
      try {
        const res: any = await adminIngredientsAPI.getListIngredients();

        console.log(res.data);

        setDataIngredients(res?.data?.items);
        console.log("data users: ", res?.data?.items);
      } catch (error: any) {
        console.log(error?.message);
      }
    };

    getListIngredients();
  }, []);

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={() => navigate(config.adminRoutes.createIngredients)}
      >
        Thêm Nguyên Liệu
      </Button>
      <CTable
        data={dataIngredients}
        tableHeaderTitle={tableHeader}
        title="Bảng nguyên liệu"
        menuAction={
          <MenuActionTableUser
            userData={selectedData}
            onOpenDetail={selecteData}
          />
        }
        selectedData={selecteData}
        size={size}
        page={page}
        total={total}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableIngredients;
