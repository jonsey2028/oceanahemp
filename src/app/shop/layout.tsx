import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shop CBD Products | OceanaHemp Store",
  description: "Browse premium CBD massage oil, face spray, and pet tincture. Organically grown, lab tested, USA hemp. Free shipping on $75+. Subscribe & save 25%.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
