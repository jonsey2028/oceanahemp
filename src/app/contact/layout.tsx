import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact OceanaHemp | Premium CBD Support",
  description: "Reach out to OceanaHemp for CBD product support, wholesale inquiries, or orders. Free shipping on $75+. Full spectrum, lab tested, 60-day guarantee.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
