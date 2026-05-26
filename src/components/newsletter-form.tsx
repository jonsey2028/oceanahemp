"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Newsletter submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-hemp-green">
        <CheckCircle2 className="h-5 w-5" />
        <span className="text-sm font-medium">You are subscribed! Check your inbox.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-ocean-mid"
      />
      <Button
        type="submit"
        disabled={submitting}
        className="bg-ocean-mid text-white hover:bg-ocean-deep whitespace-nowrap"
      >
        {submitting ? "Subscribing..." : "Subscribe"}
      </Button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </form>
  );
}
