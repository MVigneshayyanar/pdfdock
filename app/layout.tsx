import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstallPrompt from "@/components/InstallPrompt";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pdfdock.tech"),
  manifest: "/manifest.json",
  title: {
    default: "PDFDock — Free Private PDF & Image Tools Online",
    template: "%s | PDFDock"
  },
  description: "Free online PDF and image tools. Merge, split, compress, rotate, protect, watermark, resize, crop, and convert — 100% private, no upload. Works on any device worldwide.",
  applicationName: "PDFDock",
  creator: "PDFDock",
  category: "Productivity",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as any,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "https://pdfdock.tech",
      "en": "https://pdfdock.tech",
    }
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [
      { url: "/favicon-32x32.png" },
    ],
  },
  openGraph: {
    title: "PDFDock — Free Private PDF & Image Tools Online",
    description: "Merge, split, compress, protect, watermark, resize, crop, and convert files — 100% private, no upload. Works worldwide.",
    url: "https://pdfdock.tech",
    siteName: "PDFDock",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PDFDock — Free Private PDF & Image Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDFDock — Free Private PDF & Image Tools Online",
    description: "Merge, split, compress, protect, watermark, resize, crop, and convert files — 100% private, no upload.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "-NTsq4bU3wse44DgqCfbwIcVtnVP2oAEAUZYzy-cSpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <Script
          id="adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8331123038839031"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F7F6F3] text-[#1B1B1F] font-sans selection:bg-[#2454FF] selection:text-white">
        <Header />
        <main className="flex-1 flex flex-col relative">
          {/* Subtle background grid pattern */}
          <div className="absolute inset-0 paper-texture pointer-events-none z-0" />
          <div className="relative z-10 flex-1 flex flex-col">
            {children}
          </div>
        </main>
        <Footer />
        <InstallPrompt />
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
