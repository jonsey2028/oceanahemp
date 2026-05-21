import Link from "next/link";

export default function TermsPage() {
  return (
    <div>
      <section className="bg-ocean-foam wave-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ocean-deep">
            Terms of Service
          </h1>
          <p className="mt-2 text-slate text-lg">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate leading-relaxed mb-6">
            These Terms of Service govern your use of the OceanaHemp website and purchase of our products. By accessing or using our site, you agree to these terms.
          </p>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            Use of the Site
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            You must be at least 18 years old to use this site or purchase our products. You agree to provide accurate, current, and complete information during registration or checkout.
          </p>
          <p className="text-slate leading-relaxed">
            You may not use our site for any unlawful purpose, interfere with its operation, or attempt to gain unauthorized access to any part of our systems.
          </p>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            Product Information
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            All products contain hemp-derived CBD with less than 0.3% THC, compliant with the 2018 Farm Bill. Product descriptions, ingredients, and lab results are provided for informational purposes.
          </p>
          <p className="text-slate leading-relaxed">
            These statements have not been evaluated by the Food and Drug Administration. Our products are not intended to diagnose, treat, cure, or prevent any disease.
          </p>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            Orders and Payment
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            All prices are in U.S. dollars. We reserve the right to refuse or cancel orders for any reason, including product availability, errors in pricing, or suspected fraud.
          </p>
          <p className="text-slate leading-relaxed">
            Payment is processed securely through our payment partners. We do not store full credit card numbers on our servers.
          </p>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            Shipping and Returns
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            We ship to all 50 U.S. states. Orders over $75 qualify for free standard shipping. Delivery estimates are provided at checkout.
          </p>
          <p className="text-slate leading-relaxed">
            We offer a 60-day satisfaction guarantee. If you are not satisfied, contact us for a full refund or exchange. Return shipping costs may apply unless the product is defective.
          </p>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            Intellectual Property
          </h2>
          <p className="text-slate leading-relaxed">
            All content on this site, including text, images, logos, and designs, is the property of OceanaHemp and protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.
          </p>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            Limitation of Liability
          </h2>
          <p className="text-slate leading-relaxed">
            OceanaHemp is not liable for any indirect, incidental, or consequential damages arising from your use of our site or products. Our total liability shall not exceed the amount you paid for the specific product giving rise to the claim.
          </p>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            Changes to These Terms
          </h2>
          <p className="text-slate leading-relaxed">
            We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.
          </p>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            Contact
          </h2>
          <p className="text-slate leading-relaxed">
            Questions about these terms? Email{" "}
            <a href="mailto:hello@oceanahemp.com" className="text-ocean-mid underline">
              hello@oceanahemp.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
