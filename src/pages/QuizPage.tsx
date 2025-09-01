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
    age: "",
    trips: "",
    loads: [],
    homeSize: "",
    sqFtDetail: "",
    zip: "",
    timeline: "",
  });

  const [showLeadGate, setShowLeadGate] = useState(false);
  const [lead, setLead] = useState<LeadInfo | null>(null);


  const onQuizComplete = () => {
    try {
      localStorage.setItem("panelQuizAnswers", JSON.stringify(answers));
    } catch {}
    navigate("/lead");
  };

  const onLeadSubmitted = (l: LeadInfo) => {
    setLead(l);
    window.setTimeout(() => document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const downloadReport = () => {
    const content = `<!doctype html><html><head><meta charset='utf-8'><title>Panel Check Report</title></head><body><h1>Panel Check Report</h1><p>Tiered results and recommendations based on your quiz. Save for your records.</p><pre>${JSON.stringify({ answers, lead }, null, 2)}</pre></body></html>`;
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

  const seoTitle = "Smart Panel Savings Quiz | Estimate Annual Savings";
  const seoDesc = "Take our 60-second Savings Quiz to get personalized smart panel savings and $200 OFF if you qualify.";

  return (
    <main>
      <SEOHead title={seoTitle} description={seoDesc} />

      <section className="container px-4 py-8">
        <h1 className="sr-only">Panel Check Questionnaire</h1>
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
