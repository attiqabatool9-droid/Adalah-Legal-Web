const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); // 1. Path module import kiya (Folder access ke liye)

// 1. Config sabse pehle load karein
dotenv.config();

// 2. Database connection import karein
const connectDB = require('./config/db');

// 3. Database connect karein
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 2. Ye line add ki (Data parsing ke liye zaroori)

// Log all requests
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 3. Uploads folder ko Public kiya (Taaki Images/License access ho sakein)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cases', require('./routes/caseRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Test route
app.get("/", (req, res) => {
  res.send("Adalah Legal Backend is running 🚀");
});

// Test endpoint for debugging
app.get("/test-get-users", async (req, res) => {
  try {
    const User = require('./models/userModel');
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404 Handler - Ye sabse last mein hona chahiye
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.path} not found` });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});