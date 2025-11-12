import GeminiService from "../services/gemini.service.js";
import logger from "../utils/logger.js";

export const handleChat = async (req, res, next) => {
  try {
    const { message, context, tool, tone } = req.body;

    if (!message || message.trim() === "") {
      return res
        .status(400)
        .json({ success: false, error: "Message is required" });
    }

    logger.info(`Incoming message: "${message}" [tool=${tool || "none"}]`);

    const aiResponse = await GeminiService.generateResponse(message, context, {
      tool,
      tone,
    });

    res.status(200).json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
