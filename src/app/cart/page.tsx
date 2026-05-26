"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Tag,
  Truck,
  ShieldCheck,
  FlaskConical,
  ArrowRight,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";

const trustBadges = [
  {
    icon: <Truck className="h-5 w-5" />,
    title: "Free Shipping",
    description: "On orders over $75",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "60-Day Guarantee",
    description: "Hassle-free returns",
  },
  {
    icon: <FlaskConical className="h-5 w-5" />,
    title: "Lab Tested",
    description: "Third-party verified",
  },
];

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, hydrated } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoPercent, setPromoPercent] = useState(0);
  const [promoName, setPromoName] = useState("");

  const shipping = subtotal >= 75 ? 0 : 5.99;
  const discount = promoApplied ? subtotal * (promoPercent / 100) : 0;
  const total = subtotal - discount + shipping;

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "WELCOME20") {
      setPromoPercent(20);
      setPromoName("WELCOME20");
      setPromoApplied(true);
    } else if (code === "HONOR10") {
      setPromoPercent(10);
      setPromoName("HONOR10");
      setPromoApplied(true);
    } else if (code === "OCEANA15") {
      setPromoPercent(15);
      setPromoName("OCEANA15");
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    window.location.href = "/contact?type=order";
  };

  // Loading state while hydrating from localStorage
  if (!hydrated) {
    return (
      <div>
        <section className="bg-ocean-foam wave-divider">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ocean-deep">
              Your Cart
            </h1>
            <p className="mt-2 text-slate text-lg">Review your items before checkout</p>
          </div>
        </section>
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-ocean-foam flex items-center justify-center">
              <div className="h-10 w-10 border-4 border-ocean-mid border-t-transparent rounded-full animate-spin" />
            </div>
            <h2 className="font-heading text-xl font-bold text-ocean-deep">
              Loading your cart...
            </h2>
          </div>
        </section>
      </div>
    );
  }

  // Empty Cart (only after hydration)
  if (items.length === 0) {
    return (
      <div>
        <section className="bg-ocean-foam wave-divider">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ocean-deep">
              Your Cart
            </h1>
            <p className="mt-2 text-slate text-lg">Review your items before checkout</p>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-ocean-foam flex items-center justify-center">
              <Package className="h-14 w-14 text-ocean-mid" />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ocean-deep">
              Your cart is empty
            </h2>
            <p className="mt-4 text-slate text-lg leading-relaxed">
              Looks like you haven&apos;t added any ocean-pure wellness products yet.
              Explore our collection and find the perfect CBD solution for you.
            </p>
            <Link href="/shop" className="mt-8 inline-block">
              <Button
                size="lg"
                className="bg-ocean-mid text-white hover:bg-ocean-deep font-semibold text-base px-8"
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Filled Cart
  return (
    <div>
      <section className="bg-ocean-foam wave-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ocean-deep">
            Your Cart
          </h1>
          <p className="mt-2 text-slate text-lg">
            {items.length} {items.length === 1 ? "item" : "items"} waiting for you
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 space-y-6">
              {items.map((item) => (
                <div
                  key={item.variant.id}
                  className="bg-white rounded-2xl border border-border p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
                >
                  <div className="flex gap-4 sm:gap-6">
                    <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-ocean-foam overflow-hidden relative">
                      {item.product.images[0] ? (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.images[0].alt}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">
                          {item.product.benefit === "pets"
                            ? "🐾"
                            : item.product.benefit === "skincare"
                            ? "✨"
                            : "🧘"}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/shop/${item.product.handle}`}
                            className="font-heading text-lg font-bold text-charcoal truncate hover:text-ocean-mid transition-colors"
                          >
                            {item.product.title}
                          </Link>
                          <p className="text-sm text-slate mt-0.5">
                            {item.variant.title}
                          </p>
                          {item.isSubscription && (
                            <p className="text-xs text-hemp-green font-medium mt-0.5">
                              Subscription
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.variant.id, item.isSubscription)}
                          className="shrink-0 p-1.5 rounded-lg text-slate hover:text-coral hover:bg-coral/10 transition-colors"
                          aria-label={`Remove ${item.product.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.variant.id, item.quantity - 1, item.isSubscription)
                            }
                            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-slate hover:bg-ocean-foam hover:text-ocean-mid hover:border-ocean-mid transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.variant.id, item.quantity + 1, item.isSubscription)
                            }
                            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-slate hover:bg-ocean-foam hover:text-ocean-mid hover:border-ocean-mid transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <p className="font-heading text-lg font-bold text-ocean-deep">
                          ${(item.variant.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ocean-mid hover:text-ocean-deep transition-colors mt-2"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>

            <div className="lg:col-span-5 mt-10 lg:mt-0">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
                  <div className="p-6">
                    <h2 className="font-heading text-xl font-bold text-ocean-deep flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Order Summary
                    </h2>

                    <div className="mt-6 space-y-3 text-sm">
                      <div className="flex justify-between text-slate">
                        <span>Subtotal</span>
                        <span className="font-medium text-charcoal">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between text-slate">
                        <span>Shipping</span>
                        {shipping === 0 ? (
                          <span className="font-medium text-hemp-green">Free</span>
                        ) : (
                          <span className="font-medium text-charcoal">
                            ${shipping.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {shipping > 0 && (
                        <p className="text-xs text-coral">
                          Add ${(75 - subtotal).toFixed(2)} more for free shipping
                        </p>
                      )}

                      {promoApplied && (
                        <div className="flex justify-between text-hemp-green">
                          <span>{promoName} ({promoPercent}% off)</span>
                          <span className="font-medium">-${discount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    <Separator className="my-5" />

                    <div className="flex justify-between items-baseline">
                      <span className="font-heading text-lg font-bold text-ocean-deep">
                        Total
                      </span>
                      <span className="font-heading text-2xl font-bold text-ocean-deep">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="px-6 pb-5">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate" />
                        <Input
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="pl-8"
                          disabled={promoApplied}
                        />
                      </div>
                      <Button
                        variant="outline"
                        onClick={applyPromo}
                        disabled={promoApplied || !promoCode.trim()}
                        className="border-ocean-mid text-ocean-mid hover:bg-ocean-foam hover:text-ocean-deep shrink-0"
                      >
                        Apply
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="mt-2 text-sm font-medium text-hemp-green flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {promoName} applied! {promoPercent}% off your order.
                      </p>
                    )}
                  </div>

                  <div className="px-6 pb-6">
                    <Button
                      size="lg"
                      onClick={handleCheckout}
                      className="w-full bg-ocean-mid text-white hover:bg-ocean-deep font-semibold text-base h-11"
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {trustBadges.map((badge) => (
                    <div
                      key={badge.title}
                      className="bg-ocean-foam rounded-xl p-4 text-center"
                    >
                      <div className="mx-auto w-10 h-10 rounded-full bg-white flex items-center justify-center text-ocean-mid mb-2">
                        {badge.icon}
                      </div>
                      <p className="text-xs font-semibold text-ocean-deep leading-tight">
                        {badge.title}
                      </p>
                      <p className="text-[0.65rem] text-slate mt-0.5 leading-tight">
                        {badge.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
