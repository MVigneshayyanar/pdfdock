export interface ToolSeo {
  title: string;        // ≤60 chars, primary keyword front-loaded
  description: string;  // ≤155 chars, includes search intent variants
  h1: string;
  intro: string;
  keywords: string[];   // for alt text, internal use
  relatedSlugs: string[]; // cross-linking mesh
  steps: string[];
  faqs: { q: string; a: string }[];
}

export const SEO_REGISTRY: Record<string, ToolSeo> = {
  "images-to-pdf": {
    title: "Images to PDF — Convert JPG, PNG to PDF Free",
    description: "Convert JPG, PNG, and WebP images to a single PDF online. No upload, no signup. 100% private browser tool that works on any device worldwide.",
    h1: "Convert Images to PDF Online",
    intro: "Turn any combination of JPG, PNG, or WebP images into a clean, formatted PDF document. PDFDock processes everything inside your browser — your files never touch a server. Works on Windows, Mac, Linux, Android, and iOS. No account needed, no file size limits, and fully GDPR-compliant.",
    keywords: ["images to pdf", "jpg to pdf", "png to pdf", "photo to pdf", "convert image to pdf", "picture to pdf"],
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
      }
    ]
  },
  "merge-pdf": {
    title: "Merge PDF — Combine PDF Files Online Free",
    description: "Merge multiple PDF files into one document online. Reorder pages freely. No upload to servers, no registration. Works on any browser worldwide.",
    h1: "Merge PDF Files Online",
    intro: "Combine two or more PDF documents into a single file in any order. PDFDock copies exact page structures, fonts, and images — zero quality loss. Everything runs locally in your browser. No files are uploaded, no account needed. Fully private, GDPR-compliant, and works on every device and operating system.",
    keywords: ["merge pdf", "combine pdf", "join pdf", "pdf merger", "merge pdf files", "concatenate pdf"],
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
      }
    ]
  },
  "pdf-to-images": {
    title: "PDF to Image — Convert PDF to PNG, JPG Free",
    description: "Convert PDF pages to high-quality PNG images instantly. Free, private, no upload. Extract pages as images in your browser on any device.",
    h1: "Convert PDF to Images Online",
    intro: "Extract every page from a PDF and save them as high-resolution PNG images inside a ZIP archive. Powered by a local rendering engine — your documents never leave your device. Works on all platforms, browsers, and screen sizes worldwide.",
    keywords: ["pdf to image", "pdf to png", "pdf to jpg", "convert pdf to image", "extract pdf pages", "pdf to picture"],
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
      }
    ]
  },
  "compress-pdf": {
    title: "Compress PDF — Reduce PDF File Size Free",
    description: "Shrink PDF file size online without losing quality. Adjust compression level. 100% private, runs in your browser. No upload, no signup required.",
    h1: "Compress PDF Online",
    intro: "Reduce PDF file sizes by re-encoding embedded images with adjustable quality settings. Perfect for email attachments, web uploads, and archiving. All compression happens locally in your browser — no files are sent to any server. Works across all devices and operating systems.",
    keywords: ["compress pdf", "reduce pdf size", "shrink pdf", "pdf compressor", "make pdf smaller", "optimize pdf"],
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
      }
    ]
  },
  "split-pdf": {
    title: "Split PDF — Extract Pages from PDF Free",
    description: "Split PDF into separate pages or extract page ranges. Free online tool. 100% private browser processing. No upload, works on any device.",
    h1: "Split PDF Online",
    intro: "Extract specific pages or split your entire PDF into individual page files. Define custom ranges like '1-3, 5, 7-10' or extract every page separately. Fully offline, fully private — your document never touches a server.",
    keywords: ["split pdf", "extract pdf pages", "separate pdf pages", "pdf splitter", "divide pdf", "cut pdf pages"],
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
      }
    ]
  },
  "protect-pdf": {
    title: "Protect PDF — Password Encrypt PDF Free",
    description: "Add password protection to your PDF files instantly. Strong encryption, 100% offline. No upload, no server. Works in any browser worldwide.",
    h1: "Protect PDF with Password",
    intro: "Encrypt your PDF documents with a secure password to prevent unauthorized access. PDFDock applies strong encryption entirely inside your browser — your password and file never leave your device. Ideal for confidential business, legal, and personal documents.",
    keywords: ["protect pdf", "encrypt pdf", "password pdf", "lock pdf", "secure pdf", "pdf password protection"],
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
      }
    ]
  },
  "compress-image": {
    title: "Compress Image — Reduce Image Size Free",
    description: "Shrink JPG, PNG, and WebP images online. Adjust quality, see instant results. No upload to servers, 100% private browser compression.",
    h1: "Compress Images Online",
    intro: "Reduce image file sizes with customizable quality settings. Compare original and compressed sizes instantly. Perfect for web optimization, email attachments, and social media. All processing runs locally — your images stay private.",
    keywords: ["compress image", "reduce image size", "shrink photo", "image compressor", "optimize image", "compress jpg png"],
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
      }
    ]
  },
  "resize-image": {
    title: "Resize Image — Change Dimensions Free Online",
    description: "Resize photos by pixels or percentage. Lock aspect ratio to prevent distortion. Free, private, browser-based. No upload, no installation.",
    h1: "Resize Images Online",
    intro: "Scale your photos to exact pixel dimensions with optional aspect-ratio locking. Resize for social media, websites, print, or any custom requirement. Processed entirely in your browser for complete privacy.",
    keywords: ["resize image", "resize photo", "change image size", "image resizer", "scale image", "change photo dimensions"],
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
    ]
  },
  "convert-image": {
    title: "Convert Image Format — PNG, JPG, WebP Free",
    description: "Convert images between PNG, JPEG, and WebP formats instantly. Free, offline, private. No upload needed. Works in any browser worldwide.",
    h1: "Convert Image Format Online",
    intro: "Transcode images between PNG, JPEG, and WebP formats with a single click. Whether you need WebP for web performance, JPEG for compatibility, or PNG for transparency — PDFDock handles it instantly inside your browser.",
    keywords: ["convert image format", "png to jpg", "jpg to png", "image converter", "webp to png", "change image format"],
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
    ]
  },
  "crop-image": {
    title: "Crop Image — Trim Photo Margins Free",
    description: "Crop images with exact pixel precision. Preview before saving. Free browser-based tool. No upload, no signup. Works on all devices.",
    h1: "Crop Images Online",
    intro: "Trim image boundaries with precise pixel offsets. Set exact crop dimensions, preview the selection, and export the cropped result. Everything runs in your browser — no data leaves your device.",
    keywords: ["crop image", "trim image", "cut image", "crop photo", "image cropper", "trim photo margins"],
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
    ]
  },
  "rotate-pdf": {
    title: "Rotate PDF — Turn PDF Pages Free Online",
    description: "Rotate PDF pages to portrait or landscape. Choose 90°, 180°, or 270°. Free, private, and processed entirely in your browser.",
    h1: "Rotate PDF Pages Online",
    intro: "Rotate all pages in your PDF document by 90°, 180°, or 270° to fix orientation issues. Perfect for scanned documents, presentations, and forms. Fully offline processing with zero server involvement.",
    keywords: ["rotate pdf", "turn pdf pages", "pdf rotation", "flip pdf", "change pdf orientation", "rotate pdf online"],
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
    ]
  },
  "remove-pages": {
    title: "Remove PDF Pages — Delete Pages Free",
    description: "Delete unwanted pages from any PDF document. Free, private, browser-based. No upload to servers. Works on any device across the world.",
    h1: "Remove Pages from PDF",
    intro: "Discard specific pages from your PDF and download the cleaned document. Simply specify page numbers and PDFDock removes them instantly — all processing runs offline in your browser.",
    keywords: ["remove pdf pages", "delete pdf pages", "remove pages from pdf", "pdf page remover", "extract pdf pages"],
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
    ]
  },
  "add-watermark": {
    title: "Add Watermark to PDF — Stamp Text Free",
    description: "Add custom text watermarks to PDF pages. Set size, color, opacity, position. 100% offline processing in your browser. No upload needed.",
    h1: "Add Watermark to PDF",
    intro: "Stamp custom text watermarks onto every page of your PDF. Configure font size, color, opacity, and position (center, corners). Perfect for marking documents as CONFIDENTIAL, DRAFT, or adding your brand. All processing is private and offline.",
    keywords: ["add watermark to pdf", "pdf watermark", "stamp pdf", "text watermark pdf", "mark pdf confidential"],
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
    ]
  },
  "add-page-numbers": {
    title: "Add Page Numbers to PDF — Number Pages Free",
    description: "Insert automatic page numbers into any PDF. Choose position and alignment. Free, private, and browser-based. No upload required.",
    h1: "Add Page Numbers to PDF",
    intro: "Automatically number every page of your PDF with customizable header or footer placement and left/center/right alignment. Ideal for reports, manuscripts, and professional documents. Processed entirely offline.",
    keywords: ["add page numbers pdf", "number pdf pages", "pdf page numbering", "insert page numbers", "pdf pagination"],
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
    ]
  }
};
