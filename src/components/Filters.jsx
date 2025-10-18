import { useEffect, useState } from "react";
import { Box, Button, MenuItem, TextField, Slider, Typography } from "@mui/material";
import axiosInstance from "../api/axiosInstance";

export default function Filters({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    province: "",
    condition: "",
    priceRange: [0, 1000000],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await axiosInstance.get("/categories");
        const prov = await axiosInstance.get("/provinces");
        setCategories(cats.data);
        setProvinces(prov.data);
      } catch (err) {
        console.error("Error loading filters:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [field]: value };
      onFilterChange(updated);
      return updated;
    });
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3, direction: "rtl" }}>
      {/* التصنيفات */}
      <TextField
        select
        label="الفئات"
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">كل الفئات</MenuItem>
        {categories.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>

      {/* المحافظات */}
      <TextField
        select
        label="المحافظات"
        value={filters.province}
        onChange={(e) => handleChange("province", e.target.value)}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">كل المحافظات</MenuItem>
        {provinces.map((p) => (
          <MenuItem key={p.id} value={p.id}>
            {p.name}
          </MenuItem>
        ))}
      </TextField>

      {/* السعر */}
      <Box sx={{ width: 250, px: 2 }}>
        <Typography variant="body2" sx={{ color: "text.primary", mb: 1 }}>
          السعر (د.ع)
        </Typography>
        <Slider
          value={filters.priceRange}
          onChange={(_, newValue) => handleChange("priceRange", newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={2000000}
        />
      </Box>

      {/* الحالة */}
      {["الكل", "جديد", "مستعمل كالجديد", "مستعمل جيد", "مستعمل مقبول"].map((label) => (
        <Button
          key={label}
          variant={filters.condition === label ? "contained" : "outlined"}
          color={label === "الكل" ? "error" : "primary"}
          onClick={() =>
            handleChange(
              "condition",
              label === "الكل"
                ? ""
                : label === "جديد"
                ? "new"
                : label === "مستعمل كالجديد"
                ? "like_new"
                : label === "مستعمل جيد"
                ? "good"
                : "fair"
            )
          }
        >
          {label}
        </Button>
      ))}
    </Box>
  );
}
