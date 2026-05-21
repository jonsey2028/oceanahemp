import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CBD for Skincare: Benefits & Science | OceanaHemp",
  description:
    "How water-soluble CBD face spray supports skin health, reduces redness, and provides daily hydration. Science-based guide with usage tips.",
};

export default function CBDForSkincarePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green wave-divider">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            CBD for Skincare
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            How water-soluble CBD face spray supports skin health, reduces redness, and provides daily hydration.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>How Does CBD Work on Skin?</h2>
            <p>
              Your skin is densely packed with CB1 and CB2 receptors in sebaceous glands, epidermal keratinocytes, and immune cells in the dermis. CBD interacts with these receptors to regulate sebum production, calm inflammatory signaling, and support the skin barrier.
            </p>
            <ul>
              <li><strong>Sebum regulation:</strong> CBD inhibits lipogenesis in sebaceous glands without drying out the skin.</li>
              <li><strong>Antioxidant protection:</strong> CBD neutralizes free radicals that cause premature aging.</li>
              <li><strong>Barrier support:</strong> CBD promotes ceramide production, strengthening the moisture barrier.</li>
              <li><strong>Calming:</strong> CBD modulates TRPV1 receptors, reducing irritation and redness.</li>
            </ul>

            <h2>Water-Soluble vs Oil-Based CBD Skincare</h2>
            <p>Traditional CBD skincare uses oil-based formulations. Water-soluble CBD is:</p>
            <ul>
              <li><strong>Better absorbed:</strong> Water-soluble cannabinoids penetrate the stratum corneum 3-4x better than oil-based formulations.</li>
              <li><strong>Non-greasy:</strong> Ideal for face use, under makeup, or layering with other products.</li>
              <li><strong>More stable:</strong> Water-soluble CBD resists oxidation better than lipid-suspended extracts.</li>
              <li><strong>Precise dosing:</strong> Each spritz delivers consistent cannabinoids per area.</li>
            </ul>

            <h2>Who Should Use a CBD Face Spray?</h2>
            <ul>
              <li>People with oily or combination skin needing balance without stripping</li>
              <li>Anyone experiencing stress-induced breakouts (CBD calms the cortisol-acne axis)</li>
              <li>People in dry climates needing lightweight, consistent hydration</li>
              <li>Athletes or outdoor workers exposed to environmental stressors</li>
              <li>Anyone wanting a midday skin refresh that also calms the mind</li>
            </ul>

            <h2>How to Use OceanaHemp Face Spray</h2>
            <ol>
              <li>Cleanse your face with your regular cleanser. Pat dry.</li>
              <li>Hold bottle 6-8 inches from face. Close eyes.</li>
              <li>Spritz 2-3 times: once on forehead, once on each cheek.</li>
              <li>Let absorb for 60 seconds before applying moisturizer or makeup.</li>
              <li>Use morning, night, and any midday skin reset.</li>
            </ol>

            <p>
              <a href="/shop/water-soluble-cbd-face-spray">View our water-soluble CBD face spray →</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
