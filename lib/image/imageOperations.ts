import imageCompression from "browser-image-compression";

/**
 * Compress an image using browser-image-compression
 */
export async function compressImage(
  file: File,
  quality: number // 0 to 1
): Promise<File> {
  const options = {
    maxSizeMB: file.size > 10 * 1024 * 1024 ? 2 : 1, // target size
    maxWidthOrHeight: 2048, // reasonable scale
    useWebWorker: true,
    initialQuality: quality,
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Compression failed, falling back to basic canvas scale", error);
    // Fallback: compress using Canvas
    const blob = await convertOrResizeCanvas(file, undefined, undefined, quality, file.type);
    return new File([blob], file.name, { type: file.type });
  }
}

/**
 * Resize image to exact dimensions
 */
export async function resizeImage(
  file: File,
  width: number,
  height: number,
  format = "image/jpeg"
): Promise<Blob> {
  return await convertOrResizeCanvas(file, width, height, 0.9, format);
}

/**
 * Convert image formats: PNG <-> JPEG <-> WEBP
 */
export async function convertImage(
  file: File,
  targetFormat: string // "image/jpeg" | "image/png" | "image/webp"
): Promise<Blob> {
  return await convertOrResizeCanvas(file, undefined, undefined, 0.9, targetFormat);
}

/**
 * Crop image based on coordinate bounds
 */
export async function cropImage(
  file: File,
  cropRect: { x: number; y: number; width: number; height: number },
  format = "image/jpeg"
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropRect.width;
      canvas.height = cropRect.height;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        reject(new Error("Canvas context extraction failed."));
        return;
      }

      ctx.drawImage(
        img,
        cropRect.x,
        cropRect.y,
        cropRect.width,
        cropRect.height,
        0,
        0,
        cropRect.width,
        cropRect.height
      );

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(img.src);
          if (blob) resolve(blob);
          else reject(new Error("Cropping canvas compilation empty."));
        },
        format,
        0.9
      );
    };
    img.onerror = (e) => reject(e);
  });
}

/**
 * Core helper that utilizes Canvas to resize, compress quality, and re-format
 */
function convertOrResizeCanvas(
  file: File,
  targetWidth?: number,
  targetHeight?: number,
  quality = 0.9,
  format = "image/jpeg"
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const width = targetWidth || img.width;
      const height = targetHeight || img.height;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas rendering context failure."));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(img.src);
          if (blob) resolve(blob);
          else reject(new Error("Canvas conversion resulting blob empty."));
        },
        format,
        quality
      );
    };
    img.onerror = (e) => reject(e);
  });
}
