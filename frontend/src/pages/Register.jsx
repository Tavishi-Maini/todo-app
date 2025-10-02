import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Card } from "@mui/material";
import API from "../lib/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await API.post("/register", form);
      navigate("/login"); // redirect to login after successful signup
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
      <Card sx={{ p: 4, width: 400, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Create Account
        </Typography>
        <TextField
          fullWidth
          name="username"
          label="Username"
          value={form.username}
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
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleRegister}
        >
          Sign Up
        </Button>
        <Button
          onClick={() => navigate("/login")}
          sx={{ mt: 1 }}
        >
          Already have an account? Login
        </Button>
      </Card>
    </Box>
  );
}
