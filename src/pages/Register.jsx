import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import { registerUser } from "../api/authAPI";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    avatar: "",
    userType: "buyer",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setSuccess("تم إنشاء الحساب بنجاح 🎉");
      setError("");
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch (err) {
      console.log(err);
      setError("حدث خطأ أثناء التسجيل. تأكد من صحة البيانات.");
      setSuccess("");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, direction: "rtl" }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        إنشاء حساب جديد
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="اسم المستخدم"
          name="username"
          value={formData.username}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="الاسم الكامل"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="البريد الإلكتروني"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="رقم الهاتف"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="كلمة المرور"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="رابط الصورة الشخصية (اختياري)"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          fullWidth
          label="نوع المستخدم"
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          sx={{ mb: 3 }}
        >
          <MenuItem value="buyer">مشتري</MenuItem>
          <MenuItem value="seller">بائع</MenuItem>
          <MenuItem value="both">كلاهما</MenuItem>
        </TextField>

        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}

        <Button type="submit" variant="contained" fullWidth>
          إنشاء الحساب
        </Button>
      </Box>
    </Container>
  );
}
