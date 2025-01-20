import React, { useCallback } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  FormProvider,
  // RHFAutoComplete,
  // RHFSelect,
  // RHFTextField,
  // RHFTextFieldNumber,
  // RHFUploadMultiFile,
  RHFMultiCheckbox,
  RHFUploadMultiFile,
} from "../../components/hook-form";
// import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

// const LabelStyle = styled(Typography)(({ theme }) => ({
//   ...theme.typography.subtitle2,
//   color: theme.palette.text.secondary,
//   marginBottom: theme.spacing(1),
// }));

// Define interfaces for our data types
// interface HotpotBase {
//   id: number;
//   name: string;
//   price: number;
// }

interface HotpotMeat {
  id: number;
  name: string;
  price: number;
}

interface HotpotVegetable {
  id: number;
  name: string;
  price: number;
}

// Sample data
// const bases: HotpotBase[] = [
//   { id: 1, name: "Spicy Sichuan Broth", price: 12 },
//   { id: 2, name: "Clear Bone Broth", price: 10 },
//   { id: 3, name: "Tom Yum Broth", price: 13 },
//   { id: 4, name: "Mushroom Vegetarian Broth", price: 11 },
// ];

const meats: HotpotMeat[] = [
  { id: 1, name: "Sliced Beef", price: 8 },
  { id: 2, name: "Lamb", price: 9 },
  { id: 3, name: "Pork Belly", price: 7 },
  { id: 4, name: "Chicken", price: 6 },
];

const vegetables: HotpotVegetable[] = [
  { id: 1, name: "Napa Cabbage", price: 3 },
  { id: 2, name: "Mushroom Mix", price: 4 },
  { id: 3, name: "Corn", price: 2 },
  { id: 4, name: "Spinach", price: 3 },
  { id: 5, name: "Tofu", price: 3 },
];

interface CreateHotPotFormSchema {
  name: string;
  description: string;
  imageURL: (string | undefined)[] | undefined;
  meats: (string | undefined)[] | undefined;
  vegetables: (string | undefined)[] | undefined;
}
const HotpotComboCreate: React.FC = () => {
  const defaultValues = {
    name: "",
    description: "",
    imageURL: [],
    meats: [],
    vegetables: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Bắt buộc có tên sản phẩm")
      .min(1, "Tối thiểu 1 kí tự"),
    description: Yup.string()
      .trim()
      .required("Bắt buộc có mô tả")
      .min(10, "Tối thiểu 10 kí tự"),
    imageURL: Yup.array().of(Yup.string()).min(1, "Bắt buộc có hình"),
    meats: Yup.array().of(Yup.string()).min(1, "Bắt buộc chọn 1"),
    vegetables: Yup.array().of(Yup.string()).min(1, "Bắt buộc chọn 1"),
  });

  const methods = useForm<CreateHotPotFormSchema>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const onSubmit = async (values: CreateHotPotFormSchema) => {
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (acceptedFiles: any) => {
      const images = values.imageURL || [];

      //   const uploadedImages = await Promise.all(
      //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //     acceptedFiles.map(async (file: any) => {
      //       const downloadURL = await uploadImageToFirebase(file);
      //       return downloadURL;
      //     })
      //   );

      //   // Update the form with the new image URLs
      //   setValue("imageURL", [...images, ...uploadedImages]);

      setValue("imageURL", [
        ...images,
        ...acceptedFiles.map((file: Blob | MediaSource) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [setValue, values.imageURL]
  );

  const handleRemoveAll = () => {
    setValue("imageURL", []);
  };

  const handleRemove = (file: File | string) => {
    const filteredItems = values.imageURL?.filter((_file) => _file !== file);
    setValue("imageURL", filteredItems);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ maxWidth: "100%", margin: "auto", mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Tạo mới thực đơn lẩu
          </Typography>

          <Grid2 container spacing={3}>
            <Grid2 size={{ mobile: 12, desktop: 6 }}>
              <div>
                <RHFUploadMultiFile
                  label="Hình ảnh"
                  showPreview
                  name="imageURL"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
              </div>
            </Grid2>

            <Grid2 size={{ mobile: 12, desktop: 6 }}>
              <Typography variant="h6" gutterBottom>
                Select Meats
              </Typography>
              <RHFMultiCheckbox
                name="meats"
                options={meats.map((meat) => ({
                  label: `${meat.name} ($${meat.price})`,
                  value: meat.id,
                }))}
              />
            </Grid2>

            <Grid2 size={{ mobile: 12, desktop: 6 }}>
              <Typography variant="h6" gutterBottom>
                Select Vegetables
              </Typography>
              <RHFMultiCheckbox
                name="vegetables"
                options={vegetables.map((vegetable) => ({
                  label: `${vegetable.name} ($${vegetable.price})`,
                  value: vegetable.id,
                }))}
              />
            </Grid2>

            <Grid2 size={{ mobile: 12 }}>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* <Typography variant="h6">Total: ${calculateTotal()}</Typography> */}
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="large"
                  loading={isSubmitting}
                >
                  Thêm sản phẩm
                </LoadingButton>
              </Box>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default HotpotComboCreate;
