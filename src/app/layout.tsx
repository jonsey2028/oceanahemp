import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OceanaHemp — Premium CBD for Your Wellness Journey",
  description:
    "Shop organically grown, lab-tested CBD oils, gummies, topicals & more. Free shipping on $75+. Subscribe & save 25%. 60-day guarantee.",
  keywords: [
    "CBD",
    "hemp",
    "CBD oil",
    "CBD gummies",
    "CBD for sleep",
    "CBD for anxiety",
    "CBD for pain",
    "organic CBD",
    "lab tested CBD",
    "OceanaHemp",
  ],
  openGraph: {
    title: "OceanaHemp — Premium CBD for Your Wellness Journey",
    description:
      "Shop organically grown, lab-tested CBD oils, gummies, topicals & more. Free shipping on $75+.",
    url: "https://oceanahemp.com",
    siteName: "OceanaHemp",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-charcoal">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}