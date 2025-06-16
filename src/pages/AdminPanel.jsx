import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminPanel() {
  const [products, setProducts] = useState([
    { id: 1, name: "Gold Ring", price: 15000 },
    { id: 2, name: "Diamond Necklace", price: 50000 }
  ]);
  const [form, setForm] = useState({ name: "", price: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setProducts([
      ...products,
      { id: Date.now(), name: form.name, price: Number(form.price) }
    ]);
    setForm({ name: "", price: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Box
        sx={{
          p: 4,
          border: "1px solid #e2c275",
          borderRadius: "12px",
          background: "#fff"
        }}
      >
        <Typography variant="h4" color="#7b5e2e" gutterBottom>
          Admin Panel
        </Typography>
        <Box
          component="form"
          onSubmit={handleAdd}
          sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}
        >
          <TextField
            name="name"
            label="Product Name"
            value={form.name}
            onChange={handleChange}
            required
            variant="outlined"
            sx={{ flex: 1, minWidth: 160 }}
          />
          <TextField
            name="price"
            label="Price (₹)"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            variant="outlined"
            sx={{ flex: 1, minWidth: 120 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "#7b5e2e",
              color: "#fff",
              minWidth: 120,
              "&:hover": { background: "#5d491f" }
            }}
          >
            Add Product
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#f3e9da" }}>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Product
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Price (₹)
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="left">{product.price}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleDelete(product.id)}
                      sx={{
                        color: "#fff",
                        background: "#b23c3c",
                        "&:hover": { background: "#7a2424" }
                      }}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No products.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default AdminPanel;