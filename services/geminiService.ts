import { GoogleGenAI, Type } from "@google/genai";
import { Quote } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const quoteSchema = {
  type: Type.OBJECT,
  properties: {
    quote: {
      type: Type.STRING,
      description: "The inspirational quote.",
    },
    author: {
      type: Type.STRING,
      description: "The author of the quote. If unknown, it should be 'Anonymous'.",
    },
  },
  required: ["quote", "author"],
};

export const generateQuote = async (): Promise<Quote> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a short, unique, and inspirational quote about perseverance or creativity.",
      config: {
        responseMimeType: "application/json",
        responseSchema: quoteSchema,
        temperature: 0.9,
      },
    });

    const text = response.text.trim();
    const parsedQuote: Quote = JSON.parse(text);
    return parsedQuote;
  } catch (error) {
    console.error("Error generating quote from Gemini API:", error);
    throw new Error("Failed to generate quote. The API may be unavailable or the request failed.");
  }
};
