"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  {
    label: "Shop",
    href: "/shop",
    submenu: [
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
    label: "Benefits",
    href: "#",
    submenu: [
      { label: "Sleep", href: "/shop/benefit/sleep" },
      { label: "Calm & Stress", href: "/shop/benefit/calm" },
      { label: "Recovery & Pain", href: "/shop/benefit/recovery" },
      { label: "Focus", href: "/shop/benefit/focus" },
      { label: "Daily Wellness", href: "/shop/benefit/daily" },
      { label: "Pet Wellness", href: "/shop/benefit/pets" },
    ],
  },
  { label: "Learn", href: "/learn" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Quiz", href: "/quiz" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <button
                  className="lg:hidden inline-flex items-center justify-center rounded-md h-10 w-10 hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              }
            />
            <SheetContent side="left" className="w-80 p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="p-6 border-b border-border">
                <Link
                  href="/"
                  className="font-heading text-2xl font-bold text-ocean-deep"
                  onClick={() => setMobileOpen(false)}
                >
                  OceanaHemp
                </Link>
              </div>
              <nav className="p-4">
                {navLinks.map((link) => (
                  <div key={link.label} className="mb-2">
                    {link.submenu ? (
                      <>
                        <button
                          onClick={() =>
                            setOpenSubmenu(
                              openSubmenu === link.label ? null : link.label
                            )
                          }
                          className="flex items-center justify-between w-full px-3 py-2.5 text-base font-medium text-charcoal hover:text-ocean-mid rounded-lg hover:bg-ocean-foam transition-colors"
                        >
                          {link.label}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openSubmenu === link.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openSubmenu === link.label && (
                          <div className="ml-4 mt-1 space-y-1">
                            {link.submenu.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-3 py-2 text-sm text-slate hover:text-ocean-mid rounded-md hover:bg-ocean-foam transition-colors"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2.5 text-base font-medium text-charcoal hover:text-ocean-mid rounded-lg hover:bg-ocean-foam transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌊</span>
            <span className="font-heading text-2xl lg:text-3xl font-bold text-ocean-deep tracking-tight">
              OceanaHemp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                {link.submenu ? (
                  <>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-ocean-mid transition-colors"
                    >
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Link>
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white rounded-xl shadow-lg border border-border py-2 min-w-[200px]">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-charcoal hover:text-ocean-mid hover:bg-ocean-foam transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-charcoal hover:text-ocean-mid transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              aria-label="Search products"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/account" aria-label="Account">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart" aria-label="Shopping cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-coral text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}