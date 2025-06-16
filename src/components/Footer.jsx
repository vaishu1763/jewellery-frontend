import React from "react";
import { Box, Typography, Container, Grid, Link } from "@mui/material";

function Footer() {
  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <Box sx={{ bgcolor: "#F8F1E9", color: "#1A2B4A", py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', mb: 2, color: "#1A2B4A", fontWeight: 700 }}>
              Vaishnavi Jewellers
            </Typography>
            <Typography variant="body2" sx={{ color: "#1A2B4A", fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              Discover elegance with our curated collection of fine jewelry.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', mb: 2, color: "#1A2B4A", fontWeight: 700 }}>
              Quick Links
            </Typography>
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                sx={{ display: "block", color: "#1A2B4A", mb: 1, textDecoration: "none", fontFamily: '"Roboto", sans-serif', fontWeight: 400, "&:hover": { color: "#D4A017" } }}
              >
                {link.name}
              </Link>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', mb: 2, color: "#1A2B4A", fontWeight: 700 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: "#1A2B4A", fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              Email: support@vaishnavijewellers.com
            </Typography>
            <Typography variant="body2" sx={{ color: "#1A2B4A", fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              Phone: +91 123-456-7890
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center", mt: 4, borderTop: `1px solid #D4A017`, pt: 2 }}>
          <Typography variant="body2" sx={{ color: "#1A2B4A", fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            © {new Date().getFullYear()} Vaishnavi Jewellers. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;