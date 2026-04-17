"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-ocean-deep text-white text-sm py-2 px-4 text-center relative">
      <p className="font-body pr-6">
        🚚 Free shipping on orders $75+ |{" "}
        <span className="font-semibold">Subscribe &amp; Save 25%</span> | Code:{" "}
        <span className="font-bold">OCEANA15</span> for 15% off your first order
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}