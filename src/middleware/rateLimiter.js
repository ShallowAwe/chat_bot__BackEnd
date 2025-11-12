import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // 15 requests/minute per IP
  message: { success: false, error: "Too many requests, slow down." },
});
