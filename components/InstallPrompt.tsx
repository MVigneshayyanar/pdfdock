"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Check if it's already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    
    // In iOS, Safari does not fire beforeinstallprompt.
    if (isIosDevice) {
      setIsIos(true);
      // We can show the prompt automatically for iOS, but typically we want to wait a bit
      setTimeout(() => setShowPrompt(true), 3000);
    }

    // Listen for beforeinstallprompt on supported browsers (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setShowPrompt(false);
      }
    }
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white border border-brand/20 shadow-xl shadow-brand/10 rounded-xl p-4 z-[9999] flex items-start gap-4 animate-in slide-in-from-bottom-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Download className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <h3 className="font-display font-bold text-ink">Install PDFDock</h3>
        <p className="font-sans text-[11px] text-ink/70 mt-1 mb-3">
          {isIos 
            ? "To install, tap the Share icon at the bottom of Safari, then tap 'Add to Home Screen'."
            : "Install our app for offline access and a native experience on your device."}
        </p>
        {!isIos && (
          <button
            onClick={handleInstallClick}
            className="w-full bg-brand hover:bg-brand/90 text-white font-bold py-2 rounded-lg text-xs transition-colors"
          >
            Add to Home Screen
          </button>
        )}
      </div>
      <button onClick={handleClose} className="text-ink/40 hover:text-ink/80 transition-colors">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
