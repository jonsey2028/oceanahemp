"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "@/components/share-buttons";
import {
  mockProducts,
  benefitConfig,
  getProductsByBenefit,
} from "@/lib/mock-data";

export default function ShopContent() {
  const searchParams = useSearchParams();
  const formFilter = searchParams.get("form") ?? undefined;
  const benefitFilter = searchParams.get("benefit") ?? undefined;

  const [canonicalUrl, setCanonicalUrl] = useState("https://oceanahemp.com/shop");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanonicalUrl(window.location.href.split("?")[0]);
    }
  }, []);

  let products = mockProducts;
  if (benefitFilter) {
    products = getProductsByBenefit(benefitFilter);
  } else if (formFilter) {
    products = mockProducts.filter((p) => p.form === formFilter);
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-ocean-foam py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ocean-deep">
            {benefitFilter
              ? benefitConfig[benefitFilter]?.label ?? "Shop"
              : formFilter
                ? `CBD ${
                    formFilter.charAt(0).toUpperCase() + formFilter.slice(1)
                  }`
                : "Shop All Products"}
          </h1>
          <p className="mt-3 text-slate text-lg max-w-2xl">
            {benefitFilter
              ? benefitConfig[benefitFilter]?.description
              : "Premium, lab-tested CBD crafted with care, no compromises, no shortcuts."}
          </p>
        </div>
      </section>

      {/* Filters strip */}
      <section className="border-b border-border bg-white sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto">
            <Link href="/shop">
              <Button
                variant={!formFilter && !benefitFilter ? "default" : "ghost"}
                size="sm"
                className={
                  !formFilter && !benefitFilter
                    ? "bg-ocean-mid text-white"
                    : "text-slate"
                }
              >
                All
              </Button>
            </Link>
            <Link href="/shop?form=tinctures">
              <Button
                variant={formFilter === "tinctures" ? "default" : "ghost"}
                size="sm"
                className={
                  formFilter === "tinctures"
                    ? "bg-ocean-mid text-white"
                    : "text-slate"
                }
              >
                🧪 Tinctures
              </Button>
            </Link>
            <Link href="/shop?form=oils">
              <Button
                variant={formFilter === "oils" ? "default" : "ghost"}
                size="sm"
                className={
                  formFilter === "oils"
                    ? "bg-ocean-mid text-white"
                    : "text-slate"
                }
              >
                💧 Massage Oil
              </Button>
            </Link>
            <Link href="/shop?form=sprays">
              <Button
                variant={formFilter === "sprays" ? "default" : "ghost"}
                size="sm"
                className={
                  formFilter === "sprays"
                    ? "bg-ocean-mid text-white"
                    : "text-slate"
                }
              >
                ✨ Face Spray
              </Button>
            </Link>
            <Link href="/shop?benefit=pets">
              <Button
                variant={benefitFilter === "pets" ? "default" : "ghost"}
                size="sm"
                className={
                  benefitFilter === "pets"
                    ? "bg-ocean-mid text-white"
                    : "text-slate"
                }
              >
                🐾 Pets
              </Button>
            </Link>
            <Link href="/shop?benefit=relaxation">
              <Button
                variant={benefitFilter === "relaxation" ? "default" : "ghost"}
                size="sm"
                className={
                  benefitFilter === "relaxation"
                    ? "bg-ocean-mid text-white"
                    : "text-slate"
                }
              >
                🧘 Relaxation
              </Button>
            </Link>
            <Link href="/shop?benefit=skincare">
              <Button
                variant={benefitFilter === "skincare" ? "default" : "ghost"}
                size="sm"
                className={
                  benefitFilter === "skincare"
                    ? "bg-ocean-mid text-white"
                    : "text-slate"
                }
              >
                ✨ Skincare
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate text-lg">
                No products found in this category.
              </p>
              <Link href="/shop">
                <Button variant="link" className="text-ocean-mid mt-2">
                  View all products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {products.map((product) => (
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
                          ({product.reviewCount.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
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
                        <span className="text-sm text-ocean-mid font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                      {product.subscriptionAvailable && (
                        <p className="text-sm text-hemp-green font-medium">
                          Subscribe & save {product.subscriptionDiscount}%
                        </p>
                      )}
                      <div className="pt-2">
                        <ShareButtons
                          product={product}
                          currentUrl={canonicalUrl}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
