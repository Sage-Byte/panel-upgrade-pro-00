import { Button } from "@/components/ui/button";
import { ShieldCheck, Gauge, Star, CheckCircle2 } from "lucide-react";

interface PostSocialCTAProps {
  onCTAClick?: () => void;
}

const features = [
  { icon: ShieldCheck, label: "Licensed Electricians" },
  { icon: Gauge, label: "Accurate Load Assessments" },
  { icon: Star, label: "4.9/5 Client Rating" },
  { icon: CheckCircle2, label: "1,500+ Upgrades" },
];

export default function PostSocialCTA({ onCTAClick }: PostSocialCTAProps) {
  return (
    <section aria-label="Get started" className="bg-hero-gradient text-primary-foreground">
      <div className="container px-4 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Don’t Miss Out on Safer, EV‑Ready Power
          </h2>
          <p className="mt-3 text-base sm:text-lg opacity-90">
            Get the clarity you need to decide on an electrical panel upgrade. Our 60‑second Panel Check could prevent costly issues and future‑proof your home.
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              data-cta="cta-banner-start"
              variant="hero"
              size="lg"
              onClick={onCTAClick}
              className="rounded-full px-6"
            >
              Start My Panel Check Now →
            </Button>
          </div>

          <p className="mt-4 text-sm opacity-90">
            Join 1,500+ high-end homeowners who upgraded with confidence
          </p>
        </div>
      </div>

      <div className="bg-background/60 text-foreground">
        <div className="container px-4 py-4">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm opacity-90">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon className="opacity-90" size={18} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
