import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
  Avatar,
  Stack,
  IconButton,
  Tooltip
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import axios from "axios";

// You can replace this URL with any jewelry-themed avatar/image you want
const jewelryAvatarUrl = "images/logo.jpg";

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", loginForm);
      setMessage(`Welcome back, ${res.data.name || loginForm.email}!`);
      setLoggedInUser({ email: loginForm.email, name: res.data.name || "User" });
      setLoginForm({ email: "", password: "" });
      navigate("/dashboard");
    } catch (err) {
      setMessage("Login failed. Check your credentials.");
      console.error("Login error:", err);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", signupForm);
      setMessage(`Account created for ${signupForm.name}! Please log in.`);
      setSignupForm({ name: "", email: "", password: "" });
      setMode("login");
    } catch (err) {
      setMessage("Signup failed. Try a different email.");
      console.error("Signup error:", err);
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setMessage("Logged out successfully.");
    setMode("login");
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8} mb={8}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", position: "relative", bgcolor: "#F8F1E9" }}>
        <Stack spacing={3} alignItems="center" mb={3}>
          <Avatar
            src={jewelryAvatarUrl}
            alt="Jewelry Avatar"
            sx={{ width: 80, height: 80, border: "3px solid #1A2B4A" }}
          />
          <Typography variant="h5" sx={{ color: "#1A2B4A", fontWeight: "bold" }}>
            {loggedInUser ? `Hello, ${loggedInUser.name || loggedInUser.email}` : "Welcome to Jewelry Store"}
          </Typography>
          {loggedInUser && (
            <Tooltip title="Logout">
              <IconButton
                onClick={handleLogout}
                color="error"
                size="small"
                sx={{ position: "absolute", top: 16, right: 16 }}
                aria-label="logout"
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        {!loggedInUser && (
          <>
            <ToggleButtonGroup
              exclusive
              value={mode}
              onChange={(_, value) => value && setMode(value)}
              color="primary"
              sx={{ width: "100%", mb: 3, bgcolor: "#D4A017", borderRadius: "8px" }}
            >
              <ToggleButton value="login" sx={{ flex: 1, fontWeight: "bold", color: "#1A2B4A", "&.Mui-selected": { bgcolor: "#1A2B4A", color: "#F8F1E9" } }}>
                Login
              </ToggleButton>
              <ToggleButton value="signup" sx={{ flex: 1, fontWeight: "bold", color: "#1A2B4A", "&.Mui-selected": { bgcolor: "#1A2B4A", color: "#F8F1E9" } }}>
                Signup
              </ToggleButton>
            </ToggleButtonGroup>
            {message && (
              <Alert severity="info" sx={{ mb: 2, bgcolor: "#F8F1E9", color: "#1A2B4A" }}>
                {message}
              </Alert>
            )}
            {mode === "login" ? (
              <form onSubmit={handleLoginSubmit}>
                <TextField
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  margin="normal"
                  required
                  sx={{ "& .MuiInputLabel-root": { color: "#1A2B4A" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#1A2B4A" } } }}
                />
                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  fullWidth
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  margin="normal"
                  required
                  sx={{ "& .MuiInputLabel-root": { color: "#1A2B4A" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#1A2B4A" } } }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    background: "#1A2B4A",
                    color: "#F8F1E9",
                    "&:hover": { background: "#2E3B55" },
                    py: 1.5,
                    fontWeight: "bold"
                  }}
                >
                  Login
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit}>
                <TextField
                  name="name"
                  label="Full Name"
                  fullWidth
                  value={signupForm.name}
                  onChange={handleSignupChange}
                  margin="normal"
                  required
                  sx={{ "& .MuiInputLabel-root": { color: "#1A2B4A" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#1A2B4A" } } }}
                />
                <TextField
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth
                  value={signupForm.email}
                  onChange={handleSignupChange}
                  margin="normal"
                  required
                  sx={{ "& .MuiInputLabel-root": { color: "#1A2B4A" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#1A2B4A" } } }}
                />
                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  fullWidth
                  value={signupForm.password}
                  onChange={handleSignupChange}
                  margin="normal"
                  required
                  sx={{ "& .MuiInputLabel-root": { color: "#1A2B4A" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#1A2B4A" } } }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    background: "#1A2B4A",
                    color: "#F8F1E9",
                    "&:hover": { background: "#2E3B55" },
                    py: 1.5,
                    fontWeight: "bold"
                  }}
                >
                  Signup
                </Button>
              </form>
            )}
          </>
        )}

        {loggedInUser && (
          <Box mt={4} textAlign="center">
            <Alert severity="success" sx={{ bgcolor: "#F8F1E9", color: "#1A2B4A" }}>
              You are logged in!
            </Alert>
            <Button
              variant="outlined"
              color="error"
              sx={{ mt: 2, borderColor: "#1A2B4A", color: "#1A2B4A", "&:hover": { borderColor: "#2E3B55", bgcolor: "#F8F1E9" } }}
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Auth;