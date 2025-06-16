import React from "react";
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions, Paper, Stack, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Fallback image URL
const FALLBACK_IMAGE = "https://via.placeholder.com/300?text=Image+Not+Found";

// Categories
const categories = [
  { name: "Diamond Earrings", image: "/images/diamond_earings.jpg" },
  { name: "Silver Bracelets", image: "/images/silver_bracelets.jpg" },
  { name: "Gold Necklaces", image: "/images/gold_necklace.jpg" },
  { name: "Diamond Pendants", image: "/images/diamond_pendants.jpg" },
  { name: "Gold Bracelets", image: "/images/gold_bracelets.jpg" }
];

// Deals
const deals = [
  {
    title: "Diamond Pendant Days",
    desc: "Flat 25% OFF on Diamond Pendants!",
    image: "/images/pendant_days.jpg"
  },
  {
    title: "Gold Bracelet Special",
    desc: "Save on Gold Bracelets!",
    image: "/images/special_gold.jpg"
  }
];

// Products array (consistent with ProductDetail)
const products = [
  {
    id: 1,
    name: "Diamond Earring",
    price: 5000,
    image: "/images/diamond_earings2.jpg",
    category: "Diamond Earrings",
    goldWeight: "2 grams",
    carat: "18K",
    description: "Elegant diamond earrings, perfect for occasions."
  },
  {
    id: 2,
    name: "Diamond Earring",
    price: 5500,
    image: "/images/diamond_earings3.jpg",
    category: "Diamond Earrings",
    goldWeight: "2.1 grams",
    carat: "18K",
    description: "Stylish pair with excellent sparkle."
  },
  {
    id: 3,
    name: "Diamond Earring",
    price: 6000,
    image: "/images/diamond_earings4.jpg",
    category: "Diamond Earrings",
    goldWeight: "2.3 grams",
    carat: "18K",
    description: "Modern design, pure elegance."
  },
  {
    id: 4,
    name: "Diamond Earring",
    price: 5200,
    image: "/images/diamond_earings5.jpg",
    category: "Diamond Earrings",
    goldWeight: "2.2 grams",
    carat: "18K",
    description: "Timeless diamond earrings for any event."
  },
  {
    id: 5,
    name: "Diamond Earring",
    price: 7000,
    image: "/images/diamond_earings6.jpg",
    category: "Diamond Earrings",
    goldWeight: "2.5 grams",
    carat: "18K",
    description: "Luxurious earrings with stunning clarity."
  },
  {
    id: "Diamond Earring",
    name: "Diamond Earring",
    price: "6000",
    image: "/images/diamond_earings7.jpg",
    category: "Gold Bracelet",
    description: "Sophisticated design with brilliant diamonds."
  },
  {
    id: 7,
    name: "Diamond Earring",
    price: 5700,
    image: "/images/diamond_earings8.jpg",
    category: "Diamond Earrings",
    goldWeight: "2.3 grams",
    carat: "18K",
    description: "Elegant earrings for a refined look."
  },
  {
    id: 8,
    name: "Silver Bracelet",
    price: 5000,
    image: "/images/silver_bracelets1.jpg",
    category: "Silver Bracelets",
    goldWeight: "N/A",
    carat: "925 Silver",
    description: "Classic silver bracelet with modern design."
  },
  {
    id: 9,
    name: "Silver Bracelet",
    price: 5000,
    image: "/images/silver_bracelets2.jpg",
    category: "Silver Bracelets",
    goldWeight: "N/A",
    carat: "925 Silver",
    description: "Sleek and stylish silver bracelet."
  },
  {
    id: 10,
    name: "Silver Bracelet",
    price: 1500,
    image: "/images/silver_bracelets3.jpg",
    category: "Silver Bracelets",
    goldWeight: "N/A",
    carat: "925 Silver",
    description: "Minimalist silver bracelet for everyday wear."
  },
  {
    id: 11,
    name: "Silver Bracelet",
    price: 3000,
    image: "/images/silver_bracelets4.jpg",
    category: "Silver Bracelets",
    goldWeight: "N/A",
    carat: "925 Silver",
    description: "Charming silver bracelet with intricate details."
  },
  {
    id: 12,
    name: "Gold Bracelet",
    price: 3500,
    image: "/images/gold_bracelet1.jpg",
    category: "Gold Bracelets",
    goldWeight: "3 grams",
    carat: "22K",
    description: "Premium gold bracelet for everyday luxury."
  },
  {
    id: 13,
    name: "Gold Bracelet",
    price: 7000,
    image: "/images/gold_bracelets2.jpg",
    category: "Gold Bracelets",
    goldWeight: "3.5 grams",
    carat: "22K",
    description: "Exquisite gold bracelet with fine craftsmanship."
  },
  {
    id: 14,
    name: "Gold Bracelet",
    price: 6000,
    image: "/images/gold_bracelets3.jpg",
    category: "Gold Bracelets",
    goldWeight: "3.2 grams",
    carat: "22K",
    description: "Elegant gold bracelet for special occasions."
  },
  {
    id: 15,
    name: "Gold Bracelet",
    price: 5000,
    image: "/images/gold_bracelets4.jpg",
    category: "Gold Bracelets",
    goldWeight: "3 grams",
    carat: "22K",
    description: "Stylish gold bracelet with modern flair."
  }
];

