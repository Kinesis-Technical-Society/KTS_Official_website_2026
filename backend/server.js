const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load .env from backend directory or root directory
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Database Connection
connectDB();

// API Routes
app.use("/api/admin", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "KTS Events Backend API",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 KTS Backend Server running on http://localhost:${PORT}`);
  console.log(`   Admin Login: POST http://localhost:${PORT}/api/admin/login`);
  console.log(`   Events Endpoint: GET/POST http://localhost:${PORT}/api/events`);
  console.log(`=================================`);
});
