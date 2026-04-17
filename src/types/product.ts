export type Benefit = "sleep" | "calm" | "recovery" | "focus" | "daily" | "pets";
export type ProductForm = "gummies" | "oils" | "topicals" | "capsules" | "pet";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  available: boolean;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  benefit: Benefit;
  form: ProductForm;
  variants: ProductVariant[];
  labResultsUrl?: string;
  rating: number;
  reviewCount: number;
  subscriptionAvailable: boolean;
  subscriptionDiscount: number;
  badge?: string;
  ingredients: string[];
  usage: string;
}

export interface Bundle {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice: number;
  products: string[];
  image: ProductImage;
  savings: number;
}

export interface QuizAnswer {
  questionId: string;
  answer: string;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
  isSubscription: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}
