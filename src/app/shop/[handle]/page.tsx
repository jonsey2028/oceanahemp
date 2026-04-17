import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Shield,
  Truck,
  Beaker,
  Leaf,
  Check,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  getProductByHandle,
  mockProducts,
  mockReviews,
  benefitConfig,
} from "@/lib/mock-data";

type Props = {
  params: Promise<{ handle: string }>;
};

export function generateStaticParams() {
  return mockProducts.map((p) => ({ handle: p.handle }));
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const benefit = benefitConfig[product.benefit];
  const savings = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) /
          product.compareAtPrice) *
          100
      )
    : 0;
  const subPrice = (
    product.price *
    (1 - product.subscriptionDiscount / 100)
  ).toFixed(2);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate mb-8">
          <Link href="/shop" className="hover:text-ocean-mid transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            Shop
          </Link>
          <span>/</span>
          <span className="text-charcoal font-medium">{product.title}</span>
        </nav>

        {/* Main product layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-square bg-ocean-foam rounded-2xl overflow-hidden">
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {product.badge && (
              <Badge className="absolute top-6 left-6 bg-coral text-white border-0 font-semibold text-sm px-3 py-1">
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Benefit tag */}
            {benefit && (
              <div className="inline-flex items-center gap-2 bg-ocean-foam rounded-full px-3 py-1.5 text-sm font-medium text-ocean-mid">
                <span>{benefit.icon}</span>
                <span>{benefit.label}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-charcoal">
                {product.rating}
              </span>
              <span className="text-slate">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-charcoal">
                  ${product.price}
                </span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-lg text-slate line-through">
                      ${product.compareAtPrice}
                    </span>
                    <Badge className="bg-hemp-green text-white border-0 text-xs">
                      Save {savings}%
                    </Badge>
                  </>
                )}
              </div>
              {product.subscriptionAvailable && (
                <p className="text-sm text-hemp-green font-medium">
                  Subscribe & save:{" "}
                  <span className="font-bold">${subPrice}</span>{" "}
                  ({product.subscriptionDiscount}% off)
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-slate leading-relaxed">
              {product.description}
            </p>

            <Separator />

            {/* Variants */}
            <div className="space-y-3">
              <h3 className="font-semibold text-charcoal">Size / Strength</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-ocean-mid bg-ocean-foam text-ocean-deep font-medium text-sm hover:bg-ocean-mid hover:text-white transition-colors"
                  >
                    <span>{variant.title}</span>
                    <span className="font-bold">${variant.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-ocean-mid hover:bg-ocean-deep text-white font-bold text-base h-14"
              >
                Add to Cart — ${product.price}
              </Button>
              {product.subscriptionAvailable && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-hemp-green text-hemp-green hover:bg-hemp-light font-bold text-base h-14"
                >
                  Subscribe & Save {product.subscriptionDiscount}% — $
                  {subPrice}/mo
                </Button>
              )}
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-slate">
                <Truck className="h-4 w-4 text-ocean-mid" />
                Free Shipping $75+
              </div>
              <div className="flex items-center gap-2 text-sm text-slate">
                <Shield className="h-4 w-4 text-ocean-mid" />
                60-Day Guarantee
              </div>
              <div className="flex items-center gap-2 text-sm text-slate">
                <Beaker className="h-4 w-4 text-ocean-mid" />
                3rd Party Lab Tested
              </div>
              <div className="flex items-center gap-2 text-sm text-slate">
                <Leaf className="h-4 w-4 text-ocean-mid" />
                USA-Grown Hemp
              </div>
            </div>

            <Separator />

            {/* Ingredients */}
            <div className="space-y-3">
              <h3 className="font-semibold text-charcoal">Ingredients</h3>
              <ul className="space-y-1.5">
                {product.ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="flex items-center gap-2 text-sm text-slate"
                  >
                    <Check className="h-4 w-4 text-hemp-green shrink-0" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Usage */}
            <div className="space-y-2 bg-sand rounded-xl p-5">
              <h3 className="font-semibold text-charcoal">How to Use</h3>
              <p className="text-slate text-sm leading-relaxed">
                {product.usage}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-16 lg:mt-24">
          <Separator className="mb-12" />
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ocean-deep mb-8">
            Customer Reviews
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-border"
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
        </section>
      </div>
    </div>
  );
}