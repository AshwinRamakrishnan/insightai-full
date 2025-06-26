// File: src/api/geminiClient.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDFF0qlHYRFm0U9wKX5iLfuuMKfnvTw1Qs");

export const runGemini = async (inputText) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(inputText);
  const response = await result.response;
  const text = response.text();

  return text;
};
