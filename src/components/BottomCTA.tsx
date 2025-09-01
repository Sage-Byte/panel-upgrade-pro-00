import { ArrowRight, CheckCircle2, Star, Sun, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BottomCTAProps {
  onCTAClick?: () => void;
}

export default function BottomCTA({ onCTAClick }: BottomCTAProps) {
  return (
    <section aria-labelledby="cta-title" className="mt-16 border-t border-border bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground">
      <div className="container px-4 py-12 sm:py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="cta-title" className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Don’t Miss Out on Safer, Smarter Power Upgrades
          </h2>
          <p className="mt-3 text-base sm:text-lg md:text-xl/8 opacity-90">
            Our 60-second Panel Check helps you make the right call. Start now and see if you qualify for $200 OFF.
          </p>

          <div className="mt-8 flex justify-center">
            {onCTAClick ? (
              <Button size="lg" variant="hero" onClick={onCTAClick} className="px-6">
                Start My Panel Check Now <ArrowRight className="ml-1" />
              </Button>
            ) : (
              <Button asChild size="lg" variant="hero" className="px-6">
                <Link to="/quiz">Start My Panel Check Now <ArrowRight className="ml-1" /></Link>
              </Button>
            )}
          </div>

          <p className="mt-4 text-sm/6 opacity-80">Join 1,500+ smart homeowners upgrading safely and confidently</p>

          <ul className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm/6 opacity-90">
            <li className="flex items-center justify-center gap-2"><Sun className="size-4" /> Panel Experts</li>
            <li className="flex items-center justify-center gap-2"><Zap className="size-4" /> Accurate Guidance</li>
            <li className="flex items-center justify-center gap-2"><Star className="size-4" /> 4.9/5 Rating</li>
            <li className="flex items-center justify-center gap-2"><CheckCircle2 className="size-4" /> 1,500+ Checks</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
