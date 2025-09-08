import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export default function AssessmentCompare() {
  return (
    <section
      aria-labelledby="panel-mistake-heading"
      className="py-8 sm:py-12"
    >
      <div className="container px-4">
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2
            id="panel-mistake-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            EV Charger Installation — Get Your Custom Quote
          </h2>
          <p className="mt-3 text-muted-foreground">
            Don't overpay for EV charger installation. Our 60‑second assessment
            ensures you get the right charger setup for your home at the best price.
          </p>
        </header>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Without Assessment */}
          <Card className="border-destructive/30 bg-destructive/10">
            <CardHeader>
              <CardTitle className="text-destructive">
                Without Our Assessment:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-destructive">
                <li className="flex gap-2">
                  <XCircle className="mt-0.5" /> Overpay $5,000–$15,000 on
                  unnecessary work
                </li>
                <li className="flex gap-2">
                  <XCircle className="mt-0.5" /> Miss warning signs: overheating,
                  corrosion, recalled breakers
                </li>
                <li className="flex gap-2">
                  <XCircle className="mt-0.5" /> Get upsold without a proper load
                  calculation
                </li>
                <li className="flex gap-2">
                  <XCircle className="mt-0.5" /> Waste weeks collecting quotes
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* With Assessment */}
          <Card className="border-accent/30 bg-accent/10">
            <CardHeader>
              <CardTitle className="text-accent-foreground">
                With Our Assessment:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-accent-foreground">
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5" /> Know exactly what needs
                  upgrading—and what doesn’t
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5" /> Save $5,000–$10,000 by
                  avoiding unnecessary work
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5" /> Get an EV‑ready,
                  code‑compliant plan
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5" /> Results in 60 seconds—no
                  tech visit required
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
