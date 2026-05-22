import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shopping Cart | OceanaHemp Store",
  description: "Your OceanaHemp shopping cart. Premium CBD massage oil, face spray, and pet tincture. Lab tested, organic hemp, free shipping on $75+.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
