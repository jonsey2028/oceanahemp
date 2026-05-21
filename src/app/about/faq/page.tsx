"use client";

import { useEffect } from "react";

export default function AboutFaqRedirect() {
  useEffect(() => {
    window.location.replace("/faq");
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 border-4 border-ocean-mid border-t-transparent rounded-full animate-spin" />
        <p className="text-slate text-lg">Redirecting to FAQ...</p>
      </div>
    </div>
  );
}