function Home({ addToCart, addToWishlist }) {
  const navigate = useNavigate();

  // Debug props
  console.log("Home.jsx: Received props:", { addToCart, addToWishlist });

  // Fallback for missing props
  const handleAddToCart = (product) => {
    if (typeof addToCart === 'function') {
      console.log("Calling addToCart with:", product);
      addToCart(product);
      navigate("/cart"); // Navigate to cart page
    } else {
      console.error("addToCart is not a function:", addToCart);
      alert("Error: Cannot add to cart. Please check application configuration.");
    }
  };

  const handleAddToWishlist = (product) => {
    if (typeof addToWishlist === 'function') {
      console.log("Calling addToWishlist with:", product);
      addToWishlist(product);
    } else {
      console.error("addToWishlist is not a function:", addToWishlist);
      alert("Error: Cannot add to wishlist. Please check application configuration.");
    }
  };

  return (
    <Box sx={{ background: "#F8F1E9" }}>
      {/* Hero Banner */}
      <Paper
        elevation={3}
        sx={{
          background: "url('/images/background_1.jpg') center/cover no-repeat",
          minHeight: { xs: 220, md: 370 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          px: { xs: 2, md: 8 },
          py: { xs: 6, md: 10 },
          borderRadius: 0,
          mb: 4,
          color: "#F8F1E9",
          position: "relative"
        }}
      >
        <Typography variant="h2" sx={{ mb: 2, fontWeight: "bold", textShadow: "2px 2px 10px #0009", color: "#F8F1E9" }}>
          Sparkle Every Day
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, textShadow: "1px 1px 8px #0007", color: "#F8F1E9" }}>
          Beautiful, Handcrafted Jewellery for Every Occasion.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: "#1A2B4A",
            color: "#F8F1E9",
            fontWeight: "bold",
            px: 4,
            py: 1.2,
            fontSize: 18,
            "&:hover": { background: "#2E3B55" }
          }}
          onClick={() => navigate("/products")}
        >
          Shop Now <ArrowForwardIosIcon sx={{ ml: 1, fontSize: 18, color: "#D4A017" }} />
        </Button>
      </Paper>

      {/* Categories Carousel */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#1A2B4A" }}>
          Shop by Categories
        </Typography>
        <Stack direction="row" spacing={3} sx={{ overflowX: "auto", pb: 2 }}>
          {categories.map((cat) => (
            <Paper
              key={cat.name}
              elevation={3}
              sx={{
                minWidth: 180,
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.15s",
                "&:hover": { transform: "scale(1.06)", boxShadow: 6, border: "2px solid #D4A017" },
                bgcolor: "#F8F1E9"
              }}
              onClick={() => navigate(`/products?category=${cat.name.toLowerCase().replace(/\s/g, '-')}`)}
            >
              <Box>
                <img
                  src={cat.image || FALLBACK_IMAGE}
                  alt={cat.name}
                  width="100%"
                  height={120}
                  style={{ objectFit: "cover", display: "block" }}
                  onError={(e) => {
                    console.error(`Failed to load category image: ${cat.image}`);
                    e.target.src = FALLBACK_IMAGE;
                  }}
                  onLoad={() => console.log(`Successfully loaded category image: ${cat.image}`)}
                />
              </Box>
              <Box sx={{ px: 2, py: 1 }}>
                <Typography align="center" fontWeight="bold" color="#1A2B4A">
                  {cat.name}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* Deals Section */}
      <Box sx={{ background: "#F8F1E9", py: 4, mb: 4 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#1A2B4A" }}>
            Deals & Offers
          </Typography>
          <Grid container spacing={3}>
            {deals.map((deal, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    minHeight: 120,
                    background: "#F8F1E9"
                  }}
                >
                  <img
                    src={deal.image || FALLBACK_IMAGE}
                    alt={deal.title}
                    width={100}
                    height={100}
                    style={{ objectFit: "cover", borderRadius: 12, marginRight: 18 }}
                    onError={(e) => {
                      console.error(`Failed to load deal image: ${deal.image}`);
                      e.target.src = FALLBACK_IMAGE;
                    }}
                    onLoad={() => console.log(`Successfully loaded deal image: ${deal.image}`)}
                  />
                  <Box>
                    <Typography variant="h6" color="#1A2B4A" fontWeight="bold">
                      {deal.title}
                    </Typography>
                    <Typography variant="body2" color="#1A2B4A">
                      {deal.desc}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Popular Products */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#1A2B4A" }}>
          Popular Products
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  border: "1px solid #D4A017",
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  minHeight: 350,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,0.15)", transform: "scale(1.03)" },
                  bgcolor: "#F8F1E9"
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image || FALLBACK_IMAGE}
                  alt={product.name}
                  sx={{
                    height: 180,
                    objectFit: "cover",
                    borderRadius: "12px 12px 0 0",
                    cursor: "pointer"
                  }}
                  onClick={() => navigate(`/products/${product.id}`)}
                  onError={(e) => {
                    console.error(`Failed to load product image: ${product.image}`);
                    e.target.src = FALLBACK_IMAGE;
                  }}
                  onLoad={() => console.log(`Successfully loaded product image: ${product.image}`)}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1, color: "#1A2B4A", fontWeight: "bold" }}>
                    {product.name}
                  </Typography>
                  <Typography color="#1A2B4A" sx={{ mb: 2 }}>
                    Price: ₹{product.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
                  <Button
                    variant="contained"
                    sx={{
                      background: "#1A2B4A",
                      color: "#F8F1E9",
                      fontWeight: "bold",
                      px: 3,
                      "&:hover": { background: "#2E3B55" }
                    }}
                    startIcon={<ShoppingCartIcon sx={{ color: "#D4A017" }} />}
                    onClick={() => handleAddToCart(product)}
                    size="small"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<FavoriteBorderIcon sx={{ color: "#D4A017" }} />}
                    onClick={() => handleAddToWishlist(product)}
                    size="small"
                    sx={{
                      borderColor: "#D4A017",
                      color: "#1A2B4A",
                      fontWeight: "bold",
                      "&:hover": { borderColor: "#1A2B4A", background: "#F8F1E9" }
                    }}
                  >
                    Wishlist
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      
    </Box>
  );
}

export default Home;