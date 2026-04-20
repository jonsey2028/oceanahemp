import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "CBD Gummies", href: "/shop?form=gummies" },
      { label: "CBD Oils", href: "/shop?form=oils" },
      { label: "CBD Topicals", href: "/shop?form=topicals" },
      { label: "CBD Capsules", href: "/shop?form=capsules" },
      { label: "Pet CBD", href: "/shop?form=pet" },
      { label: "Bundles", href: "/bundles" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "What is CBD?", href: "/learn/what-is-cbd" },
      { label: "CBD Dosage Guide", href: "/learn/cbd-dosage" },
      { label: "Benefits of CBD", href: "/learn/benefits-of-cbd" },
      { label: "Full vs Broad vs Isolate", href: "/learn/spectrum-explained" },
      { label: "Blog", href: "/learn" },
      { label: "Product Finder Quiz", href: "/quiz" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Lab Results", href: "/lab-results" },
      { label: "Sustainability", href: "/about#sustainability" },
      { label: "Press", href: "/about#press" },
      { label: "Wholesale", href: "/wholesale" },
      { label: "Affiliate Program", href: "/contact?type=affiliate" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/about/faq" },
      { label: "Shipping & Returns", href: "/about/faq#shipping" },
      { label: "Contact Us", href: "/contact" },
      { label: "Subscribe & Save", href: "/about/faq#subscribe" },
      { label: "Military Discount", href: "/about/faq#military" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const trustBadges = [
  { icon: "🔬", label: "3rd Party Lab Tested" },
  { icon: "🇺🇸", label: "USA-Grown Hemp" },
  { icon: "✅", label: "GMP Certified" },
  { icon: "🔄", label: "60-Day Guarantee" },
];

export function Footer() {
  return (
    <footer className="bg-ocean-deep text-white">
      {/* Trust badges bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 justify-center"
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌊</span>
              <span className="font-heading text-xl font-bold">
                OceanaHemp
              </span>
            </Link>
            <p className="text-sm text-white/70 mb-6 max-w-xs">
              Premium, organically grown CBD products crafted for your wellness
              journey. From ocean to you.
            </p>
            {/* Email signup */}
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Get 15% off + weekly wellness tips
              </p>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-ocean-mid"
                />
                <Button
                  type="submit"
                  className="bg-hemp-green hover:bg-hemp-green/90 text-white shrink-0"
                >
                  Join
                </Button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <Separator className="bg-white/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
            <span>&copy; {new Date().getFullYear()} OceanaHemp. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-white/80 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/80 transition-colors">
              Terms
            </Link>
            <Link
              href="/contact?type=dns"
              className="hover:text-white/80 transition-colors"
            >
              Do Not Sell My Info
            </Link>
          </div>
          <div className="flex items-center gap-1 text-xs text-white/50">
            <span>Lab-tested</span>
            <span className="mx-1">·</span>
            <span>THC-compliant</span>
            <span className="mx-1">·</span>
            <span>Farm Bill compliant</span>
          </div>
        </div>
      </div>

      {/* FDA disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <p className="text-[10px] text-white/30 leading-relaxed">
          * These statements have not been evaluated by the Food and Drug
          Administration. This product is not intended to diagnose, treat, cure,
          or prevent any disease. Products contain less than 0.3% THC and are
          derived from hemp legally grown under the 2018 Farm Bill.
        </p>
      </div>
    </footer>
  );
}