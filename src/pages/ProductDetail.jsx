import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Grid,
  MenuItem,
  Rating,
  Divider,
  Alert,
  Fade
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCart } from "../App";
import axios from "axios";

const PRODUCT_DATA = [
  { id: 1, name: "Diamond Earring", image: "/images/diamond_earings2.jpg", price: 5000, goldWeight: "2 grams", carat: "18K", description: "Elegant diamond earrings, perfect for occasions." },
  { id: 2, name: "Diamond Earring", image: "/images/diamond_earings3.jpg", price: 5500, goldWeight: "2.1 grams", carat: "18K", description: "Stylish pair with excellent sparkle." },
  { id: 3, name: "Diamond Earring", image: "/images/diamond_earings4.jpg", price: 6000, goldWeight: "2.3 grams", carat: "18K", description: "Modern design, pure elegance." },
  { id: 4, name: "Diamond Earring", image: "/images/diamond_earings5.jpg", price: 5200, goldWeight: "2.2 grams", carat: "18K", description: "Timeless diamond earrings for any event." },
  { id: 5, name: "Diamond Earring", image: "/images/diamond_earings6.jpg", price: 7000, goldWeight: "2.5 grams", carat: "18K", description: "Luxurious earrings with stunning clarity." },
  { id: 6, name: "Diamond Earring", image: "/images/diamond_earings7.jpg", price: 6000, goldWeight: "2.4 grams", carat: "18K", description: "Sophisticated design with brilliant diamonds." },
  { id: 7, name: "Diamond Earring", image: "/images/diamond_earings8.jpg", price: 5700, goldWeight: "2.3 grams", carat: "18K", description: "Elegant earrings for a refined look." },
  { id: 8, name: "Silver Bracelet", image: "/images/silver_bracelets1.jpg", price: 5000, goldWeight: "N/A", carat: "925 Silver", description: "Classic silver bracelet with modern design." },
  { id: 9, name: "Silver Bracelet", image: "/images/silver_bracelets2.jpg", price: 5000, goldWeight: "N/A", carat: "925 Silver", description: "Sleek and stylish silver bracelet." },
  { id: 10, name: "Silver Bracelet", image: "/images/silver_bracelets3.jpg", price: 1500, goldWeight: "N/A", carat: "925 Silver", description: "Minimalist silver bracelet for everyday wear." },
  { id: 11, name: "Silver Bracelet", image: "/images/silver_bracelets4.jpg", price: 3000, goldWeight: "N/A", carat: "925 Silver", description: "Charming silver bracelet with intricate details." },
  { id: 12, name: "Gold Bracelet", image: "/images/gold_bracelet1.jpg", price: 3500, goldWeight: "3 grams", carat: "22K", description: "Premium gold bracelet for everyday luxury." },
  { id: 13, name: "Gold Bracelet", image: "/images/gold_bracelets2.jpg", price: 7000, goldWeight: "3.5 grams", carat: "22K", description: "Exquisite gold bracelet with fine craftsmanship." },
  { id: 14, name: "Gold Bracelet", image: "/images/gold_bracelets3.jpg", price: 6000, goldWeight: "3.2 grams", carat: "22K", description: "Elegant gold bracelet for special occasions." },
  { id: 15, name: "Gold Bracelet", image: "/images/gold_bracelets4.jpg", price: 5000, goldWeight: "3 grams", carat: "22K", description: "Stylish gold bracelet with modern flair." }
];

const paymentOptions = [
  { value: "cod", label: "Cash on Delivery" },
  { value: "upi", label: "UPI" },
  { value: "card", label: "Credit / Debit Card" }
];

// Use local fallback image instead of placeholder.com
const FALLBACK_IMAGE = "/images/logo.jpg";

