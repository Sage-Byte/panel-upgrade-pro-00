import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ThankYou = () => {
  const params = new URLSearchParams(window.location.search);
  const name = useMemo(() => params.get("name") || "", [params]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <section className="container px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-primary mb-4">
              Thank you{name ? `, ${name}` : ""}!
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
              Your phone consultation is booked.
            </p>
          </div>

          {/* What to expect next - Card Design */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl sm:text-4xl font-bold text-primary">
                What to expect next
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-success/10 border border-success/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-success text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We'll call you at your scheduled time to review your results and answer questions.
                  </p>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    If it's a good fit, we'll schedule an in-home assessment.
                  </p>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Have panel access clear and your main breakers reachable.
                  </p>
                </div>
              </div>
              
              {/* Additional info box */}
              <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
                <p className="text-center text-lg font-medium text-primary">
                  🎉 Your consultation is confirmed and we're excited to help you with your EV charger installation!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default ThankYou;
