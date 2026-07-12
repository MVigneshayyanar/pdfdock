import { use } from "react";
import type { Metadata } from "next";
import ToolClientPage from "./ToolClientPage";
import { SEO_REGISTRY } from "@/lib/seo/seoMetadata";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = [
    "merge-pdf",
    "split-pdf",
    "compress-pdf",
    "rotate-pdf",
    "remove-pages",
    "images-to-pdf",
    "pdf-to-images",
    "add-watermark",
    "add-page-numbers",
    "protect-pdf",
    "compress-image",
    "resize-image",
    "convert-image",
    "crop-image",
    // Coming soon slugs to prevent 404s
    "pdf-to-word",
    "pdf-to-excel",
    "pdf-to-ppt",
    "ocr-scanner",
  ];
  return slugs.map((slug) => ({
    "tool-slug": slug,
  }));
}

interface PageProps {
  params: Promise<{ "tool-slug": string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams["tool-slug"];
  const seo = SEO_REGISTRY[slug];
  
  if (!seo) return {};

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/tools/${slug}/`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.pdfdock.tech/tools/${slug}/`,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: seo.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/og-image.png"],
    }
  };
}

export default function Page({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams["tool-slug"];
  const seo = SEO_REGISTRY[slug];

  if (!seo) {
    return <ToolClientPage params={params} />;
  }

  const breadcrumbs = {
    items: [
      { name: "Home", url: "https://www.pdfdock.tech" },
      { name: seo.h1, url: `https://www.pdfdock.tech/tools/${slug}/` }
    ]
  };

  const howToData = {
    name: seo.h1,
    description: seo.description,
    steps: seo.steps
  };

  const webPageData = {
    name: seo.h1,
    url: `https://www.pdfdock.tech/tools/${slug}/`,
    description: seo.description,
    isPartOf: "https://www.pdfdock.tech"
  };

  return (
    <>
      <JsonLd type="Breadcrumb" data={breadcrumbs} />
      <JsonLd type="HowTo" data={howToData} />
      <JsonLd type="FAQPage" data={{ faqs: seo.faqs }} />
      <JsonLd type="WebPage" data={webPageData} />
      <ToolClientPage params={params} />
    </>
  );
}
