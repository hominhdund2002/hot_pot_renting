/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";

// Icons
import RestaurantIcon from "@mui/icons-material/Restaurant";
import GroupIcon from "@mui/icons-material/Group";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import KitchenIcon from "@mui/icons-material/Kitchen";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import adminComboAPI from "../../../api/Services/adminComboAPI";
import { formatMoney } from "../../../utils/fn";

// Interfaces
interface Ingredient {
  comboIngredientId: number;
  ingredientID: number;
  ingredientName: string;
  quantity: number;
  measurementUnit: string;
}

interface AllowedIngredientType {
  id: number;
  ingredientTypeId: number;
  ingredientTypeName: string;
  minQuantity: number;
  measurementUnit: string;
}

interface TutorialVideo {
  turtorialVideoId: number;
  name: string;
  description: string;
  videoURL: string;
}

interface HotpotCombo {
  comboId: number;
  name: string;
  description: string;
  size: number;
  basePrice: number;
  totalPrice: number;
  isCustomizable: boolean;
  hotpotBrothID: number;
  hotpotBrothName: string;
  appliedDiscountID: number;
  appliedDiscountPercentage: number;
  imageURLs: string[];
  tutorialVideo: TutorialVideo;
  ingredients: Ingredient[];
  allowedIngredientTypes: AllowedIngredientType[];
}

const HotpotComboDetail: React.FC = () => {
  const { comboId } = useParams<{ comboId: string }>();
  const [combo, setCombo] = useState<HotpotCombo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchCombo = async () => {
      try {
        const res: any = await adminComboAPI.GetAdminComboDetail(comboId);
        setCombo(res);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (comboId) {
      fetchCombo();
    }
  }, [comboId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Đang tải thông tin combo...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" variant="filled">
          Có lỗi xảy ra: {error}
        </Alert>
      </Box>
    );
  }

  if (!combo) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info" variant="filled">
          Không tìm thấy thông tin combo
        </Alert>
      </Box>
    );
  }

  const hasDiscount = combo.appliedDiscountPercentage > 0;
  const mainImage = combo.imageURLs && combo.imageURLs[activeImageIndex];
  const thumbnailImages =
    combo.imageURLs && combo.imageURLs.length > 1 ? combo.imageURLs : [];

  return (
    <Fade in={!loading}>
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          p: { xs: 2, md: 3 },
          bgcolor: "#f8f9fa",
        }}
      >
        <Grid container spacing={3}>
          {/* Left column: Images */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {combo.imageURLs && combo.imageURLs.length > 0 ? (
                <>
                  {/* Main Image */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      pt: "75%", // 4:3 aspect ratio
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img
                        src={mainImage}
                        alt={combo.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.3s ease-in-out",
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Thumbnail Images */}
                  {thumbnailImages.length > 0 && (
                    <Box sx={{ p: 2, bgcolor: "#fff" }}>
                      <ImageList
                        cols={4}
                        gap={8}
                        rowHeight={80}
                        sx={{ m: 0, overflowY: "hidden" }}
                      >
                        {thumbnailImages.map((url, index) => (
                          <ImageListItem
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            sx={{
                              cursor: "pointer",
                              opacity: index === activeImageIndex ? 1 : 0.7,
                              transition: "all 0.2s",
                              "&:hover": { opacity: 1 },
                              border:
                                index === activeImageIndex
                                  ? "2px solid #FF4B2B"
                                  : "2px solid transparent",
                              borderRadius: 1,
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={url}
                              alt={`${combo.name} - ${index}`}
                              loading="lazy"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </Box>
                  )}
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "400px",
                    bgcolor: "#eee",
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Không có hình ảnh
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Right column: Combo details */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: "#1E293B",
                  }}
                >
                  {combo.name}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {combo.description}
                </Typography>

                <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                  <RestaurantIcon sx={{ color: "#64748B", mr: 1 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Nước lẩu:{" "}
                    <span style={{ color: "#334155" }}>
                      {combo.hotpotBrothName}
                    </span>
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                  <GroupIcon sx={{ color: "#64748B", mr: 1 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Phù hợp cho{" "}
                    <span style={{ color: "#334155" }}>{combo.size} người</span>
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "baseline" }}>
                    <Typography
                      variant="h5"
                      component="span"
                      sx={{
                        fontWeight: 700,
                        color: hasDiscount ? "#FF4B2B" : "#334155",
                      }}
                    >
                      {formatMoney(combo.totalPrice)}
                    </Typography>

                    {hasDiscount && (
                      <>
                        <Typography
                          variant="body1"
                          component="span"
                          sx={{
                            textDecoration: "line-through",
                            ml: 2,
                            color: "text.secondary",
                          }}
                        >
                          {formatMoney(combo.basePrice)}
                        </Typography>
                        <Chip
                          label={`-${combo.appliedDiscountPercentage}%`}
                          size="small"
                          color="error"
                          sx={{ ml: 2 }}
                        />
                      </>
                    )}
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Ingredients */}
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    color: "#334155",
                  }}
                >
                  <KitchenIcon sx={{ mr: 1 }} />
                  Nguyên liệu
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {combo.ingredients.map((ingredient) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      key={ingredient.comboIngredientId}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: "#F1F5F9",
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {ingredient.ingredientName}
                        </Typography>
                        <Typography
                          variant="caption"
                          component="div"
                          sx={{ color: "text.secondary" }}
                        >
                          {ingredient.quantity} {ingredient.measurementUnit}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>

                {/* Additional Ingredients */}
                {combo.allowedIngredientTypes &&
                  combo.allowedIngredientTypes.length > 0 && (
                    <>
                      <Typography
                        variant="h6"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          color: "#334155",
                        }}
                      >
                        <LocalOfferIcon sx={{ mr: 1 }} />
                        Nguyên liệu tùy chọn thêm
                      </Typography>

                      <List disablePadding sx={{ mb: 3 }}>
                        {combo.allowedIngredientTypes.map((type) => (
                          <ListItem key={type.id} disablePadding sx={{ mb: 1 }}>
                            <ListItemText
                              primary={type.ingredientTypeName}
                              secondary={`Số lượng tối thiểu: ${type.minQuantity} ${type.measurementUnit}`}
                              primaryTypographyProps={{ fontWeight: 500 }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}

                {/* Tutorial Video */}
                {combo.tutorialVideo?.videoURL && (
                  <>
                    <Divider sx={{ my: 3 }} />

                    <Typography
                      variant="h6"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        color: "#334155",
                      }}
                    >
                      <PlayCircleOutlineIcon sx={{ mr: 1 }} />
                      Video hướng dẫn
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {combo.tutorialVideo.description}
                    </Typography>

                    <Box
                      sx={{
                        position: "relative",
                        paddingBottom: "56.25%", // 16:9 aspect ratio
                        height: 0,
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <iframe
                        src={combo.tutorialVideo.videoURL}
                        title={combo.tutorialVideo.name}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default HotpotComboDetail;
