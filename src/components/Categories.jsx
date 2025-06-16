import { Box, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Updated categories with diverse jewelry images
const categories = [
  { 
    name: "Gold", 
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Diamond", 
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Silver", 
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Ring",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Necklace",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Earring",
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Bracelet",
    image: "https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?auto=format&fit=crop&w=400&q=80"
  },
];

function Categories() {
  const navigate = useNavigate();

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Shop by Categories
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {categories.map((cat) => (
          <Grid item xs={12} sm={6} md={3} key={cat.name}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.04)" }
              }}
            >
              <CardActionArea onClick={() => navigate(`/products?category=${cat.name.toLowerCase()}`)}>
                <CardMedia
                  component="img"
                  image={cat.image}
                  alt={cat.name}
                  sx={{ height: 180, objectFit: "cover", borderRadius: "12px 12px 0 0" }}
                />
                <CardContent>
                  <Typography variant="h6" align="center">{cat.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default Categories;