function ProductDetail({ addToCart, addToWishlist }) {
  const { id } = useParams();
  const { addToCart: contextAddToCart, addToWishlist: contextAddToWishlist } = useCart();
  const [product, setProduct] = useState(PRODUCT_DATA.find(p => String(p.id) === id));
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(4);
  const [reviews, setReviews] = useState([
    { user: "Ajay", text: "Great quality!", rating: 5 },
    { user: "Meera", text: "Loved the design.", rating: 4 }
  ]);
  const [error, setError] = useState("");

  // Add the recently viewed useEffect here
  useEffect(() => {
    if (product) {
      // Get existing recently viewed items
      const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      
      // Remove this product if it exists
      const filtered = viewed.filter(item => item.id !== product.id);
      
      // Add this product to the beginning
      const updated = [product, ...filtered].slice(0, 4); // Keep only 4 items
      
      // Save back to localStorage
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    }
  }, [product]);

  // Fetch product from backend with improved error handling
  useEffect(() => {
    console.log("Fetching product with ID:", id);
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (res.data) {
          // Ensure the image path is correct
          const productData = {
            ...res.data,
            image: res.data.image || `/images/${res.data.name.toLowerCase().replace(/\s+/g, '_')}.jpg`
          };
          console.log("Fetched product:", productData);
          setProduct(productData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        // Keep using the PRODUCT_DATA fallback
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Typography color="text.primary">Loading...</Typography>;

  if (!product) {
    return (
      <Box p={4}>
        <Typography variant="h6" color="error">
          Product not found
        </Typography>
      </Box>
    );
  }

  const handleAddToCart = () => {
    if (typeof addToCart === "function") {
      console.log("Calling addToCart with:", product);
      addToCart(product);
    } else if (typeof contextAddToCart === "function") {
      console.log("Calling contextAddToCart with:", product);
      contextAddToCart(product);
    } else {
      console.error("addToCart is not a function:", addToCart);
    }
  };

  const handleAddToWishlist = () => {
    if (typeof addToWishlist === "function") {
      console.log("Calling addToWishlist with:", product);
      addToWishlist(product);
    } else if (typeof contextAddToWishlist === "function") {
      console.log("Calling contextAddToWishlist with:", product);
      contextAddToWishlist(product);
    } else {
      console.error("addToWishlist is not a function:", addToWishlist);
    }
  };

  const handleOrder = () => {
    if (address.trim() === "") {
      setError("Please enter a valid shipping address.");
      return;
    }
    setOrderPlaced(true);
    setError("");
  };

  const handleCancel = () => {
    setOrderPlaced(false);
    setError("");
  };

  const handleReviewSubmit = () => {
    if (review.trim() === "") {
      setError("Review cannot be empty.");
      return;
    }
    if (!rating) {
      setError("Please provide a rating.");
      return;
    }
    const newReview = { user: "You", text: review, rating };
    setReviews([newReview, ...reviews]);
    setReview("");
    setRating(4);
    setError("");
  };

  return (
    <Box maxWidth={900} mx="auto" my={4} p={2}>
      <Fade in timeout={500}>
        <Card sx={{ p: 4, borderRadius: 3, bgcolor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(10px)" }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <CardMedia
                component="img"
                image={product.image || FALLBACK_IMAGE}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: 300,
                  objectFit: "cover",
                  borderRadius: 12,
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)"
                }}
                onError={(e) => {
                  console.error(`Failed to load image: ${product.image}`);
                  // Try to load a fallback image based on the product name
                  const fallbackImage = `/images/${product.name.toLowerCase().replace(/\s+/g, '_')}.jpg`;
                  if (e.target.src !== fallbackImage) {
                    e.target.src = fallbackImage;
                  } else {
                    e.target.src = FALLBACK_IMAGE;
                  }
                }}
                onLoad={() => console.log(`Successfully loaded image: ${product.image}`)}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography
                variant="h1"
                color="text.primary"
                sx={{ fontFamily: '"Playfair Display", serif', mb: 1 }}
              >
                {product.name}
              </Typography>
              <Typography variant="h6" color="primary.main" sx={{ mb: 2 }}>
                ₹{product.price}
              </Typography>
              <Typography color="text.secondary" paragraph>
                {product.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography><b>Gold Weight:</b> {product.goldWeight}</Typography>
              <Typography><b>Carat:</b> {product.carat}</Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  sx={{ flex: 1, "&:hover": { bgcolor: "primary.dark" } }}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<FavoriteIcon />}
                  sx={{ flex: 1, "&:hover": { bgcolor: "secondary.light", color: "white" } }}
                  onClick={handleAddToWishlist}
                >
                  Wishlist
                </Button>
              </Box>
              <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                Shipping Address:
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={orderPlaced}
                sx={{ mb: 2 }}
                error={error.includes("address")}
                helperText={error.includes("address") ? error : ""}
              />
              <Typography variant="body1" sx={{ mb: 1 }}>
                Payment Method:
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                disabled={orderPlaced}
                sx={{ mb: 2 }}
              >
                {paymentOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {error && !error.includes("address") && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              {!orderPlaced ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOrder}
                  fullWidth
                  sx={{ py: 1.2, fontWeight: 500 }}
                  disabled={!address.trim()}
                >
                  Place Order
                </Button>
              ) : (
                <>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Order placed successfully! <br />
                    <b>Shipping to:</b> {address} <br />
                    <b>Payment via:</b> {paymentOptions.find((opt) => opt.value === payment).label}
                  </Alert>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                    fullWidth
                    sx={{ py: 1.2, fontWeight: 500 }}
                  >
                    Cancel Order
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}
          >
            Customer Reviews
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
            <Rating
              value={rating}
              onChange={(_, val) => setRating(val)}
              disabled={orderPlaced && !review.trim()}
            />
            <TextField
              size="small"
              placeholder="Write your review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              sx={{ flex: 1 }}
              disabled={orderPlaced && !review.trim()}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleReviewSubmit}
              disabled={!review.trim() || !rating}
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Submit
            </Button>
          </Box>
          <Box>
            {reviews.length === 0 && (
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                No reviews yet. Be the first to review!
              </Typography>
            )}
            {reviews.map((r, idx) => (
              <Card
                key={idx}
                sx={{
                  p: 2,
                  mb: 1.5,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating value={r.rating} size="small" readOnly sx={{ mr: 1 }} />
                  <Typography fontWeight={600} color="text.primary">
                    {r.user}:
                  </Typography>
                  <Typography color="text.secondary" sx={{ ml: 1 }}>
                    {r.text}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Card>
      </Fade>
    </Box>
  );
}

export default ProductDetail;