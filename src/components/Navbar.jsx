
import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({ cartCount, wishlistCount }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Auth", path: "/auth" },
  ];

  const drawer = (
    <Box sx={{ width: 250, bgcolor: "background.default", height: "100%" }}>
      <List>
        {navLinks.map((link) => (
          <ListItem button key={link.name} component={Link} to={link.path} onClick={handleDrawerToggle}>
            <ListItemText primary={link.name} sx={{ color: "text.primary" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: "primary.main", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: "secondary.main", textDecoration: "none", fontFamily: '"Playfair Display", serif' }}>
          Jewelry Haven
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {navLinks.map((link) => (
            <Button key={link.name} component={Link} to={link.path} sx={{ color: "white", "&:hover": { color: "secondary.main" } }}>
              {link.name}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton component={Link} to="/cart" sx={{ color: "white", "&:hover": { color: "secondary.main" } }}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton component={Link} to="/wishlist" sx={{ color: "white", "&:hover": { color: "secondary.main" } }}>
            <Badge badgeContent={wishlistCount} color="secondary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            sx={{ display: { md: "none" }, "&:hover": { color: "secondary.main" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;