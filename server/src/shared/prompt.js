const buildCheckScamPrompt = (extractedText) => `
You are a scam detection system.

Analyze the following message and classify it:

Return ONLY JSON:
{
  "status": "red | yellow | green",
  "confidence": 0-1,
  "reason": "short explanation"
}

Message:
"${extractedText}"
`;

export { buildCheckScamPrompt };