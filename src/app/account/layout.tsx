import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Account | OceanaHemp",
  description: "Access your OceanaHemp account to view orders, manage subscriptions, and update preferences. Premium CBD products, lab tested.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
