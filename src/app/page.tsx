'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Shield, Leaf, Truck, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  mockProducts,
  mockReviews,
  benefitConfig,
} from "@/lib/mock-data";
import { motion } from "framer-motion";

/* ── reusable floating-orb config ── */
const orbs = [
  { size: 180, x: "10%", y: "20%", delay: 0, dur: 18 },
  { size: 120, x: "75%", y: "10%", delay: 2, dur: 22 },
  { size: 80,  x: "60%", y: "70%", delay: 4, dur: 15 },
  { size: 140, x: "25%", y: "60%", delay: 1, dur: 20 },
  { size: 60,  x: "85%", y: "45%", delay: 3, dur: 16 },
  { size: 100, x: "50%", y: "30%", delay: 5, dur: 24 },
];

/* ── deterministic particle config (no Math.random to avoid hydration mismatch) ── */
function seeded(i: number, offset: number, range: number) {
  // simple deterministic hash from index
  const v = Math.sin(i * 9301 + offset * 49297) * 233280;
  return ((v - Math.floor(v)) * range);
}

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: 2 + seeded(i, 1, 4),
  x: seeded(i, 2, 100),
  delay: seeded(i, 3, 10),
  dur: 12 + seeded(i, 4, 18),
}));

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const petProduct = mockProducts.find((p) => p.benefit === "pets")!;
  const recoveryProduct = mockProducts.find((p) => p.benefit === "recovery")!;

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green wave-divider">
        {/* noise overlay */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none z-10" />

        {/* floating orbs (client-only to prevent hydration mismatch) */}
        {mounted && orbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(74,124,89,0.14) 0%, transparent 70%)",
            }}
            animate={{ y: [0, -40, 0], x: [0, 12, 0] }}
            transition={{
              duration: orb.dur,
              repeat: Infinity,
              delay: orb.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* subtle moving dots / particles (client-only to prevent hydration mismatch) */}
        {mounted && particles.map((p) => (
          <motion.div
            key={`p-${p.id}`}
            className="absolute rounded-full bg-white/20 pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              bottom: "-2%",
            }}
            animate={{ y: [0, -600], opacity: [0, 0.6, 0] }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}

        {/* layered wave / hemp-leaf decorative shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute -bottom-4 left-0 w-[200%] h-32 opacity-[0.07]"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120Z"
              fill="white"
            />
          </svg>
          <svg
            className="absolute top-8 right-0 w-96 h-96 opacity-[0.05]"
            viewBox="0 0 200 200"
          >
            <ellipse cx="100" cy="100" rx="90" ry="90" fill="white" />
          </svg>
        </div>

        {/* hero content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT — text */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm">
                <Leaf className="h-4 w-4" />
                <span>Organically Grown · Lab Tested · THC Compliant</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Premium CBD for
                <br />
                <span className="text-ocean-foam">Your Whole Family</span>
              </h1>
              <p className="text-lg text-white/80 max-w-lg leading-relaxed">
                From soothing relief for sore muscles to gentle wellness for
                your furry companions — pure, potent CBD crafted with care
                from ocean to you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop">
                  <Button
                    size="lg"
                    className="bg-white text-ocean-deep hover:bg-ocean-foam font-semibold text-base px-8"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8"
                  >
                    Find Your CBD
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-2 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4" /> Free Shipping $75+
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4" /> 60-Day Guarantee
                </span>
              </div>
            </div>

            {/* RIGHT — product showcase */}
            <div className="hidden lg:flex relative items-center justify-center min-h-[480px]">
              {/* glow behind */}
              <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-3xl" />

              {/* back card (recovery product) — tilted left */}
              <motion.div
                className="absolute left-4 top-8 z-0"
                initial={{ rotate: -8, opacity: 0, y: 30 }}
                animate={{ rotate: -6, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <div className="w-56 h-72 rounded-2xl overflow-hidden bg-white shadow-2xl shadow-ocean-deep/30 border border-white/40 relative group">
                  <Image
                    src={recoveryProduct.images[0].url}
                    alt={recoveryProduct.images[0].alt}
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                  {/* badge */}
                  <div className="absolute top-3 left-3 bg-ocean-deep/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg">
                    Fan Favorite
                  </div>
                </div>
              </motion.div>

              {/* front card (pet product) — tilted right, overlapping */}
              <motion.div
                className="absolute right-8 bottom-4 z-10"
                initial={{ rotate: 6, opacity: 0, y: 30 }}
                animate={{ rotate: 4, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <div className="w-56 h-72 rounded-2xl overflow-hidden bg-white shadow-2xl shadow-hemp-green/30 border border-white/40 relative group">
                  <Image
                    src={petProduct.images[0].url}
                    alt={petProduct.images[0].alt}
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                  {/* badge */}
                  <div className="absolute top-3 left-3 bg-coral text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg">
                    Best Seller
                  </div>
                </div>
              </motion.div>

              {/* floating "4.9 ★" badge */}
              <motion.div
                className="absolute right-2 top-6 z-20 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/50"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-sm">★★★★★</span>
                  <span className="text-sm font-bold text-charcoal">4.9</span>
                </div>
                <p className="text-[10px] text-slate mt-0.5">Avg. Rating</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-[#091e2e] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-white/90 text-sm font-medium">
            <span className="flex items-center gap-2">🔬 Lab Tested</span>
            <span className="flex items-center gap-2">🇺🇸 USA Hemp</span>
            <span className="flex items-center gap-2">✅ GMP Certified</span>
            <span className="flex items-center gap-2">🔄 60-Day Guarantee</span>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT SHOWCASE ─── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">
              Our Products
            </h2>
            <p className="mt-3 text-slate text-lg max-w-2xl mx-auto">
              Two premium formulas, one mission — bring relief and wellness
              to every member of your family.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {mockProducts.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.handle}`}
                className="group"
              >
                <div className="bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative aspect-square bg-ocean-foam overflow-hidden">
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 bg-coral text-white border-0 font-semibold">
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {benefitConfig[product.benefit]?.icon}
                      </span>
                      <span className="text-sm font-medium text-ocean-mid">
                        {benefitConfig[product.benefit]?.label}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-charcoal group-hover:text-ocean-mid transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-slate text-sm leading-relaxed">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-charcoal">
                        {product.rating}
                      </span>
                      <span className="text-sm text-slate">
                        ({product.reviewCount.toLocaleString()} reviews)
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-charcoal">
                        ${product.price}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-slate line-through">
                          ${product.compareAtPrice}
                        </span>
                      )}
                    </div>
                    {product.subscriptionAvailable && (
                      <p className="text-sm text-hemp-green font-medium">
                        Subscribe & save {product.subscriptionDiscount}%
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/shop">
              <Button
                variant="outline"
                size="lg"
                className="border-ocean-mid text-ocean-mid hover:bg-ocean-foam font-semibold"
              >
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS STRIP ─── */}
      <section className="py-16 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8">
            {Object.entries(benefitConfig).map(([, config]) => (
              <div
                key={config.label}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{config.icon}</span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-ocean-deep">
                      {config.label}
                    </h3>
                    <p className="text-sm text-hemp-green font-medium">
                      {config.tagline}
                    </p>
                  </div>
                </div>
                <p className="text-slate leading-relaxed">
                  {config.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-12 bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <p className="font-heading text-3xl sm:text-4xl font-bold">10,000+</p>
              <p className="text-sm text-white/80 mt-1">Customers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <p className="font-heading text-3xl sm:text-4xl font-bold">50,000+</p>
              <p className="text-sm text-white/80 mt-1">Bottles Sold</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <p className="font-heading text-3xl sm:text-4xl font-bold">4.9</p>
              <p className="text-sm text-white/80 mt-1">Average Rating</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <p className="font-heading text-3xl sm:text-4xl font-bold">99%</p>
              <p className="text-sm text-white/80 mt-1">Would Recommend</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AS FEATURED IN ─── */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-slate/60 mb-4">
            As Featured In
          </p>
          <div className="flex items-center justify-center gap-8 sm:gap-12 overflow-x-auto pb-2 scrollbar-hide">
            {[
              "Wellness Weekly",
              "Green Living Today",
              "Coastal Health Journal",
              "Natural Products Insider",
              "Pet Wellness Magazine",
              "Mindful CBD",
            ].map((pub) => (
              <span
                key={pub}
                className="whitespace-nowrap text-sm sm:text-base font-medium text-slate/40 hover:text-ocean-mid transition-colors"
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="py-16 lg:py-24 bg-ocean-foam">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">
              Real People, Real Results
            </h2>
            <p className="mt-3 text-slate text-lg">
              Thousands of happy customers — and their pets — agree.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <h4 className="font-semibold text-charcoal mb-1">
                  {review.title}
                </h4>
                <p className="text-slate text-sm leading-relaxed mb-4">
                  {review.body}
                </p>
                <div className="flex items-center justify-between text-xs text-slate">
                  <span className="font-medium text-charcoal">
                    {review.author}
                  </span>
                  {review.verified && (
                    <span className="text-hemp-green font-medium">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-10 w-10 text-coral mx-auto mb-6" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">
            Ready to Feel the Difference?
          </h2>
          <p className="mt-4 text-slate text-lg leading-relaxed">
            Join thousands of happy customers who&apos;ve discovered the
            OceanaHemp difference. Every order ships free over $75 and comes
            with our 60-day satisfaction guarantee.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-ocean-mid hover:bg-ocean-deep text-white font-semibold text-base px-8"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/quiz">
              <Button
                size="lg"
                variant="outline"
                className="border-ocean-mid text-ocean-mid hover:bg-ocean-foam font-semibold text-base px-8"
              >
                Take the CBD Quiz
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}