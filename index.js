const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Database connection import
require("dotenv").config();

// 1. Database Connect karein
connectDB();

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 3. Routes (Dono Routes hone chahiye)
app.use('/api/users', require('./routes/userRoutes')); // Users/Auth ke liye
console.log("Trying to load Case Routes...");
app.use('/api/cases', require('./routes/caseRoutes')); // Cases ke liye

// Test Route
app.get("/", (req, res) => {
  res.send("Adalah Legal Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});