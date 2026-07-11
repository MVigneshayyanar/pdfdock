"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, X } from "lucide-react";

interface Point {
  x: number;
  y: number;
}

interface PerspectiveCropPopupProps {
  imageSrc: string;
  initialCorners: {
    topLeftCorner: Point;
    topRightCorner: Point;
    bottomLeftCorner: Point;
    bottomRightCorner: Point;
  } | null;
  onApply: (corners: {
    topLeftCorner: Point;
    topRightCorner: Point;
    bottomLeftCorner: Point;
    bottomRightCorner: Point;
  }) => void;
  onCancel: () => void;
}

export default function PerspectiveCropPopup({
  imageSrc,
  initialCorners,
  onApply,
  onCancel,
}: PerspectiveCropPopupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  
  const [corners, setCorners] = useState<{ [key: string]: Point }>({
    topLeftCorner: { x: 50, y: 50 },
    topRightCorner: { x: 250, y: 50 },
    bottomLeftCorner: { x: 50, y: 250 },
    bottomRightCorner: { x: 250, y: 250 },
  });

  const [activeCorner, setActiveCorner] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImage(img);
      if (initialCorners) {
        setCorners(initialCorners);
      } else {
        // Default to a 10% margin box if no corners detected
        setCorners({
          topLeftCorner: { x: img.width * 0.1, y: img.height * 0.1 },
          topRightCorner: { x: img.width * 0.9, y: img.height * 0.1 },
          bottomLeftCorner: { x: img.width * 0.1, y: img.height * 0.9 },
          bottomRightCorner: { x: img.width * 0.9, y: img.height * 0.9 },
        });
      }
    };
    img.src = imageSrc;
  }, [imageSrc, initialCorners]);

  useEffect(() => {
    if (!image || !canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate scale to fit image in container
    const containerWidth = container.clientWidth - 40;
    const containerHeight = container.clientHeight - 40;
    const scaleFactor = Math.min(
      containerWidth / image.width,
      containerHeight / image.height
    );
    setScale(scaleFactor);

    canvas.width = image.width * scaleFactor;
    canvas.height = image.height * scaleFactor;

    // Draw image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Draw dark overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw clear cropped area
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.moveTo(corners.topLeftCorner.x * scaleFactor, corners.topLeftCorner.y * scaleFactor);
    ctx.lineTo(corners.topRightCorner.x * scaleFactor, corners.topRightCorner.y * scaleFactor);
    ctx.lineTo(corners.bottomRightCorner.x * scaleFactor, corners.bottomRightCorner.y * scaleFactor);
    ctx.lineTo(corners.bottomLeftCorner.x * scaleFactor, corners.bottomLeftCorner.y * scaleFactor);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Draw lines
    ctx.strokeStyle = "#2454FF"; // Brand color
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(corners.topLeftCorner.x * scaleFactor, corners.topLeftCorner.y * scaleFactor);
    ctx.lineTo(corners.topRightCorner.x * scaleFactor, corners.topRightCorner.y * scaleFactor);
    ctx.lineTo(corners.bottomRightCorner.x * scaleFactor, corners.bottomRightCorner.y * scaleFactor);
    ctx.lineTo(corners.bottomLeftCorner.x * scaleFactor, corners.bottomLeftCorner.y * scaleFactor);
    ctx.closePath();
    ctx.stroke();

    // Draw corner handles
    ctx.fillStyle = "#FFFFFF";
    const handleRadius = 8;
    Object.values(corners).forEach((corner) => {
      ctx.beginPath();
      ctx.arc(corner.x * scaleFactor, corner.y * scaleFactor, handleRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

  }, [image, corners, scale]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    const HIT_RADIUS = 30 / scale; // Larger touch target
    for (const [key, corner] of Object.entries(corners)) {
      if (Math.hypot(corner.x - x, corner.y - y) < HIT_RADIUS) {
        setActiveCorner(key);
        break;
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!activeCorner || !canvasRef.current || !image) return;
    const rect = canvasRef.current.getBoundingClientRect();
    let x = (e.clientX - rect.left) / scale;
    let y = (e.clientY - rect.top) / scale;

    // Constrain to image bounds
    x = Math.max(0, Math.min(x, image.width));
    y = Math.max(0, Math.min(y, image.height));

    setCorners((prev) => ({
      ...prev,
      [activeCorner]: { x, y },
    }));
  };

  const handlePointerUp = () => {
    setActiveCorner(null);
  };

  const handleAccept = () => {
    if (!image) return;
    onApply(corners as any);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col">
      <div className="flex items-center justify-between p-4 bg-black text-white">
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-white/20">
          <X className="h-6 w-6" />
        </button>
        <div className="font-display font-bold">Adjust Bounds</div>
        <div className="w-10"></div>
      </div>

      <div 
        ref={containerRef} 
        className="flex-1 flex items-center justify-center overflow-hidden touch-none"
      >
        <canvas
          ref={canvasRef}
          className="touch-none bg-black"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ touchAction: 'none' }}
        />
      </div>

      <div className="bg-black p-6 flex justify-center">
        <button
          onClick={handleAccept}
          className="bg-brand text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 text-lg active:scale-95 transition-transform"
          id="accept-crop-btn"
        >
          <Check className="h-5 w-5" />
          Apply Crop
        </button>
      </div>
    </div>
  );
}
