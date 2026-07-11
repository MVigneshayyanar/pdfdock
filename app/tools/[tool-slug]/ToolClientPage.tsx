"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  Settings,
  Sparkles,
  Layers,
  Scissors,
  Minimize2,
  RotateCw,
  Trash2,
  FileImage,
  Image as ImageIcon,
  Stamp,
  Hash,
  Lock,
  Compass,
} from "lucide-react";
import Dropzone from "@/components/Dropzone";
import FileList from "@/components/FileList";
import ProcessingState from "@/components/ProcessingState";
import ResultCard from "@/components/ResultCard";
import {
  mergePDFs,
  splitPDF,
  compressPDF,
  rotatePDF,
  removePagesFromPDF,
  imagesToPDF,
  pdfToImages,
  addWatermark,
  addPageNumbers,
  protectPDF,
} from "@/lib/pdf/pdfOperations";
import {
  compressImage,
  resizeImage,
  convertImage,
  cropImage,
} from "@/lib/image/imageOperations";
import { SEO_REGISTRY } from "@/lib/seo/seoMetadata";
import { TOOLS } from "@/components/HomeClient";

interface ToolConfig {
  slug: string;
  name: string;
  description: string;
  icon: any;
  accept: Record<string, string[]>;
  multiple: boolean;
  privacyExplanation: string;
}

const TOOL_CONFIGS: Record<string, ToolConfig> = {
  "merge-pdf": {
    slug: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF documents into a single PDF file in any order.",
    icon: Layers,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
    privacyExplanation: "All PDFs are loaded and combined right inside your browser memory. We never see your text or graphics.",
  },
  "split-pdf": {
    slug: "split-pdf",
    name: "Split PDF",
    description: "Extract page ranges or save every page as an individual PDF document.",
    icon: Scissors,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    privacyExplanation: "Your PDF is parsed client-side to split pages. The outputs are packaged into a standard ZIP fully offline.",
  },
  "compress-pdf": {
    slug: "compress-pdf",
    name: "Compress PDF",
    description: "Downsample image assets inside the PDF to save disk space.",
    icon: Minimize2,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    privacyExplanation: "Pages are rendered, compressed, and rebuilt locally. Your document data does not touch external servers.",
  },
  "rotate-pdf": {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    description: "Change orientations of PDF pages. Rotates pages by 90, 180, or 270 degrees.",
    icon: RotateCw,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    privacyExplanation: "Rotation coordinates are set inside the PDF metadata structures locally within your browser.",
  },
  "remove-pages": {
    slug: "remove-pages",
    name: "Remove Pages",
    description: "Delete specific pages from a PDF. Enter numbers to strip from layout.",
    icon: Trash2,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    privacyExplanation: "We strip target page nodes out of the PDF byte tree and compile the remaining nodes into a new document.",
  },
  "images-to-pdf": {
    slug: "images-to-pdf",
    name: "Images to PDF",
    description: "Transform image grids (JPG, PNG, WebP) into a clean, uniform PDF book.",
    icon: FileImage,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    multiple: true,
    privacyExplanation: "Your images are imported directly into the PDF layout in local browser memory.",
  },
  "pdf-to-images": {
    slug: "pdf-to-images",
    name: "PDF to Images",
    description: "Export every page of a PDF document as high-resolution PNG image files.",
    icon: ImageIcon,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    privacyExplanation: "PDF.js compiles PDF paths onto canvas contexts locally, saving each canvas frame as an offline image file.",
  },
  "add-watermark": {
    slug: "add-watermark",
    name: "Add Watermark",
    description: "Stamp clear customizable text overlays onto all pages of the document.",
    icon: Stamp,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    privacyExplanation: "Watermark layouts and fonts are rendered inline over the existing page nodes inside the browser.",
  },
  "add-page-numbers": {
    slug: "add-page-numbers",
    name: "Add Page Numbers",
    description: "Number PDF pages at custom alignments and positions.",
    icon: Hash,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    privacyExplanation: "Calculates total counts and draws labels using local client-side font engines.",
  },
  "protect-pdf": {
    slug: "protect-pdf",
    name: "Protect PDF",
    description: "Secure your PDF from unauthorized view permissions using password encryption.",
    icon: Lock,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    privacyExplanation: "Standard PDF encryption occurs directly on the client arraybuffer. Your password is never stored or transmitted.",
  },
  "compress-image": {
    slug: "compress-image",
    name: "Compress Image",
    description: "Optimize image sizes (PNG/JPG/WebP) with variable quality controls.",
    icon: Minimize2,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    multiple: false,
    privacyExplanation: "Browser image compression scales canvas metrics inside a client-side WebWorker.",
  },
  "resize-image": {
    slug: "resize-image",
    name: "Resize Image",
    description: "Change width and height dimensions of images with aspect-ratio preservation.",
    icon: Compass,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    multiple: false,
    privacyExplanation: "Canvas resizing draws the image on adjusted grid bounds locally before generating the final blob.",
  },
  "convert-image": {
    slug: "convert-image",
    name: "Convert Format",
    description: "Transcode formats instantly. Save images as PNG, JPEG, or WebP.",
    icon: FileImage,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    multiple: false,
    privacyExplanation: "The browser's native canvas exporter converts canvas pixels into your requested file format.",
  },
  "crop-image": {
    slug: "crop-image",
    name: "Crop Image",
    description: "Select boundaries to trim out of your image assets.",
    icon: Scissors,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    multiple: false,
    privacyExplanation: "A targeted sub-rectangle of source canvas pixels is copied onto an output canvas entirely client-side.",
  },
};

