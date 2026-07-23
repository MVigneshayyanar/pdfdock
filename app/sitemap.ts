import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.pdfdock.tech";

  // High-traffic tools get higher priority for search engine crawl budget
  const highPriority = [
    "merge-pdf",
    "compress-pdf",
    "images-to-pdf",
    "pdf-to-images",
    "split-pdf",
    "compress-image",
  ];

  const allSlugs = [
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
  ];

  const tools = allSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: highPriority.includes(slug) ? 0.9 : 0.7,
    alternates: {
      languages: {
        "x-default": `${baseUrl}/tools/${slug}/`,
        "en": `${baseUrl}/tools/${slug}/`,
      }
    }
  }));

  const informationalSlugs = ["privacy", "terms", "about", "how-it-works"];
  const informationalPages = informationalSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: slug === "how-it-works" ? 0.8 : 0.4,
    alternates: {
      languages: {
        "x-default": `${baseUrl}/${slug}/`,
        "en": `${baseUrl}/${slug}/`,
      }
    }
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
      alternates: {
        languages: {
          "x-default": baseUrl,
          "en": baseUrl,
        }
      }
    },
    ...tools,
    ...informationalPages,
  ];
}
