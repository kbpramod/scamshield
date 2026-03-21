import axios from "axios";
import ENV from "./env.js";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const askOpenRouter = async (prompt) => {
  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: "meta-llama/llama-3-8b-instruct",

        messages: [
          {
            role: "system",
            content:
              "You are a strict JSON API. You only return valid JSON. No explanations, no markdown.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0,
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${ENV.API_KEY.OPENROUTER}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;

    return content;
  } catch (error) {
    console.error(
      "OpenRouter Error:",
      error.response?.data || error.message
    );
    throw new Error("AI request failed");
  }
};