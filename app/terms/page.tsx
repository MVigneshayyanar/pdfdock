import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | PDFDock",
  description: "Read the Terms of Service for PDFDock. Understand the conditions of using our free, local browser-based PDF and image tools.",
  alternates: {
    canonical: "/terms/",
  },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16 md:py-20 flex-1 flex flex-col space-y-8 text-ink">
      {/* Header */}
      <header className="space-y-4 border-b border-hairline pb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-green-600">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          100% Client-Side Tools
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-tight">
          Terms of Service
        </h1>
        <p className="font-mono text-xs text-ink/50">
          Last updated: July 12, 2026
        </p>
      </header>

      {/* Body Copy */}
      <div className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed space-y-6">
        <p>
          Welcome to PDFDock! These Terms of Service ("Terms") govern your use of our website located at <Link href="/" className="text-brand font-semibold hover:underline">https://www.pdfdock.tech</Link> (the "Service"), operated by PDFDock.
        </p>
        <p>
          By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
        </p>

        <hr className="border-t border-hairline" />

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">1. Description of Service</h2>
          <p>
            PDFDock provides free, browser-based, client-side software utilities to merge, split, compress, protect, watermark, resize, crop, and convert PDF and image files. 
          </p>
          <p>
            All file processing is executed 100% locally on your computer or mobile device using client-side JavaScript, WebAssembly, and modern browser APIs. We do not upload your files to our servers, and we do not store, copy, or distribute your document data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">2. License to Use</h2>
          <p>
            We grant you a personal, non-exclusive, non-transferable, revocable license to access and use PDFDock solely for your personal or internal business operations, in accordance with these Terms.
          </p>
          <p>
            You agree not to exploit the website or the Service for any unauthorized commercial purposes, or attempt to disrupt the performance of our site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">3. Disclaimer of Warranties</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. PDFDock makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p>
            Because all file processing runs locally within your browser, performance is determined by your browser's capabilities and your device's hardware memory/CPU constraints. We do not guarantee that the Service will process large files without crashing your browser if your device runs out of resources.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">4. Limitation of Liability</h2>
          <p>
            In no event shall PDFDock or its developers be liable for any damages (including, without limitation, damages for loss of data or profit, browser crashes, device slowdowns, file corruption, or due to business interruption) arising out of the use or inability to use the tools on PDFDock, even if PDFDock or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
          <p>
            Since <strong>we never upload, transmit, or store your documents or images</strong> on our servers, we have no access to your data and hold zero responsibility for any data retention, loss, or security leaks occurring on your personal hardware or network.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">5. Third-Party Content & Advertisements</h2>
          <p>
            We display advertisements served by Google AdSense to help fund and operate our free Service. These third-party ad providers may use cookies or tracking technologies to serve ads based on your visit history. 
          </p>
          <p>
            PDFDock does not monitor, endorse, or assume liability for third-party advertisements or external websites linked to by these ads. Your interactions with any third-party advertisers are subject to their respective terms and privacy policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">6. Modifications to Terms</h2>
          <p>
            PDFDock may revise these Terms of Service for its website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms of Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">7. Governing Law</h2>
          <p>
            Any claim relating to PDFDock's website shall be governed by the laws of our operating jurisdiction, without regard to its conflict of law provisions.
          </p>
        </section>

        <hr className="border-t border-hairline" />

        {/* Contact info box */}
        <section className="rounded-xl border border-hairline bg-white/50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display text-sm font-bold text-ink">Questions about our Terms?</h3>
            <p className="text-[11px] sm:text-xs text-ink/60">Submit a query or connect directly using the Vigneshayyanar contact form.</p>
          </div>
          <a
            href="https://vigneshayyanar.netlify.app/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-xs font-semibold text-paper hover:bg-ink/90 transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <Mail className="h-3.5 w-3.5" />
            Contact Form
          </a>
        </section>
      </div>
    </article>
  );
}
