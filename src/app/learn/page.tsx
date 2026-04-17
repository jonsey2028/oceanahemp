import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const articles = [
  {
    title: "What is CBD?",
    emoji: "🌿",
    slug: "/learn/what-is-cbd",
    excerpt:
      "Discover the basics of cannabidiol — what it is, how it works with your body's endocannabinoid system, and why millions are turning to CBD for natural wellness.",
    category: "Fundamentals",
    readTime: "6 min read",
  },
  {
    title: "CBD Dosage Guide",
    emoji: "📊",
    slug: "/learn/cbd-dosage-guide",
    excerpt:
      "How much CBD should you take? Learn about dosing by weight, desired effect, and experience level — plus tips for finding your perfect amount.",
    category: "Guides",
    readTime: "8 min read",
  },
  {
    title: "Benefits of CBD",
    emoji: "💪",
    slug: "/learn/benefits-of-cbd",
    excerpt:
      "From pain relief to better sleep, explore the scientifically studied benefits of CBD and what the latest research says about its potential.",
    category: "Wellness",
    readTime: "7 min read",
  },
  {
    title: "Full vs Broad vs Isolate",
    emoji: "🔬",
    slug: "/learn/full-vs-broad-vs-isolate",
    excerpt:
      "Not all CBD is created equal. Understand the key differences between full-spectrum, broad-spectrum, and CBD isolate — and which is right for you.",
    category: "Fundamentals",
    readTime: "5 min read",
  },
  {
    title: "CBD for Pets",
    emoji: "🐾",
    slug: "/learn/cbd-for-pets",
    excerpt:
      "Yes, your furry friends can benefit too! Learn about pet-safe CBD dosing, potential benefits for anxiety and joint health, and what to look for in a pet product.",
    category: "Pet Wellness",
    readTime: "6 min read",
  },
  {
    title: "CBD and Drug Testing",
    emoji: "🧪",
    slug: "/learn/cbd-and-drug-testing",
    excerpt:
      "Will CBD show up on a drug test? Get the facts on THC content, drug screening, and how to choose CBD products that keep you safe at work.",
    category: "Guides",
    readTime: "5 min read",
  },
];

export default function LearnPage() {
  const featuredArticle = articles[0];

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green wave-divider">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/90 mb-6">
            <BookOpen className="h-4 w-4" />
            <span>Evidence-Based · Easy to Understand</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Learn About CBD
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Knowledge is the first step to wellness. Explore our
            expert-written guides, dig into the science, and make confident
            choices for you and your pets.
          </p>
        </div>
      </section>

      {/* ─── FEATURED ARTICLE ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-ocean-mid tracking-widest uppercase mb-6">
            Featured Article
          </p>
          <Link href={featuredArticle.slug} className="group block">
            <div className="bg-gradient-to-br from-ocean-foam to-white rounded-2xl border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Visual side */}
                <div className="relative bg-gradient-to-br from-ocean-deep to-ocean-mid p-12 lg:p-16 flex items-center justify-center min-h-[280px]">
                  <div className="text-center space-y-4">
                    <span className="text-7xl">{featuredArticle.emoji}</span>
                    <p className="font-heading text-2xl text-white font-bold">
                      {featuredArticle.title}
                    </p>
                    <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white/90">
                      {featuredArticle.readTime}
                    </span>
                  </div>
                </div>
                {/* Content side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1 bg-ocean-foam text-ocean-mid rounded-full px-3 py-1 text-xs font-semibold w-fit">
                    {featuredArticle.category}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ocean-deep mt-4 group-hover:text-ocean-mid transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="mt-4 text-slate leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 text-ocean-mid font-semibold group-hover:gap-3 transition-all">
                      Read Full Article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── ARTICLE GRID ─── */}
      <section className="py-16 lg:py-24 bg-ocean-foam">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">
              All Articles
            </h2>
            <p className="mt-3 text-slate text-lg max-w-2xl mx-auto">
              Start your CBD education journey with our most popular guides
              and deep dives.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={article.slug}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* Emoji + Category */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-4xl">{article.emoji}</span>
                    <span className="text-xs font-semibold text-ocean-mid bg-ocean-foam rounded-full px-3 py-1">
                      {article.category}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-ocean-deep group-hover:text-ocean-mid transition-colors">
                    {article.title}
                  </h3>
                  {/* Excerpt */}
                  <p className="mt-3 text-slate text-sm leading-relaxed flex-1">
                    {article.excerpt}
                  </p>
                  {/* Footer */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <span className="text-xs text-slate">
                      {article.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1 text-ocean-mid font-semibold text-sm group-hover:gap-2 transition-all">
                      Read
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">💬</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Still Have Questions?
          </h2>
          <p className="mt-4 text-white/80 text-lg leading-relaxed">
            Our wellness team is here to help you find the perfect CBD
            routine. Reach out anytime — no question is too small.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-ocean-deep hover:bg-ocean-foam font-semibold text-base px-8"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}