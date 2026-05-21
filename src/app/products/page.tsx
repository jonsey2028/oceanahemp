"use client";

import { useEffect } from "react";

export default function ProductsRedirect() {
  useEffect(() => {
    window.location.replace("/shop");
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ocean-foam">
      <p className="text-slate text-lg">Redirecting to shop...</p>
    </div>
  );
}
