import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms of Service | OceanaHemp",
  description: "Read OceanaHemp's terms of service. By purchasing our products, you agree to our terms. Lab-tested CBD, free shipping, 60-day guarantee.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
