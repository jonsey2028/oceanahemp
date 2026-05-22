import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Lab Results & COAs | Third-Party CBD Testing",
  description: "View independent lab test results for all OceanaHemp CBD products. Potency, purity, and safety verified by ISO-certified laboratories. Transparent COAs.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
