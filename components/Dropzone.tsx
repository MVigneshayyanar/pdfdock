"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, AlertCircle } from "lucide-react";

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept: Record<string, string[]>;
  multiple?: boolean;
  maxSizeMB?: number;
  label?: string;
  compact?: boolean;
}

export default function Dropzone({
  onFilesSelected,
  accept,
  multiple = true,
  maxSizeMB = 100,
  label,
  compact = false,
}: DropzoneProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === "file-too-large") {
          setError(`File is too large. Maximum size allowed is ${maxSizeMB}MB.`);
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          setError("Unsupported file format. Please check the accepted formats.");
        } else {
          setError(rejection.errors[0]?.message || "Invalid file selected.");
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }
    },
    [onFilesSelected, maxSizeMB]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize: maxSizeMB * 1024 * 1024,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
          compact ? "p-4" : "p-10"
        } ${
          isDragActive
            ? "border-brand bg-brand/5"
            : "border-hairline hover:border-brand/40 bg-white"
        }`}
      >
        <input {...getInputProps()} />
        <div className={`flex items-center justify-center rounded-full bg-paper border border-hairline text-ink/70 ${
          compact ? "h-8 w-8 mb-2" : "h-12 w-12 mb-4"
        }`}>
          <Upload className={compact ? "h-4 w-4" : "h-6 w-6"} />
        </div>
        <p className={`font-display font-medium text-ink text-center ${
          compact ? "text-xs" : "text-sm md:text-base"
        }`}>
          {isDragActive
            ? "Drop the files here..."
            : label || "Drag & drop files here, or click to select"}
        </p>
        {!compact && (
          <p className="font-mono text-xs text-ink/40 mt-1.5">
            Maximum file size: {maxSizeMB}MB
          </p>
        )}
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-600">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          <div>
            <span className="font-semibold">Upload Error:</span> {error}
          </div>
        </div>
      )}
    </div>
  );
}
