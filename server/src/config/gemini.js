import axios from "axios";
import ENV from "./env.js";

const GEMINI_URL = 
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent";
  
export const askGemini = async (prompt) => {
  try {
    const response = await axios.post(
      `${GEMINI_URL}?key=${ENV.API_KEY.GEMINI}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0,
          maxOutputTokens: 200,
        },
      }
    );

    const content =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error("Empty Gemini response");
    }

    return content;
  } catch (error) {
    console.error(
      "Gemini Error:",
      error.response?.data || error.message
    );
    throw new Error("Gemini request failed");
  }
};