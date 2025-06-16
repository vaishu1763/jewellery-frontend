import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  LinearProgress,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
  Fade
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useCart } from "../App";
import axios from "axios";

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const PRODUCTS = [
  { id: 1, name: "Diamond Earring", category: "Diamond Earrings", image: "/images/diamond_earings2.jpg", price: 5000 },
  { id: 2, name: "Diamond Earring", category: "Diamond Earrings", image: "/images/diamond_earings3.jpg", price: 5500 },
  { id: 3, name: "Diamond Earring", category: "Diamond Earrings", image: "/images/diamond_earings4.jpg", price: 6000 },
  { id: 4, name: "Diamond Earring", category: "Diamond Earrings", image: "/images/diamond_earings5.jpg", price: 5200 },
  { id: 5, name: "Diamond Earring", category: "Diamond Earrings", image: "/images/diamond_earings6.jpg", price: 7000 },
  { id: 6, name: "Diamond Earring", category: "Diamond Earrings", image: "/images/diamond_earings7.jpg", price: 6000 },
  { id: 7, name: "Diamond Earring", category: "Diamond Earrings", image: "/images/diamond_earings8.jpg", price: 5700 },
  { id: 8, name: "Silver Bracelet", category: "Silver Bracelets", image: "/images/silver_bracelets1.jpg", price: 5000 },
  { id: 9, name: "Silver Bracelet", category: "Silver Bracelets", image: "/images/silver_bracelets2.jpg", price: 5000 },
  { id: 10, name: "Silver Bracelet", category: "Silver Bracelets", image: "/images/silver_bracelets3.jpg", price: 1500 },
  { id: 11, name: "Silver Bracelet", category: "Silver Bracelets", image: "/images/silver_bracelets4.jpg", price: 3000 },
  { id: 12, name: "Gold Bracelet", category: "Gold Bracelets", image: "/images/gold_bracelet1.jpg", price: 3500 },
  { id: 13, name: "Gold Bracelet", category: "Gold Bracelets", image: "/images/gold_bracelets2.jpg", price: 7000 },
  { id: 14, name: "Gold Bracelet", category: "Gold Bracelets", image: "/images/gold_bracelets3.jpg", price: 6000 },
  { id: 15, name: "Gold Bracelet", category: "Gold Bracelets", image: "/images/gold_bracelets4.jpg", price: 5000 }
];

const STATUS_STEPS = ["Ordered", "Shipped", "Out for Delivery", "Delivered"];

function getStatusIndex(status) {
  return STATUS_STEPS.indexOf(status);
}

