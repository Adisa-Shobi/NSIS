"use client";
import AuthenticateButton from "@/components/authButton";
import CaptureButton from "@/components/captureButton";
import { GestureAlert } from "@/components/gestureAlert";
import { toast } from "@/components/ui/use-toast";
import WebcamPreview from "@/components/webcamPreview";
import { useState } from "react";

export default function Home() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  function handleCapture() {
    setIsCapturing(true);
  }

  function handleAuth() {
    console.log(image);
    toast({
      description: "Authentication successful",
    })
    // validate image here
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify p-5">
      <h1 className="text-black text-4xl font-bold font-mono text-center lg:text-left w-full">N.S.I.S</h1>
      <div className="flex justify-between w-full mt-10">
        {/* Content for the left side */}
        <div className="w-7/12">
          <WebcamPreview image={image} setImage={setImage} isCapturing={isCapturing} setIsCapturing={setIsCapturing} />
          <GestureAlert />
        </div>

        {/* Content for the right side */}
        <div className="w-5/12 flex flex-row items-center justify-center mx-auto pb-24">
          <CaptureButton handleCapture={handleCapture} />
          <span></span>
          {image && <AuthenticateButton handleCapture={handleAuth} />}
        </div>

      </div>

    </main>
  );
}
