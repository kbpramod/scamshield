import request from "supertest";
import app from "../app.js";

jest.mock("../services/ocr.service.js", () => ({
  extractTextFromImage: jest.fn(),
}));

jest.mock("../services/ai-check.service.js", () => ({
  checkScamWithAI: jest.fn(),
}));

import { extractTextFromImage } from "../services/ocr.service.js";
import { checkScamWithAI } from "../services/ai-check.service.js";

describe("POST /api/check-scam", () => {

  it("should return 400 if image is missing", async () => {
    const res = await request(app)
      .post("/api/check-scam");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should return scam analysis for valid image", async () => {
    extractTextFromImage.mockResolvedValue("You won lottery click now");
    checkScamWithAI.mockResolvedValue({
      status: "red",
      confidence: 0.95,
      reason: "Lottery scam",
    });

    const res = await request(app)
      .post("/api/check-scam")
      .attach("image", Buffer.from("fake-image"), "test.png");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("red");
  });

  it("should handle internal errors", async () => {
    extractTextFromImage.mockRejectedValue(new Error("OCR failed"));

    const res = await request(app)
      .post("/api/check-scam")
      .attach("image", Buffer.from("fake-image"), "test.png");

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
  });

});