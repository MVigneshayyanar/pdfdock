import React from "react";

// --- Data interfaces ---

interface SoftwareApplicationData {
  name: string;
  url: string;
  description: string;
}

interface FAQPageData {
  faqs: { q: string; a: string }[];
}

interface HowToData {
  name: string;
  description: string;
  steps: string[];
}

interface BreadcrumbData {
  items: { name: string; url: string }[];
}

interface WebSiteData {
  name: string;
  url: string;
  description: string;
  searchUrl?: string; // URL template for sitelinks searchbox, e.g. https://pdfdock.tech/?q={search_term_string}
}

interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[]; // social profile URLs
}

interface WebPageData {
  name: string;
  url: string;
  description: string;
  isPartOf: string; // parent WebSite URL
}

interface ItemListData {
  items: { name: string; url: string; description: string; position: number }[];
}

// --- Union type ---

type JsonLdType = "SoftwareApplication" | "FAQPage" | "HowTo" | "Breadcrumb" | "WebSite" | "Organization" | "WebPage" | "ItemList";
type JsonLdData = SoftwareApplicationData | FAQPageData | HowToData | BreadcrumbData | WebSiteData | OrganizationData | WebPageData | ItemListData;

interface JsonLdProps {
  type: JsonLdType;
  data: JsonLdData;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  let schema: any = null;

  if (type === "SoftwareApplication") {
    const d = data as SoftwareApplicationData;
    schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": d.name,
      "url": d.url,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "description": d.description,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1250",
        "bestRating": "5"
      }
    };
  } else if (type === "FAQPage") {
    const d = data as FAQPageData;
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": d.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };
  } else if (type === "HowTo") {
    const d = data as HowToData;
    schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": d.name,
      "description": d.description,
      "totalTime": "PT1M",
      "tool": {
        "@type": "HowToTool",
        "name": "Any modern web browser"
      },
      "step": d.steps.map((stepText, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": `Step ${index + 1}`,
        "text": stepText
      }))
    };
  } else if (type === "Breadcrumb") {
    const d = data as BreadcrumbData;
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": d.items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  } else if (type === "WebSite") {
    const d = data as WebSiteData;
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": d.name,
      "url": d.url,
      "description": d.description,
      "inLanguage": "en",
      ...(d.searchUrl ? {
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": d.searchUrl
          },
          "query-input": "required name=search_term_string"
        }
      } : {})
    };
  } else if (type === "Organization") {
    const d = data as OrganizationData;
    schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": d.name,
      "url": d.url,
      "logo": d.logo,
      "description": d.description,
      ...(d.sameAs && d.sameAs.length > 0 ? { "sameAs": d.sameAs } : {})
    };
  } else if (type === "WebPage") {
    const d = data as WebPageData;
    schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": d.name,
      "url": d.url,
      "description": d.description,
      "isPartOf": {
        "@type": "WebSite",
        "url": d.isPartOf
      },
      "inLanguage": "en"
    };
  } else if (type === "ItemList") {
    const d = data as ItemListData;
    schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": d.items.map((item) => ({
        "@type": "ListItem",
        "position": item.position,
        "name": item.name,
        "url": item.url,
        "description": item.description,
      }))
    };
  }

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
