"use client";

import { Download, RefreshCw, CheckCircle2, Pencil, Check, X } from "lucide-react";
import { useState } from "react";

interface ResultCardProps {
  originalSize?: number;
  newSize?: number;
  fileName: string;
  onDownload: () => void;
  onReset: () => void;
  onRename?: (newName: string) => void;
}

export default function ResultCard({
  originalSize,
  newSize,
  fileName,
  onDownload,
  onReset,
  onRename,
}: ResultCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(fileName);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSave = () => {
    if (tempName.trim() && onRename) {
      onRename(tempName.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempName(fileName);
    setIsEditing(false);
  };

  return (
    <div className="relative overflow-hidden border border-hairline rounded-xl bg-white p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
      {/* Decorative Signature "DONE" stamp mark */}
      <div className="absolute right-6 top-6 md:right-10 md:top-6 pointer-events-none select-none z-10 animate-stamp opacity-90">
        <div className="stamp-text px-4 py-1 text-xs md:text-sm font-black tracking-widest rounded border-4 uppercase whitespace-nowrap">
          DONE
        </div>
      </div>

      <div className="flex flex-col space-y-4 max-w-md min-w-0 z-0 w-full md:w-auto">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
          <h3 className="font-display font-bold text-lg text-ink truncate">
            Task Complete!
          </h3>
        </div>
        
        <div className="w-full">
          <p className="font-mono text-xs text-ink/40">OUTPUT FILE</p>
          
          {isEditing ? (
            <div className="flex items-center gap-1.5 mt-1.5 w-full">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full rounded border border-brand/50 bg-paper px-3 py-1.5 text-xs text-ink font-mono focus:border-brand focus:outline-none pr-8"
                  placeholder="Enter filename"
                  autoFocus
                />
                {tempName && (
                  <button
                    type="button"
                    onClick={() => setTempName("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-ink/40 hover:text-ink/80 rounded"
                    title="Clear input"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={handleSave}
                className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer transition-colors"
                title="Save changes"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="p-1.5 bg-ink/10 hover:bg-ink/20 text-ink rounded cursor-pointer transition-colors"
                title="Cancel editing"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mt-0.5 group">
              <p className="font-mono text-sm font-semibold text-ink truncate max-w-[280px] sm:max-w-md" title={fileName}>
                {fileName}
              </p>
              <button
                type="button"
                onClick={() => {
                  setTempName(fileName);
                  setIsEditing(true);
                }}
                className="p-1 text-ink/40 hover:text-brand hover:bg-brand/5 rounded transition-all cursor-pointer"
                title="Rename file"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {newSize && (
          <div className="flex gap-6 font-mono text-xs border-t border-hairline pt-3 mt-1">
            <div>
              <span className="text-ink/40 block font-sans">FILE SIZE</span>
              <span className="text-ink font-bold">{formatSize(newSize)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto z-0">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-2 border border-hairline hover:bg-paper font-display text-sm font-semibold text-ink rounded-lg px-5 py-3 transition-colors cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          Process Another
        </button>
        <button
          type="button"
          onClick={onDownload}
          className="flex items-center justify-center gap-2 bg-brand hover:bg-brand/90 font-display text-sm font-semibold text-white rounded-lg px-6 py-3 transition-all transform active:scale-98 shadow-sm cursor-pointer"
        >
          <Download className="h-4 w-4" />
          Download File
        </button>
      </div>
    </div>
  );
}
