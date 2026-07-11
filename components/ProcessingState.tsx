import { Loader2 } from "lucide-react";

interface ProcessingStateProps {
  message?: string;
  progress?: number; // Optional 0-100 progress value
}

export default function ProcessingState({
  message = "Processing files in your browser...",
  progress,
}: ProcessingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 border border-hairline rounded-xl bg-white space-y-4">
      <div className="relative flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand" />
        {progress !== undefined && (
          <span className="absolute font-mono text-[9px] font-bold text-ink">
            {Math.round(progress)}%
          </span>
        )}
      </div>

      <div className="text-center">
        <h4 className="font-display font-bold text-ink text-sm">
          {message}
        </h4>
        <p className="font-mono text-[10px] text-ink/50 mt-1">
          Zero network transfers. Keep this tab open.
        </p>
      </div>

      {progress !== undefined && (
        <div className="w-full max-w-xs bg-paper h-1.5 rounded-full overflow-hidden border border-hairline">
          <div
            className="bg-brand h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
