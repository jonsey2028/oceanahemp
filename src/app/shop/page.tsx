import type { Metadata } from "next";
import { Suspense } from "react";
import ShopContent from "./shop-content";

export const metadata: Metadata = {
  title: "Shop All Products | OceanaHemp",
  description:
    "Premium, lab-tested CBD tinctures for pets, massage oil, and face spray. Free shipping on $75+. Subscribe \u0026 save 25%. 60-day guarantee.",
  openGraph: {
    title: "Shop All Products | OceanaHemp",
    description:
      "Premium, lab-tested CBD tinctures for pets, massage oil, and face spray.",
    url: "https://oceanahemp.com/shop",
    siteName: "OceanaHemp",
    type: "website",
    images: [
      {
        url: "https://oceanahemp.com/products/pet-tincture.jpg",
        width: 1254,
        height: 1254,
        alt: "OceanaHemp Premium CBD Products",
      },
    ],
  },
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center">
          <p className="text-slate">Loading...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
