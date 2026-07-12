"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ToolsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[#F7F6F3] p-4 text-center text-[#1B1B1F]">
      <div className="space-y-3">
        <h1 className="font-display text-base font-bold">Redirecting you to PDFDock...</h1>
        <p className="font-sans text-xs text-ink/70">
          If you are not automatically redirected,{" "}
          <a href="/" className="text-[#2454FF] hover:underline font-semibold">
            click here to return home
          </a>.
        </p>
      </div>
    </div>
  );
}
