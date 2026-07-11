import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import JsonLd from "@/components/JsonLd";
import { Globe, ShieldCheck, Wifi, Smartphone } from "lucide-react";
import CameraScanner from "@/components/CameraScanner";

export const metadata: Metadata = {
  title: "PDFDock — Free Private PDF & Image Tools Online",
  description: "Free online PDF and image tools. Merge, split, compress, rotate, protect, watermark, resize, crop, and convert — 100% private, no upload. Works on any device worldwide.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PDFDock — Free Private PDF & Image Tools Online",
    description: "Merge, split, compress, protect, watermark, resize, crop, and convert files — 100% private, no upload. Works worldwide.",
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

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 pb-2 sm:pt-6 sm:pb-3 flex flex-col space-y-4 sm:space-y-6">
      {/* Structured Data — SoftwareApplication */}
      <JsonLd type="SoftwareApplication" data={{
        name: "PDFDock",
        url: "https://pdfdock.tech",
        description: "Free online PDF and image tools. Merge, split, compress, rotate, protect, watermark, resize, crop, and convert files — 100% private, no upload required."
      }} />

      {/* Structured Data — WebSite with SearchAction for sitelinks */}
      <JsonLd type="WebSite" data={{
        name: "PDFDock",
        url: "https://pdfdock.tech",
        description: "Free private PDF and image tools running 100% in your browser.",
      }} />

      {/* Structured Data — Organization for knowledge panel */}
      <JsonLd type="Organization" data={{
        name: "PDFDock",
        url: "https://pdfdock.tech",
        logo: "https://pdfdock.tech/apple-touch-icon.png",
        description: "PDFDock provides free, private, browser-based PDF and image processing tools that work on any device worldwide.",
        sameAs: [],  // Add social profile URLs when available: Twitter, GitHub, LinkedIn
      }} />

      {/* Structured Data — Breadcrumb */}
      <JsonLd type="Breadcrumb" data={{
        items: [{ name: "Home", url: "https://pdfdock.tech" }]
      }} />

      {/* Hero Section — Globally optimized H1 */}
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-display text-lg sm:text-xl md:text-2xl font-black tracking-tight text-ink leading-tight">
          Free Online PDF & Image Tools — 100% Private
        </h1>
        <p className="font-sans text-[11px] sm:text-xs text-ink/75 max-w-lg mx-auto leading-relaxed">
          Merge, split, compress, protect, watermark, resize, crop, and convert your files entirely in your browser. No uploads. No signups. Works on any device, anywhere in the world.
        </p>
      </header>

      {/* Category Tabs and Tool Grid */}
      <HomeClient />

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
      <CameraScanner />
    </div>
  );
}
