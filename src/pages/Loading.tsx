import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, CircleDashed, Loader2 } from "lucide-react";

const steps = [
  {
    title: "Analyzing Your Home",
    desc: "Reviewing property details and usage patterns",
  },
  {
    title: "Evaluating Panel Capacity",
    desc: "Checking existing load and future EV/induction needs",
  },
  {
    title: "Checking Safety Flags",
    desc: "Looking for age, trips, and recall indicators",
  },
  {
    title: "Estimating Upgrade Options",
    desc: "Sizing panel and recommending components",
  },
  {
    title: "Finalizing Results",
    desc: "Preparing your personalized report",
  },
];

const Loading = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(8);

  const activeStep = useMemo(() => {
    const idx = Math.min(steps.length - 1, Math.floor((value / 100) * steps.length));
    return idx;
  }, [value]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue((v) => Math.min(100, v + 2));
    }, 120);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (value >= 100) {
      const t = window.setTimeout(() => navigate("/results"), 500);
      return () => window.clearTimeout(t);
    }
  }, [value, navigate]);

  return (
    <main>
      <SEOHead title="Preparing Your EV Charger Quote" description="We're preparing your personalized EV charger installation quote." />
      <section className="container px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border bg-card shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Loader2 className="size-6 animate-spin" aria-hidden />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold leading-tight">Preparing Your EV Charger Quote</h1>
                <p className="text-muted-foreground">Our expert is calculating your custom installation quote…</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm mb-2 text-muted-foreground">
                <span>Progress</span>
                <span>{value}%</span>
              </div>
              <Progress value={value} />
            </div>

            <div className="mt-6 space-y-3">
              {steps.map((s, i) => {
                const done = i < activeStep;
                const current = i === activeStep && value < 100;
                return (
                  <div
                    key={s.title}
                    className={`rounded-xl border p-4 sm:p-5 flex items-start gap-3 ${
                      done ? "bg-primary/5 border-primary/20" : current ? "bg-secondary/40" : "bg-background"
                    }`}
                  >
                    <div className="mt-0.5 text-primary">
                      {done ? (
                        <CheckCircle2 className="size-5" aria-hidden />
                      ) : current ? (
                        <CircleDashed className="size-5 animate-pulse" aria-hidden />
                      ) : (
                        <span className="inline-flex items-center justify-center size-5 rounded-full border text-xs text-muted-foreground">{i + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{s.title}</p>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Loading;