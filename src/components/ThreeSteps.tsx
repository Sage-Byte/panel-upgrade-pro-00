import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightCircle } from "lucide-react";

interface ThreeStepsProps {
  onCTAClick?: () => void;
}

const steps = [
  {
    num: "01",
    title: "Get Your Quote",
    desc:
      "Take our free 60‑second assessment to get your personalized EV charger installation quote.",
  },
  {
    num: "02",
    title: "Personalized Recommendation",
    desc:
      "Share a few details and we'll recommend the best EV charging solution for your home.",
  },
  {
    num: "03",
    title: "Professional Installation",
    desc:
      "Approve your quote and our licensed electricians handle the installation—fast, clean, and code‑compliant.",
  },
];

export default function ThreeSteps({ onCTAClick }: ThreeStepsProps) {
  return (
    <section
      aria-labelledby="three-steps-heading"
      className="py-12 sm:py-16 bg-gradient-to-b from-muted/30 to-background"
    >
      <div className="container px-4">
        <header className="text-center mb-8 sm:mb-12">
          <h2
            id="three-steps-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            EV Charger Installation — Get Your Custom Quote
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((s) => (
            <Card
              key={s.num}
              className="rounded-2xl border bg-card shadow-sm h-full"
            >
              <CardHeader className="space-y-2">
                <span className="text-sm font-semibold text-primary">{s.num}</span>
                <CardTitle className="text-xl">{s.title}!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex justify-center">
          <Button
            size="lg"
            variant="hero"
            onClick={onCTAClick}
            aria-label="Get your EV charger quote"
          >
            <ArrowRightCircle className="mr-2" />
            Get My EV Charger Quote
          </Button>
        </div>
      </div>
    </section>
  );
}