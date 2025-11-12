import dotenv from "dotenv";
dotenv.config();

const required = ["GEMINI_API_KEY"];

required.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
});

const config = {
  port: process.env.PORT || 8080,
  geminiKey: process.env.GEMINI_API_KEY,
  nodeEnv: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info",
};

export default config;
