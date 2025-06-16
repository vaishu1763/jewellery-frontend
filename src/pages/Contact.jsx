import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  Alert,
  Link as MuiLink,
  Stack,
  Divider,
  Fade
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on change
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.email.trim() || !validateEmail(form.email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!form.message.trim()) {
      setError("Message is required.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setError("");
      console.log("Contact form submitted:", form);
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error("Contact form error:", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 8,
        px: 2
      }}
    >
      <Fade in timeout={500}>
        <Card
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: 5,
            borderRadius: "24px",
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)"
          }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              color: "text.primary",
              fontFamily: '"Playfair Display", serif',
              mb: 4
            }}
          >
            Contact Us
          </Typography>

          {submitted && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Thank you for your message! We'll get back to you soon.
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{ "aria-label": "Your Name" }}
              error={error.includes("Name")}
            />
            <TextField
              name="email"
              type="email"
              label="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{ "aria-label": "Your Email" }}
              error={error.includes("email")}
            />
            <TextField
              name="message"
              label="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={5}
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{ "aria-label": "Your Message" }}
              error={error.includes("Message")}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                py: 1.5,
                fontWeight: 500,
                fontSize: "1rem",
                borderRadius: "12px",
                "&:hover": { bgcolor: "primary.dark" }
              }}
            >
              Send Message
            </Button>
          </form>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontFamily: '"Playfair Display", serif', mb: 2 }}
            >
              Store Information
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <EmailIcon color="secondary" />
              <Typography variant="body2" color="text.secondary">
                <strong>Email:</strong>{" "}
                <MuiLink
                  href="mailto:support@yourjewellerystore.com"
                  underline="hover"
                  color="secondary.main"
                >
                  support@yourjewellerystore.com
                </MuiLink>
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <PhoneIcon color="secondary" />
              <Typography variant="body2" color="text.secondary">
                <strong>Phone:</strong> +91-9172348020
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" mb={3}>
              <LocationOnIcon color="secondary" />
              <Typography variant="body2" color="text.secondary">
                <strong>Address:</strong> Warangal, Telangana, India
              </Typography>
            </Stack>

            <Box>
              <MuiLink
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mr: 2, color: "secondary.main", fontSize: "1.8rem" }}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </MuiLink>
              <MuiLink
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "secondary.main", fontSize: "1.8rem" }}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </MuiLink>
            </Box>
          </Box>
        </Card>
      </Fade>
    </Box>
  );
}

export default Contact;