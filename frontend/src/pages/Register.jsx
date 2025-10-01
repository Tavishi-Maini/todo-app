import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register/", form);
      alert("Registration successful! Please login.");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 10 }}>
      <CardContent>
        <Typography variant="h5">Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Username" name="username" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
          <Button type="submit" variant="contained" fullWidth>Register</Button>
        </form>
      </CardContent>
    </Card>
  );
}
