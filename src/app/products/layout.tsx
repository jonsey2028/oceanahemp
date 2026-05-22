import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "All CBD Products | OceanaHemp Catalog",
  description: "Browse all OceanaHemp CBD products: massage oil, face spray, and pet tincture. Organically grown, lab tested, USA hemp. Free shipping $75+.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
