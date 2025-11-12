import { GoogleGenAI } from "@google/genai";
import config from "../config/env.js";
import logger from "../utils/logger.js";
import { summarizePrompt } from "../tools/summarize.tool.js";
import { tonePrompt } from "../tools/tone.tool.js";
import { injectContext } from "../tools/context.tool.js";
import { applyTool } from "../tools/index.js";

// Initialize the Google Gen AI client
const ai = new GoogleGenAI({ apiKey: config.geminiKey });

class GeminiService {
  // Retry configuration
  static MAX_RETRIES = 3;
  static INITIAL_RETRY_DELAY = 1000; // 1 second

  /**
   * Implements exponential backoff retry logic
   */
  static async retryWithBackoff(fn, retries = this.MAX_RETRIES) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err) {
        const isLastRetry = i === retries - 1;
        const isRateLimitError = err.status === 429;

        // Don't retry if it's the last attempt or not a rate limit error
        if (isLastRetry || !isRateLimitError) {
          throw err;
        }

        // Calculate exponential backoff: 1s, 2s, 4s, 8s...
        const delay = this.INITIAL_RETRY_DELAY * Math.pow(2, i);

        logger.warn(
          `Rate limit hit (429). Retrying in ${delay}ms... (attempt ${
            i + 1
          }/${retries})`
        );

        await this.sleep(delay);
      }
    }
  }

  /**
   * Sleep utility
   */
  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Generate response from Gemini with retry logic
   */
  static async generateResponse(prompt, context = "", options = {}) {
    try {
      let modifiedPrompt = prompt;

      modifiedPrompt = applyTool(options.tool, prompt, options);

      // Combine context and prompt
      const fullPrompt = context
        ? `${context}\n${modifiedPrompt}`
        : modifiedPrompt;

      // Wrap the API call with retry logic
      const response = await this.retryWithBackoff(async () => {
        return await ai.models.generateContent({
          model: "gemini-2.5-flash", // Use the latest stable model
          contents: fullPrompt,
        });
      });

      const aiResponse = response.text;

      if (!aiResponse) {
        throw new Error("Empty or malformed response from Gemini");
      }

      logger.info(`Gemini [tool=${options.tool || "none"}] → success`);

      return aiResponse;
    } catch (err) {
      // Enhanced error logging with API-specific errors
      logger.error(`Gemini API Error:`, {
        message: err.message,
        status: err.status,
        details: err.details,
      });

      // Throw specific errors based on error type
      if (err.status === 429) {
        throw new Error(
          "Rate limit exceeded. Please try again in a few moments."
        );
      } else if (err.status === 401 || err.status === 403) {
        throw new Error("Invalid API key. Please check your configuration.");
      } else if (err.status === 400) {
        throw new Error(`Bad request: ${err.message || "Invalid input"}`);
      } else {
        throw new Error(`Failed to get response from Gemini: ${err.message}`);
      }
    }
  }
}

export default GeminiService;
