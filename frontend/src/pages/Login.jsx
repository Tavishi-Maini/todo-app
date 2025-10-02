import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, loadUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        username,
        password,
      });

      // store access token in localStorage
      localStorage.setItem("token", res.data.access);
      console.log("Saved token:", res.data.access);

      // load user info into context
      await loadUser();
      console.log("After loadUser, user:", user);
    } catch (err) {
      console.error("Full error:", err);
      if (err.response && err.response.data) {
        alert("Login failed: " + JSON.stringify(err.response.data));
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
