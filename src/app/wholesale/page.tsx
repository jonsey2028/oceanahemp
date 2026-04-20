'use client';

import { useState } from 'react';
import {
  Building2,
  Mail,
  Phone,
  User,
  Globe,
  FileText,
  CheckCircle2,
  PackageCheck,
  Truck,
  BadgePercent,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const businessTypes = [
  'Retail / Dispensary',
  'Wellness Clinic / Spa',
  'Pharmacy / Drug Store',
  'E-commerce Only',
  'Distributor / Broker',
  'Healthcare Practice',
  'Yoga / Fitness Studio',
  'Pet Store',
  'Other',
];

const benefits = [
  {
    icon: <BadgePercent className="h-6 w-6" />,
    title: 'Wholesale Pricing',
    desc: 'Up to 50% off retail — competitive margins for your business',
  },
  {
    icon: <PackageCheck className="h-6 w-6" />,
    title: 'No Minimum Orders',
    desc: 'Start small with no MOQ — scale at your own pace',
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: 'Free Shipping',
    desc: 'Free expedited shipping on all wholesale orders over $250',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Lab Tested',
    desc: 'Full COAs with every batch — ISO-certified third-party labs',
  },
];

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    ein: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    resaleLicense: '',
    productsInterest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green wave-divider">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/90 mb-6">
            <Building2 className="h-4 w-4" />
            <span>Wholesale Partner Program</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Become a Wholesale Partner
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of retailers and wellness professionals who trust
            OceanaHemp for premium, organically grown CBD products at
            unbeatable wholesale prices.
          </p>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">
              Why Partner with OceanaHemp?
            </h2>
            <p className="mt-3 text-slate text-lg">
              Everything you need to grow your CBD business with confidence
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-ocean-foam rounded-2xl p-6 text-center hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-white flex items-center justify-center text-ocean-mid mb-4">
                  {b.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-ocean-deep">
                  {b.title}
                </h3>
                <p className="mt-2 text-slate text-sm leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section className="py-16 lg:py-24 bg-ocean-foam">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-border shadow-card p-6 sm:p-8 lg:p-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ocean-deep">
              Wholesale Application
            </h2>
            <p className="mt-2 text-slate">
              Fill out the form below and our wholesale team will review your
              application within 2 business days.
            </p>

            {submitted ? (
              <div className="mt-8 flex items-center gap-3 bg-hemp-light border border-hemp-green/20 rounded-xl px-5 py-6">
                <CheckCircle2 className="h-6 w-6 text-hemp-green shrink-0" />
                <div>
                  <p className="font-semibold text-hemp-green text-lg">
                    Application Submitted!
                  </p>
                  <p className="text-slate mt-1">
                    Our wholesale team will review your application and get
                    back to you within 2 business days. Check your email for a
                    confirmation.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Business Info */}
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ocean-deep mb-4 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-ocean-mid" />
                    Business Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Business Name *
                      </label>
                      <Input
                        placeholder="Your business name"
                        value={formData.businessName}
                        onChange={(e) => update('businessName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Business Type *
                      </label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(val) => update('businessType', val ?? '')}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        EIN / Tax ID
                      </label>
                      <Input
                        placeholder="XX-XXXXXXX"
                        value={formData.ein}
                        onChange={(e) => update('ein', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Website
                      </label>
                      <Input
                        placeholder="https://yourbusiness.com"
                        value={formData.website}
                        onChange={(e) => update('website', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ocean-deep mb-4 flex items-center gap-2">
                    <User className="h-4 w-4 text-ocean-mid" />
                    Contact Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Contact Name *
                      </label>
                      <Input
                        placeholder="Full name"
                        value={formData.contactName}
                        onChange={(e) => update('contactName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="you@business.com"
                        value={formData.email}
                        onChange={(e) => update('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Business Address */}
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ocean-deep mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-ocean-mid" />
                    Business Address
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Street Address
                      </label>
                      <Input
                        placeholder="123 Main St, Suite 100"
                        value={formData.address}
                        onChange={(e) => update('address', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1.5">
                          City
                        </label>
                        <Input
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => update('city', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1.5">
                          State
                        </label>
                        <Input
                          placeholder="State"
                          value={formData.state}
                          onChange={(e) => update('state', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1.5">
                          ZIP
                        </label>
                        <Input
                          placeholder="ZIP"
                          value={formData.zip}
                          onChange={(e) => update('zip', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resale & Interest */}
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ocean-deep mb-4 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-ocean-mid" />
                    Resale License &amp; Product Interest
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Resale License Number (if applicable)
                      </label>
                      <Input
                        placeholder="Your resale / seller's permit number"
                        value={formData.resaleLicense}
                        onChange={(e) => update('resaleLicense', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Which products are you interested in?
                      </label>
                      <Textarea
                        placeholder="e.g. Tinctures, gummies, pain cream, roll-ons, capsules, pet products..."
                        rows={3}
                        value={formData.productsInterest}
                        onChange={(e) => update('productsInterest', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Additional message
                      </label>
                      <Textarea
                        placeholder="Anything else you'd like us to know?"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => update('message', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto bg-ocean-mid text-white hover:bg-ocean-deep font-semibold text-base h-12 px-10"
                >
                  Submit Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Questions About Wholesale?
          </h2>
          <p className="mt-4 text-white/80 text-lg leading-relaxed">
            Our wholesale team is ready to help. Reach out anytime — we
            typically respond within one business day.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="mailto:wholesale@oceanahemp.com">
              <Button
                size="lg"
                className="bg-white text-ocean-deep hover:bg-ocean-foam font-semibold text-base px-8"
              >
                <Mail className="mr-2 h-4 w-4" />
                wholesale@oceanahemp.com
              </Button>
            </a>
            <a href="tel:1-800-OCEANA">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8"
              >
                <Phone className="mr-2 h-4 w-4" />
                1-800-OCEANA
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}