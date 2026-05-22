"use client";

import { useEffect } from "react";

export default function BenefitsRedirect() {
  useEffect(() => {
    window.location.replace("/learn/benefits-of-cbd");
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ocean-foam">
      <p className="text-slate text-lg text-center">
        Redirecting to{" "}
        <a href="/learn/benefits-of-cbd" className="text-ocean-mid hover:underline"
          >Benefits of CBD</a
        >...
      </p>
    </div>
  );
}
