import Link from "next/link";
import { ArrowRight, Leaf, Droplets, Recycle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    emoji: "💎",
    title: "Purity",
    description:
      "We never dilute, never cut, never settle. If it's not the purest form available, it doesn't leave our facility.",
  },
  {
    emoji: "🤝",
    title: "Integrity",
    description:
      "What's on the label is what's in the bottle. No fillers, no misleading claims, no fine print. We'd rather lose a sale than your trust.",
  },
  {
    emoji: "⚡",
    title: "Effectiveness",
    description:
      "We make products that work. Period. Every formulation is backed by rigorous testing because results aren't optional. They're the whole point.",
  },
  {
    emoji: "🔍",
    title: "Transparency",
    description:
      "Full-lab results, honest sourcing, clear communication. You should know exactly what you're putting in your body and where it came from.",
  },
  {
    emoji: "🌊",
    title: "Community",
    description:
      "From the smoke shop down the street to the tribal nations we partner with, we grow together. Our success is shared success.",
  },
];

const sustainabilityPractices = [
  {
    icon: <Leaf className="h-6 w-6 text-hemp-green" />,
    title: "Organic Farming",
    description:
      "100% organically grown hemp on US family farms. No pesticides, no herbicides, no compromise.",
  },
  {
    icon: <Recycle className="h-6 w-6 text-ocean-mid" />,
    title: "Biodegradable Packaging",
    description:
      "Our bottles, boxes, and shipping materials are made from recycled and biodegradable materials.",
  },
  {
    icon: <Droplets className="h-6 w-6 text-ocean-deep" />,
    title: "Water Conservation",
    description:
      "Our farming partners use drip irrigation and rainwater harvesting to minimize water waste.",
  },
  {
    icon: <Heart className="h-6 w-6 text-coral" />,
    title: "Carbon Offsetting",
    description:
      "We invest in reforestation and ocean cleanup projects to offset our operational carbon footprint.",
  },
];

const team = [
  {
    name: "Kerry Jones",
    role: "Founder",
    bio: "San Diego native who started OceanaHemp with one conviction: people deserve hemp products that actually work. No investors, no corporate board, no compromises. Just pure, proven products from someone who stakes their name on every bottle.",
    initials: "KJ",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green wave-divider">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/90 mb-6">
            <Leaf className="h-4 w-4" />
            <span>Organically Grown · Lab Tested · Zero Compromises</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Our Story
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            We make the purest hemp products. If they weren't
            the best, we wouldn't sell them.
          </p>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">
              Our Mission
            </h2>
            <p className="mt-6 text-lg text-slate leading-relaxed">
              We believe wellness should be pure, transparent, and accessible
              for everyone, including your furry family members. Too many
              CBD brands cut corners, obscure their lab results, or ignore
              quality for profit. We're different.
            </p>
            <p className="mt-4 text-lg text-slate leading-relaxed">
              OceanaHemp exists to set the standard: organically farmed,
              rigorously tested, honestly labeled CBD products that actually
              work. So you can feel the difference nature
              intended.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-8">
            <div className="text-center bg-ocean-foam rounded-2xl p-8 hover:shadow-card-hover transition-shadow duration-300">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="font-heading text-xl font-bold text-ocean-deep">
                Purity
              </h3>
              <p className="mt-2 text-slate text-sm leading-relaxed">
                No fillers. No synthetics. Only what nature intended.
                tested by independent labs.
              </p>
            </div>
            <div className="text-center bg-ocean-foam rounded-2xl p-8 hover:shadow-card-hover transition-shadow duration-300">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="font-heading text-xl font-bold text-ocean-deep">
                Transparency
              </h3>
              <p className="mt-2 text-slate text-sm leading-relaxed">
                Every batch tested. Every ingredient disclosed. Scan the QR
                code and see for yourself.
              </p>
            </div>
            <div className="text-center bg-ocean-foam rounded-2xl p-8 hover:shadow-card-hover transition-shadow duration-300">
              <div className="text-4xl mb-4">🐾</div>
              <h3 className="font-heading text-xl font-bold text-ocean-deep">
                Wellness for All
              </h3>
              <p className="mt-2 text-slate text-sm leading-relaxed">
                Your two-legged and four-legged family deserve the same
                quality and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-16 lg:py-24 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">
              Our Values
            </h2>
            <p className="mt-3 text-slate text-lg max-w-2xl mx-auto">
              Five pillars that guide every product, every decision, every
              day.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="text-5xl mb-4">{value.emoji}</div>
                <h3 className="font-heading text-xl font-bold text-ocean-deep">
                  {value.title}
                </h3>
                <p className="mt-3 text-slate text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SUSTAINABILITY ─── */}
      <section id="sustainability" className="py-16 lg:py-24 bg-ocean-foam">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">
              Sustainability
            </h2>
            <p className="mt-3 text-slate text-lg max-w-2xl mx-auto">
              Our commitment to the planet is as deep as the ocean. Every
              step of our process is designed to protect the world we all
              share.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {sustainabilityPractices.map((practice) => (
              <div
                key={practice.title}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 flex gap-5 items-start"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-ocean-foam flex items-center justify-center">
                  {practice.icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-ocean-deep">
                    {practice.title}
                  </h3>
                  <p className="mt-2 text-slate text-sm leading-relaxed">
                    {practice.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="py-16 lg:py-24 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">
              The People Behind the Brand
            </h2>
            <p className="mt-3 text-slate text-lg max-w-2xl mx-auto">
              No corporate board, no investors calling the shots. Just one
              person who stakes their name on every bottle.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ocean-mid to-hemp-green flex items-center justify-center mx-auto mb-5 text-white font-heading text-2xl font-bold">
                  {member.initials}
                </div>
                <h3 className="font-heading text-xl font-bold text-ocean-deep">
                  {member.name}
                </h3>
                <p className="text-ocean-mid font-medium text-sm mt-1">
                  {member.role}
                </p>
                <p className="mt-4 text-slate text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Join the OceanaHemp Family
          </h2>
          <p className="mt-4 text-white/80 text-lg leading-relaxed">
            Ready to experience CBD the way nature intended? Discover the
            difference purity makes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-white text-ocean-deep hover:bg-ocean-foam font-semibold text-base px-8"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/quiz">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8"
              >
                Find Your CBD
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}