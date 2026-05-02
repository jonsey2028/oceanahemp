"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Step configs ─── */
const goals = [
  { label: "Pain Relief", emoji: "💪" },
  { label: "Stress & Calm", emoji: "😌" },
  { label: "Better Sleep", emoji: "😴" },
  { label: "Skincare", emoji: "✨" },
  { label: "General Wellness", emoji: "🌿" },
];

const experienceLevels = [
  { label: "Complete Beginner", description: "I've never tried CBD before" },
  { label: "Some Experience", description: "I've tried CBD a few times" },
  { label: "Regular User", description: "CBD is part of my daily routine" },
];

const forms = [
  { label: "Massage Oil", emoji: "💧" },
  { label: "Face Spray", emoji: "🌊" },
  { label: "No Preference", emoji: "🤷" },
];

const preferences = [
  { label: "Natural Flavor", emoji: "🌿" },
  { label: "Fastest Results", emoji: "⚡" },
  { label: "Travel-Friendly", emoji: "✈️" },
  { label: "Best Value", emoji: "💰" },
];

type ResultInfo = {
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  href: string;
  features: string[];
};

function getResult(goal: string): ResultInfo {
  if (goal === "Stress & Calm" || goal === "General Wellness") {
    return {
      name: "Full Spectrum Massage Oil",
      tagline: "Melt away tension naturally",
      description:
        "Full spectrum CBD massage oil crafted from organically grown hemp. Absorbs deep into tired muscles so you can finally unwind. No synthetic ingredients, no fillers — just pure relief.",
      emoji: "🧘",
      href: "/shop/full-spectrum-massage-oil",
      features: [
        "Full spectrum CBD",
        "Organic botanicals",
        "Deep muscle relief",
        "3rd party lab tested",
      ],
    };
  }
  return {
    name: "Water-Soluble CBD Face Spray",
    tagline: "Your skin deserves better",
    description:
      "A refreshing face mist that actually does something. Water-soluble CBD delivers cannabinoids where your skin needs them most — no greasy residue, no heavy feel, no nonsense.",
    emoji: "✨",
    href: "/shop/water-soluble-cbd-face-spray",
    features: [
      "Water-soluble CBD",
      "Hyaluronic acid & vitamin C",
      "Non-greasy formula",
      "3rd party lab tested",
    ],
  };
}

