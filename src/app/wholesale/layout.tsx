import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Wholesale CBD Program | Become an OceanaHemp Partner",
  description: "Partner with OceanaHemp for wholesale CBD products. Up to 50% off retail pricing, no minimum orders, free shipping over $250. GMP certified & lab tested.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
