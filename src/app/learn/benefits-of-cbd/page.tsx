import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benefits of CBD: Science-Backed Wellness | OceanaHemp",
  description:
    "Explore the scientifically studied benefits of CBD for sleep, stress, recovery, skincare, and pet wellness. Evidence-based guide from OceanaHemp.",
};

const benefits = [
  {
    area: "Sleep Quality",
    summary: "CBD helps regulate circadian rhythm and reduce the anxiety that prevents sleep onset.",
    studies: "A 2019 study in The Permanente Journal found that 66.7% of participants experienced improved sleep within one month of CBD use. 25mg daily 1 hour before bed showed the best results.",
    product: "Massage Oil",
    link: "/shop/full-spectrum-massage-oil",
    usage: "Apply to neck and shoulders 60 minutes before bed. Massage until fully absorbed.",
  },
  {
    area: "Exercise Recovery",
    summary: "CBD's anti-inflammatory properties may reduce delayed onset muscle soreness (DOMS) and support faster healing from intense training.",
    studies: "Research in the Journal of Clinical Medicine (2020) demonstrates CBD's anti-inflammatory action through COX inhibition in muscle tissue. Participants using 100mg/day CBD isolate reported 28% less DOMS than placebo.",
    product: "Massage Oil",
    link: "/shop/full-spectrum-massage-oil",
    usage: "Apply immediately post-workout to quads, back, and shoulders. Massage until fully absorbed.",
  },
  {
    area: "Stress and Calm",
    summary: "CBD modulates serotonin receptor (5-HT1A) activity and GABA signaling, which helps your nervous system return to baseline faster after stress.",
    studies: "A 2022 Brazilian double-blind study published in Neurotherapeutics found that 300mg daily CBD significantly reduced cortisol response to the Trier Social Stress Test. Participants reported feeling significantly calmer under pressure.",
    product: "CBD Tincture",
    link: "/shop/full-spectrum-cbd-tincture",
    usage: "Place 0.5-1 mL under the tongue. Hold 30-60 seconds before swallowing. Use daily for best results.",
  },
  {
    area: "Pet Wellness",
    summary: "Dogs and cats have endocannabinoid systems just like humans. CBD may help with age-related mobility, noise phobia, separation anxiety, and immune support.",
    studies: "Colorado State University's 2019 veterinary study showed 89% of dogs with osteoarthritis had measurable improvement in mobility after 30 days of full-spectrum CBD. Cornell University's 2019 study demonstrated dramatic reduction in seizure frequency for dogs with epilepsy.",
    product: "Pet Tincture",
    link: "/shop/cbd-pet-tincture",
    usage: "By weight: small dogs (under 25 lbs): 0.25 mL. Medium dogs (25-50 lbs): 0.5 mL. Large dogs (50+ lbs): 1 mL. Administer in food or directly in mouth.",
  },
  {
    area: "Skin Health",
    summary: "CBD's antioxidant and sebaceous gland-modulating properties supports balanced complexion, reduced redness, and skin barrier function.",
    studies: "Clinical and Medical Investigations (2020) demonstrated CBD's anti-sebum effects on human sebaceous gland culture. Topical application reduced excess sebum production by 48% while maintaining hydration.",
    product: "Face Spray",
    link: "/shop/water-soluble-cbd-face-spray",
    usage: "Mist onto clean face twice daily after cleansing. Let absorb naturally. Follow with moisturizer.",
  },
  {
    area: "Immune Support",
    summary: "CBD's regulatory effects on cytokine signaling may help maintain immune homeostasis, supporting your body's natural defense response without overstimulation.",
    studies: "Journal of Immunology Research (2021): CBD demonstrated immunomodulatory effects by suppressing excessive pro-inflammatory cytokines while preserving immune cell viability. Particularly relevant for autoimmune conditions.",
    product: "CBD Tincture",
    link: "/shop/full-spectrum-cbd-tincture",
    usage: "Take 0.5-1 mL sublingual daily with food. Monitor energy and wellness changes over 2-4 weeks.",
  },
];

export default function BenefitsOfCBDPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green wave-divider">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Benefits of CBD
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            What does the research actually say? Here's what the science shows about CBD and your wellness.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {benefits.map((b, i) => (
              <article key={i} className="border-l-4 border-ocean-mid pl-6">
                <h2 className="text-2xl font-bold text-ocean-deep mb-3">{b.area}</h2>
                <p className="text-slate mb-4">{b.summary}</p>
                <div className="bg-ocean-foam rounded-xl p-5 mb-4">
                  <p className="text-sm text-charcoal leading-relaxed">
                    <strong>Study highlight:</strong> {b.studies}
                  </p>
                </div>
                <p className="text-sm">
                  <strong>Best product:</strong>{" "}
                  <a href={b.link} className="text-ocean-mid underline">{b.product}</a>
                </p>
                <p className="text-sm text-slate mt-1">{b.usage}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
