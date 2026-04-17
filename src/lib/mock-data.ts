import type { Product, Review } from "@/types/product";

const IMG = {
  pets: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=600&fit=crop",
  topical: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
};

export const mockProducts: Product[] = [
  {
    id: "1",
    handle: "pet-cbd-tincture",
    title: "Pet CBD Tincture — Unflavored",
    description:
      "Give your furry family members the same premium CBD you enjoy. Our unflavored pet tincture is easy to add to food or drop directly in the mouth. 10mg per mL, formulated specifically for dogs and cats with pet-safe ingredients.",
    shortDescription: "10mg/mL unflavored CBD tincture for dogs & cats",
    price: 29.99,
    images: [
      { url: IMG.pets, alt: "OceanaHemp Pet CBD Tincture - Unflavored" },
    ],
    benefit: "pets",
    form: "pet",
    variants: [
      { id: "1-300", title: "300mg (Small Pets)", price: 29.99, available: true },
      { id: "1-600", title: "600mg (Medium Pets)", price: 44.99, available: true },
      { id: "1-1200", title: "1200mg (Large Pets)", price: 64.99, available: true },
    ],
    rating: 4.9,
    reviewCount: 421,
    subscriptionAvailable: true,
    subscriptionDiscount: 25,
    badge: "Best Seller",
    ingredients: [
      "Broad Spectrum CBD Extract",
      "Organic MCT Oil (Coconut-derived)",
    ],
    usage: "Add to food or drop directly in mouth. Small pets: 0.25mL. Medium: 0.5mL. Large: 1mL. Start low, go slow.",
  },
  {
    id: "2",
    handle: "cbd-pain-cream",
    title: "CBD Pain Relief Cream — Cool Mint",
    description:
      "Target sore muscles and joint discomfort with our fast-acting cool mint pain cream. 500mg broad-spectrum CBD combined with menthol, arnica, and camphor for penetrating relief exactly where you need it. Non-greasy, fast-absorbing formula.",
    shortDescription: "500mg CBD cream with menthol & arnica for targeted pain relief",
    price: 49.99,
    images: [
      { url: IMG.topical, alt: "OceanaHemp CBD Pain Relief Cream - Cool Mint" },
    ],
    benefit: "recovery",
    form: "topicals",
    variants: [
      { id: "2-2oz", title: "2 oz (500mg)", price: 49.99, available: true },
      { id: "2-4oz", title: "4 oz (1000mg)", price: 79.99, available: true },
    ],
    rating: 4.7,
    reviewCount: 634,
    subscriptionAvailable: true,
    subscriptionDiscount: 25,
    badge: "Fan Favorite",
    ingredients: [
      "Broad Spectrum CBD Extract (500mg)",
      "Menthol (1.5%)",
      "Arnica Montana Extract",
      "Camphor",
      "Shea Butter",
      "Aloe Vera",
    ],
    usage: "Apply generously to affected area. Massage until fully absorbed. Reapply every 4-6 hours.",
  },
];

export const mockBundles: unknown[] = [];

export const benefitConfig: Record<
  string,
  { label: string; icon: string; tagline: string; description: string; color: string }
> = {
  recovery: {
    label: "Recovery",
    icon: "💪",
    tagline: "Bounce back faster",
    description: "Target sore muscles and joint discomfort with CBD + menthol, turmeric, and arnica for powerful relief.",
    color: "from-hemp-green to-emerald-600",
  },
  pets: {
    label: "Pet Wellness",
    icon: "🐾",
    tagline: "For your furry family",
    description: "CBD formulated specifically for dogs and cats — unflavored tinctures they'll love.",
    color: "from-coral to-red-500",
  },
};

export const mockReviews: Review[] = [
  { id: "r1", author: "Maria L.", rating: 5, title: "My dog loves this tincture!", body: "My 10-year-old golden retriever has so much more energy since starting on the CBD tincture. So easy to add to her food!", date: "2026-03-02", verified: true },
  { id: "r2", author: "David K.", rating: 4, title: "Great for post-gym recovery", body: "The pain cream is legit. I apply it after every workout and the soreness is way down. Took one star off because I wish the tube was bigger!", date: "2026-02-28", verified: true },
  { id: "r3", author: "Sarah M.", rating: 5, title: "Finally, real relief", body: "I've tried so many creams and this is the only one that actually helps my knee pain. The menthol is so soothing.", date: "2026-03-15", verified: true },
];

export function getProductsByBenefit(benefit: string): Product[] {
  return mockProducts.filter((p) => p.benefit === benefit);
}

export function getProductsByForm(form: string): Product[] {
  return mockProducts.filter((p) => p.form === form);
}

export function getProductByHandle(handle: string): Product | undefined {
  return mockProducts.find((p) => p.handle === handle);
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter((p) => p.badge);
}

export function getBestSellers(): Product[] {
  return mockProducts.slice(0, 2);
}