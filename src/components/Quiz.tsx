import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import roofImg from "@/assets/interior-ev-garage.jpg";
import loadsImg from "@/assets/kitchen-induction.jpg";
import sizeImg from "@/assets/home-office.jpg";
import type { QuizAnswers, TripsOption, LoadOption, HomeSizeOption } from "@/types/quiz";

const STORAGE_KEY = "panel-quiz-answers-v1";

const loadOptions: LoadOption[] = [
  "EV charger",
  "Home office circuits",
  "Heat pump / HVAC",
  "Induction range",
  "Hot tub / sauna",
  "Solar / battery soon",
  "Other",
];

// UI helpers for vertically stacked choices with icons
const tripsOptionList: { value: TripsOption; label: string; icon: string }[] = [
  { value: "Never", label: "Under $100", icon: "💵" },
  { value: "A few times a year", label: "$100–$200", icon: "💰" },
  { value: "Monthly", label: "$200–$300", icon: "📈" },
  { value: "Weekly", label: "$300–$400", icon: "📊" },
  { value: "Daily", label: "$400+", icon: "💸" },
];

const loadOptionIcons: Record<LoadOption, string> = {
  "EV charger": "🚗",
  "Home office circuits": "💻",
  "Heat pump / HVAC": "🌬️",
  "Induction range": "🔥",
  "Hot tub / sauna": "🛁",
  "Solar / battery soon": "☀️",
  Other: "✨",
};

const homeSizeOptions: { value: HomeSizeOption; label: string; icon: string }[] = [
  { value: "<1500", label: "Less than 1,500 sq ft", icon: "🏠" },
  { value: "1500-2500", label: "1,500–2,500 sq ft", icon: "🏡" },
  { value: "2500-4000", label: "2,500–4,000 sq ft", icon: "🏘️" },
  { value: "4000+", label: "4,000+ sq ft", icon: "🏛️" },
];

const timelineOptions: { value: NonNullable<QuizAnswers["timeline"]>; label: string; icon: string }[] = [
  { value: "ASAP", label: "ASAP", icon: "⚡" },
  { value: "30–60 days", label: "30–60 days", icon: "📅" },
  { value: "Exploring budget", label: "Exploring budget", icon: "💡" },
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
        <h2 id="quiz-heading" className="sr-only">Smart Panel Savings Quiz</h2>

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
              <CardTitle className="text-2xl">What’s your average monthly electric bill?</CardTitle>
              <CardDescription>Select the range that best matches your typical bill.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
              <img src={roofImg} alt="Electric bill example" className="w-full h-48 object-cover rounded-xl border" loading="lazy" />
              <div className="space-y-3">
                {tripsOptionList.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, trips: opt.value })}
                    className={`w-full text-left flex items-center gap-3 rounded-xl border p-4 transition ${
                      answers.trips === opt.value
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-input bg-background hover:bg-accent/10"
                    }`}
                    aria-pressed={answers.trips === opt.value}
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
              <CardTitle className="text-2xl">Which high‑usage appliances do you have or plan?</CardTitle>
              <CardDescription>Smart panels can optimize and shift these loads to slash costs.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
              <img src={loadsImg} alt="High-usage appliances" className="w-full h-48 object-cover rounded-xl border" loading="lazy" />
              <div className="space-y-3">
                {loadOptions.map((opt) => {
                  const active = answers.loads.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        const set = new Set(answers.loads);
                        if (active) set.delete(opt); else set.add(opt);
                        setAnswers({ ...answers, loads: Array.from(set) });
                      }}
                      className={`w-full text-left flex items-center gap-3 rounded-xl border p-4 transition ${
                        active ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-input bg-background hover:bg-accent/10"
                      }`}
                      aria-pressed={active}
                    >
                      <span className="text-xl" aria-hidden>{loadOptionIcons[opt]}</span>
                      <span className="font-medium">{opt}</span>
                    </button>
                  );
                })}
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
              <CardTitle className="text-2xl">How big is your home?</CardTitle>
              <CardDescription>Home size helps estimate baseline energy use.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6">
              <img src={sizeImg} alt="Home interior example" className="w-full h-48 object-cover rounded-xl border" loading="lazy" />
              <div className="space-y-3">
                {homeSizeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, homeSize: opt.value })}
                    className={`w-full text-left flex items-center gap-3 rounded-xl border p-4 transition ${
                      answers.homeSize === opt.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-input bg-background hover:bg-accent/10"
                    }`}
                    aria-pressed={answers.homeSize === opt.value}
                  >
                    <span className="text-xl" aria-hidden>{opt.icon}</span>
                    <span className="font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm mb-1">Optional: Specific square footage</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                  placeholder="e.g., 3200"
                  value={answers.sqFtDetail || ""}
                  onChange={(e) => setAnswers({ ...answers, sqFtDetail: e.target.value })}
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
              <CardTitle className="text-lg">Q5. Panel brand/photo (optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Upload a clear photo of your panel</label>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="block w-full text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const base64 = await fileToBase64(file);
                    setAnswers({ ...answers, panelPhoto: base64 });
                  }}
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
              <CardTitle className="text-2xl">What’s your project timeline?</CardTitle>
              <CardDescription>Your timeline helps us tailor scheduling and savings options.</CardDescription>
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
                <Button data-cta="finish-quiz" variant="hero" onClick={onQuizComplete}>See my results</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default Quiz;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
