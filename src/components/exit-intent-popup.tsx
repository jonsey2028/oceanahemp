"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Tag, CheckCircle2, Gift } from "lucide-react";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Minimum time on site before exit intent triggers (10s)
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEligible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Exit-intent detection via mouse movement toward top of viewport
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!eligible || show || submitted) return;
      // If mouse moves to top 10px of viewport and moving upward (velocity < 0)
      if (e.clientY < 10 && e.movementY < 0) {
        // Only show if not already dismissed in this session
        try {
          const dismissed = sessionStorage.getItem("oceanahemp-exit-dismissed");
          if (dismissed) return;
        } catch {
          // sessionStorage unavailable
        }
        setShow(true);
      }
    },
    [eligible, show, submitted]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const handleDismiss = () => {
    setShow(false);
    try {
      sessionStorage.setItem("oceanahemp-exit-dismissed", "1");
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit-intent", discount: "WELCOME20" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Something went wrong.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      setEmail("");
      // Mark as permanently dismissed for this session
      try {
        sessionStorage.setItem("oceanahemp-exit-dismissed", "1");
      } catch {
        // ignore
      }
      // Auto-close after 3 seconds
      setTimeout(() => setShow(false), 3000);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top color bar */}
        <div className="h-2 bg-gradient-to-r from-ocean-deep via-ocean-mid to-hemp-green" />

        {/* Close */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate hover:bg-ocean-foam hover:text-ocean-deep transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Icon */}
          <div className="mx-auto w-14 h-14 rounded-full bg-ocean-foam flex items-center justify-center mb-4">
            <Gift className="h-7 w-7 text-ocean-mid" />
          </div>

          {!submitted ? (
            <>
              <h3 className="font-heading text-2xl font-bold text-ocean-deep text-center">
                Wait — Don&apos;t Go!
              </h3>
              <p className="mt-2 text-center text-slate">
                Get <strong className="text-ocean-deep">20% off</strong> your first order when you
                join our newsletter. No spam, unsubscribe anytime.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  autoFocus
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-ocean-mid text-white hover:bg-ocean-deep font-semibold h-11"
                >
                  {submitting ? "Claiming..." : "Claim 20% Off"}
                  <Tag className="ml-2 h-4 w-4" />
                </Button>
                {error && (
                  <p className="text-red-600 text-sm text-center">{error}</p>
                )}
              </form>

              <p className="mt-4 text-xs text-center text-slate/70">
                Use code <strong className="text-ocean-deep font-mono">WELCOME20</strong> at checkout.
              </p>
            </>
          ) : (
            <div className="text-center py-2">
              <div className="mx-auto w-14 h-14 rounded-full bg-hemp-light flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-hemp-green" />
              </div>
              <h3 className="font-heading text-xl font-bold text-ocean-deep">
                You&apos;re In!
              </h3>
              <p className="mt-2 text-slate">
                Your 20% off code <strong className="text-ocean-deep font-mono">WELCOME20</strong>{" "}
                has been sent to your inbox.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
