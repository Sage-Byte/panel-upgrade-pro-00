import { useEffect, useMemo, useState } from "react";
import SEOHead from "@/components/SEOHead";
import ResultsReport from "@/components/ResultsReport";

import { Button } from "@/components/ui/button";
import { scoreQuiz } from "@/lib/quizScoring";
import type { LeadInfo, QuizAnswers } from "@/types/quiz";
import { useNavigate } from "react-router-dom";

const ANSWERS_KEY = "panelQuizAnswers";
const LEAD_KEY = "panelLeadInfo";

const Results = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [lead, setLead] = useState<LeadInfo | null>(null);

  useEffect(() => {
    try {
      const a = localStorage.getItem(ANSWERS_KEY);
      const l = localStorage.getItem(LEAD_KEY);
      if (a) setAnswers(JSON.parse(a));
      if (l) setLead(JSON.parse(l));
    } catch {}
  }, []);

  useEffect(() => {
    if (answers == null) {
      // If no context, send back to quiz
      const t = setTimeout(() => navigate("/quiz"), 600);
      return () => clearTimeout(t);
    }
  }, [answers, navigate]);

  const summary = useMemo(() => {
    if (!answers) return { score: 0, tier: 1, percent: 0, annualSavings: 0 } as const;
    const { score, tier } = scoreQuiz(answers);
    const maxScore = 12; // from scoring rules
    const percent = Math.round((score / maxScore) * 100);

    const estimateSavings = (a: QuizAnswers, s: number) => {
      let base = 250; // base annual savings
      const billMult: Record<NonNullable<QuizAnswers["trips"]>, number> = {
        "Never": 0.9,
        "A few times a year": 1,
        "Monthly": 1.15,
        "Weekly": 1.35,
        "Daily": 1.55,
        "": 1,
      } as const;
      base *= billMult[a.trips || ""] || 1;
      const loads = new Set(a.loads || []);
      base += (loads.has("EV charger") ? 200 : 0)
        + (loads.has("Heat pump / HVAC") ? 150 : 0)
        + (loads.has("Induction range") ? 120 : 0)
        + (loads.has("Hot tub / sauna") ? 100 : 0)
        + (loads.has("Solar / battery soon") ? 200 : 0);
      if (a.homeSize === "2500-4000") base += 100;
      if (a.homeSize === "4000+") base += 180;
      const multiplier = 1 + s / 20; // up to +60%
      const est = Math.round((base * multiplier) / 10) * 10;
      return Math.max(200, Math.min(est, 5000));
    };

    const annualSavings = estimateSavings(answers, score);
    return { score, tier, percent, annualSavings } as const;
  }, [answers]);

  const downloadReport = () => {
    const content = `<!doctype html><html><head><meta charset='utf-8'><title>Panel Check Report</title></head><body><h1>Panel Check Report</h1><p>Tiered results and recommendations based on your quiz. Save for your records.</p><pre>${JSON.stringify(
      { answers, lead },
      null,
      2
    )}</pre></body></html>`;
    const blob = new Blob([content], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "panel-check-report.html";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const bookScroll = () => {
    document.querySelector("#calendar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <SEOHead
        title="Your Smart Panel Savings Report"
        description="Estimated annual savings and personalized recommendations for your smart panel upgrade."
      />

      <section className="container px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <header className="rounded-2xl border bg-success/10 p-6 sm:p-8">
            <p className="text-center text-sm sm:text-base text-success font-medium">Your Smart Panel Savings Potential</p>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center mt-2">
              Estimated Annual Savings: {new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(summary.annualSavings)}
            </h1>
            <p className="text-center text-muted-foreground mt-2">Based on your home's characteristics and energy usage</p>
            <div className="mt-6 flex items-center justify-center">
              <Button size="lg" variant="hero" onClick={bookScroll}>Schedule Consultation</Button>
            </div>
          </header>

          {answers && (
            <ResultsReport answers={answers} onDownload={downloadReport} onBookScroll={bookScroll} />
          )}
        </div>
      </section>

    </main>
  );
};

export default Results;
