'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NewsletterSignupProps {
  variant?: 'inline' | 'card' | 'banner';
  className?: string;
}

export default function NewsletterSignup({ variant = 'card', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err: any) {
      setError(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (variant === 'banner') {
    return (
      <div className={`bg-ocean-deep py-4 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-ocean-foam" />
              <p className="text-white font-medium">
                Join 2,000+ subscribers for exclusive drops and wellness tips.
              </p>
            </div>
            {submitted ? (
              <div className="flex items-center gap-2 text-hemp-green">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">You are in, check your inbox!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 w-full sm:w-64"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-white text-ocean-deep hover:bg-ocean-foam shrink-0"
                >
                  {submitting ? '...' : <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>
            )}
          </div>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={className}>
        {submitted ? (
          <div className="flex items-center gap-2 text-hemp-green">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">Welcome aboard, check your inbox!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-64"
            />
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        )}
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    );
  }

  // card variant (default)
  return (
    <div className={`bg-gradient-to-br from-ocean-deep via-ocean-mid to-hemp-green rounded-2xl p-6 sm:p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          <Mail className="h-5 w-5 text-white" />
        </div>
        <h3 className="font-heading text-xl font-bold text-white">Join the Inner Circle</h3>
      </div>
      <p className="text-white/80 mb-5">
        Get early access to new products, exclusive wellness content, and subscriber-only offers delivered to your inbox.
      </p>
      {submitted ? (
        <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-4">
          <CheckCircle2 className="h-5 w-5 text-hemp-green shrink-0" />
          <div>
            <p className="font-semibold text-white">You are subscribed!</p>
            <p className="text-sm text-white/70">Check your inbox for a welcome message.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
          />
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-white text-ocean-deep hover:bg-ocean-foam font-semibold"
          >
            {submitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      )}
      {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
      <p className="text-white/50 text-xs mt-3">No spam, unsubscribe anytime.</p>
    </div>
  );
}
