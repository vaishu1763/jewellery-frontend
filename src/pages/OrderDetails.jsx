import React from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  LinearProgress,
  Chip,
  Grid,
  CardMedia
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../App"; // Adjust path based on your project structure

// Simulated backend data (all 12 products from Home.jsx)
const PRODUCTS = [
  {
    id: 1,
    name: "Diamond Earring",
    image: "/images/diamond_earings2.jpg",
    price: 5000,
    goldWeight: "2 grams",
    carat: "18K",
    description: "Elegant diamond earrings, perfect for occasions."
  },
  {
    id: 2,
    name: "Diamond Earring",
    image: "/images/diamond_earings3.jpg",
    price: 5500,
    goldWeight: "2.1 grams",
    carat: "18K",
    description: "Stylish pair with excellent sparkle."
  },
  {
    id: 3,
    name: "Diamond Earring",
    image: "/images/diamond_earings4.jpg",
    price: 6000,
    goldWeight: "2.3 grams",
    carat: "18K",
    description: "Modern design, pure elegance."
  },
  {
    id: 4,
    name: "Diamond Earring",
    image: "/images/diamond_earings5.jpg",
    price: 5200,
    goldWeight: "2.2 grams",
    carat: "18K",
    description: "Timeless diamond earrings for any event."
  },
  {
    id: 5,
    name: "Diamond Earring",
    image: "/images/diamond_earings6.jpg",
    price: 7000,
    goldWeight: "2.5 grams",
    carat: "18K",
    description: "Luxurious earrings with stunning clarity."
  },
  {
    id: 6,
    name: "Diamond Earring",
    image: "/images/diamond_earings7.jpg",
    price: 6000,
    goldWeight: "2.4 grams",
    carat: "18K",
    description: "Sophisticated design with brilliant diamonds."
  },
  {
    id: 7,
    name: "Diamond Earring",
    image: "/images/diamond_earings8.jpg",
    price: 5700,
    goldWeight: "2.3 grams",
    carat: "18K",
    description: "Elegant earrings for a refined look."
  },
  {
    id: 8,
    name: "Silver Bracelet",
    image: "/images/silver_bracelets1.jpg",
    price: 5000,
    goldWeight: "N/A",
    carat: "925 Silver",
    description: "Classic silver bracelet with modern design."
  },
  {
    id: 9,
    name: "Silver Bracelet",
    image: "/images/silver_bracelets2.jpg",
    price: 5000,
    goldWeight: "N/A",
    carat: "925 Silver",
    description: "Sleek and stylish silver bracelet."
  },
  {
    id: 10,
    name: "Silver Bracelet",
    image: "/images/silver_bracelets3.jpg",
    price: 1500,
    goldWeight: "N/A",
    carat: "925 Silver",
    description: "Minimalist silver bracelet for everyday wear."
  },
  {
    id: 11,
    name: "Silver Bracelet",
    image: "/images/silver_bracelets4.jpg",
    price: 3000,
    goldWeight: "N/A",
    carat: "925 Silver",
    description: "Charming silver bracelet with intricate details."
  },
  {
    id: 12,
    name: "Gold Bracelet",
    image: "/images/gold)bracelet1.jpg", // Corrected typo
    price: 3500,
    goldWeight: "3 grams",
    carat: "22K",
    description: "Premium gold bracelet for everyday luxury."
  },
  {
    id: 13,
    name: "Gold Bracelet",
    image: "/images/gold_bracelets2.jpg",
    price: 7000,
    goldWeight: "3.5 grams",
    carat: "22K",
    description: "Exquisite gold bracelet with fine craftsmanship."
  },
  {
    id: 14,
    name: "Gold Bracelet",
    image: "/images/gold_bracelets3.jpg",
    price: 6000,
    goldWeight: "3.2 grams",
    carat: "22K",
    description: "Elegant gold bracelet for special occasions."
  },
  {
    id: 15,
    name: "Gold Bracelet",
    image: "/images/gold_bracelets4.jpg",
    price: 5000,
    goldWeight: "3 grams",
    carat: "22K",
    description: "Stylish gold bracelet with modern flair."
  }
];

const STATUS_STEPS = ["Ordered", "Shipped", "Out for Delivery", "Delivered"];

