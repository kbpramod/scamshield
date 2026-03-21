const buildCheckScamPrompt = (extractedText) => `
You are a STRICT JSON API. You must ONLY return valid JSON.

TASK:
Analyze the message and classify it as scam risk.

OUTPUT FORMAT (MANDATORY):
{
  "status": "red" | "yellow" | "green",
  "confidence": number between 0 and 1,
  "reason": string (min 30 words, max 70 words)
}

RULES (VERY IMPORTANT):
- Output MUST be valid JSON
- DO NOT include any explanation
- DO NOT include any text before or after JSON
- DO NOT use markdown (no \`\`\`)
- DO NOT add new lines outside JSON
- DO NOT change keys or structure
- If unsure, return "yellow"

FAILURE CONDITION:
If you output anything other than JSON, your response is INVALID.

MESSAGE TO ANALYZE:
${extractedText}
`;

export { buildCheckScamPrompt };