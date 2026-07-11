// Dynamically import pdf-lib to prevent SSR issues and optimize bundles
let pdfLibInstance: any = null;
const initPdfLib = async () => {
  if (pdfLibInstance) return pdfLibInstance;
  pdfLibInstance = await import("pdf-lib");
  return pdfLibInstance;
};

// Dynamically import pdfjs to prevent SSR issues
let pdfjsLib: any = null;
const initPdfJs = async () => {
  if (pdfjsLib) return pdfjsLib;
  const pdfjs = await import("pdfjs-dist");
  // Set worker
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  pdfjsLib = pdfjs;
  return pdfjs;
};

/**
 * Merge multiple PDFs into a single PDF
 */
export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const { PDFDocument } = await initPdfLib();
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const fileBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page: any) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

/**
 * Split a PDF into page ranges or separate pages
 * ranges format: "1-3, 5, 7-10" or "all"
 */
export async function splitPDF(
  file: File,
  rangeInput: string
): Promise<{ name: string; bytes: Uint8Array }[]> {
  const { PDFDocument } = await initPdfLib();
  const fileBytes = await file.arrayBuffer();
  const srcPdf = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
  const totalPages = srcPdf.getPageCount();
  const results: { name: string; bytes: Uint8Array }[] = [];

  const baseName = file.name.replace(/\.[^/.]+$/, "");

  if (rangeInput.trim().toLowerCase() === "all" || !rangeInput.trim()) {
    // Split into individual pages
    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(srcPdf, [i]);
      newPdf.addPage(copiedPage);
      const bytes = await newPdf.save();
      results.push({
        name: `${baseName}_page_${i + 1}.pdf`,
        bytes,
      });
    }
  } else {
    // Split by specific ranges
    const ranges = rangeInput.split(",").map((r) => r.trim());
    for (let idx = 0; idx < ranges.length; idx++) {
      const range = ranges[idx];
      const parts = range.split("-").map((p) => parseInt(p.trim()));
      let pagesToExtract: number[] = [];

      if (parts.length === 1 && !isNaN(parts[0])) {
        const page = parts[0] - 1;
        if (page >= 0 && page < totalPages) pagesToExtract.push(page);
      } else if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        const start = Math.max(1, parts[0]) - 1;
        const end = Math.min(totalPages, parts[1]) - 1;
        for (let i = start; i <= end; i++) {
          pagesToExtract.push(i);
        }
      }

      if (pagesToExtract.length > 0) {
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(srcPdf, pagesToExtract);
        copiedPages.forEach((p: any) => newPdf.addPage(p));
        const bytes = await newPdf.save();
        results.push({
          name: `${baseName}_range_${range}.pdf`,
          bytes,
        });
      }
    }
  }

  if (results.length === 0) {
    throw new Error("Invalid range or no pages matched the selection.");
  }

  return results;
}

/**
 * Rotate pages in a PDF
 */
export async function rotatePDF(
  file: File,
  rotationDegrees: number,
  selectedPages?: number[]
): Promise<Uint8Array> {
  const { PDFDocument, degrees } = await initPdfLib();
  const fileBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
  const totalPages = pdfDoc.getPageCount();

  for (let i = 0; i < totalPages; i++) {
    if (!selectedPages || selectedPages.includes(i + 1)) {
      const page = pdfDoc.getPage(i);
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees((currentRotation + rotationDegrees) % 360));
    }
  }

  return await pdfDoc.save();
}

/**
 * Remove pages from a PDF
 */
export async function removePagesFromPDF(
  file: File,
  pagesToRemove: number[]
): Promise<Uint8Array> {
  const { PDFDocument } = await initPdfLib();
  const fileBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
  
  // Sort indices in descending order to avoid shift issues while removing
  const sortedIndices = [...pagesToRemove]
    .map((p) => p - 1)
    .filter((idx) => idx >= 0 && idx < pdfDoc.getPageCount())
    .sort((a, b) => b - a);

  if (sortedIndices.length === pdfDoc.getPageCount()) {
    throw new Error("Cannot remove all pages from a PDF.");
  }

  sortedIndices.forEach((idx) => {
    pdfDoc.removePage(idx);
  });

  return await pdfDoc.save();
}

export async function imagesToPDF(
  files: File[],
  options?: {
    rotations?: number[];
  }
): Promise<Uint8Array> {
  const { PDFDocument, degrees } = await initPdfLib();
  const pdfDoc = await PDFDocument.create();
  const rotations = options?.rotations || [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const rotation = (rotations[i] || 0) % 360;

    const imgBytes = await file.arrayBuffer();
    let img;
    if (file.type === "image/png") {
      img = await pdfDoc.embedPng(imgBytes);
    } else if (file.type === "image/jpeg" || file.type === "image/jpg") {
      img = await pdfDoc.embedJpg(imgBytes);
    } else {
      // For webp or others, convert to jpeg via Canvas API first
      const blob = await convertToJpgBlob(file);
      const convertedBytes = await blob.arrayBuffer();
      img = await pdfDoc.embedJpg(convertedBytes);
    }

    const { width: imgW, height: imgH } = img.scale(1);

    // Standard page layout: exact image size (no borders/whitespace added!)
    let pageWidth = imgW;
    let pageHeight = imgH;
    let x = 0;
    let y = 0;

    if (rotation === 90) {
      pageWidth = imgH;
      pageHeight = imgW;
      x = imgH;
      y = 0;
    } else if (rotation === 180) {
      pageWidth = imgW;
      pageHeight = imgH;
      x = imgW;
      y = imgH;
    } else if (rotation === 270) {
      pageWidth = imgH;
      pageHeight = imgW;
      x = 0;
      y = imgW;
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    page.drawImage(img, {
      x,
      y,
      width: imgW,
      height: imgH,
      rotate: degrees(rotation),
    });
  }

  return await pdfDoc.save();
}

/**
 * Convert PDF pages to PNG images
 */
export async function pdfToImages(
  file: File
): Promise<{ name: string; blob: Blob }[]> {
  const pdfjs = await initPdfJs();
  const fileBytes = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: fileBytes });
  const pdf = await loadingTask.promise;
  const results: { name: string; blob: Blob }[] = [];

  const baseName = file.name.replace(/\.[^/.]+$/, "");

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 }); // 1.5 scale is high-quality

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) continue;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), "image/png");
    });

    if (blob) {
      results.push({
        name: `${baseName}_page_${i}.png`,
        blob,
      });
    }
  }

  return results;
}

