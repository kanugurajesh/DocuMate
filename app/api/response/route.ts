import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Function to convert file to the format needed by Generative AI
const fileToGenerativePart = (path: string, mimeType: string) => {
  try {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType,
      },
    };
  } catch (error) {
    console.error("Error reading file:", error);
    throw new Error("File not found or could not be read");
  }
};

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { userPrompt } = reqBody;

    // Generate model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare file part (ensure the path is valid)
    const filePart1 = fileToGenerativePart("./pdf/Resume.pdf", "application/pdf");

    // Generate content by passing the user prompt and file
    const generatedContent = await model.generateContent([userPrompt, filePart1]);

    // Ensure proper handling of the response text
    const responseText = generatedContent.response?.text() ?? "No response text available";

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: "Something went wrong while generating content" });
  }
}
