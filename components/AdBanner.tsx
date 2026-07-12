"use client";

import { useEffect, useRef, useState } from "react";

export default function AdBanner() {
  const adRef = useRef<HTMLModElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        if (adRef.current && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
          (window as any).adsbygoogle = (window as any).adsbygoogle || [];
          (window as any).adsbygoogle.push({});
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="w-full overflow-hidden flex justify-center py-4 my-4 bg-white/50 border border-hairline rounded-xl">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minWidth: "250px", minHeight: "90px" }}
        data-ad-client="ca-pub-8331123038839031"
        data-ad-slot="3387163931"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
