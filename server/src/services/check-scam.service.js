import Logger from "../utils/logger.js";
import { extractTextFromImage } from "./ocr.service.js";
import { checkScamWithAI } from "./ai-check.service.js";

const logger = new Logger("CheckScamService");

export const checkScamService = async (buffer) => {
  try {
    if (!buffer) {
      return "Image is required";
    }

    const extractedText = await extractTextFromImage(buffer);

    logger.info("Extracted Text:", extractedText);

    const aiResult = await checkScamWithAI(extractedText);

    return aiResult;

  } catch (error) {
    logger.error("Error in checkScam:", error);

    return "Internal server error";
  }
};