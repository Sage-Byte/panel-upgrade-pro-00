import { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";

const LeadForm = () => {
  const [isLoading, setIsLoading] = useState(true);

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

  // Handle iframe load to stop loading state
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <main>
      <SEOHead title="Get Your EV Charger Quote" description="Enter your details to get your personalized EV charger installation quote from Electric Medic." />
      
      {/* Header Section */}
      <section className="container px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            EV Charger Installation — Get Your Custom Quote
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Just a few details so we can send your personalized EV charger installation quote and schedule your consultation.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="container px-4 pb-10">
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
