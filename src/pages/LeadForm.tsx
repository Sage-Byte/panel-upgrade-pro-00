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

  // Add immediate form submission detection and redirect
  useEffect(() => {
    const detectFormSubmission = () => {
      // Listen for any form submission events in the iframe
      const handleMessage = (event: MessageEvent) => {
        if (event.origin.includes('wattleads.com') || event.origin.includes('gohighlevel.com')) {
          console.log('GHL form message:', event.data);
          
          // Redirect immediately on any form-related message
          if (event.data && (
            event.data.type === 'form_submitted' ||
            event.data.includes('submitted') ||
            event.data.includes('success') ||
            event.data.includes('thank') ||
            event.data.includes('form')
          )) {
            console.log('Form activity detected, redirecting immediately...');
            navigate('/results');
          }
        }
      };

      window.addEventListener('message', handleMessage);

      // Monitor for form submission by detecting submit button clicks
      const monitorFormSubmission = () => {
        const iframe = document.getElementById('inline-ySg5U4byfiXezPTgSxBK') as HTMLIFrameElement;
        if (iframe) {
          // Add click listener to the entire iframe area
          iframe.addEventListener('click', () => {
            console.log('Iframe clicked, checking for form submission...');
            
            // Wait a moment then check if form was submitted
            setTimeout(() => {
              try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                if (iframeDoc) {
                  const submitButtons = iframeDoc.querySelectorAll('button[type="submit"], input[type="submit"], .submit-button, [class*="submit"]');
                  
                  if (submitButtons.length > 0) {
                    // Monitor submit button clicks
                    submitButtons.forEach(button => {
                      button.addEventListener('click', () => {
                        console.log('Submit button clicked, redirecting immediately...');
                        // Redirect immediately when submit is clicked
                        setTimeout(() => {
                          navigate('/results');
                        }, 500);
                      });
                    });
                  }
                }
              } catch (error) {
                // CORS error expected, use fallback approach
                console.log('Using fallback submit detection...');
                
                // If we can't access iframe content, redirect after a short delay
                // assuming the click might have been on a submit button
                setTimeout(() => {
                  console.log('Fallback redirect triggered...');
                  navigate('/results');
                }, 2000);
              }
            }, 100);
          });
        }
      };

      // Set up form monitoring after iframe loads
      setTimeout(monitorFormSubmission, 1000);

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    };

    const cleanup = detectFormSubmission();
    return cleanup;
  }, [navigate]);

  // Backup redirect approach - immediate button and shorter auto-redirect
  useEffect(() => {
    const addQuickRedirect = () => {
      setTimeout(() => {
        // Add immediate redirect button
        const redirectButton = document.createElement('button');
        redirectButton.innerHTML = 'Continue to Your Results →';
        redirectButton.className = 'fixed bottom-4 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold hover:bg-primary/90 transition-all duration-300';
        redirectButton.style.display = 'none';
        redirectButton.onclick = () => navigate('/results');
        
        document.body.appendChild(redirectButton);
        
        // Show button after just 1 second
        setTimeout(() => {
          redirectButton.style.display = 'block';
        }, 1000);
        
        // Auto-redirect after 3 seconds if no manual click
        setTimeout(() => {
          console.log('Quick auto-redirect to results page...');
          navigate('/results');
        }, 3000);
        
        return () => {
          if (document.body.contains(redirectButton)) {
            document.body.removeChild(redirectButton);
          }
        };
      }, 1000);
    };

    addQuickRedirect();
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
