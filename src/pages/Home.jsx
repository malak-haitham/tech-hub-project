/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [filters, setFilters] = useState({
    category: "",
    province: "",
    condition: "",
    priceRange: [0, 1000000],
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      let url = "/products/filter";

      if (searchTerm.trim()) {
        url = `/products/search?q=${encodeURIComponent(searchTerm.trim())}`;
      } else {
        const params = new URLSearchParams();
        if (filters.category) params.append("categoryId", filters.category);
        if (filters.province) params.append("provinceId", filters.province);
        if (filters.condition) params.append("condition", filters.condition);
        if (filters.priceRange) {
          params.append("minPrice", filters.priceRange[0]);
          params.append("maxPrice", filters.priceRange[1]);
        }
        url += `?${params.toString()}`;
      }

      const res = await axiosInstance.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء جلب المنتجات.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [filters, searchTerm]);

  return (
    <Container sx={{ mt: 4 }}>
      <SearchBar onSearch={setSearchTerm} />
      <Filters onFilterChange={handleFilterChange} />

      {loading ? (
        <Container sx={{ mt: 6, textAlign: "center" }}>
          <CircularProgress />
        </Container>
      ) : error ? (
        <Typography color="error" align="center" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
