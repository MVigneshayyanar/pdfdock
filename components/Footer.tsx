import Link from "next/link";
import { Shield, Sparkles } from "lucide-react";

const PDF_TOOLS = [
  { slug: "merge-pdf", name: "Merge PDF" },
  { slug: "split-pdf", name: "Split PDF" },
  { slug: "compress-pdf", name: "Compress PDF" },
  { slug: "rotate-pdf", name: "Rotate PDF" },
  { slug: "remove-pages", name: "Remove Pages" },
  { slug: "images-to-pdf", name: "Images to PDF" },
  { slug: "pdf-to-images", name: "PDF to Images" },
  { slug: "add-watermark", name: "Add Watermark" },
  { slug: "add-page-numbers", name: "Page Numbers" },
  { slug: "protect-pdf", name: "Protect PDF" },
];

const IMAGE_TOOLS = [
  { slug: "compress-image", name: "Compress Image" },
  { slug: "resize-image", name: "Resize Image" },
  { slug: "convert-image", name: "Convert Format" },
  { slug: "crop-image", name: "Crop Image" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-hairline bg-[#F1EFEA] py-8 text-ink/75">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Tool Directory — Internal Link Mesh for SEO Crawl Depth */}
        <nav className="grid grid-cols-2 sm:grid-cols-4 gap-6" aria-label="Tool Directory">
          {/* PDF Tools Column 1 */}
          <div>
            <h4 className="font-display font-bold text-xs text-ink mb-3 uppercase tracking-wider">
              PDF Tools
            </h4>
            <ul className="space-y-2">
              {PDF_TOOLS.slice(0, 5).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="font-sans text-xs text-ink/60 hover:text-brand transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* PDF Tools Column 2 */}
          <div>
            <h4 className="font-display font-bold text-xs text-ink mb-3 uppercase tracking-wider">
              More PDF Tools
            </h4>
            <ul className="space-y-2">
              {PDF_TOOLS.slice(5).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="font-sans text-xs text-ink/60 hover:text-brand transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Image Tools */}
          <div>
            <h4 className="font-display font-bold text-xs text-ink mb-3 uppercase tracking-wider">
              Image Tools
            </h4>
            <ul className="space-y-2">
              {IMAGE_TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="font-sans text-xs text-ink/60 hover:text-brand transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* About / Trust Column */}
          <div>
            <h4 className="font-display font-bold text-xs text-ink mb-3 uppercase tracking-wider">
              About PDFDock
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-brand shrink-0" />
                <span className="font-sans text-xs text-ink/60">100% Private</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-brand shrink-0" />
                <span className="font-sans text-xs text-ink/60">No File Uploads</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-brand shrink-0" />
                <span className="font-sans text-xs text-ink/60">GDPR Compliant</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-brand shrink-0" />
                <span className="font-sans text-xs text-ink/60">Works Worldwide</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-brand shrink-0" />
                <span className="font-sans text-xs text-ink/60">All Devices</span>
              </li>
            </ul>
          </div>
        </nav>

        {/* Bottom Bar */}
        <div className="border-t border-hairline pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-brand" />
            <p className="max-w-md text-xs text-ink/60 leading-relaxed">
              PDFDock processes your files entirely within your web browser. None of your document data is ever uploaded or sent over the network.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 rounded-md bg-ink/5 px-2.5 py-1 text-xs font-mono">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              <span>Open Web Tool</span>
            </div>
            <div className="font-mono text-xs text-ink/50">
              &copy; {new Date().getFullYear()} PDFDock
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
