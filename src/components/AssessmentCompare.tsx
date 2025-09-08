import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export default function AssessmentCompare() {
  return (
    <section
      aria-labelledby="panel-mistake-heading"
      className="py-8 sm:py-12"
    >
      <div className="container px-4">
        <header className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2
            id="panel-mistake-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            The $15,000 Mistake Most Homeowners Make
          </h2>
          <p className="mt-2 text-muted-foreground">
            Some contractors recommend expensive panel upgrades when simpler solutions work for EV charger installation. Our quick assessment clarifies what you actually need.
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
                  unnecessary electrical work
                </li>
                <li className="flex gap-2">
                  <XCircle className="mt-0.5" /> Miss EV charger compatibility issues
                </li>
                <li className="flex gap-2">
                  <XCircle className="mt-0.5" /> Get oversold on panel upgrades you don't need
                </li>
                <li className="flex gap-2">
                  <XCircle className="mt-0.5" /> Waste weeks collecting EV charger quotes
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
                  <CheckCircle className="mt-0.5" /> Know exactly what EV charger installation you need
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5" /> Save $5,000–$10,000 by
                  avoiding unnecessary electrical work
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5" /> Get the right EV charger for your home's electrical capacity
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5" /> Custom quote in 60 seconds—no
                  site visit required
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}