function generateOrders(userId, productList) {
  const statuses = STATUS_STEPS;
  const orders = [];
  const today = new Date();
  for (let i = 1; i <= 3; i++) {
    const product = productList[Math.floor(Math.random() * productList.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const orderDate = new Date(today);
    orderDate.setDate(today.getDate() - daysAgo);
    orders.push({
      id: i,
      date: orderDate.toISOString().split("T")[0],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      total: product.price,
      product: { ...product }
    });
  }
  return orders;
}

function Dashboard() {
  const navigate = useNavigate();
  const { cart, wishlist, addToCart, removeFromWishlist } = useCart() || {};
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated user data
  const user = { name: "Vaishnavi", email: "vaishu@example.com" };

  // Fetch orders from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const normalizedOrders = res.data.map((order) => {
            const imageUrl = order.product.image.startsWith("http")
              ? order.product.image
              : `${BASE_IMAGE_URL}${order.product.image}`;
            console.log("Normalized image URL:", imageUrl);
            return {
              ...order,
              product: {
                ...order.product,
                image: imageUrl
              }
            };
          });
          setOrders(normalizedOrders);
          console.log("Fetched orders:", normalizedOrders);
        } else {
          console.log("No orders from backend, using generated data");
          setOrders(generateOrders(1, PRODUCTS));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders, using generated data:", err);
        setOrders(generateOrders(1, PRODUCTS));
        setLoading(false);
      });
  }, []);

  // Handle Reorder (add to cart)
  const handleReorder = (product) => {
    if (typeof addToCart === "function") {
      console.log("Reordering product:", product);
      addToCart(product);
    } else {
      console.error("addToCart is not a function:", addToCart);
    }
  };

  // Handle Add to Cart from Wishlist
  const handleAddToCartFromWishlist = (item) => {
    if (typeof addToCart === "function") {
      console.log("Adding to cart from wishlist:", item);
      addToCart(item);
    } else {
      console.error("addToCart is not a function:", addToCart);
    }
  };

  // Handle Remove from Wishlist
  const handleRemoveFromWishlist = (itemId) => {
    if (typeof removeFromWishlist === "function") {
      console.log("Removing from wishlist, ID:", itemId);
      removeFromWishlist(itemId);
    } else {
      console.error("removeFromWishlist is not a function:", removeFromWishlist);
    }
  };

  if (loading) return <Typography color="text.primary">Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Fade in timeout={500}>
        <Card
          sx={{
            p: 4,
            borderRadius: "12px",
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)"
          }}
        >
          <Typography
            variant="h1"
            color="text.primary"
            sx={{ fontFamily: '"Playfair Display", serif', mb: 2 }}
          >
            My Dashboard
          </Typography>

          {/* User Info */}
          <Box mb={5}>
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontFamily: '"Playfair Display", serif', mb: 1 }}
            >
              Account Info
            </Typography>
            <Box>
              <Typography color="text.secondary">
                <strong>Name:</strong> {user.name}
              </Typography>
              <Typography color="text.secondary">
                <strong>Email:</strong> {user.email}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Total Orders */}
          <Box mb={4}>
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontFamily: '"Playfair Display", serif', mb: 1 }}
            >
              Total Orders: {orders.length}
            </Typography>
          </Box>

          {/* Order History with Tracking */}
          <Box mb={5}>
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontFamily: '"Playfair Display", serif', mb: 1 }}
            >
              Order History & Tracking
            </Typography>
            {orders.length === 0 ? (
              <Typography color="text.secondary">No orders yet.</Typography>
            ) : (
              <TableContainer sx={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)" }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "neutral.light" }}>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Tracking Progress</TableCell>
                      <TableCell>Total (₹)</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => {
                      const statusIndex = getStatusIndex(order.status);
                      const progressPercent = ((statusIndex + 1) / STATUS_STEPS.length) * 100;

                      return (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.product.name}</TableCell>
                          <TableCell>
                            <Chip
                              label={order.status}
                              color={
                                order.status === "Delivered"
                                  ? "success"
                                  : order.status === "Shipped"
                                  ? "primary"
                                  : order.status === "Out for Delivery"
                                  ? "warning"
                                  : "default"
                              }
                            />
                          </TableCell>
                          <TableCell sx={{ width: 200 }}>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress
                                variant="determinate"
                                value={progressPercent}
                                sx={{
                                  height: 10,
                                  borderRadius: 5,
                                  backgroundColor: "neutral.light",
                                  "& .MuiLinearProgress-bar": {
                                    backgroundColor: progressPercent === 100 ? "#4caf50" : "primary.main"
                                  }
                                }}
                              />
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                mt={0.5}
                                color="text.secondary"
                              >
                                {STATUS_STEPS.map((step, i) => (
                                  <Typography
                                    key={step}
                                    fontWeight={i === statusIndex ? "bold" : "normal"}
                                    fontSize="10px"
                                  >
                                    {step}
                                  </Typography>
                                ))}
                              </Stack>
                            </Box>
                          </TableCell>
                          <TableCell>{order.total}</TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={1}>
                              <Button
                                variant="text"
                                size="small"
                                color="primary"
                                onClick={() => navigate(`/order/${order.id}`)}
                              >
                                View Details
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={() => handleReorder(order.product)}
                                sx={{ "&:hover": { bgcolor: "primary.dark" } }}
                              >
                                Reorder
                              </Button>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Wishlist */}
          <Box>
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontFamily: '"Playfair Display", serif', mb: 1 }}
            >
              My Wishlist
            </Typography>
            {!wishlist || wishlist.length === 0 ? (
              <Typography color="text.secondary">Your wishlist is empty.</Typography>
            ) : (
              <List>
                {wishlist.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{ borderBottom: "1px solid", borderColor: "divider" }}
                  >
                    <ListItemText
                      primary={item.name}
                      secondary={`₹${item.price}`}
                      sx={{ flex: 1 }}
                      primaryTypographyProps={{ color: "text.primary", fontWeight: 600 }}
                      secondaryTypographyProps={{ color: "text.secondary" }}
                    />
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => handleAddToCartFromWishlist(item)}
                        sx={{ "&:hover": { bgcolor: "primary.dark" } }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        sx={{ "&:hover": { bgcolor: "secondary.light", color: "white" } }}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Card>
      </Fade>
    </Container>
  );
}

export default Dashboard;