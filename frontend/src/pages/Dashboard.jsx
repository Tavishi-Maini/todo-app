import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Typography, Box } from "@mui/material";

export default function Dashboard() {
  const { user, setUser } = React.useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Box sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4">Welcome, {user?.username}!</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}
