import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import SocialProof from "@/components/SocialProof";
import ThreeSteps from "@/components/ThreeSteps";
import BottomCTA from "@/components/BottomCTA";
import SiteFooter from "@/components/SiteFooter";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import SiteHeader from "@/components/SiteHeader";
import type { QuizAnswers } from "@/types/quiz";

const Index = () => {
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

  const totalSteps = 6;

  const onStartQuiz = () => {
    navigate("/quiz");
  };

  const onContinueFromHero = () => {
    navigate("/quiz");
  };





  const seoTitle = "EV Charger Installation Columbus | Electric Medic";
  const seoDesc = "Professional EV charger installation in Columbus area. Get your custom quote in 60 seconds. Licensed electricians, permits handled.";

  return (
    <main>
      <SEOHead title={seoTitle} description={seoDesc} />
      <SiteHeader />
      <Hero
        electricalSystem={answers.electricalSystem as any}
        setElectricalSystem={(electricalSystem) => setAnswers({ ...answers, electricalSystem })}
        onStartQuiz={onStartQuiz}
        onContinue={onContinueFromHero}
        step={step}
        totalSteps={totalSteps}
      />
      <Benefits />
      <SocialProof />
      <ThreeSteps onCTAClick={() => navigate("/quiz")} />
      <BottomCTA onCTAClick={() => navigate("/quiz")} />
      <SiteFooter />

      <MobileStickyCTA onClick={onContinueFromHero} />
    </main>
  );
};

export default Index;