export default function ToolClientPage({ params }: { params: Promise<{ "tool-slug": string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams["tool-slug"];
  const router = useRouter();

  const config = TOOL_CONFIGS[slug];
  const hasOptions = ["split-pdf", "compress-pdf", "rotate-pdf", "remove-pages", "add-watermark", "add-page-numbers", "protect-pdf", "compress-image", "resize-image", "convert-image", "crop-image"].includes(slug);

  // States
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<{
    bytes?: Uint8Array;
    blob?: Blob;
    url: string;
    name: string;
    originalSize: number;
    newSize: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Settings states based on selected tool
  const [splitRange, setSplitRange] = useState("all");
  const [rotation, setRotation] = useState(90);
  const [removePagesRange, setRemovePagesRange] = useState("");
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [watermarkSize, setWatermarkSize] = useState(48);
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.3);
  const [watermarkColor, setWatermarkColor] = useState("#FF0000");
  const [watermarkPos, setWatermarkPos] = useState<"center" | "top-left" | "top-right" | "bottom-left" | "bottom-right">("center");
  const [pageNumPos, setPageNumPos] = useState<"top" | "bottom">("bottom");
  const [pageNumAlign, setPageNumAlign] = useState<"left" | "center" | "right">("center");
  const [pdfPassword, setPdfPassword] = useState("");
  const [pdfCompressQuality, setPdfCompressQuality] = useState(0.5);
  const [pdfCompressScale, setPdfCompressScale] = useState(1.0);
  const [imgCompressQuality, setImgCompressQuality] = useState(0.8);
  
  // Image resize states
  const [imgWidth, setImgWidth] = useState(800);
  const [imgHeight, setImgHeight] = useState(600);
  const [lockRatio, setLockRatio] = useState(true);
  const [originalAspect, setOriginalAspect] = useState<number | null>(null);
  const [imgTargetFormat, setImgTargetFormat] = useState("image/png");

  // Image Crop states
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(400);
  const [cropH, setCropH] = useState(400);

  // Images to PDF options
  const [fileRotations, setFileRotations] = useState<number[]>([]);

  useEffect(() => {
    if (!config) {
      router.push("/");
    }
  }, [config, router]);

  // Adjust aspect ratio locks
  const handleWidthChange = (val: number) => {
    setImgWidth(val);
    if (lockRatio && originalAspect) {
      setImgHeight(Math.round(val / originalAspect));
    }
  };

  const handleHeightChange = (val: number) => {
    setImgHeight(val);
    if (lockRatio && originalAspect) {
      setImgWidth(Math.round(val * originalAspect));
    }
  };

  // Capture original dimensions
  useEffect(() => {
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      const img = new Image();
      img.src = URL.createObjectURL(files[0]);
      img.onload = () => {
        setImgWidth(img.width);
        setImgHeight(img.height);
        setOriginalAspect(img.width / img.height);
        setCropW(Math.min(img.width, 400));
        setCropH(Math.min(img.height, 400));
        URL.revokeObjectURL(img.src);
      };
    }
  }, [files]);

  if (!config) return null;

  const handleFilesSelected = (newFiles: File[]) => {
    setError(null);
    if (config.multiple) {
      setFiles((prev) => [...prev, ...newFiles]);
      setFileRotations((prev) => [...prev, ...newFiles.map(() => 0)]);
    } else {
      setFiles(newFiles);
      setFileRotations(newFiles.map(() => 0));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileRotations((prev) => prev.filter((_, i) => i !== index));
    if (files.length <= 1) {
      setResult(null);
    }
  };

  const handleReorder = (reorderedFiles: File[]) => {
    const newRotations = reorderedFiles.map(file => {
      const oldIndex = files.indexOf(file);
      return oldIndex !== -1 ? fileRotations[oldIndex] : 0;
    });
    setFiles(reorderedFiles);
    setFileRotations(newRotations);
  };

  const handleRotate = (index: number) => {
    setFileRotations((prev) => {
      const next = [...prev];
      next[index] = ((next[index] || 0) + 90) % 360;
      return next;
    });
  };

  const handleReset = () => {
    setFiles([]);
    setFileRotations([]);
    setResult(null);
    setError(null);
    setProgress(undefined);
  };

  const handleRename = (newName: string) => {
    setResult((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        name: newName,
      };
    });
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setProgress(20);
    setError(null);

    const baseName = files[0].name.replace(/\.[^/.]+$/, "");

    try {
      let outputBytes: Uint8Array | undefined;
      let outputBlob: Blob | undefined;
      let outputName = "";

      setProgress(40);

      switch (slug) {
        case "merge-pdf":
          outputBytes = await mergePDFs(files);
          outputName = "PdfDock_merged.pdf";
          break;

        case "split-pdf": {
          const splitResults = await splitPDF(files[0], splitRange);
          setProgress(70);
          if (splitResults.length === 1) {
            outputBytes = splitResults[0].bytes;
            outputName = splitResults[0].name;
          } else {
            // Zip multiple output PDFs
            const JSZip = (await import("jszip")).default;
            const zip = new JSZip();
            splitResults.forEach((res) => {
              zip.file(res.name, res.bytes);
            });
            outputBlob = await zip.generateAsync({ type: "blob" });
            outputName = `${baseName}_split.zip`;
          }
          break;
        }

        case "compress-pdf":
          outputBytes = await compressPDF(files[0], pdfCompressScale, pdfCompressQuality);
          outputName = `${baseName}_compressed.pdf`;
          break;

        case "rotate-pdf":
          outputBytes = await rotatePDF(files[0], rotation);
          outputName = `${baseName}_rotated.pdf`;
          break;

        case "remove-pages": {
          const pList = removePagesRange
            .split(",")
            .map((p) => parseInt(p.trim()))
            .filter((p) => !isNaN(p));
          if (pList.length === 0) {
            throw new Error("Please enter valid page numbers to remove (e.g. 2, 4).");
          }
          outputBytes = await removePagesFromPDF(files[0], pList);
          outputName = `${baseName}_cleaned.pdf`;
          break;
        }

        case "images-to-pdf":
          outputBytes = await imagesToPDF(files, {
            rotations: fileRotations,
          });
          outputName = "PdfDock_combined.pdf";
          break;

        case "pdf-to-images": {
          const imgs = await pdfToImages(files[0]);
          setProgress(70);
          const JSZip = (await import("jszip")).default;
          const zip = new JSZip();
          imgs.forEach((img) => {
            zip.file(img.name, img.blob);
          });
          outputBlob = await zip.generateAsync({ type: "blob" });
          outputName = `${baseName}_images.zip`;
          break;
        }

        case "add-watermark":
          outputBytes = await addWatermark(files[0], watermarkText, {
            size: watermarkSize,
            opacity: watermarkOpacity,
            color: watermarkColor,
            position: watermarkPos,
          });
          outputName = `${baseName}_watermarked.pdf`;
          break;

        case "add-page-numbers":
          outputBytes = await addPageNumbers(files[0], {
            position: pageNumPos,
            alignment: pageNumAlign,
          });
          outputName = `${baseName}_numbered.pdf`;
          break;

        case "protect-pdf":
          if (!pdfPassword) throw new Error("Please enter a protection password.");
          outputBytes = await protectPDF(files[0], pdfPassword);
          outputName = `${baseName}_protected.pdf`;
          break;

        case "compress-image": {
          const compFile = await compressImage(files[0], imgCompressQuality);
          outputBlob = compFile;
          outputName = `${baseName}_optimized.${compFile.name.split(".").pop()}`;
          break;
        }

        case "resize-image":
          outputBlob = await resizeImage(files[0], imgWidth, imgHeight, imgTargetFormat);
          const ext = imgTargetFormat.split("/")[1];
          outputName = `${baseName}_resized.${ext === "jpeg" ? "jpg" : ext}`;
          break;

        case "convert-image":
          outputBlob = await convertImage(files[0], imgTargetFormat);
          const extC = imgTargetFormat.split("/")[1];
          outputName = `${baseName}_converted.${extC === "jpeg" ? "jpg" : extC}`;
          break;

        case "crop-image":
          outputBlob = await cropImage(
            files[0],
            { x: cropX, y: cropY, width: cropW, height: cropH },
            imgTargetFormat
          );
          const extCr = imgTargetFormat.split("/")[1];
          outputName = `${baseName}_cropped.${extCr === "jpeg" ? "jpg" : extCr}`;
          break;

        default:
          throw new Error("Operation unsupported");
      }

      setProgress(90);

      // Create download URL
      let finalBlob = outputBlob;
      if (outputBytes && !finalBlob) {
        const type = slug.includes("pdf") ? "application/pdf" : "application/octet-stream";
        finalBlob = new Blob([outputBytes as any], { type });
      }

      if (!finalBlob) throw new Error("Output compilation failed.");

      const downloadUrl = URL.createObjectURL(finalBlob);

      setResult({
        bytes: outputBytes,
        blob: finalBlob,
        url: downloadUrl,
        name: outputName,
        originalSize: files.reduce((acc, f) => acc + f.size, 0),
        newSize: finalBlob.size,
      });

      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected error occurred during client-side execution.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    const { saveAs } = await import("file-saver");
    saveAs(result.blob || new Blob([result.bytes! as any]), result.name);
  };

  const IconComponent = config.icon;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 flex-1 flex flex-col space-y-8">
      {/* Navigation & Privacy */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-ink/60 hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="inline-flex items-center gap-1 text-[11px] font-mono text-ink/50">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          Offline-First &bull; Private Browser Processing
        </div>
      </div>

      {/* Tool Headers */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
            <IconComponent className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-ink">
              {config.name}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-ink/70">
              {config.description}
            </p>
          </div>
        </div>
      </div>

      {/* Primary Workspace */}
      <div className="space-y-6">
        {!result && !isProcessing && files.length === 0 && (
          <Dropzone
            onFilesSelected={handleFilesSelected}
            accept={config.accept}
            multiple={config.multiple}
          />
        )}

        {isProcessing && (
          <ProcessingState message="Processing files directly in your browser..." progress={progress} />
        )}

        {result && (
          <ResultCard
            fileName={result.name}
            originalSize={result.originalSize}
            newSize={result.newSize}
            onDownload={handleDownload}
            onReset={handleReset}
            onRename={handleRename}
          />
        )}

        {/* Configurations Interface */}
        {!isProcessing && !result && files.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* File List Panel */}
              <div className={`${hasOptions ? "md:col-span-2" : "md:col-span-3"} border border-hairline rounded-xl bg-white p-5 space-y-4`}>
                <h3 className="font-display font-bold text-sm text-ink border-b border-hairline pb-2 flex justify-between">
                <span>Queued Files ({files.length})</span>
                {config.multiple && (
                  <span className="font-mono text-[10px] text-ink/40 font-normal">
                    Drag handles or click arrows to sort
                  </span>
                )}
              </h3>
              {config.multiple && (
                <div className="pb-3 border-b border-hairline mb-3">
                  <Dropzone
                    onFilesSelected={handleFilesSelected}
                    accept={config.accept}
                    multiple={true}
                    compact={true}
                    label="Add more files"
                  />
                </div>
              )}
              
              <FileList files={files} onRemove={handleRemoveFile} onReorder={handleReorder} rotations={fileRotations} onRotate={handleRotate} />
            </div>

            {/* Options Configuration Panel */}
            {hasOptions && (
              <div className="border border-hairline rounded-xl bg-white p-5 flex flex-col justify-between space-y-5">
              <div>
                <h3 className="font-display font-bold text-sm text-ink border-b border-hairline pb-2 flex items-center gap-1.5 mb-4">
                  <Settings className="h-4 w-4 text-brand" />
                  Tool Options
                </h3>

                {/* Conditional Settings based on selected tool slug */}
                <div className="space-y-4">
                  {slug === "split-pdf" && (
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] font-bold text-ink/60 uppercase">
                        Page Range Mode
                      </label>
                      <select
                        value={splitRange}
                        onChange={(e) => setSplitRange(e.target.value)}
                        className="w-full rounded border border-hairline bg-paper px-2.5 py-1.5 font-sans text-xs text-ink focus:border-brand focus:outline-none"
                      >
                        <option value="all">Extract all pages (ZIP)</option>
                        <option value="custom">Custom Ranges</option>
                      </select>
                      {splitRange !== "all" && (
                        <div className="space-y-1 mt-2">
                          <input
                            type="text"
                            placeholder="e.g. 1-3, 5, 7-9"
                            value={splitRange === "custom" ? "" : splitRange}
                            onChange={(e) => setSplitRange(e.target.value)}
                            className="w-full rounded border border-hairline bg-paper px-2.5 py-1.5 font-mono text-xs text-ink focus:border-brand focus:outline-none"
                          />
                          <p className="font-mono text-[9px] text-ink/40">
                            Separate page intervals with commas.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {slug === "compress-pdf" && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] font-bold text-ink/60 uppercase flex justify-between">
                          <span>Quality</span>
                          <span>{Math.round(pdfCompressQuality * 100)}%</span>
                        </label>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.05"
                          value={pdfCompressQuality}
                          onChange={(e) => setPdfCompressQuality(parseFloat(e.target.value))}
                          className="w-full h-1 bg-paper rounded-lg appearance-none cursor-pointer accent-brand"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] font-bold text-ink/60 uppercase flex justify-between">
                          <span>Resolution Scale</span>
                          <span>{pdfCompressScale}x</span>
                        </label>
                        <input
                          type="range"
                          min="0.5"
                          max="1.5"
                          step="0.1"
                          value={pdfCompressScale}
                          onChange={(e) => setPdfCompressScale(parseFloat(e.target.value))}
                          className="w-full h-1 bg-paper rounded-lg appearance-none cursor-pointer accent-brand"
                        />
                      </div>
                    </div>
                  )}

                  {slug === "rotate-pdf" && (
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] font-bold text-ink/60 uppercase">
                        Rotate Degrees
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[90, 180, 270].map((deg) => (
                          <button
                            key={deg}
                            type="button"
                            onClick={() => setRotation(deg)}
                            className={`py-1.5 text-xs font-mono border rounded ${
                              rotation === deg
                                ? "bg-brand text-white border-brand"
                                : "bg-paper text-ink border-hairline hover:border-ink/20"
                            }`}
                          >
                            +{deg}°
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {slug === "remove-pages" && (
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] font-bold text-ink/60 uppercase">
                        Pages to Remove
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2, 4, 11"
                        value={removePagesRange}
                        onChange={(e) => setRemovePagesRange(e.target.value)}
                        className="w-full rounded border border-hairline bg-paper px-2.5 py-1.5 font-mono text-xs text-ink focus:border-brand focus:outline-none"
                      />
                      <p className="font-mono text-[9px] text-ink/40">
                        Comma-separated line indices to exclude.
                      </p>
                    </div>
                  )}

                  {slug === "add-watermark" && (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] font-bold text-ink/60 uppercase">
                          Watermark Text
                        </label>
                        <input
                          type="text"
                          value={watermarkText}
                          onChange={(e) => setWatermarkText(e.target.value)}
                          className="w-full rounded border border-hairline bg-paper px-2.5 py-1.5 font-sans text-xs text-ink focus:border-brand"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] font-bold text-ink/60 uppercase flex justify-between">
                          <span>Opacity</span>
                          <span>{Math.round(watermarkOpacity * 100)}%</span>
                        </label>
                        <input
                          type="range"
                          min="0.05"
                          max="1.0"
                          step="0.05"
                          value={watermarkOpacity}
                          onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                          className="w-full h-1 bg-paper rounded"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="font-mono text-[9px] font-bold text-ink/60 uppercase">
                            Font Size (px)
                          </label>
                          <input
                            type="number"
                            value={watermarkSize}
                            onChange={(e) => setWatermarkSize(parseInt(e.target.value) || 12)}
                            className="w-full rounded border border-hairline bg-paper px-2 py-1 text-xs"
                          />
                        </div>
                        <div>
                          <label className="font-mono text-[9px] font-bold text-ink/60 uppercase">
                            Fill Color
                          </label>
                          <div className="flex items-center gap-1">
                            <input
                              type="color"
                              value={watermarkColor}
                              onChange={(e) => setWatermarkColor(e.target.value)}
                              className="w-8 h-7 rounded border border-hairline bg-transparent cursor-pointer p-0"
                            />
                            <span className="font-mono text-[10px] text-ink/60">{watermarkColor}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] font-bold text-ink/60 uppercase">
                          Placement Position
                        </label>
                        <select
                          value={watermarkPos}
                          onChange={(e: any) => setWatermarkPos(e.target.value)}
                          className="w-full rounded border border-hairline bg-paper px-2 py-1 text-xs text-ink"
                        >
                          <option value="center">Centered & Rotated</option>
                          <option value="top-left">Top Left</option>
                          <option value="top-right">Top Right</option>
                          <option value="bottom-left">Bottom Left</option>
                          <option value="bottom-right">Bottom Right</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {slug === "add-page-numbers" && (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] font-bold text-ink/60 uppercase">
                          Vertical Position
                        </label>
                        <select
                          value={pageNumPos}
                          onChange={(e: any) => setPageNumPos(e.target.value)}
                          className="w-full rounded border border-hairline bg-paper px-2.5 py-1.5 text-xs text-ink"
                        >
                          <option value="bottom">Page Footer (Bottom)</option>
                          <option value="top">Page Header (Top)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] font-bold text-ink/60 uppercase">
                          Alignment Layout
                        </label>
                        <select
                          value={pageNumAlign}
                          onChange={(e: any) => setPageNumAlign(e.target.value)}
                          className="w-full rounded border border-hairline bg-paper px-2.5 py-1.5 text-xs text-ink"
                        >
                          <option value="center">Centered</option>
                          <option value="left">Left Margin</option>
                          <option value="right">Right Margin</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {slug === "protect-pdf" && (
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] font-bold text-ink/60 uppercase">
                        Encryption Password
                      </label>
                      <input
                        type="password"
                        placeholder="Required password value"
                        value={pdfPassword}
                        onChange={(e) => setPdfPassword(e.target.value)}
                        className="w-full rounded border border-hairline bg-paper px-2.5 py-1.5 font-sans text-xs text-ink focus:border-brand focus:outline-none"
                      />
                      <p className="font-mono text-[9px] text-ink/40">
                        Adds standard RC4 password protection.
                      </p>
                    </div>
                  )}

                  {slug === "compress-image" && (
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] font-bold text-ink/60 uppercase flex justify-between">
                        <span>Quality Slider</span>
                        <span>{Math.round(imgCompressQuality * 100)}%</span>
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.05"
                        value={imgCompressQuality}
                        onChange={(e) => setImgCompressQuality(parseFloat(e.target.value))}
                        className="w-full h-1 bg-paper rounded"
                      />
                    </div>
                  )}

                  {slug === "resize-image" && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="font-mono text-[9px] font-bold text-ink/60 uppercase">
                            Width (px)
                          </label>
                          <input
                            type="number"
                            value={imgWidth}
                            onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                            className="w-full rounded border border-hairline bg-paper px-2 py-1 text-xs"
                          />
                        </div>
                        <div>
                          <label className="font-mono text-[9px] font-bold text-ink/60 uppercase">
                            Height (px)
                          </label>
                          <input
                            type="number"
                            value={imgHeight}
                            onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                            className="w-full rounded border border-hairline bg-paper px-2 py-1 text-xs"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="lock-aspect"
                          checked={lockRatio}
                          onChange={(e) => setLockRatio(e.target.checked)}
                          className="h-3.5 w-3.5 rounded border-hairline text-brand accent-brand"
                        />
                        <label htmlFor="lock-aspect" className="font-mono text-[10px] text-ink/70">
                          Lock Aspect Ratio
                        </label>
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] font-bold text-ink/60 uppercase">
                          Target Format
                        </label>
                        <select
                          value={imgTargetFormat}
                          onChange={(e) => setImgTargetFormat(e.target.value)}
                          className="w-full rounded border border-hairline bg-paper px-2 py-1 text-xs text-ink"
                        >
                          <option value="image/png">PNG Format</option>
                          <option value="image/jpeg">JPEG format</option>
                          <option value="image/webp">WEBP format</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {slug === "convert-image" && (
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] font-bold text-ink/60 uppercase">
                        Transcode to Format
                      </label>
                      <select
                        value={imgTargetFormat}
                        onChange={(e) => setImgTargetFormat(e.target.value)}
                        className="w-full rounded border border-hairline bg-paper px-2.5 py-1.5 text-xs text-ink focus:border-brand"
                      >
                        <option value="image/png">PNG Format</option>
                        <option value="image/jpeg">JPEG format</option>
                        <option value="image/webp">WEBP format</option>
                      </select>
                    </div>
                  )}

                  {slug === "crop-image" && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="font-mono text-[9px] font-bold text-ink/60 uppercase">
                            Crop X Offset
                          </label>
                          <input
                            type="number"
                            value={cropX}
                            onChange={(e) => setCropX(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full rounded border border-hairline bg-paper px-2 py-1 text-xs"
                          />
                        </div>
                        <div>
                          <label className="font-mono text-[9px] font-bold text-ink/60 uppercase">
                            Crop Y Offset
                          </label>
                          <input
                            type="number"
                            value={cropY}
                            onChange={(e) => setCropY(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full rounded border border-hairline bg-paper px-2 py-1 text-xs"
                          />
                        </div>
                        <div>
                          <label className="font-mono text-[9px] font-bold text-ink/60 uppercase">
                            Crop Width
                          </label>
                          <input
                            type="number"
                            value={cropW}
                            onChange={(e) => setCropW(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full rounded border border-hairline bg-paper px-2 py-1 text-xs"
                          />
                        </div>
                        <div>
                          <label className="font-mono text-[9px] font-bold text-ink/60 uppercase">
                            Crop Height
                          </label>
                          <input
                            type="number"
                            value={cropH}
                            onChange={(e) => setCropH(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full rounded border border-hairline bg-paper px-2 py-1 text-xs"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] font-bold text-ink/60 uppercase">
                          Target Format
                        </label>
                        <select
                          value={imgTargetFormat}
                          onChange={(e) => setImgTargetFormat(e.target.value)}
                          className="w-full rounded border border-hairline bg-paper px-2 py-1 text-xs text-ink"
                        >
                          <option value="image/png">PNG Format</option>
                          <option value="image/jpeg">JPEG format</option>
                          <option value="image/webp">WEBP format</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* images-to-pdf global settings removed, rotated individually in FileList */}
                </div>
              </div>
            </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600">
            <div className="font-semibold">Error:</div>
            <div>{error}</div>
          </div>
        )}
      </div>

      {/* Scaffolded SEO Article, How-To & FAQ Section */}
      {(() => {
        const seo = SEO_REGISTRY[slug];
        if (!seo) return null;

        // Get related tools data for cross-linking
        const relatedTools = (seo.relatedSlugs || []).map((rs: string) => {
          const tool = TOOLS.find(t => t.slug === rs);
          const relSeo = SEO_REGISTRY[rs];
          return tool && relSeo ? { slug: rs, name: tool.name, description: relSeo.description, icon: tool.icon } : null;
        }).filter(Boolean) as { slug: string; name: string; description: string; icon: any }[];

        return (
          <article className="mt-8 border-t border-hairline pt-8 space-y-10 text-ink">
            {/* Intro section */}
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold">
                About {seo.h1}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed max-w-3xl">
                {seo.intro}
              </p>
            </section>

            {/* How-To Steps */}
            <section className="space-y-4">
              <h2 className="font-display text-lg font-bold">
                How to {seo.h1}
              </h2>
              <ol className="list-decimal pl-5 space-y-3 font-sans text-xs sm:text-sm text-ink/80 leading-relaxed">
                {seo.steps.map((step, idx) => (
                  <li key={idx} className="pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            {/* Interactive FAQ Accordions */}
            <section className="space-y-4">
              <h2 className="font-display text-lg font-bold">
                Frequently Asked Questions
              </h2>
              <div className="space-y-2">
                {seo.faqs.map((faq, idx) => (
                  <details key={idx} className="group border border-hairline rounded-xl bg-white overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-display text-xs sm:text-sm font-bold text-ink hover:bg-ink/[0.02] transition-colors">
                      <span className="flex items-start gap-2">
                        <span className="text-brand font-mono mt-0.5">Q.</span>
                        {faq.q}
                      </span>
                      <span className="text-ink/40 group-open:rotate-180 transition-transform text-sm ml-3 shrink-0">▼</span>
                    </summary>
                    <div className="px-5 pb-4 pt-1">
                      <p className="font-sans text-xs sm:text-sm text-ink/70 leading-relaxed pl-5">
                        {faq.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Related Tools Cross-Link Grid */}
            {relatedTools.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-display text-lg font-bold">
                  Related Tools
                </h2>
                <nav className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {relatedTools.map((rt) => {
                    const RtIcon = rt.icon;
                    return (
                      <Link
                        key={rt.slug}
                        href={`/tools/${rt.slug}`}
                        className="group flex items-start gap-3 border border-hairline rounded-xl p-4 bg-white hover:border-brand/30 hover:shadow-sm transition-all no-underline"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/5 text-brand">
                          <RtIcon className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <div className="font-display text-xs font-bold text-ink group-hover:text-brand transition-colors">
                            {rt.name}
                          </div>
                          <p className="font-sans text-[10px] sm:text-[11px] text-ink/60 leading-relaxed line-clamp-2">
                            {rt.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </section>
            )}

            {/* Privacy & Trust Signals */}
            <section className="border border-hairline bg-[#F1EFEA] rounded-xl p-6 space-y-3">
              <h3 className="font-display font-bold text-ink text-sm flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-brand" />
                Your Privacy is Guaranteed
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
                {config.privacyExplanation} PDFDock operates 100% offline after the initial page load. We have no backend servers, no database, and no file storage. Your documents are processed entirely in your browser&apos;s memory and are never transmitted over the network. This makes PDFDock inherently compliant with GDPR, CCPA, HIPAA, and other global privacy regulations.
              </p>
            </section>
          </article>
        );
      })()}

      {/* Sticky floating process button at bottom */}
      {!isProcessing && !result && files.length > 0 && (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
          <button
            type="button"
            onClick={handleProcess}
            className="pointer-events-auto flex items-center justify-center gap-2 bg-brand hover:bg-brand/90 hover:scale-102 font-display text-sm md:text-base font-bold text-white rounded-full py-3.5 px-8 shadow-xl transition-all transform active:scale-98 cursor-pointer border border-brand/20"
          >
            <Sparkles className="h-4.5 w-4.5 md:h-5 md:w-5 animate-pulse" />
            Process Files
          </button>
        </div>
      )}
    </div>
  );
}
