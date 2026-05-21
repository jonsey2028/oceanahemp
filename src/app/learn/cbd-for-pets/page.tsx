import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CBD for Pets: Benefits, Dosing & Safety | OceanaHemp",
  description:
    "Guide to CBD for dogs and cats: stress, mobility, immunity, dosing by weight, and what makes OceanaHemp pet tincture different.",
};

const petDosingTable = [
  { weight: "Under 10 lbs", dose: "0.25 mL (approx 2.5 mg)", note: "Start low" },
  { weight: "10-25 lbs", dose: "0.5 mL (approx 5 mg)", note: "Small breed" },
  { weight: "25-50 lbs", dose: "1 mL (approx 20 mg)", note: "Medium breed" },
  { weight: "50-75 lbs", dose: "1.5 mL (approx 30 mg)", note: "Large breed" },
  { weight: "75+ lbs", dose: "2 mL (approx 40+ mg)", note: "Extra large, consult vet" },
  { weight: "Cats (any size)", dose: "0.25 mL (approx 2.5 mg)", note: "Bacon flavor works for cats too" },
];

export default function CBDForPetsPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green wave-divider">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            CBD for Pets
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about giving CBD to your dogs and cats. Dosing, safety, benefits, and what to look for.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>Do Pets Have Endocannabinoid Systems?</h2>
            <p>
              Yes. Dogs, cats, horses, and virtually all mammals have endocannabinoid systems (ECS) just like humans. This means CBD binds to CB1 and CB2 receptors in their bodies and produces effects that are chemically similar to what you experience.
            </p>

            <h2>What Can CBD Help With?</h2>
            <ul>
              <li><strong>Anxiety</strong>: Thunderstorms, fireworks, car rides, separation anxiety, vet visits. CBD modulates serotonin signaling and produces a calming effect in roughly 50-70% of pets.</li>
              <li><strong>Joint mobility</strong>: Age-related stiffness, arthritis, post-surgery recovery. Through CB2 receptor activation in joint tissue, CBD supports reduced inflammation and improved movement.</li>
              <li><strong>Neurological health</strong>: Seizure frequency reduction, cognitive support in aging pets.</li>
              <li><strong>Immune support</strong>: General wellness, appetite stimulation.</li>
              <li><strong>Skin and coat</strong>: CBD topicals for localized skin issues (though our tincture supports coat health systemically).</li>
            </ul>

            <h2>Pet CBD Dosing by Weight</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-ocean-mid text-white">
                    <th className="px-3 py-2 text-left">Weight</th>
                    <th className="px-3 py-2 text-left">Dose (300mg tincture)</th>
                    <th className="px-3 py-2 text-left">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {petDosingTable.map((r) => (
                    <tr key={r.weight} className="hover:bg-ocean-foam">
                      <td className="px-3 py-2 font-medium">{r.weight}</td>
                      <td className="px-3 py-2">{r.dose}</td>
                      <td className="px-3 py-2">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Safety Guidelines</h2>
            <p><strong>DO NOT</strong>:</p>
            <ul>
              <li>Give THC-containing cannabis products to pets. THC is toxic to dogs and cats.</li>
              <li>Use tinctures with xylitol (artificial sweetener). Fatal to dogs in very small amounts.</li>
              <li>Exceed 2 mg/kg body weight per day without veterinary supervision.</li>
              <li>Stop prescribed medications suddenly. Consult your vet first.</li>
            </ul>

            <p><strong>DO</strong>:</p>
            <ul>
              <li>Use full spectrum hemp-derived CBD with &lt;0.3% THC (our pet tincture).</li>
              <li>Start at the lowest dose. Wait a full week before increasing.</li>
              <li>Check with your vet if your pet is on prescription medications.</li>
              <li>Store tinctures in a cool, dark place away from heat and light.</li>
              <li>Shake well before each use.</li>
              <li>Administer directly into the mouth or mix well with a small amount of favorite food.</li>
            </ul>

            <h2>What Makes OceanaHemp Pet Tincture Different?</h2>
            <ul>
              <li><strong>Bacon flavor</strong> that pets actually enjoy (not fight you over)</li>
              <li><strong>Precise dosing</strong> with graduated dropper</li>
              <li><strong>Full spectrum</strong> extract, CO₂ extracted (not ethanol washed)</li>
              <li><strong>USA-grown hemp</strong> from family farms, 3rd party lab tested every batch</li>
              <li><strong>MCT oil carrier</strong> — clean absorption, not seed oils or PEG/suspension agents</li>
              <li><strong>No xylitol, no PEG, no artificial coloring, no preservatives</strong></li>
            </ul>

            <p>
              <a href="/shop/cbd-pet-tincture">View our pet tincture →</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
