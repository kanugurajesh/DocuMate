"use client";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useState } from "react";
import Lottie from "react-lottie";
import animationUpload from "@/public/lottifiles/upload-file.json";
import toast, { Toaster } from "react-hot-toast";
import Markdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { MessageCircleCode, Upload } from "lucide-react";
import { Send, Copy, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/color-toggle";
import { cn } from "@/lib/utils";
import styles from "../styles/styles.module.css";
import { HoverInfo } from "@/components/HoverInfo";
import { Audio } from "react-loader-spinner";

export default function FileUpload() {
  const [fileResponse, setFileResponse] = useState(null);

  const uploadOptions = {
    loop: true,
    autoplay: true,
    animationData: animationUpload,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const Notify = (status: string, message: string) => {
    toast.dismiss();
    if (status === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div>
      <Toaster />
      <div>
        <FilePond
          server={{
            process: {
              url: "/api/upload",
              method: "POST",
              withCredentials: false,
              onload: (response) => {
                // parse the json response
                const fileResponse = JSON.parse(response);
                setFileResponse(fileResponse);
                return response; // Return the response to FilePond
              },
              onerror: (response) => {
                return response; // Return the error to FilePond
              },
            },
            fetch: null,
            revert: null,
          }}
        />
      </div>
      <div>
        {fileResponse ? (
          <div>
            <h2>File uploaded successfully!</h2>
          </div>
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center">
            <h2 className="font-bold mt-10">Upload a file to chat</h2>
            <p>Supported file types: PDF</p>
            <div
              className="h-[260px] w-[260px]"
              onClick={() => Notify("success", "upload a pdf")}
            >
              <Lottie options={uploadOptions} height={260} width={260} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
