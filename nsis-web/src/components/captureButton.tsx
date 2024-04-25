"use client";

import { Button } from "./ui/button"

interface CaptureButtonProps {
    handleCapture: (img?: any) => void;
}


export default function CaptureButton({ handleCapture }: CaptureButtonProps) {
    return (
        <Button
            className="flex justify-center items-center w-40 py-7 m-5"
            onClick={handleCapture}
        >
            Capture
        </Button>
    );
}