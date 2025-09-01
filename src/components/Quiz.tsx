import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import evChargerHero from "@/assets/ev-charger-hero.jpg";
import homeEvCharging from "@/assets/home-ev-charging.jpg";
import chargerDetail from "@/assets/charger-detail.jpg";
import type { QuizAnswers, ChargingFrequencyOption, ChargerTypeOption, PropertyTypeOption } from "@/types/quiz";

const STORAGE_KEY = "ev-charger-quiz-answers-v1";

// UI helpers for vertically stacked choices with icons
const chargingFrequencyOptions: { value: ChargingFrequencyOption; label: string; icon: string }[] = [
  { value: "Never (planning to buy EV)", label: "Planning to buy an EV soon", icon: "🔮" },
  { value: "A few times a week", label: "A few times a week", icon: "📅" },
  { value: "Daily commuting", label: "Daily commuting", icon: "🚗" },
  { value: "Multiple times daily", label: "Multiple times daily", icon: "⚡" },
  { value: "Commercial/fleet use", label: "Commercial/fleet use", icon: "🚛" },
];

const chargerTypeOptions: { value: ChargerTypeOption; label: string; icon: string; description: string }[] = [
  { value: "Level 1 (120V outlet)", label: "Level 1 (120V outlet)", icon: "🔌", description: "Standard household outlet - slowest charging" },
  { value: "Level 2 (240V home charger)", label: "Level 2 (240V home charger)", icon: "⚡", description: "Most popular home option - 4-8 hour full charge" },
  { value: "Level 3 (DC fast charging)", label: "Level 3 (DC fast charging)", icon: "🚀", description: "Commercial-grade fast charging" },
  { value: "Not sure what I need", label: "Not sure what I need", icon: "❓", description: "We'll recommend the best option for you" },
];

const propertyTypeOptions: { value: PropertyTypeOption; label: string; icon: string }[] = [
  { value: "Single family home", label: "Single family home", icon: "🏠" },
  { value: "Townhouse/Condo", label: "Townhouse/Condo", icon: "🏘️" },
  { value: "Apartment complex", label: "Apartment complex", icon: "🏢" },
  { value: "Commercial building", label: "Commercial building", icon: "🏛️" },
];

const timelineOptions: { value: NonNullable<QuizAnswers["timeline"]>; label: string; icon: string }[] = [
  { value: "ASAP", label: "ASAP", icon: "⚡" },
  { value: "1-2 weeks", label: "1-2 weeks", icon: "📅" },
  { value: "1-2 months", label: "1-2 months", icon: "📆" },
  { value: "Exploring options", label: "Just exploring options", icon: "💡" },
];

interface QuizProps {
  answers: QuizAnswers;
  setAnswers: (a: QuizAnswers) => void;
  setStepGlobal: (n: number) => void;
  onQuizComplete: () => void; // advance to lead gate
}

