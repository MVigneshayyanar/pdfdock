"use client";

import Link from "next/link";
import { ShieldCheck, Info, HelpCircle } from "lucide-react";

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

        <nav className="flex items-center gap-3 sm:gap-5" aria-label="Main Header Navigation">
          <Link
            href="/how-it-works/"
            className="hidden md:inline-flex items-center gap-1 font-mono text-xs font-semibold text-ink/70 hover:text-brand transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            How It Works
          </Link>
          <Link
            href="/about/"
            className="hidden md:inline-flex items-center gap-1 font-mono text-xs font-semibold text-ink/70 hover:text-brand transition-colors"
          >
            <Info className="h-3.5 w-3.5" />
            About
          </Link>

          <div className="flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1 font-mono text-xs font-medium text-green-600">
            <ShieldCheck className="h-4 w-4 animate-pulse-slow text-green-600" />
            <span className="hidden sm:inline">100% Local:</span> Private Browser Engine
          </div>
        </nav>
      </div>
    </header>
  );
}
