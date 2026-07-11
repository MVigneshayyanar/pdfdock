"use client";

import { useEffect, useState } from "react";
import { FileIcon, Trash2, ArrowUp, ArrowDown, Move, RotateCw } from "lucide-react";

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
  onReorder: (newFiles: File[]) => void;
  rotations?: number[];
  onRotate?: (index: number) => void;
}

function FileThumbnail({ file, rotation = 0 }: { file: File; rotation?: number }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (src) {
    return (
      <img
        src={src}
        alt={file.name}
        className="h-full w-full object-cover rounded transition-transform duration-200"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    );
  }

  return <FileIcon className="h-5 w-5" />;
}

export default function FileList({ files, onRemove, onReorder, rotations = [], onRotate }: FileListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const moveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= files.length) return;

    const listCopy = [...files];
    const item = listCopy[index];
    listCopy.splice(index, 1);
    listCopy.splice(newIndex, 0, item);
    onReorder(listCopy);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const listCopy = [...files];
    const draggedItem = listCopy[draggedIndex];
    
    // Remove at old index
    listCopy.splice(draggedIndex, 1);
    // Insert at new index
    listCopy.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    onReorder(listCopy);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="w-full space-y-2 max-h-[350px] overflow-y-auto pr-1">
      {files.map((file, index) => {
        const isImage = file.type.startsWith("image/");
        return (
          <div
            key={`${file.name}-${index}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex items-center justify-between border border-hairline rounded-lg p-3 bg-white transition-all ${
              draggedIndex === index ? "opacity-40 border-brand" : "hover:border-ink/20"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="cursor-grab text-ink/30 hover:text-ink/60 p-1 rounded"
                title="Drag to reorder"
              >
                <Move className="h-4 w-4" />
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#F1EFEA] text-ink/70 overflow-hidden">
                <FileThumbnail file={file} rotation={rotations[index] || 0} />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs font-medium text-ink truncate max-w-[200px] sm:max-w-[400px]">
                  {file.name}
                </p>
                <p className="font-mono text-[10px] text-ink/50 mt-0.5">
                  {formatSize(file.size)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {isImage && onRotate && (
                <button
                  type="button"
                  onClick={() => onRotate(index)}
                  className="p-1 text-brand hover:bg-brand/5 rounded transition-all"
                  title="Rotate image 90°"
                >
                  <RotateCw className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => moveItem(index, "up")}
                disabled={index === 0}
                className="p-1 text-ink/40 hover:text-ink/80 hover:bg-paper rounded disabled:opacity-20 disabled:hover:bg-transparent"
                title="Move Up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => moveItem(index, "down")}
                disabled={index === files.length - 1}
                className="p-1 text-ink/40 hover:text-ink/80 hover:bg-paper rounded disabled:opacity-20 disabled:hover:bg-transparent"
                title="Move Down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-500/5 rounded transition-colors"
                title="Remove File"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
