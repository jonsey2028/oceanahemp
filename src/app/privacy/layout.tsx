import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | OceanaHemp",
  description: "Review OceanaHemp's privacy policy. We protect your personal information and respect your data. Transparent, secure, compliant.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
