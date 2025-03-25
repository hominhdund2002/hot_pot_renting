/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CTable from "../../components/table/CTable";
import MenuActionTableUser from "../../components/menuAction/menuActionTableUser/MenuActionTableUser";
import adminIngredientsAPI from "../../api/Services/adminIngredientsAPI";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddNewIngredients from "./Modal/AddNewIngredients";

const TableIngredientType = () => {
  // State variables
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [dataIngredients, setDataIngredients] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  // Handle pagination
  const handleChangePage = (_event: unknown, newPage: number) => {
    if (newPage >= 0 && newPage < Math.ceil(total / size)) {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Select data row
  const selectData = (row: any) => {
    setSelectedData(row);
  };

  // Table headers
  const tableHeader = [
    { id: "name", label: "Tên nguyên liệu", align: "center" },
  ];

  // Fetch ingredients data with pagination
  useEffect(() => {
    const getListIngredientType = async () => {
      try {
        const res: any = await adminIngredientsAPI.getListIngredientsType();
        setDataIngredients(res?.data || []);
        setTotal(res?.data.length || 0);
      } catch (error: any) {
        console.error("Error fetching ingredients:", error?.message);
      }
    };

    getListIngredientType();
  }, []);

  const lastIndexValue = page * size + size;
  const indexFirstValue = lastIndexValue - size;
  const currentData = dataIngredients?.slice(indexFirstValue, lastIndexValue);

  //Handle open add model
  const handleOpenAddModel = () => {
    setOpen(true);
  };
  const handleCloseAddModel = () => {
    setOpen(false);
  };

  const EventAction = () => {
    return (
      <Box>
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenAddModel()}
        >
          Thêm Loại Nguyên Liệu
        </Button>
      </Box>
    );
  };
  return (
    <>
      <AddNewIngredients onOpen={open} onClose={handleCloseAddModel} />
      <CTable
        data={currentData}
        tableHeaderTitle={tableHeader}
        title="Bảng loại nguyên liệu"
        eventAction={<EventAction />}
        menuAction={
          <MenuActionTableUser
            userData={selectedData}
            onOpenDetail={selectData}
          />
        }
        selectedData={selectData}
        size={size}
        page={page}
        total={total}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableIngredientType;
