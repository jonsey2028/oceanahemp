"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Package,
  Truck,
  ShieldCheck,
  FlaskConical,
  Leaf,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";

const trustBadges = [
  { icon: <Truck className="h-5 w-5" />, title: "Free Shipping", description: "On orders over $75" },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "60-Day Guarantee", description: "Hassle-free returns" },
  { icon: <FlaskConical className="h-5 w-5" />, title: "Lab Tested", description: "Third-party verified" },
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart, hydrated } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    notes: "",
  });

  const shipping = subtotal >= 75 ? 0 : 5.99;
  const total = subtotal + shipping;

  // Loading state while cart hydrates from localStorage
  if (!hydrated) {
    return (
      <div>
        <section className="bg-ocean-foam wave-divider">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">Checkout</h1>
            <p className="mt-2 text-slate text-lg">Preparing your order</p>
          </div>
        </section>
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-ocean-foam flex items-center justify-center">
              <Loader2 className="h-10 w-10 text-ocean-mid animate-spin" />
            </div>
            <h2 className="font-heading text-xl font-bold text-ocean-deep">Loading your cart...</h2>
          </div>
        </section>
      </div>
    );
  }

  if (items.length === 0 && !submitted) {
    return (
      <div>
        <section className="bg-ocean-foam wave-divider">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">Checkout</h1>
            <p className="mt-2 text-slate text-lg">Complete your order</p>
          </div>
        </section>
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-ocean-foam flex items-center justify-center">
              <Package className="h-14 w-14 text-ocean-mid" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-ocean-deep">Your cart is empty</h2>
            <p className="mt-4 text-slate text-lg">Add some ocean-pure wellness products before checkout.</p>
            <Link href="/shop" className="mt-8 inline-block">
              <Button size="lg" className="bg-ocean-mid text-white hover:bg-ocean-deep font-semibold px-8">
                Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (submitted) {
    return (
      <div>
        <section className="bg-ocean-foam wave-divider">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">Order Reserved</h1>
          </div>
        </section>
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-hemp-light flex items-center justify-center">
              <Check className="h-14 w-14 text-hemp-green" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-ocean-deep">Thank you, {form.firstName}!</h2>
            <p className="mt-4 text-slate text-lg">
              Your order has been reserved. We'll send a confirmation to <strong>{form.email}</strong> with payment instructions.
            </p>
            <p className="mt-6 text-slate text-base">
              Questions? Call us at <a href="tel:+18583658439" className="text-ocean-mid font-semibold">(858) 365-8439</a> or email <a href="mailto:hello@oceanahemp.com" className="text-ocean-mid font-semibold">hello@oceanahemp.com</a>.
            </p>
            <Link href="/shop" className="mt-8 inline-block">
              <Button size="lg" className="bg-ocean-mid text-white hover:bg-ocean-deep font-semibold px-8">
                Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.address1 || !form.city || !form.state || !form.zip) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({
            title: i.product.title,
            variant: i.variant.title,
            quantity: i.quantity,
            price: i.variant.price,
            subscription: i.isSubscription,
            image: i.product.images[0]?.url,
          })),
          subtotal,
          shipping,
          total,
        }),
      });
      if (res.ok) {
        clearCart();
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again or call us.");
      }
    } catch {
      alert("Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="bg-ocean-foam wave-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <Link href="/cart" className="inline-flex items-center text-slate hover:text-ocean-deep mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
          </Link>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">Checkout</h1>
          <p className="mt-2 text-slate text-lg">Complete your order — payment instructions will be sent by email</p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-card">
                <h2 className="font-heading text-xl font-bold text-ocean-deep mb-6">Contact & Shipping</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
                  <Input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                  <Input name="phone" type="tel" placeholder="Phone (optional)" value={form.phone} onChange={handleChange} />
                </div>
                <div className="mt-4">
                  <Input name="address1" placeholder="Address line 1" value={form.address1} onChange={handleChange} required />
                </div>
                <div className="mt-4">
                  <Input name="address2" placeholder="Address line 2 (optional)" value={form.address2} onChange={handleChange} />
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                  <Input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
                  <Input name="zip" placeholder="ZIP" value={form.zip} onChange={handleChange} required />
                  <Input name="country" placeholder="Country" value={form.country} onChange={handleChange} disabled />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-card">
                <h2 className="font-heading text-xl font-bold text-ocean-deep mb-4">Payment</h2>
                <p className="text-slate text-sm">
                  Since our Square CBD payment processing is still pending approval, we'll send you a secure payment link by email after reviewing your order. You can pay by credit card, bank transfer, or call us at <a href="tel:+18583658439" className="text-ocean-mid font-semibold">(858) 365-8439</a> to pay by phone.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-card">
                <h2 className="font-heading text-xl font-bold text-ocean-deep mb-4">Order Notes</h2>
                <textarea
                  name="notes"
                  placeholder="Any special instructions or questions..."
                  value={form.notes}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-mid"
                  rows={3}
                />
              </div>
            </div>

            <div className="lg:col-span-5 mt-10 lg:mt-0">
              <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden sticky top-6">
                <div className="bg-ocean-deep text-white p-5">
                  <h2 className="font-heading text-lg font-bold">Order Summary</h2>
                  <p className="text-sm opacity-90">{items.length} {items.length === 1 ? "item" : "items"}</p>
                </div>
                <div className="p-5 space-y-4">
                  {items.map((item) => (
                    <div key={item.variant.id} className="flex gap-4">
                      <div className="shrink-0 w-16 h-16 rounded-lg bg-ocean-foam overflow-hidden relative">
                        {item.product.images[0] ? (
                          <Image src={item.product.images[0].url} alt={item.product.images[0].alt} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">
                            {item.product.benefit === "pets" ? "🐾" : item.product.benefit === "skincare" ? "✨" : "🧘"}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-charcoal truncate">{item.product.title}</p>
                        <p className="text-xs text-slate">{item.variant.title}</p>
                        {item.isSubscription && (
                          <p className="text-xs text-hemp-green font-medium">Subscription</p>
                        )}
                        <p className="text-sm font-semibold text-ocean-deep mt-1">
                          {item.quantity} x ${item.variant.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate">
                      <span>Subtotal</span>
                      <span className="font-medium text-charcoal">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate">
                      <span>Shipping</span>
                      {shipping === 0 ? (
                        <span className="font-medium text-hemp-green">Free</span>
                      ) : (
                        <span className="font-medium text-charcoal">${shipping.toFixed(2)}</span>
                      )}
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-coral">Add ${(75 - subtotal).toFixed(2)} more for free shipping</p>
                    )}
                  </div>
                  <Separator />
                  <div className="flex justify-between items-baseline">
                    <span className="font-heading text-lg font-bold text-ocean-deep">Total</span>
                    <span className="font-heading text-2xl font-bold text-ocean-deep">${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full bg-ocean-mid text-white hover:bg-ocean-deep font-semibold text-base h-11"
                  >
                    {submitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                    ) : (
                      <>{"Reserve Order"} <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                  <p className="mt-3 text-xs text-center text-slate">
                    By placing this order, you agree to our <Link href="/terms" className="text-ocean-mid hover:underline">Terms of Service</Link>.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 px-5 pb-5">
                  {trustBadges.map((badge) => (
                    <div key={badge.title} className="bg-ocean-foam rounded-xl p-3 text-center">
                      <div className="mx-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-ocean-mid mb-1">
                        {badge.icon}
                      </div>
                      <p className="text-[0.65rem] font-semibold text-ocean-deep leading-tight">{badge.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
