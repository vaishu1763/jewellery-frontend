// src/pages/ProductList.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const PRODUCT_DATA = [
  {
    id: 1,
    name: "Diamond Earring",
    image: "https://images.pexels.com/photos/1191537/pexels-photo-1191537.jpeg?auto=compress&w=400&q=80",
    price: 5000
  },
  {
    id: 2,
    name: "Silver Bracelet",
    image: "https://images.pexels.com/photos/1400382/pexels-photo-1400382.jpeg?auto=compress&w=400&q=80",
    price: 1500
  },
  {
    id: 3,
    name: "Gold Bracelet",
    image: "https://images.pexels.com/photos/1191535/pexels-photo-1191535.jpeg?auto=compress&w=400&q=80",
    price: 3000
  },
  {
    id: 4,
    name: "Diamond Pendant",
    image: "https://images.pexels.com/photos/1191591/pexels-photo-1191591.jpeg?auto=compress&w=400&q=80",
    price: 3500
  }
];

function ProductList() {
  return (
    <Box p={4}>
      <Typography variant="h4" mb={4} fontWeight="bold" color="#7b5e2e">Popular Products</Typography>
      <Grid container spacing={4}>
        {PRODUCT_DATA.map(product => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
              <Card sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.03)" } }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="text.primary">
                    {product.name}
                  </Typography>
                  <Typography color="text.secondary">₹{product.price}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
