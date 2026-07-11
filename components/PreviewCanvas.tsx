"use client";

import { useEffect, useRef, useState } from "react";

interface PreviewCanvasProps {
  file: File;
  slug: string;
  rotation?: number;
  watermarkText?: string;
  watermarkSize?: number;
  watermarkOpacity?: number;
  watermarkColor?: string;
  watermarkPos?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  pageNumPos?: "top" | "bottom";
  pageNumAlign?: "left" | "center" | "right";
  pageNumFormat?: "page-n-of-total" | "n-of-total" | "n";
  cropX?: number;
  cropY?: number;
  cropW?: number;
  cropH?: number;
  cropShape?: "rect" | "circle";
  pdfPassword?: string;
  onPasswordRequired?: (required: boolean) => void;
  onCropChange?: (crop: { x: number; y: number; w: number; h: number }) => void;
}

let pdfjsLibInstance: any = null;
const initPdfJs = async () => {
  if (pdfjsLibInstance) return pdfjsLibInstance;
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  pdfjsLibInstance = pdfjs;
  return pdfjs;
};

export default function PreviewCanvas({
  file,
  slug,
  rotation = 0,
  watermarkText = "CONFIDENTIAL",
  watermarkSize = 36,
  watermarkOpacity = 0.3,
  watermarkColor = "#FF0000",
  watermarkPos = "center",
  pageNumPos = "bottom",
  pageNumAlign = "center",
  pageNumFormat = "page-n-of-total",
  cropX = 0,
  cropY = 0,
  cropW = 200,
  cropH = 200,
  cropShape = "rect",
  pdfPassword = "",
  onPasswordRequired,
  onCropChange,
}: PreviewCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Crop interaction states
  const scaleRef = useRef(1.0);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [dragMode, setDragMode] = useState<"none" | "move" | "resize">("none");
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startCrop, setStartCrop] = useState({ x: 0, y: 0, w: 200, h: 200 });
  const [cursorStyle, setCursorStyle] = useState("default");

  // Cache loaded image object
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

  // 1. Load image file once when file changes
  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setLoadedImage(null);
      return;
    }
    let active = true;
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;
    img.onload = () => {
      if (active) {
        setLoadedImage(img);
      }
    };
    return () => {
      active = false;
      URL.revokeObjectURL(url);
    };
  }, [file]);

  // 2. Synchronous paint for cached image and crop box overlays (buttery smooth 60fps)
  useEffect(() => {
    if (!loadedImage || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const desiredWidth = Math.min(260, window.innerWidth - 64);
    const scale = desiredWidth / loadedImage.width;
    scaleRef.current = scale;
    setImageDimensions({ width: loadedImage.width, height: loadedImage.height });

    canvas.width = desiredWidth;
    canvas.height = loadedImage.height * scale;

    // Draw cached image pixels instantly
    ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);

    // Draw crop boundaries overlay
    if (slug === "crop-image" && onCropChange) {
      drawCropOverlay(ctx, canvas.width, canvas.height, scale);
    }
  }, [loadedImage, slug, cropX, cropY, cropW, cropH, cropShape]);

  // 3. Render PDF preview files asynchronously (only for PDF overlay tools)
  useEffect(() => {
    if (!file || file.type.startsWith("image/")) return;
    let active = true;

    const renderPreview = async () => {
      if (!canvasRef.current) return;
      setLoading(true);
      setError(null);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx || !active) return;

      try {
        const pdfjs = await initPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjs.getDocument({ 
          data: arrayBuffer,
          password: pdfPassword || undefined
        });
        const pdf = await loadingTask.promise;

        if (!active) return;
        if (pdf.numPages === 0) {
          throw new Error("PDF contains zero pages.");
        }

        if (onPasswordRequired) {
          onPasswordRequired(false);
        }

        const page = await pdf.getPage(1);
        if (!active) return;

        // Auto scale to fit responsive width (e.g. 260px width limit for clean visual previews)
        const desiredWidth = Math.min(260, window.innerWidth - 64);
        const rotationAngle = slug === "rotate-pdf" ? rotation : 0;
        const unscaledViewport = page.getViewport({ scale: 1.0, rotation: rotationAngle });
        const scale = desiredWidth / unscaledViewport.width;
        scaleRef.current = scale;
        
        const viewport = page.getViewport({ scale, rotation: rotationAngle });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render PDF page background
        await page.render({
          canvasContext: ctx,
          viewport: viewport,
        }).promise;

        if (!active) return;

        // --- Render Watermark Overlays ---
        if (slug === "add-watermark") {
          ctx.save();
          
          // Hex to RGBA
          const hex = watermarkColor.replace("#", "");
          const r = parseInt(hex.substring(0, 2), 16) || 0;
          const g = parseInt(hex.substring(2, 4), 16) || 0;
          const b = parseInt(hex.substring(4, 6), 16) || 0;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${watermarkOpacity})`;
          ctx.font = `bold ${watermarkSize * scale}px sans-serif`;

          if (watermarkPos === "center") {
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((-45 * Math.PI) / 180); // tilt standard watermark
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(watermarkText, 0, 0);
          } else {
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            const padding = 20 * scale;
            const textWidth = ctx.measureText(watermarkText).width;
            const textHeight = watermarkSize * scale;

            let x = padding;
            let y = padding;

            if (watermarkPos === "top-right") {
              x = canvas.width - textWidth - padding;
            } else if (watermarkPos === "bottom-left") {
              y = canvas.height - textHeight - padding;
            } else if (watermarkPos === "bottom-right") {
              x = canvas.width - textWidth - padding;
              y = canvas.height - textHeight - padding;
            }

            ctx.fillText(watermarkText, x, y);
          }
          ctx.restore();
        }

        // --- Render Page Number Overlays ---
        if (slug === "add-page-numbers") {
          ctx.save();
          ctx.fillStyle = "rgba(75, 85, 99, 0.95)"; // dark grey page numbers
          ctx.font = `${11 * scale}px font-mono, sans-serif`;

          const total = pdf.numPages;
          let text = `Page 1 of ${total}`;
          if (pageNumFormat === "n-of-total") {
            text = `1 of ${total}`;
          } else if (pageNumFormat === "n") {
            text = "1";
          }

          const textWidth = ctx.measureText(text).width;
          const paddingX = 40 * scale;
          const paddingY = 30 * scale;

          let x = canvas.width / 2 - textWidth / 2; // Center default
          let y = pageNumPos === "top" ? paddingY : canvas.height - paddingY;

          if (pageNumAlign === "left") {
            x = paddingX;
          } else if (pageNumAlign === "right") {
            x = canvas.width - textWidth - paddingX;
          }

          ctx.fillText(text, x, y);
          ctx.restore();
        }

        setLoading(false);
      } catch (err: any) {
        console.error("Preview rendering failed:", err);
        if (active) {
          let msg = err.message || "Failed to render PDF page preview.";
          if (err.name === "PasswordException") {
            msg = "This PDF is password-protected. Enter the password in settings to preview.";
            if (onPasswordRequired) {
              onPasswordRequired(true);
            }
          }
          setError(msg);
          setLoading(false);
        }
      }
    };

    renderPreview();

    return () => {
      active = false;
    };
  }, [
    file,
    slug,
    rotation,
    watermarkText,
    watermarkSize,
    watermarkOpacity,
    watermarkColor,
    watermarkPos,
    pageNumPos,
    pageNumAlign,
    pageNumFormat,
    pdfPassword,
  ]);

  const drawCropOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number, scale: number) => {
    const sX = cropX * scale;
    const sY = cropY * scale;
    const sW = cropW * scale;
    const sH = cropH * scale;

    ctx.save();

    if (cropShape === "circle") {
      // 1. Draw circular mask darkened outside
      ctx.beginPath();
      // Draw outer boundary (clockwise)
      ctx.rect(0, 0, width, height);
      // Draw circle (counter-clockwise) to subtract it
      const cx = sX + sW / 2;
      const cy = sY + sH / 2;
      const r = Math.min(sW, sH) / 2;
      ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      // 2. Draw circular boundary border line
      ctx.strokeStyle = "#2454FF";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Draw Rule of Thirds grid lines masked inside the circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();

      ctx.strokeStyle = "rgba(36, 84, 255, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Verticals
      ctx.moveTo(cx - r / 3, cy - r);
      ctx.lineTo(cx - r / 3, cy + r);
      ctx.moveTo(cx + r / 3, cy - r);
      ctx.lineTo(cx + r / 3, cy + r);
      // Horizontals
      ctx.moveTo(cx - r, cy - r / 3);
      ctx.lineTo(cx + r, cy - r / 3);
      ctx.moveTo(cx - r, cy + r / 3);
      ctx.lineTo(cx + r, cy + r / 3);
      ctx.stroke();
    } else {
      // Standard rectangular crop
      // 1. Draw darkened backdrop outside the crop box
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      
      // Top
      ctx.fillRect(0, 0, width, sY);
      // Bottom
      ctx.fillRect(0, sY + sH, width, height - (sY + sH));
      // Left
      ctx.fillRect(0, sY, sX, sH);
      // Right
      ctx.fillRect(sX + sW, sY, width - (sX + sW), sH);

      // 2. Draw border around crop box
      ctx.strokeStyle = "#2454FF";
      ctx.lineWidth = 2;
      ctx.strokeRect(sX, sY, sW, sH);

      // 3. Draw Rule of Thirds grid lines
      ctx.strokeStyle = "rgba(36, 84, 255, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Verticals
      ctx.moveTo(sX + sW / 3, sY);
      ctx.lineTo(sX + sW / 3, sY + sH);
      ctx.moveTo(sX + (2 * sW) / 3, sY);
      ctx.lineTo(sX + (2 * sW) / 3, sY + sH);
      // Horizontals
      ctx.moveTo(sX, sY + sH / 3);
      ctx.lineTo(sX + sW, sY + sH / 3);
      ctx.moveTo(sX, sY + (2 * sH) / 3);
      ctx.lineTo(sX + sW, sY + (2 * sH) / 3);
      ctx.stroke();
    }

    ctx.restore();

    // Draw resize handle in bottom-right corner of bounding square
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#2454FF";
    ctx.lineWidth = 1.5;
    const handleSize = 8;
    ctx.fillRect(sX + sW - handleSize / 2, sY + sH - handleSize / 2, handleSize, handleSize);
    ctx.strokeRect(sX + sW - handleSize / 2, sY + sH - handleSize / 2, handleSize, handleSize);
    ctx.restore();
  };

  // --- Mouse / Touch Events for interactive dragging ---
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (slug !== "crop-image" || !onCropChange || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const scale = scaleRef.current;
    const sX = cropX * scale;
    const sY = cropY * scale;
    const sW = cropW * scale;
    const sH = cropH * scale;

    const handleSize = 12; // interactive target size
    const isNearHandle = 
      Math.abs(x - (sX + sW)) < handleSize &&
      Math.abs(y - (sY + sH)) < handleSize;

    if (isNearHandle) {
      setDragMode("resize");
      setStartPos({ x: e.clientX, y: e.clientY });
      setStartCrop({ x: cropX, y: cropY, w: cropW, h: cropH });
    } else if (x >= sX && x <= sX + sW && y >= sY && y <= sY + sH) {
      setDragMode("move");
      setStartPos({ x: e.clientX, y: e.clientY });
      setStartCrop({ x: cropX, y: cropY, w: cropW, h: cropH });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (slug !== "crop-image" || !canvasRef.current) return;

    // Handle Cursor Updates
    if (dragMode === "none") {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const scale = scaleRef.current;
      const sX = cropX * scale;
      const sY = cropY * scale;
      const sW = cropW * scale;
      const sH = cropH * scale;

      const handleSize = 12;
      const isNearHandle = 
        Math.abs(x - (sX + sW)) < handleSize &&
        Math.abs(y - (sY + sH)) < handleSize;

      if (isNearHandle) {
        setCursorStyle("se-resize");
      } else if (x >= sX && x <= sX + sW && y >= sY && y <= sY + sH) {
        setCursorStyle("move");
      } else {
        setCursorStyle("default");
      }
      return;
    }

    if (!onCropChange || !imageDimensions) return;
    const dx = (e.clientX - startPos.x) / scaleRef.current;
    const dy = (e.clientY - startPos.y) / scaleRef.current;

    const { width: imgW, height: imgH } = imageDimensions;

    if (dragMode === "move") {
      let newX = Math.round(startCrop.x + dx);
      let newY = Math.round(startCrop.y + dy);

      newX = Math.max(0, Math.min(imgW - startCrop.w, newX));
      newY = Math.max(0, Math.min(imgH - startCrop.h, newY));

      onCropChange({ x: newX, y: newY, w: startCrop.w, h: startCrop.h });
    } else if (dragMode === "resize") {
      let newW = Math.round(startCrop.w + dx);
      let newH = Math.round(startCrop.h + dy);

      newW = Math.max(20, Math.min(imgW - startCrop.x, newW));
      newH = Math.max(20, Math.min(imgH - startCrop.y, newH));

      onCropChange({ x: startCrop.x, y: startCrop.y, w: newW, h: newH });
    }
  };

  const handleMouseUpOrLeave = () => {
    setDragMode("none");
  };

  // Touch Support for Mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (slug !== "crop-image" || !onCropChange || !canvasRef.current || e.touches.length === 0) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const scale = scaleRef.current;
    const sX = cropX * scale;
    const sY = cropY * scale;
    const sW = cropW * scale;
    const sH = cropH * scale;

    const handleSize = 20; // Larger hitboxes for touch targets
    const isNearHandle = 
      Math.abs(x - (sX + sW)) < handleSize &&
      Math.abs(y - (sY + sH)) < handleSize;

    if (isNearHandle) {
      setDragMode("resize");
      setStartPos({ x: touch.clientX, y: touch.clientY });
      setStartCrop({ x: cropX, y: cropY, w: cropW, h: cropH });
    } else if (x >= sX && x <= sX + sW && y >= sY && y <= sY + sH) {
      setDragMode("move");
      setStartPos({ x: touch.clientX, y: touch.clientY });
      setStartCrop({ x: cropX, y: cropY, w: cropW, h: cropH });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (dragMode === "none" || !onCropChange || !imageDimensions || e.touches.length === 0) return;
    const touch = e.touches[0];
    const dx = (touch.clientX - startPos.x) / scaleRef.current;
    const dy = (touch.clientY - startPos.y) / scaleRef.current;

    const { width: imgW, height: imgH } = imageDimensions;

    if (dragMode === "move") {
      let newX = Math.round(startCrop.x + dx);
      let newY = Math.round(startCrop.y + dy);

      newX = Math.max(0, Math.min(imgW - startCrop.w, newX));
      newY = Math.max(0, Math.min(imgH - startCrop.h, newY));

      onCropChange({ x: newX, y: newY, w: startCrop.w, h: startCrop.h });
    } else if (dragMode === "resize") {
      let newW = Math.round(startCrop.w + dx);
      let newH = Math.round(startCrop.h + dy);

      newW = Math.max(20, Math.min(imgW - startCrop.x, newW));
      newH = Math.max(20, Math.min(imgH - startCrop.y, newH));

      onCropChange({ x: startCrop.x, y: startCrop.y, w: newW, h: newH });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2 w-full">
      {loading && (
        <div className="font-mono text-[10px] text-ink/40 animate-pulse py-4">
          Loading live preview...
        </div>
      )}
      {error && (
        <div className="font-sans text-[10px] text-red-500 py-4 text-center">
          {error}
        </div>
      )}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUpOrLeave}
        className="max-w-full rounded-md shadow border border-hairline bg-white select-none touch-none"
        style={{ display: loading || error ? "none" : "block", cursor: cursorStyle }}
      />
      {slug === "crop-image" && (
        <p className="font-mono text-[8px] text-ink/40 text-center select-none">
          Drag crop box to move. Drag bottom-right corner handle to resize.
        </p>
      )}
    </div>
  );
}
