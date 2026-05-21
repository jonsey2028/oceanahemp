import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CBD Dosage Guide: How Much CBD Should You Take? | OceanaHemp",
  description:
    "Learn how to find your ideal CBD dose based on body weight, desired effect, and experience level. Expert dosing recommendations from OceanaHemp.",
};

const dosingTable = [
  { weight: "Under 60 lbs", low: "4-6 mg", medium: "8-12 mg", high: "15-20 mg" },
  { weight: "60-90 lbs", low: "6-10 mg", medium: "12-18 mg", high: "20-30 mg" },
  { weight: "90-130 lbs", low: "10-15 mg", medium: "18-25 mg", high: "30-50 mg" },
  { weight: "130-180 lbs", low: "15-20 mg", medium: "25-40 mg", high: "50-70 mg" },
  { weight: "Over 180 lbs", low: "20-30 mg", medium: "40-60 mg", high: "70-100 mg" },
];

export default function DosageGuidePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green wave-divider">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            CBD Dosage Guide
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            No guesswork. A science-based approach to finding your ideal CBD dose.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>The Golden Rule: Start Low, Go Slow</h2>
            <p>
              Every person's endocannabinoid system is different. Your ideal dose depends on your body weight, metabolism, the <strong>condition you're targeting</strong>, and the <strong>form of CBD</strong> you're using. There's no universal dose, but there is a universal starting point.
            </p>
            <p>
              <strong>Start low:</strong> Begin with the smallest effective dose and increase gradually until you feel the benefits.
              <strong>Go slow:</strong> Wait at least <strong>five days</strong> between increases. Your ECS needs time to adjust.
            </p>

            <h2>Standard CBD Dosing Table</h2>
            <p>
              Use your body weight and desired intensity to find a starting range:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-ocean-mid text-white">
                    <th className="px-4 py-3 text-left">Body Weight</th>
                    <th className="px-4 py-3 text-left">Gentle (daily wellness)</th>
                    <th className="px-4 py-3 text-left">Moderate (stress, sleep)</th>
                    <th className="px-4 py-3 text-left">Strong (recovery, discomfort)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {dosingTable.map((row) => (
                    <tr key={row.weight} className="hover:bg-ocean-foam">
                      <td className="px-4 py-3 font-medium">{row.weight}</td>
                      <td className="px-4 py-3">{row.low}</td>
                      <td className="px-4 py-3">{row.medium}</td>
                      <td className="px-4 py-3">{row.high}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Product-Specific Guidance</h2>

            <h3>Pet Tincture (Small Breed - 300mg / 1oz)</h3>
            <p>Each mL contains ~10mg CBD.</p>
            <ul>
              <li>Under 10 lbs: 0.25 mL (2.5 mg)</li>
              <li>10-25 lbs: 0.5 mL (5 mg)</li>
              <li>25-40 lbs: 1 mL (10 mg)</li>
            </ul>

            <h3>Pet Tincture (Medium/Large Breed - 600mg-1000mg)</h3>
            <p>Each mL contains ~20-33mg CBD.</p>
            <ul>
              <li>40-60 lbs: 0.5 mL (10-16 mg)</li>
              <li>60-90 lbs: 1 mL (20-33 mg)</li>
              <li>90+ lbs: 1.5 mL (30-50 mg)</li>
            </ul>

            <h2>When Will You Feel It?</h2>
            <p>
              <strong>Tinctures:</strong> Effects typically felt within 15-45 minutes when taken sublingually (under the tongue). Swallowed doses may take 60-90 minutes.
            </p>
            <p>
              <strong>Topicals (massage oil):</strong> Localized relief usually begins within 10-20 minutes of application. Best for muscle/joint targets, not systemic effects.
            </p>
            <p>
              <strong>Face spray:</strong> Skin absorption effects (calm, reduced redness) build over 2-4 weeks with consistent use. Immediate benefit is hydration.
            </p>

            <h2>Tips for Best Results</h2>
            <ul>
              <li>Take sublingually. Hold for 60 seconds before swallowing.</li>
              <li>Take with food for better absorption (especially fatty foods).</li>
              <li>Be consistent. CBD builds cumulative effects over 2-4 weeks.</li>
              <li>Do your last dose 1-2 hours before bed for sleep support.</li>
            </ul>

            <p>
              Questions? Contact us at <a href="mailto:hello@oceanahemp.com">hello@oceanahemp.com</a> and we'll help you find your ideal dose.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
