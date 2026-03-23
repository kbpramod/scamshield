📄 ScamShield – Technical Documentation

---

🌐 Deployed API

Base URL:

http://3.81.248.233 

Endpoint:

POST /api/check-scam

---

📥 Request

Content-Type

multipart/form-data

Body

Field| Type| Description
image| file| Screenshot image (SMS, WhatsApp, etc.)

---

📤 Response

{
  "success": true,
  "data": {
    "status": "red | yellow | green",
    "confidence": 0.0,
    "reason": "short explanation"
  }
}

---

🔄 API Flow (Processing Pipeline)

Image Upload
   ↓
In-Memory Processing (No Storage)
   ↓
OCR (Tesseract)
   ↓
Text Extraction
   ↓
Prompt Builder
   ↓
AI Layer (Gemini - Primary)
   ↓ (Fallback)
OpenRouter
   ↓
Rule-Based Model (Keyword Detection)
   ↓
Final Classification (Red / Yellow / Green)
   ↓
Response

---

🧠 Processing Details

1. In-Memory Handling

- Images are processed in memory
- No disk storage for privacy

---

2. OCR Layer

- Uses Tesseract OCR
- Extracts raw text from screenshots

---

3. Prompt Builder

- Converts extracted text into structured AI prompt
- Enforces strict JSON output

---

4. AI Classification

- Primary: Gemini ("gemini-3.1-flash-lite-preview")
- Fallback: OpenRouter (LLaMA / Mistral models)

---

5. Rule-Based Detection

- Keyword-based checks:
  - "urgent"
  - "lottery"
  - "OTP"
  - "bank"
  - "click link"
- Enhances reliability and confidence scoring

---

6. Response Generation

- Combines AI + rule signals
- Returns structured result

---

🚀 Deployment Architecture

Client (Cordova App)
        ↓
Node.js Backend (Express)
        ↓
GitHub Repository
        ↓
GitHub Actions (CI/CD)
        ↓
AWS EC2 Instance
        ↓
PM2 (Process Manager)
        ↓
Nginx (Reverse Proxy)
        ↓
Public API (Port 80)

---

⚙️ Deployment Details

Backend

- Node.js + Express
- Hosted on AWS EC2 (Amazon Linux)

---

Process Management

- PM2 used for:
  - Background execution
  - Auto-restart
  - Stability

---

Reverse Proxy

- Nginx routes:

http://3.81.248.233 → Node server (port 5000)

---

CI/CD

- GitHub Actions for automated deployment (optional)

---

🔐 Security & Privacy

- No image storage (processed in-memory only)
- No logging of sensitive image data
- CORS enabled for controlled access

---

⚠️ Limitations

- AI responses may vary slightly
- OCR accuracy depends on image quality
- Free-tier API limits (Gemini/OpenRouter)

---

📌 Future Improvements

- Add caching (Redis)
- Improve OCR preprocessing (sharp)
- Add rate limiting
- Deploy HTTPS with domain
- Enhance rule-based scoring system

---

🧠 Summary

ScamShield uses a hybrid approach:

- OCR for text extraction
- AI models for semantic understanding
- Rule-based logic for reliability

This ensures accurate, explainable, and real-time scam detection.
