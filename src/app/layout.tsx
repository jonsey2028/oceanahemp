import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/lib/cart-context";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
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
  title: "OceanaHemp: Premium CBD for Pets, Skincare & Wellness",
  description:
    "Shop organically grown, lab-tested CBD tinctures for pets, massage oil, and face spray. Free shipping on $75+. Subscribe \u0026 save 25%. 60-day guarantee.",
  keywords: [
    "CBD",
    "hemp",
    "CBD oil",
    "CBD massage oil",
    "CBD face spray",
    "full spectrum CBD",
    "CBD for relaxation",
    "CBD for skincare",
    "organic CBD",
    "lab tested CBD",
    "OceanaHemp",
  ],
  openGraph: {
    title: "OceanaHemp: Premium CBD for Pets, Skincare & Wellness",
    description:
      "Shop organically grown, lab-tested CBD tinctures for pets, massage oil, and face spray. Free shipping on $75+. Subscribe \u0026 save 25%.",
    url: "https://oceanahemp.com",
    siteName: "OceanaHemp",
    type: "website",
    images: [
      {
        url: "https://oceanahemp.com/products/pet-tincture.jpg",
        width: 1254,
        height: 1254,
        alt: "OceanaHemp Premium CBD Products - Lab Tested, Organically Grown",
      },
    ],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OceanaHemp",
  url: "https://oceanahemp.com",
  logo: "https://oceanahemp.com/products/pet-tincture.jpg",
  description:
    "Premium CBD products crafted from organically grown, USA-sourced hemp. Third-party lab tested, third-party verified.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-858-365-8439",
    contactType: "customer service",
    email: "hello@oceanahemp.com",
    availableLanguage: "English",
  },
  sameAs: [
    "https://instagram.com/oceanahemp",
    "https://twitter.com/oceanahemp",
    "https://facebook.com/oceanahemp",
  ],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "OceanaHemp",
  url: "https://oceanahemp.com",
  telephone: "+1-858-365-8439",
  email: "hello@oceanahemp.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1106 2nd Street #126",
    addressLocality: "Encinitas",
    addressRegion: "CA",
    postalCode: "92024",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "33.0370",
    longitude: "-117.2920",
  },
  priceRange: "$$",
  openingHours: ["Mo-Fr 09:00-17:00"],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-white text-charcoal">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="bottom-right" />
          <ExitIntentPopup />
        </CartProvider>
      </body>
    </html>
  );
}