"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import type { Product, ProductVariant } from "@/types/product";

interface AddToCartSectionProps {
  product: Product;
}

export function AddToCartSection({ product }: AddToCartSectionProps) {
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? ""
  );
  const [justAdded, setJustAdded] = useState(false);

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    product.variants[0];

  const subPrice = (
    selectedVariant.price *
    (1 - product.subscriptionDiscount / 100)
  ).toFixed(2);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, 1, false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
    toast.success(`${product.title} added to cart`, {
      description: `${selectedVariant.title} — $${selectedVariant.price}`,
      action: {
        label: "Go to Cart",
        onClick: () => window.location.href = "/cart",
      },
    });
  };

  const handleSubscribe = () => {
    addItem(product, selectedVariant, 1, true);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
    toast.success(`${product.title} added to subscription`, {
      description: `Subscription — $${subPrice}/mo`,
      action: {
        label: "Go to Cart",
        onClick: () => window.location.href = "/cart",
      },
    });
  };

  return (
    <>
      {/* Variants */}
      <div className="space-y-3">
        <h3 className="font-semibold text-charcoal">Size / Strength</h3>
        <div className="flex flex-wrap gap-3">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariantId(variant.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 font-medium text-sm transition-colors ${
                variant.id === selectedVariantId
                  ? "border-ocean-deep bg-ocean-mid text-white"
                  : "border-ocean-mid bg-ocean-foam text-ocean-deep hover:bg-ocean-mid hover:text-white"
              }`}
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
          onClick={handleAddToCart}
          className={`w-full font-bold text-base h-14 transition-colors ${
            justAdded
              ? "bg-hemp-green hover:bg-hemp-green text-white"
              : "bg-ocean-mid hover:bg-ocean-deep text-white"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="h-5 w-5 mr-1" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5 mr-1" />
              Add to Cart ${selectedVariant.price}
            </>
          )}
        </Button>
        {product.subscriptionAvailable && (
          <Button
            size="lg"
            variant="outline"
            onClick={handleSubscribe}
            className="w-full border-hemp-green text-hemp-green hover:bg-hemp-light font-bold text-base h-14"
          >
            Subscribe & Save {product.subscriptionDiscount}%: ${subPrice}/mo
          </Button>
        )}
      </div>
    </>
  );
}