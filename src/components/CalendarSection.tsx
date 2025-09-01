import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CALENDAR_EMBED_URL = "https://calendly.com/"; // Placeholder

interface CalendarSectionProps {
  leadName?: string;
}

const CalendarSection = ({ leadName }: CalendarSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="container px-4 py-12" aria-labelledby="calendar-heading">
      <div className="max-w-4xl mx-auto text-center">
        <h2 id="calendar-heading" className="text-2xl sm:text-3xl font-bold">Book Your Phone Consultation</h2>
        <p className="mt-2 text-muted-foreground">Choose a time that works for you. We’ll call to review your results and next steps.</p>

        <div className="mt-6 aspect-video w-full rounded-lg overflow-hidden border">
          <iframe
            title="Booking Calendar"
            src={CALENDAR_EMBED_URL}
            className="w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="accent">
            <a href={CALENDAR_EMBED_URL} target="_blank" rel="noopener noreferrer">Open Calendar</a>
          </Button>
          <Button
            data-cta="confirm-booking"
            variant="hero"
            onClick={() => navigate(`/thank-you?name=${encodeURIComponent(leadName || "")}`)}
          >
            I’ve booked my slot
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
