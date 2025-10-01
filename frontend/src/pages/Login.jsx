import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

export default function Login() {
  const [form, setForm] = React.useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", form);
      localStorage.setItem("token", res.data.access);
      alert("Login successful!");
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 10 }}>
      <CardContent>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Username" name="username" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
          <Button type="submit" variant="contained" fullWidth>Login</Button>
        </form>
      </CardContent>
    </Card>
  );
}
