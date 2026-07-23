import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Cpu, Lock, Globe, HardDrive, WifiOff, CheckCircle2, ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "How In-Browser PDF Processing Works — Zero Upload Security | PDFDock",
  description: "Learn how PDFDock processes PDF and image files 100% inside your browser using WebAssembly and client-side JavaScript. Zero server uploads, zero privacy risk.",
  alternates: {
    canonical: "/how-it-works/",
  },
  openGraph: {
    title: "How In-Browser PDF Processing Works — PDFDock Privacy Guide",
    description: "Discover how client-side WebAssembly and HTML5 Canvas APIs enable fast PDF and image manipulation without uploading files to any server.",
    url: "https://www.pdfdock.tech/how-it-works/",
    type: "article",
  }
};

export default function HowItWorksPage() {
  const breadcrumbData = {
    items: [
      { name: "Home", url: "https://www.pdfdock.tech" },
      { name: "How It Works", url: "https://www.pdfdock.tech/how-it-works/" }
    ]
  };

  const faqData = [
    {
      q: "Does PDFDock upload my files to any server?",
      a: "No, never. PDFDock executes 100% of file operations inside your browser using WebAssembly and JavaScript compiled modules. Your files remain exclusively in your device's local memory (RAM)."
    },
    {
      q: "How can PDF tools work without a server backend?",
      a: "Modern web browsers are powerful runtime environments. Libraries like pdf-lib, PDF.js, and JSZip allow browsers to parse, edit, render, and compress binary PDF byte arrays and image buffers locally."
    },
    {
      q: "Are my confidential files compliant with GDPR, CCPA, and HIPAA on PDFDock?",
      a: "Yes. Because PDFDock does not collect, store, transmit, or process your files on external servers, data protection regulations like GDPR, CCPA, and HIPAA are inherently satisfied."
    },
    {
      q: "Can I use PDFDock when offline?",
      a: "Yes. Once the PDFDock web app is loaded in your browser tab, all tools function completely offline without requiring an active internet or cellular connection."
    }
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:py-14 flex-1 flex flex-col space-y-10 text-ink">
      <JsonLd type="Breadcrumb" data={breadcrumbData} />
      <JsonLd type="FAQPage" data={{ faqs: faqData }} />

      {/* Header */}
      <header className="space-y-4 border-b border-hairline pb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/5 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-brand">
          <ShieldCheck className="h-4 w-4 text-brand" />
          Technical Architecture & Security
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          How In-Browser PDF Processing Works
        </h1>
        <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
          Unlike traditional online PDF tools that upload your private documents to cloud servers, PDFDock executes all file operations directly on your device.
        </p>
      </header>

      {/* Main Core Principles */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl border border-hairline bg-white p-5 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
            <Cpu className="h-5 w-5" />
          </div>
          <h2 className="font-display text-sm font-bold text-ink">1. WebAssembly & Client JS</h2>
          <p className="font-sans text-xs text-ink/70 leading-relaxed">
            PDFDock loads high-performance WebAssembly and compiled JavaScript packages into your browser tab. Document parsing happens inside local RAM.
          </p>
        </div>

        <div className="rounded-xl border border-hairline bg-white p-5 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-600">
            <Lock className="h-5 w-5" />
          </div>
          <h2 className="font-display text-sm font-bold text-ink">2. Zero Server Uploads</h2>
          <p className="font-sans text-xs text-ink/70 leading-relaxed">
            Your files never cross a network interface. There are no backend databases, temporary cloud folders, or remote API endpoints receiving your data.
          </p>
        </div>

        <div className="rounded-xl border border-hairline bg-white p-5 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
            <WifiOff className="h-5 w-5" />
          </div>
          <h2 className="font-display text-sm font-bold text-ink">3. Offline-First PWA</h2>
          <p className="font-sans text-xs text-ink/70 leading-relaxed">
            Because execution is 100% local, PDFDock functions even when your device is completely disconnected from Wi-Fi or cellular networks.
          </p>
        </div>
      </section>

      {/* Detailed Technical Breakdown */}
      <section className="space-y-4 border-t border-hairline pt-8">
        <h2 className="font-display text-xl font-bold">The Technical Architecture of In-Browser Document Editing</h2>
        <div className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed space-y-4">
          <p>
            Traditional PDF utility websites (like iLovePDF, SmallPDF, or Adobe Acrobat Online) use a server-client model. When you upload a file, your document is sent across the internet to a cloud server, processed on a remote machine, and sent back as a download link. Even when service providers state that files are deleted after one hour, your data is exposed to network transit risks and third-party storage during that window.
          </p>
          <p>
            <strong>PDFDock operates differently.</strong> By using modern web standards such as modern <code>ArrayBuffer</code> memory views, <code>HTML5 Canvas APIs</code>, and <code>WebAssembly (WASM)</code> modules, PDFDock converts your web browser into an independent document workstation:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="border border-hairline rounded-lg p-4 bg-white/60 space-y-1.5">
              <div className="font-display font-bold text-xs text-ink flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand" />
                Binary PDF Manipulation
              </div>
              <p className="text-[11px] text-ink/70">
                PDF-lib parses PDF object trees directly from local ArrayBuffers. Merging, splitting, page rotation, and watermarking happen by modifying byte references in local memory.
              </p>
            </div>

            <div className="border border-hairline rounded-lg p-4 bg-white/60 space-y-1.5">
              <div className="font-display font-bold text-xs text-ink flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand" />
                Lossless Canvas Transcoding
              </div>
              <p className="text-[11px] text-ink/70">
                Image operations (compression, resizing, cropping, and format conversion) utilize the browser's hardware-accelerated 2D canvas context for sub-millisecond execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Comparison Table */}
      <section className="space-y-4 border-t border-hairline pt-8">
        <h2 className="font-display text-xl font-bold">Client-Side vs. Cloud PDF Utilities</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-ink text-paper">
                <th className="text-left py-3 px-4 font-display font-bold rounded-tl-lg">Security Feature</th>
                <th className="text-center py-3 px-4 font-display font-bold text-brand bg-brand/10">PDFDock (Client-Side)</th>
                <th className="text-center py-3 px-4 font-display font-bold rounded-tr-lg">Cloud PDF Tools (Server-Side)</th>
              </tr>
            </thead>
            <tbody className="font-sans">
              <tr className="border-b border-hairline">
                <td className="py-2.5 px-4 font-semibold text-ink">Network Upload Required</td>
                <td className="py-2.5 px-4 text-center text-green-600 font-bold">No — Files stay on device</td>
                <td className="py-2.5 px-4 text-center text-red-500">Yes — Transmitted to cloud</td>
              </tr>
              <tr className="border-b border-hairline bg-white/50">
                <td className="py-2.5 px-4 font-semibold text-ink">Third-Party Cloud Storage</td>
                <td className="py-2.5 px-4 text-center text-green-600 font-bold">Zero Storage</td>
                <td className="py-2.5 px-4 text-center text-amber-600">Stored for 1 to 24 hours</td>
              </tr>
              <tr className="border-b border-hairline">
                <td className="py-2.5 px-4 font-semibold text-ink">Privacy Regulations (GDPR/HIPAA)</td>
                <td className="py-2.5 px-4 text-center text-green-600 font-bold">Inherently Compliant</td>
                <td className="py-2.5 px-4 text-center text-amber-600">Requires DPA & Data Audits</td>
              </tr>
              <tr className="border-b border-hairline bg-white/50">
                <td className="py-2.5 px-4 font-semibold text-ink">Offline Execution</td>
                <td className="py-2.5 px-4 text-center text-green-600 font-bold">Yes — Works without internet</td>
                <td className="py-2.5 px-4 text-center text-red-500">No — Fails offline</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-ink rounded-bl-lg">Daily Usage Limits</td>
                <td className="py-2.5 px-4 text-center text-green-600 font-bold">Unlimited Free Access</td>
                <td className="py-2.5 px-4 text-center text-amber-600 rounded-br-lg">Capped or Paid Subscriptions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="space-y-4 border-t border-hairline pt-8">
        <h2 className="font-display text-xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <details key={index} className="group border border-hairline rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-display text-xs sm:text-sm font-bold text-ink hover:bg-ink/[0.02] transition-colors">
                <span>{faq.q}</span>
                <span className="text-ink/40 group-open:rotate-180 transition-transform text-sm ml-3 shrink-0">▼</span>
              </summary>
              <div className="px-5 pb-4 pt-1">
                <p className="font-sans text-xs sm:text-sm text-ink/70 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Action CTA */}
      <section className="border border-hairline bg-brand/5 rounded-2xl p-6 text-center space-y-3">
        <h3 className="font-display text-lg font-bold text-ink">Ready to edit your documents privately?</h3>
        <p className="font-sans text-xs text-ink/70 max-w-lg mx-auto">
          Explore our suite of 14 free PDF and image processing tools — 100% private, no signup, no uploads.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-display text-xs font-bold text-white hover:bg-brand/90 transition-all shadow-md cursor-pointer"
          >
            Open All PDF Tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </article>
  );
}
