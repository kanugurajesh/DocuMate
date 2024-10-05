"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UploadPDF() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]); // Get the file
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("pdf", selectedFile); // Append the file to the form data

    try {
      const response = await fetch("/api/response", {
        method: "POST",
        body: formData, // Send the form data with the file
      });

      console.log(response)

      if (response.ok) {
        toast.success("File uploaded successfully");
      } else {
        toast.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit">Upload PDF</button>
      </form>
    </div>
  );
}