function getStatusIndex(status) {
  return STATUS_STEPS.indexOf(status);
}

// Generate orders
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

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Generate orders and find the specific order
  const orders = generateOrders(1, PRODUCTS);
  const order = orders.find(o => o.id === parseInt(id));

  // Handle case where order is not found
  if (!order) {
    return (
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: "12px", background: "#fffbe7" }}>
          <Typography variant="h4" color="#7b5e2e" gutterBottom>
            Order Not Found
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              borderColor: "#e2c275",
              color: "#7b5e2e",
              "&:hover": { borderColor: "#7b5e2e", background: "#f3e9da" }
            }}
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  const statusIndex = getStatusIndex(order.status);
  const progressPercent = ((statusIndex + 1) / STATUS_STEPS.length) * 100;

  // Handle Reorder
  const handleReorder = () => {
    if (typeof addToCart === "function") {
      console.log("Reordering product:", order.product);
      addToCart(order.product);
    } else {
      console.error("addToCart is not a function:", addToCart);
      alert("Error: Cannot reorder. Please check application configuration.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "12px", background: "#fffbe7" }}>
        <Typography variant="h4" color="#7b5e2e" gutterBottom>
          Order Details: #{order.id}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 2,
            borderColor: "#e2c275",
            color: "#7b5e2e",
            "&:hover": { borderColor: "#7b5e2e", background: "#f3e9da" }
          }}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>

        <Grid container spacing={4}>
          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="#7b5e2e" gutterBottom>
              Product Information
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <CardMedia
                component="img"
                image={order.product.image || "https://via.placeholder.com/150?text=Image+Not+Found"}
                alt={order.product.name}
                sx={{
                  width: 150,
                  height: 150,
                  objectFit: "cover",
                  borderRadius: "12px"
                }}
                onError={(e) => {
                  console.error(`Failed to load product image: ${order.product.image}`);
                  e.target.src = "https://via.placeholder.com/150?text=Image+Not+Found";
                }}
                onLoad={() => console.log(`Successfully loaded product image: ${order.product.image}`)}
              />
              <Box>
                <Typography variant="h6" color="#7b5e2e" fontWeight="bold">
                  {order.product.name}
                </Typography>
                <Typography color="text.secondary">
                  Category: {order.product.category}
                </Typography>
                <Typography color="text.secondary">
                  Price: ₹{order.product.price}
                </Typography>
                <Typography color="text.secondary">
                  Gold Weight: {order.product.goldWeight}
                </Typography>
                <Typography color="text.secondary">
                  Carat: {order.product.carat}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {order.product.description}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{
                mt: 2,
                background: "#e2c275",
                color: "#7b5e2e",
                "&:hover": { background: "#c4a24d" }
              }}
              onClick={handleReorder}
            >
              Reorder
            </Button>
          </Grid>

          {/* Order and Tracking Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="#7b5e2e" gutterBottom>
              Order Information
            </Typography>
            <Stack spacing={1}>
              <Typography><strong>Order ID:</strong> {order.id}</Typography>
              <Typography><strong>Order Date:</strong> {order.date}</Typography>
              <Typography><strong>Total:</strong> ₹{order.total}</Typography>
              <Typography><strong>Status:</strong> 
                <Chip
                  label={order.status}
                  color={
                    order.status === "Delivered"
                      ? "success"
                      : order.status === "Shipped"
                      ? "info"
                      : order.status === "Out for Delivery"
                      ? "warning"
                      : "default"
                  }
                  sx={{ ml: 1 }}
                />
              </Typography>
            </Stack>

            <Typography variant="h6" color="#7b5e2e" gutterBottom sx={{ mt: 3 }}>
              Tracking Progress
            </Typography>
            <Box sx={{ width: "100%" }}>
              <LinearProgress
                variant="determinate"
                value={progressPercent}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#f3e9da",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: progressPercent === 100 ? "#4caf50" : "#7b5e2e"
                  }
                }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                mt={0.5}
                fontSize={12}
                color="#7b5e2e"
              >
                {STATUS_STEPS.map((step, i) => (
                  <Typography
                    key={step}
                    fontWeight={i === statusIndex ? "bold" : "normal"}
                    fontSize={12}
                  >
                    {step}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default OrderDetails;