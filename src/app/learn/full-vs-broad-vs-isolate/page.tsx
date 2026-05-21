import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full vs Broad Spectrum vs Isolate Explained | OceanaHemp",
  description:
    "Full spectrum, broad spectrum, or CBD isolate? Understand the critical differences and choose the CBD type that matches your wellness goals.",
};

export default function SpectrumExplainedPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green wave-divider">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Extract Types Explained
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Full spectrum vs broad spectrum vs isolate: Choose the type that matches your goals (and your employer).
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>The Quick Answer</h2>
            <p>
              CBD products are categorized by what else is in the extract besides CBD. Think of it like choosing between whole wheat (full spectrum), white bread (broad spectrum), or pure gluten isolate (isolate, terrible bread).
            </p>

            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-ocean-mid text-white">
                  <th className="px-3 py-2 text-left"></th>
                  <th className="px-3 py-2 text-left">Full Spectrum</th>
                  <th className="px-3 py-2 text-left">Broad Spectrum</th>
                  <th className="px-3 py-2 text-left">Isolate</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-3 py-2 font-medium">CBD</td>
                  <td className="px-3 py-2">✅ Yes</td>
                  <td className="px-3 py-2">✅ Yes</td>
                  <td className="px-3 py-2">✅ Yes (only CBD)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">THC</td>
                  <td className="px-3 py-2">✅ &lt;0.3% (legal trace amounts)</td>
                  <td className="px-3 py-2">❌ Removed</td>
                  <td className="px-3 py-2">❌ Removed</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Other Cannabinoids</td>
                  <td className="px-3 py-2">✅ CBG, CBN, CBC, terpenes, flavonoids</td>
                  <td className="px-3 py-2">✅ Other cannabinoids, no THC</td>
                  <td className="px-3 py-2">❌ Removed</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Entourage Effect</td>
                  <td className="px-3 py-2">✅ Strongest</td>
                  <td className="px-3 py-2">✅ Moderate</td>
                  <td className="px-3 py-2">❌ None</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Drug Test Risk</td>
                  <td className="px-3 py-2">⚠️ Possible (trace THC)</td>
                  <td className="px-3 py-2">✅ Very low to none</td>
                  <td className="px-3 py-2">✅ Zero</td>
                </tr>
              </tbody>
            </table>

            <h2>Full Spectrum: The Whole Plant</h2>
            <p>
              Full spectrum extract contains everything the hemp plant produces: CBD, trace THC (&lt;0.3%), minor cannabinoids (CBG, CBN, CBC), terpenes, and flavonoids. Together, these compounds create the 
              <strong>entourage effect</strong>, where each ingredient amplifies the others.
            </p>
            <p>
              <strong>Best for:</strong> Maximum therapeutic effect, people without regular drug testing, those who tolerate THC well.
            </p>
            <p>
              <strong>OceanaHemp products:</strong> Our <a href="/shop/cbd-pet-tincture">pet tincture</a> and <a href="/shop/full-spectrum-massage-oil">massage oil</a> are full spectrum.
            </p>

            <h2>Broad Spectrum: Everything But THC</h2>
            <p>
              Broad spectrum starts as full spectrum, but THC is chemically removed using chromatography (usually HPLC). You still get CBD, minor cannabinoids, and terpenes, just without trace THC.
            </p>
            <p>
              <strong>Best for:</strong> People with drug testing concerns who still want cannabinoid synergy.
            </p>

            <h2>Isolate: Pure CBD Only</h2>
            <p>
              Isolate is 99%+ pure CBD, crystallized and refined into a white powder. Everything else is removed. There is no entourage effect, but it is predictable, flavorless, and carries exactly zero drug test risk.
            </p>
            <p>
              <strong>Best for:</strong> Professionals undergoing regular drug testing, people with THC sensitivity, those wanting precise dose control.
            </p>

            <h2>How We Extract at OceanaHemp</h2>
            <p>
              We use <strong>CO₂ supercritical fluid extraction</strong>, the gold standard. This method:
            </p>
            <ul>
              <li>Avoids toxic solvents (no ethanol, no butane)</li>
              <li>Runs cold, preserving heat-sensitive terpenes</li>
              <li>Is precisely tunable to target specific compounds</li>
              <li>Is FDA-approved for food-grade extraction</li>
            </ul>

            <p>Every batch is tested by an independent third-party lab for cannabinoid profile, terpenes, pesticides, heavy metals, residual solvents, and microbial contamination. Scan the QR code on any OceanaHemp product to see the COA (Certificate of Analysis).</p>
          </div>
        </div>
      </section>
    </div>
  );
}
