
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

    // Capture and save ad_id from URL parameters to localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const adIdParam = urlParams.get('ad_id');
    if (adIdParam) {
      localStorage.setItem("adId", adIdParam);
      console.log('Ad ID saved to localStorage:', adIdParam);
    }
  }, []);

  const progress = Math.round((step / totalSteps) * 100);

  return (
    <header className="relative overflow-hidden">
      <div className="bg-hero-gradient">
        <div className="container px-4 py-12 sm:py-16 md:py-20 text-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white px-3 py-1 text-xs sm:text-sm font-medium">
                <span aria-hidden>⚡</span> EV Charger Installation Quote
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center text-black">
              EV Charger Installation — Get Your Custom Quote
            </h1>
            <p className="mt-3 text-base sm:text-lg md:text-xl text-center text-black font-medium">
              Take our <strong className="text-black">FREE 60‑second assessment</strong> to get a personalized EV charger installation quote for your Columbus area home.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 text-black">
              <div className="flex gap-1 text-lg" aria-label="5.0 out of 5 stars">
                <span>⭐️</span><span>⭐️</span><span>⭐️</span><span>⭐️</span><span>⭐️</span>
              </div>
              <span className="text-sm font-medium">Licensed electricians • Columbus area</span>
            </div>
            <div className="mt-8">
              <div
                ref={sectionRef}
                className="mx-auto max-w-2xl rounded-2xl bg-white text-gray-900 shadow-xl border border-white/20 overflow-hidden focus:outline-none"
              >
                <div className="bg-green-50 text-green-800 px-4 py-2 text-sm flex items-center justify-between border-b border-green-200">
                  <span className="font-medium">Professional EV charger installation in Columbus area</span>
                  <span aria-hidden>→</span>
                </div>
                <div className="p-5 sm:p-7">
                  <fieldset>
                    <legend className="text-2xl sm:text-3xl font-semibold text-center mb-2 text-gray-900">🔌 Do you currently have an electric vehicle?</legend>
                    <p className="text-center text-gray-600 mb-4 font-medium">We install chargers for current and future EV owners</p>

                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setHasEV('yes')}
                        aria-pressed={hasEV==='yes'}
                        className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition font-medium ${hasEV==='yes' ? 'border-blue-500 bg-blue-50 text-blue-900' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-900'}`}
                      >
                        <span className="size-5 shrink-0 rounded-full border border-gray-300 grid place-items-center">{hasEV==='yes' ? '✅' : ''}</span>
                        <span>Yes, I own an EV</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasEV('planning')}
                        aria-pressed={hasEV==='planning'}
                        className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition font-medium ${hasEV==='planning' ? 'border-blue-500 bg-blue-50 text-blue-900' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-900'}`}
                      >
                        <span className="size-5 shrink-0 rounded-full border border-gray-300 grid place-items-center">{hasEV==='planning' ? '✅' : ''}</span>
                        <span>Planning to buy an EV soon</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasEV('no')}
                        aria-pressed={hasEV==='no'}
                        className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition font-medium ${hasEV==='no' ? 'border-blue-500 bg-blue-50 text-blue-900' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-900'}`}
                      >
                        <span className="size-5 shrink-0 rounded-full border border-gray-300 grid place-items-center">{hasEV==='no' ? '❌' : ''}</span>
                        <span>No, just exploring options</span>
                      </button>
                    </div>

                    <div className="mt-5">
                      <Button 
                        data-cta="continue-from-hero" 
                        variant="hero" 
                        size="lg" 
                        className="w-full" 
                        onClick={() => {
                          // Save EV ownership data to localStorage
                          if (hasEV) {
                            localStorage.setItem("evOwnership", hasEV);
                          }
                          onContinue();
                        }}
                      >
                        Continue to Next Question →
                      </Button>
                    </div>

                    <p className="mt-3 text-center text-xs text-gray-600">
                      ✅ Licensed & insured • ✅ Permits handled • ✅ FREE quote
                    </p>
                  </fieldset>
                </div>
              </div>
            </div>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {VALUE_CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs sm:text-sm text-white font-medium"
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
