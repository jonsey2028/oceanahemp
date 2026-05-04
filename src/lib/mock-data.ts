import type { Product, Review } from "@/types/product";

const IMG = {
  petTincture: "/products/pet-tincture.jpg",
  faceSpray: "/products/face-spray.jpg",
  massageOil: "/products/massage-oil.jpg",
};

export const mockProducts: Product[] = [
  {
    id: "1",
    handle: "cbd-pet-tincture",
    title: "Pets Full Spectrum CBD Oil",
    description:
      "Because your best friend deserves the same quality you'd give yourself. Our full spectrum CBD pet tincture is formulated specifically for dogs and cats. organic ingredients, precise dosing, and savory bacon flavor they actually love. Supports neurology, immunity, hip & joint mobility, relaxation, and everyday wellness.",
    shortDescription: "Full spectrum CBD pet tincture. calm, joints, immunity, everyday wellness",
    price: 40.95,
    images: [
      { url: IMG.petTincture, alt: "OceanaHemp Pets Full Spectrum CBD Oil" },
    ],
    benefit: "pets",
    form: "tinctures",
    variants: [
      { id: "1-300mg", title: "1 oz (300mg) Small Breed", price: 40.95, available: true },
      { id: "1-600mg", title: "2 oz (600mg) Medium Breed", price: 54.95, available: true },
      { id: "1-1000mg", title: "2 oz (1000mg) Large Breed", price: 69.95, available: true },
    ],
    rating: 4.9,
    reviewCount: 213,
    subscriptionAvailable: true,
    subscriptionDiscount: 25,
    badge: "Best Seller",
    ingredients: [
      "Oceana Hemp Flower Extract",
      "Organic MCT Oil",
      "Vegetarian Certified Bacon Flavoring",
    ],
    usage: "Shake well. Drop directly into mouth or mix with food. Small dogs (under 25 lbs): 0.25 mL. Medium dogs (25-50 lbs): 0.5 mL. Large dogs (50+ lbs): 1 mL. Start low, go slow.",
  },
  {
    id: "2",
    handle: "water-soluble-cbd-face-spray",
    title: "Water-Soluble CBD Face Spray",
    description:
      "A refreshing face mist that actually does something. Our water-soluble CBD formula delivers cannabinoids where your skin needs them most, no greasy residue, no heavy feel, no nonsense. Spray it on after cleansing, before makeup, or anytime you need a reset. Your skin deserves better than empty promises.",
    shortDescription: "Water-soluble CBD face mist for refreshed, nourished skin",
    price: 39.99,
    images: [
      { url: IMG.faceSpray, alt: "OceanaHemp Water-Soluble CBD Face Spray" },
    ],
    benefit: "skincare",
    form: "sprays",
    variants: [
      { id: "2-2oz", title: "2 oz (250mg)", price: 39.99, available: true },
    ],
    rating: 4.8,
    reviewCount: 89,
    subscriptionAvailable: true,
    subscriptionDiscount: 20,
    badge: "New",
    ingredients: [
      "Water-Soluble CBD Extract (250mg cannabinoids)",
      "Purified Water",
      "Aloe Vera",
      "Witch Hazel",
      "Hyaluronic Acid",
      "Vitamin C",
    ],
    usage: "Mist onto clean face from 6 inches away. Let absorb naturally. Use morning and night, or anytime you need a refresh.",
  },
  {
    id: "3",
    handle: "full-spectrum-massage-oil",
    title: "Full Spectrum Massage Oil",
    description:
      "Melt away tension with our full spectrum CBD massage oil. Crafted from organically grown hemp and infused with soothing botanicals, this oil absorbs deep into tired muscles so you can finally unwind. No synthetic ingredients. No fillers. Just pure, potent relief that actually works.",
    shortDescription: "Full spectrum CBD massage oil for deep relaxation & muscle relief",
    price: 49.99,
    images: [
      { url: IMG.massageOil, alt: "OceanaHemp Full Spectrum Massage Oil" },
    ],
    benefit: "relaxation",
    form: "oils",
    variants: [
      { id: "3-4oz", title: "4 oz (500mg)", price: 49.99, available: true },
    ],
    rating: 4.9,
    reviewCount: 127,
    subscriptionAvailable: true,
    subscriptionDiscount: 25,
    badge: "Popular",
    ingredients: [
      "Oceana Hemp Full Spectrum Extract (500mg cannabinoids)",
      "Organic MCT Oil",
      "Organic Arnica Montana",
      "Organic Lavender Essential Oil",
      "Vitamin E",
    ],
    usage: "Apply generously to areas of tension. Massage in circular motions until absorbed. Use as needed.",
  },
];

export const benefitConfig: Record<
  string,
  { label: string; icon: string; tagline: string; description: string; color: string }
> = {
  pets: {
    label: "Pets",
    icon: "🐾",
    tagline: "Because they deserve the best",
    description: "Full spectrum CBD pet tincture formulated for dogs & cats. calm support joint health and overall wellness.",
    color: "from-amber-400 to-amber-600",
  },
  skincare: {
    label: "Skincare",
    icon: "✨",
    tagline: "Your skin deserves better",
    description: "Water-soluble CBD face spray that nourishes refreshes and protects. no greasy residue no nonsense.",
    color: "from-coral to-amber-400",
  },
  relaxation: {
    label: "Relaxation",
    icon: "🧘",
    tagline: "Unwind naturally",
    description: "Full spectrum CBD massage oil crafted to melt away tension and help you find your calm.",
    color: "from-ocean-mid to-hemp-green",
  },
};

export const mockReviews: Review[] = [
  { id: "r1", author: "Maria L.", rating: 5, title: "Best massage oil I've ever used", body: "I use this after every stressful day. The lavender and arnica combination is incredible. my shoulders finally let go. Worth every penny.", date: "2026-03-02", verified: true },
  { id: "r2", author: "David K.", rating: 5, title: "Finally, real relaxation", body: "This massage oil absorbs so well and actually works. No greasy residue, just deep relief. I've already subscribed.", date: "2026-02-28", verified: true },
  { id: "r3", author: "Sarah M.", rating: 5, title: "My skin has never looked better", body: "The face spray is a game changer. I mist it on after cleansing and before moisturizer. My skin feels hydrated and calm, not tight or greasy.", date: "2026-03-15", verified: true },
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