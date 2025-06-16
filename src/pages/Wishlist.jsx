import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Card,
  Divider,
  Button,
  Fade
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { useCart } from "../App";

function Wishlist({ wishlist: propWishlist, removeFromWishlist: propRemoveFromWishlist }) {
  const { wishlist: contextWishlist, removeFromWishlist: contextRemoveFromWishlist } = useCart();
  const navigate = useNavigate();

  // Use context wishlist if available, else prop wishlist
  const wishlist = contextWishlist && contextWishlist.length ? contextWishlist : propWishlist || [];
  const removeFromWishlist = contextRemoveFromWishlist || propRemoveFromWishlist;

  const handleRemoveFromWishlist = (id) => {
    if (typeof removeFromWishlist === "function") {
      console.log(`Removing item with id: ${id} from wishlist`);
      removeFromWishlist(id);
    } else {
      console.error("removeFromWishlist is not a function:", removeFromWishlist);
    }
  };

  return (
    <Box sx={{ maxWidth: 650, mx: "auto", mt: 8, px: 2 }}>
      <Fade in timeout={500}>
        <Card
          sx={{
            p: 4,
            borderRadius: "20px",
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)"
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "text.primary",
              fontFamily: '"Playfair Display", serif',
              mb: 3,
              textAlign: "center"
            }}
          >
            Your Wishlist
          </Typography>
          {wishlist.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Your wishlist is empty.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  "&:hover": { bgcolor: "primary.dark" }
                }}
                onClick={() => navigate("/products")}
              >
                Explore Products
              </Button>
            </Box>
          ) : (
            <List>
              {wishlist.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      color="secondary"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      aria-label="remove"
                      sx={{ "&:hover": { transform: "scale(1.1)" } }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  divider
                  sx={{
                    py: 2,
                    transition: "background 0.3s",
                    "&:hover": { bgcolor: "neutral.light" }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={item.image || "https://via.placeholder.com/300?text=Image+Not+Found"}
                      alt={item.name}
                      variant="rounded"
                      sx={{ width: 80, height: 80, mr: 2, borderRadius: 2 }}
                      onError={(e) => {
                        console.error(`Failed to load wishlist image: ${item.image}`);
                        e.target.src = "https://via.placeholder.com/300?text=Image+Not+Found";
                      }}
                      onLoad={() => console.log(`Successfully loaded wishlist image: ${item.image}`)}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={`₹${item.price}`}
                    primaryTypographyProps={{ fontWeight: 600, color: "text.primary" }}
                    secondaryTypographyProps={{ color: "text.secondary", fontWeight: 500 }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Card>
      </Fade>
    </Box>
  );
}

export default Wishlist;