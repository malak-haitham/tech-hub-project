import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
// لاحقاً نضيف باقي الصفحات هنا (Register, Home, MyProducts ...)

export default function App() {
  const { darkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#3e3e3e", contrastText: "#ffffff" },
      secondary: { main: darkMode ? "#f44336" : "#d32f2f" },
      background: {
        default: darkMode ? "#121212" : "#fafafa",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
      text: { primary: darkMode ? "#ffffff" : "#1a1a1a" },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            direction: "rtl",
            fontFamily: "Cairo, sans-serif",
          },
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
           <Route path="/" element={<Home />} />
           <Route path="/products/:id" element={<ProductDetails />} />

          {/* بعدين نضيف
              <Route path="/my-products" element={<MyProducts />} /> 
          */}
        </Routes>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
