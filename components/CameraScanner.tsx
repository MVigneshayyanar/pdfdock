"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Camera, X, Check, RefreshCw } from "lucide-react";
import { imagesToPDF } from "@/lib/pdf/pdfOperations";
import PerspectiveCropPopup from "./PerspectiveCropPopup";
// Note: jscanify expects cv to be on the window object
// @ts-ignore
import jscanify from "jscanify/client";

export default function CameraScanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  // For the popup
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detectedCorners, setDetectedCorners] = useState<any>(null);

  // Animation frame ID
  const rafRef = useRef<number>(0);
  const jscanifyRef = useRef<any>(null);

  useEffect(() => {
    // Only init jscanify once cv is ready
    const checkCv = setInterval(() => {
      if ((window as any).cv && !jscanifyRef.current) {
        jscanifyRef.current = new jscanify();
        clearInterval(checkCv);
      }
    }, 500);
    return () => clearInterval(checkCv);
  }, []);

  const startCamera = useCallback(async () => {
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check permissions.");
    }
  }, [facingMode]);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      cancelAnimationFrame(rafRef.current);
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      cancelAnimationFrame(rafRef.current);
    };
  }, [isOpen, facingMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // Real-time paper detection overlay
  const processFrame = useCallback(() => {
    if (!videoRef.current || !overlayCanvasRef.current || !jscanifyRef.current || !(window as any).cv) {
      rafRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const video = videoRef.current;
    const overlay = overlayCanvasRef.current;
    
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      rafRef.current = requestAnimationFrame(processFrame);
      return;
    }

    overlay.width = video.videoWidth;
    overlay.height = video.videoHeight;
    const ctx = overlay.getContext("2d");
    if (!ctx) return;

    // To prevent lagging the UI, we scale down the video for detection
    const scale = 0.5;
    const workCanvas = document.createElement("canvas");
    workCanvas.width = video.videoWidth * scale;
    workCanvas.height = video.videoHeight * scale;
    const workCtx = workCanvas.getContext("2d");
    if (workCtx) {
      workCtx.drawImage(video, 0, 0, workCanvas.width, workCanvas.height);
      
      try {
        const cv = (window as any).cv;
        // Check if cv is fully loaded
        if (cv && cv.Mat) {
          const img = cv.imread(workCanvas);
          const maxContour = jscanifyRef.current.findPaperContour(img);
          
          ctx.clearRect(0, 0, overlay.width, overlay.height);
          
          if (maxContour) {
            const corners = jscanifyRef.current.getCornerPoints(maxContour, img);
            if (
              corners.topLeftCorner &&
              corners.topRightCorner &&
              corners.bottomLeftCorner &&
              corners.bottomRightCorner
            ) {
              // Scale corners back up
              const tl = { x: corners.topLeftCorner.x / scale, y: corners.topLeftCorner.y / scale };
              const tr = { x: corners.topRightCorner.x / scale, y: corners.topRightCorner.y / scale };
              const bl = { x: corners.bottomLeftCorner.x / scale, y: corners.bottomLeftCorner.y / scale };
              const br = { x: corners.bottomRightCorner.x / scale, y: corners.bottomRightCorner.y / scale };

              ctx.strokeStyle = "orange";
              ctx.lineWidth = 4;
              ctx.beginPath();
              ctx.moveTo(tl.x, tl.y);
              ctx.lineTo(tr.x, tr.y);
              ctx.lineTo(br.x, br.y);
              ctx.lineTo(bl.x, bl.y);
              ctx.closePath();
              ctx.stroke();

              // Draw translucent overlay
              ctx.fillStyle = "rgba(255, 165, 0, 0.2)";
              ctx.fill();
            }
          }
          img.delete();
        }
      } catch (e) {
        // Ignore OpenCV errors during live preview
      }
    }

    rafRef.current = requestAnimationFrame(processFrame);
  }, []);

  useEffect(() => {
    if (isOpen && !capturedImage) {
      rafRef.current = requestAnimationFrame(processFrame);
    } else {
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isOpen, capturedImage, processFrame]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Find corners on the high-res capture to pass to popup
        let foundCorners = null;
        if (jscanifyRef.current && (window as any).cv) {
          try {
            const cv = (window as any).cv;
            const img = cv.imread(canvas);
            const maxContour = jscanifyRef.current.findPaperContour(img);
            if (maxContour) {
              foundCorners = jscanifyRef.current.getCornerPoints(maxContour, img);
            }
            img.delete();
          } catch(e) {
            console.error("Error finding corners on capture", e);
          }
        }

        setDetectedCorners(foundCorners);
        setCapturedImage(canvas.toDataURL("image/jpeg", 0.9));
      }
    }
  };

  const handleApplyCrop = (corners: any) => {
    if (!capturedImage) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      let resultCanvas = canvas;

      if (jscanifyRef.current && (window as any).cv) {
        try {
          // Calculate destination width and height based on distances
          const tWidth = Math.hypot(corners.topRightCorner.x - corners.topLeftCorner.x, corners.topRightCorner.y - corners.topLeftCorner.y);
          const bWidth = Math.hypot(corners.bottomRightCorner.x - corners.bottomLeftCorner.x, corners.bottomRightCorner.y - corners.bottomLeftCorner.y);
          const lHeight = Math.hypot(corners.bottomLeftCorner.x - corners.topLeftCorner.x, corners.bottomLeftCorner.y - corners.topLeftCorner.y);
          const rHeight = Math.hypot(corners.bottomRightCorner.x - corners.topRightCorner.x, corners.bottomRightCorner.y - corners.topRightCorner.y);
          
          const resultWidth = Math.max(1, Math.round(Math.max(tWidth, bWidth)));
          const resultHeight = Math.max(1, Math.round(Math.max(lHeight, rHeight)));

          // Extract using jscanify
          const extracted = jscanifyRef.current.extractPaper(canvas, resultWidth, resultHeight, corners);
          if (extracted) {
            resultCanvas = extracted;
          }
        } catch(e) {
          console.error("Error extracting paper", e);
        }
      }

      resultCanvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `scan_${images.length + 1}.jpg`, { type: "image/jpeg" });
          setImages((prev) => [...prev, file]);
          setCapturedImage(null);
        }
      }, "image/jpeg", 0.9);
    };
    img.src = capturedImage;
  };

  const handleMakePdf = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    try {
      const pdfBytes = await imagesToPDF(images, {
        rotations: images.map(() => 0), 
      });
      
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "PDFDock_Scanned_Document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setIsOpen(false);
      setImages([]);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/40 hover:-translate-y-1 hover:shadow-brand/60 transition-all focus:outline-none"
        aria-label="Scan Document"
      >
        <Camera className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black">
          <div className="flex items-center justify-between p-4 bg-black text-white">
            <button onClick={() => setIsOpen(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
              <X className="h-6 w-6" />
            </button>
            <div className="font-display font-bold">Scan to PDF ({images.length})</div>
            <button onClick={toggleCamera} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex-1 flex flex-col items-center justify-center bg-black overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
            <canvas ref={overlayCanvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="bg-black pb-8 pt-4 px-6 flex justify-between items-center h-32">
            <div className="w-16">
              {images.length > 0 && (
                <div className="relative h-12 w-12 rounded border-2 border-white/50 overflow-hidden bg-gray-800">
                  <img
                    src={URL.createObjectURL(images[images.length - 1])}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute -top-2 -right-2 bg-brand text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-black">
                    {images.length}
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={handleCapture}
              className="h-20 w-20 rounded-full border-4 border-white flex items-center justify-center bg-transparent active:scale-95 transition-transform"
            >
              <div className="h-16 w-16 rounded-full bg-white"></div>
            </button>
            
            <div className="w-16 flex justify-end">
              {images.length > 0 && (
                <button
                  onClick={handleMakePdf}
                  disabled={isProcessing}
                  className="h-12 w-12 rounded-full bg-brand flex items-center justify-center text-white active:scale-95 transition-transform disabled:opacity-50"
                >
                  {isProcessing ? <RefreshCw className="h-6 w-6 animate-spin" /> : <Check className="h-6 w-6" />}
                </button>
              )}
            </div>
          </div>

          {capturedImage && (
            <PerspectiveCropPopup
              imageSrc={capturedImage}
              initialCorners={detectedCorners}
              onApply={handleApplyCrop}
              onCancel={() => setCapturedImage(null)}
            />
          )}
        </div>
      )}
    </>
  );
}
