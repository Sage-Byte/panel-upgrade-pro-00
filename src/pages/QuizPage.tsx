import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Quiz from "@/components/Quiz";
import LeadGate from "@/components/LeadGate";
import ResultsReport from "@/components/ResultsReport";
import CalendarSection from "@/components/CalendarSection";
import type { QuizAnswers, LeadInfo } from "@/types/quiz";

const QuizPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    electricalSystem: "",
    chargingFrequency: "",
    chargerType: "",
    propertyType: "",
    garageType: "",
    currentPanel: "",
    zip: "",
    timeline: "",
  });

  const [showLeadGate, setShowLeadGate] = useState(false);
  const [lead, setLead] = useState<LeadInfo | null>(null);


  const onQuizComplete = () => {
    try {
      localStorage.setItem("evChargerQuizAnswers", JSON.stringify(answers));
    } catch {}
    navigate("/lead");
  };

  const onLeadSubmitted = (l: LeadInfo) => {
    setLead(l);
    window.setTimeout(() => document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const downloadReport = () => {
    const content = `<!doctype html><html><head><meta charset='utf-8'><title>EV Charger Installation Quote</title></head><body><h1>EV Charger Installation Quote</h1><p>Personalized quote and recommendations based on your assessment. Save for your records.</p><pre>${JSON.stringify({ answers, lead }, null, 2)}</pre></body></html>`;
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

  const seoTitle = "EV Charger Installation Quiz | Get Your Quote";
  const seoDesc = "Take our 60-second assessment to get a personalized EV charger installation quote for your Columbus area home.";

  return (
    <main>
      <SEOHead title={seoTitle} description={seoDesc} />

      <section className="container px-4 py-8">
        <h1 className="sr-only">EV Charger Installation Assessment</h1>
        <Quiz
          answers={answers}
          setAnswers={setAnswers}
          setStepGlobal={setStep}
          onQuizComplete={onQuizComplete}
        />
      </section>

      {showLeadGate && !lead && (
        <div id="lead-gate">
          <LeadGate onSubmitted={onLeadSubmitted} />
        </div>
      )}

      {lead && (
        <div id="results">
          <ResultsReport answers={answers} onDownload={downloadReport} onBookScroll={bookScroll} />
        </div>
      )}

      {lead && (
        <div id="calendar">
          <CalendarSection leadName={lead.name} />
        </div>
      )}
    </main>
  );
};

export default QuizPage;
