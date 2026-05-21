import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div>
      <section className="bg-ocean-foam wave-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ocean-deep">
            Privacy Policy
          </h1>
          <p className="mt-2 text-slate text-lg">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate leading-relaxed mb-6">
            OceanaHemp respects your privacy. This policy explains what information we collect, how we use it, and your rights.
          </p>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate">
            <li>Contact information (name, email, phone) when you place an order or contact us</li>
            <li>Shipping and billing addresses</li>
            <li>Order history and preferences</li>
            <li>Website usage data (cookies, IP address, browser type)</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate">
            <li>Process and fulfill your orders</li>
            <li>Communicate about orders, shipping, and support</li>
            <li>Send promotional emails (with opt-out option)</li>
            <li>Improve our website and products</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            Data Sharing
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            We do not sell your personal information. We share data only with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate">
            <li>Payment processors (to complete transactions)</li>
            <li>Shipping carriers (to deliver orders)</li>
            <li>Service providers who help us operate our business</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            Cookies
          </h2>
          <p className="text-slate leading-relaxed">
            We use cookies for cart functionality, analytics, and personalization. You can disable cookies in your browser settings, but some site features may not work properly.
          </p>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            Your Rights
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate">
            <li>Access the personal information we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Opt out of marketing communications</li>
            <li>Request a copy of your data</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold text-ocean-deep mt-10 mb-4">
            Contact Us
          </h2>
          <p className="text-slate leading-relaxed">
            For privacy questions or data requests, email us at{" "}
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
