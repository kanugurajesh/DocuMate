import { NextRequest, NextResponse } from "next/server"; // To handle the request and response
import { promises as fs } from "fs"; // To save the file temporarily
import { v4 as uuidv4 } from "uuid"; // To generate a unique filename
import PDFParser from "pdf2json"; // To parse the pdf

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll("filepond");
  let fileName = "";
  let parsedText = "";

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[1]; // Use the first uploaded file

    // Check if uploadedFile is of type File
    if (uploadedFile instanceof File) {
      // Generate a unique filename
      fileName = uuidv4();

      // Convert the uploaded file into a temporary file
      const tempFilePath = `/tmp/${fileName}.pdf`;

      // Convert ArrayBuffer to Buffer
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

      // Save the buffer as a file
      await fs.writeFile(tempFilePath, fileBuffer);

      // Create a new Promise for parsing
      const pdfParser = new (PDFParser as any)(null, 1);

      // Create a promise to handle the parsing
      const parsingPromise = new Promise((resolve, reject) => {
        pdfParser.on("pdfParser_dataError", (errData: any) => {
          reject(errData.parserError); // Reject the promise on error
        });

        pdfParser.on("pdfParser_dataReady", () => {
          parsedText = (pdfParser as any).getRawTextContent();
          resolve(parsedText); // Resolve the promise with parsed text
        });
      });

      // Load and parse the PDF
      await pdfParser.loadPDF(tempFilePath);
      await parsingPromise; // Wait for the parsing to complete
    } else {
      return NextResponse.json({ error: "Invalid file format." });
    }
  } else {
    return NextResponse.json({ error: "No files uploaded." });
  }
  return NextResponse.json({ parsedText, fileName });
}
