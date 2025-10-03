import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../lib/api";
import { Box, TextField, Button, Typography, Card } from "@mui/material";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login/", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
      <Card sx={{ p: 4, width: 400, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <TextField
          fullWidth
          name="email"
          label="E-mail"
          value={form.email}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleLogin}>
          Login
        </Button>
        <Button onClick={() => navigate("/register")} sx={{ mt: 1 }}>
          Don't have an account? Sign Up
        </Button>
      </Card>
    </Box>
  );
}
