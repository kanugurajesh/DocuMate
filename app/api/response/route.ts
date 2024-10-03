import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import fetch from "node-fetch";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Function to convert file to the format needed by Generative AI
const fileToGenerativePart = async (path: string, mimeType: string) => {
  try {
    let fileData;

    // Check if the path is a URL
    if (path.startsWith("http")) {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch file from URL: ${response.statusText}`
        );
      }

      fileData = await response.arrayBuffer(); // Get file as array buffer
    } else {
      // Local file path
      fileData = fs.readFileSync(path);
    }

    return {
      inlineData: {
        data: Buffer.from(fileData).toString("base64"),
        mimeType,
      },
    };
  } catch (error) {
    console.error("Error reading file:", error);
    throw new Error(
      "File not found, could not be read, or could not be fetched"
    );
  }
};

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const URL =
      "https://utfs.io/f/gkxe2vsxi0H6w4PPQ8yimA3kMXIuU5FEvyelHYTgbGK6czCa";
    const { userPrompt } = reqBody;

    // Generate model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Use the file from a URL
    const filePart1 = await fileToGenerativePart(URL, "application/pdf");

    // Generate content by passing the user prompt and file
    const generatedContent = await model.generateContent([
      userPrompt,
      filePart1,
    ]);

    // Ensure proper handling of the response text
    const responseText =
      generatedContent.response?.text() ?? "No response text available";

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({
      error: "Something went wrong while generating content",
    });
  }
}
