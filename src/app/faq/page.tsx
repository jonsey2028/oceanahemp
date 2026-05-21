import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Is CBD legal?",
    answer:
      "Yes, hemp-derived CBD with less than 0.3% THC is federally legal under the 2018 Farm Bill. All OceanaHemp products comply with this standard.",
  },
  {
    question: "Will CBD get me high?",
    answer:
      "No. Our full spectrum products contain trace amounts of THC (less than 0.3%), which is not enough to produce psychoactive effects. You get the wellness benefits without the high.",
  },
  {
    question: "How do I use CBD oil?",
    answer:
      "Place the recommended number of drops under your tongue, hold for 30-60 seconds, then swallow. This sublingual method allows for faster absorption into your bloodstream.",
  },
  {
    question: "What's the right dose for my pet?",
    answer:
      "Start with 0.25mg per pound of body weight, given twice daily. For a 40 lb dog, that's 10mg (about 0.33 mL of our 300mg tincture). Monitor for 3-5 days, then adjust by 25% as needed. Consult your veterinarian for specific guidance.",
  },
  {
    question: "How soon will I feel results?",
    answer:
      "Many people notice calming effects within 30-60 minutes. For chronic issues like joint discomfort, consistent daily use for 2-4 weeks typically produces the best results.",
  },
  {
    question: "Can I give human CBD to my pet?",
    answer:
      "We strongly recommend using pet-specific CBD products. Our pet tincture is formulated with bacon flavoring and precise dosing for animals. Human CBD products may contain ingredients unsafe for pets.",
  },
  {
    question: "What's your return policy?",
    answer:
      "60-day satisfaction guarantee. If you're not completely satisfied, contact us for a full refund or exchange, no questions asked.",
  },
  {
    question: "Do you ship to all 50 states?",
    answer:
      "Yes, we ship to all 50 U.S. states. Orders over $75 ship free. Most orders arrive within 3-5 business days.",
  },
  {
    question: "Are your products third-party lab tested?",
    answer:
      "Every batch is tested by independent, ISO-certified laboratories. You can view COAs (Certificates of Analysis) on our Lab Results page or scan the QR code on any product.",
  },
];

export default function FAQPage() {
  return (
    <div>
      <section className="bg-ocean-foam wave-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ocean-deep">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-slate text-lg">
            Everything you need to know about OceanaHemp CBD products.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-border overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-ocean-foam transition-colors">
                  <span className="font-semibold text-charcoal pr-4">{faq.question}</span>
                  <span className="shrink-0 text-slate group-open:hidden">
                    <ChevronDown className="h-5 w-5" />
                  </span>
                  <span className="shrink-0 text-slate hidden group-open:block">
                    <ChevronUp className="h-5 w-5" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center bg-ocean-foam rounded-2xl p-8">
            <h2 className="font-heading text-2xl font-bold text-ocean-deep mb-2">
              Still have questions?
            </h2>
            <p className="text-slate mb-6">
              Our team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
            </p>
            <Link href="/contact">
              <span className="inline-block bg-ocean-mid hover:bg-ocean-deep text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Contact Support
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
