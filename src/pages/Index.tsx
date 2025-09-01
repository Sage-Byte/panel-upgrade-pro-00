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
import AssessmentCompare from "@/components/AssessmentCompare";
import type { QuizAnswers } from "@/types/quiz";

const Index = () => {
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

  const totalSteps = 6;

  const onStartQuiz = () => {
    navigate("/quiz");
  };

  const onContinueFromHero = () => {
    navigate("/quiz");
  };





  const seoTitle = "Smart Panel Savings | Cut Electric Bills with Load Control";
  const seoDesc = "Estimate your annual savings with a smart panel upgrade. Take our 60-second Savings Quiz and see how much you could save.";

  return (
    <main>
      <SEOHead title={seoTitle} description={seoDesc} />
      <SiteHeader />
      <Hero
        age={answers.age as any}
        setAge={(age) => setAnswers({ ...answers, age })}
        onStartQuiz={onStartQuiz}
        onContinue={onContinueFromHero}
        step={step}
        totalSteps={totalSteps}
      />
      <AssessmentCompare />
      
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
