import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Card } from "@mui/material";
import API from "../lib/api";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await API.post("/api/auth/register/", form); // match Django URL
      localStorage.setItem("token", res.data.token);            // store JWT
      localStorage.setItem("username", res.data.username);
      navigate("/");                                           // redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
      <Card sx={{ p: 4, width: 400, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>Create Account</Typography>
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
        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleRegister}>
          Sign Up
        </Button>
        <Button onClick={() => navigate("/login")} sx={{ mt: 1 }}>
          Already have an account? Login
        </Button>
      </Card>
    </Box>
  );
}