const Quiz = ({ answers, setAnswers, setStepGlobal, onQuizComplete }: QuizProps) => {
  const [step, setStep] = useState<number>(2); // Q2->Q6

  useEffect(() => {
    setStepGlobal(step);
  }, [step, setStepGlobal]);

  useEffect(() => {
    // hydrate from localStorage on mount
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        setAnswers({ ...answers, ...data });
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const totalSteps = 6;
  const progress = useMemo(() => Math.round((step / totalSteps) * 100), [step]);

  const next = () => {
    if (step < 6) setStep(step + 1);
    else onQuizComplete();
  };
  const prev = () => setStep(Math.max(2, step - 1));

  return (
    <section id="quiz" className="container px-4 pt-24 pb-12" aria-labelledby="quiz-heading">
      <div className="max-w-3xl mx-auto min-h-[calc(100vh-160px)] flex flex-col">
        <h2 id="quiz-heading" className="sr-only">EV Charger Installation Assessment</h2>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm" aria-live="polite">Step {step} of {totalSteps}</span>
          <span className="text-sm" aria-hidden>{progress}% Complete</span>
        </div>
        <div className="h-2 w-full rounded bg-muted">
          <div className="h-2 rounded bg-accent" style={{ width: `${progress}%` }} />
        </div>

        {step === 2 && (
          <Card className="mt-6 h-full shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">How often do you need to charge an EV?</CardTitle>
              <CardDescription>This helps us recommend the right charging solution for your needs.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
              <img src={evChargerHero} alt="EV charging setup" className="w-full h-48 object-cover rounded-xl border" loading="lazy" />
              <div className="space-y-3">
                {chargingFrequencyOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, chargingFrequency: opt.value })}
                    className={`w-full text-left flex items-center gap-3 rounded-xl border p-4 transition ${
                      answers.chargingFrequency === opt.value
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-input bg-background hover:bg-accent/10"
                    }`}
                    aria-pressed={answers.chargingFrequency === opt.value}
                  >
                    <span className="text-xl" aria-hidden>{opt.icon}</span>
                    <span className="font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-auto flex justify-between pt-4">
                <Button variant="outline" onClick={prev}>Previous</Button>
                <Button variant="accent" onClick={next}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="mt-6 h-full shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">What type of EV charger are you considering?</CardTitle>
              <CardDescription>Different charger levels provide different charging speeds.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
              <img src={homeEvCharging} alt="Home EV charging options" className="w-full h-48 object-cover rounded-xl border" loading="lazy" />
              <div className="space-y-3">
                {chargerTypeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, chargerType: opt.value })}
                    className={`w-full text-left flex items-start gap-3 rounded-xl border p-4 transition ${
                      answers.chargerType === opt.value
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-input bg-background hover:bg-accent/10"
                    }`}
                    aria-pressed={answers.chargerType === opt.value}
                  >
                    <span className="text-xl mt-1" aria-hidden>{opt.icon}</span>
                    <div>
                      <div className="font-medium">{opt.label}</div>
                      <div className="text-sm text-muted-foreground">{opt.description}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-auto flex justify-between pt-4">
                <Button variant="outline" onClick={prev}>Previous</Button>
                <Button variant="accent" onClick={next}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="mt-6 h-full shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">What type of property is this for?</CardTitle>
              <CardDescription>Installation requirements vary by property type.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
              <img src={chargerDetail} alt="EV charger installation" className="w-full h-48 object-cover rounded-xl border" loading="lazy" />
              <div className="space-y-3">
                {propertyTypeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, propertyType: opt.value })}
                    className={`w-full text-left flex items-center gap-3 rounded-xl border p-4 transition ${
                      answers.propertyType === opt.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-input bg-background hover:bg-accent/10"
                    }`}
                    aria-pressed={answers.propertyType === opt.value}
                  >
                    <span className="text-xl" aria-hidden>{opt.icon}</span>
                    <span className="font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm mb-1">Where would you like the charger installed?</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                  placeholder="e.g., Garage, Driveway, Carport"
                  value={answers.garageType || ""}
                  onChange={(e) => setAnswers({ ...answers, garageType: e.target.value })}
                />
              </div>
              <div className="mt-auto flex justify-between pt-4">
                <Button variant="outline" onClick={prev}>Previous</Button>
                <Button variant="accent" onClick={next}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 5 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Tell us about your current electrical panel</CardTitle>
              <CardDescription>This helps us determine if your panel can handle EV charging.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Current electrical panel info (optional)</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                  placeholder="e.g., 200 amp panel, 20 years old, Square D brand"
                  value={answers.currentPanel || ""}
                  onChange={(e) => setAnswers({ ...answers, currentPanel: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">ZIP Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                  placeholder="43215"
                  value={answers.zip || ""}
                  onChange={(e) => setAnswers({ ...answers, zip: e.target.value })}
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prev}>Back</Button>
                <Button variant="accent" onClick={next}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 6 && (
          <Card className="mt-6 h-full shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">What's your installation timeline?</CardTitle>
              <CardDescription>Your timeline helps us prioritize scheduling and provide accurate quotes.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
              <div>
                <label className="block text-sm mb-1">Timeline</label>
                <div className="space-y-3">
                  {timelineOptions.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setAnswers({ ...answers, timeline: t.value })}
                      className={`w-full text-left flex items-center gap-3 rounded-xl border p-4 transition ${
                        answers.timeline === t.value
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-input bg-background hover:bg-accent/10"
                      }`}
                      aria-pressed={answers.timeline === t.value}
                    >
                      <span className="text-xl" aria-hidden>{t.icon}</span>
                      <span className="font-medium">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-auto flex justify-between pt-4">
                <Button variant="outline" onClick={prev}>Previous</Button>
                <Button data-cta="finish-quiz" variant="hero" onClick={onQuizComplete}>Get my quote</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default Quiz;