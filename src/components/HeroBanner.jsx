import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HeroBanner() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "url('/images/hero-bg.jpg') center/cover no-repeat",
        minHeight: "350px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        px: 6,
        borderRadius: 4,
        mb: 6,
        color: "#fff"
      }}
    >
      <Typography variant="h2" sx={{ mb: 2, fontWeight: "bold" }}>
        Discover Your Shine
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Beautiful, Handcrafted Jewellery for Every Occasion.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          background: "#e2c275",
          color: "#7b5e2e",
          fontWeight: "bold",
          "&:hover": { background: "#c4a24d" }
        }}
        onClick={() => navigate("/products")}
      >
        Shop Now
      </Button>
    </Box>
  );
}
export default HeroBanner;