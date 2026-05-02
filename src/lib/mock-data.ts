import type { Product, Review } from "@/types/product";

const IMG = {
  massageOil: "/products/massage-oil.jpg",
  faceSpray: "/products/face-spray.jpg",
};

export const mockProducts: Product[] = [
  {
    id: "1",
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
      { id: "1-4oz", title: "4 oz (500mg)", price: 49.99, available: true },
    ],
    rating: 4.9,
    reviewCount: 127,
    subscriptionAvailable: true,
    subscriptionDiscount: 25,
    badge: "Best Seller",
    ingredients: [
      "Oceana Hemp Full Spectrum Extract (500mg cannabinoids)",
      "Organic MCT Oil",
      "Organic Arnica Montana",
      "Organic Lavender Essential Oil",
      "Vitamin E",
    ],
    usage: "Apply generously to areas of tension. Massage in circular motions until absorbed. Use as needed.",
  },
  {
    id: "2",
    handle: "water-soluble-cbd-face-spray",
    title: "Water-Soluble CBD Face Spray",
    description:
      "A refreshing face mist that actually does something. Our water-soluble CBD formula delivers cannabinoids where your skin needs them most — no greasy residue, no heavy feel, no nonsense. Spray it on after cleansing, before makeup, or anytime you need a reset. Your skin deserves better than empty promises.",
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
];

export const benefitConfig: Record<
  string,
  { label: string; icon: string; tagline: string; description: string; color: string }
> = {
  relaxation: {
    label: "Relaxation",
    icon: "🧘",
    tagline: "Unwind naturally",
    description: "Full spectrum CBD massage oil crafted to melt away tension and help you find your calm.",
    color: "from-ocean-mid to-hemp-green",
  },
  skincare: {
    label: "Skincare",
    icon: "✨",
    tagline: "Your skin deserves better",
    description: "Water-soluble CBD face spray that nourishes, refreshes, and protects — no greasy residue, no nonsense.",
    color: "from-coral to-amber-400",
  },
};

export const mockReviews: Review[] = [
  { id: "r1", author: "Maria L.", rating: 5, title: "Best massage oil I've ever used", body: "I use this after every stressful day. The lavender and arnica combination is incredible — my shoulders finally let go. Worth every penny.", date: "2026-03-02", verified: true },
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