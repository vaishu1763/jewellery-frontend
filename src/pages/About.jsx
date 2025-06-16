import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

function About() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F8F1E9",
        py: 8,
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: 5,
          borderRadius: "24px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: "#1A2B4A", fontWeight: "bold", mb: 4, textAlign: "center" }}
        >
          About Us
        </Typography>

        <Typography sx={{ fontSize: "1.1rem", mb: 4, textAlign: "center", color: "#1A2B4A" }}>
          <strong>Vaishnavi Jewellers</strong> brings you hand-crafted treasures — gold, diamond,
          and silver — inspired by tradition and designed for today. Established in 2025, our vision is
          simple: to make timeless elegance affordable and unforgettable.
        </Typography>

        <Box mb={4}>
          <Typography variant="h5" sx={{ color: "#1A2B4A", fontWeight: "bold", mb: 2 }}>
            Our Story
          </Typography>
          <Typography sx={{ fontSize: "1rem", color: "#1A2B4A" }}>
            From a humble beginning in YourCity, <strong>Vaishnavi</strong> transformed her dream into
            one of India’s beloved jewellery brands. Today, we serve customers across the country who
            believe in meaningful jewellery that reflects identity and emotion.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" sx={{ color: "#1A2B4A", fontWeight: "bold", mb: 2 }}>
            Our Values
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem>
              <ListItemText
                primary={
                  <span>
                    <strong style={{ color: "#D4A017" }}>🌟 Quality Craftsmanship:</strong> Only the finest materials and
                    skilled artisans.
                  </span>
                }
                sx={{ color: "#1A2B4A" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <span>
                    <strong style={{ color: "#D4A017" }}>🔍 Trust & Transparency:</strong> Certified gems, fair pricing, and clear policies.
                  </span>
                }
                sx={{ color: "#1A2B4A" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <span>
                    <strong style={{ color: "#D4A017" }}>💖 Customer Delight:</strong> Every moment with us is made special.
                  </span>
                }
                sx={{ color: "#1A2B4A" }}
              />
            </ListItem>
          </List>
        </Box>

        <Box>
          <Typography variant="h5" sx={{ color: "#1A2B4A", fontWeight: "bold", mb: 2 }}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                name: "Vaishnavi",
                role: "Founder & Designer",
                image: "images/WhatsApp Image 2025-06-03 at 22.59.32_4c52df74.jpg",
              },
              {
                name: "Pranavi",
                role: "Head of Operations",
                image: "images/WhatsApp Image 2025-06-06 at 21.13.28_2f717ed5.jpg",
              },
              {
                name: "Soumya",
                role: "Customer Care",
                image: "images/WhatsApp Image 2025-06-10 at 14.09.42_2e30920f.jpg",
              },
              {
                name: "Shravani",
                role: "Marketing Lead",
                image: "https://randomuser.me/api/portraits/women/45.jpg",
              },
            ].map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 2,
                    borderRadius: "16px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                    },
                    bgcolor: "#F8F1E9"
                  }}
                >
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: 100,
                      height: 100,
                      mx: "auto",
                      mb: 2,
                      border: "3px solid #D4A017",
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#1A2B4A" }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#1A2B4A" }}>
                    {member.role}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default About;