"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:hello@oceanahemp.com?subject=Newsletter+Signup&body=Please+add+me+to+the+OceanaHemp+newsletter:+${encodeURIComponent(email)}`;
    }
  };

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
        className="bg-ocean-mid text-white hover:bg-ocean-deep whitespace-nowrap"
      >
        Subscribe
      </Button>
    </form>
  );
}
