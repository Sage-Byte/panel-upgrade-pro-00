import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { LeadInfo } from "@/types/quiz";

interface LeadGateProps {
  onSubmitted: (lead: LeadInfo) => void;
}

const LeadGate = ({ onSubmitted }: LeadGateProps) => {
  const [lead, setLead] = useState<LeadInfo>({ name: "", email: "", phone: "", zip: "", consent: false });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(null);
    if (!lead.name || !lead.email || !lead.phone || !lead.zip || !lead.consent) {
      setError("Please complete all required fields, including postcode, and consent.");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).catch(() => {
        // No backend: gracefully fallback
        console.log("Lead captured (stub):", lead);
      });
    } catch (e) {
      console.log("Lead stubbed due to missing backend", e);
    } finally {
      setLoading(false);
      onSubmitted(lead);
    }
  };

  return (
    <section className="container px-4 py-12" aria-labelledby="leadgate-heading">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border rounded-2xl shadow-lg p-6 md:p-8">
          <h2 id="leadgate-heading" className="text-2xl font-bold text-center">Get Your Safety & Capacity Report</h2>
          <p className="mt-2 text-muted-foreground text-center">Just a few details so we can send your personalized panel report and apply your $200 OFF.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm mb-1">Full Name<span className="sr-only"> (required)</span></label>
              <input
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email Address<span className="sr-only"> (required)</span></label>
              <input
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone Number<span className="sr-only"> (required)</span></label>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Enter your phone number"
                className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                value={lead.phone}
                onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Postcode<span className="sr-only"> (required)</span></label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                placeholder="Enter your postcode"
                className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                value={lead.zip || ""}
                onChange={(e) => setLead({ ...lead, zip: e.target.value })}
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">Please provide a valid postcode so we can confirm service area.</p>
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={lead.consent}
                onChange={(e) => setLead({ ...lead, consent: e.target.checked })}
                className="mt-1"
              />
              <span>
                Your information is secure and will only be used to provide your panel report and contact you about your results. Message/data rates may apply.
              </span>
            </label>

            {error && <p className="text-destructive text-sm" role="alert">{error}</p>}

            <div className="flex justify-end">
              <Button data-cta="lead-submit" variant="hero" onClick={submit} disabled={loading}>
                {loading ? "Submitting..." : "Get My Report"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadGate;
