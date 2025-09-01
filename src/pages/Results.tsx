import { useEffect, useMemo, useState } from "react";
import SEOHead from "@/components/SEOHead";
import ResultsReport from "@/components/ResultsReport";

import { Button } from "@/components/ui/button";
import { scoreQuiz } from "@/lib/quizScoring";
import type { LeadInfo, QuizAnswers } from "@/types/quiz";
import { useNavigate } from "react-router-dom";

const ANSWERS_KEY = "evChargerQuizAnswers";
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
    if (!answers) return { score: 0, tier: 1, percent: 0, installationCost: 0 } as const;
    const { score, tier } = scoreQuiz(answers);
    const maxScore = 14; // from scoring rules (4+4+4+2)
    const percent = Math.round((score / maxScore) * 100);

    const estimateInstallationCost = (a: QuizAnswers, s: number) => {
      let baseCost = 800; // Base Level 2 charger installation

      // Charger type complexity
      if (a.chargerType === "Level 2 (240V home charger)") baseCost += 400;
      if (a.chargerType === "Level 3 (DC fast charging)") baseCost += 2500;
      if (a.chargerType === "Not sure what I need") baseCost += 200;

      // Property type installation complexity
      if (a.propertyType === "Townhouse/Condo") baseCost += 300;
      if (a.propertyType === "Apartment complex") baseCost += 800;
      if (a.propertyType === "Commercial building") baseCost += 1500;

      // Electrical system age factors
      if (a.electricalSystem === "20-30 years") baseCost += 200;
      if (a.electricalSystem === "30+ years / not sure") baseCost += 500;

      // Usage complexity
      if (a.chargingFrequency === "Multiple times daily" || a.chargingFrequency === "Commercial/fleet use") {
        baseCost += 400;
      }

      const finalCost = Math.round(baseCost / 50) * 50; // Round to nearest $50
      return Math.max(800, Math.min(finalCost, 8000));
    };

    const installationCost = estimateInstallationCost(answers, score);
    return { score, tier, percent, installationCost } as const;
  }, [answers]);

  const downloadReport = () => {
    const content = `<!doctype html><html><head><meta charset='utf-8'><title>EV Charger Installation Quote</title></head><body><h1>EV Charger Installation Quote</h1><p>Personalized quote and recommendations from Electric Medic. Save for your records.</p><pre>${JSON.stringify(
      { answers, lead },
      null,
      2
    )}</pre></body></html>`;
    const blob = new Blob([content], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ev-charger-quote.html";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const bookScroll = () => {
    document.querySelector("#calendar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <SEOHead
        title="Your EV Charger Installation Quote"
        description="Personalized EV charger installation quote from Electric Medic in Columbus area."
      />

      <section className="container px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <header className="rounded-2xl border bg-success/10 p-6 sm:p-8">
            <p className="text-center text-sm sm:text-base text-success font-medium">Your EV Charger Installation Quote</p>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center mt-2">
              Estimated Cost: {new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(summary.installationCost)}
            </h1>
            <p className="text-center text-muted-foreground mt-2">Professional installation by Electric Medic - Columbus area</p>
            <div className="mt-6 flex items-center justify-center">
              <Button size="lg" variant="hero" onClick={bookScroll}>Schedule Free Consultation</Button>
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