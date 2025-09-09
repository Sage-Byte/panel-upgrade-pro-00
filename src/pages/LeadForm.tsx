import { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import type { QuizAnswers } from "@/types/quiz";

const LeadForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);

  // Retrieve quiz answers from localStorage
  useEffect(() => {
    try {
      const answers = localStorage.getItem("evChargerQuizAnswers");
      if (answers) {
        setQuizAnswers(JSON.parse(answers));
      }
    } catch (error) {
      console.error("Error loading quiz answers:", error);
    }
  }, []);

  // Add script to the document when component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://link.wattleads.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up function to remove script when component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Build GHL form URL with quiz data as parameters
  const buildGHLUrl = () => {
    const baseUrl = "https://link.wattleads.com/widget/form/ySg5U4byfiXezPTgSxBK";
    
    if (!quizAnswers) return baseUrl;
    
    const params = new URLSearchParams();
    
    // Map quiz answers to GHL custom fields
    if (quizAnswers.electricalSystem) {
      params.append('electrical_system', quizAnswers.electricalSystem);
    }
    if (quizAnswers.chargingFrequency) {
      params.append('charging_frequency', quizAnswers.chargingFrequency);
    }
    if (quizAnswers.chargerType) {
      params.append('charger_type', quizAnswers.chargerType);
    }
    if (quizAnswers.propertyType) {
      params.append('property_type', quizAnswers.propertyType);
    }
    if (quizAnswers.garageType) {
      params.append('garage_type', quizAnswers.garageType);
    }
    if (quizAnswers.currentPanel) {
      params.append('current_panel', quizAnswers.currentPanel);
    }
    if (quizAnswers.timeline) {
      params.append('timeline', quizAnswers.timeline);
    }
    
    return `${baseUrl}?${params.toString()}`;
  };

  // Handle iframe load to stop loading state
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <main>
      <SEOHead title="Get Your EV Charger Quote" description="Enter your details to get your personalized EV charger installation quote from Electric Medic." />
      
      {/* Header Section */}
      <section className="container px-4 py-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            EV Charger Installation — Get Your Custom Quote
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Just a few details so we can send your personalized EV charger installation quote and schedule your consultation.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="container px-4 pb-6">
        <div className="max-w-2xl mx-auto">
          {isLoading && (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          <div 
            id="lead-gate" 
            className={`max-w-2xl mx-auto ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            style={{ height: "600px" }}
          >
            <iframe
              src={buildGHLUrl()}
              style={{ width: "100%", height: "100%", border: "none", borderRadius: "3px" }}
              id="inline-ySg5U4byfiXezPTgSxBK" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Electric Medic Form "
              data-height="542"
              data-layout-iframe-id="inline-ySg5U4byfiXezPTgSxBK"
              data-form-id="ySg5U4byfiXezPTgSxBK"
              title="Electric Medic Form "
              onLoad={handleIframeLoad}
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LeadForm;
