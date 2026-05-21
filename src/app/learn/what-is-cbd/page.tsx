import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is CBD? A Beginner's Guide to Cannabidiol | OceanaHemp",
  description:
    "Learn what CBD is, how it works with your endocannabinoid system, and why millions use it for natural wellness. Science-backed guide from OceanaHemp.",
};

export default function WhatIsCBDPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green wave-divider">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            What is CBD?
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            The science-backed beginner's guide to cannabidiol, your endocannabinoid system, and how CBD actually works.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>What Is CBD?</h2>
            <p>
              CBD (<strong>cannabidiol</strong>) is a naturally occurring compound found in the hemp plant. It is one of over 100 cannabinoids, but unlike THC (tetrahydrocannabinol), CBD is <strong>non-psychoactive</strong>, meaning it will not get you high.
            </p>

            <p>
              CBD interacts with your body's <strong>endocannabinoid system (ECS)</strong>, a vast network of receptors that helps regulate mood, sleep, pain, immune response, and stress. Your body naturally produces endocannabinoids. CBD simply helps your ECS function more effectively by preventing the breakdown of your own endocannabinoids and supporting receptor signaling.
            </p>

            <h2>Where Does CBD Come From?</h2>
            <p>
              CBD is extracted from the flowers, leaves, and stems of <em>Cannabis sativa</em> plants that contain less than 0.3% THC, classified as <strong>industrial hemp</strong> under the 2018 Farm Bill. At OceanaHemp, we use only organically grown, USA-sourced hemp.
            </p>

            <h2>What Does CBD Actually Do?</h2>
            <p>
              Research shows CBD may support:
            </p>
            <ul>
              <li><strong>Stress and anxiousness</strong> — by modulating serotonin receptors and calming overactive neural signals</li>
              <li><strong>Sleep quality</strong> — by promoting the endocannabinoids that regulate circadian rhythm</li>
              <li><strong>Exercise recovery</strong> — through CB2 receptor modulation in muscle and joint tissue</li>
              <li><strong>Skin health</strong> — via CB1 receptors in sebaceous glands and anti-inflammatory pathways</li>
            </ul>

            <h2>Is CBD Safe?</h2>
            <p>
              The World Health Organization states that CBD exhibits <strong>no effects indicative of abuse or dependence potential</strong> and is generally well tolerated. Side effects, when they occur, are typically mild: dry mouth, drowsiness, or appetite changes. Always consult your physician before starting any new supplement, especially if you take other medications.
            </p>

            <h2>How Should I Take CBD?</h2>
            <p>
              The most common methods are:
            </p>
            <ul>
              <li><strong>tinctures</strong> — administered under the tongue for fast absorption through sublingual capillaries</li>
              <li><strong>topicals</strong> — applied directly to skin for localized relief</li>
              <li><strong>edibles</strong> — slower onset but longer duration, though we do not currently offer these</li>
            </ul>

            <h2>Will CBD Show Up on a Drug Test?</h2>
            <p>
              Pure CBD isolate products that contain zero THC will not trigger a positive result. However, <strong>full-spectrum</strong> products contain trace amounts of THC (less than 0.3%). While these levels are federally legal and unlikely to cause a positive at standard doses, it is technically possible with very high daily intake. If drug testing is a concern, choose a CBD isolate or broad-spectrum product, or speak with your employer.
            </p>

            <p>
              Our <a href="https://oceanahemp.com/shop">elite pet tincture</a>, <a href="https://oceanahemp.com/shop">face spray</a>, and <a href="https://oceanahemp.com/shop">massage oil</a> are all independently lab-tested, so you know exactly what is in every bottle.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
