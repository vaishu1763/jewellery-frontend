import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  Fade
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCart } from "../App";
import axios from "axios";

const FALLBACK_IMAGE = "/images/logo.jpg";

const PRODUCT_DATA = [
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
  { id: 15, name: "Gold Bracelet", category: "Gold Bracelets", image: "/images/gold_bracelets4.jpg", price: 5000 },
];

function Products({ addToCart, addToWishlist }) {
  const { addToCart: contextAddToCart, addToWishlist: contextAddToWishlist } = useCart();
  const [products, setProducts] = useState(PRODUCT_DATA);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  // Comment out the API call temporarily
  /*
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
          console.log("Fetched products from backend:", res.data);
        } else {
          console.log("No products from backend, using PRODUCT_DATA");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products, using PRODUCT_DATA:", err);
        setLoading(false);
      });
  }, []);
  */

  // Derive categories
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  // Filter products
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Handle add to cart
  const handleAddToCart = (product) => {
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

  // Handle add to wishlist
  const handleAddToWishlist = (product) => {
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

  if (loading) return <Typography color="text.primary">Loading...</Typography>;

  return (
    <Box sx={{ mt: 6, mb: 6 }}>
      <Fade in timeout={500}>
        <Box>
          <Typography
            variant="h1"
            color="text.primary"
            gutterBottom
            sx={{ textAlign: "center", fontFamily: '"Playfair Display", serif' }}
          >
            Popular Products
          </Typography>

          {/* Debug information */}
          <Typography color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
            Total Products: {products.length}
          </Typography>

          {/* Category Filter Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={cat === selectedCategory ? "contained" : "outlined"}
                color={cat === selectedCategory ? "primary" : "secondary"}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "8px",
                  "&:hover": {
                    bgcolor: cat === selectedCategory ? "primary.dark" : "secondary.light",
                    color: cat === selectedCategory ? "white" : "white",
                  },
                }}
              >
                {cat}
              </Button>
            ))}
          </Stack>

          {/* Products Grid */}
          <Grid container spacing={4} justifyContent="center">
            {filteredProducts.length === 0 ? (
              <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
                No products available in this category.
              </Typography>
            ) : (
              filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Fade in timeout={700}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                        },
                        borderRadius: "12px",
                        bgcolor: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
                        <CardMedia
                          component="img"
                          image={product.image || FALLBACK_IMAGE}
                          alt={product.name}
                          sx={{ height: 200, objectFit: "cover" }}
                          onError={(e) => {
                            console.error(`Failed to load product image: ${product.image}`);
                            // Try to load a fallback image based on the product name
                            const fallbackImage = `/images/${product.name.toLowerCase().replace(/\s+/g, '_')}.jpg`;
                            if (e.target.src !== fallbackImage) {
                              e.target.src = fallbackImage;
                            } else {
                              e.target.src = FALLBACK_IMAGE;
                            }
                          }}
                          onLoad={() => console.log(`Successfully loaded product image: ${product.image}`)}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" color="text.primary" fontWeight={600}>
                            {product.name}
                          </Typography>
                          <Typography color="text.secondary" gutterBottom>
                            {product.category}
                          </Typography>
                          <Typography color="text.primary" fontWeight="bold">
                            ₹{product.price}
                          </Typography>
                        </CardContent>
                      </Link>
                      <Box sx={{ p: 2, display: "flex", gap: 1 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<ShoppingCartIcon />}
                          sx={{ flex: 1, "&:hover": { bgcolor: "primary.dark" } }}
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          startIcon={<FavoriteIcon />}
                          sx={{ flex: 1, "&:hover": { bgcolor: "secondary.light", color: "white" } }}
                          onClick={() => handleAddToWishlist(product)}
                        >
                          Wishlist
                        </Button>
                      </Box>
                    </Card>
                  </Fade>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Fade>
    </Box>
  );
}

export default Products;