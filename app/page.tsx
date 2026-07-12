import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import JsonLd from "@/components/JsonLd";
import { Globe, ShieldCheck, Wifi, Smartphone } from "lucide-react";
import CameraScanner from "@/components/CameraScanner";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PDFDock — Free Private PDF & Image Tools Online | iLovePDF & SmallPDF Alternative",
  description: "Free online PDF and image tools — merge, split, compress, rotate, protect, watermark, resize, crop, convert. 100% private, no upload. Best iLovePDF & SmallPDF alternative. Works on any device worldwide.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PDFDock — Free Private PDF & Image Tools Online",
    description: "Merge, split, compress, protect, watermark, resize, crop, and convert files — 100% private, no upload. The best free alternative to iLovePDF and SmallPDF.",
    url: "https://pdfdock.tech",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PDFDock — Free PDF & Image Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDFDock — Free Private PDF & Image Tools Online",
    description: "Merge, split, compress, protect, watermark, resize, crop, and convert files — 100% private, no upload.",
    images: ["/og-image.png"],
  }
};

const ALL_TOOLS_SEO = [
  { name: "Images to PDF", slug: "images-to-pdf", desc: "Convert JPG, PNG, and WebP images to a single PDF document. Free, no upload." },
  { name: "Merge PDF", slug: "merge-pdf", desc: "Combine multiple PDF files into one document. Reorder pages freely." },
  { name: "PDF to Images", slug: "pdf-to-images", desc: "Extract PDF pages as high-quality PNG images. Download as ZIP." },
  { name: "Compress PDF", slug: "compress-pdf", desc: "Reduce PDF file size with adjustable quality. Keep text sharp." },
  { name: "Split PDF", slug: "split-pdf", desc: "Extract page ranges or split every page into separate PDFs." },
  { name: "Protect PDF", slug: "protect-pdf", desc: "Password-encrypt PDFs with strong RC4 128-bit encryption." },
  { name: "Compress Image", slug: "compress-image", desc: "Shrink JPG, PNG, WebP images with quality control slider." },
  { name: "Resize Image", slug: "resize-image", desc: "Change image dimensions by pixels with aspect-ratio lock." },
  { name: "Convert Image", slug: "convert-image", desc: "Convert between PNG, JPEG, and WebP formats instantly." },
  { name: "Crop Image", slug: "crop-image", desc: "Trim image boundaries with pixel-precise offsets and preview." },
  { name: "Rotate PDF", slug: "rotate-pdf", desc: "Rotate PDF pages 90°, 180°, or 270° to fix orientation." },
  { name: "Remove Pages", slug: "remove-pages", desc: "Delete specific pages from PDF documents." },
  { name: "Add Watermark", slug: "add-watermark", desc: "Stamp custom text overlays with configurable size, color, opacity." },
  { name: "Add Page Numbers", slug: "add-page-numbers", desc: "Insert automatic 'Page X of N' numbers in header or footer." },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 pb-2 sm:pt-6 sm:pb-3 flex flex-col space-y-4 sm:space-y-6">
      {/* Structured Data — SoftwareApplication */}
      <JsonLd type="SoftwareApplication" data={{
        name: "PDFDock",
        url: "https://pdfdock.tech",
        description: "Free online PDF and image tools. Merge, split, compress, rotate, protect, watermark, resize, crop, and convert files — 100% private, no upload required. The best free alternative to iLovePDF and SmallPDF."
      }} />

      {/* Structured Data — WebSite with SearchAction for sitelinks */}
      <JsonLd type="WebSite" data={{
        name: "PDFDock",
        url: "https://pdfdock.tech",
        description: "Free private PDF and image tools running 100% in your browser. The most private alternative to iLovePDF, SmallPDF, and Adobe Acrobat online.",
      }} />

      {/* Structured Data — Organization for knowledge panel */}
      <JsonLd type="Organization" data={{
        name: "PDFDock",
        url: "https://pdfdock.tech",
        logo: "https://pdfdock.tech/apple-touch-icon.png",
        description: "PDFDock provides free, private, browser-based PDF and image processing tools that work on any device worldwide. The most private alternative to iLovePDF, SmallPDF, and Adobe Acrobat.",
        sameAs: [],  // Add social profile URLs when available: Twitter, GitHub, LinkedIn
      }} />

      {/* Structured Data — Breadcrumb */}
      <JsonLd type="Breadcrumb" data={{
        items: [{ name: "Home", url: "https://pdfdock.tech" }]
      }} />

      {/* Structured Data — ItemList for sitelinks */}
      <JsonLd type="ItemList" data={{
        items: ALL_TOOLS_SEO.map((tool, index) => ({
          name: tool.name,
          url: `https://pdfdock.tech/tools/${tool.slug}/`,
          description: tool.desc,
          position: index + 1,
        }))
      }} />

      {/* Hero Section — Globally optimized H1 */}
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-display text-lg sm:text-xl md:text-2xl font-black tracking-tight text-ink leading-tight">
          Free Online PDF & Image Tools — 100% Private, No Upload
        </h1>
        <p className="font-sans text-[11px] sm:text-xs text-ink/75 max-w-lg mx-auto leading-relaxed">
          Merge, split, compress, protect, watermark, resize, crop, and convert your files entirely in your browser. No uploads. No signups. Works on any device, anywhere in the world. The best free alternative to iLovePDF, SmallPDF, and Adobe Acrobat.
        </p>
      </header>

      {/* Category Tabs and Tool Grid */}
      <HomeClient />

      <AdBanner />

      {/* Why PDFDock? — Trust signals section for SEO and conversion */}
      <section className="border-t border-hairline pt-6 sm:pt-8">
        <h2 className="font-display text-base sm:text-lg font-bold text-ink text-center mb-5">
          Why millions choose PDFDock worldwide
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex flex-col items-center text-center p-4 rounded-xl border border-hairline bg-white space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/5 text-brand">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <h3 className="font-display text-xs sm:text-sm font-bold text-ink">100% Private</h3>
            <p className="font-sans text-[10px] sm:text-[11px] text-ink/60 leading-relaxed">
              Your files never leave your device. Zero server uploads. GDPR, CCPA, and HIPAA friendly.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-xl border border-hairline bg-white space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/5 text-brand">
              <Globe className="h-4.5 w-4.5" />
            </div>
            <h3 className="font-display text-xs sm:text-sm font-bold text-ink">Works Worldwide</h3>
            <p className="font-sans text-[10px] sm:text-[11px] text-ink/60 leading-relaxed">
              Available in every country. No geo-restrictions, no VPN needed. Fast on any connection speed.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-xl border border-hairline bg-white space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/5 text-brand">
              <Smartphone className="h-4.5 w-4.5" />
            </div>
            <h3 className="font-display text-xs sm:text-sm font-bold text-ink">Any Device</h3>
            <p className="font-sans text-[10px] sm:text-[11px] text-ink/60 leading-relaxed">
              Windows, Mac, Linux, Android, iOS. Works on Chrome, Safari, Firefox, and Edge.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-xl border border-hairline bg-white space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/5 text-brand">
              <Wifi className="h-4.5 w-4.5" />
            </div>
            <h3 className="font-display text-xs sm:text-sm font-bold text-ink">Works Offline</h3>
            <p className="font-sans text-[10px] sm:text-[11px] text-ink/60 leading-relaxed">
              After the page loads, all tools run without internet. Perfect for low-bandwidth regions.
            </p>
          </div>
        </div>
      </section>

      {/* Competitor Comparison — SEO section for ranking against iLovePDF, SmallPDF */}
      <section className="border-t border-hairline pt-6 sm:pt-8">
        <h2 className="font-display text-base sm:text-lg font-bold text-ink text-center mb-2">
          The Private Alternative to iLovePDF, SmallPDF & Adobe Acrobat
        </h2>
        <p className="font-sans text-[11px] sm:text-xs text-ink/70 text-center max-w-2xl mx-auto mb-5 leading-relaxed">
          Most online PDF tools upload your files to their servers for processing. PDFDock is different — every tool runs 100% in your browser. Your files never leave your device.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] sm:text-xs border-collapse">
            <thead>
              <tr className="bg-ink text-paper">
                <th className="text-left py-2.5 px-3 sm:px-4 font-display font-bold rounded-tl-lg">Feature</th>
                <th className="text-center py-2.5 px-3 sm:px-4 font-display font-bold text-brand bg-brand/10">PDFDock</th>
                <th className="text-center py-2.5 px-3 sm:px-4 font-display font-bold">iLovePDF</th>
                <th className="text-center py-2.5 px-3 sm:px-4 font-display font-bold rounded-tr-lg">SmallPDF</th>
              </tr>
            </thead>
            <tbody className="font-sans">
              <tr className="border-b border-hairline">
                <td className="py-2 px-3 sm:px-4 font-semibold text-ink">File Upload to Server</td>
                <td className="py-2 px-3 sm:px-4 text-center text-green-600 font-bold">No ✓</td>
                <td className="py-2 px-3 sm:px-4 text-center text-red-500">Yes</td>
                <td className="py-2 px-3 sm:px-4 text-center text-red-500">Yes</td>
              </tr>
              <tr className="border-b border-hairline bg-white/50">
                <td className="py-2 px-3 sm:px-4 font-semibold text-ink">100% Private Processing</td>
                <td className="py-2 px-3 sm:px-4 text-center text-green-600 font-bold">Yes ✓</td>
                <td className="py-2 px-3 sm:px-4 text-center text-red-500">No</td>
                <td className="py-2 px-3 sm:px-4 text-center text-red-500">No</td>
              </tr>
              <tr className="border-b border-hairline">
                <td className="py-2 px-3 sm:px-4 font-semibold text-ink">Free Usage Limits</td>
                <td className="py-2 px-3 sm:px-4 text-center text-green-600 font-bold">Unlimited ✓</td>
                <td className="py-2 px-3 sm:px-4 text-center text-amber-600">Limited</td>
                <td className="py-2 px-3 sm:px-4 text-center text-amber-600">2 tasks/day</td>
              </tr>
              <tr className="border-b border-hairline bg-white/50">
                <td className="py-2 px-3 sm:px-4 font-semibold text-ink">Account Required</td>
                <td className="py-2 px-3 sm:px-4 text-center text-green-600 font-bold">No ✓</td>
                <td className="py-2 px-3 sm:px-4 text-center text-amber-600">For full access</td>
                <td className="py-2 px-3 sm:px-4 text-center text-red-500">Required</td>
              </tr>
              <tr className="border-b border-hairline">
                <td className="py-2 px-3 sm:px-4 font-semibold text-ink">Works Offline</td>
                <td className="py-2 px-3 sm:px-4 text-center text-green-600 font-bold">Yes ✓</td>
                <td className="py-2 px-3 sm:px-4 text-center text-red-500">No</td>
                <td className="py-2 px-3 sm:px-4 text-center text-red-500">No</td>
              </tr>
              <tr className="border-b border-hairline bg-white/50">
                <td className="py-2 px-3 sm:px-4 font-semibold text-ink">GDPR Compliant</td>
                <td className="py-2 px-3 sm:px-4 text-center text-green-600 font-bold">Inherently ✓</td>
                <td className="py-2 px-3 sm:px-4 text-center text-amber-600">Varies</td>
                <td className="py-2 px-3 sm:px-4 text-center text-amber-600">Varies</td>
              </tr>
              <tr>
                <td className="py-2 px-3 sm:px-4 font-semibold text-ink rounded-bl-lg">Price</td>
                <td className="py-2 px-3 sm:px-4 text-center text-green-600 font-bold">Free Forever ✓</td>
                <td className="py-2 px-3 sm:px-4 text-center text-amber-600">$7/mo Premium</td>
                <td className="py-2 px-3 sm:px-4 text-center text-amber-600 rounded-br-lg">$12/mo Pro</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* All Tools SEO Section — Crawlable text for Google */}
      <section className="border-t border-hairline pt-6 sm:pt-8">
        <h2 className="font-display text-base sm:text-lg font-bold text-ink text-center mb-2">
          All Free PDF & Image Tools
        </h2>
        <p className="font-sans text-[11px] sm:text-xs text-ink/70 text-center max-w-2xl mx-auto mb-5 leading-relaxed">
          PDFDock offers a complete suite of PDF and image editing tools — all free, all private, all running in your browser. No upload required for any tool.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {ALL_TOOLS_SEO.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}/`}
              className="flex items-start gap-3 p-3 rounded-lg border border-hairline bg-white hover:border-brand/30 hover:shadow-sm transition-all no-underline group"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-xs sm:text-sm font-bold text-ink group-hover:text-brand transition-colors">
                  {tool.name}
                </h3>
                <p className="font-sans text-[10px] sm:text-[11px] text-ink/60 leading-relaxed mt-0.5">
                  {tool.desc}
                </p>
              </div>
              <span className="font-mono text-[9px] font-bold text-brand shrink-0 mt-0.5">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Bottom Content — Long-tail keyword targeting */}
      <section className="border-t border-hairline pt-6 sm:pt-8 pb-4">
        <h2 className="font-display text-base sm:text-lg font-bold text-ink text-center mb-3">
          Free PDF Tools Online — No Upload, No Signup
        </h2>
        <div className="max-w-3xl mx-auto space-y-3 font-sans text-[11px] sm:text-xs text-ink/70 leading-relaxed">
          <p>
            PDFDock is a free, browser-based suite of PDF and image tools designed for privacy-conscious users worldwide. Whether you need to <Link href="/tools/merge-pdf/" className="text-brand hover:underline">merge PDF files</Link>, <Link href="/tools/compress-pdf/" className="text-brand hover:underline">compress a PDF</Link>, <Link href="/tools/images-to-pdf/" className="text-brand hover:underline">convert images to PDF</Link>, or <Link href="/tools/split-pdf/" className="text-brand hover:underline">split a PDF into pages</Link> — every operation happens 100% in your browser.
          </p>
          <p>
            Unlike iLovePDF, SmallPDF, and Adobe Acrobat online, PDFDock never uploads your files to any server. This makes it the most private PDF tool available — fully compliant with GDPR, CCPA, and HIPAA regulations. Your sensitive documents, financial records, legal contracts, and personal photos remain on your device at all times.
          </p>
          <p>
            PDFDock works on every device and operating system: Windows, macOS, Linux, ChromeOS, Android, and iOS. It runs in all modern browsers including Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge. Once the page loads, tools even work offline — perfect for users in areas with limited internet connectivity.
          </p>
          <p>
            Our image tools let you <Link href="/tools/compress-image/" className="text-brand hover:underline">compress images</Link>, <Link href="/tools/resize-image/" className="text-brand hover:underline">resize photos</Link>, <Link href="/tools/convert-image/" className="text-brand hover:underline">convert between PNG, JPG, and WebP</Link>, and <Link href="/tools/crop-image/" className="text-brand hover:underline">crop with pixel precision</Link>. For PDF editing, you can <Link href="/tools/rotate-pdf/" className="text-brand hover:underline">rotate pages</Link>, <Link href="/tools/remove-pages/" className="text-brand hover:underline">remove unwanted pages</Link>, <Link href="/tools/add-watermark/" className="text-brand hover:underline">add watermarks</Link>, <Link href="/tools/add-page-numbers/" className="text-brand hover:underline">insert page numbers</Link>, and <Link href="/tools/protect-pdf/" className="text-brand hover:underline">password-protect documents</Link>.
          </p>
        </div>
      </section>

      {/* <CameraScanner /> */}
    </div>
  );
}
