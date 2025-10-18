/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { loginUser } from "../api/authAPI";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      alert("تم تسجيل الدخول بنجاح");
      window.location.href = "/"; // مؤقتاً
    } catch (err) {
      setError("بيانات غير صحيحة");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, direction: "rtl" }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        تسجيل الدخول
      </Typography>
      <Box component="form" onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="كلمة المرور"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth>
          تسجيل الدخول
        </Button>
      </Box>
    </Container>
  );
}
