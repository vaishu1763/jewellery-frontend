import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Card,
  Divider,
  Button,
  Fade
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useCart } from "../App";

function Cart({ cart: propCart, removeFromCart: propRemoveFromCart }) {
  const { cart: contextCart, removeFromCart: contextRemoveFromCart } = useCart();
  const navigate = useNavigate();

  // Use context cart if available, else prop cart
  const cart = contextCart && contextCart.length ? contextCart : propCart || [];
  const removeFromCart = contextRemoveFromCart || propRemoveFromCart;

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveFromCart = (id) => {
    if (typeof removeFromCart === "function") {
      console.log(`Removing item with id: ${id}`);
      removeFromCart(id);
    } else {
      console.error("removeFromCart is not a function:", removeFromCart);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, px: 2 }}>
      <Fade in timeout={500}>
        <Card
          sx={{
            p: 4,
            borderRadius: "16px",
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
              mb: 3
            }}
          >
            Your Cart
          </Typography>
          {cart.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Your cart is empty.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  "&:hover": { bgcolor: "primary.dark" }
                }}
                onClick={() => navigate("/products")}
              >
                Shop Now
              </Button>
            </Box>
          ) : (
            <>
              <List>
                {cart.map((item) => (
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        color="secondary"
                        onClick={() => handleRemoveFromCart(item.id)}
                        aria-label="remove"
                        sx={{ "&:hover": { transform: "scale(1.1)" } }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
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
                          console.error(`Failed to load cart image: ${item.image}`);
                          e.target.src = "https://via.placeholder.com/300?text=Image+Not+Found";
                        }}
                        onLoad={() => console.log(`Successfully loaded cart image: ${item.image}`)}
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
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="h6"
                sx={{ color: "text.primary", fontWeight: 600, textAlign: "right" }}
              >
                Total: ₹{totalPrice}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontWeight: 500,
                  "&:hover": { bgcolor: "primary.dark" }
                }}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </>
          )}
        </Card>
      </Fade>
    </Box>
  );
}

export default Cart;