"use client";

import { useState } from "react";
import Link from "next/link";
import {
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
  FileSpreadsheet,
  Presentation,
  ScanText,
  ArrowRight
} from "lucide-react";

export interface Tool {
  slug: string;
  name: string;
  description: string;
  icon: any;
  category: "pdf" | "image" | "soon";
  status?: "local" | "coming-soon";
}

export const TOOLS: Tool[] = [
  // PDF Tools (Prioritized by search popularity)
  {
    slug: "images-to-pdf",
    name: "Images to PDF",
    description: "Convert PNG, JPG, or WebP images into a perfectly formatted PDF document.",
    icon: FileImage,
    category: "pdf",
    status: "local",
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF documents into a single file in any order you choose.",
    icon: LayersIcon,
    category: "pdf",
    status: "local",
  },
  {
    slug: "pdf-to-images",
    name: "PDF to Images",
    description: "Extract every page of a PDF and convert it to high-quality PNG or JPG files.",
    icon: ImageIcon,
    category: "pdf",
    status: "local",
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce PDF file size by downsampling embedded images without losing layout.",
    icon: Minimize2,
    category: "pdf",
    status: "local",
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    description: "Extract specific page ranges or save every page as a separate PDF file.",
    icon: Scissors,
    category: "pdf",
    status: "local",
  },
  {
    slug: "protect-pdf",
    name: "Protect PDF",
    description: "Encrypt your PDF with a secure user password to prevent unauthorized viewing.",
    icon: Lock,
    category: "pdf",
    status: "local",
  },
  
  // Image Tools (Prioritized)
  {
    slug: "compress-image",
    name: "Compress Image",
    description: "Shrink JPG, PNG, or WebP files using smart compression. Compare before/after sizes.",
    icon: Minimize2,
    category: "image",
    status: "local",
  },
  {
    slug: "resize-image",
    name: "Resize Image",
    description: "Change the width and height dimensions or scale by percentage. Toggle lock ratio.",
    icon: Compass,
    category: "image",
    status: "local",
  },
  {
    slug: "convert-image",
    name: "Convert Format",
    description: "Instantly transcode images between PNG, JPEG, and WebP formats fully offline.",
    icon: FileImage,
    category: "image",
    status: "local",
  },
  {
    slug: "crop-image",
    name: "Crop Image",
    description: "Trim image boundaries with exact pixel offsets and preview margins before export.",
    icon: Scissors,
    category: "image",
    status: "local",
  },

  // PDF Page Management & Annotations
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    description: "Rotate specific pages or the entire document to portrait or landscape orientations.",
    icon: RotateCw,
    category: "pdf",
    status: "local",
  },
  {
    slug: "remove-pages",
    name: "Remove Pages",
    description: "Discard unwanted pages from your document and download the cleaned PDF.",
    icon: Trash2,
    category: "pdf",
    status: "local",
  },
  {
    slug: "add-watermark",
    name: "Add Watermark",
    description: "Stamp a custom text overlay onto pages with adjustable size, color, opacity, and positioning.",
    icon: Stamp,
    category: "pdf",
    status: "local",
  },
  {
    slug: "add-page-numbers",
    name: "Add Page Numbers",
    description: "Embed customized page numbers automatically in header or footer positions.",
    icon: Hash,
    category: "pdf",
    status: "local",
  },

  // Coming Soon Tools
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    description: "Convert PDF documents to editable Microsoft Word files.",
    icon: ArrowRight,
    category: "soon",
    status: "coming-soon",
  },
  {
    slug: "pdf-to-excel",
    name: "PDF to Excel",
    description: "Extract PDF tables directly into Excel spreadsheets.",
    icon: FileSpreadsheet,
    category: "soon",
    status: "coming-soon",
  },
  {
    slug: "pdf-to-ppt",
    name: "PDF to PowerPoint",
    description: "Convert PDF slides into editable PPT presentations.",
    icon: Presentation,
    category: "soon",
    status: "coming-soon",
  },
  {
    slug: "ocr-scanner",
    name: "OCR Text Scanner",
    description: "Extract editable text from scanned documents and images.",
    icon: ScanText,
    category: "soon",
    status: "coming-soon",
  },
];

// Inline replacement for LayersIcon since it comes from lucide-react but is named Layers
function LayersIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-10 5 10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}

export default function HomeClient() {
  const [filter, setFilter] = useState<"all" | "pdf" | "image" | "soon">("all");

  const filteredTools = TOOLS.filter(
    (tool) => filter === "all" || tool.category === filter
  );

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-1.5 border-b border-hairline pb-3 sm:pb-4">
        {(["all", "pdf", "image", "soon"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 text-xs sm:text-sm font-display font-semibold rounded-lg border transition-all cursor-pointer ${
              filter === cat
                ? "bg-ink border-ink text-paper"
                : "border-hairline hover:border-ink/20 text-ink/70 bg-white"
            }`}
          >
            {cat === "all" && "All Tools"}
            {cat === "pdf" && "PDF Utilities"}
            {cat === "image" && "Image Editors"}
            {cat === "soon" && "Coming Soon"}
          </button>
        ))}
      </div>

      {/* Grid of Tools (Mobile: 2 columns, Desktop: 3 columns) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          const isComingSoon = tool.status === "coming-soon";

          const CardContent = (
            <div
              className={`group flex flex-col justify-between border border-hairline rounded-xl p-4 sm:p-5 bg-white hover:border-brand/40 hover:shadow-sm transition-all h-full ${
                isComingSoon ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5 cursor-pointer"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg ${
                    isComingSoon ? "bg-ink/5 text-ink/40" : "bg-brand/5 text-brand"
                  }`}>
                    <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </div>
                  {isComingSoon ? (
                    <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-ink/40 bg-ink/5 px-1.5 py-0.5 rounded border border-ink/10">
                      Phase 2
                    </span>
                  ) : (
                    <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                      Local WASM
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-sm sm:text-base text-ink group-hover:text-brand transition-colors">
                  {tool.name}
                </h3>
                <p className="font-sans text-[11px] sm:text-xs text-ink/75 mt-1.5 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-hairline/50 flex justify-between items-center">
                {isComingSoon ? (
                  <span className="font-mono text-[10px] text-ink/40 italic">
                    Coming Soon
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-xs font-bold text-brand group-hover:gap-1.5 transition-all">
                    Launch Tool
                    <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </span>
                )}
              </div>
            </div>
          );

          if (isComingSoon) {
            return <div key={tool.slug}>{CardContent}</div>;
          }

          return (
            <Link href={`/tools/${tool.slug}`} key={tool.slug} className="block no-underline">
              {CardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
