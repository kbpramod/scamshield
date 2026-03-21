import axios from "axios";
import FormData from "form-data";

export const extractTextFromImage = async (imageBuffer) => {
  try {
    const formData = new FormData();

    formData.append("file", imageBuffer, {
      filename: "image.png",
      contentType: "image/png",
    });

    formData.append("apikey", process.env.OCR_API_KEY);
    formData.append("language", "eng");

    const response = await axios.post(
      "https://api.ocr.space/parse/image",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    const parsedText =
      response.data?.ParsedResults?.[0]?.ParsedText || "";

    return parsedText;

  } catch (error) {
    console.error("OCR API Error:", error.response?.data || error.message);
    throw new Error("OCR failed");
  }
};