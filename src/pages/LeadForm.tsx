import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import type { QuizAnswers } from "@/types/quiz";

const LeadForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [evOwnership, setEvOwnership] = useState<string | null>(null);

  // Retrieve quiz answers and EV ownership from localStorage
  useEffect(() => {
    try {
      const answers = localStorage.getItem("evChargerQuizAnswers");
      if (answers) {
        setQuizAnswers(JSON.parse(answers));
      }
      
      const evOwnershipData = localStorage.getItem("evOwnership");
      if (evOwnershipData) {
        setEvOwnership(evOwnershipData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, []);

  // Add scripts to the document when component mounts
  useEffect(() => {
    // Add GHL form embed script
    const ghlScript = document.createElement('script');
    ghlScript.src = "https://link.wattleads.com/js/form_embed.js";
    ghlScript.async = true;
    document.body.appendChild(ghlScript);

    // Add URL parameter passing script
    const paramScript = document.createElement('script');
    paramScript.textContent = `
      (function () {
        // adjust the selector to match your embed if needed
        var iframe = document.querySelector('iframe[src*="form.gohighlevel.com"], iframe[src*="app.gohighlevel.com"], iframe[src*="wattleads.com"]');
        if (!iframe) return;
        var parentQS = window.location.search; // "?c_ad_id=TEST123&..."
        if (!parentQS) return;
        var src = new URL(iframe.src, window.location.origin);
        // keep any existing params on the iframe and append the parent's params
        if (src.search) iframe.src = src + '&' + parentQS.slice(1);
        else iframe.src = src + parentQS;
      })();
    `;
    document.body.appendChild(paramScript);

    // Clean up function to remove scripts when component unmounts
    return () => {
      if (document.body.contains(ghlScript)) {
        document.body.removeChild(ghlScript);
      }
      if (document.body.contains(paramScript)) {
        document.body.removeChild(paramScript);
      }
    };
  }, []);

  // Set URL parameters based on quiz answers and EV ownership
  useEffect(() => {
    const params = new URLSearchParams();
    
    // Add EV ownership data
    if (evOwnership) {
      params.append('ev_ownership', evOwnership);
    }
    
    // Map quiz answers to GHL custom fields
    if (quizAnswers) {
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
    }
    
    // Update the URL with parameters if we have any
    if (params.toString()) {
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [quizAnswers, evOwnership]);

  // Handle iframe load to stop loading state
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Aggressive redirect to prevent showing any thank you message
  useEffect(() => {
    let redirected = false;

    const forceRedirect = () => {
      if (!redirected) {
        redirected = true;
        console.log('Force redirecting to /results');
        navigate('/results');
      }
    };

    // Monitor iframe for ANY content changes that might indicate submission
    const monitorIframe = () => {
      const iframe = document.getElementById('inline-ySg5U4byfiXezPTgSxBK') as HTMLIFrameElement;
      if (iframe) {
        // Listen for ANY iframe activity
        iframe.addEventListener('load', () => {
          console.log('Iframe loaded - checking for submission');
          setTimeout(() => {
            try {
              const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
              if (iframeDoc) {
                const bodyText = iframeDoc.body?.innerText || '';
                // If we see ANY thank you message, redirect immediately
                if (bodyText.includes('Thank you') || bodyText.includes('thank you') || 
                    bodyText.includes('submitted') || bodyText.includes('complete')) {
                  console.log('Thank you message detected - redirecting immediately');
                  forceRedirect();
                }
              }
            } catch (error) {
              // CORS - can't check content, but iframe reload might mean submission
              console.log('Iframe reloaded (CORS) - assuming submission, redirecting');
              forceRedirect();
            }
          }, 100);
        });

        // Also monitor for clicks on submit buttons
        iframe.addEventListener('click', (event) => {
          console.log('Click detected in iframe');
          // Wait briefly to see if this triggers a submission
          setTimeout(() => {
            try {
              const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
              if (iframeDoc) {
                const bodyText = iframeDoc.body?.innerText || '';
                if (bodyText.includes('Thank you') || bodyText.includes('thank you')) {
                  console.log('Thank you message after click - redirecting');
                  forceRedirect();
                }
              }
            } catch (error) {
              // CORS error - assume submission happened
              console.log('Click with CORS error - assuming submission');
              setTimeout(forceRedirect, 500);
            }
          }, 200);
        });
      }
    };

    // Listen for any GHL messages
    const handleMessage = (event: MessageEvent) => {
      if (event.origin.includes('wattleads.com') || event.origin.includes('gohighlevel.com')) {
        console.log('GHL message received - redirecting immediately');
        forceRedirect();
      }
    };

    window.addEventListener('message', handleMessage);

    // Set up monitoring after iframe loads
    setTimeout(monitorIframe, 1000);

    // Also check every 200ms for thank you message
    const checkInterval = setInterval(() => {
      const iframe = document.getElementById('inline-ySg5U4byfiXezPTgSxBK') as HTMLIFrameElement;
      if (iframe && !redirected) {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            const bodyText = iframeDoc.body?.innerText || '';
            if (bodyText.includes('Thank you') || bodyText.includes('thank you') || 
                bodyText.includes('submitted') || bodyText.includes('complete')) {
              console.log('Periodic check found thank you message - redirecting');
              forceRedirect();
            }
          }
        } catch (error) {
          // CORS error expected
        }
      }
    }, 200);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(checkInterval);
    };
  }, [navigate]);


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
              src="https://link.wattleads.com/widget/form/ySg5U4byfiXezPTgSxBK"
              style={{ width: "100%", height: "100%", border: "none", borderRadius: "3px" }}
              id="inline-ySg5U4byfiXezPTgSxBK" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="EV Electric Medic Form "
              data-height="undefined"
              data-layout-iframe-id="inline-ySg5U4byfiXezPTgSxBK"
              data-form-id="ySg5U4byfiXezPTgSxBK"
              title="EV Electric Medic Form "
              onLoad={handleIframeLoad}
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LeadForm;
