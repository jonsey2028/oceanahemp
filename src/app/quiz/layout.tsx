import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "CBD Product Quiz | Find Your Perfect CBD Match",
  description: "Take the OceanaHemp CBD product finder quiz. Answer a few questions to discover the best CBD product for your wellness goals.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