const TOTAL_STEPS = 4;

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [form, setForm] = useState("");
  const [preference, setPreference] = useState("");
  const [showResult, setShowResult] = useState(false);

  const progress = step === 0 ? 0 : (step / TOTAL_STEPS) * 100;

  function handleGoalSelect(value: string) {
    setGoal(value);
    setStep(1);
  }

  function handleExperienceSelect(value: string) {
    setExperience(value);
    setStep(2);
  }

  function handleFormSelect(value: string) {
    setForm(value);
    setStep(3);
  }

  function handlePreferenceSelect(value: string) {
    setPreference(value);
    setStep(4);
    setShowResult(true);
  }

  function handleRetake() {
    setStep(0);
    setGoal("");
    setExperience("");
    setForm("");
    setPreference("");
    setShowResult(false);
  }

  const result = getResult(goal);

  return (
    <div className="min-h-[80vh]">
      {/* ─── HERO ─── */}
      {!showResult && (
        <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white leading-tight">
              Find Your Perfect CBD
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Answer 4 quick questions and we'll recommend the best product
              for your needs.
            </p>
          </div>
        </section>
      )}

      {/* ─── MAIN QUIZ AREA ─── */}
      <section className="py-12 lg:py-20 bg-ocean-foam">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress bar */}
          {!showResult && (
            <div className="mb-10">
              <div className="flex items-center justify-between text-sm text-slate mb-2">
                <span>
                  Step {step === 0 ? 1 : step} of {TOTAL_STEPS}
                </span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-ocean-mid to-hemp-green rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* ─── STEP 1: Goal ─── */}
          {step === 0 && (
            <div className="animate-[fadeIn_0.4s_ease-out]">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ocean-deep text-center mb-2">
                What are you looking for?
              </h2>
              <p className="text-slate text-center mb-8">
                Select the wellness goal that matters most to you.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {goals.map((g) => (
                  <button
                    key={g.label}
                    onClick={() => handleGoalSelect(g.label)}
                    className="flex items-center gap-4 bg-white p-5 rounded-xl border-2 border-transparent shadow-card hover:shadow-card-hover hover:border-ocean-mid hover:-translate-y-0.5 transition-all duration-200 text-left"
                  >
                    <span className="text-3xl">{g.emoji}</span>
                    <span className="font-heading text-lg font-bold text-ocean-deep">
                      {g.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── STEP 2: Experience ─── */}
          {step === 1 && (
            <div className="animate-[fadeIn_0.4s_ease-out]">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ocean-deep text-center mb-2">
                What's your CBD experience level?
              </h2>
              <p className="text-slate text-center mb-8">
                We'll tailor our recommendation based on your familiarity
                with CBD.
              </p>
              <div className="space-y-4">
                {experienceLevels.map((level) => (
                  <button
                    key={level.label}
                    onClick={() => handleExperienceSelect(level.label)}
                    className="w-full flex items-center gap-4 bg-white p-6 rounded-xl border-2 border-transparent shadow-card hover:shadow-card-hover hover:border-ocean-mid hover:-translate-y-0.5 transition-all duration-200 text-left"
                  >
                    <div className="w-3 h-3 rounded-full bg-ocean-mid shrink-0" />
                    <div>
                      <span className="font-heading text-lg font-bold text-ocean-deep block">
                        {level.label}
                      </span>
                      <span className="text-slate text-sm">
                        {level.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(0)}
                className="mt-6 text-ocean-mid font-medium text-sm hover:text-ocean-deep transition-colors"
              >
                &larr; Back
              </button>
            </div>
          )}

          {/* ─── STEP 3: Form ─── */}
          {step === 2 && (
            <div className="animate-[fadeIn_0.4s_ease-out]">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ocean-deep text-center mb-2">
                What form do you prefer?
              </h2>
              <p className="text-slate text-center mb-8">
                Choose how you'd like to take your CBD — or tell us you
                don't mind.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {forms.map((f) => (
                  <button
                    key={f.label}
                    onClick={() => handleFormSelect(f.label)}
                    className="flex items-center gap-4 bg-white p-5 rounded-xl border-2 border-transparent shadow-card hover:shadow-card-hover hover:border-ocean-mid hover:-translate-y-0.5 transition-all duration-200 text-left"
                  >
                    <span className="text-3xl">{f.emoji}</span>
                    <span className="font-heading text-lg font-bold text-ocean-deep">
                      {f.label}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="mt-6 text-ocean-mid font-medium text-sm hover:text-ocean-deep transition-colors"
              >
                &larr; Back
              </button>
            </div>
          )}

          {/* ─── STEP 4: Preference ─── */}
          {step === 3 && (
            <div className="animate-[fadeIn_0.4s_ease-out]">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ocean-deep text-center mb-2">
                What matters most to you?
              </h2>
              <p className="text-slate text-center mb-8">
                One last question — pick the factor that's most important
                in your CBD.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {preferences.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => handlePreferenceSelect(p.label)}
                    className="flex items-center gap-4 bg-white p-5 rounded-xl border-2 border-transparent shadow-card hover:shadow-card-hover hover:border-ocean-mid hover:-translate-y-0.5 transition-all duration-200 text-left"
                  >
                    <span className="text-3xl">{p.emoji}</span>
                    <span className="font-heading text-lg font-bold text-ocean-deep">
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-6 text-ocean-mid font-medium text-sm hover:text-ocean-deep transition-colors"
              >
                &larr; Back
              </button>
            </div>
          )}

          {/* ─── RESULTS ─── */}
          {showResult && (
            <div className="animate-[fadeIn_0.5s_ease-out] text-center">
              <p className="text-sm font-semibold text-ocean-mid tracking-widest uppercase mb-3">
                Your Personalized Recommendation
              </p>
              <div className="bg-white rounded-2xl shadow-card-hover overflow-hidden">
                {/* Result header */}
                <div className="bg-gradient-to-br from-ocean-deep to-hemp-green p-8 text-white">
                  <span className="text-6xl block mb-4">{result.emoji}</span>
                  <h2 className="font-heading text-3xl font-bold">
                    {result.name}
                  </h2>
                  <p className="mt-2 text-white/80 text-lg">
                    {result.tagline}
                  </p>
                </div>

                {/* Result body */}
                <div className="p-8 space-y-6 text-left">
                  <p className="text-slate leading-relaxed">
                    {result.description}
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-2">
                    {result.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1.5 bg-ocean-foam text-ocean-deep text-sm font-medium rounded-full px-3 py-1.5"
                      >
                        ✓ {feature}
                      </span>
                    ))}
                  </div>

                  {/* Summary of answers */}
                  <div className="bg-sand rounded-xl p-5 text-sm">
                    <p className="font-semibold text-charcoal mb-2">
                      Based on your answers:
                    </p>
                    <ul className="text-slate space-y-1">
                      <li>
                        Goal:{" "}
                        <span className="font-medium text-charcoal">
                          {goal}
                        </span>
                      </li>
                      <li>
                        Experience:{" "}
                        <span className="font-medium text-charcoal">
                          {experience}
                        </span>
                      </li>
                      <li>
                        Preferred form:{" "}
                        <span className="font-medium text-charcoal">
                          {form}
                        </span>
                      </li>
                      <li>
                        Priority:{" "}
                        <span className="font-medium text-charcoal">
                          {preference}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-8 pb-8 flex flex-col sm:flex-row gap-4">
                  <Link href={result.href} className="flex-1">
                    <Button
                      size="lg"
                      className="w-full bg-ocean-mid hover:bg-ocean-deep text-white font-bold text-base h-14"
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Shop Now
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleRetake}
                    className="flex-1 border-ocean-mid text-ocean-mid hover:bg-ocean-foam font-semibold text-base h-14"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retake Quiz
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}