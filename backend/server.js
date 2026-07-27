require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      }
      else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", limiter);

// Routes
app.use("/api/members", require("./routes/members"));
app.use("/api/contact", require("./routes/contact"));

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AICPE API Running",
    timestamp: new Date(),
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;
console.log("Loading server.js");

connectDB().then(() => {
  console.log("Database connected");
}).catch((err) => {
  console.error("Database error:", err);
});

app.get("/api/health", (req, res) => {
  console.log("Health route reached");

  res.status(200).json({
    success: true,
    message: "AICPE API Running",
    timestamp: new Date(),
  });

  console.log("Health response sent");
});