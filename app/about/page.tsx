import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ShieldAlert, Cpu, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About & Contact | PDFDock",
  description: "Learn about PDFDock, our client-side file processing mission, and how to get in touch with us for support and inquiries.",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16 md:py-20 flex-1 flex flex-col space-y-8 text-ink">
      {/* Header */}
      <header className="space-y-4 border-b border-hairline pb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-brand">
          <Sparkles className="h-4 w-4 text-brand" />
          The Privacy-First Tool
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-tight">
          About PDFDock
        </h1>
        <p className="font-sans text-xs sm:text-sm text-ink/75 max-w-xl leading-relaxed">
          PDFDock is a secure, fast, and completely free alternative to mainstream PDF utilities. We run 100% in your browser—so your data never touches a server.
        </p>
      </header>

      {/* Body Copy */}
      <div className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed space-y-6">
        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">The Problem with Traditional PDF Tools</h2>
          <p>
            When you use most popular web converters to merge PDFs, compress photos, or unlock pages, your files are uploaded to their cloud servers. While many of these platforms promise to delete files within a few hours, uploading personal tax forms, medical records, or company invoices to a third-party server represents a significant security and compliance risk.
          </p>
        </section>

        {/* Feature Highlights Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          <div className="rounded-xl border border-hairline bg-white/50 p-5 space-y-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/5 text-red-600">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <h3 className="font-display text-xs font-bold text-ink uppercase tracking-wider">Zero File Uploads</h3>
            <p className="text-[11px] sm:text-xs text-ink/65">
              All PDF rendering, splitting, merging, and image compressing are handled in your browser memory via WebAssembly. Your files stay exactly where they belong: on your device.
            </p>
          </div>

          <div className="rounded-xl border border-hairline bg-white/50 p-5 space-y-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/5 text-brand">
              <Cpu className="h-4 w-4" />
            </div>
            <h3 className="font-display text-xs font-bold text-ink uppercase tracking-wider">Fast & Offline Capabilities</h3>
            <p className="text-[11px] sm:text-xs text-ink/65">
              Since processing happens client-side, execution isn't dependent on uploading/downloading speeds. You can even use PDFDock offline once the page has loaded in your browser.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">Our Mission</h2>
          <p>
            Our mission is simple: to provide a premium, accessible, and fast suite of document and image editing utilities that respect user privacy by design. We believe that privacy should not be a paid upgrade or require creating an account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink font-semibold">How We Keep the Service Free</h2>
          <p>
            To cover hosting costs and ongoing development, we display non-obtrusive advertisements via Google AdSense. We do not sell user data (which we do not collect in the first place) or hide basic tools behind paywalls.
          </p>
        </section>

        <hr className="border-t border-hairline" />

        {/* Contact Page Component */}
        <section className="space-y-4">
          <h2 className="font-display text-lg font-bold text-ink">Contact Us</h2>
          <p>
            Have feedback, feature requests, bugs to report, or general questions? We would love to hear from you. Get in touch with our team directly.
          </p>

          <div className="rounded-xl border border-hairline bg-white/80 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand">Contact Form</span>
              <h3 className="font-display text-base font-bold text-ink">Vigneshayyanar</h3>
              <p className="text-[11px] sm:text-xs text-ink/65 max-w-md leading-relaxed">
                Submit your query, bug reports, feature requests, or feedback directly via our developer contact form. We generally respond to inquiries within 24-48 business hours.
              </p>
            </div>
            <a
              href="https://vigneshayyanar.netlify.app/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-xs font-semibold text-white hover:bg-brand/90 transition-all shadow-xs shrink-0 cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              Contact Form
            </a>
          </div>
        </section>

        {/* Back to tools link */}
        <div className="pt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-brand font-semibold hover:underline"
          >
            Go back to all tools
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
