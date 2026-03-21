import { askOpenRouter } from "../config/openrouter.js";
import { askGemini } from "../config/gemini.js";
import { buildCheckScamPrompt } from "../shared/prompt.js";
import Logger from "../utils/logger.js";

const logger = new Logger("AICheckService");

const extractFromText = (text) => {
  const lower = text.toLowerCase();

  let status = "yellow";

  if (lower.includes("scam") || lower.includes("deceptive")) {
    status = "red";
  } else if (lower.includes("safe") || lower.includes("legitimate")) {
    status = "green";
  }

  return {
    status,
    confidence: 0.6,
    reason: "Parsed from unstructured AI response",
  };
};

const safeParse = (text) => {
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

    if (!jsonMatch) throw new Error("No JSON");

    return JSON.parse(jsonMatch[0]);
  } catch {
    logger.error("JSON parse failed, using fallback extraction");
    return extractFromText(text);
  }
};

export const checkScamWithAI = async (extractedText) => {
  const prompt = buildCheckScamPrompt(extractedText);

  console.log("Constructed Prompt:", prompt);

  let aiResponse;

  try {
    aiResponse = await askGemini(prompt);
  } catch (err) {
    logger.error("Gemini failed, falling back to OpenRouter...");
  }

  console.log("AI Response from Gemini:", aiResponse);

  if (!aiResponse) {
    try {
      aiResponse = await askOpenRouter(prompt);
    } catch (err) {
      logger.error("OpenRouter also failed");
      throw new Error("All AI providers failed");
    }
  }

  console.log("AI Response from OpenRouter:", aiResponse);

  logger.info("AI response:", aiResponse);

  let parsed = safeParse(aiResponse);

  console.log("Parsed AI Response:", parsed);

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