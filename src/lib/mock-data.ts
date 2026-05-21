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

export const petTinctureReviews: Review[] = [
  { id: "p1", author: "Jessica T.", rating: 5, title: "My anxious dog is finally calm", body: "Our golden retriever used to shake during thunderstorms. One dose of this tincture and she curls up and sleeps through them now. Absolutely incredible.", date: "2026-04-02", verified: true },
  { id: "p2", author: "Mark R.", rating: 5, title: "My senior dog is moving again", body: "13-year-old lab was barely getting up stairs. After two weeks on this, he's chasing squirrels again. I owe you everything.", date: "2026-03-22", verified: true },
  { id: "p3", author: "Amanda S.", rating: 4, title: "Works for my cat too", body: "Was skeptical about giving CBD to my cat, but the bacon flavor works. She's less territorial with the neighbor's cat. Very happy with results.", date: "2026-03-10", verified: true },
];

export const faceSprayReviews: Review[] = [
  { id: "f1", author: "Sophia L.", rating: 5, title: "My skin has never looked better", body: "The face spray is a game changer. I mist it on after cleansing and before moisturizer. My skin feels hydrated and calm, not tight or greasy.", date: "2026-03-15", verified: true },
  { id: "f2", author: "Daniel K.", rating: 5, title: "Works great under makeup", body: "I mist before applying foundation and it creates the smoothest canvas. No oiliness, no breakouts. Just calm, even skin. Can't live without it.", date: "2026-02-20", verified: true },
  { id: "f3", author: "Nina W.", rating: 4, title: "Refreshing midday pick-me-up", body: "I keep this in my bag for the office. A quick spritz after lunch meetings and I feel refreshed. The water-soluble formula is brilliant.", date: "2026-01-18", verified: true },
];

export const massageOilReviews: Review[] = [
  { id: "m1", author: "Maria L.", rating: 5, title: "Best massage oil I've ever used", body: "I use this after every stressful day. The lavender and arnica combination is incredible. my shoulders finally let go. Worth every penny.", date: "2026-03-02", verified: true },
  { id: "m2", author: "David K.", rating: 5, title: "Finally, real relaxation", body: "This massage oil absorbs so well and actually works. No greasy residue, just deep relief. I've already subscribed.", date: "2026-02-28", verified: true },
  { id: "m3", author: "Patrick D.", rating: 5, title: "Saved my post-workout recovery", body: "I lift heavy six days a week. This oil is my secret weapon. Roll it on sore muscles, massage it in, wake up feeling brand new.", date: "2026-03-28", verified: true },
];

function getProductReviews(product: Product): Review[] {
  if (product.reviews) return product.reviews;
  switch (product.handle) {
    case "cbd-pet-tincture":
      return petTinctureReviews;
    case "water-soluble-cbd-face-spray":
      return faceSprayReviews;
    case "full-spectrum-massage-oil":
      return massageOilReviews;
    default:
      return mockReviews;
  }
}

export { getProductReviews };

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