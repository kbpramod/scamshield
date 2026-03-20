import { askOpenRouter } from "../config/openrouter.js";
import { askGemini } from "../config/gemini.js";
import { buildCheckScamPrompt } from "../shared/prompt.js";
import Logger from "../utils/logger.js";

const logger = new Logger("AICheckService");

const safeParse = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    logger.error("AI response parsing failed");
    return null;
  }
};

export const checkScamWithAI = async (extractedText) => {
  const prompt = buildCheckScamPrompt(extractedText);

  let aiResponse;

  try {
    aiResponse = await askOpenRouter(prompt);
  } catch (err) {
    logger.error("OpenRouter failed, falling back to Gemini...");
  }

  if (!aiResponse) {
    try {
      aiResponse = await askGemini(prompt);
    } catch (err) {
      logger.error("Gemini also failed");
      throw new Error("All AI providers failed");
    }
  }

  logger.debug("AI response:", aiResponse);

  let parsed = safeParse(aiResponse);

  if (!parsed) {
    logger.error("AI response parsing failed");
    parsed = {
      status: "yellow",
      confidence: 0.5,
      reason: "AI response parsing failed",
    };
  }

  return parsed;
};