import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    onSearch(value); // يرسل الكلمة إلى Home.jsx
  };

  return (
    <Box sx={{ mb: 3, direction: "rtl" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="🔍 ابحث عن منتج..."
        value={term}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
