import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/products/${product.id}`); // يروح لصفحة التفاصيل
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.03)" },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* صورة المنتج */}
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl || "/placeholder.png"}
        alt={product.title}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        {/* العنوان */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          {product.title}
        </Typography>

        {/* المحافظة + الحالة */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.provinceName || "غير محدد"} –{" "}
          {product.condition === "new"
            ? "جديد"
            : product.condition === "like_new"
            ? "مستعمل كالجديد"
            : product.condition === "good"
            ? "مستعمل جيد"
            : "مستعمل مقبول"}
        </Typography>

        {/* السعر */}
        <Typography variant="h6" color="primary" fontWeight="bold">
          {product.price} د.ع
        </Typography>
      </CardContent>

      <Box sx={{ textAlign: "center", pb: 2 }}>
        <Button variant="contained" color="error" onClick={handleDetails}>
          تفاصيل المنتج
        </Button>
      </Box>
    </Card>
  );
}
