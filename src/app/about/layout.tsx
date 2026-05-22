import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About OceanaHemp | Our Story & Mission",
  description: "Discover the OceanaHemp story: premium CBD products crafted from organic, USA-grown hemp. Third-party lab tested, Farm Bill compliant, wellness-focused.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
