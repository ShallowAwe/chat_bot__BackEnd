import express from "express";
import cors from "cors";
import morgan from "morgan";
import config from "./config/env.js";
import logger from "./utils/logger.js";
import chatRoutes from "./routes/chat.route.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { rateLimiter } from "./middleware/rateLimiter.js";

// --- Initialize App ---
const app = express();

// --- Core Middleware ---
app.use(express.json({ limit: "1mb" })); // protect from large payloads
app.use(cors());
app.use(morgan("dev")); // HTTP request logging (console)
app.use(rateLimiter);

// --- Health Check ---
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server healthy 🚀" });
});

// --- Main Routes ---
app.use("/chat", chatRoutes);

// --- Global Error Handler ---
app.use(errorHandler);

// --- Start Server ---
app.listen(config.port, () => {
  logger.info(
    `✅ Server running on port ${config.port} in ${config.nodeEnv} mode`
  );
});

// --- Handle Uncaught Exceptions ---
process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Promise Rejection: ${reason}`);
});

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});
