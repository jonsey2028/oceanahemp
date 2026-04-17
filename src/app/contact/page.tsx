'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  Clock,
  Send,
  MessageCircle,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const contactCards = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: 'Email Us',
    value: 'support@oceanahemp.com',
    sublabel: 'We respond within 24 hours',
    color: 'text-ocean-mid',
    bg: 'bg-ocean-foam',
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: 'Call Us',
    value: '1-800-OCEANA',
    sublabel: 'Mon–Fri 9am–6pm EST',
    color: 'text-hemp-green',
    bg: 'bg-hemp-light',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: 'Business Hours',
    value: 'Mon–Fri 9am–6pm EST',
    sublabel: 'Closed weekends & holidays',
    color: 'text-ocean-deep',
    bg: 'bg-ocean-foam',
  },
];

const faqs = [
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 3–5 business days within the US. Expedited options are available at checkout for 1–2 day delivery. All orders over $75 ship free!',
  },
  {
    question: 'What is your return policy?',
    answer:
      "We offer a 60-day satisfaction guarantee on all products. If you're not completely satisfied, contact us for a full refund or exchange — no questions asked.",
  },
  {
    question: 'Are your products third-party lab tested?',
    answer:
      'Absolutely. Every batch of OceanaHemp products is tested by independent, ISO-certified laboratories. You can scan the QR code on any product to view its certificate of analysis (COA) with full cannabinoid and contaminant panels.',
  },
  {
    question: 'Can I give CBD to my pet?',
    answer:
      'Yes! Our Pet CBD Tincture is specifically formulated for dogs and cats with pet-safe carrier oils and flavors. We recommend consulting your veterinarian before starting any new supplement for your pet.',
  },
];

const subjectOptions = [
  'General Inquiry',
  'Wholesale',
  'Affiliate',
  'Press',
  'Other',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green wave-divider">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/90 mb-6">
            <MessageCircle className="h-4 w-4" />
            <span>We&apos;d love to hear from you</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Get in Touch
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Have a question about our products, need help with an order, or want
            to explore wholesale opportunities? We&apos;re here for you.
          </p>
        </div>
      </section>

      {/* ─── CONTACT FORM + INFO ─── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            {/* ─── LEFT: Form ─── */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-border shadow-card p-6 sm:p-8 lg:p-10">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ocean-deep">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-slate">
                  Fill out the form and we&apos;ll get back to you within 24 hours.
                </p>

                {submitted && (
                  <div className="mt-6 flex items-center gap-3 bg-hemp-light border border-hemp-green/20 rounded-xl px-5 py-4">
                    <CheckCircle2 className="h-5 w-5 text-hemp-green shrink-0" />
                    <div>
                      <p className="font-semibold text-hemp-green">
                        Message sent successfully!
                      </p>
                      <p className="text-sm text-slate mt-0.5">
                        We&apos;ll get back to you within 24 hours. Check your
                        inbox for a confirmation.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Name
                      </label>
                      <Input
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Subject
                    </label>
                    <Select
                      value={formData.subject}
                      onValueChange={(val) =>
                        setFormData({ ...formData, subject: val ?? '' })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell us how we can help…"
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="min-h-32"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto bg-ocean-mid text-white hover:bg-ocean-deep font-semibold text-base h-11 px-8"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* ─── RIGHT: Contact Info ─── */}
            <div className="lg:col-span-5 mt-10 lg:mt-0">
              <div className="space-y-5">
                {contactCards.map((card) => (
                  <div
                    key={card.label}
                    className="bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6 flex items-start gap-4"
                  >
                    <div
                      className={`${card.bg} ${card.color} shrink-0 w-12 h-12 rounded-xl flex items-center justify-center`}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-ocean-deep">
                        {card.label}
                      </h3>
                      <p className="text-charcoal font-medium mt-1">
                        {card.value}
                      </p>
                      <p className="text-sm text-slate mt-0.5">{card.sublabel}</p>
                    </div>
                  </div>
                ))}

                {/* Address / Location card */}
                <div className="bg-ocean-foam rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-ocean-deep">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-ocean-deep">
                      Our Headquarters
                    </h3>
                  </div>
                  <p className="text-slate text-sm leading-relaxed">
                    OceanaHemp Inc.
                    <br />
                    1234 Coastal Highway, Suite 200
                    <br />
                    Santa Cruz, CA 95060
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section className="py-16 lg:py-24 bg-ocean-foam">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ocean-deep">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-slate text-lg">
              Quick answers to questions you might have — or{' '}
              <a
                href="#top"
                className="text-ocean-mid font-medium hover:text-ocean-deep underline underline-offset-4 transition-colors"
              >
                reach out to us directly
              </a>
              .
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="px-6 py-4 text-left font-heading text-base font-semibold text-ocean-deep hover:text-ocean-mid hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-slate leading-relaxed">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Still Have Questions?
          </h2>
          <p className="mt-4 text-white/80 text-lg leading-relaxed">
            Our wellness advisors are happy to help you find the right CBD
            product for your needs. Don&apos;t hesitate to reach out.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="mailto:support@oceanahemp.com">
              <Button
                size="lg"
                className="bg-white text-ocean-deep hover:bg-ocean-foam font-semibold text-base px-8"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Us
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