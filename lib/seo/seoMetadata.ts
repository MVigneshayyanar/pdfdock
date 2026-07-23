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
    heading: string;
    intro: string;
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
    intro: "Turn any combination of JPG, PNG, or WebP images into a clean, single PDF document in seconds. PDFDock processes every image entirely inside your browser's local memory buffer using WebAssembly and client-side JavaScript. Unlike cloud-based file tools such as iLovePDF or SmallPDF, your photos are never uploaded to remote servers or cloud storage. This makes PDFDock the ideal solution for sensitive items like identity cards, tax forms, receipts, passports, and medical records. PDFDock works smoothly across all desktop and mobile devices—including Windows, macOS, Linux, Android, and iOS—with zero installation, zero file size limits, and full GDPR compliance.",
    keywords: [
      "images to pdf", "jpg to pdf", "png to pdf", "photo to pdf", "convert image to pdf",
      "picture to pdf", "img to pdf", "image to pdf converter", "jpg to pdf converter free",
      "convert photos to pdf on phone", "ilovepdf alternative", "smallpdf alternative",
      "free pdf converter no upload", "convert multiple images to pdf", "webp to pdf", "offline photo to pdf"
    ],
    relatedSlugs: ["merge-pdf", "compress-pdf", "pdf-to-images", "crop-image"],
    steps: [
      "Select your image files (JPG, PNG, WebP) by dragging them into the drop zone or clicking 'Browse Files'.",
      "Arrange page order by dragging thumbnail cards or using page reorder controls.",
      "Optionally rotate individual images by 90-degree increments to correct camera orientation.",
      "Click 'Process Files' to compile the image stream into a standardized PDF file in local memory.",
      "Click 'Download' to save your new PDF document directly to your device."
    ],
    faqs: [
      {
        q: "Is it safe to convert private photos and documents to PDF here?",
        a: "Yes, 100% safe. PDFDock uses local browser execution engines (PDF-lib and HTML5 Canvas API) to render images directly into PDF page layers. Your files never leave your computer or phone, meaning third parties and cloud servers cannot view or store your data."
      },
      {
        q: "What image formats can I convert into a PDF?",
        a: "PDFDock supports all popular web image formats including JPG, JPEG, PNG, and WebP. You can mix and match different file types in a single batch without converting them beforehand."
      },
      {
        q: "Are there any file size or conversion limits?",
        a: "No. Unlike competitors that limit free users to 2 operations per day or maximum 15MB file sizes, PDFDock imposes no artificial limits. Processing capacity depends solely on your device's memory."
      },
      {
        q: "Can I convert images to PDF without an active internet connection?",
        a: "Yes. Once PDFDock loads in your browser, the image-to-PDF engine runs offline. You can disconnect from Wi-Fi or cellular data and continue converting documents seamlessly."
      },
      {
        q: "Does image quality drop when converting to PDF?",
        a: "No. PDFDock preserves original image resolution and color bit-depth inside the output PDF container. Pixel data is embedded cleanly into PDF page streams."
      },
      {
        q: "How does PDFDock compare to iLovePDF or SmallPDF for Image to PDF?",
        a: "iLovePDF and SmallPDF require uploading your photos to remote servers. PDFDock operates entirely client-side—offering instant processing speed, unlimited free usage, and total privacy guaranteed."
      },
      {
        q: "Can I convert photos from my smartphone or tablet?",
        a: "Yes. PDFDock is fully responsive and optimized for mobile Safari, Chrome, and Firefox on iOS and Android devices."
      }
    ],
    comparison: {
      heading: "Why Choose PDFDock Over iLovePDF & SmallPDF for Image to PDF?",
      intro: "When converting sensitive images like passports, driver's licenses, or business receipts to PDF, uploading files to public servers introduces privacy risks. PDFDock provides an instant, client-side alternative with zero server uploads.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — 100% browser-based", others: "Yes — uploaded to remote cloud" },
        { feature: "Data Privacy", pdfdock: "Complete — files stay on device", others: "Files stored temporarily on servers" },
        { feature: "Usage Limits", pdfdock: "Unlimited free conversions", others: "Paywalls or daily caps (e.g. 2 files/day)" },
        { feature: "Account Signup", pdfdock: "No signup required", others: "Required for high resolution / batch" },
        { feature: "Offline Support", pdfdock: "Yes — works without internet", others: "No — requires active connection" },
        { feature: "Regulatory Compliance", pdfdock: "Inherently GDPR, CCPA & HIPAA compliant", others: "Varies depending on server region" }
      ]
    }
  },

  "merge-pdf": {
    title: "Merge PDF — Combine PDF Files Online Free",
    description: "Merge multiple PDF files into one free. No upload, no signup. Private iLovePDF & SmallPDF alternative. Combine PDFs in your browser on any device.",
    h1: "Merge PDF Files Online Privately",
    intro: "Combine two or more PDF files into a single, organized document without sending your data across the internet. PDFDock reads structural PDF node trees locally in JavaScript, stitching pages, vectors, fonts, and embedded images together with zero quality degradation. Whether you are assembling financial audits, legal filings, academic papers, or job application materials, PDFDock completes your merge tasks instantly. Free forever, with no file size restrictions, no accounts, and complete privacy protection.",
    keywords: [
      "merge pdf", "combine pdf", "join pdf", "pdf merger", "merge pdf files",
      "concatenate pdf", "merge pdf online free", "combine pdf files without uploading",
      "ilovepdf merge alternative", "smallpdf merge alternative", "free pdf merger no signup", "join pdf files online"
    ],
    relatedSlugs: ["split-pdf", "compress-pdf", "images-to-pdf", "remove-pages"],
    steps: [
      "Add two or more PDF files by dragging them into the drop zone or choosing files from your device.",
      "Reorder the document list using drag-and-drop handles to set your exact page sequence.",
      "Click 'Process Files' to merge the byte structures in local browser memory.",
      "Download the combined PDF document directly to your computer or mobile device."
    ],
    faqs: [
      {
        q: "Are my merged PDF files saved or tracked on your server?",
        a: "Never. PDFDock has no backend server or storage database for user files. PDF merging happens inside your web browser's RAM."
      },
      {
        q: "Can I merge password-protected PDF files?",
        a: "Protected PDFs must be unlocked before merging. You can enter the password in PDFDock to decrypt and combine encrypted documents."
      },
      {
        q: "Will merging PDFs distort vector graphics or font formatting?",
        a: "No. PDFDock performs structural stream copying, preserving exact vector paths, embedded fonts, layers, and color profiles."
      },
      {
        q: "How many PDF files can I merge at once?",
        a: "There are no arbitrary software limits. You can combine as many files as your device's available memory can process."
      },
      {
        q: "Why is PDFDock faster than cloud PDF mergers?",
        a: "Cloud utilities require uploading gigabytes of data over your connection before processing starts. PDFDock executes locally on your hardware, eliminating upload and download bottlenecks."
      },
      {
        q: "Is PDFDock free to use for commercial projects?",
        a: "Yes. PDFDock is 100% free for personal, commercial, academic, and enterprise usage without subscription fees."
      }
    ],
    comparison: {
      heading: "PDFDock vs iLovePDF vs SmallPDF — PDF Merge Comparison",
      intro: "Compare how PDFDock handles document combining versus traditional cloud PDF tools.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — local memory execution", others: "Yes — server uploads" },
        { feature: "Processing Speed", pdfdock: "Instant — zero transfer delay", others: "Slow — upload/download bottleneck" },
        { feature: "Daily File Limit", pdfdock: "Unlimited files", others: "2 files per day on free tier" },
        { feature: "Privacy Guarantee", pdfdock: "100% private on client device", others: "Third-party cloud storage" },
        { feature: "Works Offline", pdfdock: "Yes", others: "No" },
        { feature: "Quality Loss", pdfdock: "Zero — exact structure merge", others: "May re-compress assets" }
      ]
    }
  },

  "pdf-to-images": {
    title: "PDF to Image — Convert PDF to PNG, JPG Free",
    description: "Convert PDF pages to high-quality PNG images instantly. Free, private, no upload. Best alternative to iLovePDF & SmallPDF. Works on any device.",
    h1: "Convert PDF to PNG Images Online",
    intro: "Extract every page of your PDF document into high-resolution, uncompressed PNG images directly in your browser. PDFDock uses PDF.js rendering engines to render vector paths, typography, and embedded graphics into sharp 1.5x scale raster frames, packaging the output cleanly into a downloadable ZIP archive. Because rendering takes place inside your browser memory, confidential agreements, slides, and invoices remain protected on your hardware.",
    keywords: [
      "pdf to image", "pdf to png", "pdf to jpg", "convert pdf to image",
      "extract pdf pages", "pdf to picture", "pdf to image converter free", "pdf to png online",
      "convert pdf to jpg free", "ilovepdf pdf to image alternative", "export pdf pages as images"
    ],
    relatedSlugs: ["images-to-pdf", "compress-image", "split-pdf", "resize-image"],
    steps: [
      "Upload or drop your PDF document into the PDF to Image converter.",
      "PDFDock automatically inspects page count and rendering configurations.",
      "Click 'Process Files' to render every page onto browser canvas contexts.",
      "Download a single structured ZIP file containing sharp PNG images of every page."
    ],
    faqs: [
      {
        q: "What resolution and quality are exported images?",
        a: "Images are rendered at 1.5x high-DPI canvas scale as lossless PNG files, ensuring crisp text legibility for presentations and print."
      },
      {
        q: "Does PDFDock upload my PDF file to convert it into images?",
        a: "No. PDF rendering is executed by client-side WebAssembly and JavaScript engines. No bytes are sent over the network."
      },
      {
        q: "What if my PDF document contains multiple pages?",
        a: "PDFDock extracts all pages in numerical order and packages them into a convenient ZIP archive for quick 1-click downloading."
      },
      {
        q: "Can I convert password-protected PDFs to images?",
        a: "Yes. Simply enter your document password when prompted to unlock and extract page frames."
      },
      {
        q: "Does PDF to Image work on iPhone, iPad, and Android?",
        a: "Yes. PDFDock is fully responsive and compatible with mobile Safari, Chrome, and Edge."
      }
    ],
    comparison: {
      heading: "Why PDFDock Is the Best Private PDF to Image Converter",
      intro: "Convert PDF pages to clean PNG images without risking document exposure on third-party cloud servers.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — in-browser PDF.js engine", others: "Yes — cloud server conversion" },
        { feature: "Output Resolution", pdfdock: "High-DPI 1.5x sharp PNG", others: "Standard low-res on free tier" },
        { feature: "Security & Privacy", pdfdock: "100% private — client memory", others: "Transmitted over cloud servers" },
        { feature: "Page Restrictions", pdfdock: "Unlimited pages per PDF", others: "Capped on free accounts" },
        { feature: "Works Offline", pdfdock: "Yes", others: "No" }
      ]
    }
  },

  "compress-pdf": {
    title: "Compress PDF — Reduce PDF File Size Free Online",
    description: "Shrink PDF file size online without losing quality. No upload, 100% private. Best free alternative to iLovePDF & SmallPDF compression.",
    h1: "Compress PDF Files Online Privately",
    intro: "Reduce PDF file sizes dramatically while maintaining clear text readability. PDFDock optimizes PDF documents by downsampling high-density embedded images and stripping redundant metadata objects entirely in client browser memory. Adjust compression sliders to fine-tune image quality and resolution scales according to your requirements. Ideal for meeting email attachment limits, portal upload quotas, and web publication standards.",
    keywords: [
      "compress pdf", "reduce pdf size", "shrink pdf", "pdf compressor", "make pdf smaller",
      "optimize pdf", "compress pdf online free", "reduce pdf file size without losing quality",
      "ilovepdf compress alternative", "smallpdf compress alternative", "pdf compressor no upload"
    ],
    relatedSlugs: ["merge-pdf", "split-pdf", "compress-image", "pdf-to-images"],
    steps: [
      "Drag and drop your PDF file into the PDF compression dropzone.",
      "Use the Quality slider (e.g. 50% - 80%) to balance file size reduction against image sharpness.",
      "Adjust Resolution Scale if you want to downscale large image dimensions inside the PDF.",
      "Click 'Process Files' to execute local compression.",
      "Inspect original vs compressed file sizes and download your optimized PDF."
    ],
    faqs: [
      {
        q: "Will compressing a PDF degrade text and font sharpess?",
        a: "No. PDFDock selectively re-compresses embedded raster images. Vector fonts, text layers, lines, and form fields remain untouched and sharp."
      },
      {
        q: "Are my documents uploaded to external servers during compression?",
        a: "No. Compression algorithms run in JavaScript workers in your local web browser."
      },
      {
        q: "What is the recommended quality setting for email attachments?",
        a: "A quality setting of 50% to 70% with 1.0x resolution scale typically reduces PDF size by 40% to 75% with minimal visible loss."
      },
      {
        q: "Can I compress password-encrypted PDFs?",
        a: "Yes. Enter your password in the decryption field to compress protected files."
      },
      {
        q: "Why use PDFDock instead of Adobe Acrobat Online or SmallPDF?",
        a: "PDFDock gives you granular control over compression quality without imposing daily file limits, subscription fees, or server uploads."
      }
    ],
    comparison: {
      heading: "PDF Compression Benchmark — PDFDock vs iLovePDF vs SmallPDF",
      intro: "Compare privacy, compression options, and usage freedom.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — browser client-side", others: "Yes — cloud server upload" },
        { feature: "Quality Control", pdfdock: "Granular slider & scale control", others: "Fixed presets or paid feature" },
        { feature: "Privacy Safety", pdfdock: "100% private — zero data retention", others: "Files stored on cloud servers" },
        { feature: "Usage Caps", pdfdock: "Unlimited free compressions", others: "Restricted after 1-2 tasks" },
        { feature: "Offline Processing", pdfdock: "Yes", others: "No" }
      ]
    }
  },

  "split-pdf": {
    title: "Split PDF — Extract Pages from PDF Free Online",
    description: "Split PDF into separate pages or extract ranges. Free, private, no upload. Best alternative to iLovePDF & SmallPDF splitter. Any device.",
    h1: "Split PDF Pages Online Privately",
    intro: "Extract specific page ranges or split an entire PDF into individual page files instantly. Specify ranges like '1-3, 5, 8-12' or extract every page separately into a ZIP package. PDFDock processes document page trees entirely inside your browser, guaranteeing zero file exposure to external servers. Ideal for isolating document chapters, extracting invoice pages, and splitting confidential contracts.",
    keywords: [
      "split pdf", "extract pdf pages", "separate pdf pages", "pdf splitter", "divide pdf",
      "cut pdf pages", "split pdf online free", "extract pages from pdf", "pdf page extractor",
      "ilovepdf split alternative", "split pdf without uploading"
    ],
    relatedSlugs: ["merge-pdf", "remove-pages", "compress-pdf", "rotate-pdf"],
    steps: [
      "Drag and drop your PDF document into the PDF splitter tool.",
      "Choose 'Extract all pages (ZIP)' or select 'Custom Ranges'.",
      "If using custom ranges, type intervals (e.g. '1-4, 7, 10-12').",
      "Click 'Process Files' to split the document in browser RAM.",
      "Download your split PDF files or ZIP archive."
    ],
    faqs: [
      {
        q: "How do I format custom page ranges?",
        a: "Separate page numbers with commas and ranges with hyphens (e.g. '1-5, 8, 11-15'). PDFDock will extract matching pages into separate documents."
      },
      {
        q: "Are my extracted pages uploaded anywhere?",
        a: "No. PDF splitting is performed by PDF-lib in client-side memory."
      },
      {
        q: "Can I split scanned PDF files?",
        a: "Yes. Scanned PDF pages are split seamlessly without altering image graphics or layout coordinates."
      },
      {
        q: "Is there a page limit for PDF splitting?",
        a: "No limit. You can split documents containing hundreds of pages effortlessly."
      }
    ],
    comparison: {
      heading: "Why PDFDock Is the Safest Free PDF Splitter",
      intro: "Isolate PDF pages securely without uploading documents to remote cloud storage.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — 100% in-browser", others: "Yes — server uploads" },
        { feature: "Custom Range Syntax", pdfdock: "Full interval range support", others: "Basic or paid option" },
        { feature: "Privacy & Compliance", pdfdock: "Zero data storage — GDPR safe", others: "Stored in cloud cache" },
        { feature: "Output Package", pdfdock: "Single PDF or organized ZIP", others: "Varies by tier" }
      ]
    }
  },

  "protect-pdf": {
    title: "Protect PDF — Password Encrypt PDF Free Online",
    description: "Add password protection to PDF files instantly. Strong encryption, 100% offline, no upload. Best private alternative to iLovePDF & SmallPDF.",
    h1: "Password Protect PDF Documents Online",
    intro: "Secure your PDF documents with standard RC4 128-bit encryption directly in your browser. PDFDock encrypts PDF byte structures locally, preventing unauthorized opening and viewing. Because encryption happens on your machine, your cleartext document and security password are never sent over the internet.",
    keywords: [
      "protect pdf", "encrypt pdf", "password pdf", "lock pdf", "secure pdf",
      "pdf password protection", "encrypt pdf online free", "password protect pdf without uploading",
      "ilovepdf encrypt alternative", "lock pdf free", "add password to pdf"
    ],
    relatedSlugs: ["merge-pdf", "compress-pdf", "add-watermark", "remove-pages"],
    steps: [
      "Drop your PDF document into the PDF protection tool.",
      "Enter your target encryption password in the password field.",
      "Click 'Process Files' to apply password protection locally.",
      "Download your encrypted, password-locked PDF file."
    ],
    faqs: [
      {
        q: "What encryption standard does PDFDock apply?",
        a: "PDFDock applies standard 128-bit PDF password encryption, fully compatible with Adobe Acrobat, Apple Preview, Chrome, and all PDF viewers."
      },
      {
        q: "Does PDFDock record or store my password?",
        a: "No. PDFDock runs 100% client-side with no backend database. Your password exists only in local browser runtime memory while generating the encrypted file."
      },
      {
        q: "What happens if I forget my password?",
        a: "Because PDFDock does not store passwords or user data, lost passwords cannot be retrieved. Keep a secure backup of your password."
      }
    ],
    comparison: {
      heading: "PDF Encryption Security — PDFDock vs Cloud Tools",
      intro: "Compare local client-side encryption against server-based encryption tools.",
      features: [
        { feature: "Password Sent Over Network", pdfdock: "Never — local browser execution", others: "Yes — sent to remote server" },
        { feature: "Cleartext File Upload", pdfdock: "No — file stays local", others: "Yes — uploaded unencrypted" },
        { feature: "Privacy Security", pdfdock: "Maximum client security", others: "Exposed to server logs" }
      ]
    }
  },

  "compress-image": {
    title: "Compress Image — Reduce Image Size Free Online",
    description: "Shrink JPG, PNG, WebP images online. Adjust quality, instant results. No upload, 100% private. Best free image compressor alternative.",
    h1: "Compress Images Online Privately",
    intro: "Optimize image file sizes for web speed, email delivery, and storage optimization. PDFDock re-encodes JPG, PNG, and WebP images via HTML5 Canvas and browser WebWorkers. Adjust compression quality sliders to cut image weight by up to 80% while retaining crisp visual fidelity.",
    keywords: [
      "compress image", "reduce image size", "shrink photo", "image compressor",
      "optimize image", "compress jpg png", "compress image online free", "reduce photo size",
      "image compressor no upload", "tinypng alternative", "compress jpg without uploading"
    ],
    relatedSlugs: ["resize-image", "convert-image", "images-to-pdf", "crop-image"],
    steps: [
      "Select your image file (JPEG, PNG, WebP).",
      "Drag the Quality slider to set desired compression intensity.",
      "Click 'Process Files' to compress canvas buffer data.",
      "Download your optimized image file."
    ],
    faqs: [
      {
        q: "How does PDFDock compress images without server processing?",
        a: "PDFDock leverages browser Canvas APIs and native image encoding specs to re-sample image quantization matrices locally in your web browser."
      },
      {
        q: "What formats can I compress?",
        a: "PDFDock supports JPEG/JPG, PNG, and WebP images."
      }
    ],
    comparison: {
      heading: "PDFDock vs TinyPNG & Cloud Compressors",
      intro: "Compress images locally without daily file limits or cloud uploads.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — browser client", others: "Yes — server uploads" },
        { feature: "Quality Controls", pdfdock: "Full 10-100% slider", others: "Fixed preset" },
        { feature: "Usage Caps", pdfdock: "Unlimited free compressions", others: "Limited per day" }
      ]
    }
  },

  "resize-image": {
    title: "Resize Image — Change Dimensions Free Online",
    description: "Resize photos by pixels or percentage. Lock aspect ratio. Free, private, no upload. Works in browser on any device. Best free image resizer.",
    h1: "Resize Image Dimensions Online",
    intro: "Scale photo dimensions with pixel accuracy and optional aspect-ratio locking. PDFDock resizes images directly on local HTML5 canvas elements, allowing you to prepare photos for social media banners, website assets, and passport requirements safely.",
    keywords: [
      "resize image", "resize photo", "change image size", "image resizer",
      "scale image", "change photo dimensions", "resize image online free", "resize photo for instagram"
    ],
    relatedSlugs: ["compress-image", "crop-image", "convert-image", "images-to-pdf"],
    steps: [
      "Upload your target image file.",
      "Type new Target Width or Target Height values in pixels.",
      "Toggle 'Lock Aspect Ratio' to maintain proportions.",
      "Click 'Process Files' to render the resized canvas image.",
      "Download your scaled image file."
    ],
    faqs: [
      {
        q: "Does aspect ratio locking prevent stretching?",
        a: "Yes. When aspect ratio lock is enabled, updating width calculates proportional height automatically."
      },
      {
        q: "Is my original image overwritten?",
        a: "No. PDFDock creates a brand new resized image file for download while your original file stays safe on your device."
      }
    ],
    comparison: {
      heading: "Best Private Image Resizer — PDFDock",
      intro: "Scale images with precision without sending graphics to remote cloud servers.",
      features: [
        { feature: "File Upload Required", pdfdock: "No — canvas rendering", others: "Yes — cloud server processing" },
        { feature: "Privacy Protection", pdfdock: "100% private on device", others: "Stored in cloud temp folder" }
      ]
    }
  },

  "convert-image": {
    title: "Convert Image Format — PNG, JPG, WebP Free Online",
    description: "Convert images between PNG, JPEG, WebP instantly. Free, offline, private, no upload. Best free image format converter for any device.",
    h1: "Convert Image Formats Online Privately",
    intro: "Transcode graphics between PNG, JPEG, and WebP formats instantly. Convert heavy PNG graphics to web-optimized WebP or universal JPEG formats cleanly within your browser.",
    keywords: [
      "convert image format", "png to jpg", "jpg to png", "image converter",
      "webp to png", "change image format", "convert png to jpg free", "webp to jpg converter"
    ],
    relatedSlugs: ["compress-image", "resize-image", "crop-image", "images-to-pdf"],
    steps: [
      "Select your source image file.",
      "Choose target format: PNG, JPEG, or WebP.",
      "Click 'Process Files' to transcode image pixels.",
      "Download your newly formatted image file."
    ],
    faqs: [
      {
        q: "What happens to PNG transparency when converting to JPEG?",
        a: "Since JPEG does not support alpha transparency channels, transparent backgrounds are automatically filled with clean solid white."
      }
    ],
    comparison: {
      heading: "Image Format Transcoding — PDFDock Advantages",
      intro: "Convert image formats locally with speed and privacy.",
      features: [
        { feature: "Upload Required", pdfdock: "No — browser native transcode", others: "Yes — server conversion" },
        { feature: "Format Options", pdfdock: "PNG, JPEG, WebP", others: "Varies" }
      ]
    }
  },

  "crop-image": {
    title: "Crop Image — Trim Photo Margins Free Online",
    description: "Crop images with exact pixel precision. Preview before saving. Free, private, no upload. Works in browser on any device worldwide.",
    h1: "Crop Images Online with Pixel Precision",
    intro: "Trim photo borders and isolate subjects with exact pixel offsets or circular crop paths. PDFDock renders your crop selections locally on canvas elements.",
    keywords: [
      "crop image", "trim image", "cut image", "crop photo",
      "image cropper", "trim photo margins", "crop image online free"
    ],
    relatedSlugs: ["resize-image", "compress-image", "convert-image"],
    steps: [
      "Upload your photo or graphic.",
      "Set Crop X, Y, Width, and Height dimensions or crop shape.",
      "Inspect the live canvas crop bounds.",
      "Click 'Process Files' and download your cropped image."
    ],
    faqs: [
      {
        q: "Can I perform circular photo crops?",
        a: "Yes! Choose 'Circle / Oval' under Crop Shape to trim profile avatars and logos cleanly with transparent PNG backgrounds."
      }
    ],
    comparison: {
      heading: "Private Image Cropping — PDFDock",
      intro: "Crop photos securely without uploading personal images.",
      features: [
        { feature: "Upload Required", pdfdock: "No", others: "Yes" },
        { feature: "Shape Support", pdfdock: "Rectangle & Circle", others: "Rectangle only" }
      ]
    }
  },

  "rotate-pdf": {
    title: "Rotate PDF — Turn PDF Pages Free Online",
    description: "Rotate PDF pages 90°, 180°, 270°. Free, private, no upload. Best alternative to iLovePDF rotate. Works in browser on any device.",
    h1: "Rotate PDF Pages Online",
    intro: "Rotate skewed or inverted PDF pages by 90, 180, or 270 degrees. PDFDock modifies page orientation flags inside the PDF dictionary structure locally in browser RAM.",
    keywords: [
      "rotate pdf", "turn pdf pages", "pdf rotation", "flip pdf",
      "change pdf orientation", "rotate pdf online", "rotate pdf pages free"
    ],
    relatedSlugs: ["merge-pdf", "split-pdf", "remove-pages"],
    steps: [
      "Select your PDF file.",
      "Choose 'Rotate Right (90°)' or 'Rotate Left (270°)' buttons.",
      "Click 'Process Files' to adjust document metadata.",
      "Download your re-oriented PDF file."
    ],
    faqs: [
      {
        q: "Does rotating PDF pages alter document quality?",
        a: "No. Rotation only updates page transformation matrix tags in the PDF header. Text and image streams remain untouched."
      }
    ],
    comparison: {
      heading: "PDF Rotation — PDFDock vs Cloud Tools",
      intro: "Fix PDF orientation privately on your device.",
      features: [
        { feature: "Upload Required", pdfdock: "No", others: "Yes" },
        { feature: "Quality Change", pdfdock: "Zero (Metadata tweak)", others: "May re-compress" }
      ]
    }
  },

  "remove-pages": {
    title: "Remove PDF Pages — Delete Pages Free Online",
    description: "Delete unwanted pages from any PDF. Free, private, no upload. Works in browser on any device worldwide. Best PDF page remover.",
    h1: "Remove Pages from PDF Online",
    intro: "Delete blank or unnecessary pages from PDF documents easily. PDFDock highlights page indices visually, allowing you to select and strip unwanted pages from the byte stream in local memory.",
    keywords: [
      "remove pdf pages", "delete pdf pages", "remove pages from pdf",
      "pdf page remover", "delete pages from pdf free"
    ],
    relatedSlugs: ["split-pdf", "merge-pdf", "rotate-pdf"],
    steps: [
      "Upload your PDF document.",
      "Use the interactive visual page grid or type comma-separated page numbers to remove.",
      "Click 'Process Files' to strip targeted pages.",
      "Download your updated PDF."
    ],
    faqs: [
      {
        q: "How do I select pages to delete?",
        a: "You can click individual page cards in the Visual Page Selector grid or enter page indices (e.g. '2, 4, 7')."
      }
    ],
    comparison: {
      heading: "Remove PDF Pages Privately",
      intro: "Delete pages without uploading confidential files.",
      features: [
        { feature: "Upload Required", pdfdock: "No", others: "Yes" },
        { feature: "Visual Selector Grid", pdfdock: "Included free", others: "Paid feature" }
      ]
    }
  },

  "add-watermark": {
    title: "Add Watermark to PDF — Stamp Text Free Online",
    description: "Add custom text watermarks to PDF pages. Set size, color, opacity. 100% offline, no upload. Free alternative to iLovePDF watermark.",
    h1: "Add Watermark to PDF Pages Online",
    intro: "Stamp custom text overlays (such as 'CONFIDENTIAL', 'DRAFT', or copyright notices) onto all pages of your PDF document. Customize font size, fill color, placement position, and opacity levels locally.",
    keywords: [
      "add watermark to pdf", "pdf watermark", "stamp pdf", "text watermark pdf",
      "mark pdf confidential", "watermark pdf online free"
    ],
    relatedSlugs: ["add-page-numbers", "protect-pdf", "merge-pdf"],
    steps: [
      "Drop your PDF document into the watermark generator.",
      "Type your watermark text string (e.g. 'CONFIDENTIAL').",
      "Adjust Opacity, Font Size, Fill Color, and Position parameters.",
      "Click 'Process Files' to stamp text layers across pages.",
      "Download your watermarked PDF."
    ],
    faqs: [
      {
        q: "Can I adjust watermark transparency?",
        a: "Yes. Use the Opacity slider (5% to 100%) to create subtle background stamps or prominent security markings."
      }
    ],
    comparison: {
      heading: "PDF Watermarking — PDFDock Features",
      intro: "Add watermarks to documents securely.",
      features: [
        { feature: "Upload Required", pdfdock: "No", others: "Yes" },
        { feature: "Opacity & Position Controls", pdfdock: "Full customization", others: "Preset options" }
      ]
    }
  },

  "add-page-numbers": {
    title: "Add Page Numbers to PDF — Number Pages Free Online",
    description: "Insert automatic page numbers into any PDF. Choose position and alignment. Free, private, no upload. Works in browser on any device.",
    h1: "Add Page Numbers to PDF Online",
    intro: "Number PDF document pages automatically with configurable positions (Header or Footer) and alignment choices (Left, Center, Right). PDFDock calculates page counts and draws clean font strings directly onto page layers.",
    keywords: [
      "add page numbers pdf", "number pdf pages", "pdf page numbering",
      "insert page numbers", "pdf pagination", "add page numbers to pdf free"
    ],
    relatedSlugs: ["add-watermark", "merge-pdf", "protect-pdf"],
    steps: [
      "Select your target PDF document.",
      "Choose Vertical Position (Header or Footer).",
      "Select Alignment Layout (Left, Center, Right) and Numbering Format.",
      "Click 'Process Files' to insert page numbers.",
      "Download your numbered PDF file."
    ],
    faqs: [
      {
        q: "What formatting styles are available for page numbers?",
        a: "PDFDock supports 'Page X of Y', 'X of Y', or simple numeric 'X' numbering styles."
      }
    ],
    comparison: {
      heading: "PDF Page Numbering — PDFDock Advantages",
      intro: "Paginate PDF reports privately on your device.",
      features: [
        { feature: "Upload Required", pdfdock: "No", others: "Yes" },
        { feature: "Position & Layout Options", pdfdock: "Full header/footer control", others: "Limited presets" }
      ]
    }
  }
};
