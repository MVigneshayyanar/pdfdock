import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | PDFDock",
  description: "Learn about how PDFDock protects your privacy with 100% local, browser-side file processing, and read our disclosures regarding cookies and advertising.",
  alternates: {
    canonical: "/privacy/",
  },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16 md:py-20 flex-1 flex flex-col space-y-8 text-ink">
      {/* Header */}
      <header className="space-y-4 border-b border-hairline pb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-green-600">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          100% Secure & Private
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-tight">
          Privacy Policy
        </h1>
        <p className="font-mono text-xs text-ink/50">
          Last updated: July 12, 2026
        </p>
      </header>

      {/* Body Copy */}
      <div className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed space-y-6">
        <p>
          At PDFDock (accessible from <Link href="/" className="text-brand font-semibold hover:underline">https://pdfdock.tech</Link>), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by PDFDock and how we use it.
        </p>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through the Vigneshayyanar contact form at <a href="https://vigneshayyanar.netlify.app/contact" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold hover:underline">https://vigneshayyanar.netlify.app/contact</a>.
        </p>

        <hr className="border-t border-hairline" />

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">1. Zero File Uploads (100% Local Processing)</h2>
          <p>
            Unlike traditional online file converters that upload your documents to remote cloud servers, <strong>PDFDock operates entirely within your web browser</strong>. 
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Your files, documents, and images are never uploaded, sent over the network, or stored on any server.</li>
            <li>All file manipulation, rendering, compression, and conversion are processed locally on your own device using client-side JavaScript and WebAssembly.</li>
            <li>Because your files never leave your device, your personal data and sensitive documents remain completely private.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">2. Google DoubleClick DART Cookie</h2>
          <p>
            Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <code>https://pdfdock.tech</code> and other sites on the internet. 
          </p>
          <p>
            However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-semibold">https://policies.google.com/technologies/ads</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">3. Advertising Partners Privacy Policies</h2>
          <p>
            You may consult this list to find the Privacy Policy for each of the advertising partners of PDFDock.
          </p>
          <p>
            Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on PDFDock, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p>
            Note that PDFDock has no access to or control over these cookies that are used by third-party advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">4. Third-Party Privacy Policies</h2>
          <p>
            PDFDock's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
          <p>
            You can choose to disable cookies through your individual browser options. To know more detailed info about cookie management with specific web browsers, it can be found at the browsers' respective websites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">5. Log Files</h2>
          <p>
            PDFDock follows a standard procedure of using log files when visitors browse our site. Our hosting platform (Next.js/Vercel) automatically logs standard, non-personally identifiable technical information. This information includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">6. GDPR Data Protection Rights</h2>
          <p>
            We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
          <p>
            Since we process all document files entirely within your web browser and do not store or transmit them, <strong>we do not possess or control any of your document content</strong>. Any technical analytical logs are non-identifiable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-ink">7. Children's Information</h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
          </p>
          <p>
            PDFDock does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
        </section>

        <hr className="border-t border-hairline" />

        {/* Contact info box */}
        <section className="rounded-xl border border-hairline bg-white/50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display text-sm font-bold text-ink">Have privacy concerns or questions?</h3>
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
