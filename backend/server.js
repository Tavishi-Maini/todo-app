// server.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = []; // temporary in-memory DB
const SECRET = "your_jwt_secret";

// Register route
app.post("/register", async (req, res) => {
  console.log("Incoming registration data:", req.body);

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword });

  res.json({ message: "User registered successfully!" });
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) return res.status(400).json({ error: "User not found" });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: "1h" });
  res.json({ token, username: user.username });
});
