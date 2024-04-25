"use client"
import React, { useRef, useState, useEffect } from 'react';
import CountdownTimer from './countdownTimer';
import CancelCapture from './cancelCapture';

interface WebcamPreviewProps {
    isCapturing: boolean;
    setIsCapturing?: (isCapturing: boolean) => void;
    image: string | null;
    setImage: (image: string | null) => void;
}

export default function WebcamPreview(props: WebcamPreviewProps) {
    const videoRef = useRef<any>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [timeLeft, setTimeLeft] = useState(3);

    function captureImage() {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        console.log(canvas)
        if (video && canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                const width = video.videoWidth;
                const height = video.videoHeight;
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video, 0, 0, width, height);
                const imageDataUrl = canvas.toDataURL('image/png');
                props.setImage(imageDataUrl);                
            }
        }
    }


    useEffect(() => {
        // exit early when we reach 0
        // if (!isCapturing) {

        // }
        if (!timeLeft) {
            if (props.isCapturing) {
                captureImage();
                console.log("Image captured")
            }
            props.setIsCapturing?.(false);
            setTimeLeft(3);
            return;
        };

        // save intervalId to clear the interval when the component re-renders
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
    }, [timeLeft, props.isCapturing]);

    async function setupMediaStream() {
        try {
            const ms = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: true
            });
            setMediaStream(ms);
        } catch (e) {
            alert("Camera is disabled");
            throw e;
        }
    }

    useEffect(() => {
        // Moved to inside of useEffect because this function is depended on `mediaStream`
        async function setupWebcamVideo() {
            if (!mediaStream) {
                await setupMediaStream();
            } else {
                const videoCurr = videoRef.current;
                if (!videoCurr) return;
                const video = videoCurr;
                if (!video.srcObject) {
                    video.srcObject = mediaStream;
                }
            }
        }
        setupWebcamVideo();
    }, [mediaStream]);

    function handleCancel() {
        props.setImage(null);
        setupMediaStream();
    }

    return (
        <div className="relative w-full pb-[50.25%] bg-gray-200 rounded-lg">
            <div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center rounded-lg">
                {props.isCapturing && <CountdownTimer seconds={timeLeft} />}
                { props.image && <CancelCapture handleCancel={handleCancel}/>}
                { !props.image && <video className="w-full h-full object-fit rounded-lg" ref={videoRef} autoPlay muted />}
                { props.image && <img className=" h-full" src={props.image}/> }
                <canvas className="hidden" ref={canvasRef}></canvas>
            </div>
        </div>
    );
}