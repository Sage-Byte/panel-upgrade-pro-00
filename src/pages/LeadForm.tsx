import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const LeadForm = () => {
  // Add script to the document when component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://link.wattleads.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up function to remove script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main>
      <SEOHead title="Get Your EV Charger Quote" description="Enter your details to get your personalized EV charger installation quote from Electric Medic." />
      <section className="container px-4 py-10">
        <h1 className="sr-only">Get Your EV Charger Installation Quote</h1>
        <div id="lead-gate" className="max-w-2xl mx-auto" style={{ height: "600px" }}>
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
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default LeadForm;
