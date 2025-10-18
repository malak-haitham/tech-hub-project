import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {

      try {
        const res = await axiosInstance.get(`/products/${id}`);
         console.log("✅ Product data:", res.data);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("تعذر جلب بيانات المنتج.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <Container sx={{ textAlign: "center", mt: 6 }}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );

  if (!product) return null;

  // لاختيار أول صورة أو placeholder
  const mainImage =
    product.images?.length > 0
      ? product.images[0].url
      : "/placeholder.png";

  const conditionMap = {
    new: "جديد",
    like_new: "مستعمل كالجديد",
    good: "مستعمل جيد",
    fair: "مستعمل مقبول",
    poor: "قديم",
  };

  return (
    <Container sx={{ mt: 5, direction: "rtl" }}>
      <Card sx={{ p: 2, boxShadow: 3 }}>
        <Grid container spacing={3}>
          {/* صورة المنتج */}
          <Grid item xs={12} md={5}>
            <CardMedia
              component="img"
              image={mainImage}
              alt={product.title}
              sx={{
                width: "100%",
                height: 350,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* تفاصيل المنتج */}
          <Grid item xs={12} md={7}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                {product.title}
              </Typography>

              <Typography
                variant="h6"
                color="primary"
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                {product.price?.toLocaleString()} د.ع
              </Typography>

              <Typography variant="body1" sx={{ mb: 2 }}>
                {product.description || "لا يوجد وصف متاح."}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                الفئة: {product.category?.name || "غير محددة"}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                المحافظة: {product.province?.nameAr || "غير محددة"}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                الحالة: {conditionMap[product.condition] || "غير معروفة"}
              </Typography>

              {/* بيانات البائع */}
              <Box sx={{ mt: 3, p: 2, borderTop: "1px solid #ccc" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  معلومات المعلن:
                </Typography>
                <Typography>الاسم: {product.seller?.fullName}</Typography>
                <Typography>الهاتف: {product.seller?.phone}</Typography>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Button variant="contained" color="error">
                  تواصل مع المعلن
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
