"use client";

import Link from "next/link";
import { ShieldCheck, FileText } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink transition-transform group-hover:scale-105 overflow-hidden">
            <img src="/favicon.svg" alt="PDFDock Logo" className="h-7 w-7" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-ink">
              PDFDock
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-ink/50">
              File processor
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1 font-mono text-xs font-medium text-green-600 dark:text-green-500">
            <ShieldCheck className="h-4.5 w-4.5 animate-pulse-slow text-green-500" />
            <span className="hidden sm:inline">100% Local:</span> Secure Client-Side
          </div>
        </div>
      </div>
    </header>
  );
}