/**
 * Add Watermark to PDF
 */
export async function addWatermark(
  file: File,
  text: string,
  options: {
    opacity: number;
    size: number;
    color: string; // hex color e.g. #FF0000
    position: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  }
): Promise<Uint8Array> {
  const { PDFDocument, rgb, degrees, StandardFonts } = await initPdfLib();
  const fileBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  // Convert hex color to rgb
  const hex = options.color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const textColor = rgb(isNaN(r) ? 0 : r, isNaN(g) ? 0 : g, isNaN(b) ? 0 : b);

  for (const page of pages) {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, options.size);
    const textHeight = font.heightAtSize(options.size);

    let x = 0;
    let y = 0;
    let rotation = degrees(0);

    if (options.position === "center") {
      x = width / 2 - textWidth / 2;
      y = height / 2 - textHeight / 2;
      rotation = degrees(45); // Standard watermark tilt
    } else if (options.position === "top-left") {
      x = 30;
      y = height - 50;
    } else if (options.position === "top-right") {
      x = width - textWidth - 30;
      y = height - 50;
    } else if (options.position === "bottom-left") {
      x = 30;
      y = 30;
    } else if (options.position === "bottom-right") {
      x = width - textWidth - 30;
      y = 30;
    }

    // If centering, draw rotated around center
    if (options.position === "center") {
      page.drawText(text, {
        x: width / 2,
        y: height / 2,
        size: options.size,
        font,
        color: textColor,
        opacity: options.opacity,
        rotate: rotation,
        xAnchor: "center",
        yAnchor: "middle",
      } as any);
    } else {
      page.drawText(text, {
        x,
        y,
        size: options.size,
        font,
        color: textColor,
        opacity: options.opacity,
      });
    }
  }

  return await pdfDoc.save();
}

/**
 * Add Page Numbers to PDF
 */
export async function addPageNumbers(
  file: File,
  options: {
    position: "top" | "bottom";
    alignment: "left" | "center" | "right";
  }
): Promise<Uint8Array> {
  const { PDFDocument, rgb, StandardFonts } = await initPdfLib();
  const fileBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const total = pages.length;

  for (let i = 0; i < total; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();
    const text = `Page ${i + 1} of ${total}`;
    const size = 9;
    const textWidth = font.widthOfTextAtSize(text, size);

    let x = 0;
    let y = options.position === "top" ? height - 30 : 30;

    if (options.alignment === "left") {
      x = 40;
    } else if (options.alignment === "center") {
      x = width / 2 - textWidth / 2;
    } else {
      x = width - textWidth - 40;
    }

    page.drawText(text, {
      x,
      y,
      size,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
  }

  return await pdfDoc.save();
}

/**
 * Protect PDF with user password
 */
export async function protectPDF(
  file: File,
  passwordHash: string
): Promise<Uint8Array> {
  const { PDFDocument } = await initPdfLib();
  const fileBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileBytes, { ignoreEncryption: true });

  const pdfBytes = await pdfDoc.save();
  const { encryptPDF } = await import("@pdfsmaller/pdf-encrypt-lite");
  return await encryptPDF(pdfBytes, passwordHash);
}

/**
 * Compress PDF by rendering to images and re-saving
 */
export async function compressPDF(
  file: File,
  scale = 1.0,
  quality = 0.5
): Promise<Uint8Array> {
  const { PDFDocument } = await initPdfLib();
  const pdfjs = await initPdfJs();
  const fileBytes = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: fileBytes });
  const pdf = await loadingTask.promise;

  const compressedPdf = await PDFDocument.create();

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) continue;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    const imgDataUrl = canvas.toDataURL("image/jpeg", quality);
    const imgBytes = await fetch(imgDataUrl).then((r) => r.arrayBuffer());

    const embeddedImage = await compressedPdf.embedJpg(imgBytes);
    const newPage = compressedPdf.addPage([viewport.width, viewport.height]);
    newPage.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: viewport.width,
      height: viewport.height,
    });
  }

  return await compressedPdf.save();
}

/**
 * Helper to convert arbitrary image Files to JPEG blobs
 */
function convertToJpgBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context failed"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((b) => {
        if (b) resolve(b);
        else reject(new Error("Canvas toBlob failed"));
      }, "image/jpeg", 0.9);
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
  });
}
