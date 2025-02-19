import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import DetailPopup from "../../containers/ManageUser/Popup/DetailPopup";

interface CTbaleProps {
  tableHeaderTitle: any;
  data: any;
  title: string;
  menuAction?: any;
  selectedData?: any;
  handleOpenDetail?: any;
  handleDelete?: any;
  handleOpenUpdate?: () => void;
  closeDetail?: boolean;
  cancelDelete?: boolean;
  closeUpdate?: boolean;
  isShowDetailButton: boolean | true;
  isShowDeleteButton: boolean | true;
  isShowUpdateButton: boolean | true;
}
// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.background.paper,
    0.9
  )}, ${alpha(theme.palette.background.default, 0.95)})`,
  backdropFilter: "blur(10px)",
  borderRadius: 16,
  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.08)}`,
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  "& .MuiTableCell-root": {
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  },
  "& .MuiTableRow-root": {
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.05),
      transform: "translateY(-2px)",
    },
  },
}));

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: alpha(theme.palette.background.paper, 0.95),
    },
    "&.Mui-focused": {
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 16,
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.background.paper,
      0.95
    )}, ${alpha(theme.palette.background.default, 0.95)})`,
    backdropFilter: "blur(10px)",
  },
}));

const CTable: React.FC<CTbaleProps> = ({
  data,
  tableHeaderTitle,
  title,
  menuAction,
  selectedData,
  cancelDelete,
  closeDetail,
  closeUpdate,
  handleDelete,
  handleOpenUpdate,
  handleOpenDetail,
}) => {
  //Declare
  const theme = useTheme();

  return (
    <Box sx={{ maxWidth: "1400px", mx: "auto", p: 2 }}>
      <StyledCard>
        <CardHeader
          title={
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </Typography>
          }
        />
        <CardContent>
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeaderTitle.map((column: any) => (
                    <TableCell key={column.id} align={column.align || "left"}>
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row: any, index: number) => (
                  <TableRow key={index}>
                    {tableHeaderTitle.map((column: any) => (
                      <TableCell key={column.id} align={column.align || "left"}>
                        {row[column.id]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          onClick={() => selectedData && selectedData(row)}
                        >
                          {menuAction}
                        </Button>
                        {/* {menuAction} */}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default CTable;
