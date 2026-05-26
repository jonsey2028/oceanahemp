"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Package, Heart, Settings, Bell, CreditCard, LogIn, User, Mail, Phone, MapPin } from "lucide-react";

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For static export, store login state in localStorage
    localStorage.setItem("oceanahemp-user", JSON.stringify({ email, name: "Oceana Member" }));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("oceanahemp-user");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  if (!isLoggedIn) {
    return (
      <div>
        {/* HERO */}
        <section className="bg-ocean-foam wave-divider">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ocean-deep">
              My Account
            </h1>
            <p className="mt-2 text-slate text-lg">Sign in to manage your orders and preferences</p>
          </div>
        </section>

        {/* LOGIN / SIGNUP FORM */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-md mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-2xl border border-border shadow-card p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-ocean-mid/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-ocean-mid" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-charcoal">
                  {showLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-slate mt-1">
                  {showLogin
                    ? "Sign in to access your orders and subscriptions"
                    : "Join OceanaHemp for exclusive offers and order tracking"}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={showLogin ? "Enter your password" : "Create a password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {showLogin && (
                    <p className="text-sm text-slate mt-1">
                      <a href="mailto:hello@oceanahemp.com?subject=Forgot+Password" className="text-ocean-mid hover:text-ocean-deep underline">
                        Forgot password?
                      </a>
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-ocean-mid hover:bg-ocean-deep text-white font-semibold"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  {showLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate">
                  {showLogin ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <button
                        onClick={() => setShowLogin(false)}
                        className="text-ocean-mid font-semibold hover:text-ocean-deep"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        onClick={() => setShowLogin(true)}
                        className="text-ocean-mid font-semibold hover:text-ocean-deep"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </div>

              <Separator className="my-6" />

              <p className="text-xs text-slate text-center">
                Account features are in beta. For order support,{" "}
                <Link href="/contact" className="text-ocean-mid underline">contact us directly</Link>.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // LOGGED IN DASHBOARD
  return (
    <div>
      <section className="bg-ocean-foam wave-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ocean-deep">
            My Account
          </h1>
          <p className="mt-2 text-slate text-lg">Welcome back, Oceana Member!</p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-12 h-12 bg-ocean-mid/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-ocean-mid" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">Oceana Member</p>
                    <p className="text-sm text-slate">{email}</p>
                  </div>
                </div>
                <nav className="space-y-1">
                  <a href="#orders" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium bg-ocean-foam text-ocean-deep">
                    <Package className="h-4 w-4" /> Orders
                  </a>
                  <a href="#subscriptions" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-charcoal hover:bg-ocean-foam transition-colors">
                    <Bell className="h-4 w-4" /> Subscriptions
                  </a>
                  <a href="#wishlist" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-charcoal hover:bg-ocean-foam transition-colors">
                    <Heart className="h-4 w-4" /> Wishlist
                  </a>
                  <a href="#settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-charcoal hover:bg-ocean-foam transition-colors">
                    <Settings className="h-4 w-4" /> Settings
                  </a>
                </nav>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full mt-4"
                >
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Orders Section */}
              <div id="orders" className="bg-white rounded-2xl border border-border p-6 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="h-5 w-5 text-ocean-mid" />
                  <h2 className="font-heading text-xl font-bold text-charcoal">My Orders</h2>
                </div>
                <div className="text-center py-12 bg-ocean-foam rounded-xl">
                  <Package className="h-12 w-12 text-ocean-mid/40 mx-auto mb-4" />
                  <p className="text-slate font-medium">No orders yet</p>
                  <p className="text-sm text-slate mt-1">Your order history will appear here</p>
                  <Link href="/shop">
                    <Button className="mt-4 bg-ocean-mid hover:bg-ocean-deep text-white">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Contact Info */}
              <div id="settings" className="bg-white rounded-2xl border border-border p-6 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="h-5 w-5 text-ocean-mid" />
                  <h2 className="font-heading text-xl font-bold text-charcoal">Account Info</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-slate" />
                    <span>{email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-slate" />
                    <span className="text-slate">No phone on file</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-slate" />
                    <span className="text-slate">No address on file</span>
                  </div>
                </div>
                <p className="text-xs text-slate mt-6">
                  Need to update your info or manage an existing order?{" "}
                  <Link href="/contact" className="text-ocean-mid underline">Contact Support</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
