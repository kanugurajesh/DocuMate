import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const result = await model.generateContent(prompt);
  return new Response(result.response.text());
}
