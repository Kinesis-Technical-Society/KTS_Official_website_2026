const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cluster = require("cluster");
const os = require("os");
const connectDB = require("./config/db");

// Load .env from backend directory or root directory
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, "../.env") });

const numCPUs = os.cpus().length;
const isProd = process.env.NODE_ENV === "production";

// Use cluster mode in production for multi-core scaling
if (isProd && cluster.isPrimary) {
  console.log(`[Master Cluster] Primary process ${process.pid} is running with ${numCPUs} worker processes`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.warn(`[Master Cluster] Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const app = express();

  // Render runs behind a reverse proxy
  app.set("trust proxy", 1);

  // Security HTTP Headers
  app.use(helmet({ contentSecurityPolicy: false }));

  // Response Compression (Gzip / Brotli)
  app.use(compression({ level: 6, threshold: 512 }));

  // CORS & Body Parsing
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Rate Limiter: max 300 requests per 15 minutes per IP for general API
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many requests from this IP, please try again later." },
  });

  // Strict rate limiter for Admin Auth: max 15 requests per 15 mins
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many login attempts, please try again later." },
  });

  app.use("/api/", generalLimiter);
  app.use("/api/admin/login", authLimiter);

  // Database Connection
  connectDB();

  // API Routes
  app.use("/api/admin", require("./routes/authRoutes"));
  app.use("/api/events", require("./routes/eventRoutes"));
  app.use("/api/projects", require("./routes/projectRoutes"));
  app.use("/api/team", require("./routes/teamRoutes"));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      service: "KTS Events Backend API",
      workerPid: process.pid,
    });
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`🚀 KTS Backend Server running on http://localhost:${PORT} (PID: ${process.pid})`); 
    console.log(`=================================`);
  });
}
