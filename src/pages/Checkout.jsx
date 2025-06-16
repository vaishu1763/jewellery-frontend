import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Fade,
  MenuItem,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../App";

const paymentOptions = [
  { value: "cod", label: "Cash on Delivery" },
  { value: "upi", label: "UPI" },
  { value: "card", label: "Credit / Debit Card" }
];

function Checkout() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "cod"
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");

  // Load recently viewed items from localStorage
  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    setRecentlyViewed(viewed);
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address || 
        !formData.city || !formData.state || !formData.pincode) {
      setError("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    // Pincode validation
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(formData.pincode)) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }

    setOrderPlaced(true);
    setError("");
  };

  if (orderPlaced) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 6, px: 2 }}>
        <Fade in timeout={500}>
          <Card sx={{ p: 4, borderRadius: "16px", bgcolor: "rgba(255, 255, 255, 0.9)" }}>
            <Alert severity="success" sx={{ mb: 3 }}>
              Order placed successfully! Thank you for shopping with us.
            </Alert>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <List>
              {cart.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.name}
                    secondary={`₹${item.price}`}
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ textAlign: "right" }}>
              Total: ₹{totalPrice}
            </Typography>
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/products")}
                sx={{ flex: 1 }}
              >
                Continue Shopping
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/")}
                sx={{ flex: 1 }}
              >
                Go to Home
              </Button>
            </Box>
          </Card>
        </Fade>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 6, px: 2 }}>
      <Fade in timeout={500}>
        <Grid container spacing={4}>
          {/* Checkout Form */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 4, borderRadius: "16px", bgcolor: "rgba(255, 255, 255, 0.9)" }}>
              <Typography variant="h4" gutterBottom sx={{ fontFamily: '"Playfair Display", serif' }}>
                Checkout
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      multiline
                      rows={2}
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      label="Payment Method"
                      name="payment"
                      value={formData.payment}
                      onChange={handleInputChange}
                    >
                      {paymentOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, py: 1.5 }}
                >
                  Place Order
                </Button>
              </form>
            </Card>
          </Grid>

          {/* Order Summary and Recently Viewed */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, borderRadius: "16px", bgcolor: "rgba(255, 255, 255, 0.9)", mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <List>
                {cart.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemAvatar>
                      <Avatar
                        src={item.image}
                        alt={item.name}
                        variant="rounded"
                        sx={{ width: 60, height: 60, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={`₹${item.price}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                Total: ₹{totalPrice}
              </Typography>
            </Card>

            {/* Recently Viewed Items */}
            {recentlyViewed.length > 0 && (
              <Card sx={{ p: 4, borderRadius: "16px", bgcolor: "rgba(255, 255, 255, 0.9)" }}>
                <Typography variant="h6" gutterBottom>
                  Recently Viewed
                </Typography>
                <Grid container spacing={2}>
                  {recentlyViewed.map((item) => (
                    <Grid item xs={6} key={item.id}>
                      <Card
                        sx={{
                          cursor: "pointer",
                          "&:hover": { transform: "scale(1.05)" },
                          transition: "transform 0.2s"
                        }}
                        onClick={() => navigate(`/products/${item.id}`)}
                      >
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          sx={{ height: 120, objectFit: "cover" }}
                        />
                        <CardContent sx={{ p: 1 }}>
                          <Typography variant="body2" noWrap>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="primary" fontWeight="bold">
                            ₹{item.price}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            )}
          </Grid>
        </Grid>
      </Fade>
    </Box>
  );
}

export default Checkout;