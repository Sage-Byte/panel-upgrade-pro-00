import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scoreQuiz } from "@/lib/quizScoring";
import type { QuizAnswers } from "@/types/quiz";
import { useMemo } from "react";

interface ResultsReportProps {
  answers: QuizAnswers;
  onDownload: () => void;
  onBookScroll: () => void;
}

const ResultsReport = ({ answers, onDownload, onBookScroll }: ResultsReportProps) => {
  const { score, tier } = useMemo(() => scoreQuiz(answers), [answers]);

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

  const installationCost = useMemo(() => estimateInstallationCost(answers, score), [answers, score]);
  const currency = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const getTierDescription = (tier: number) => {
    switch (tier) {
      case 3:
        return "Complex Installation - May require panel upgrade or additional electrical work";
      case 2:
        return "Standard Installation - Straightforward setup with your current electrical system";
      default:
        return "Simple Installation - Basic setup with minimal electrical modifications";
    }
  };

  return (
    <section className="container px-4 py-8" aria-labelledby="analysis-heading">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle id="analysis-heading">Your EV Charger Installation Quote</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6">
            <p>🎉 Great news! Your personalized EV charger installation quote is ready.</p>
            <p>💰 Estimated installation cost: <strong>{currency.format(installationCost)}</strong></p>
            <p>⚡ Installation tier: <strong>{getTierDescription(tier)}</strong></p>
            <p>🏡 Based on your {answers.propertyType?.toLowerCase() || "property"} and {answers.chargerType || "charging needs"}, we recommend a professional installation by Electric Medic.</p>
            <p>🔧 What's included: Professional installation, permit handling, electrical safety inspection, and Columbus area service.</p>
            <p>📞 Next step: Schedule your free consultation with our licensed electricians to confirm details and finalize your quote.</p>
            <p className="text-xs text-muted-foreground">Quote is an estimate based on typical installations. Final cost determined after site inspection by licensed electrician.</p>
          </CardContent>
        </Card>

        <Card className="bg-success/10 border-success/30">
          <CardHeader>
            <CardTitle className="text-success">What Happens Next</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground text-xs">1</span>
              <p>Schedule your free consultation with Electric Medic's licensed electricians.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground text-xs">2</span>
              <p>We'll conduct a site inspection and provide your final quote with installation timeline.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground text-xs">3</span>
              <p>Professional installation with permits handled - start charging your EV safely!</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button data-cta="book-call" variant="hero" onClick={onBookScroll}>Schedule Free Consultation</Button>
            <Button variant="outline" onClick={onDownload}>Download Quote (HTML)</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsReport;