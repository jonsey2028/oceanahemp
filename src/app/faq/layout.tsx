import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FAQ | Common CBD Questions Answered",
  description: "Get answers about OceanaHemp CBD products, shipping, returns, dosing, and lab results. Free shipping $75+. 60-day money-back guarantee.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
