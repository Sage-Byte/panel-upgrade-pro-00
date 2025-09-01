import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LeadGate from "@/components/LeadGate";
import type { LeadInfo } from "@/types/quiz";

const LeadForm = () => {
  const navigate = useNavigate();

  const handleSubmitted = (lead: LeadInfo) => {
    try {
      localStorage.setItem("evChargerLeadInfo", JSON.stringify(lead));
    } catch {}
    navigate("/loading");
  };

  return (
    <main>
      <SEOHead title="Get Your EV Charger Quote" description="Enter your details to get your personalized EV charger installation quote from Electric Medic." />
      <section className="container px-4 py-10">
        <h1 className="sr-only">Get Your EV Charger Installation Quote</h1>
        <div id="lead-gate">
          <LeadGate onSubmitted={handleSubmitted} />
        </div>
      </section>
    </main>
  );
};

export default LeadForm;
