const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = []; // temporary in-memory DB
const SECRET = "your_jwt_secret"; // in production → use env variable

// Register route
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

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

// Protected route
app.get("/dashboard-data", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    res.json({
      message: "Welcome to your dashboard!",
      user: user.email,
      data: ["Item 1", "Item 2", "Item 3"],
    });
  });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
