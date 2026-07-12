export interface ToolSeo {
  title: string;        // ≤60 chars, primary keyword front-loaded
  description: string;  // ≤155 chars, includes search intent variants
  h1: string;
  intro: string;
  keywords: string[];   // for alt text, internal use
  relatedSlugs: string[]; // cross-linking mesh
  steps: string[];
  faqs: { q: string; a: string }[];
  comparison: {
    heading: string;       // e.g. "Why Choose PDFDock Over iLovePDF & SmallPDF?"
    intro: string;         // paragraph explaining the comparison
    features: {
      feature: string;
      pdfdock: string;
      others: string;
    }[];
  };
}

export const SEO_REGISTRY: Record<string, ToolSeo> = {
  "images-to-pdf": {
    title: "Images to PDF — Convert JPG, PNG to PDF Free Online",
    description: "Convert JPG, PNG, WebP images to PDF free. No upload, no signup, 100% private. Best iLovePDF & SmallPDF alternative. Works on any device worldwide.",
    h1: "Convert Images to PDF Online",
    intro: "Turn any combination of JPG, PNG, or WebP images into a clean, formatted PDF document. PDFDock processes everything inside your browser — your files never touch a server. Works on Windows, Mac, Linux, Android, and iOS. No account needed, no file size limits, and fully GDPR-compliant. Unlike iLovePDF or SmallPDF, PDFDock never uploads your files — everything stays 100% private on your device.",
    keywords: ["images to pdf", "jpg to pdf", "png to pdf", "photo to pdf", "convert image to pdf", "picture to pdf", "img to pdf", "image to pdf converter", "jpg to pdf converter free", "convert photos to pdf on phone", "ilovepdf alternative", "smallpdf alternative", "free pdf converter no upload", "convert multiple images to pdf"],
    relatedSlugs: ["merge-pdf", "compress-pdf", "pdf-to-images"],
    steps: [
      "Drag and drop your images (JPG, PNG, or WebP) into the upload area, or click to browse files.",
      "Reorder images using drag handles or arrow buttons to set the page sequence.",
      "Rotate individual images by 90° if needed using the rotation button.",
      "Click 'Process Files' to combine images into a single PDF document.",
      "Download your finished PDF — it's ready to share, print, or archive."
    ],
    faqs: [
      {
        q: "Is it safe to convert images to PDF here?",
        a: "Absolutely. PDFDock runs entirely in your browser using JavaScript and WebAssembly. Your images are never uploaded to any server — they stay 100% on your device."
      },
      {
        q: "What image formats can I convert to PDF?",
        a: "We support JPEG, JPG, PNG, and WebP formats. All formats are converted client-side with no quality loss."
      },
      {
        q: "Is there a file size or count limit?",
        a: "No artificial limits. Since processing uses your device's memory, you can convert as many images as your browser can handle."
      },
      {
        q: "Does this work on mobile devices?",
        a: "Yes. PDFDock works on any modern browser — Chrome, Safari, Firefox, Edge — on phones, tablets, and desktops across all operating systems."
      },
      {
        q: "Do I need to install any software?",
        a: "No installation required. PDFDock is a web app that runs directly in your browser. Just visit the page and start converting."
      },
      {
        q: "How is PDFDock different from iLovePDF or SmallPDF?",
        a: "Unlike iLovePDF and SmallPDF which upload your files to their servers, PDFDock processes everything 100% in your browser. Your images never leave your device, making it the most private option available. Plus, it's completely free with no limits or signup required."
      },
      {
        q: "Can I convert images to PDF without uploading them?",
        a: "Yes! PDFDock converts images to PDF entirely in your browser. No files are ever uploaded to any server — this is the key difference from other online PDF tools."
      }
    ],
    comparison: {
      heading: "Why Choose PDFDock Over iLovePDF & SmallPDF for Image to PDF?",
      intro: "When you search for 'images to PDF' or 'JPG to PDF converter', most tools require uploading your personal photos to their servers. PDFDock is the only tool that converts images to PDF 100% in your browser — no upload, no signup, no limits.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — 100% browser-based", others: "Yes — files uploaded to servers" },
        { feature: "Privacy", pdfdock: "Complete — files never leave device", others: "Files stored on third-party servers" },
        { feature: "Free Usage Limit", pdfdock: "Unlimited — no restrictions", others: "Limited free tier, then paid" },
        { feature: "Account Required", pdfdock: "No signup needed", others: "Account required for full features" },
        { feature: "Works Offline", pdfdock: "Yes — after page loads", others: "No — requires active connection" },
        { feature: "GDPR Compliant", pdfdock: "Inherently — no data processed", others: "Depends on server location" }
      ]
    }
  },
  "merge-pdf": {
    title: "Merge PDF — Combine PDF Files Online Free",
    description: "Merge multiple PDF files into one free. No upload, no signup. Private iLovePDF & SmallPDF alternative. Combine PDFs in your browser on any device.",
    h1: "Merge PDF Files Online",
    intro: "Combine two or more PDF documents into a single file in any order. PDFDock copies exact page structures, fonts, and images — zero quality loss. Everything runs locally in your browser. No files are uploaded, no account needed. Fully private, GDPR-compliant, and works on every device and operating system. A truly private alternative to iLovePDF, SmallPDF, and Adobe Acrobat online.",
    keywords: ["merge pdf", "combine pdf", "join pdf", "pdf merger", "merge pdf files", "concatenate pdf", "merge pdf online free", "combine pdf files without uploading", "ilovepdf merge alternative", "smallpdf merge alternative", "free pdf merger no signup", "join pdf files online"],
    relatedSlugs: ["split-pdf", "compress-pdf", "images-to-pdf"],
    steps: [
      "Add two or more PDF files by dragging them in or clicking to browse.",
      "Reorder files using drag handles to set the merge sequence.",
      "Click 'Process Files' to combine all documents into one PDF.",
      "Download your merged PDF — ready to share or print."
    ],
    faqs: [
      {
        q: "Can I merge password-protected PDFs?",
        a: "Encrypted PDFs must have their password removed before merging. Use our Protect PDF tool to manage encryption."
      },
      {
        q: "Will merging change my page layouts?",
        a: "No. PDFDock copies exact page structures including fonts, vectors, and images. Your layouts remain pixel-perfect."
      },
      {
        q: "Are my documents stored on your servers?",
        a: "Never. All processing runs 100% in your browser. We have no backend servers that receive or store files."
      },
      {
        q: "Is there a limit on how many PDFs I can merge?",
        a: "No limit. You can merge as many files as your browser's memory allows. Works with documents of any size."
      },
      {
        q: "Does this work without an internet connection?",
        a: "Once the page loads, yes. The merge engine runs entirely offline in your browser — no active connection needed."
      },
      {
        q: "Is PDFDock better than iLovePDF for merging PDFs?",
        a: "PDFDock is more private than iLovePDF — your PDFs are never uploaded to any server. It's also completely free with no file count limits or account requirements."
      }
    ],
    comparison: {
      heading: "PDFDock vs iLovePDF vs SmallPDF — PDF Merge Comparison",
      intro: "Looking for the best free PDF merger? Here's how PDFDock compares to iLovePDF and SmallPDF for combining PDF files online.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — 100% browser-based", others: "Yes — files uploaded to servers" },
        { feature: "Privacy", pdfdock: "Complete — files never leave device", others: "Files stored temporarily on servers" },
        { feature: "Free File Limit", pdfdock: "Unlimited files", others: "Limited to 1-2 tasks per hour" },
        { feature: "Account Required", pdfdock: "No signup needed", others: "Required for full access" },
        { feature: "Works Offline", pdfdock: "Yes", others: "No" },
        { feature: "Quality Loss", pdfdock: "Zero — exact page copy", others: "Varies by compression" }
      ]
    }
  },
  "pdf-to-images": {
    title: "PDF to Image — Convert PDF to PNG, JPG Free",
    description: "Convert PDF pages to high-quality PNG images instantly. Free, private, no upload. Best alternative to iLovePDF & SmallPDF. Works on any device.",
    h1: "Convert PDF to Images Online",
    intro: "Extract every page from a PDF and save them as high-resolution PNG images inside a ZIP archive. Powered by a local rendering engine — your documents never leave your device. Works on all platforms, browsers, and screen sizes worldwide. Unlike iLovePDF or SmallPDF, your sensitive documents stay completely private.",
    keywords: ["pdf to image", "pdf to png", "pdf to jpg", "convert pdf to image", "extract pdf pages", "pdf to picture", "pdf to image converter free", "pdf to png online", "convert pdf to jpg free", "ilovepdf pdf to image alternative", "export pdf pages as images"],
    relatedSlugs: ["images-to-pdf", "compress-image", "split-pdf"],
    steps: [
      "Select or drag a PDF document into the upload zone.",
      "Click 'Process Files' to begin rendering pages locally.",
      "Each page is converted to a high-quality PNG image.",
      "Download the ZIP archive containing all page images."
    ],
    faqs: [
      {
        q: "What image format are pages exported in?",
        a: "Pages are exported as high-quality PNG images at 1.5× scale for sharp, print-ready results."
      },
      {
        q: "Can I convert specific pages only?",
        a: "Currently all pages are extracted. You can select specific images from the downloaded ZIP archive."
      },
      {
        q: "Does this require an internet connection?",
        a: "Only to load the page initially. Once loaded, the PDF rendering engine runs 100% offline."
      },
      {
        q: "Will this work with scanned PDF documents?",
        a: "Yes. Scanned PDFs contain page images which are rendered and exported just like any other PDF page."
      },
      {
        q: "Is this tool free to use?",
        a: "Completely free with no limits. No account, no watermarks, no hidden charges."
      },
      {
        q: "How does this compare to iLovePDF's PDF to Image tool?",
        a: "PDFDock converts PDFs to images entirely in your browser — no file uploads needed. iLovePDF requires uploading your document to their servers, which may not be suitable for confidential files."
      }
    ],
    comparison: {
      heading: "Why PDFDock Is the Best PDF to Image Converter",
      intro: "Convert PDF pages to high-quality PNG or JPG images without uploading sensitive documents to any server.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — rendered in browser", others: "Yes — uploaded to cloud" },
        { feature: "Output Quality", pdfdock: "1.5× high-resolution PNG", others: "Standard resolution" },
        { feature: "Privacy", pdfdock: "100% private", others: "Files on third-party servers" },
        { feature: "Free Usage", pdfdock: "Unlimited", others: "Limited free tier" },
        { feature: "Works Offline", pdfdock: "Yes", others: "No" },
        { feature: "Signup Required", pdfdock: "No", others: "Often required" }
      ]
    }
  },
  "compress-pdf": {
    title: "Compress PDF — Reduce PDF File Size Free Online",
    description: "Shrink PDF file size online without losing quality. No upload, 100% private. Best free alternative to iLovePDF & SmallPDF compression.",
    h1: "Compress PDF Online",
    intro: "Reduce PDF file sizes by re-encoding embedded images with adjustable quality settings. Perfect for email attachments, web uploads, and archiving. All compression happens locally in your browser — no files are sent to any server. Works across all devices and operating systems. More private than iLovePDF, SmallPDF, or Adobe Acrobat online.",
    keywords: ["compress pdf", "reduce pdf size", "shrink pdf", "pdf compressor", "make pdf smaller", "optimize pdf", "compress pdf online free", "reduce pdf file size without losing quality", "ilovepdf compress alternative", "smallpdf compress alternative", "pdf compressor no upload"],
    relatedSlugs: ["merge-pdf", "split-pdf", "compress-image"],
    steps: [
      "Upload the PDF document you want to compress.",
      "Adjust the quality slider — lower values produce smaller files.",
      "Click 'Process Files' to compress the PDF locally.",
      "Download your optimized, smaller PDF file."
    ],
    faqs: [
      {
        q: "Will compression affect text quality?",
        a: "No. Compression targets embedded images and graphics. Text remains perfectly sharp and fully searchable."
      },
      {
        q: "What compression level should I use?",
        a: "For most documents, 0.5–0.8 provides excellent balance between file size reduction and visual quality."
      },
      {
        q: "Is my PDF uploaded to compress it?",
        a: "No. Everything runs in your browser's memory. Your file never leaves your device."
      },
      {
        q: "Can I compress PDFs on my phone?",
        a: "Yes. PDFDock works on all modern mobile browsers including Chrome, Safari, and Firefox on iOS and Android."
      },
      {
        q: "Is this GDPR compliant?",
        a: "Yes. Since no data leaves your device, PDFDock is inherently compliant with GDPR, CCPA, and other privacy regulations."
      },
      {
        q: "How does PDFDock compare to iLovePDF for compressing PDFs?",
        a: "PDFDock compresses PDFs entirely in your browser with no upload required. iLovePDF uploads your files to their servers. PDFDock also has no usage limits — compress as many PDFs as you want, completely free."
      }
    ],
    comparison: {
      heading: "PDFDock vs iLovePDF vs SmallPDF — PDF Compression",
      intro: "Need to reduce your PDF file size? Here's why PDFDock is the most private and unlimited PDF compressor available.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — in-browser compression", others: "Yes — server-side processing" },
        { feature: "Adjustable Quality", pdfdock: "Full slider control", others: "Preset levels only" },
        { feature: "Privacy", pdfdock: "100% private — no upload", others: "Files processed on servers" },
        { feature: "Free Usage Limit", pdfdock: "Unlimited", others: "1-2 files per hour free" },
        { feature: "Works Offline", pdfdock: "Yes", others: "No" },
        { feature: "Account Required", pdfdock: "No", others: "Required for batch" }
      ]
    }
  },
  "split-pdf": {
    title: "Split PDF — Extract Pages from PDF Free Online",
    description: "Split PDF into separate pages or extract ranges. Free, private, no upload. Best alternative to iLovePDF & SmallPDF splitter. Any device.",
    h1: "Split PDF Online",
    intro: "Extract specific pages or split your entire PDF into individual page files. Define custom ranges like '1-3, 5, 7-10' or extract every page separately. Fully offline, fully private — your document never touches a server. A secure alternative to iLovePDF, SmallPDF, and other online PDF splitters.",
    keywords: ["split pdf", "extract pdf pages", "separate pdf pages", "pdf splitter", "divide pdf", "cut pdf pages", "split pdf online free", "extract pages from pdf", "pdf page extractor", "ilovepdf split alternative", "split pdf without uploading"],
    relatedSlugs: ["merge-pdf", "remove-pages", "compress-pdf"],
    steps: [
      "Drag and drop your PDF file into the workspace.",
      "Enter a page range (e.g., '1-3, 5, 7-10') or leave blank to split all pages.",
      "Click 'Process Files' to extract pages locally.",
      "Download individual PDFs or a ZIP archive with all extracted pages."
    ],
    faqs: [
      {
        q: "How do I format custom page ranges?",
        a: "Use commas and dashes: '1-3, 5, 7-10' extracts pages 1, 2, 3, 5, 7, 8, 9, and 10 into separate groups."
      },
      {
        q: "Can I split scanned PDFs?",
        a: "Yes. Scanned pages are split exactly like standard pages, retaining all image content intact."
      },
      {
        q: "Are my files uploaded to split them?",
        a: "No. All processing is handled client-side using JavaScript. Your files never leave your computer."
      },
      {
        q: "What if I enter an invalid page number?",
        a: "PDFDock validates ranges against the total page count and will notify you if any numbers are out of bounds."
      },
      {
        q: "Does splitting preserve bookmarks and links?",
        a: "Page content including text, images, and annotations are preserved. Document-level bookmarks may be simplified."
      },
      {
        q: "Why use PDFDock instead of iLovePDF to split PDFs?",
        a: "PDFDock splits PDFs entirely in your browser — no file upload needed. It's completely free with no usage limits, and your documents stay 100% private on your device."
      }
    ],
    comparison: {
      heading: "Best Free PDF Splitter — PDFDock vs Others",
      intro: "Split your PDFs privately without uploading sensitive documents to cloud servers.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — client-side only", others: "Yes — server processing" },
        { feature: "Custom Page Ranges", pdfdock: "Full range syntax support", others: "Basic range support" },
        { feature: "Privacy", pdfdock: "100% private", others: "Files on servers" },
        { feature: "Free Usage", pdfdock: "Unlimited", others: "Limited" },
        { feature: "Works Offline", pdfdock: "Yes", others: "No" },
        { feature: "Output Format", pdfdock: "Individual PDFs + ZIP", others: "Varies" }
      ]
    }
  },
  "protect-pdf": {
    title: "Protect PDF — Password Encrypt PDF Free Online",
    description: "Add password protection to PDF files instantly. Strong encryption, 100% offline, no upload. Best private alternative to iLovePDF & SmallPDF.",
    h1: "Protect PDF with Password",
    intro: "Encrypt your PDF documents with a secure password to prevent unauthorized access. PDFDock applies strong encryption entirely inside your browser — your password and file never leave your device. Ideal for confidential business, legal, and personal documents. The most secure alternative to iLovePDF and SmallPDF since your password is never transmitted.",
    keywords: ["protect pdf", "encrypt pdf", "password pdf", "lock pdf", "secure pdf", "pdf password protection", "encrypt pdf online free", "password protect pdf without uploading", "ilovepdf encrypt alternative", "lock pdf free", "add password to pdf"],
    relatedSlugs: ["merge-pdf", "compress-pdf", "add-watermark"],
    steps: [
      "Add the PDF file you want to protect.",
      "Enter a strong password in the input field.",
      "Click 'Process Files' to apply encryption.",
      "Download your password-protected PDF."
    ],
    faqs: [
      {
        q: "What encryption standard is used?",
        a: "PDFDock uses RC4 128-bit encryption, compatible with Adobe Acrobat and all major PDF readers worldwide."
      },
      {
        q: "What if I forget the password?",
        a: "Since we never store your password or files on any server, forgotten passwords cannot be recovered. Store it safely."
      },
      {
        q: "Is this safe for corporate documents?",
        a: "Yes. Your file is encrypted entirely in-browser. No data is ever transmitted, making it fully compliant with corporate security policies."
      },
      {
        q: "Can I remove the password later?",
        a: "You'll need the original password to open the file in a PDF reader that supports removing encryption."
      },
      {
        q: "Does encryption work on all devices?",
        a: "Yes. The encryption engine runs in any modern browser on desktops, tablets, and mobile devices."
      },
      {
        q: "Is PDFDock safer than iLovePDF for encrypting PDFs?",
        a: "Yes. When you encrypt a PDF with iLovePDF or SmallPDF, your unencrypted file and password are sent to their servers. With PDFDock, encryption happens entirely in your browser — your password and file never leave your device."
      }
    ],
    comparison: {
      heading: "Most Secure PDF Encryption — PDFDock vs Others",
      intro: "When encrypting sensitive documents, the tool you use matters. PDFDock is the only PDF protector that never sees your password or file.",
      features: [
        { feature: "Password Sent to Server", pdfdock: "Never — browser-only", others: "Yes — transmitted to encrypt" },
        { feature: "File Upload Required", pdfdock: "No", others: "Yes" },
        { feature: "Encryption Standard", pdfdock: "RC4 128-bit", others: "Varies" },
        { feature: "Privacy", pdfdock: "Maximum — zero transmission", others: "Limited — server-side processing" },
        { feature: "Free Usage", pdfdock: "Unlimited", others: "Limited" },
        { feature: "GDPR Compliant", pdfdock: "Inherently", others: "Depends on provider" }
      ]
    }
  },
  "compress-image": {
    title: "Compress Image — Reduce Image Size Free Online",
    description: "Shrink JPG, PNG, WebP images online. Adjust quality, instant results. No upload, 100% private. Best free image compressor alternative.",
    h1: "Compress Images Online",
    intro: "Reduce image file sizes with customizable quality settings. Compare original and compressed sizes instantly. Perfect for web optimization, email attachments, and social media. All processing runs locally — your images stay private. A faster, more private alternative to TinyPNG, iLovePDF, and SmallPDF image compression.",
    keywords: ["compress image", "reduce image size", "shrink photo", "image compressor", "optimize image", "compress jpg png", "compress image online free", "reduce photo size", "image compressor no upload", "tinypng alternative", "compress jpg without uploading", "reduce image file size"],
    relatedSlugs: ["resize-image", "convert-image", "images-to-pdf"],
    steps: [
      "Select your image file — JPEG, PNG, or WebP.",
      "Adjust the quality slider (10% to 100%).",
      "Click 'Process Files' to compress the image locally.",
      "Preview the result, verify quality, and download."
    ],
    faqs: [
      {
        q: "Will compression change my image format?",
        a: "No. The output retains the same format as the input (JPG stays JPG, PNG stays PNG)."
      },
      {
        q: "How does the compression work?",
        a: "PDFDock uses smart canvas re-encoding algorithms to optimize pixel data and strip unnecessary metadata without visible quality loss."
      },
      {
        q: "Is image compression fully offline?",
        a: "Yes. Once the page loads, all processing happens in your browser's memory with zero network activity."
      },
      {
        q: "Can I compress multiple images at once?",
        a: "Currently, images are processed one at a time for maximum quality control and preview accuracy."
      },
      {
        q: "What's the best quality setting for web use?",
        a: "For web images, 60-80% quality typically reduces file size by 50-70% while maintaining excellent visual clarity."
      },
      {
        q: "How is PDFDock different from TinyPNG?",
        a: "TinyPNG uploads your images to their servers for compression. PDFDock compresses entirely in your browser — no upload needed, unlimited files, and complete privacy."
      }
    ],
    comparison: {
      heading: "PDFDock vs TinyPNG vs iLovePDF — Image Compression",
      intro: "Compress your images without uploading them to third-party servers. PDFDock offers unlimited, private image compression.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — browser-based", others: "Yes — cloud processing" },
        { feature: "Quality Control", pdfdock: "Full slider (10-100%)", others: "Auto or preset only" },
        { feature: "Privacy", pdfdock: "100% private", others: "Images on servers" },
        { feature: "Free Limit", pdfdock: "Unlimited", others: "20 images/batch (TinyPNG)" },
        { feature: "Works Offline", pdfdock: "Yes", others: "No" },
        { feature: "Instant Preview", pdfdock: "Yes", others: "Download to check" }
      ]
    }
  },
  "resize-image": {
    title: "Resize Image — Change Dimensions Free Online",
    description: "Resize photos by pixels or percentage. Lock aspect ratio. Free, private, no upload. Works in browser on any device. Best free image resizer.",
    h1: "Resize Images Online",
    intro: "Scale your photos to exact pixel dimensions with optional aspect-ratio locking. Resize for social media, websites, print, or any custom requirement. Processed entirely in your browser for complete privacy. No signup, no upload, no limits.",
    keywords: ["resize image", "resize photo", "change image size", "image resizer", "scale image", "change photo dimensions", "resize image online free", "resize photo for instagram", "resize image pixels", "image resizer no upload", "bulk resize images free"],
    relatedSlugs: ["compress-image", "crop-image", "convert-image"],
    steps: [
      "Upload your photo, logo, or image file.",
      "Enter target width and height in pixels.",
      "Toggle aspect-ratio lock to prevent stretching.",
      "Click 'Process Files' to resize and download."
    ],
    faqs: [
      {
        q: "Does aspect-ratio locking prevent distortion?",
        a: "Yes. When enabled, changing the width automatically updates the height proportionally and vice versa."
      },
      {
        q: "Can I resize images to larger dimensions?",
        a: "Yes, but upscaling beyond the original resolution may cause pixelation depending on the source image quality."
      },
      {
        q: "Where are my files processed?",
        a: "Entirely in your browser. No image data is ever sent to any server or cloud service."
      },
      {
        q: "What formats are supported for resizing?",
        a: "JPEG, PNG, and WebP images can all be resized. The output maintains the original format."
      },
      {
        q: "Can I resize images for social media?",
        a: "Absolutely. Enter the platform's recommended dimensions (e.g., 1080×1080 for Instagram) and resize instantly."
      }
    ],
    comparison: {
      heading: "Best Free Online Image Resizer — PDFDock",
      intro: "Resize your images with pixel-perfect precision without uploading them to any server.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — browser-based", others: "Yes" },
        { feature: "Aspect Ratio Lock", pdfdock: "Yes — toggle on/off", others: "Varies" },
        { feature: "Privacy", pdfdock: "100% private", others: "Images on servers" },
        { feature: "Free Usage", pdfdock: "Unlimited", others: "Limited" },
        { feature: "Custom Dimensions", pdfdock: "Exact pixel control", others: "Preset sizes often" },
        { feature: "Works Offline", pdfdock: "Yes", others: "No" }
      ]
    }
  },
  "convert-image": {
    title: "Convert Image Format — PNG, JPG, WebP Free Online",
    description: "Convert images between PNG, JPEG, WebP instantly. Free, offline, private, no upload. Best free image format converter for any device.",
    h1: "Convert Image Format Online",
    intro: "Transcode images between PNG, JPEG, and WebP formats with a single click. Whether you need WebP for web performance, JPEG for compatibility, or PNG for transparency — PDFDock handles it instantly inside your browser. No upload, no signup, completely private.",
    keywords: ["convert image format", "png to jpg", "jpg to png", "image converter", "webp to png", "change image format", "convert png to jpg free", "image format converter online", "webp to jpg converter", "convert image without uploading", "png to jpeg online free"],
    relatedSlugs: ["compress-image", "resize-image", "crop-image"],
    steps: [
      "Select the image you want to convert.",
      "Choose your target format — PNG, JPEG, or WebP.",
      "Click 'Process Files' to convert instantly.",
      "Download the converted image file."
    ],
    faqs: [
      {
        q: "What happens to transparency when converting PNG to JPEG?",
        a: "JPEG doesn't support transparency. Transparent areas will be converted to a white background automatically."
      },
      {
        q: "Is WebP conversion supported in all browsers?",
        a: "Yes. All modern browsers (Chrome, Firefox, Safari, Edge) support WebP encoding and decoding."
      },
      {
        q: "Are my images logged or tracked?",
        a: "No. All conversion happens locally in your browser. PDFDock doesn't collect, log, or track any file data."
      },
      {
        q: "Will format conversion affect image quality?",
        a: "Converting to lossy formats (JPEG, WebP) may slightly reduce quality. PNG-to-PNG preserves exact quality."
      },
      {
        q: "Why would I convert to WebP?",
        a: "WebP offers superior compression — typically 25-35% smaller than JPEG with comparable quality. Ideal for web performance."
      }
    ],
    comparison: {
      heading: "Best Free Image Format Converter — PDFDock",
      intro: "Convert between PNG, JPEG, and WebP formats instantly without uploading your images.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — browser-based", others: "Yes" },
        { feature: "Supported Formats", pdfdock: "PNG, JPEG, WebP", others: "Varies" },
        { feature: "Privacy", pdfdock: "100% private", others: "Images uploaded" },
        { feature: "Free Usage", pdfdock: "Unlimited", others: "Limited" },
        { feature: "Speed", pdfdock: "Instant — no upload wait", others: "Depends on server" },
        { feature: "Works Offline", pdfdock: "Yes", others: "No" }
      ]
    }
  },
  "crop-image": {
    title: "Crop Image — Trim Photo Margins Free Online",
    description: "Crop images with exact pixel precision. Preview before saving. Free, private, no upload. Works in browser on any device worldwide.",
    h1: "Crop Images Online",
    intro: "Trim image boundaries with precise pixel offsets. Set exact crop dimensions, preview the selection, and export the cropped result. Everything runs in your browser — no data leaves your device.",
    keywords: ["crop image", "trim image", "cut image", "crop photo", "image cropper", "trim photo margins", "crop image online free", "crop photo without uploading", "image cropper tool", "free photo cropper online"],
    relatedSlugs: ["resize-image", "compress-image", "convert-image"],
    steps: [
      "Select the image file you want to crop.",
      "Enter crop offsets (X, Y) and target width/height in pixels.",
      "Preview the crop selection on the image.",
      "Click 'Process Files' to crop and download the result."
    ],
    faqs: [
      {
        q: "How do crop offsets work?",
        a: "X is the horizontal distance from the left edge; Y is the vertical distance from the top. The crop starts at the (X, Y) point."
      },
      {
        q: "Does cropping reduce file size?",
        a: "Yes. Cropped images contain fewer pixels, resulting in smaller file sizes."
      },
      {
        q: "Is my cropped image private?",
        a: "Yes. PDFDock processes images entirely in browser memory. No data is transmitted over the network."
      },
      {
        q: "Can I crop to specific aspect ratios?",
        a: "You can manually calculate dimensions for common ratios like 16:9, 4:3, or 1:1 and enter them as width and height."
      },
      {
        q: "What image formats can I crop?",
        a: "JPEG, PNG, and WebP images are all supported for cropping."
      }
    ],
    comparison: {
      heading: "Best Free Online Image Cropper — PDFDock",
      intro: "Crop your images with pixel-perfect precision — no upload, no signup, completely private.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — browser-based", others: "Yes" },
        { feature: "Precision", pdfdock: "Exact pixel offsets", others: "Visual drag only" },
        { feature: "Privacy", pdfdock: "100% private", others: "Images uploaded" },
        { feature: "Free Usage", pdfdock: "Unlimited", others: "Limited" },
        { feature: "Preview", pdfdock: "Live preview", others: "Varies" },
        { feature: "Works Offline", pdfdock: "Yes", others: "No" }
      ]
    }
  },
  "rotate-pdf": {
    title: "Rotate PDF — Turn PDF Pages Free Online",
    description: "Rotate PDF pages 90°, 180°, 270°. Free, private, no upload. Best alternative to iLovePDF rotate. Works in browser on any device.",
    h1: "Rotate PDF Pages Online",
    intro: "Rotate all pages in your PDF document by 90°, 180°, or 270° to fix orientation issues. Perfect for scanned documents, presentations, and forms. Fully offline processing with zero server involvement. A private alternative to iLovePDF and SmallPDF rotation tools.",
    keywords: ["rotate pdf", "turn pdf pages", "pdf rotation", "flip pdf", "change pdf orientation", "rotate pdf online", "rotate pdf pages free", "rotate pdf without uploading", "ilovepdf rotate alternative", "fix pdf orientation"],
    relatedSlugs: ["merge-pdf", "split-pdf", "remove-pages"],
    steps: [
      "Select your PDF document.",
      "Choose a rotation angle — 90°, 180°, or 270°.",
      "Click 'Process Files' to rotate pages locally.",
      "Download the rotated PDF."
    ],
    faqs: [
      {
        q: "Does this rotate all pages at once?",
        a: "Yes. The rotation angle is applied to every page in the document uniformly."
      },
      {
        q: "Can I undo a rotation?",
        a: "Yes — simply upload the rotated file and apply the opposite angle (e.g., 270° to reverse a 90° rotation)."
      },
      {
        q: "Is PDF rotation secure?",
        a: "Completely. Processing runs client-side in JavaScript. Your document never leaves your device."
      },
      {
        q: "Will rotation affect page content?",
        a: "No. Text, images, and annotations are all preserved perfectly — only the viewing orientation changes."
      },
      {
        q: "Does this work on mobile browsers?",
        a: "Yes. PDFDock works on Chrome, Safari, and Firefox across all mobile and desktop platforms."
      }
    ],
    comparison: {
      heading: "Rotate PDF Privately — PDFDock vs iLovePDF",
      intro: "Fix PDF orientation without uploading your documents to third-party servers.",
      features: [
        { feature: "File Upload Required", pdfdock: "No", others: "Yes" },
        { feature: "Rotation Options", pdfdock: "90°, 180°, 270°", others: "90°, 180°, 270°" },
        { feature: "Privacy", pdfdock: "100% private", others: "Server-side" },
        { feature: "Free Usage", pdfdock: "Unlimited", others: "Limited" },
        { feature: "Works Offline", pdfdock: "Yes", others: "No" },
        { feature: "Speed", pdfdock: "Instant — no upload", others: "Depends on file size" }
      ]
    }
  },
  "remove-pages": {
    title: "Remove PDF Pages — Delete Pages Free Online",
    description: "Delete unwanted pages from any PDF. Free, private, no upload. Works in browser on any device worldwide. Best PDF page remover.",
    h1: "Remove Pages from PDF",
    intro: "Discard specific pages from your PDF and download the cleaned document. Simply specify page numbers and PDFDock removes them instantly — all processing runs offline in your browser. No upload, no signup, completely private.",
    keywords: ["remove pdf pages", "delete pdf pages", "remove pages from pdf", "pdf page remover", "extract pdf pages", "delete pages from pdf free", "remove pdf pages without uploading", "pdf page deleter online"],
    relatedSlugs: ["split-pdf", "merge-pdf", "rotate-pdf"],
    steps: [
      "Add your PDF document to the workspace.",
      "Enter the page numbers to remove (e.g., '2, 4, 6').",
      "Click 'Process Files' to remove the specified pages.",
      "Download the cleaned PDF document."
    ],
    faqs: [
      {
        q: "How do I specify which pages to remove?",
        a: "Enter page numbers separated by commas, e.g., '2, 4, 7'. Those pages will be removed from the final document."
      },
      {
        q: "Can I remove all pages from a PDF?",
        a: "No. A PDF must contain at least one page. The tool will alert you if you try to remove every page."
      },
      {
        q: "Is my original file affected?",
        a: "No. PDFDock creates a new file with the specified pages removed. Your original file remains untouched on your device."
      },
      {
        q: "Does this work with large PDFs?",
        a: "Yes. Page removal works efficiently regardless of document size since only page references are modified."
      },
      {
        q: "Can I remove pages from a scanned PDF?",
        a: "Absolutely. Scanned PDF pages are handled the same as text-based pages."
      }
    ],
    comparison: {
      heading: "Delete PDF Pages Privately — PDFDock",
      intro: "Remove unwanted pages from your PDFs without uploading sensitive documents.",
      features: [
        { feature: "File Upload Required", pdfdock: "No", others: "Yes" },
        { feature: "Page Selection", pdfdock: "Comma-separated numbers", others: "Visual selector" },
        { feature: "Privacy", pdfdock: "100% private", others: "Server-side" },
        { feature: "Free Usage", pdfdock: "Unlimited", others: "Limited" },
        { feature: "Works Offline", pdfdock: "Yes", others: "No" },
        { feature: "Original File", pdfdock: "Untouched", others: "Varies" }
      ]
    }
  },
  "add-watermark": {
    title: "Add Watermark to PDF — Stamp Text Free Online",
    description: "Add custom text watermarks to PDF pages. Set size, color, opacity. 100% offline, no upload. Free alternative to iLovePDF watermark.",
    h1: "Add Watermark to PDF",
    intro: "Stamp custom text watermarks onto every page of your PDF. Configure font size, color, opacity, and position (center, corners). Perfect for marking documents as CONFIDENTIAL, DRAFT, or adding your brand. All processing is private and offline.",
    keywords: ["add watermark to pdf", "pdf watermark", "stamp pdf", "text watermark pdf", "mark pdf confidential", "watermark pdf online free", "add watermark without uploading", "pdf stamp tool", "confidential watermark pdf"],
    relatedSlugs: ["add-page-numbers", "protect-pdf", "merge-pdf"],
    steps: [
      "Upload your PDF document.",
      "Type your watermark text (e.g., 'CONFIDENTIAL', 'DRAFT').",
      "Configure font size, opacity, color, and position.",
      "Click 'Process Files' to stamp watermarks on every page.",
      "Download your watermarked PDF."
    ],
    faqs: [
      {
        q: "What fonts are available for watermarks?",
        a: "PDFDock uses Helvetica Bold — a universal, professional font supported by all PDF readers worldwide."
      },
      {
        q: "Can I adjust watermark transparency?",
        a: "Yes. Set opacity from 0.1 (very faint) to 1.0 (fully solid) to control visibility."
      },
      {
        q: "Does this support image watermarks?",
        a: "Currently text-only. Image watermark support is planned for a future release."
      },
      {
        q: "Where can I position the watermark?",
        a: "Center (with 45° tilt), top-left, top-right, bottom-left, or bottom-right corners."
      },
      {
        q: "Are watermarked PDFs compatible with all readers?",
        a: "Yes. The watermark is embedded as standard PDF text — compatible with Adobe Acrobat, Preview, Chrome, and all PDF readers."
      }
    ],
    comparison: {
      heading: "Add Watermarks Privately — PDFDock vs Others",
      intro: "Stamp confidential watermarks on PDFs without uploading sensitive documents.",
      features: [
        { feature: "File Upload Required", pdfdock: "No", others: "Yes" },
        { feature: "Custom Text", pdfdock: "Any text, any color", others: "Limited options" },
        { feature: "Opacity Control", pdfdock: "0.1 to 1.0 slider", others: "Preset levels" },
        { feature: "Privacy", pdfdock: "100% private", others: "Server-side" },
        { feature: "Free Usage", pdfdock: "Unlimited", others: "Limited" },
        { feature: "Position Options", pdfdock: "5 positions + center tilt", others: "Varies" }
      ]
    }
  },
  "add-page-numbers": {
    title: "Add Page Numbers to PDF — Number Pages Free Online",
    description: "Insert automatic page numbers into any PDF. Choose position and alignment. Free, private, no upload. Works in browser on any device.",
    h1: "Add Page Numbers to PDF",
    intro: "Automatically number every page of your PDF with customizable header or footer placement and left/center/right alignment. Ideal for reports, manuscripts, and professional documents. Processed entirely offline.",
    keywords: ["add page numbers pdf", "number pdf pages", "pdf page numbering", "insert page numbers", "pdf pagination", "add page numbers to pdf free", "number pdf pages online", "pdf page numbering tool"],
    relatedSlugs: ["add-watermark", "merge-pdf", "protect-pdf"],
    steps: [
      "Select your PDF document.",
      "Choose alignment — left, center, or right.",
      "Choose position — top (header) or bottom (footer).",
      "Click 'Process Files' to embed page numbers.",
      "Download your numbered PDF."
    ],
    faqs: [
      {
        q: "Where do page numbers appear?",
        a: "In the margins at the top or bottom of every page, depending on your chosen position and alignment settings."
      },
      {
        q: "What numbering format is used?",
        a: "Pages are numbered as 'Page 1 of N', 'Page 2 of N', etc. — clear and professional."
      },
      {
        q: "Is this safe for sensitive documents?",
        a: "Yes. Processing runs 100% in your browser. No documents are ever sent to external servers."
      },
      {
        q: "Can I start numbering from a specific page?",
        a: "Currently, numbering starts from page 1. Custom start numbers are planned for a future update."
      },
      {
        q: "Will numbering affect existing page content?",
        a: "Numbers are placed in the margins to avoid overlapping with existing text and images on your pages."
      }
    ],
    comparison: {
      heading: "Add Page Numbers Privately — PDFDock",
      intro: "Number your PDF pages without uploading documents to any server.",
      features: [
        { feature: "File Upload Required", pdfdock: "No", others: "Yes" },
        { feature: "Position Options", pdfdock: "Header/Footer + L/C/R", others: "Limited" },
        { feature: "Privacy", pdfdock: "100% private", others: "Server-side" },
        { feature: "Free Usage", pdfdock: "Unlimited", others: "Limited" },
        { feature: "Format", pdfdock: "'Page X of N'", others: "Varies" },
        { feature: "Works Offline", pdfdock: "Yes", others: "No" }
      ]
    }
  }
};
