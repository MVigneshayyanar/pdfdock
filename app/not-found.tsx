"use client";

import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24 flex flex-col items-center justify-center text-center space-y-6 flex-1">
      {/* 404 Icon & Header */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-brand/5 text-brand mb-2">
        <FileQuestion className="h-10 w-10 animate-bounce-slow" />
        <div className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-paper font-mono">
          ?
        </div>
      </div>

      <div className="space-y-2">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-3 py-1 rounded-full">
          Error 404
        </span>
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-ink leading-tight">
          Page Not Found
        </h1>
        <p className="font-sans text-xs sm:text-sm text-ink/70 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
          Everything at PDFDock runs entirely in your browser — your files never touch a server.
        </p>
      </div>

      {/* Quick Navigation Links */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-xs sm:text-sm font-semibold text-paper hover:bg-ink/90 transition-all shadow-sm hover:shadow cursor-pointer"
        >
          <Home className="h-4 w-4" />
          Back to Homepage
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-hairline bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-ink hover:bg-[#F1EFEA] hover:border-ink/20 transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>

      {/* Helpful links grid */}
      <div className="border-t border-hairline pt-8 w-full max-w-md">
        <h2 className="font-display text-xs font-bold text-ink uppercase tracking-wider mb-4">
          Popular Free PDF Tools
        </h2>
        <div className="grid grid-cols-2 gap-2 text-left">
          <Link
            href="/tools/merge-pdf/"
            className="p-2.5 rounded-lg border border-hairline bg-white hover:border-brand/30 hover:shadow-xs transition-all text-xs font-semibold text-ink hover:text-brand no-underline flex items-center justify-between"
          >
            <span>Merge PDF</span>
            <span className="text-brand/50">→</span>
          </Link>
          <Link
            href="/tools/split-pdf/"
            className="p-2.5 rounded-lg border border-hairline bg-white hover:border-brand/30 hover:shadow-xs transition-all text-xs font-semibold text-ink hover:text-brand no-underline flex items-center justify-between"
          >
            <span>Split PDF</span>
            <span className="text-brand/50">→</span>
          </Link>
          <Link
            href="/tools/compress-pdf/"
            className="p-2.5 rounded-lg border border-hairline bg-white hover:border-brand/30 hover:shadow-xs transition-all text-xs font-semibold text-ink hover:text-brand no-underline flex items-center justify-between"
          >
            <span>Compress PDF</span>
            <span className="text-brand/50">→</span>
          </Link>
          <Link
            href="/tools/images-to-pdf/"
            className="p-2.5 rounded-lg border border-hairline bg-white hover:border-brand/30 hover:shadow-xs transition-all text-xs font-semibold text-ink hover:text-brand no-underline flex items-center justify-between"
          >
            <span>Images to PDF</span>
            <span className="text-brand/50">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
