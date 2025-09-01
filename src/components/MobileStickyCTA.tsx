import { Button } from "@/components/ui/button";

interface MobileStickyCTAProps {
  onClick: () => void;
}

const MobileStickyCTA = ({ onClick }: MobileStickyCTAProps) => {
  return (
    <div className="fixed bottom-0 inset-x-0 md:hidden z-40">
      <div className="mx-3 mb-3 rounded-xl bg-hero-gradient p-3 shadow-lg border border-white/10">
        <div className="flex items-center justify-between gap-3 text-primary-foreground">
          <div>
            <p className="text-xs">Limited offer</p>
            <p className="text-sm font-semibold">Claim $200 OFF your panel upgrade</p>
          </div>
          <Button data-cta="sticky-start" size="sm" variant="accent" onClick={onClick}>Start</Button>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
