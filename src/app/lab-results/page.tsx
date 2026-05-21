import Link from "next/link";
import { Check, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const labReports = [
  {
    product: "Pets Full Spectrum CBD Oil",
    batch: "OH-PET-2026-04",
    date: "April 2026",
    cannabinoids: "302.4mg CBD, 12.1mg CBG, 8.3mg CBC",
    thc: "0.18%",
    contaminants: "None detected",
    status: "Pass",
  },
  {
    product: "Water-Soluble CBD Face Spray",
    batch: "OH-FACE-2026-03",
    date: "March 2026",
    cannabinoids: "253.7mg CBD, 3.2mg CBG",
    thc: "0.05%",
    contaminants: "None detected",
    status: "Pass",
  },
  {
    product: "Full Spectrum Massage Oil",
    batch: "OH-MASS-2026-03",
    date: "March 2026",
    cannabinoids: "512.8mg CBD, 18.4mg CBG, 14.2mg CBC, 6.7mg CBN",
    thc: "0.21%",
    contaminants: "None detected",
    status: "Pass",
  },
];

export default function LabResultsPage() {
  return (
    <div>
      <section className="bg-ocean-foam wave-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ocean-deep">
            Lab Results
          </h1>
          <p className="mt-2 text-slate text-lg">
            Third-party tested. Transparent. Trust but verify.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ocean-deep mb-4">
              Certificates of Analysis
            </h2>
            <p className="text-slate">
              Every batch is tested by independent, ISO-certified laboratories for potency, purity, and safety. Scan the QR code on any product to view its COA instantly.
            </p>
          </div>

          <div className="space-y-6">
            {labReports.map((report) => (
              <div
                key={report.batch}
                className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-card"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-charcoal">
                      {report.product}
                    </h3>
                    <p className="text-sm text-slate mt-1">
                      Batch: {report.batch} · Tested: {report.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-hemp-green/10 text-hemp-green font-semibold text-sm px-3 py-1.5 rounded-full">
                      <Check className="h-4 w-4" />
                      {report.status}
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-ocean-foam rounded-xl p-4">
                    <p className="text-xs text-slate uppercase tracking-wide font-medium">Cannabinoids</p>
                    <p className="text-sm text-charcoal font-medium mt-1">{report.cannabinoids}</p>
                  </div>
                  <div className="bg-ocean-foam rounded-xl p-4">
                    <p className="text-xs text-slate uppercase tracking-wide font-medium">THC Content</p>
                    <p className="text-sm text-charcoal font-medium mt-1">{report.thc}</p>
                  </div>
                  <div className="bg-ocean-foam rounded-xl p-4">
                    <p className="text-xs text-slate uppercase tracking-wide font-medium">Contaminants</p>
                    <p className="text-sm text-charcoal font-medium mt-1">{report.contaminants}</p>
                  </div>
                  <div className="bg-ocean-foam rounded-xl p-4">
                    <p className="text-xs text-slate uppercase tracking-wide font-medium">Heavy Metals</p>
                    <p className="text-sm text-charcoal font-medium mt-1">None detected</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-ocean-mid text-ocean-mid hover:bg-ocean-foam"
                  >
                    <Download className="mr-1.5 h-4 w-4" />
                    Download COA
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-ocean-mid text-ocean-mid hover:bg-ocean-foam"
                  >
                    <ExternalLink className="mr-1.5 h-4 w-4" />
                    View Full Report
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-ocean-foam rounded-2xl p-8 text-center">
            <h3 className="font-heading text-2xl font-bold text-ocean-deep mb-4">
              What We Test For
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-5">
                <p className="font-semibold text-charcoal">Potency</p>
                <p className="text-sm text-slate mt-1">CBD, THC, CBG, CBC, CBN levels</p>
              </div>
              <div className="bg-white rounded-xl p-5">
                <p className="font-semibold text-charcoal">Purity</p>
                <p className="text-sm text-slate mt-1">Pesticides, solvents, mycotoxins</p>
              </div>
              <div className="bg-white rounded-xl p-5">
                <p className="font-semibold text-charcoal">Safety</p>
                <p className="text-sm text-slate mt-1">Heavy metals, microbial, residual solvents</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate mb-4">
              Have questions about our testing process?
            </p>
            <Link href="/contact">
              <span className="inline-block bg-ocean-mid hover:bg-ocean-deep text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Contact Us
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
