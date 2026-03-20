import axios from 'axios';
import ENV from './env.js';

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const askOpenRouter = async (prompt) => {
  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${ENV.API_KEY.OPENROUTER}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);
    throw new Error("AI request failed");
  }
};