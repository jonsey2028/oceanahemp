import Link from "next/link";
import { ArrowRight, Leaf, Droplets, Recycle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    emoji: "💎",
    title: "Purity",
    description:
      "Every drop of our CBD is third-party lab tested for potency and purity. We never use synthetic ingredients, fillers, or harmful additives — just nature at its finest.",
  },
  {
    emoji: "🔍",
    title: "Transparency",
    description:
      "From farm to bottle, we share every detail. Scan any product's QR code for full lab results, sourcing info, and manufacturing practices. No secrets, ever.",
  },
  {
    emoji: "🌱",
    title: "Sustainability",
    description:
      "Our hemp is organically grown on American family farms using regenerative practices. We use biodegradable packaging and offset our carbon footprint with every shipment.",
  },
  {
    emoji: "🤝",
    title: "Compassion",
    description:
      "Wellness isn't just for humans — it's for every member of the family, including your pets. We craft gentle, effective formulas so everyone can thrive naturally.",
  },
];

const sustainabilityPractices = [
  {
    icon: <Leaf className="h-6 w-6 text-hemp-green" />,
    title: "Organic Farming",
    description:
      "100% organically grown hemp on US family farms — no pesticides, no herbicides, no compromise.",
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
    name: "Dr. Marina Torres",
    role: "Founder & CEO",
    bio: "Marine biologist turned CBD advocate. Dr. Torres founded OceanaHemp after seeing the healing potential of hemp while studying coastal ecosystems. She holds a PhD from Scripps Institution of Oceanography.",
    initials: "MT",
  },
  {
    name: "James Calloway",
    role: "Head of Product",
    bio: " Former herbalist with 15 years of botanical extraction experience. James oversees every formula, ensuring each product delivers consistent, efficacious results.",
    initials: "JC",
  },
  {
    name: "Ava Chen",
    role: "Chief Sustainability Officer",
    bio: "Environmental scientist and circular economy expert. Ava ensures OceanaHemp operates with the lightest possible footprint while maximizing positive impact.",
    initials: "AC",
  },
];

const pressLogos = [
  "Wellness Weekly",
  "Green Living Today",
  "Coastal Health Journal",
  "Natural Products Insider",
  "Pet Wellness Magazine",
];

export default function AboutPage() {
  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green wave-divider">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/90 mb-6">
            <Leaf className="h-4 w-4" />
            <span>Est. 2020 · Organically Grown · Lab Tested</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Our Story
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Born from the ocean and rooted in the earth, OceanaHemp was
            founded on a simple belief — everyone deserves access to pure,
            honest, effective CBD wellness.
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
              — for everyone, including your furry family members. Too many
              CBD brands cut corners, obscure their lab results, or ignore
              quality for profit. We're different.
            </p>
            <p className="mt-4 text-lg text-slate leading-relaxed">
              OceanaHemp exists to set the standard: organically farmed,
              rigorously tested, honestly labeled CBD products that actually
              work — so you and your pets can feel the difference nature
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
                No fillers. No synthetics. Only what nature intended —
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
              Four pillars that guide every product, every decision, every
              day.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* ─── PRESS ─── */}
      <section id="press" className="py-16 lg:py-20 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-slate tracking-widest uppercase mb-8">
            As Featured In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {pressLogos.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center h-12 px-6 bg-sand rounded-lg text-slate font-heading font-bold text-lg opacity-60 hover:opacity-100 transition-opacity"
              >
                {name}
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
              Passionate experts united by a love of nature, wellness, and
              honest business.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
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