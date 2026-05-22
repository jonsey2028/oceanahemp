import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Learn About CBD | OceanaHemp Resources",
  description: "Explore our CBD education hub: what is CBD, dosage guides, benefits, full vs broad spectrum, CBD for pets, and more. Science-backed wellness.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
