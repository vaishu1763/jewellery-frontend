//javascript
import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Container, Snackbar, Alert } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import OrderDetails from "./pages/OrderDetails";
import AdminPanel from "./pages/AdminPanel";
import Checkout from "./pages/Checkout";

// In your Routes component:
// Define modern theme
const theme = createTheme({
  palette: {
    primary: { main: "#1A2B4A" }, // Deep Navy
    secondary: { main: "#D4A017" }, // Muted Gold
    background: { default: "#F8F1E9", paper: "#FFFFFF" }, // Soft Cream, White
    text: { primary: "#333333", secondary: "#666666" },
    accent: { main: "#D8A7B1" }, // Dusty Rose
    neutral: { main: "#E0E0E0" },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: { fontFamily: '"Playfair Display", serif', fontSize: "2.5rem", fontWeight: 700 },
    h6: { fontFamily: '"Playfair Display", serif', fontSize: "1.25rem", fontWeight: 500 },
    body1: { fontSize: "1rem", fontWeight: 300 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "8px 16px",
          transition: "all 0.3s ease",
          "&:hover": { transform: "scale(1.05)" },
        },
        contained: { boxShadow: "none" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: { borderRadius: "12px", objectFit: "cover" },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          background: "linear-gradient(to bottom, #F8F1E9, #FFFFFF)",
          borderRadius: "12px",
          padding: "24px",
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          "& .MuiAlert-root": {
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  },
});

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  useEffect(() => {
    console.log("Wishlist updated:", wishlist);
  }, [wishlist]);

  function addToCart(product) {
    if (!product || !product.id) {
      console.error("Invalid product in addToCart:", product);
      setSnackbar({
        open: true,
        message: "Error: Invalid product data",
        severity: "error",
      });
      return;
    }
    console.log("Adding to cart:", product);
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
      setSnackbar({
        open: true,
        message: `${product.name} added to cart!`,
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: `${product.name} is already in cart.`,
        severity: "info",
      });
    }
  }

  function removeFromCart(productId) {
    console.log("Removing from cart, ID:", productId);
    setCart(cart.filter((item) => item.id !== productId));
    setSnackbar({
      open: true,
      message: "Item removed from cart.",
      severity: "info",
    });
  }

  function addToWishlist(product) {
    if (!product || !product.id) {
      console.error("Invalid product in addToWishlist:", product);
      setSnackbar({
        open: true,
        message: "Error: Invalid product data",
        severity: "error",
      });
      return;
    }
    console.log("Adding to wishlist:", product);
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
      setSnackbar({
        open: true,
        message: `${product.name} added to wishlist!`,
        severity: "info",
      });
    } else {
      setSnackbar({
        open: true,
        message: `${product.name} is already in wishlist.`,
        severity: "info",
      });
    }
  }

  function removeFromWishlist(productId) {
    console.log("Removing from wishlist, ID:", productId);
    setWishlist(wishlist.filter((item) => item.id !== productId));
    setSnackbar({
      open: true,
      message: "Item removed from wishlist.",
      severity: "info",
    });
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  console.log("App.jsx: Rendering with addToCart and addToWishlist props for Home");

  return (
    <ThemeProvider theme={theme}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, wishlist, addToWishlist, removeFromWishlist }}>
        <Router>
          <CssBaseline />
          <Navbar cartCount={cart.length} wishlistCount={wishlist.length} />
          <Container sx={{ minHeight: "80vh", py: 4 }}>
            <Routes>
              <Route path="/" element={<Home addToCart={addToCart} addToWishlist={addToWishlist} />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products addToCart={addToCart} addToWishlist={addToWishlist} />} />
              <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} addToWishlist={addToWishlist} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
              <Route path="/wishlist" element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Container>
          <Footer />
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Router>
      </CartContext.Provider>
    </ThemeProvider>
  );
}

export default App;