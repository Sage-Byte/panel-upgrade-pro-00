import { Button } from "@/components/ui/button";

import { useEffect, useRef, useState } from "react";

const VALUE_CHIPS = [
  "Professional installation",
  "Level 2 fast charging",
  "Columbus area service",
  "Permit & inspection handled",
];

export type ElectricalSystemOption = "Less than 10 years" | "10-20 years" | "20-30 years" | "30+ years / not sure" | "";

interface HeroProps {
  electricalSystem: ElectricalSystemOption;
  setElectricalSystem: (system: ElectricalSystemOption) => void;
  onStartQuiz: () => void;
  onContinue: () => void;
  step: number;
  totalSteps: number;
}

const Hero = ({ electricalSystem, setElectricalSystem, onStartQuiz, onContinue, step, totalSteps }: HeroProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasEV, setHasEV] = useState<"yes" | "no" | "planning" | "">("");

  useEffect(() => {
    // Ensure focus ring is visible for accessibility when jumping to Q1
    if (sectionRef.current) {
      sectionRef.current.setAttribute("tabindex", "-1");
    }
  }, []);

  const progress = Math.round((step / totalSteps) * 100);

  return (
    <header className="relative overflow-hidden">
      <div className="bg-hero-gradient">
        <div className="container px-4 py-12 sm:py-16 md:py-20 text-primary-foreground">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-success/15 text-success px-3 py-1 text-xs sm:text-sm">
                <span aria-hidden>⚡</span> EV Charger Installation Quote
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center">
              EV Charger Installation — Get Your Custom Quote
            </h1>
            <p className="mt-3 text-base sm:text-lg md:text-xl text-center opacity-90">
              Take our <strong>FREE 60‑second assessment</strong> to get a personalized EV charger installation quote for your Columbus area home.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 text-muted-foreground">
              <div className="flex gap-1 text-lg" aria-label="5.0 out of 5 stars">
                <span>⭐️</span><span>⭐️</span><span>⭐️</span><span>⭐️</span><span>⭐️</span>
              </div>
              <span className="text-sm">Licensed electricians • Columbus area</span>
            </div>
            <div
              ref={sectionRef}
              className="mx-auto max-w-2xl rounded-2xl bg-card text-foreground shadow-lg border border-white/10 overflow-hidden focus:outline-none"
            >
              <div className="bg-success/15 text-success px-4 py-2 text-sm flex items-center justify-between">
                <span>Professional EV charger installation in Columbus area</span>
                <span aria-hidden>→</span>
              </div>
              <div className="p-5 sm:p-7">
                <fieldset>
                  <legend className="text-2xl sm:text-3xl font-semibold text-center mb-2">🔌 Do you currently have an electric vehicle?</legend>
                  <p className="text-center text-muted-foreground mb-4">We install chargers for current and future EV owners</p>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setHasEV('yes')}
                      aria-pressed={hasEV==='yes'}
                      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${hasEV==='yes' ? 'border-accent bg-accent/10' : 'border-input bg-background hover:bg-accent/10'}`}
                    >
                      <span className="size-5 shrink-0 rounded-full border border-input grid place-items-center">{hasEV==='yes' ? '✅' : ''}</span>
                      <span className="font-medium">Yes, I own an EV</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasEV('planning')}
                      aria-pressed={hasEV==='planning'}
                      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${hasEV==='planning' ? 'border-accent bg-accent/10' : 'border-input bg-background hover:bg-accent/10'}`}
                    >
                      <span className="size-5 shrink-0 rounded-full border border-input grid place-items-center">{hasEV==='planning' ? '✅' : ''}</span>
                      <span className="font-medium">Planning to buy an EV soon</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasEV('no')}
                      aria-pressed={hasEV==='no'}
                      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${hasEV==='no' ? 'border-accent bg-accent/10' : 'border-input bg-background hover:bg-accent/10'}`}
                    >
                      <span className="size-5 shrink-0 rounded-full border border-input grid place-items-center">{hasEV==='no' ? '❌' : ''}</span>
                      <span className="font-medium">No, just exploring options</span>
                    </button>
                  </div>

                  <div className="mt-5">
                    <Button data-cta="continue-from-hero" variant="hero" size="lg" className="w-full" onClick={onContinue}>
                      Continue to Next Question →
                    </Button>
                  </div>

                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    ✅ Licensed & insured • ✅ Permits handled • ✅ FREE quote
                  </p>
                </fieldset>
              </div>
            </div>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {VALUE_CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-white/20 bg-background/40 px-3 py-1 text-xs sm:text-sm"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
