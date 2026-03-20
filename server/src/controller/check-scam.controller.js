import Logger from "../utils/logger.js";
import { checkScamService } from "../services/check-scam.service.js";

const logger = new Logger("CheckScamController");

export const checkScam = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      });
    }

    const buffer = file.buffer;

    const result = await checkScamService(buffer);

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    logger.error("Error in checkScam:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};