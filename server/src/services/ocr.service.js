import Tesseract from "tesseract.js";
import Logger from "../utils/logger.js";

const logger = new Logger("OCRService");

export const extractTextFromImage = async (image) => {
  try {
    const result = await Tesseract.recognize(image, "eng", {
      logger: (m) => logger.info(m),
    });

    const text = result.data.text;

    logger.info("Extracted text:", text);

    return text;
  } catch (error) {
    logger.error("OCR Error:", error);
    throw new Error("Failed to extract text from image");
  }
};