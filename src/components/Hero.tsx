import { Button } from "@/components/ui/button";

import { useEffect, useRef, useState } from "react";

const VALUE_CHIPS = [
  "Cut electricity costs",
  "Smart load management",
  "EV-ready + future-proof",
  "Permits and warranty handled",
];

export type AgeOption = "<10" | "10-20" | "20-30" | "30+ / not sure" | "";

interface HeroProps {
  age: AgeOption;
  setAge: (age: AgeOption) => void;
  onStartQuiz: () => void;
  onContinue: () => void;
  step: number;
  totalSteps: number;
}

const Hero = ({ age, setAge, onStartQuiz, onContinue, step, totalSteps }: HeroProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [homeowner, setHomeowner] = useState<"yes" | "no" | "">("");

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
                <span aria-hidden>✨</span> Smart Panel Savings Check
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center">
              Smart Panel Savings Check — Estimate Your Annual Savings
            </h1>
            <p className="mt-3 text-base sm:text-lg md:text-xl text-center opacity-90">
              Take our <strong>FREE 60‑second savings quiz</strong> to estimate how much a smart panel could save you each year — personalized to your home.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 text-muted-foreground">
              <div className="flex gap-1 text-lg" aria-label="4.9 out of 5 stars">
                <span>⭐️</span><span>⭐️</span><span>⭐️</span><span>⭐️</span><span>⭐️</span>
              </div>
              <span className="text-sm">4.9/5 from 1,500+ homeowners</span>
            </div>
            <div
              ref={sectionRef}
              className="mx-auto max-w-2xl rounded-2xl bg-card text-foreground shadow-lg border border-white/10 overflow-hidden focus:outline-none"
            >
              <div className="bg-success/15 text-success px-4 py-2 text-sm flex items-center justify-between">
                <span>High-end homeowners cut bills and add capacity with smart panels</span>
                <span aria-hidden>→</span>
              </div>
              <div className="p-5 sm:p-7">
                <fieldset>
                  <legend className="text-2xl sm:text-3xl font-semibold text-center mb-2">🏠 Are you a homeowner?</legend>
                  <p className="text-center text-muted-foreground mb-4">Panel upgrades are typically installed by property owners</p>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setHomeowner('yes')}
                      aria-pressed={homeowner==='yes'}
                      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${homeowner==='yes' ? 'border-accent bg-accent/10' : 'border-input bg-background hover:bg-accent/10'}`}
                    >
                      <span className="size-5 shrink-0 rounded-full border border-input grid place-items-center">{homeowner==='yes' ? '✅' : ''}</span>
                      <span className="font-medium">Yes, I own my home</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHomeowner('no')}
                      aria-pressed={homeowner==='no'}
                      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${homeowner==='no' ? 'border-accent bg-accent/10' : 'border-input bg-background hover:bg-accent/10'}`}
                    >
                      <span className="size-5 shrink-0 rounded-full border border-input grid place-items-center">{homeowner==='no' ? '❌' : ''}</span>
                      <span className="font-medium">No, I rent/lease</span>
                    </button>
                  </div>

                  <div className="mt-5">
                    <Button data-cta="continue-from-hero" variant="hero" size="lg" className="w-full" onClick={onContinue}>
                      Continue to Next Question →
                    </Button>
                  </div>

                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    ✅ Personalized recommendations • ✅ Instant results • ✅ 100% Free
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
