import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-ocean-foam py-20">
      <div className="text-8xl mb-6">🌊</div>
      <h1 className="font-heading text-4xl sm:text-5xl font-bold text-ocean-deep mb-4 text-center">
        Page Not Found
      </h1>
      <p className="text-slate text-lg max-w-md mx-auto text-center mb-8">
        Looks like you drifted off course. This page doesn&apos;t exist, but our CBD products definitely do.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button className="bg-ocean-mid hover:bg-ocean-deep text-white font-semibold">
            <ArrowRight className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link href="/shop">
          <Button variant="outline" className="border-ocean-mid text-ocean-mid hover:bg-ocean-foam">
            <Package className="mr-2 h-4 w-4" />
            Browse Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
